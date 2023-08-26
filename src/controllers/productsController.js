const { validationResult } = require('express-validator');
const db = require('../database/models');
const {sequelize} = require( '../database/models' );
const Op = db.Sequelize.Op;

module.exports = {

    cart: async (req, res) => {

        try {
            
            const products = await db.Producto.findAll();

            return res.render('./products/productCart.ejs', {productos: products});

        } catch (error) {
            console.log(error);
        }

    },

    detail: async (req, res) => {

        try {

            return res.render('./products/productDetail.ejs');
            
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

    create: async (req, res) => {

        try {

            return res.render('./products/productCreate.ejs');
        
        } catch (error) {
            console.log(error);
        }

    },

    edit: async (req, res) => {

        try {

            return res.render('./products/productEdit.ejs');
            
        } catch (error) {
            console.log(error);
        };

    },

    delete: async (req, res) => {

        const t = await sequelize.transaction();
        
        try {

            await db.Producto.destroy({
                where: {
                    id: req.params.productId
                },
                transaction: t
            });

            await t.commit();

            return res.redirect('/product/list');

        } catch (error) {
            console.log(error);
            await t.rollback();
        };
        
    }
}; 