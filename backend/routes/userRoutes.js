const express = require ('express');
const controllers = require('../controllers/userControllers');
const path = require('path');
const router = express.Router();

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/users');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
    }
});

// Crear el middleware multer
const upload = multer({ storage });

//@GET - /users/sign-out
router.get('/sign-out', controllers.signOut);

//@GET - /users/register
router.get('/register', controllers.getRegister);

//@GET - /users
router.post('/', upload.any('imagen'),controllers.registerUser);

//@GET - /users/login
router.get('/login', controllers.getLogin);

//@GET - /users
router.post('/login', controllers.loginUser);

module.exports = router;