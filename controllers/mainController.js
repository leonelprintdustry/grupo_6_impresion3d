
const path = require('path'); 

const mainController = {
    getIndex: (req,res) => {
        res.render('index');
}
}

module.exports = mainController