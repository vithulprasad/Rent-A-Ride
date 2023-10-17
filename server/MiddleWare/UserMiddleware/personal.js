const userModel = require("../../models/Users")


exports.haveDetails =async(req,res,next)=>{
   try {
    console.log("coming---------------");
    const id = req.id;
    const findUser = await userModel.findOne({_id:id})
    console.log(findUser,'-------');
      if(findUser.Profile==""){
        console.log("no profile found");
        res.status(200).json({userDetails:"no_profile"})
      }else if(findUser.address === undefined || findUser.address===null){
        console.log("no address found");
        res.status(200).json({userDetails:"no_address"})
      }else if(findUser.license.front==="" || findUser.license.back===""){
        console.log("no license found");
        res.status(200).json({userDetails:"no_license"})
      }else if(findUser.userInfo.front === ""  || findUser.userInfo.back===""){
        console.log("no personalInfo found");
        res.status(200).json({userDetails:"no_personalInfo"})
      }else{
        next()
      }
   } catch (error) {
    console.log(error.message);
    res.status(200).json({success:false})
   }
}

