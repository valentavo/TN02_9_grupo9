const db = require('../../database/models');
const { validationResult } = require('express-validator');
const { sequelize } = require('../../database/models');

module.exports = {
    detail: async (req, res) => {

        try {

            const productDetail = await db.Producto.findByPk(req.body.id, {
                include: [
                    {association: 'image'},
                    {association: 'color'},
                    {association: 'size'}
                ]
            });

            const resApi = {
                meta: {
                    success: true,
                    endpoint: `/api/product/detail`
                },
                data: productDetail
            };

            return res.json(resApi);
            
        } catch (error) {
            console.log(error);
        };
    },
    create: async (req, res) => {

        try {

            const colores = await db.Color.findAll();
            const marcas = await db.Marca.findAll();
            const medidas = await db.Medida.findAll();
            const categorias = await db.Categoria.findAll();

            const resApi = {
                meta: {
                    success: true,
                    endpoint: `/api/product/create`
                },
                data: {
                    colores: colores,
                    marcas: marcas,
                    medidas: medidas,
                    categorias: categorias
                }
            };

            return res.json(resApi);
        
        } catch (error) {
            console.log(error);
        }

    },
     createProcess: async (req, res) => {

        const t = await sequelize.transaction();

        try {

            const validation = validationResult(req);

            if(!validation.isEmpty()) {
                return res.json({
                    meta: {
                        success: false,
                        endpoint: `/api/product/create`
                    },
                    data: validation.errors
                });
            };

            const body = req.body;

            const newProduct = await db.Producto.create({
                nombre: body.name,
                precio: body.amount,
                detalle: body.desc,
                cantidad: body.stock,
                'marcas-fk': body.brand,
                'categorias-fk': body.category,
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
            await Product.addColor(JSON.parse(body.color), {
                transaction: t
            });
            await Product.addSize(JSON.parse(body.size), {
                transaction: t
            });
            
            await t.commit();

            const resApi = {
                meta: {
                    success: true,
                    endpoint: `/api/product/create`
                },
                data: newProduct
            };

            return res.json(resApi);
            
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

            const currentProduct = await db.Producto.findByPk(req.body.id, {
                include: [
                    {association: 'image'},
                    {association: 'color'},
                    {association: 'size'},
                    {association: 'category'},
                    {association: 'brand'}
                ]
            });

            const resApi = {
                meta: {
                    success: true,
                    endpoint: `/api/product/edit`
                },
                data: {
                    product: currentProduct,
                    colors: colores,
                    brands: marcas,
                    meassures: medidas,
                    categories: categorias
                }
            };

            return res.json(resApi);
            
        } catch (error) {
            console.log(error);
        };

    }, 
};