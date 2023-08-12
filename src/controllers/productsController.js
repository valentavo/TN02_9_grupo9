// const jsonPaths = require('../modules/jsonPaths.js');

// //Datos procesados
// const productsPath = '../database/products.json';
// let products = jsonPaths.read(productsPath);
// const categories = jsonPaths.read("../database/categories.json");

const { validationResult } = require('express-validator');
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

    details: async (req, res) => {

        try {

            const productDetail = await db.Producto.findByPk(req.params.productId);

            return res.render('./products/productDetail.ejs', {producto: productDetail});
            
        } catch (error) {
            console.log(error);
        }
    },

    list: async (req, res) => {

        try {
            // poner filtro para no ver los borrados logicos
            const notErased = await db.Producto.findAll();
            
            return res.render('./products/productList.ejs', {productos: notErased});

        } catch (error) {
            console.log(error);
        }

    },

    create: async (req, res) => {

        try {

            const products = await db.Producto.findAll({
                include: [
                    {association: 'categorias'},
                    {association: 'marcas'},
                    {association: 'colores'},
                    {association: 'medidas'}
                ]
            });
            
            return res.render('./products/productCreate.ejs', {products: products, oldErrors: ""});
        
        } catch (error) {
            console.log(error);
        }

    },

    createProcess: async (req, res) => {

        try {

            const products = await db.Producto.findAll({
                include: [
                    {association: 'categorias'},
                    {association: 'marcas'},
                    {association: 'colores'},
                    {association: 'medidas'}
                ]
            });
            
            const errors = validationResult(req);

            if(!errors.isEmpty()) {

                return res.render('./products/productCreate.ejs', {errorMessages: errors.mapped(), oldErrors: req.body, products: products});
            }
            
            // const newProduct = {
            //     id: products.length + 1,
            //     title: req.body.name,
            //     img: req.file.filename,
            //     capacity: [req.body.cap],
            //     measure: req.body.capacityMeasure,
            //     color: [req.body.colors],
            //     price: req.body.amount,
            //     stock: req.body.unities,
            //     label: req.body.label,
            //     description: req.body.desc,
            //     erased: false
            // };

            const body = req.body;
            const currentDate = Date.now();

            const newProduct = await db.Producto.create({
                nombre: body.name,
                precio: body.amount,
                detalle: body.desc,
                imagen: req.file.filename,
                'fecha-publicacion': `${currentDate.getMonth() + 1}-${currentDate.getDate()}-${currentDate.getFullYear()}`,
                'marcas-fk': body.brand,
                'categorias-fk': body.label
            });
            
            return res.redirect(`/product/detail/${newProduct.id}`);
            
        } catch (error) {
            console.log(error);
        }

    },

    edit: function (req, res) {

        const currentProduct = products.find(row => row.id == req.params.productId);


        return res.render('./products/productEdit.ejs', {producto: currentProduct, categories: categories});
    }, 

    editProcess: function (req, res) {
        const currentProduct = products.find(row => row.id == req.params.productId);
       
        currentProduct.title = req.body.name;
        req.file ? currentProduct.img = req.file.filename : "";
        currentProduct.capacity = [req.body.cap || ""];
        currentProduct.measure = req.body.capacityMeasure || "";
        currentProduct.color = [req.body.colors || ""];
        currentProduct.price = req.body.amount;
        currentProduct.stock = req.body.unities;
        currentProduct.label = [...req.body.label];
        currentProduct.description = req.body.desc;

        jsonPaths.write(productsPath, products);

        products = jsonPaths.read(productsPath);

        return res.redirect(`/product/detail/${currentProduct.id}`);
    }, 

    delete: function(req, res) {
        const currentProduct = products.find(row => row.id == req.params.productId);
        currentProduct.erased = true;

        jsonPaths.write(productsPath, products);

        products = jsonPaths.read(productsPath);

        return res.redirect('/product/list');
    }
}; 