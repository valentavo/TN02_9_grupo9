const db = require('../../database/models');
const { validationResult } = require('express-validator');
const { sequelize } = require('../../database/models');
const Op = db.Sequelize.Op;

module.exports = {

    cart: async (req, res) => {

        try {
            
            const products = await db.Producto.findAll();

            const resApi = {
                meta: {
                    success: true,
                    endpoint: `/api/product/cart`
                },
                data: products
            };

            return res.json(resApi);

        } catch (error) {
            console.log(error);
        };

    },

    invoice: async (req, res) => {
        const t = await sequelize.transaction();

        try {

            let dispo = [];

            if(!req.session.userLogged) {
                const resApi = {
                    meta: {
                        success: false,
                        title: 'Usuario inválido',
                        msg: 'Usuario no identificado',
                        endpoint: `/api/product/cart`
                    }
                };

                return res.json(resApi);
            };

            const products = await db.Producto.findAll({
                where: {
                    id: req.body.prod.map(row => row.id)
                }
            }, {
                transaction: t
            });

            //Assign product to dispo if we have less than requested
            dispo = products.filter(row => {
                return row.cantidad < req.body.prod.find(p => row.id == p.id).cantidad
            })

            //Verifying stock availability for the purchase
            if (dispo.length > 0) {
                const resApi = {
                    meta: {
                        success: false,
                        title: 'Producto no disponible',
                        msg: ':Parece que uno de tus pedidos no se encuentra disponible',
                        endpoint: `/api/product/cart`
                    }
                };

                return res.json(resApi);
            };

            // Obtaining the total price for the full    invoice
            const totalProducts = products.reduce((acc, row) => {

                const cantidad = req.body.prod.find(pr => pr.id == row.id).cantidad

                return acc + (row.precio * cantidad)
            }, 0);

            const newInvoice = await db.Factura.create({
                total: totalProducts + req.body.shipment,
                'metodo-pago': req.body.method,
                'usuarios-fk': req.session.userLogged.id
            }, {
                transaction: t
            });

            const invoice = await db.Factura.findByPk(newInvoice.id, {
                transaction: t
            });

            // Adding data to the jointable factura_producto
            // Transaction error, dice que la transaction ya se comiteo al hacer este forEach
            await products.forEach( async row => {
                await invoice.addProduct(row, {
                    through: {cantidad: req.body.prod.find(pr => pr.id == row.id).cantidad}
                });
            })

            // Updating Cantidad on each product
            products.forEach(async row => {
                return await row.decrement('cantidad', {by: req.body.prod.find(p => p.id == row.id).cantidad});
            });

            await t.commit();

            const resApi = {
                meta: {
                    success: true,
                    endpoint: `/api/product/cart`
                },
                data: invoice
            };

            return res.json(resApi);
            
        } catch (error) {
            console.log(error);
        }
    },

    list: async (req, res) => {

        try {
            const products = await db.Producto.findAll( {
                include: [{association: 'image'}, {association: 'color'},{association: 'size'}]
            });
            const categories = await db.Categoria.findAll();
            const brands = await db.Marca.findAll();

            const resApi = {
                meta: {
                    success: true,
                    endpoint: `/api/product/list`
                },
                data: {
                    products: products,
                    user: req.session.userLogged && req.session.userLogged["roles-fk"],
                    categories: categories,
                    brands: brands,
                }
            };
            
            return res.json(resApi);

        } catch (error) {
            console.log(error);
        };

    },
    
    detail: async (req, res) => {

        try {

            const productDetail = await db.Producto.findByPk(req.body.id, {
                include: [
                    {association: 'image'},
                    {association: 'color'},
                    {association: 'size'}
                ]
            });

            const relatedProducts = await db.Producto.findAll({
                where: {
                    id: { 
                        [Op.ne] : productDetail.id
                    }
                },
                limit: 4,
                include: [{association: 'image'}]
            });

            const resApi = {
                meta: {
                    success: true,
                    endpoint: `/api/product/detail`
                },
                data: {
                    detail: productDetail,
                    related: relatedProducts
                }
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
                precio: body.price,
                detalle: body.desc,
                ingredientes: body.ingredients || null,
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
    editProcess: async (req, res) => {

        const t = await sequelize.transaction();

        try {

            const validation = validationResult(req);

            if(!validation.isEmpty()) {
                return res.json({
                    meta: {
                        success: false,
                        endpoint: `/api/product/edit`
                    },
                    data: validation.errors
                });
            };

            const body = req.body;
        
            await db.Producto.update({
                nombre: body.name,
                precio: body.price,
                detalle: body.desc,
                ingredientes: body.ingredients || null,
                cantidad: body.stock,
                'marcas-fk': body.brand,
                'categorias-fk': body.category
            }, {
                where: {
                    id: body.id
                },
                transaction: t
            });

            const Product = await db.Producto.findByPk(body.id, {
                transaction: t
            });

            if(req.files.length != 0) {

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
            };

            await Product.setColor(JSON.parse(body.color), {
                transaction: t
            });
            await Product.setSize(JSON.parse(body.size), {
                transaction: t
            });

            await t.commit();

            const resApi = {
                meta: {
                    success: true,
                    endpoint: `/api/product/edit`
                }
            };

            return res.json(resApi);

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
                    id: req.body.id
                },
                transaction: t
            });

            await t.commit();

            const resApi = {
                meta: {
                    success: true,
                    endpoint: `/api/product/edit/delete`
                }
            };

            return res.json(resApi);

        } catch (error) {
            console.log(error);
            await t.rollback();
        };
        
    }

};