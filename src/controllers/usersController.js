const bcrypt = require('bcryptjs');
const db = require('../database/models');
const { sequelize } = require('../database/models'); 

module.exports = {
    login: (req, res) =>{

        return res.render('./users/login.ejs');
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

        return res.render('./users/perfil.ejs');
    },

    register: (req, res) =>{

        return res.render('./users/register.ejs');
    },
    editProcess: async (req, res) =>{

        const t = await sequelize.transaction();
        try {
            
            const user = await db.Usuario.findByPk(req.session.userLogged.id);


            // multer esta teniendo conflictos con express-validator asi que pasamos a usar apis 🙂🔫
            // const validation = validationResult(req);
            // if(!validation.isEmpty()) return res.render('./users/perfil.ejs', {errorMessages: validation.mapped(), user: user});

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
                },
                transaction: t
            });

            await t.commit();

            //Password field
            if (body.oldPassword && body.newPassword && body.passwordConfirmed) {

                const password = (bcrypt.compareSync(body.oldPassword, user.password) && body.newPassword == body.paswordConfirmed) ? bcrypt.hashSync(body.passwordConfirmed, 10) : user.password;

                user.password = password;
            }

            return res.render('./users/perfil.ejs', {user: updatedUser});

        } catch (error) {
            console.log(error);
            await t.rollback();
        }
    },
    delete: async (req, res) =>{

        const t = await sequelize.transaction();
        try {
            
            await db.Usuario.destroy({
                
                where: {
                    id: req.session.userLogged.id
                }
            }, {
                transaction: t
            });

            await t.commit();

            res.clearCookie('usuarioGuardado');
            req.session.destroy();
            
            return res.redirect('/user/login');

        } catch (error) {
            console.log(error);
            await t.rollback();
        }
    }
};