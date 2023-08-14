const fs = require('fs');
const path = require('path');

module.exports = function  (req, res, next) {

    fs.appendFileSync(path.resolve(__dirname, '../logs/userLogs.txt'), `El usuario ingreso a la ruta: ${req.url} \n`, 'utf-8');

    next();
};