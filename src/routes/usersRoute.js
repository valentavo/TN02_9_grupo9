//Tools
const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const usersController = require('../controllers/usersController.js');

//Middlewares
const authMiddleware = require('../middlewares/authMiddleware.js');
const guestMiddleware = require('../middlewares/guestMiddleware.js');
// Validations
const registerValidation = require('../middlewares/registerValidation.js');
const loginValidation = require('../middlewares/loginValidation.js');
const profileValidation = require('../middlewares/profileValidation.js');

//Images storage with multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, path.resolve(__dirname, "../../public/img/users"))
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}_img${path.extname(file.originalname)}`);
    }
});
const uploadFile = multer({ storage });

//Acceso Usuario
router.get('/login', guestMiddleware, usersController.login);
router.post('/login', loginValidation, usersController.loginProcess);

//Perfil Usuario
router.get('/profile', authMiddleware, usersController.profile);

//Edicion Perfil Usuario
router.put('/profile/edit', profileValidation, uploadFile.single('img'), usersController.editProcess);

//Creacion Registro Usuario
router.get('/registro', guestMiddleware, usersController.register);
router.post('/registro', registerValidation, usersController.registerProcess);

//Eliminacion Usuario
router.delete('/profile/delete', usersController.delete);

//Cerrar Sesion del Usuario
router.get('/logout', usersController.logout);

module.exports = router;