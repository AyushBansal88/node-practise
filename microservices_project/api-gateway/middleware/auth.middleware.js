const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data;   
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};