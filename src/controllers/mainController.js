const fs = require('fs');
const path = require('path');

//Reader of JSONS
const JsonParseReadPath = (routePath) => JSON.parse(fs.readFileSync(path.resolve(__dirname, routePath)));

//Reading products.json and categories.json
const dataProducts = JsonParseReadPath("../database/products.json");
const dataCategories = JsonParseReadPath("../database/categories.json");

//Categories Selector
const categoriesSelector = (group, element) => dataCategories[group].content[element];

//Selecting the elements of each home category
const homeType = [categoriesSelector(0, 0), categoriesSelector(0, 1)];
const homeBrand = [categoriesSelector(1, 0), categoriesSelector(1, 1)];

module.exports = {
    index: (req, res) => {

        //Category Elements Filter
        const categoryElements = function(elementName) {

            //return all elements with the same elementName
            return dataProducts.filter(product => product.label.some(row => row === elementName) && !product.erased)
        };

        // Filtring Elements by type into new array
        const categoryProducts = homeType.map( row => {
        
            return {name: row, content: categoryElements(row)};
        
        });

        //Filtring Elements by Brand into new array
        const brandProducts = homeBrand.map( row => {
        
            return {name: row, content: categoryElements(row)};
        
        });

        return res.render('index.ejs', {categoryProducts: categoryProducts, brandProducts: brandProducts});
    }
}