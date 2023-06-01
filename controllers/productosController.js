
const path = require('path'); 

const productModel = require('../models/productos');

const productController = {
    getProductCart: (req,res) => {
        res.render('productCart');
    },
    getProductDetail: (req,res) => {
        res.render('productDetail');
    },
    getProductAdd: (req,res) => {
        res.render('productAdd');
    },
    // @GET 1. /products (GET)
      getProducts: (req, res) => {
        const productos = productModel.findAll();
        res.render('index', {
            title: 'Productos',
            productos
        });
    },


};



module.exports = productController