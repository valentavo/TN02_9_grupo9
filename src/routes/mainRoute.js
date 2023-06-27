const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController.js');
const adminUserAccess = require('../middlewares/adminUserAccess.js');

router.get('/', mainController.index);

// Acceso Administrador
router.get('/admin/:userId', adminUserAccess, mainController.admin);

module.exports = router;