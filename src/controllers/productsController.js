const jsonPaths = require('../modules/jsonPaths.js');

//Datos procesados
const productsPath = '../database/products.json';
let products = jsonPaths.read(productsPath);
const categories = jsonPaths.read("../database/categories.json");

module.exports = {

    cart: (req, res) =>{
        return res.render('./products/productCart.ejs', {productos: products});
    },

    details:  (req, res) =>{

        const productDetail = products.find(row => {
            return row.id == req.params.productId;
        });

        return res.render('./products/productDetail.ejs', {producto: productDetail});
    },

    list: function (req, res) {

        const notErased = products.filter(row => row.erased !== true);

        return res.render('./products/productList.ejs', {productos: notErased});
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
            label: req.body.label,
            description: req.body.desc,
            erased: false
        };

        jsonPaths.write(productsPath, [...products, newProduct]);

        products = jsonPaths.read(productsPath);
        
        return res.redirect(`/product/detail/${newProduct.id}`);
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