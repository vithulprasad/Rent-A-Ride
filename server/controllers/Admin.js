const partner = require('../models/Partner')
const admin = require('../models/Admin')
const bikeModel = require('../models/BikeModel')
const user = require('../models/Users')
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const  jwt  = require('jsonwebtoken');




exports.login=async(req,res)=>{
     const {email,password}=req.body.data   
     
     const AdminFind = await admin.find()
       if(AdminFind.length>0){
          console.log(AdminFind);
            const verifyAdmin = await admin.findOne({email:email})
               if(verifyAdmin){
                  const passwordMatch =  await bcrypt.compare(password,verifyAdmin.Password);
                       if(passwordMatch){
                        const token = jwt.sign({ id: verifyAdmin._id,role:"admin" }, process.env.TOKENSECRET, {
                           expiresIn: "30d",
                         });
                         const obj = {
                           token,
                           email: email,
                           role:"admin"
                         }; 
                        res.status(200).json({success:true,obj:obj})
                       }else{
                        res.status(200).json({success:false})
                       }
                 }else{
                  res.status(200).json({success:false})
               }   
       }else{
         const passwordHash = await bcrypt.hash(password,10)
            const Admin = new admin({
               email: email,
               Password: passwordHash
               });
               await Admin
               .save()
               .then(() => {
              res.status(200).json({ success: true,created:true});
            })
            .catch((err) => {
              console.log(err.message);
              res.status(500).json({ success: false });
            });
       }
}

exports.request=async(req,res)=>{
   try {
     
      const Partner = await partner.find()
      let requested_partner = Partner.filter((res)=>{
             return res.requestStatus===false
      })
      res.status(200).json({success:true,request:requested_partner})
   } catch (error) {
      console.log(error.message);
      res.status(401).send({message:"error"})
   }
}

// ---------------------------------access confirmations --------------------------------//

exports.accessConfirmation=async(req,res)=>{
   try {
         const email = req.query.email
         const port = 'http://localhost/partner'
         const Part = await partner.findOne({email:email})
         const password =Part.password 
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
            to: email,
            subject: "Response from Rent-A-Ride ",
            html:
              `<h3> Information for ${Part.name} fromm Rent-A-Ride </h3>` +
              "<h1 style='font-weight:bold;color:green'>Email is " +email+  "</h1>"+
              "<br />"+
              `<h3 style='font-weight:bold; color:green'> This is your password ${Part.password} from Rent-A-Ride </h3>`+
              "<br />"+
              `<h3 style='font-weight:bold; color:green'> This is your your url for sign up  in our platform  Rent-A-Ride </h3>`+
              `<h3 style='font-weight:bold; color:green'>${port} </h3>`
             , // html body
          };
          transporter.sendMail(mailOptions, async(error, info) => {
            if (error) {
               res.json({success:false})
              console.error(error);
            } else {
              console.log("Email sent: " + info.response);
              const find_user_is_sending_request=await user.findOne({email:email})
               if(find_user_is_sending_request){
                  await user.findOneAndUpdate({email:email},{$set:{isPartner:true}})
               }
              const passwordHash = await bcrypt.hash(password,10)
              console.log("Password hash", passwordHash);
             await partner.findOneAndUpdate({email:email},{$set:{requestStatus:true,password:passwordHash}}).then((response)=>{
                res.status(200).json({success:true,email:email})
             })
            }
          })
          
      
   } catch (error) {
      console.log(error.message);
      res.status(401).send({messge:"error"})
   }
}


exports.findPartner=async(req,res)=>{
   try {
      const Partner = await partner.find()
      let requested_partner = Partner.filter((res)=>{
             return res.requestStatus===true
      })
      res.status(200).json({success:true,request:requested_partner})
   } catch (error) {
      console.log(error.message);
   }
}

