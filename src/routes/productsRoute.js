const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController.js');

router.get('/carrito', productsController.cart);
router.get('/detalle-del-producto', productsController.details);

module.exports = router;