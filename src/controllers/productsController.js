const fs = require('fs');
const path = require('path');

//Datos del modelo en JSON
const productsJsonPath = path.resolve(__dirname, "../database/products.json");
const categoriesJsonPath = path.resolve(__dirname, "../database/categories.json");

//Datos procesados
const products = JSON.parse(fs.readFileSync(productsJsonPath), "utf-8");
const categories = JSON.parse(fs.readFileSync(categoriesJsonPath), "utf-8");

module.exports = {

    cart: (req, res) =>{
        return res.render('./products/productCart.ejs', {productos: products});
    },

    details:  (req, res) =>{

        const productDetail = products.find(row => {
            return row.id == req.params.productId;
        })

        return res.render('./products/productDetail.ejs', {producto: productDetail});
    },

    list: function (req, res) {
        return res.render('./products/productList.ejs', {productos: products});
    },

    create: (req, res) =>{
        return res.render('./products/productCreate.ejs', {categories: categories});
    },

    createProcess: (req, res) => {
        
        const newProduct = {
            id: products.length + 1,
            title: req.body.name,
            img: req.file.filename,
            capacity: [req.body.cap],
            measure: req.body.capacityMeasure,
            color: [req.body.colors],
            price: req.body.amount,
            stock: req.body.unities,
            label: [req.body.label],
            description: req.body.desc,
            erased: false
        };

        fs.writeFileSync(productsJsonPath, JSON.stringify([...products, newProduct], null, 2), "utf-8");
        
        return res.redirect(`/products/detail/${newProduct.id}`);
    },

    edit: function (req, res) {

        const currentProduct = products.find(row => row.id == req.params.productId)

        return res.render('./products/productEdit.ejs', {producto: currentProduct, categories: categories});
    }, 

    editProcess: function (req, res) {
        return res.send('estoy funcionando por PUT');
    }, 
}; 