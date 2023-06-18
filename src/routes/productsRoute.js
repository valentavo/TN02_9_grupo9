const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController.js');

router.get('/cart', productsController.cart);
router.get('/detail/:productId', productsController.details);
router.get('/create', productsController.create);

module.exports = router;