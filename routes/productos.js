
const express = require('express');
const path = require('path');
const router = express.Router();

const productosController = require('../controllers/productosController');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/productos');
    },
    filename: (req, file, cb) => {
        //const extension = file.originalname.split('.')[1];
        console.log(path.extname(file.originalname))
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage});


// @GET 1. /products (GET) 
router.get('/', productosController.getProducts);

// POST ruta /products
router.post('/index', upload.any('images'), productosController.postProduct);

// GET RUTA /index 
router.get('/index', productosController.getIndex);


// GET /products/create
router.get('/create', productosController.getCreate);

router.get('/:id/detail',  productosController.getProductDetail );

router.delete('/:id/delete',  productosController.deleteProduct );

router.get('/:id/update', productosController.getUpdate);

// PUT ruta /products/:ID/update ---> /products/2/put
router.get('/:id/edit', productosController.getUpdate);

// PUT ruta /products/:ID/update ---> /products/2/put
router.put('/:id/edit', productosController.updateProduct);


router.get('/productCart', productosController.getProductCart );



module.exports = router;

