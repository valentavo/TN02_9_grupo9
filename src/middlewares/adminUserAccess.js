const db = require('../database/models');

module.exports = async (req, res, next) => {

    const currentUser = await db.Usuario.findByPk(req.session.userLogged.id);

    currentUser.access === 'admin' ? next() : res.redirect('/');
};