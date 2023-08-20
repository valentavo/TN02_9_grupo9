//Tools
const express = require('express');
const router = express.Router();

const usersAPI = require('../../controllers/api/usersAPI.js');

// Validations
const registerValidation = require('../../middlewares/registerValidation.js');
const loginValidation = require('../../middlewares/loginValidation.js');

router.post('/login', loginValidation, usersAPI.loginProcess);
router.get('/profile', usersAPI.profile);
router.post('/create', registerValidation, usersAPI.create);
router.put('/edit', usersAPI.update);
router.get('/logout', usersAPI.logout);
router.delete('/delete', usersAPI.delete);

module.exports = router;