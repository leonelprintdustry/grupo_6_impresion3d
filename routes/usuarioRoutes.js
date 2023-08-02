const express = require('express');
const jugadorControllers = require('../controllers/usuarioControllers');

const router = express.Router();

// @GET - /users
router.get('/', jugadorControllers.listForm);

// @GET - /users/:id/update
router.get('/:id/update', jugadorControllers.getUpdate);

// @POST - /users
router.post('/', jugadorControllers.create);

// @PUT- /users
router.put('/', jugadorControllers.updatePlayer);

module.exports = router;