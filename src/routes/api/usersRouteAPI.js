//Tools
const express = require('express');
const router = express.Router();

const usersAPI = require('../../controllers/api/usersAPI.js');

router.post('/login', usersAPI.loginProcess);
router.post('/id', usersAPI.searchPk);
router.post('/create', usersAPI.create);
router.put('/edit', usersAPI.update);
router.delete('/delete', usersAPI.delete);

module.exports = router;