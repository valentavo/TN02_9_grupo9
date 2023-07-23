const {check} = require('express-validator');
const bcrypt = require('bcryptjs');

const jsonPaths = require('../modules/jsonPaths.js');
const usersData = jsonPaths.read('../database/users.json');

module.exports = [

    check('name', 'Agrega un nombre entre 2 y 30 caracteres')
        .isLength({min: 2, max:30}),

    check('email', 'Ingresa un email valido')
        .notEmpty()
        .isEmail(),
    
    check('password2', 'la contraseña debe incluir minimo 2 y maximo 20 caracteres')
        .isLength({min: 2, max: 20})

    // check('password', 'Contraseña incorrecta')
    
    //     .custom((value, {req}) => {

    //         console.log(value);

    //         const user = usersData.find(row => row.id == req.session.userLogged.id);

    //         if (bcrypt.compareSync(value, user.password)) return value

    //         return false
    //     }),
        // .withMessage('Contraseña incorrecta'),
];