exports.rejected=async(req,res)=>{
   try {
      
      const information =req.body.data.data.information;
      const reason = req.body.data.data.reason
      const email = req.body.data.email
      const Part =await partner.findOne({email:email})
      if(Part.access==="requesting"){
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
            to: email,
            subject: "Response from Rent-A-Ride ",
            html:
              `<h3> Information for ${Part.name} fromm Rent-A-Ride </h3>` +
              "<h1 style='font-weight:bold;color:green'>Email is " +email+  "</h1>"+
              "<br />"+
              `<h3 style='font-weight:bold; color:green'> This is your rejection response from Rent-A-Ride </h3>`+
              "<br />"+
              `<h3 style='font-weight:bold; color:green'> ${information} :-><span style='font-weight:bold; color:black' >from the  platform  Rent-A-Ride</span>  </h3>`+
              "<br />"+
              `<h3 style='font-weight:bold; color:blue'>Reason for Rejecting :-><span style='font-weight:bold; color:red'>${req.body.data.reason} </span></h3>`
             , // html body
          };
          transporter.sendMail(mailOptions, async(error, info) => {
            if (error) {
               res.json({success:false})
              console.error(error);
            } else {
              console.log("Email sent: " + info.response);
             await partner.findOneAndUpdate({email:email},{$set:{access:"rejected",accessInformation:information,accessReasons:reason}}).then((response)=>{
                res.status(200).json({success:true,email:email})
             })
            }
          })
      }else{
         res.json({success:false})
      }
     
       
   } catch (error) {
      console.log(error.message);
   }
}



exports.partnerBlocking=async(req,res)=>{
   try {
      console.log(req.query.data);
      const email = req.query.data
      const Partner =await partner.findOne({email:email})
      console.log(
      "partner currently ",Partner.blocking
      );
      if(Partner){
         if(Partner.blocking===false){
            await partner.findOneAndUpdate({email:email},{$set:{blocking:true}})
            res.json({success:true,blocking:true})
         }else{
            await partner.findOneAndUpdate({email:email},{$set:{blocking:false}})
            res.status(200).json({success:true,blocking:false})
         }
         
      }else{
         res.status(200).json({success:false})
      }
   } catch (error) {
      res.json({success:false})
      console.log(error.message);
   }
}


exports.userDetails=async(req,res)=>{
   try {
        const userDetails =await user.find()
        res.status(200).json({success:true,userData:userDetails})
   } catch (error) {
      res.status(200).json({success:false})
      console.log(error.message);
   }
}

exports.userBlocking=async(req,res)=>{
   try {
      const data = req.query.email
       const userNow = await user.findOne({email:data})
        if(userNow.blocking===false){
            await user.findOneAndUpdate({email:data},{$set:{blocking:true}}).then(()=>{
               res.status(200).json({success:true,blockedUser:true})
            })
            .catch((error)=>{
               console.log(error.message);
               res.status(200).json({success:false});
            })
        }else{
         await user.findOneAndUpdate({email:data},{$set:{blocking:false}}).then(()=>{
            res.status(200).json({success:true,blockedUser:false})
         })
         .catch((error)=>{
            console.log(error.message);
            res.status(200).json({success:false});
         })
        }
       
   } catch (error) {
      console.log(error.message)
      res.status(200).json({success:false});
   }
}

exports.bikeDetails=async(req,res)=>{
   try {
      const bikes = await bikeModel.find().populate('partnerId')
      if(bikes){
         res.status(200).json({success:true,bikes:bikes})
      }else{
         res.status(200).json({success:false})
      }

   } catch (error) {
      console.log(error.message);
      res.status(200).json({success:false});
   }
}

exports.partnerBikeReject=async(req,res)=>{
   try {
      const{bikeId,message,type}= req.body.data;
      const update = await bikeModel.findOneAndUpdate({_id:bikeId},{$set:{
         requestStatus:type,reason:message
      }})
      res.status(200).json({success:true})
      
   } catch (error) {
      console.log(error.message);
      res.status(200).json({success:false});
   }
}