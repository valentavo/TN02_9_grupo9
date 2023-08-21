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

    createProcess: async (req, res) => {

        const t = await sequelize.transaction();

        try {

            /*    //Cuando las validaciones funcionen

            const colores = await db.Color.findAll();
            const marcas = await db.Marca.findAll();
            const medidas = await db.Medida.findAll();
            const categorias = await db.Categoria.findAll();
            
            const errors = validationResult(req);

            if(!errors.isEmpty()) {

                return res.render('./products/productCreate.ejs', {errorMessages: errors.mapped(), oldErrors: req.body, colores: colores, marcas: marcas, medidas: medidas, categorias: categorias });
            };
            */

            const body = req.body;

            const newProduct = await db.Producto.create({
                nombre: body.name,
                precio: body.amount,
                detalle: body.desc,
                cantidad: body.stock,
                'marcas-fk': body.brand,
                'categorias-fk': body.categoria,
                image:  req.files.map( img => {
                    return {nombre: img.filename}
                })
            }, {
                transaction: t,
                include: [{
                    association: 'image',
                }]
            });
            
            const Product = await db.Producto.findByPk(newProduct.id, {
                transaction: t
            });

            //relacionando producto con tablas pivot
            await Product.addColor(body.color, {
                transaction: t
            });
            await Product.addSize(body.medida, {
                transaction: t
            });
            
            await t.commit();
            return res.redirect(`/product/detail/${Product.id}`);
            
        } catch (error) {
            console.log(error);
            await t.rollback();
        };

    },

    edit: async (req, res) => {

        try {

            return res.render('./products/productEdit.ejs');
            
        } catch (error) {
            console.log(error);
        };

    }, 

    editProcess: async (req, res) => {

        const t = await sequelize.transaction();

        try {

            const body = req.body;
        
            await db.Producto.update({
                nombre: body.name,
                precio: body.price,
                detalle: body.desc,
                cantidad: body.stock,
                'marcas-fk': body.brand,
                'categorias-fk': body.categoria
            }, {
                where: {
                    id: req.params.productId
                },
                transaction: t
            });

            const Product = await db.Producto.findByPk(req.params.productId, {
                transaction: t
            });

            const prevImages = await Product.getImage();

            await db.Imagen.bulkCreate(req.files.map( img => {
                return {nombre: img.filename, 'productos-fk': Product.id}
            }), {
                transaction: t
            });

            await db.Imagen.destroy({
                where: {
                    'productos-fk': Product.id,
                    id: {
                        [Op.lte]: prevImages[prevImages.length -1].id
                    }
                },
                transaction: t
            });

            await Product.setColor(body.color, {
                transaction: t
            });
            await Product.setSize(body.medida, {
                transaction: t
            });

            await t.commit();

            return res.redirect(`/product/detail/${Product.id}`);

        } catch (error) {
            console.log(error);
            await t.rollback();
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