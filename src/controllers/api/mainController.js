const db = require('../../database/models');


module.exports = {
    index: async (req, res) => {
        try {

            const products = await db.Producto.findAll({
                include: [{association: 'image'}]
            });

            return res.render('index.ejs', { products: products });

        } catch (error) {
            console.log(error);
        }
    },
    admin: async(req, res) => {

        try {
            
            const user = await db.Usuario.findByPk(req.params.userId);

            return res.render('admin.ejs', {user: user});

        } catch (error) {
            console.log(error);
        }

    },
    about: (req, res) => {
        return res.render('aboutUs.ejs');
    }
}