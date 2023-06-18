const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../database/products.json")));

module.exports = {
    cart: (req, res) =>{
        return res.render('./products/productCart.ejs', {productos: data});
    },
    details:  (req, res) =>{

        const productDetail = data.find(row => {
            return row.id == req.params.productId;
        })

        return res.render('./products/productDetail.ejs', {producto: productDetail});
    },
    create: (req, res) =>{
        return res.render('./products/productCreate.ejs');
    }
};