const mongoose= require("mongoose");

const chat = mongoose.Schema({
   partner:{
    type:String,
     required:true,
   },
   userName:{
     type:String,
     required:true
   },
   userNameLast:{
    type:String,
    required:true
  },
   userImage:{
    type:String,
    default:''
  },
  partnerName:{
    type:String,
    required:true
  },
  partnerImage:{
    type:String,
    default:''
  },
  user:{
    type:String,
    required:true
  },

   message:[{
      user:{type:String,default:""},
      partner:{type:String,default:""},
      date:{type:Date}
   }],
   lastMessage:{
    type:String,
    default:''
   },
   date:{
    type:Date,
    require:true
   }
})

module.exports = mongoose.model("chat",chat)