const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController.js');
const adminUserAccess = require('../middlewares/adminUserAccess.js');

//Home
router.get('/', mainController.index);

//About
router.get('/about', mainController.about);

// Acceso Administrador
router.get('/admin/:userId', /*adminUserAccess ,*/ mainController.admin);

module.exports = router;