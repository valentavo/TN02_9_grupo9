const db = require('../database/models');

module.exports = async (req, res, next) => {
    const grupoProducto = await db.GrupoProducto.findByPk(req.params.productGroupId, { include: [{association: 'product'}]});

    if(!grupoProducto) return res.redirect('/');

    const producto = grupoProducto.product.find(prod => prod.id == req.params.productId);

    if(!producto) return res.redirect(`/product/detail/${grupoProducto.id}-${grupoProducto.product[0].id}`)

    next();
};