module.exports = function  (req, res, next) {
    if(req.session.userLogged) return res.redirect(`/user/profile`);
    next();
};