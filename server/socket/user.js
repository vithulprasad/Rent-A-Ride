const jwt = require("jsonwebtoken");
const chat = require('../models/chat')


exports.saveAndRespond=async(datas)=>{
     try {
        console.log(datas);
        const partnerId = datas.partner
        const token = datas.user
        const verify = jwt.verify(token,process.env.TOKENSECRET)
        const userId = verify.id

        const find = await chat.findOne({user:userId,partner:partnerId}) 
        if (find) {
            console.log("user found");
            const newMessage = {
              user: datas.message, // or partner: datas.message, based on the condition
            };
          
            await chat.findOneAndUpdate(
              { user: userId, partner: partnerId },
              { $push: { chat: newMessage } }
            );
          } else {
          
            const newChat = new chat({
              user: userId,
              partner: partnerId,
              chat: [{ user: datas.message }] // or partner: datas.message, based on the condition
            });
            await newChat.save();
          }
          


        const findChat = await chat.findOne({user:userId,partner:partnerId})
         console.log(findChat);

        return findChat
     } catch (error) {
        
     }
}



exports.respond=async(datas)=>{
    try {
       
        const partnerId = datas.partner
        const token = datas.user
        const verify = jwt.verify(token,process.env.TOKENSECRET)
        const userId = verify.id

        const find = await chat.findOne({user:userId,partner:partnerId}) 
          return find;
    } catch (error) {
      return error.message  
    }
}