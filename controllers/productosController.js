
const path = require('path'); 

const productController = {
    getProductCart: (req,res) => {
        res.render('productCart');
    },
    getProductDetail: (req,res) => {
        res.render('productDetail');
}}

module.exports = productController