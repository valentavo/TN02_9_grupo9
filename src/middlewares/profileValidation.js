const { body } = require('express-validator');
const { extname } = require('path');

module.exports = [
    body('name', 'El campo no debe estar vacío')
        .if(body('field').contains('profile'))
        .notEmpty(),
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
        .normalizeEmail({'all_lowercase': true}),
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
    body('oldPassword')
        .if(body('field').contains('password'))
        .notEmpty(),
    body('password')
        .if(body('field').contains('password'))
        .notEmpty()
        .isLength({min: 8})
];