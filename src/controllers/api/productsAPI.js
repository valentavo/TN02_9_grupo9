const db = require('../../database/models');

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