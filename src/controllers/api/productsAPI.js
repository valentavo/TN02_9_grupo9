const db = require('../../database/models');

module.exports = {
    detail: async (req, res) => {

        try {

            const productDetail = await db.Producto.findByPk(req.body.id, {
                include: [
                    {association: 'image'},
                    {association: 'color'},
                    {association: 'size'}
                ]
            });

            const resApi = {
                meta: {
                    success: true,
                    endpoint: `/api/product/detail`
                },
                data: productDetail
            };

            return res.json(resApi);
            
        } catch (error) {
            console.log(error);
        };
    }
};