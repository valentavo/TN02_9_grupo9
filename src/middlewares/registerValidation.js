const {check} = require('express-validator');
const db = require('../database/models');

module.exports = [

    check('name', 'Agrega un nombre entre 2 y 30 caracteres')
        .isLength({min: 2, max:30}),

    check('email', 'Ingresa un email válido')
        .notEmpty()
        .bail()
        .trim()
        .isEmail()
        .normalizeEmail({'all_lowercase': true})
        .custom(async (value) => {
            const emailConfirm = await db.Usuario.count({
                where: {
                    email: value
                }
            });

            if(emailConfirm == 0) {
                return true
            }
            else{
                throw new Error('Este correo ya está en uso');
            };
        }),

    check('password', 'la contraseña debe incluir minimo 8 caracteres')
        .isLength({min: 8})
];