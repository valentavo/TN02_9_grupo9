const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const usersController = require('../controllers/usersController.js');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, path.resolve(__direname, "../../public/img"))
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}_img${path.extname(file.originalname)}`);
    }
});

const uploadFile = multer({ storage });

//Acceso Usuario
router.get('/login', usersController.login);

//Creacion Usuario
router.get('/registro', usersController.register);
router.post('/registro', usersController.registerProcess);

//Edicion Usuarrio
router.get('/edit/:userId', usersController.edit);
router.put('/edit/:userId', uploadFile.single('img'), usersController.editProcess);

//Eliminacion Usuario
router.delete('/edit/:userId', usersController.delete);

module.exports = router;