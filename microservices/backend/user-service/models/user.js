const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:String,
    username:String,
    email:String,
    password:String,
    role:{
        type:String,
        enum: ['user', 'admin'],
        default:'user'
    }
});

module.exports = mongoose.model('user', userSchema);
