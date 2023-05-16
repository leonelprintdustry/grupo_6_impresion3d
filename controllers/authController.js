
const path = require('path'); 

const authController = {
    getLogin: (req,res) => {
        res.sendFile(path.join(__dirname,'../views/login.html'));
    },
    getRegister: (req,res) => {
        res.sendFile(path.join(__dirname,'../views/register.html'));
}}

module.exports = authController