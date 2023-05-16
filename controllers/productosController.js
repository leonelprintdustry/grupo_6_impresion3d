
const path = require('path'); 

const productController = {
    getProductCart: (req,res) => {
        res.sendFile(path.join(__dirname,'../views/productCart.html'));
    },
    getProductDetail: (req,res) => {
        res.sendFile(path.join(__dirname,'../views/productDetail.html'));
}}

module.exports = productController