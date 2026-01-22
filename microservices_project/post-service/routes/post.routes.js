const express = require('express');
const router = express.Router();

const {} = require('../controller/post.controller');

router.get("/", (req, res) => {
  res.json({
    status: "Post Service is running",
  });
});


module.exports = router;