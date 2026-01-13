const userModel = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

exports.home = (req, res) => {
 try {
    res.render("index");  
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
};

exports.signUp = async (req, res) => {
  try {
  const { name, username, email, password } = req.body;
  if (!name || !username || !email || !password) {
    return res.status(400).json({
    success: false,
    message: "All feilds are required",
    });
  }
  let checkuser = await userModel.findOne({ email });
  if (checkuser != null) {
    return res.status(400).json({
    success: false,
    message: "Email already registered",
    });
  }
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
    let user = await userModel.create({
      name,
      username,
      email,
      password: hash,
    });
    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.redirect("/profile");
    });
  });
  } catch (error) {
  res.status(500).json({
    success: false,
    message: error.message,
  });
  }
};

exports.login = (req, res) => {
  try {
    res.render('login')
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
};

exports.validateLogin = async (req, res) => {
  try {
    const {email, password} = req.body;
    let user = await userModel.findOne({email});
    console.log(user);
    if(user){
      const check = await bcrypt.compare(password, user.password);
      if(check){
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.redirect('/profile');
      }
    }
    res.send('something went wrong')
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
};

exports.profile = async (req, res) => {
  try {
    const user = await userModel.findOne({_id:req.user.id}).populate('posts')
    res.render('profile', {user});
  } catch (error) {
    res.status(500).json({
      success: false,
      message:error.message
    })
  }
};

exports.logOut = (req, res) => {
  try {
    res.cookie("token", "");
    res.redirect("/"); 
  } catch (error) {
    res.status(500).json({
      success: false,
      message:error.message
    })
  }
};