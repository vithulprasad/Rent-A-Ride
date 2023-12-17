const otpGenerate = require("otp-generator");
const nodemailer = require("nodemailer");
const users = require("../models/Users");
const company = require("../models/Partner");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const partner = require("../models/Partner");
const BikeModel = require("../models/BikeModel");
const stripe = require('stripe')(process.env.STRIPID);
const booking = require('../models/booking')
const couponModel = require('../models/Coupen')
const chat = require('../models/chat')
//---------------------------comparing otp and verify the email---------------------------//
exports.otp = async (req, res) => {
  try {
    const otpOriginal = parseInt(req.app.locals.OTP);
    const otpFromBody = parseInt(req.body.otp.join(""));
    const { firstName, lastName, phone, email, password } = req.body.data;
    const passwordHash = await bcrypt.hash(password, 10);
    if (otpFromBody === otpOriginal) {
      const user = new users({
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        password: passwordHash,
        role: "client",
        date:Date.now()
      });
      await user
        .save()
        .then(async () => {
          const find_is_partner = await partner.findOne({ email: email });
          if (find_is_partner) {
            await users.findOneAndUpdate(
              { email: email },
              { $set: { isPartner: true } }
            );
            await partner.findOneAndUpdate(
              { email: email },
              { $set: { isClient: true } }
            );
          }
          res.status(200).json({ success: true });
        })
        .catch((err) => {
          console.log(err.message);
          res.status(500).json({ success: false });
        });
    } else {
      res.status(200).json({ success: false });
    }
  } catch (error) {
    console.log(error.message);
  }
};

