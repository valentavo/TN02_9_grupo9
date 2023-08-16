const express = require('express');
const router = express.Router();
const mainController = require('../../controllers/mainController.js');

//Home
router.get('/', mainController.index);

//About
router.get('/about', mainController.about);


module.exports = router;