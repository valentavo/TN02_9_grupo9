const db = require('../../database/models');


module.exports = {
    index: async (req, res) => {
        try {

            const products = await db.Producto.findAll({
                include: [{association: 'image'}]
            });

            //Estructura de la API
            const resApi = {
                meta: {
                    status: 200,
                    length: products.length,
                    endpoint: '/api'
                },
                data: products
            };

            return res.json(resApi);

        } catch (error) {
            console.log(error);
        }
    }
};