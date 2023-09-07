const express = require('express');
const productApiController = require('../controllers/productApiController');
const router = express.Router();

// Ruta para obtener la lista de productos
router.get('/products', productApiController.getProducts);

// Ruta para obtener los detalles de un producto por ID
router.get('/products/:id', productApiController.getProductById);

module.exports = router;
