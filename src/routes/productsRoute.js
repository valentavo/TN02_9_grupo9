const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const productsController = require('../controllers/productsController.js');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.resolve(__dirname, '../../public/img'));
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}_img${path.extname(file.originalname)}`);
    }
});

const uploadFile = multer({ storage });

// Carrito
router.get('/cart', productsController.cart);

// Detalle
router.get('/detail/:productId', productsController.details);

// Listado
router.get('/List/', productsController.list);

// Creacion
router.get('/create', productsController.create);
router.post('/create', uploadFile.single('productImg'), productsController.createProcess);

// Edicion
router.get('/edit/:productId', productsController.edit);
router.post('/edit/:productId', uploadFile.single('productImg'), productsController.editProcess);

module.exports = router;