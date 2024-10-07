const db = require('../../database/models');
const { validationResult } = require('express-validator');
const { sequelize } = require('../../database/models');
const Op = db.Sequelize.Op;

module.exports = {
  cart: async (req, res) => {
    try {
      const products = await db.Producto.findAll();

      const resApi = {
        meta: {
          success: true,
          endpoint: `/api/product/cart`,
        },
        data: products,
      };

      return res.json(resApi);
    } catch (error) {
      console.log(error);
    }
  },

  invoice: async (req, res) => {
    const t = await sequelize.transaction();

    try {
      let dispo = [];

      if (!req.session.userLogged) {
        const resApi = {
          meta: {
            success: false,
            title: 'Usuario inválido',
            msg: 'Usuario no identificado',
            endpoint: `/api/product/cart`,
          },
        };

        return res.json(resApi);
      }

      const products = await db.Producto.findAll(
        {
          where: {
            id: req.body.prod.map((row) => row.id),
          },
        },
        {
          transaction: t,
        }
      );

      const existanceValidation = products.length == req.body.prod.length;
      console.log(existanceValidation);
      console.log(products);

      //Assign product to dispo if we have less than requested
      dispo = products.filter((row) => {
        return row.cantidad < req.body.prod.find((p) => row.id == p.id).cantidad;
      });

      //Verifying stock availability for the purchase
      if (dispo.length > 0 && !existanceValidation) {
        const resApi = {
          meta: {
            success: false,
            title: 'Producto no disponible',
            msg: 'Parece que uno de tus pedidos no se encuentra disponible',
            endpoint: `/api/product/cart`,
          },
        };

        return res.json(resApi);
      }

      // Obtaining the total price for the full invoice
      const totalProducts = products.reduce((acc, row) => {
        const cantidad = req.body.prod.find((pr) => pr.id == row.id).cantidad;

        return acc + row.precio * cantidad;
      }, 0);

      const newInvoice = await db.Factura.create(
        {
          total: totalProducts + req.body.shipment,
          envio: req.body.shipment,
          'metodo-pago': req.body.method,
          'usuarios-fk': req.session.userLogged.id,
        },
        {
          transaction: t,
        }
      );

      const invoice = await db.Factura.findByPk(newInvoice.id, {
        transaction: t,
      });

      // Adding data to the jointable factura_producto
      await products.forEach(async (row) => {
        await invoice.addProduct(row, {
          through: { cantidad: req.body.prod.find((pr) => pr.id == row.id).cantidad },
        });
      });

      // Updating Cantidad on each product
      products.forEach(async (row) => {
        return await row.decrement('cantidad', { by: req.body.prod.find((p) => p.id == row.id).cantidad });
      });

      await t.commit();

      const resApi = {
        meta: {
          success: true,
          endpoint: `/api/product/cart`,
        },
        data: invoice,
      };

      return res.json(resApi);
    } catch (error) {
      console.log(error);
    }
  },

  plist: async (req, res) => {
    const resApi = {};
    try {
      const [products, categories, brands, colors, meassures] = await Promise.all([
        db.GrupoProducto.findAll({
          include: [
            { association: 'image' },
            { association: 'category' },
            { association: 'brand' },
            { association: 'product', include: [{ association: 'color' }, { association: 'size' }] },
          ],
        }),
        db.Categoria.findAll(),
        db.Marca.findAll(),
        db.Color.findAll(),
        db.Medida.findAll(),
      ]);

      resApi.meta = {
        success: true,
        url: '/api/product/',
        count: products.length,
        countByCategory: {},
        countByBrand: {},
        countByColor: {},
        countBySize: {},
      };

      const typeProductGroup = ({ id, name, fk, type }) => {
        const groupsFiltered = products.filter((group) =>
          type == 'product' ? group.product.find((product) => product[fk] == id) : group[fk] == id
        );

        return groupsFiltered.map((group) => {
          return {
            id: group.id,
            name: group[name],
            detail: `/product/detail/${group.id}-${group.product[0].id}`,
          };
        });
      };

      categories.forEach((category) => {
        return (resApi.meta.countByCategory[category.nombre] = typeProductGroup({
          id: category.id,
          name: 'nombre',
          fk: 'categorias-fk',
          type: 'group',
        }));
      });

      brands.forEach((brand) => {
        return (resApi.meta.countByBrand[brand.nombre] = typeProductGroup({
          id: brand.id,
          name: 'nombre',
          fk: 'marcas-fk',
          type: 'group',
        }));
      });

      colors.forEach((color) => {
        return (resApi.meta.countByColor[color.nombre] = typeProductGroup({
          id: color.id,
          name: 'nombre',
          fk: 'colores-fk',
          type: 'product',
        }));
      });

      meassures.forEach((size) => {
        return (resApi.meta.countBySize[size.medida] = typeProductGroup({
          id: size.id,
          name: 'medida',
          fk: 'medidas-fk',
          type: 'product',
        }));
      });

      resApi.data = products.map((product) => {
        return {
          id: product.id,
          name: product.nombre,
          description: product.descripcion,
          category: product.category.nombre,
          brand: product.brand.nombre,
          products: product.product,
          endpoint: `/api/product/${product.id}-${product.product[0].id}`,
          detail: `/product/detail/${product.id}-${product.product[0].id}`,
        };
      });

      return res.json(resApi);
    } catch (error) {
      console.log(error);
      resApi.msg = 'Hubo un error!';
      resApi.meta.success = false;
      return res.json(resApi);
    }
  },

  pdetail: async (req, res) => {
    const resApi = {};
    try {
      const product = await db.GrupoProducto.findByPk(req.params.groupId, {
        include: [{ association: 'image' }, { association: 'product', include: [{ association: 'bill' }] }],
      });

      resApi.data = JSON.parse(JSON.stringify(product));

      resApi.data.image = product.image.map((img) => `/img/productos/${img.nombre}`);
      resApi.data.detailLink = `/product/detail/${product.id}-${product.product[0].id}`;
      resApi.meta = {
        success: true,
        endpoint: `/api/product/${product.id}-${product.product[0].id}`,
      };

      return res.json(resApi);
    } catch (error) {
      console.log(error);
      resApi.msg = 'Hubo un error en pdetail!';
      resApi.success = false;
      return res.json(resApi);
    }
  },

  psales: async (req, res) => {
    const resApi = { meta: {} };
    try {
      const ventas = await db.Factura.findAll({
        include: [
          { association: 'product', include: [{ association: 'productGroup' }] },
          { association: 'user', paranoid: false },
        ],
      });

      resApi.data = ventas;
      resApi.count = ventas.length;
      resApi.meta = {
        success: true,
        endpoint: '/api/product/sales',
      };

      return res.json(resApi);
    } catch (error) {
      console.log(error);
      resApi.msg = 'Error en psales';
      resApi.meta.success = false;
      return res.json(resApi);
    }
  },

  list: async (req, res) => {
    try {
      const products = await db.GrupoProducto.findAll({
        include: [
          { association: 'image' },
          { association: 'product', include: [{ association: 'color' }, { association: 'size' }] },
        ],
      });
      const categories = await db.Categoria.findAll();
      const brands = await db.Marca.findAll();

      const resApi = {
        meta: {
          success: true,
          endpoint: `/api/product/list`,
        },
        data: {
          products: products,
          user: req.session.userLogged && req.session.userLogged['roles-fk'],
          categories: categories,
          brands: brands,
        },
      };

      return res.json(resApi);
    } catch (error) {
      console.log(error);
    }
  },

  detail: async (req, res) => {
    try {
      const prooductGroupDeatil = await db.GrupoProducto.findByPk(req.body.productGroupId, {
        include: [
          { association: 'product', include: [{ association: 'color' }, { association: 'size' }] },
          { association: 'image' },
        ],
      });

      const relatedProducts = await db.GrupoProducto.findAll({
        where: {
          id: {
            [Op.ne]: prooductGroupDeatil.id,
          },
        },
        limit: 4,
        include: [{ association: 'product' }, { association: 'image' }],
      });

      const resApi = {
        meta: {
          success: true,
          endpoint: `/api/product/detail`,
        },
        data: {
          detailGroup: prooductGroupDeatil,
          detail: prooductGroupDeatil.product.find((prod) => prod.id == req.body.productId),
          related: relatedProducts,
        },
      };

      return res.json(resApi);
    } catch (error) {
      console.log(error);
    }
  },
  create: async (req, res) => {
    try {
      const colores = await db.Color.findAll();
      const marcas = await db.Marca.findAll();
      const medidas = await db.Medida.findAll();
      const categorias = await db.Categoria.findAll();

      const resApi = {
        meta: {
          success: true,
          endpoint: `/api/product/create`,
        },
        data: {
          colores: colores,
          marcas: marcas,
          medidas: medidas,
          categorias: categorias,
        },
      };

      return res.json(resApi);
    } catch (error) {
      console.log(error);
    }
  },
  createProcess: async (req, res) => {
    const t = await sequelize.transaction();

    try {
      const validation = validationResult(req);

      if (!validation.isEmpty()) {
        return res.json({
          meta: {
            success: false,
            endpoint: `/api/product/create`,
          },
          data: validation.errors,
        });
      }

      const body = req.body;

      const newProduct = await db.GrupoProducto.create(
        {
          nombre: body.name,
          detalle: body.desc,
          ingredientes: body.ingredients || null,
          'marcas-fk': body.brand,
          'categorias-fk': body.category,
          image: req.files.map((img) => {
            return { nombre: img.filename };
          }),
          product: JSON.parse(body.variantProducts),
        },
        {
          transaction: t,
          include: [{ association: 'image' }, { association: 'product' }],
        }
      );

      await t.commit();

      const resApi = {
        meta: {
          success: true,
          endpoint: `/api/product/create`,
        },
        data: newProduct,
      };

      return res.json(resApi);
    } catch (error) {
      console.log(error);
      await t.rollback();
    }
  },
  edit: async (req, res) => {
    try {
      const colores = await db.Color.findAll();
      const marcas = await db.Marca.findAll();
      const medidas = await db.Medida.findAll();
      const categorias = await db.Categoria.findAll();

      const currentProduct = await db.GrupoProducto.findByPk(req.body.id, {
        include: [
          { association: 'image' },
          { association: 'product', include: [{ association: 'color' }, { association: 'size' }] },
        ],
      });

      const resApi = {
        meta: {
          success: true,
          endpoint: `/api/product/edit`,
        },
        data: {
          productGroup: currentProduct,
          colors: colores,
          brands: marcas,
          meassures: medidas,
          categories: categorias,
        },
      };

      return res.json(resApi);
    } catch (error) {
      console.log(error);
    }
  },
  editProcess: async (req, res) => {
    const t = await sequelize.transaction();

    try {
      const validation = validationResult(req);

      if (!validation.isEmpty()) {
        return res.json({
          meta: {
            success: false,
            endpoint: `/api/product/edit`,
          },
          data: validation.errors,
        });
      }

      const body = req.body;

      await db.GrupoProducto.update(
        {
          nombre: body.name,
          detalle: body.desc,
          ingredientes: body.ingredients || null,
          'marcas-fk': body.brand,
          'categorias-fk': body.category,
        },
        {
          where: {
            id: body.groupId,
          },
          transaction: t,
        }
      );

      const ProductGroup = await db.GrupoProducto.findByPk(body.groupId, {
        transaction: t,
      });

      await db.Producto.destroy({
        where: {
          'grupos-productos-fk': ProductGroup.id,
        },
        transaction: t,
      });

      const newProducts = await db.Producto.bulkCreate(JSON.parse(body.variantProducts), {
        transaction: t,
      });

      if (req.files && req.files.length != 0) {
        const prevImages = await ProductGroup.getImage();

        await db.Imagen.bulkCreate(
          req.files.map((img) => {
            return { nombre: img.filename, 'grupos-productos-fk': ProductGroup.id };
          }),
          {
            transaction: t,
          }
        );

        await db.Imagen.destroy({
          where: {
            'grupos-productos-fk': ProductGroup.id,
            id: {
              [Op.lte]: prevImages[prevImages.length - 1].id,
            },
          },
          transaction: t,
        });
      }

      await t.commit();

      const resApi = {
        meta: {
          success: true,
          endpoint: `/api/product/edit`,
        },
        data: {
          firstProductId: newProducts[0].id,
          groupProductId: newProducts[0][`grupos-productos-fk`],
        },
      };

      return res.json(resApi);
    } catch (error) {
      console.log(error);
      await t.rollback();
    }
  },
  delete: async (req, res) => {
    const t = await sequelize.transaction();

    try {
      await db.GrupoProducto.destroy({
        where: {
          id: req.body.id,
        },
        transaction: t,
      });

      await t.commit();

      const resApi = {
        meta: {
          success: true,
          endpoint: `/api/product/edit/delete`,
        },
      };

      return res.json(resApi);
    } catch (error) {
      console.log(error);
      await t.rollback();
    }
  },
};
