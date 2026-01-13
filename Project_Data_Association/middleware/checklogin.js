const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

async function checkLogin(req, res, next){
  try {
    const token = req.cookies.token;
    if (token == "") {
      return res.redirect("/login");
    }
    const data = jwt.verify(token, "secretkey");
    const user = await userModel.findOne({ _id: data.id });
    if (user != null) {
      req.user = user;
      return next();
    }
    return res.redirect('/login');
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
  
}

module.exports = checkLogin;