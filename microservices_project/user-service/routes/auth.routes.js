const express = require('express');
const router = express.Router();

const { login, signup, createUser, validateLogin, dashboard } = require('../controller/auth.controller');

router.get("/", (req, res) => {
  res.json({
    status: "User Service is running",
  });
});

router.get('/login', login);
router.post('/login', validateLogin);
router.get('/signup', signup);
router.post('/createUser', createUser);
router.get('/dashboard', dashboard);

module.exports = router;