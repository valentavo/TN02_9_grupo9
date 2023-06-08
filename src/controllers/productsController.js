module.exports = {
    cart: (req, res) =>{
        return res.render('./products/productCart.ejs');
    },
    details:  (req, res) =>{
        return res.render('./products/productDetail.ejs');
    } 
};