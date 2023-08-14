const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');

module.exports = {
    login: (req, res) =>{
        return res.render('./users/login.ejs');
    },

    loginProcess: async (req, res) => {

        try {

            const user = await db.Usuario.findOne({
                where: {
                    email: req.body.nombre
                }
            });
            
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
        } catch (error) {
            console.log(error);
        }
    },

    logout: async (req, res) => {

        try {

            res.clearCookie('usuarioGuardado');
            req.session.destroy();
            return res.redirect('/');
            
        } catch (error) {
            console.log(error);
        }  
    },

    profile: async (req, res) => {

        try {

            const user = await db.Usuario.findByPk(req.session.userLogged.id)

            return res.render('./users/perfil.ejs', {user: user});
        } catch (error) {
            console.log(error);
        }
    },

    register: (req, res) =>{
        return res.render('./users/register.ejs', {oldErrors: ""});
    },
    registerProcess: async (req, res) =>{

        try {
            
            const errors = validationResult(req);

            if(!errors.isEmpty()) return res.render('./users/register.ejs', {errorMessages: errors.mapped(), oldErrors: req.body});

            const newUser = await db.Usuario.create({
                nombre: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                logged: 0,
                'roles-fk': 1
            });

            delete newUser.password
            req.session.userLogged = newUser;

            return res.redirect('/user/profile');

        } catch (error) {
            console.log(error);
        }

    },
    editProcess: async (req, res) =>{

        try {
            
            const user = await db.Usuario.findByPk(req.session.userLogged.id);

            const errors = validationResult(req);

            // console.log(errors); //estan saliendo todos undefined

            if(!errors.isEmpty()) return res.render('./users/editUser.ejs', {errorMessages: errors.mapped(), user: user});

            const body = req.body;

            const updatedUser = await db.Usuario.update({

                nombre: body.name,
                email: body.email,
                telefono: body.phone,
                direccion: body.address,
                imagen: (req.file && req.file.filename) ? req.file.filename : user.imagen
            }, {
                where: {
                    id: user.id
                }
            });

            //Password field
            if (body.oldPassword && body.newPassword && body.passwordConfirmed) {

                const password = (bcrypt.compareSync(body.oldPassword, user.password) && body.newPassword == body.paswordConfirmed) ? bcrypt.hashSync(body.passwordConfirmed, 10) : user.password;

                user.password = password;
            }

            return res.render('./users/perfil.ejs', {user: updatedUser});

        } catch (error) {
            console.log(error);
        }
    },
    delete: async (req, res) =>{

        try {
            
            await db.Usuario.destroy({
                
                where: {
                    id: req.session.userLogged.id
                }
            });

            res.clearCookie('usuarioGuardado');
            req.session.destroy();
            
            return res.redirect('/user/login');

        } catch (error) {
            console.log(error);
        }
    }
};