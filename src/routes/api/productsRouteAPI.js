//Tools
const express = require('express');
const router = express.Router();

const productsApi = require('../../controllers/api/productsAPI.js');

router.post('/detail', productsApi.detail);

module.exports = router;