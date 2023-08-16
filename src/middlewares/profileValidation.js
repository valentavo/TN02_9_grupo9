const { check } = require('express-validator');
const { extname } = require('path');

module.exports = [
    check('name', 'El campo no debe estar vacío')
        .notEmpty(),
    check('date', 'El campo debe ser una fecha válida')
        .optional()
        .isDate(),
    check('email', 'Debes introducir un email válido')
        .notEmpty()
        .bail()
        .trim()
        .isEmail()
        .normalizeEmail({'all_lowercase': true}),
    check('phone', 'Debes introducir un número válido')
        .optional()
        .isLength({min: 7, max: 14}),
    check('address')
        .optional(),
    check('img')
        .optional()
        .custom((value, {req}) => {
            const fileExtension = extname(req.file.originalname.toLowerCase());

            switch (fileExtension) {
            case '.jpg':
                return '.jpg';
            case '.jpeg':
                return '.jpeg';
            case  '.png':
                return '.png';
            default:
                throw new Error('Las extensiones validas son .jpg .img .png .jepg');
            }
        }),
];