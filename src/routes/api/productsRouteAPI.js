//Tools
const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');

const productsApi = require('../../controllers/api/productsAPI.js');

//Validations
const productValidation = require('../../middlewares/productValidation.js');

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
router.get('/create', productsApi.create);
router.post('/create', uploadFile.array('productImg', 5), productValidation, productsApi.createProcess);
router.post('/edit', productsApi.edit);

module.exports = router;