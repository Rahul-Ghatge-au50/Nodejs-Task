const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    number:{
        type:Number,
    },
    password:{
        type:String
    },
    image:{
        type:String
    },
    Admin:{
        type:Boolean,
        default:false
    }
})  

module.exports = mongoose.model('users',UserSchema);