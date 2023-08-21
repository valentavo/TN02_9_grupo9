const bcrypt = require('bcryptjs');
const db = require('../../database/models');
const { sequelize } = require('../../database/models');
const { validationResult } = require('express-validator');

module.exports = {

    loginProcess: async (req, res) => {
        try {

            const validation = validationResult(req);

            if(!validation.isEmpty()) {
                return res.json({
                    meta: {
                        status: 400,
                        success: false,
                        endpoint: `/api/user/login`
                    },
                    data: validation.errors[0].msg
                });
            }

            const user = await db.Usuario.findOne({
                where: {
                    email: req.body.email
                }
            });

            //Verifiying the passwords
            if (user && bcrypt.compareSync(req.body.password, user.password)) {

                //Eliminando la contrasenia de sessions
                delete user.password;

                req.session.userLogged = user;
                
                //Session Cookie
                if(req.body.remember) res.cookie('usuarioGuardado', user, {maxAge: (1000 * 60) * 10}); // 10 min

                const resApi = {
                    meta: {
                        status: 200,
                        success: true,
                        endpoint: `/api/user/login`
                    },
                    data: user
                };
                return res.json(resApi);
            } else {
                return res.json({
                    meta: {
                        status: 400,
                        success: false,
                        endpoint: `/api/user/login`
                    },
                    data: 'Usuario o contraseña inválidos'
                });
            }

            
        } catch (error) {
            console.log(error);
        }
    },

    logout: async (req, res) => {

        try {

            res.clearCookie('usuarioGuardado');
            req.session.destroy();

            const resApi = {
                meta: {
                    success: true,
                    endpoint: '/api/user/logout'
                }
            };
            res.json(resApi);
            
        } catch (error) {
            console.log(error);
        }  
    },
    
    profile: async (req, res) => {

        try {

            const user = await db.Usuario.findByPk(req.session.userLogged.id);

            const resApi = {
                meta: {
                    status: 200,
                    success: true,
                    endpoint: `/api/user/profile`
                },
                data: user
            };

            return res.json(resApi);

        } catch (error) {
            console.log(error);
        }
    },

    create: async (req, res) =>{

        const t = await sequelize.transaction();
        try {

            const validation = validationResult(req);

            if(!validation.isEmpty()) {
                return res.json({
                    meta: {
                        status: 400,
                        success: false,
                        endpoint: `/api/user/create`
                    },
                    data: validation.errors
                });
            };

            const newUser = await db.Usuario.create({
                nombre: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                logged: 0,
                'roles-fk': 1
            }, {
                transaction: t
            });

            await t.commit();

            const resApi = {
                meta: {
                    status: 200,
                    success: true,
                    endpoint: `/api/user/create`
                },
                data: newUser
            };

            delete newUser.password;
            req.session.userLogged = newUser;

            return res.json(resApi);

        } catch (error) {
            console.log(error);
            await t.rollback();
        }

    },
    update: async (req, res) =>{

        const t = await sequelize.transaction();
        try {

            const validation = validationResult(req);
            if(!validation.isEmpty()) {
                return res.json({
                    meta: {
                        status: 400,
                        success: false,
                        endpoint: `/api/user/edit`
                    },
                    data: validation.mapped()
                });
            };

            const user = await db.Usuario.findByPk(req.session.userLogged.id, {
                transaction: t
            });
            const body = req.body;

            await db.Usuario.update({

                nombre: body.name,
                email: body.email,
                'fecha-nacimiento': body.birth,
                telefono: body.phone,
                direccion: body.address,
                imagen: (req.file && req.file.filename) ? req.file.filename : user.imagen
            }, {
                where: {
                    id: user.id
                },
                transaction: t
            });

            await t.commit();

            const resApi = {
                meta: {
                    status: 200,
                    success: true,
                    endpoint: `/api/user/edit`
                }
            };

            return res.json(resApi);

        } catch (error) {
            console.log(error);
            await t.rollback();
        }
    },
    delete: async (req, res) =>{

        const t = await sequelize.transaction();
        try {
            
            const user = await db.Usuario.destroy({
                
                where: {
                    id: req.session.userLogged.id
                }
            }, {
                transaction: t
            });

            await t.commit();

            const resApi = {
                meta: {
                    status: 200,
                    success: true,
                    endpoint: `/api/user/delete`
                },
                data: user
            };

            res.clearCookie('usuarioGuardado');
            req.session.destroy();
            
            return res.json(resApi);

        } catch (error) {
            console.log(error);
            await t.rollback();
        }
    }
};