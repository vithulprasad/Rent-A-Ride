const mongoose= require("mongoose");

const user = mongoose.Schema({
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        require:true
    },

    //----------------------blocking details--------------------// 
    blocking:{
        type:Boolean,
        default:false
    },

    // ---------------------image handling ----------------------//
    image:{
        type:String,  
    },
    informationImage:{
        License:{
            type:String
        },
        verifyUser:{
            frontSide:{
                type:String
            },
            backSide:{
                type:String
            }

        }
    },
//---------------------------------true false value checker-----------------------------//

isPartner:{
    type:Boolean,
    default:false
}
})

module.exports = mongoose.model("user",user)