//Tools
const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const productsApi = require('../../controllers/api/productsAPI.js');

//Validations
const createProductValidation = require('../../middlewares/createProductValidation.js');

//Middlewares
const adminUserAccess = require('../../middlewares/adminUserAccess.js');
const authMiddleware = require('../../middlewares/authMiddleware.js');

//Images storage with multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, path.resolve(__dirname, "../../../public/img/productos"))
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}_img${path.extname(file.originalname)}`);
    }
});
const uploadFile = multer({ storage });

router.post('/detail', productsApi.detail);
router.get('/list', productsApi.list);
router.get('/cart', productsApi.cart);
router.get('/adminList', productsApi.list);

//CRUD
router.get('/create', productsApi.create);
router.post('/create', uploadFile.array('productImg', 5), createProductValidation, productsApi.createProcess);
router.post('/edit', productsApi.edit);
router.put('/edit', uploadFile.array('productImg', 5), createProductValidation, productsApi.editProcess);
router.delete('/edit/delete', authMiddleware, adminUserAccess, productsApi.delete);

module.exports = router;