const otpGenerate = require("otp-generator");
const nodemailer = require("nodemailer");
const users = require("../models/Users");
const company = require("../models/Partner");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const partner = require("../models/Partner");
//---------------------------comparing otp and verify the email---------------------------//
exports.otp = async (req, res) => {
  try {
    const otpOriginal = parseInt(req.app.locals.OTP);
    const otpFromBody = parseInt(req.body.otp.join(""));
    const { firstName, lastName, phone, email, password } = req.body.data;
    const passwordHash = await bcrypt.hash(password,10)
    if (otpFromBody === otpOriginal) {
      const user = new users({
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        password: passwordHash,
        role: "client",
      });
      await user
        .save()
        .then(() => {
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
      console.log(find_email, "this is the found email");

     
  
      if (find_email == null) {
        if(req.app.locals.resetSession===true ){
          let OTP = await otpGenerate.generate(6, {
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
          });
          req.app.locals.OTP = OTP;
          console.log("resent otp is ", OTP);
        }else{
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
            console.error(error);
          } else {
            console.log("Email sent: " + info.response);
            console.log("sending response");
            res.status(200).json({ success: true });
          }
        });
      } else {
        console.log("entering in to the email was found and it sent to the clint");
        res.status(200).json({ success: false });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json()
    }
  };
//   -------------------------------------------login form validation code ----------------------------------//
exports.loginUser=async(req,res)=>{
    try {
        const{email,password} = req.body.data;
        const find_user_email = await users.findOne({email:email})
        if(find_user_email){
              if(find_user_email.blocking===false){
                const passwordMatch =  await bcrypt.compare(password,find_user_email.password);
                    if(passwordMatch){
                        if(find_user_email.role==="client"){
                            //-----json webToken creation------
                            const token = jwt.sign({ id: find_user_email._id }, process.env.TOKENSECRET, {
                                expiresIn: "30d",
                              });
                              const obj = {
                                token,
                                name: find_user_email.firstName+" "+find_user_email.lastName,
                                id: find_user_email._id,
                                roll:"client"
                              };
                              res.status(200).json({obj,success:true,name:find_user_email.firstName+" "+find_user_email.lastName})
                        }else{
                            console.log("roll error");
                            res.status(403).json({success:false});
                        }
                    }else{
                        console.log("password error");
                        res.status(200).json({success:false}); 
                    }
                }else{
                    console.log("block error");
                    res.status(403).json({success:false});
                }
        }else{
            console.log("email error");
            res.status(200).json({success:false});
        }
    } catch (error) {
        res.status(500).json()
    }
}
exports.companyRegistration=async(req,res)=>{
  try {
     const {email,password,confirm,name,State,phone,district,local_area,post,pin,Age,gender,CompanyName} =req.body.data
     
     const valid_for_applying = await company.findOne({email:email})
        if(!valid_for_applying){
         
            const Address = {
              district: district,
              state: State,
              localArea:local_area,
              age:Age,
              post:post,
              pin:pin
            }
            const Partner = new partner({
              name: name,
              gender: gender,
              phone: phone,
              email: email,
              password: password,
              role: "partner",
              address:Address,
              company:CompanyName
            });
            await Partner
              .save()
              .then(() => {
                res.status(200).json({ success: true ,email:email,name:name });
              })
              .catch((err) => {
                console.log(err.message);
                res.status(500).json({ success: false });
              });
        }else{
          res.status(200).json({success:false,name:name})
        }
  } catch (error) {
    console.log(error.message);
  }
}
