const db = require('../../database/models');
const {QueryTypes} = require('sequelize');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


module.exports = {
    index: async (req, res) => {
        try {
            
            //Buscando los primeros 6 productos
            const recomendations = await db.GrupoProducto.findAll({
                include: [{association: 'product', limit: 1}, {association: 'image'}],
                limit: 6
            });

            /*(antes de grupos-productos en base de datos)
            //Filtrando productos por mas ventas 
            const data = await db.sequelize.query("SELECT productos.id, nombre, precio, SUM(`facturas_productos`.cantidad) AS ventas FROM productos LEFT JOIN `facturas_productos` ON productos.id = `facturas_productos`.`productos-fk` GROUP BY nombre HAVING ventas > 0 ORDER BY ventas DESC LIMIT 6;", {type: QueryTypes.SELECT});

            //Almacenando ids de productos en orden
            const idArray = data.map(row => row.id);

            //Incluyendo imagenes
            const bestSellers = await db.Producto.findAll({
                where: {
                    id: {
                        [Op.in]: idArray
                    }
                },
                include: [{association: 'image'}]
            });

            //Reorganizando productos con imagenes
            const orderedResults = idArray.map(id => bestSellers.find(row => row.id === id));
            */

            //Estructura de la API
            const resApi = {
                meta: {
                    status: 200,
                    length: recomendations.length,
                    endpoint: '/api'
                },
                data: { bestSellers: recomendations, recomendations: recomendations}
            };

            return res.json(resApi);

        } catch (error) {
            console.log(error);
        }
    }
};