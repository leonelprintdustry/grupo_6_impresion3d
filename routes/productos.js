
const express = require('express');

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

// GET RUTA /index 
router.get('/index', productosController.getIndex);

// @GET 1. /products (GET) 
router.get('/', productosController.getProducts);

// POST ruta /products
router.post('/', upload.any('images'), productosController.postProduct);


// GET /products/create
router.get('/productAdd', productosController.getCreate);

router.get('/:id/detail',  productosController.getProductDetail );

router.delete('/:id/delete',  productosController.deleteProduct );

// PUT ruta /products/:ID/update ---> /products/2/put
router.get('/:id/update', productosController.getUpdate);

// PUT ruta /products/:ID/update ---> /products/2/put
router.put('/:id/update', productosController.updateProduct);


router.get('/productCart', productosController.getProductCart );




// DELETE ruta /products/:ID/delete ---> /products/2/delete
router.delete('/:id/delete', productosController.deleteProduct);


module.exports = router;

