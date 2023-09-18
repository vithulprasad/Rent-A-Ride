const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const partner = require("../models/Partner");
const bikes = require("../models/BikeModel")
exports.login=async(req,res)=>{
    try {
        console.log(req.body.data);
        const {email,password} = req.body.data
        const PartnerValid = await partner.findOne({email:email});
            if(PartnerValid){
                if(PartnerValid.requestStatus===true){
                    if(PartnerValid.blocking===false){
                    const passwordMatch =  await bcrypt.compare(password,PartnerValid.password);
                       if(passwordMatch){
                        if(PartnerValid.role==="partner"){
                            //-----json wevToken creation------
                            const token = jwt.sign({ id: PartnerValid._id,role:"partner" }, process.env.TOKENSECRET, {
                                expiresIn: "30d",
                              });
                              const obj = {
                                token,
                                name:PartnerValid.name,
                                roll:"partner"
                              };
                              res.status(200).json({obj,success:true,name:PartnerValid.name,blocking:false})
                        }else{
                            
                            res.status(200).json({success:false})
                        }
                     
                       }else{
                        res.status(200).json({success:false})
                       }
                    }else{
                        res.status(200).json({success:true,blocking:true})  
                    }
                }else{
                    console.log("this is request sattus");
                  res.status(200).json({success:false})
                }
            }else{
                res.status(200).json({success:false})
            }
    } catch (error) {
        console.log(error.message);
    }
}

exports.navProfileDetails=async(req,res)=>{
    try {
        let token = req.query.id
        let tokenVerify=jwt.verify(token, process.env.TOKENSECRET)
         let findPartner = await partner.findOne({_id:tokenVerify.id})
         res.status(200).json({success:true,data:findPartner})
    } catch (error) {
        console.log(error.message);
    }
}


 exports.AddBike = async(req,res)=>{
    try {
    const token=req.body.partner
        const verifyToken = jwt.verify(token,process.env.TOKENSECRET)
        const partnerId=verifyToken.id
        const partnerDetails = await partner.findOne({_id:partnerId})
        if(partnerId){
            const {bikeName,bikeBrand,rentPerHour,bikeCategory,bikeCC,plateNumber}=req.body.data
            const addBike = new bikes({
                name: bikeName,
                BrandName: bikeBrand,
                rentPerHour: rentPerHour,
                NormalCategory: bikeCategory,
                cc: bikeCC,
                PlateNumber:plateNumber,
                partnerId:partnerId,
                data:Date.now(),
                image:req.body.image,
                companyName:partnerDetails.company
              });
             await addBike.save()
             .then(()=>{res.status(200).json({success:true})})
             .catch((err)=>{res.status(200).json({success:false})})
        }else{
            res.status(200).json({success:false})
        }
    } catch (error) {
        console.log(error.message);
        res.status(200).json({success:false})
    }
}

exports.listBike=async(req,res)=>{
    try {
        const token = req.query.token;
        const partner =jwt.verify(token,process.env.TOKENSECRET)
        const partnerId = partner.id;
          if(partnerId){
             const bike = await bikes.find({partnerId: partnerId})
             res.status(200).json({success:true,bikes:bike})
          }else{
            res.status(200).json({success:false })
          }
    } catch (error) {
        console.log(error.message);
        res.status(200).json({success:false})
    }
}