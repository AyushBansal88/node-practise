const userModel = require('../models/user');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) =>{
  try {
    let {username, email, phone, password} = req.body;
    if(!username || !email || !phone || !password){
        return res.status(400).json({
            success: false,
            message: 'All feilds are required'
        })
    }
    let checkuser = await userModel.findOne({email});
    console.log(checkuser);
    if(checkuser != null){
        return res.status(400).json({
          success: false,
          message: "Email already registered",
        });
    }
    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(password, salt, async function(err, hash){
        let user = await userModel.create({
          username,
          email,
          phone,
          password: hash
        })
        console.log(user);
        res.status(201).json({
          success: true,
          message: "Account created successfully",
          user,
        });
      })
    })
  } catch(err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

