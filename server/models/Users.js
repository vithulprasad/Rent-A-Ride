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
    Profile:{
        type:String,
        default:''  
    },
    license:{
        front:{
            type:String,
            default:''  
        },
        back:{
            type:String,
            default:''  
        }
    },

    userInfo:{
        front:{
            type:String,
            default:''  
        },
        back:{
            type:String,
            default:''  
        }
    },
    address:{
        district:{type:String},
        state:{type:String},
        localArea:{type:String},
        age:{type:Number},
        post:{type:String},
        pin:{type:Number}
    },
//---------------------------------true false value checker-----------------------------//

isPartner:{
    type:Boolean,
    default:false
},
date:{
    type:Date
},
location:{
    type:String,
},

// ----wallet -------
wallet:{
    type:Number,
    default:0
},
walletHistory:{
    type:Array,
    ref:"booking"
},
walletDate:[{
    type:Date
}]
})

module.exports = mongoose.model("user",user)