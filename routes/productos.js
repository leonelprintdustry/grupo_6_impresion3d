
const express = require('express');
const path = require('path');
const router = express.Router();
const authMiddlewares = require('../middlewares/authMiddlewares');

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
router.post('/index', upload.any('images'), authMiddlewares.allowSignedIn, productosController.postProduct);

// GET RUTA /index 
router.get('/index', authMiddlewares.allowSignedIn, productosController.getIndex);

// GET ruta /products/intro
router.get('/intro', productosController.getIntro);


// GET /products/create
router.get('/create',authMiddlewares.allowSignedIn, productosController.getCreate);

router.get('/:id/detail', authMiddlewares.allowSignedIn, productosController.getProductDetail );

router.delete('/:id/delete', authMiddlewares.allowSignedIn, productosController.deleteProduct );

router.get('/:id/update', authMiddlewares.allowSignedIn,productosController.getUpdate);

// PUT ruta /products/:ID/update ---> /products/2/put
router.get('/:id/edit', authMiddlewares.allowSignedIn,productosController.getUpdate);

// PUT ruta /products/:ID/update ---> /products/2/put
router.put('/:id/edit', authMiddlewares.allowSignedIn, productosController.updateProduct);


router.get('/productCart',authMiddlewares.allowSignedIn, productosController.getProductCart );



module.exports = router;

