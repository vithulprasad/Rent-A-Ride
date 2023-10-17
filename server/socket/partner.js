const jwt = require("jsonwebtoken");
const chat = require('../models/chat')

exports.findPartner=async(data)=>{
    try {
        const token =data.partner;
        const partner= jwt.verify(token,process.env.TOKENSECRET)
        const partnerId = partner.id
       const find = await chat.find().populate('user')
        const findCorrectUsers = find.filter((val)=>{
            return val.partner == partnerId 
        })
       return findCorrectUsers;
    } catch (error) {
        return error.message;
    }
}


exports.findUserChat=async(data)=>{
    try {
        const token =data.partner;
        const partner= jwt.verify(token,process.env.TOKENSECRET)
        const partnerId = partner.id
        const user = data.user

        const find = await chat.findOne({user:user,partner:partnerId})
        return find
    } catch (error) {
        return error.message
    }
}