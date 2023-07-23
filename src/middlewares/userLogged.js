module.exports = (req, res, next) => {

    req.cookies.usuarioGuardado ? req.session.userLogged = req.cookies.usuarioGuardado : ""

    next();
};