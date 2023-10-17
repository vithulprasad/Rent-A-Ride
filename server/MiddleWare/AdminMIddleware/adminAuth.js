const jwt = require('jsonwebtoken');

const AdminAuth =(req,res,next)=>{
    try {
        const tokenWithBearer = req.headers['authorization'];
        const token = tokenWithBearer.split(' ')[1];
        jwt.verify(token,process.env.TOKENSECRET,(err,encoded)=>{
            if(err){
                return res.status(401).send({message:"Auth failed",success:false})
            }else if (encoded.role === 'admin') {
          req.id = encoded.id;
          next();
        }
        })
    } catch (error) {   
      console.log(error.message);
    }
}


module.exports = {
    AdminAuth
  }