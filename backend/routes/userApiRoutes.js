
const express = require('express');
const userApiController = require('../controllers/userApiController');
const router = express.Router();

// Ruta para obtener la lista de usuarios
router.get('/users', userApiController.getUsers);

// Ruta para obtener los detalles de un usuario por ID
router.get('/users/:id', userApiController.getUserById);

module.exports = router;
