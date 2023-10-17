const mongoose= require("mongoose");

const partner = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    gender:{
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
    company:{
        type:String,
        require:true
    },
    //----------------------addresses--------------------------//
    address:{
        district:{type:String},
        state:{type:String},
        localArea:{type:String},
        age:{type:Number},
        post:{type:String},
        pin:{type:Number}
    },
    requestStatus:{
        type:Boolean,
        default:false
    },

    //----------------------blocking details--------------------// 
    blocking:{
        type:Boolean,
        default:false
    },
    access:{
        type:String,
        default:"requesting"
    },
    accessInformation:{
       type:String
    },
    accessReasons:{
        type:String
    },

// ---------------------image handling ----------------------//
    image:{
        type:String, 
        default:'' 
    },
  
//---------------------------------true false value checker-----------------------------//

isClient:{
    type:Boolean,
    default:false
},
locationPoints:{
    type:Array
},
date:{
    type:Date
}


})

module.exports = mongoose.model("partner",partner)