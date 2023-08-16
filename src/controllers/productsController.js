const { validationResult } = require('express-validator');
const db = require('../database/models');
const {sequelize} = require( '../database/models' );

module.exports = {

    cart: async (req, res) => {

        try {
            
            const products = await db.Producto.findAll();

            return res.render('./products/productCart.ejs', {productos: products});

        } catch (error) {
            console.log(error);
        }

    },

    details: async (req, res) => {

        try {

            const productDetail = await db.Producto.findByPk(req.params.productId, {
                include: [{association: 'image'}]
            });
            const medidas = await db.Medida.findAll();
            const colores = await db.Color.findAll();

            const medidaProducto = await productDetail.getSize();
            const colorProducto = await productDetail.getColor();

            return res.render('./products/productDetail.ejs', {producto: productDetail, medidas: medidas, colores: colores, medidaProducto: medidaProducto[0], colorProducto: colorProducto[0]});
            
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

            const colores = await db.Color.findAll();
            const marcas = await db.Marca.findAll();
            const medidas = await db.Medida.findAll();
            const categorias = await db.Categoria.findAll();
            
            return res.render('./products/productCreate.ejs', {colores: colores, marcas: marcas, medidas: medidas, categorias: categorias, oldErrors: ""});
        
        } catch (error) {
            console.log(error);
        }

    },

    createProcess: async (req, res) => {

        const t = await sequelize.transaction();

        try {

            const colores = await db.Color.findAll();
            const marcas = await db.Marca.findAll();
            const medidas = await db.Medida.findAll();
            const categorias = await db.Categoria.findAll();
            
            const errors = validationResult(req);

            if(!errors.isEmpty()) {

                return res.render('./products/productCreate.ejs', {errorMessages: errors.mapped(), oldErrors: req.body, colores: colores, marcas: marcas, medidas: medidas, categorias: categorias });
            };

            const body = req.body;

            const newProduct = await db.Producto.create({
                nombre: body.name,
                precio: body.amount,
                detalle: body.desc,
                cantidad: body.stock,
                'marcas-fk': body.brand,
                'categorias-fk': body.categoria
            }, {
                transaction: t
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
            await Product.createImage({
                nombre: req.file.filename
            }, {
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

            const colores = await db.Color.findAll();
            const marcas = await db.Marca.findAll();
            const medidas = await db.Medida.findAll();
            const categorias = await db.Categoria.findAll();

            const currentProduct = await db.Producto.findByPk(req.params.productId, {
                include: [{association: 'image'}]
            });

            const colorProducto = await currentProduct.getColor();
            const medidaProducto = await currentProduct.getSize();
            const categoriaProducto = await currentProduct.getCategory();
            const marcaProducto = await currentProduct.getBrand();

            return res.render('./products/productEdit.ejs', {colores: colores, marcas: marcas, medidas: medidas, categorias: categorias, producto: currentProduct, colorProducto: colorProducto[0], medidaProducto: medidaProducto[0], categoriaProducto: categoriaProducto, marcaProducto: marcaProducto});
            
        } catch (error) {
            console.log(error);
        };

    }, 

    editProcess: async (req, res) => {

        const t = await sequelize.transaction();

        try {
            
            // const colores = await db.Color.findAll();
            // const medidas = await db.Medida.findAll();

            const body = req.body;
        
            await db.Producto.update({
                nombre: body.name,
                precio: body.price,
                detalle: body.desc,
                cantidad: body.stock,
                'marcas-fk': body.brand,
                'categorias-fk': body.categoria
                // Image: [{nombre: req.file.filename}]
            }, {
                where: {
                    id: req.params.productId
                },
                transaction: t,
                // include: db.Imagen
            });

            await db.Imagen.update({
                nombre: req.file.filename
            }, {
                where: {
                    'productos-fk': req.params.productId
                }
            });


            const Product = await db.Producto.findByPk(req.params.productId, {
                transaction: t
            });

            await Product.setColor(body.color, {
                transaction: t
            });
            await Product.setSize(body.medida, {
                transaction: t
            });

            await t.commit();
            //edicion imagen de prueba para 1 input file, con mas de 1 hacer un foreach
            // const producto = await db.Producto.findByPk(req.params.productId);

            // puede ser un set (si es set puede ser plural -> setImagenes) o un remove y luego un create
            // await producto.setImagen({
            //     nombre: req.file.filename
            // });

                // No me deja hacer el redirect a el producto creado, dice depercated, sera por enviar esa variable en el segundo parametro?
            // const currentProduct = await db.Producto.findByPk(req.params.productId);
            // return res.redirect(`/product/detail/${currentProduct.id}`, { producto:  currentProduct});

            return res.redirect('/');

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