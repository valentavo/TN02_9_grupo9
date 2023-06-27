const jsonPaths = require('../modules/jsonPaths.js');

const usersData = jsonPaths.read('../database/users.json');

module.exports = (req, res, next) => {
    const currentUser = usersData.find( row => row.id == req.params.userId);

    currentUser.access === 'personal' ? res.send('No tienes acceso a este sitio') : next();
};``