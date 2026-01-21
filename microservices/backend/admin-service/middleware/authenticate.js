const jwt = require("jsonwebtoken");
const adminModel = require("../models/admin");

async function authenticate(req, res, next) {
  try {
    const token = req.cookies.token;
    if (token == "") {
      return res.redirect("/admin");
    }
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const user = await adminModel.findOne({ _id: data.id });
    if (user != null) {
      req.user = user;
      return next();
    }
    return res.redirect("/admin");
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = authenticate;
