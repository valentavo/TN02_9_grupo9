const jsonPaths = require('../modules/jsonPaths.js');
const {validationResult} = require('express-validator');

//Parseando los datos
const usersPath = '../database/users.json';
const usersData = jsonPaths.read(usersPath);

module.exports = {
    login: (req, res) =>{
        // console.log(req.session);
        return res.render('./users/login.ejs');
    },

    loginProcess: (req, res) => {
        //Find the user
        const user = usersData.find(us => us.name == req.body.nombre);

        //Verifiying the passwords
        if (user && user.password == req.body.clave) {

        user.logged = true;
        req.session.userLogged = user;
        
        // jsonPaths.write(usersPath, usersData);

        return res.redirect(`/user/profile`);
       }
       else {
        return res.render( './users/login.ejs', { errorMessage: "Usuario o contraseña incorrectos, por favor volver a intentar"} );
       }
    },

    logout: (req, res) => {
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
            password: req.body.password,
            img: "",
            access: "personal",
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

        if(!errors.isEmpty()) return res.render('./users/editUser.ejs', {errorMessages: errors.mapped(), user: user})

        const currentUser = usersData.find(row => row.id == req.session.userLogged.id);

        for (let property in req.body) {
            currentUser[property] = req.body[property];
        }

        //Reescribiendo la base de datos con los archivos actualizados
        jsonPaths.write(usersPath, usersData);

        return res.redirect('/user/login');
    },
    delete: (req, res) =>{

        const currentUser = usersData.find(row => row.id == req.session.userLogged.id);

        currentUser.erased = true;

        //Reescribiendo la base de datos con los archivos actualizados
        jsonPaths.write(usersPath, usersData);
        
        return res.redirect('/user/login');
    }
};