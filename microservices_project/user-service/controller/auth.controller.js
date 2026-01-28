const jwt = require('jsonwebtoken');
const hashPassword = require('../utils/hashPassword');
const comparePassword = require('../utils/comparePassword');
const userModel = require('../model/user.model');

exports.login = (req, res) => {
  res.render('login');
}

exports.signup = (req, res) => {
  res.render('signup');
}

exports.createUser = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.send('all feilds are required');
    }
    let checkUser = await userModel.find({ email })
    if (checkUser != '') {
      return res.send('Email already registered');
    }
    let hash = await hashPassword(password);
    let user = await userModel.create({
      username,
      email,
      password: hash
    });
    console.log(user);
    let token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.cookie("token", token, {
      maxAge: 6 * 60 * 60 * 1000,
    });
    return res.redirect('/dashboard');
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

exports.validateLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (user) {
      if (await comparePassword(password, user.password)) {
        let token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
        res.cookie("token", token, {
          maxAge: 6 * 60 * 60 * 1000,
        });
        return res.redirect('/dashboard');
      }
    }
    return res.send("something went wrong");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

exports.dashboard = async (req, res) => {
  let user = await userModel.findOne({_id:req.headers['x-user-id']});
  // res.send(user);
  res.render('dashboard' ,{user:user})
}