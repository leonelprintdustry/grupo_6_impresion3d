const express = require('express');
const productApiController = require('../controllers/productApiController');
const router = express.Router();

// Ruta para obtener la lista de productos
router.get('/products', productApiController.getProducts);

router.get('/products/total', productApiController.getTotalProducts);

router.get('/products/ultimo', productApiController.getUltimoProducto); // Ruta para obtener el último producto

// Ruta para obtener los detalles de un producto por ID
router.get('/products/:id', productApiController.getProductById);

router.get('/categorias/total', productApiController.getTotalCategorias);

router.get('/categorias', productApiController.getCategorias);


module.exports = router;
