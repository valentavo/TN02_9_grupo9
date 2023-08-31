const { body } = require('express-validator');
const { extname } = require('path');
const db = require('../database/models');

module.exports = [
    body('name', 'El nombre debe tener entre 2 y 30 caracteres')
        .if(body('field').contains('profile'))
        .isLength({min: 2, max:30}),
    body('birth', 'El campo debe ser una fecha válida')
        .if(body('field').contains('profile'))
        .optional({checkFalsy: true})
        .isDate(),
    body('email', 'Debes introducir un email válido')
        .if(body('field').contains('profile'))
        .notEmpty()
        .bail()
        .trim()
        .isEmail()
        .normalizeEmail({'all_lowercase': true})
        .if(body('prevEmail').exists())
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
    body('phone', 'Debes introducir un número válido')
        .if(body('field').contains('profile'))
        .optional({checkFalsy: true})
        .isLength({min: 6, max: 16}),
    body('address')
        .if(body('field').contains('profile'))
        .optional({checkFalsy: true}),
    body('img')
        .if(body('field').contains('profile'))
        .optional({checkFalsy: true})
        .custom((value, {req}) => {
            const fileExtension = extname(req.file.originalname.toLowerCase());

            switch (fileExtension) {
            case '.jpg':
                return '.jpg';
            case '.jpeg':
                return '.jpeg';
            case  '.png':
                return '.png';
            case  '.img':
                return '.img';
            case  '.gif':
                return '.gif';
            default:
                throw new Error('Las extensiones validas son .jpg .img .png .jepg .gif');
            };
        }),
    body('oldPassword', 'Introduce tu contraseña actual')
        .if(body('field').contains('password'))
        .notEmpty(),
    body('password', 'La contraseña debe incluir mínimo 8 caracteres')
        .if(body('field').contains('password'))
        .notEmpty()
        .isLength({min: 8})
];