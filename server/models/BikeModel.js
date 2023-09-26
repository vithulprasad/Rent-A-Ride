const mongoose= require("mongoose");

const bikes = mongoose.Schema({
     name:{
        type:String,
        required:true
     },
     BrandName:{
        type:String,
        required:true
     },
     rentPerHour:{
        type:Number,
        required:true
     },
     NormalCategory:{
        type:String,
        required:true
     },
     cc:{
        type:String,
        required:true
     },
     PlateNumber: { 
        type:String,
        required:true
     },
     image:{
        type:Array
     },
     partnerId:{
        type:String,
        ref:'partner',
        required:true
     },
     data:{
        type:Date
     },
     Users:{
        type:String,
        ref:'users',
     },
     Listed:{
        type:Boolean,
        default:false
     },
     companyName:{
      type:String,
      required:true
     },
     available:{
      type:Boolean,
      default:true
     },
     locations:{
      type:Array,
     },
     requestStatus:{
      type:String,
      default:"requested"
     },
     reason:{
      type:String
     },
     requesting:{
      type:Boolean,
      default:false
     },
     isComplete:{
       type:Boolean,
       default:false
     }
     
})

module.exports = mongoose.model("bikes",bikes)