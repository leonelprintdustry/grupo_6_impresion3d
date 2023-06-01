
const express = require('express');

const router = express.Router();

const productController = require('../controllers/productosController');

const multer = require('multer');

router.get('/productCart', productController.getProductCart );

router.get('/productDetail',  productController.getProductDetail );

router.get('/productAdd',  productController.getProductAdd );

// @GET 1. /products (GET) 
router.get('/', productController.getProducts);

module.exports = router;
s
