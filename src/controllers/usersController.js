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
        return res.render('./users/login.ejs');
    },

    loginProcess: (req, res) => {

        const user = User.findByField('email', req.body.nombre);

        //Verifiying the passwords
        if (user && user.erased != true && bcrypt.compareSync(req.body.clave, user.password)) {

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

        if(!errors.isEmpty()) return res.render('./users/register.ejs', {errorMessages: errors.mapped(), oldErrors: req.body});

        const newUser = {
            id: usersData.length + 1,
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            img: "",
            access: "personal",
            logged: true,
            erased: false,
            phone: "",
            address: ""
        };

        usersData.push(newUser);
        jsonPaths.write(usersPath, usersData);

        delete newUser.password
        req.session.userLogged = newUser;

        return res.redirect('/user/profile');
    },
    edit: (req, res) =>{

        const user = usersData.find(row => row.id == req.session.userLogged.id);

        return res.render('./users/perfil.ejs', {user: user});
    },
    editProcess: (req, res) =>{

        const user = usersData.find(row => row.id == req.session.userLogged.id);

        const errors = validationResult(req);

       // console.log(errors); //estan saliendo todos undefined

        if(!errors.isEmpty()) return res.render('./users/editUser.ejs', {errorMessages: errors.mapped(), user: user})

        const body = req.body;

        body.name ? user.name = body.name : "";
        body.email ? user.email = body.email : "";
        body.phone ? user.phone = body.phone : "";
        body.address ? user.address = body.address : "";
        (req.file && req.file.filename) ? user.img = req.file.filename : "";

        //Password field
        if (body.oldPassword && body.newPassword && body.passwordConfirmed) {

            const password = (bcrypt.compareSync(body.oldPassword, user.password) && body.newPassword == body.paswordConfirmed) ? bcrypt.hashSync(body.passwordConfirmed, 10) : undefined;

            user.password = password;
        }

        //Reescribiendo la base de datos con los archivos actualizados

        jsonPaths.write(usersPath, usersData);
        usersData = jsonPaths.read(usersPath);

        return res.redirect('/user/login');
    },
    delete: (req, res) =>{

        const currentUser = usersData.find(row => row.id == req.session.userLogged.id);

        currentUser.erased = true;
        currentUser.logged = false;

        res.clearCookie('usuarioGuardado');
        req.session.destroy();

        //Reescribiendo la base de datos con los archivos actualizados
        jsonPaths.write(usersPath, usersData);
        usersData = jsonPaths.read(usersPath);
        
        return res.redirect('/user/login');
    }
};