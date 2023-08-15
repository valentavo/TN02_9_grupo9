const fs = require('fs');
const path = require('path');

module.exports = {
    
    read: (routePath) => JSON.parse(fs.readFileSync(path.resolve(__dirname, routePath))),

    write: (routePath, data) => fs.writeFileSync(path.resolve(__dirname, routePath), JSON.stringify(data, null, 2), 'utf-8')

};
d