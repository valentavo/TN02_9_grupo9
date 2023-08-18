const express = require('express');
const router = express.Router();
const mainAPI = require('../../controllers/api/mainAPI.js');

//Home
router.get('/', mainAPI.index);


module.exports = router;