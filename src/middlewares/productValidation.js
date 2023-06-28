const { check } = require('express-validator');
const { extname } = require('path');
const { contains } = require('validator');

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
            default:
                throw new Error('Las extensiones validas son .jpg .img .png .jepg');
            }
        }),

    check('name')
        .notEmpty()
        .withMessage('Selecciona un nombre para tu producto'),

    check('label')
        .notEmpty()
        .withMessage('Selecciona almenos una etiqueta para tu producto'),

    check('cap')
        .optional().custom((value, {req}) => {
            if (req.body.capacityMeasure && !value) {
                throw new Error('Completa este campo si deseas agregar una cantidad');
            }
            else return true 
        }),

    check('capacityMeasure')
        .optional()
        .custom((value, {req}) => {
            if (req.body.cap && !value) {
                throw new Error('Completa este campo si deseas agregar una cantidad');
            }
            else return true 
        }),

    check('colors')
        .optional(),

    check('amount')
        .notEmpty()
        .withMessage('Selecciona el precio del producto'),

    check('unities')
        .notEmpty()
        .withMessage('Selecciona la cantidad disponible de este producto'),

    check('desc')
        .notEmpty()
        .withMessage('Agrega una descripcion a tu producto')

];