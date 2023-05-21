
const express = require('express');

const router = express.Router();

const productController = require('../controllers/productosController')

router.get('/productCart', productController.getProductCart );

router.get('/productDetail',  productController.getProductDetail );

module.exports = router;