const mongoose= require("mongoose");

const Chat = mongoose.Schema({
   user:{
    type:String,
     required:true,
     ref:'user',
   },
   partner:{
     type:String,
     required:true,
     ref:"partner",
   },
   chat:[{
          user:{type:String,default:""},
          partner:{type:String,default:""}
         }]
 
})

module.exports = mongoose.model("Chat",Chat)