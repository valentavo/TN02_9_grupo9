//Tools
const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');

const usersAPI = require('../../controllers/api/usersAPI.js');

// Validations
const registerValidation = require('../../middlewares/registerValidation.js');
const loginValidation = require('../../middlewares/loginValidation.js');
const profileValidation = require('../../middlewares/profileValidation.js');

//Images storage with multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, path.resolve(__dirname, "../../../public/img/users"))
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}_img${path.extname(file.originalname)}`);
    }
});
const uploadFile = multer({ storage });

router.post('/login', loginValidation, usersAPI.loginProcess);
router.get('/profile', usersAPI.profile);
router.post('/create', registerValidation, usersAPI.create);
router.put('/edit', uploadFile.single('img'), profileValidation, usersAPI.update);
router.get('/logout', usersAPI.logout);
router.delete('/delete', usersAPI.delete);

router.get('/', usersAPI.list);
router.get('/:id', usersAPI.detail)

module.exports = router;