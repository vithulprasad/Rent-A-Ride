const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const partner = require("../models/Partner");


exports.login=async(req,res)=>{
    try {
        console.log(req.body.data);
        const {email,password} = req.body.data
        const PartnerValid = await partner.findOne({email:email});
            if(PartnerValid){
                if(PartnerValid.requestStatus===true){
                    const passwordMatch =  await bcrypt.compare(password,PartnerValid.password);
                       if(passwordMatch){
                        if(PartnerValid.role==="partner"){
                            //-----json wevToken creation------
                            const token = jwt.sign({ id: PartnerValid._id }, process.env.TOKENSECRET, {
                                expiresIn: "30d",
                              });
                              const obj = {
                                token,
                                name:PartnerValid.name,
                                roll:"partner"
                              };
                              res.status(200).json({obj,success:true,name:PartnerValid.name})
                        }else{
                            res.status(200).json({success:false})
                        }
                       }else{
                        res.status(200).json({success:false})
                       }
                }else{
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