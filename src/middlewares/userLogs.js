const fs = require('fs');
const path = require('path');

// const users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/users.json'), 'utf-8'));

module.exports = function  (req, res, next) {

    fs.appendFileSync(path.resolve(__dirname, '../logs/userLogs.txt'), `El usuario ingreso a la ruta: ${req.url} \n`, 'utf-8');

    next();
};