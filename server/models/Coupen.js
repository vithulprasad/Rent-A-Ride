const mongoose= require("mongoose");

const coupon = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    heading:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    code:{
        type:String,
        require:true
    },
    percentage:{
        type:Number,
        require:true
    },
    minimum:{
        type:Number,
        require:true
    },
    expiry:{
        type:Number,
        require:true
    },
    user:{
        type:Array,
        ref:"users",
    },
    is_correct:{
        type:Boolean,
        default:false
    },
    image:{
        type:String
    },
    date:{
        type:Date
    }
})

module.exports = mongoose.model("coupon",coupon)