const partner = require('../models/Partner')
const admin = require('../models/Admin')
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const  jwt  = require('jsonwebtoken');




exports.login=async(req,res)=>{
     const {email,password}=req.body.data   
     
console.log(email,password,'emal and password');
     const AdminFind = await admin.find()
       if(AdminFind.length>0){
        
            const verifyAdmin = await admin.findOne({email:email})
               if(verifyAdmin){
                  console.log("email is currect");
                  const passwordMatch =  await bcrypt.compare(password,verifyAdmin.Password);
                  console.log(passwordMatch);
                       if(passwordMatch){
                        const token = jwt.sign({ id: verifyAdmin._id }, process.env.TOKENSECRET, {
                           expiresIn: "30d",
                         });
                         const obj = {
                           token,
                           email: email,
                           roll:"admin"
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
      console.log(requested_partner,'this is the data----');
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
      console.log(requested_partner,'this is the data----');
      res.status(200).json({success:true,request:requested_partner})
   } catch (error) {
      console.log(error.message);
   }
}

exports.rejected=async(req,res)=>{
   try {
      console.log(req.body.data,'this is email',req.body.email);
      const information =req.body.data.information;
      const reason = req.body.data.reason
      const email = req.body.email
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