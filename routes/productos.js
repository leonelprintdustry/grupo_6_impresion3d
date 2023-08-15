
const express = require('express');
const path = require('path');
const router = express.Router();
const authMiddlewares = require('../middlewares/authMiddlewares');
const productosController = require('../controllers/productosController');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/productos');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// GET /products (GET)
router.get('/', productosController.getProducts);

// POST ruta /products
router.post(
  '/index',
  upload.any('imagen'),
  authMiddlewares.allowSignedIn,
  productosController.postProduct
);
// GET /PRODUCTS (GET)
router.get('/index', productosController.getIndex);

// GET ruta /products/intro
router.get('/intro', productosController.getIntro);

// GET /products/create
router.get('/create', authMiddlewares.allowSignedIn, productosController.getCreate);

router.get('/:id/delete', authMiddlewares.allowSignedIn, productosController.deleteProduct );

router.get('/:id/detail', authMiddlewares.allowSignedIn, productosController.getProductDetail );


router.get('/:id/update', authMiddlewares.allowSignedIn,productosController.getUpdate);


router.get('/:id/addToCart', authMiddlewares.allowSignedIn, productosController.addToCart);


router.get(
  '/:id/edit',
  authMiddlewares.allowSignedIn,
  productosController.getUpdate
);

router.put(
  '/:id/edit',
  upload.any('imagen'), 
  authMiddlewares.allowSignedIn,
  productosController.updateProduct
);

router.get('/productCart', authMiddlewares.allowSignedIn, productosController.getProductCart);

// Exportar el router
module.exports = router;






