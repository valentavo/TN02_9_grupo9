const {check} = require('express-validator');
const bcrypt = require('bcryptjs');

module.exports = [

    check('name', 'Agrega un nombre entre 2 y 30 caracteres')
        .isLength({min: 2, max:30}),

    check('email', 'Ingresa un email valido')
        .notEmpty()
        .isEmail(),
    
    check('password2', 'la contraseña debe incluir minimo 2 y maximo 20 caracteres')
        .isLength({min: 2, max: 20})
];