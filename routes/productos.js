
const express = require('express');

const router = express.Router();

const productController = require('../controllers/productosController');

const multer = require('multer');

const storage = multer.diskStorage({  
    destination: (req, file, cb) => {
        cb(null, './public/images/productos');
    },
    filename: (req, file, cb) => {
        console.log(path.extname(file.originalname))
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

router.post('/', upload.any('img'), productosController.XXXXXXXXX);

router.get('/productCart', productController.getProductCart );

router.get('/productDetail',  productController.getProductDetail );

router.get('/productAdd',  productController.getProductAdd );

module.exports = router;

