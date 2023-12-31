const mongoose= require("mongoose");

const booking = mongoose.Schema({
  bookingId:{
      type: String,
      required:true
  },
  userId:{
    type:String,
    ref:'user',
    required:true
  },
  bike:{
    type:String,
    ref:"bikes",
    required:true
  },
  partner:{
    type:String,
    ref:"partner",
    required:true
  },
  paymentStatus:{
    type:String,
    default:"pending"
  },
  refundStatus:{
    type:Boolean,
    default:false
  },
  purchaseDate:{
    type:Date,
  },
  dates:{
    startDate:{type:Date},
    endDate:{type:Date},
    startTime:{type:String},
    endTime:{type:String}
  },
  difference:{
    date:{type:Number},
    time:{type:Number}
  },
 location:{
    type:String
  },
 bikeStatus:{
    type:String,
    default:"pending"
 },
 image:{
    type:String,
 },
 bikeName:{
    type:String,
 },
 totalAmount:{
    type:Number
 },
 deposit:{
    type:Number
 },
 helmet:{
    type:Number
 },
 couponCode:{
    type:String
 },
 couponId:{
    type:String
 },
 couponAdd:{
  type:Boolean,
  default:false
 }
})

module.exports = mongoose.model("booking",booking)