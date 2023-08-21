module.exports = {
    login: (req, res) =>{

        return res.render('./users/login.ejs');
    },

    profile: async (req, res) => {

        return res.render('./users/perfil.ejs');
    },

    register: (req, res) =>{

        return res.render('./users/register.ejs');
    }
};