//---------------------------Generating otp and sent to the client side---------------------------//
exports.otpGenerate = async (req, res) => {
  try {
    let email = req.query.data;
    const find_email = await users.findOne({ email: email });
    if (find_email == null) {
      if (req.app.locals.resetSession === true) {
        let OTP = await otpGenerate.generate(6, {
          lowerCaseAlphabets: false,
          upperCaseAlphabets: false,
          specialChars: false,
        });
        req.app.locals.OTP = OTP;
        console.log("resent otp is ", OTP);
      } else {
        let OTP = await otpGenerate.generate(6, {
          lowerCaseAlphabets: false,
          upperCaseAlphabets: false,
          specialChars: false,
        });
        req.app.locals.OTP = OTP;
        req.app.locals.resetSession = true;
        console.log("first otp -  ", OTP);
      }

      // sending to the client's email address
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: req.query.data,
        subject: "OTP for registering Rent a ride",
        html:
          "<h3>OTP for account verification is </h3>" +
          "<h1 style='font-weight:bold;'>" +
          req.app.locals.OTP +
          "</h1>", // html body
      };

      transporter.sendMail(mailOptions, (error, info) => {
        console.log("entering into the last stage of otp");
        if (error) {
          console.error(error,'this is the error of otp');
        } else {
          console.log("Email sent: " + info.response);
          console.log("sending response");
          res.status(200).json({ success: true });
        }
      });
    } else {
      console.log(
        "entering in to the email was found and it sent to the clint"
      );
      res.status(200).json({ success: false });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json();
  }
};
//   -------------------------------------------login form validation code ----------------------------------//
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body.data;
    const find_user_email = await users.findOne({ email: email });
    if (find_user_email) {
      if (find_user_email.blocking === false) {
        const passwordMatch = await bcrypt.compare(
          password,
          find_user_email.password
        );
        if (passwordMatch) {
          if (find_user_email.role === "client") {
            //-----json webToken creation------
            const token = jwt.sign(
              { id: find_user_email._id, role: "client" },
              process.env.TOKENSECRET,
              {
                expiresIn: "30d",
              }
            );
            const obj = {
              token,
              name: find_user_email.firstName + " " + find_user_email.lastName,
              id: find_user_email._id,
              roll: "client",
            };
            res
              .status(200)
              .json({
                obj,
                success: true,
                name:
                  find_user_email.firstName + " " + find_user_email.lastName,
              });
          } else {
            console.log("roll error");
            res.status(403).json({ success: false });
          }
        } else {
          console.log("password error");
          res.status(200).json({ success: false });
        }
      } else {
        console.log("block error");
        res.status(403).json({ success: false });
      }
    } else {
      console.log("email error");
      res.status(200).json({ success: false });
    }
  } catch (error) {
    res.status(500).json();
  }
};
exports.companyRegistration = async (req, res) => {
  try {
    const {
      email,
      password,
      confirm,
      name,
      State,
      phone,
      district,
      local_area,
      post,
      pin,
      Age,
      gender,
      CompanyName,
      
    } = req.body.data;
    const selectedLocations = req.body.data.selectedLocations
    const valid_for_applying = await company.findOne({ email: email });
    if (!valid_for_applying) {
      const Address = {
        district: district,
        state: State,
        localArea: local_area,
        age: Age,
        post: post,
        pin: pin,
      };
      const Partner = new partner({
        name: name,
        gender: gender,
        phone: phone,
        email: email,
        password: password,
        role: "partner",
        address: Address,
        company: CompanyName,
        locationPoints:selectedLocations,
        date:Date.now()
      });
      await Partner.save()
        .then(async () => {
          const check_is_client = await users.findOne({ email: email });
          if (check_is_client) {
            await company.findOneAndUpdate(
              { email: email },
              { $set: { isClient: true } }
            );
          }
          res.status(200).json({ success: true, email: email, name: name });
        })
        .catch((err) => {
          console.log(err.message);
          res.status(500).json({ success: false });
        });
    } else {
      res.status(200).json({ success: false, name: name });
    }
  } catch (error) {
    console.log(error.message);
  }
};
exports.navDetails = async (req, res) => {
  try {
    const token = req.query.token;
    const verifyToken = jwt.verify(token, process.env.TOKENSECRET);
    const userId = verifyToken.id;
    if (userId) {
      const findUser = await users.findOne({ _id: userId });
      const user = findUser.isPartner;
      if (user === true) {
        res.status(200).json({ success: true, userData: true });
      } else {
        console.log("data was not found");
        res.status(200).json({ success: true, userData: false });
      }
    } else {
      res.status(200).json({ success: false });
    }
  } catch (error) {
    console.log(error.message);
    res.status(200).json({ success: false });
  }
};
exports.googleAuthentication = async (req, res) => {
  try {
    const user = req.body.data;
    const findUser = await users.findOne({ email: user });
    if (findUser) {
      const token = jwt.sign(
        { id: findUser._id, role: "client" },
        process.env.TOKENSECRET,
        {
          expiresIn: "30d",
        }
      );
      const obj = {
        token,
        name: findUser.firstName + " " + findUser.lastName,
        id: findUser._id,
        roll: "client",
      };
      res
        .status(200)
        .json({
          obj,
          success: true,
          name: findUser.firstName + " " + findUser.lastName,
        });
    } else {
      res.status(200).json({ success: false });
    }
  } catch (error) {
    console.log(error.message);
    res.status(200).json({ success: false });
  }
};

exports.getBikeInformation = async (req, res) => {
  try {
    const location = req.query.location
    const mo= await BikeModel.find().populate('partnerId')
   
    const bikes = location=="noValue" ? await BikeModel.find():mo.filter((value)=>{ return value.partnerId.address.district==location})


    const BrandName = location=="noValue"
    ? await BikeModel.aggregate([
        {
          $group: {
            _id: "$BrandName",
            count: { $sum: 1 }
          }
        },
        {
          $project: {
            _id: 0,
            name: "$_id",
            count: 1
          }
        }
      ])
    : await BikeModel.aggregate([
        {
          $match: {
            district : location
          }
        },
        {
          $group: {
            _id: "$BrandName",
            count: { $sum: 1 }
          }
        },
        {
          $project: {
            _id: 0,
            name: "$_id",
            count: 1
          }
        }
      ]);
  
    const locations = await company.aggregate([
   
      {
        $group: {
          _id: "$address.district", 
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          name: "$_id", 
        
        }
      }
    ]);
    
 
    res.status(200).json({ success: true, bikes: bikes ,Brand :BrandName,locations:locations,bikesingle:mo });
  } catch (error) {
    console.log(error.message);
    res.status(200).json({ success: false });
  }
};

