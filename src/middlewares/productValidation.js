const { check } = require('express-validator');
const { extname } = require('path');

module.exports = [

    check('productImg')
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

    check('name')
        .notEmpty()
        .withMessage('Selecciona un nombre para tu producto'),

    check('categoria')
        .notEmpty()
        .withMessage('Selecciona almenos una categoria para tu producto'),

    check('color')
        .optional({checkFalsy: true}),

    check('amount')
        .notEmpty()
        .withMessage('Selecciona el precio del producto'),

    check('stock')
        .notEmpty()
        .withMessage('Selecciona la cantidad disponible de este producto'),

    check('desc')
        .notEmpty()
        .withMessage('Agrega una descripcion a tu producto')

];