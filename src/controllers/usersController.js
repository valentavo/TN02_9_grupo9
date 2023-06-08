module.exports = {
    login: (req, res) =>{
        return res.render('./users/login.ejs');
    },
    register: (req, res) =>{
        return res.render('./users/register.ejs');
    }
};