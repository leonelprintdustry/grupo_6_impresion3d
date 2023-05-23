
const path = require('path'); 

const productController = {
    getProductCart: (req,res) => {
        res.render('productCart');
    },
    getProductDetail: (req,res) => {
        res.render('productDetail');
    },
    getProductAdd: (req,res) => {
        res.render('productAdd');
}};

module.exports = productController