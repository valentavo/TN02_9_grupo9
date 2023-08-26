//Tools
const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController.js');

//Middlewares
const adminUserAccess = require('../middlewares/adminUserAccess.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

// Carrito
router.get('/cart', productsController.cart);

// Detalle
router.get('/detail/:productId', productsController.detail);

// Listado
router.get('/list', authMiddleware, adminUserAccess, productsController.list);

// Creacion
router.get('/create', authMiddleware,  adminUserAccess, productsController.create);

// Edicion
router.get('/edit/:productId', authMiddleware, adminUserAccess, productsController.edit);

module.exports = router;