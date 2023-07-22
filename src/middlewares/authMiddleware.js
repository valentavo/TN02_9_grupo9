module.exports = function  (req, res, next) {
    if(req.session.userLogged) {
        next();
    } else{
        return res.redirect('/user/login');
    }
};