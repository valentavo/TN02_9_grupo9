const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const usersController = require('../controllers/usersController.js');
const registerValidation = require('../middlewares/registerValidation.js');

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
router.post('/login', usersController.loginProcess);

//Perfil Usuario
router.get('/profile/:userId', usersController.profile);

//Creacion Registro Usuario
router.get('/registro', usersController.register);
router.post('/registro', registerValidation, usersController.registerProcess);

//Edicion Usuario
router.get('/edit/:userId', usersController.edit);
router.put('/edit/:userId', registerValidation, uploadFile.single('img'), usersController.editProcess);

//Eliminacion Usuario
router.delete('/edit/:userId', usersController.delete);

module.exports = router;