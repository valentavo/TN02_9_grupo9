const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const productsController = require('../controllers/productsController.js');
const productValidation = require('../middlewares/productValidation.js');
const adminUserAccess = require('../middlewares/adminUserAccess.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, path.resolve(__dirname, '../../public/img/productos'));
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}_img${path.extname(file.originalname)}`);
    }
});

const uploadFile = multer({ storage });

// Carrito
router.get('/cart', productsController.cart);

// Detalle
router.get('/detail/:productId', productsController.detail);

// Listado
router.get('/list', authMiddleware, adminUserAccess, productsController.list);

// Creacion
router.get('/create', authMiddleware,  adminUserAccess, productsController.create);
router.post('/create', uploadFile.array('productImg', 5), productValidation, productsController.createProcess);

// Edicion
router.get('/edit/:productId', authMiddleware, adminUserAccess, productsController.edit);
router.put('/edit/:productId', uploadFile.array('img', 5), productsController.editProcess);

// Eliminacion
router.delete('/delete/:productId', authMiddleware, adminUserAccess, productsController.delete);

module.exports = router;