const { check } = require('express-validator');

const message = 'Usuario o contraseña inválidos'

module.exports = [
    check('nombre', message)
        .notEmpty()
        .bail()
        .trim()
        .isEmail()
        .normalizeEmail({'all_lowercase': true}),
    check('clave', message)
        .notEmpty()
];