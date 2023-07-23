const jsonPaths = require('../modules/jsonPaths.js');

const usersData = jsonPaths.read('../database/users.json');

module.exports = (req, res, next) => {

    let currentUser = '';

    if(req.session.userLogged) {
        currentUser = usersData.find( row => row.id == req.session.userLogged.id);
    }

    currentUser.access === 'admin' ? next() : res.redirect('/');
};