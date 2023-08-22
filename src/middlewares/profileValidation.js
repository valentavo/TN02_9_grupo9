const { body } = require('express-validator');
const { extname } = require('path');

module.exports = [
    body('name', 'El campo no debe estar vacío')
        .notEmpty(),
    body('birth', 'El campo debe ser una fecha válida')
        .optional({checkFalsy: true})
        .isDate(),
    body('email', 'Debes introducir un email válido')
        .notEmpty()
        .bail()
        .trim()
        .isEmail()
        .normalizeEmail({'all_lowercase': true}),
    body('phone', 'Debes introducir un número válido')
        .optional({checkFalsy: true})
        .isLength({min: 6, max: 16}),
    body('address')
        .optional({checkFalsy: true}),
    body('img')
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
            default:
                throw new Error('Las extensiones validas son .jpg .img .png .jepg');
            }
        }),
];