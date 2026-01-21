const userModel = require('../models/user');
const jwt = require("jsonwebtoken");
const hashPassword = require('../utils/hash-password');
const validatePassword = require('../utils/validate-password');

exports.signup = (req, res) => {
  res.render('signup');
};

exports.createuser = async (req, res) => {
  try {
    let { name, username, email, password } = req.body;
    if(!name || !username || !email || !password){
      return res.send('all feilds are required');
    }
    let checkUser = await userModel.find({email})
    if(checkUser != ''){
      return res.send('Email already registered');
    }
    let hash = await hashPassword(password);
    let user = await userModel.create({
      name,
      username,
      email,
      password: hash
    });
    console.log(user);
    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.redirect("/profile");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

exports.profile = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.user.id });
    res.render("profile", { user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.logOut = (req, res) => {
  try {
    res.cookie("token", "");
    res.redirect("/");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.validateLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (user) {
      if (await validatePassword(password, user.password)) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.cookie("token", token, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.redirect("/profile");
      }
    }
    return res.send("something went wrong");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};