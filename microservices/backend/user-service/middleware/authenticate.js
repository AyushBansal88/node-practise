const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

async function authenticate(req, res, next) {
  try {
    const token = req.cookies.token;
    if (token == "") {
      return res.redirect("/");
    }
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ _id: data.id });
    if (user != null) {
      req.user = user;
      return next();
    }
    return res.redirect("/");
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = authenticate;
