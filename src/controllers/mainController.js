const db = require('../database/models');


module.exports = {
    index: async (req, res) => {
        try {

            //Le dejamos esto a la API
            return res.render('index.ejs');

        } catch (error) {
            console.log(error);
        }
    },
    about: (req, res) => {
        return res.render('aboutUs.ejs');
    }
}