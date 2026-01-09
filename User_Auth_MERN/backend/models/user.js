const mongoose = require('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017/MERN_LOGIN`);

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    phone:{
        type:Number,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    isAuthorized:{
        type:Boolean,
        default: false
    }
})

module.exports = mongoose.model('user', userSchema);