//Tools
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');

//Routes
const mainRoute = require('./routes/mainRoute.js');
const productsRoute = require('./routes/productsRoute.js');
const usersRoute = require('./routes/usersRoute.js');

//Middlewares
// const logsMiddleware = require('./middlewares/userLogs.js');
const userLogged = require('./middlewares/userLogged.js');

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, '../views'));

app.use(methodOverride('_method'));
// Midleware que registra cada ruta que el cx visita
// app.use(logsMiddleware);

//configuracion de express para los formularios
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Session config
app.use( session({
    secret: 'algun-secreto-bien-guardado',
    resave: false,
    saveUninitialized: false
}))

//CookieParser config
app.use(cookieParser());

app.use(userLogged);

app.listen(3009, () => {
    console.log('Servidor corriendo en el puerto 3009')
});

app.use(mainRoute);

app.use('/user', usersRoute);

app.use('/product', productsRoute);

// Mensaje de Error 404
app.use((req, res, next) => {
    return res.status(404).send('404 Ups! algo esta mal con esta ruta');
});