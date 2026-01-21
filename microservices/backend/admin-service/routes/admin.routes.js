const express = require('express');
const router = express.Router();

const {home} = require('../controller/admin.controller')

router.get('/', home)

module.exports = router;