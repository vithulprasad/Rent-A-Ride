const mongoose= require("mongoose");

const Admin = mongoose.Schema({
   email:{
    type:String,
     required:true,
   },
   Password:{
     type:String,
     required:true
   },
   Roll:{
    type:String,
    default:"Admin"
   }
})

module.exports = mongoose.model("admin",Admin)