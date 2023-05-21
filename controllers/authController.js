
const path = require('path'); 

const authController = {
    getLogin: (req,res) => {
        res.render('login');
    },
    getRegister: (req,res) => {
        res.render('register');
}}

module.exports = authController