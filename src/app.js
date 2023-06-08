const express = require('express');
const path = require('path');
const app = express();
const mainRoute = require('./routes/mainRoute.js');
const productsRoute = require('./routes/productsRoute.js');
const usersRoute = require('./routes/usersRoute.js');

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, '../views'));

app.listen(3009, () => {
    console.log('Servidor corriendo en el puerto 3009')
} );

app.use(mainRoute);

app.use(usersRoute);

app.use(productsRoute);