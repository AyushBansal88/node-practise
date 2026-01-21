const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    isAdmin:{
        type:Boolean,
        default:true
    }
});

module.exports = mongoose.model('admin', adminSchema);