exports.profileEditDataDetails = async (req, res) => {
  try {
    let token = req.query.token;
    let tokenDatas = jwt.verify(token, process.env.TOKENSECRET);
    const userId = tokenDatas.id;
    const user = await users.findOne({ _id: userId });
    console.log(user, "this is the user id");
    res.status(200).json({ success: true, user: user });
  } catch (error) {
    console.log(error.message);
    res.status(200).json({ message: false });
  }
};

exports.editProfileData = async (req, res) => {
  try {
    console.log("emtering to the updataion");
    console.log(req.body.form, "this is the form value");
    console.log(req.body.user, "this is the user");
    const usersValues = req.body.user;
    const token = req.body.form;

    const firstName = usersValues.formValues.firstName;
    const lastName = usersValues.formValues.lastName;
    const phone = usersValues.formValues.phone;
    const district = usersValues.formValues.district;
    const state = usersValues.formValues.state;
    const localarea = usersValues.formValues.street;
    const post = usersValues.formValues.post;
    const pin = usersValues.formValues.pin;
    const image1 = usersValues.image1;
    const image2 = usersValues.image2;
    const image3 = usersValues.image3;
    const image4 = usersValues.image4;
    const image5 = usersValues.image5;

    const jwtToken = jwt.verify(token, process.env.TOKENSECRET);
    const userId = jwtToken.id;
    console.log(userId, "this si the is");

    const user = await users.findOne({ _id: userId });
    if (user) {
      console.log("entering to the updatation ");
      await users
        .findOneAndUpdate(
          { _id: userId },
          {
            $set: {
              firstName: firstName,
              lastName: lastName,
              phone: phone,
              Profile: image1,
              "address.district": district,
              "address.state": state,
              "address.localArea": localarea,
              "address.pin": pin,
              "address.post": post,
              "license.front": image2,
              "license.back": image3,
              "userInfo.front": image4,
              "userInfo.back": image5,
            },
          }
        )
        .then((response) => {
          res.json({ success: true, data: response });
        })
        .catch((error) => {
          res.json({ success: false });
        });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.log(error.message);
    res.status(200).json({ success: false });
  }
};
exports.orderPageDetails=async(req,res)=>{
  try {
     const id = req.query.id;
     console.log(id,'---------------------');
     const data = await BikeModel.findOne({_id:id}).populate("partnerId")
     console.log(data.partnerId.address);
     if(data){
      res.status(200).json({ success: true,data:data})
     }else{
      res.status(200).json({ success: false})
     }
  } catch (error) {
    res.status(200).json({ success: false });
  }
}



exports.checkout=async(req,res)=>{
  try {
    const data = req.body.data.data
    const helmet = req.body.data.helmet
    const completeAmount = data.total+helmet*50+data.total-50+50
    const coupon = req.body.data.coupon ?? ""
    const couponAmount = parseInt(coupon)?? ""
    const id = req.body.data.couponId
     const bikedetails = await BikeModel.findOne({_id:data.bike})

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name:`name:${ bikedetails.name} location:${data.location}, price per day:${data.rent}`,
            },
            unit_amount:completeAmount * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'https://rent-a-ride-ten.vercel.app/cancel',
    });
    const date={
      startDate:data.startDate,
      endDate:data.endDate,
      startTime:data.startTime,
      endTime:data.endTime,
    }
  
    const difference ={
      date:data.differenceInDays,
      time:data.differenceInHour
    }
  const bookingId = session.id
   const Booking = new booking({
         bookingId:bookingId,
         userId:req.id,
         bike:data.bike,
         partner:bikedetails.partnerId,
         paymentStatus:"pending",
         purchaseDate:Date.now(),
         dates:date,
         difference:difference,
         location:data.location,
         bikeStatus:"pending",
         image:bikedetails.image[0],
         bikeName:bikedetails.name,
         totalAmount:data.total+data.total-50+helmet*50+50-couponAmount,
         deposit:data.total-50,
         helmet:helmet,
         couponCode:coupon,
         couponId:id,
   })
 const saveDetails = Booking.save()
        id ?  await couponModel.findOneAndUpdate({_id:id},{$push:{user:req.id}}): null;
        if(saveDetails){
          res.json({id:session.id ,success: true,userDetails:"true"});
        }else{
          res.status(200).json({ success: false  });
        }

  } catch (error) {
    console.log(error.message);
     res.status(200).json({ success: false });
  }
}

