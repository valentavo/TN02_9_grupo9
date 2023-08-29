//Tools
const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController.js');

//Middlewares
const adminUserAccess = require('../middlewares/adminUserAccess.js');
const authMiddleware = require('../middlewares/authMiddleware.js');


router.get('/cart', productsController.cart);
router.get('/list', productsController.list);
router.get('/adminlist', authMiddleware, adminUserAccess, productsController.adminList);
router.get('/detail/:productId', productsController.detail);
router.get('/create', authMiddleware,  adminUserAccess, productsController.create);
router.get('/edit/:productId', authMiddleware, adminUserAccess, productsController.edit);

module.exports = router;