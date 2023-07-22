//Tools
const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const usersController = require('../controllers/usersController.js');

//Middlewares
const registerValidation = require('../middlewares/registerValidation.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const guestMiddleware = require('../middlewares/guestMiddleware.js');

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
router.get('/login', guestMiddleware, usersController.login);
router.post('/login', usersController.loginProcess);

//Perfil Usuario
router.get('/profile', authMiddleware, usersController.profile);

//Creacion Registro Usuario
router.get('/registro', guestMiddleware, usersController.register);
router.post('/registro', registerValidation, usersController.registerProcess);

//Edicion Usuario
router.get('/edit', authMiddleware, usersController.edit);
router.put('/edit', registerValidation, uploadFile.single('img'), usersController.editProcess);

//Eliminacion Usuario
router.delete('/edit', usersController.delete);

//Cerrar Sesion del Usuario
router.get('/logout', usersController.logout);

module.exports = router;