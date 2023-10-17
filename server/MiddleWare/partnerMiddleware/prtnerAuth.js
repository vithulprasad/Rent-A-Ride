const jwt = require('jsonwebtoken');
const partnerModel = require('../../models/Partner')


const partnerAuth =(req,res,next)=>{
    try {
        const tokenWithBearer = req.headers['authorization'];
        const token = tokenWithBearer.split(' ')[1];
        jwt.verify(token,process.env.TOKENSECRET,(err,encoded)=>{
            if(err){
                return res.status(401).send({message:"Auth failed",success:false})
            }else if (encoded.role === 'partner') {
          req.id = encoded.id;
          next();
        }
        })
    } catch (error) {   
      console.log(error.message);
    }
}

const isBlocked = async(req,res,next)=>{
  try {
      const partnerId = req.id
      const partner = await partnerModel.findOne({_id:partnerId})
      if(partner.blocking===false){
        next();
      }else{
        return res.status(200).send({message:"partner is blocked",success:false})
      }
  } catch (error) {
    return res.status(200).send({message:"Auth failed",success:false})
  }
}

module.exports = {
    partnerAuth,
    isBlocked
  }