
const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController')

router.get('/login',authController.getLogin );

router.get('/register',authController.getRegister );

module.exports = router;