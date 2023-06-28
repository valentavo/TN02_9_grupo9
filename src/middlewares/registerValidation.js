const {check} = require('express-validator');

module.exports = [

    check('name', 'Agrega un nombre entre 2 y 30 caracteres')
        .isLength({min: 2, max:30})
        .notEmpty(),

    check('email', 'Ingresa un email valido')
        .notEmpty()
        .isEmail(),

    check('password', 'la contraseña debe incluir minimo 2 y maximo 20 caracteres')
        .isLength({min: 2, max: 20}),

    check('password2', 'La contraseña debe ser la misma en ambos campos')
        .custom((value, {req}) => {
            if (req.body.password === value) return value

            return false
        }),

];