exports.paymentSuccess=async(req,res)=>{
  try {
      
   
       const userFirstOrder = await booking.findOne({userId:req.id}).sort({purchaseDate:-1}).limit(1)
       console.log(userFirstOrder);
       const findBooking = await booking.findOne({_id:userFirstOrder.id}).populate('userId').populate('partner')
  
    

       const sessionId = findBooking.bookingId;
  
       stripe.checkout.sessions.retrieve(sessionId, (error, session) => {
         if (error) {
           console.error(error);
           return;
         }
         if (session.payment_status === 'paid') {
      
       
          
           const payment=async()=>{
            console.log();
            await booking.findOneAndUpdate({_id:userFirstOrder.id},{
              $set:{
                paymentStatus:"success",
                purchaseDate:Date.now(),
                bikeStatus:"booked",
                couponAdd: findBooking.couponId=="" ||  findBooking.couponId=="0" ? false : true
              }
            })

            
            const Chat = new chat({
              partner:userFirstOrder.partner,
              user:userFirstOrder.userId,
              userName:findBooking.userId.firstName,
              userNameLast:findBooking.userId.lastName,
              userImage:findBooking.userId.Profile,
              partnerName:findBooking.partner.name,
              partnerImage:findBooking.partner.image,
              date:Date.now()
             })
             const isChatSaved = await chat.findOne({partner:userFirstOrder.partner,user:userFirstOrder.userId})
                
                 isChatSaved ? console.log("user is find") : await Chat.save();
          
            await BikeModel.findOneAndUpdate({_id:findBooking.bike},{$set:{isBooked:true}})
           }
           payment()
         
         } else {
            const payment = async()=>{
              await booking.findOneAndUpdate({_id:userFirstOrder.id},{
                $set:{
                  paymentStatus:"failed",
                }
              })
            }
            payment()
           console.log('Payment was not successful');
         }
       });

     
  
  } catch (error) {
    console.log(error.message,'in payment sucess');
    res.status(200).json({ success: false });
  }
}

exports.paymentDetails=async(req,res)=>{
  console.log("entering to the booking details");
  try {
      const user = req.id 
      const data = await booking.aggregate([
        {
          $match:{
           userId:user,
           paymentStatus:"success"
        }},
        {
          $sort:{
            purchaseDate:-1
          }
        }

      ])
     
      res.status(200).json({success:true,data:data})
  } catch (error) {
    console.log(error.message);
    res.status(200).json({ success: false });
  }
}

