const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const app = express();
const mainRoute = require('./routes/mainRoute.js');
const productsRoute = require('./routes/productsRoute.js');
const usersRoute = require('./routes/usersRoute.js');

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, '../views'));

app.use(methodOverride('_method'));

//configuracion de express para los formularios
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(3009, () => {
    console.log('Servidor corriendo en el puerto 3009')
} );

app.use(mainRoute);

app.use(usersRoute);

app.use('/product', productsRoute);

// Mensaje de Error 404
app.use((req, res, next) => {
    return res.status(404).send('404 Ups! algo esta mal con esta ruta');
})