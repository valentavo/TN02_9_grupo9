const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../database/products.json")));

const homeType = ["Cuidado de la Piel", "Para el Cabello"];
const homeBrand = ["Paco Rabane", "Channel"];

module.exports = {
    index: (req, res) => {

        //Filtrador de data
        const homeData = function(dataProduct) {
            return data.filter(product => product.label.some(row => row === dataProduct))
        };

        const categoryProducts = homeType.map( row => {
        
            return {name: row, content: homeData(row)};
        
        });


        const brandProducts = homeBrand.map( row => {
        
            return {name: row, content: homeData(row)};
        
        });

        return res.render('index.ejs', {categoryProducts: categoryProducts, brandProducts: brandProducts});
    }
}