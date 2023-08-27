const { check } = require('express-validator');
const db = require('../database/models');

const message = 'Usuario o contraseña inválidos'

module.exports = [
    check('email', message)
        .notEmpty()
        .bail()
        .trim()
        .isEmail()
        .custom(async (value) => {
            const emailConfirm = await db.Usuario.count({
                where: {
                    email: value
                }
            });

            if(emailConfirm > 0) {
                return true
            }
            else{
                throw new Error(message);
            };
        }),
        
    check('password', message)
        .notEmpty()
];