exports.applyCoupon=async(req,res)=>{
  try {
    
    const {value,code} = req.body.data
   const findCoupon = await couponModel.findOne({code:code})
   
   const bikeAmount = value.total
      if(findCoupon){
        const users = req.id
        const userExists = findCoupon.user.some((value) => value ==users);
           console.log(userExists);
           if(userExists===true){
            res.status(200).json({ success: false ,message:"coupon is already used by the user"});
           }else{
            console.log(findCoupon.minimum,'-----');
              if(findCoupon.minimum < bikeAmount){
                const date1 = Date.now(); 
                const date2 = new Date(findCoupon.date); 
                const days = findCoupon.expiry
                const timeDifferenceInMilliseconds = date1 - date2.getTime();
                const daysDifference = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24))
                console.log("--expiry---",days,'--now---',daysDifference);
                if(daysDifference<=days){
                  let value = bikeAmount;
                  let percentage = findCoupon.percentage; 
                  const calculatedAmountOnValue =Math.round(value * (percentage / 100)) ; 
                 
                  const data={
                    value:calculatedAmountOnValue,
                    couponId:findCoupon._id
                  }
                  res.status(200).json({ success: true ,message:"coupon apply success",data:data});
                }else{
                  res.status(200).json({ success: false ,message:"coupon as expired"});
                }
              }else{
                res.status(200).json({ success: false ,message:"cannot apply coupon on this"});
              }
           }
      }else{
        res.status(200).json({ success: false ,message:"invalid coupon code"});
      }
  } catch (error) {
     console.log(error.message);
     res.status(200).json({ success: false,message:"internal server error"});

  }
}
exports.listCoupons=async(req,res)=>{
  try {
     const offers = await couponModel.find()
     res.json({success:true,offers:offers})
  } catch (error) {
    console.log(error.message)
    res.status(200).json({ success: false,message:"internal server error"});
  }
}
exports.cancelBooking=async(req,res)=>{
  try {
    const id  = req.query.id;
    const findBike= await booking.findOne({_id:id});
    const findUser = await users.findOne({_id:req.id})
    const totalAmount = findBike.totalAmount+findUser.wallet
    const updateBooking = await booking.findOneAndUpdate({_id:id},{$set:{bikeStatus:"canceled"}})
    const updateBike =  await BikeModel.findOneAndUpdate({_id:findBike.bike},{$set:{isBooked:false}})
    const updateWallet = await users.findOneAndUpdate({_id:req.id},{$inc:{wallet:totalAmount}})
    await users.findOneAndUpdate({_id:req.id},{$push:{walletHistory:id}})
    await users.findOneAndUpdate({_id:req.id},{$push:{walletDate:Date.now()}})
    Promise.all(updateBooking,updateBike,updateWallet)
    .then(()=>{
      res.status(200).json({success:true})
    })
    .catch((err)=>{
      console.log(err);
      res.json({success:false})
    })
  } catch (error) {
    console.log(error.message)
    res.status(200).json({ success: false,message:"internal server error"});
  }
}

exports.tariffPage=async(req,res)=>{
  try {
      const bike = await BikeModel.find().populate("partnerId")
      res.status(200).json({success:true,bikes:bike})
  } catch (error) {
    console.log(error.message)
    res.status(200).json({ success: false,message:"internal server error"});
  }
}


exports.walletDetails =async(req,res)=>{
  try {
   const details=await users.findOne({ _id: req.id }).populate('walletHistory') 
      res.status(200).json({success:true,details:details})
  } catch (error) {
    console.log(error.message)
    res.status(200).json({ success: false,message:"internal server error"});
  }
}


exports.chat=async(req,res)=>{
  try {
    console.log("entering to the chat user");
    const id1 = req.id
   
    const communication = await chat.aggregate([{$match:{user:id1}}])
    console.log(communication,'----ddddd-----');

    res.status(200).json({success:true,communication:communication})
  } catch (error) {
    console.log(error.message)
    res.status(200).json({ success: false,message:"internal server error"});
  }
}

exports.chatSave = async(req,res)=>{
  try {
   
    const partner = req.body.partner;
    const user = req.id;
    const message = req.body.message
    const data = {
      user:message,
      partner:'',
      date:Date.now()
    }
    await chat.findOneAndUpdate(
      { user: user, partner: partner },
      {
        $push: { message: data }, 
        $set: { lastMessage: message } 
      }
    );
    const Chat = await chat.findOne({user:user,partner:partner})
    res.status(200).json({success:true,chat:Chat})
  } catch (error) {
    console.log(error.message)
    res.status(200).json({ success: false,message:"internal server error"});
  }
}

exports.socket =async(req,res)=>{
  try {
  
    const partner = req.body.partner
    const user =req.body.user
     console.log(partner,user ,'----user');
    const Chat = await chat.findOne({partner:partner,user:user})
    res.status(200).json({success:true,chat:Chat})
  } catch (error) {
    console.log(error.message)
    res.status(200).json({ success: false,message:"internal server error"});
  }
}