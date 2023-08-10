//Reader of JSONS
const jsonPaths = require('../modules/jsonPaths.js');

//Reading products.json and categories.json
const dataProducts = jsonPaths.read("../database/products.json");
const dataCategories = jsonPaths.read("../database/categories.json");

//Reading users.json
const usersData = jsonPaths.read('../database/users.json');

//Categories Selector
const categoriesSelector = (group, element) => dataCategories[group].content[element];

//Selecting the elements of each home category
const homeType = [categoriesSelector(0, 0), categoriesSelector(0, 1)];
const homeBrand = [categoriesSelector(1, 0), categoriesSelector(1, 1)];


module.exports = {
    index: (req, res) => {
        /*
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
        */

        const products = dataProducts;

        return res.render('index.ejs', { products })
    },
    admin: (req, res) => {

        const user = usersData.find(row => row.id == req.params.userId);

        return res.render('admin.ejs', {user: user});
    },
    about: (req, res) => {
        return res.render('aboutUs.ejs');
    }
}