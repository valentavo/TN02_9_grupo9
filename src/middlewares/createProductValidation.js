const { check } = require('express-validator');
const { extname } = require('path');

module.exports = [

    check('productImg')
        .custom((value, {req}) => {
            const extAllowed = ['.jpg', '.jpeg', '.png', '.img', '.gif'];

            const errors = req.files.filter( row => {
                const fileExtension = extname(row.originalname.toLowerCase());
                return !extAllowed.includes(fileExtension);
            });

            if (errors.length != 0) {
                throw new Error('Las extensiones validas son .jpg .img .png .jepg .gif');
            }
            else{
                return true
            }
        }),

    check('name')
        .notEmpty()
        .isLength({min: 5})
        .withMessage('Selecciona un nombre para tu producto de al menos 5 caracteres'),

    // check('price')
    //     .notEmpty()
    //     .isNumeric({locale: 'en-US'})// Para espaniol con , para decimales es 'es-ES'
    //     .withMessage('Selecciona el precio del producto'),

    check('category')
        .notEmpty()
        .withMessage('Selecciona almenos una categoria para tu producto'),

    // check('size')
    //     .optional({checkFalsy: true}),

    // check('color')
    //     .optional({checkFalsy: true}),

    check('brand')
        .notEmpty()
        .withMessage('Selecciona una marca para tu producto'),

    // check('stock')
    //     .notEmpty()
    //     .isNumeric({'no_symbols': true})
    //     .withMessage('Selecciona la cantidad disponible de este producto'),

    check('desc')
        .notEmpty()
        .isLength({min: 20})
        .withMessage('Agrega una descripcion a tu producto de al menos 20 caracteres'),
    
];