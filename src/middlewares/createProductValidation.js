const { check } = require('express-validator');
const { extname } = require('path');

module.exports = [

    check('productImg')
        .custom((value, {req}) => {
            const extAllowed = ['.jpg', '.jpeg', '.png', '.img'];

            const errors = req.files.filter( row => {
                const fileExtension = extname(row.originalname.toLowerCase());
                return !extAllowed.includes(fileExtension);
            });

            if (errors.length != 0) {
                throw new Error('Las extensiones validas son .jpg .img .png .jepg');
            }
            else{
                return true
            }
        }),

    check('name')
        .notEmpty()
        .withMessage('Selecciona un nombre para tu producto'),

    check('price')
        .notEmpty()
        .withMessage('Selecciona el precio del producto'),

    check('category')
        .notEmpty()
        .withMessage('Selecciona almenos una categoria para tu producto'),

    check('size')
        .optional({checkFalsy: true}),

    check('color')
        .optional({checkFalsy: true}),

    check('brand')
        .notEmpty()
        .withMessage('Selecciona una marca para tu producto'),

    check('stock')
        .notEmpty()
        .withMessage('Selecciona la cantidad disponible de este producto'),

    check('desc')
        .notEmpty()
        .withMessage('Agrega una descripcion a tu producto'),
    
];