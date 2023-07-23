const jsonPaths = require('../modules/jsonPaths.js');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

//Parseando los datos
const usersPath = '../database/users.json';
let usersData = jsonPaths.read(usersPath);

//procesando datos again porque no tengo db
const User = require('../models/Users.js');

module.exports = {
    login: (req, res) =>{
        // console.log(req.session);
        return res.render('./users/login.ejs');
    },

    loginProcess: (req, res) => {

        const user = User.findByField('email', req.body.nombre);

        //Verifiying the passwords
        if (user && bcrypt.compareSync(req.body.clave, user.password)) {

        //Eliminando la contrasenia de sessions
        delete user.password;

        user.logged = true;
        req.session.userLogged = user;
        
        //Session Cookie
        if(req.body.recordar) res.cookie('usuarioGuardado', user, {maxAge: (1000 * 60) * 10}); // 10 min

        return res.redirect(`/user/profile`);
       }
       else {
        return res.render( './users/login.ejs', { errorMessage: "Usuario o contraseña incorrectos, por favor volver a intentar"} );
       }
    },

    logout: (req, res) => {

        usersData.find(us => us.id == req.session.userLogged.id).logged = false;
        
        res.clearCookie('usuarioGuardado');
        req.session.destroy();
        return res.redirect('/');
    },

    profile: (req, res) => {
        const user = usersData.find(us => us.id == req.session.userLogged.id);

        return res.render('./users/perfil.ejs', {user: user});
    },

    register: (req, res) =>{
        return res.render('./users/register.ejs', {oldErrors: ""});
    },
    registerProcess: (req, res) =>{

        const errors = validationResult(req);

        console.log(errors);

        if(!errors.isEmpty()) return res.render('./users/register.ejs', {errorMessages: errors.mapped(), oldErrors: req.body});

        const newUser = {
            id: usersData.length + 1,
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            img: "",
            access: "personal",
            logged: false,
            erased: false
        };

        usersData.push(newUser);

        jsonPaths.write(usersPath, usersData);

        return res.render('./users/register.ejs', {oldErrors: ""});
    },
    edit: (req, res) =>{

        const user = usersData.find(row => row.id == req.session.userLogged.id);

        return res.render('./users/editUser.ejs', {user: user});
    },
    editProcess: (req, res) =>{

        const user = usersData.find(row => row.id == req.session.userLogged.id);

        const errors = validationResult(req);

       // console.log(errors); //estan saliendo todos undefined

        if(!errors.isEmpty()) return res.render('./users/editUser.ejs', {errorMessages: errors.mapped(), user: user})

        user.name = req.body.name;
        user.email = req.body.email;
        (req.file && req.file.filename) ? user.img = req.file.filename : "";

        const password = bcrypt.compareSync(req.body.password, user.password) ? bcrypt.hashSync(req.body.password2, 10) : undefined;

        if (password) {
            user.password = password;
        }
        else{
            return res.render('./users/editUser.ejs', {user: user});
        }

        //Reescribiendo la base de datos con los archivos actualizados

        jsonPaths.write(usersPath, usersData);
        usersData = jsonPaths.read(usersPath);

        return res.redirect('/user/login');
    },
    delete: (req, res) =>{

        const currentUser = usersData.find(row => row.id == req.session.userLogged.id);

        currentUser.erased = true;

        //Reescribiendo la base de datos con los archivos actualizados
        jsonPaths.write(usersPath, usersData);
        usersData = jsonPaths.read(usersPath);
        
        return res.redirect('/user/login');
    }
};