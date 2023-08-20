const { check } = require('express-validator');

const message = 'Usuario o contraseña inválidos'

module.exports = [
    check('email', message)
        .notEmpty()
        .bail()
        .trim()
        .isEmail()
        .normalizeEmail({'all_lowercase': true}),
        
    check('password', message)
        .notEmpty()
];