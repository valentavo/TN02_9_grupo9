module.exports = {

    cart: async (req, res) => {

        return res.render('./products/productCart.ejs');

    },

    list: async (req, res) => {

        return res.render('./products/productList.ejs');

    },

    detail: async (req, res) => {

        return res.render('./products/productDetail.ejs');

    },

    create: async (req, res) => {

        return res.render('./products/productCreate.ejs');

    },

    edit: async (req, res) => {

        return res.render('./products/productEdit.ejs');

    },
    adminList: async (req, res) => {

        return res.render('./products/productAdminList.ejs');

    },
}; 