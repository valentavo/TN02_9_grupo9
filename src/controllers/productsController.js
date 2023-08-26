const db = require('../database/models');

module.exports = {

    cart: async (req, res) => {

        try {
            
            const products = await db.Producto.findAll();

            return res.render('./products/productCart.ejs', {productos: products});

        } catch (error) {
            console.log(error);
        }

    },

    list: async (req, res) => {

        try {
            const notErased = await db.Producto.findAll( {
                include: [{association: 'image'}]
            });
            
            return res.render('./products/productList.ejs', {productos: notErased});

        } catch (error) {
            console.log(error);
        }

    },

    detail: async (req, res) => {

        return res.render('./products/productDetail.ejs');

    },

    create: async (req, res) => {

        return res.render('./products/productCreate.ejs');

    },

    edit: async (req, res) => {

        return res.render('./products/productEdit.ejs');

    }
}; 