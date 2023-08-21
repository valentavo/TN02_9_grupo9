//Tools
const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController.js');

//Middlewares
const authMiddleware = require('../middlewares/authMiddleware.js');
const guestMiddleware = require('../middlewares/guestMiddleware.js');


//Acceso Usuario
router.get('/login', guestMiddleware, usersController.login);

//Perfil Usuario
router.get('/profile', authMiddleware, usersController.profile);

//Creacion Registro Usuario
router.get('/registro', guestMiddleware, usersController.register);

module.exports = router;