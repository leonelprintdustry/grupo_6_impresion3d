
const path = require('path'); 

const mainController = {
    getIndex: (req,res) => {
        res.sendFile(path.join(__dirname,'../views/index.html'));
}}

module.exports = mainController