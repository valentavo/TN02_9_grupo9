const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const productsController = require('../controllers/productsController.js');
const productValidation = require('../middlewares/productValidation.js');
const adminUserAccess = require('../middlewares/adminUserAccess.js');

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
router.get('/list', adminUserAccess, productsController.list);

// Creacion
router.get('/create', adminUserAccess, productsController.create);
router.post('/create', uploadFile.single('productImg'), productValidation, productsController.createProcess);

// Edicion
router.get('/edit/:productId', adminUserAccess, productsController.edit);
router.put('/edit/:productId', uploadFile.single('productImg'), productsController.editProcess);

// Eliminacion
router.delete('/delete/:productId', adminUserAccess, productsController.delete);

module.exports = router;