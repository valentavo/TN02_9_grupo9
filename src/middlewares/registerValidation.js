const {check} = require('express-validator');

module.exports = [

    check('name', 'Agrega un nombre entre 2 y 30 caracteres')
        .isLength({min: 2, max:30}),

    check('email', 'Ingresa un email válido')
        .notEmpty()
        .bail()
        .trim()
        .isEmail()
        .normalizeEmail({'all_lowercase': true}),

    check('password', 'la contraseña debe incluir minimo 2 caracteres')
        .isLength({min: 2})
];