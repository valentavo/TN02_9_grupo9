module.exports = (sequelize, DataTypes) => {

    const alias = 'Producto';

    const columnas = {
        id:  {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        precio: {
            type: DataTypes.DECIMAL(6, 2),
            allowNull: false
        },
        detalle: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        imagen: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        'fecha-publicacion': {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        'marcas-fk':  {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        'categorias-fk':  {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        'created-at': {
            type: DataTypes.DATE,
            allowNull: false
        },
        'updated-at': {
            type: DataTypes.DATE,
            allowNull: false
        },
        'deleted-at': {
            type: DataTypes.DATE,
            allowNull: false
        }
    };

    const config = {
        tableName: 'productos',
        timestamps: true,
        paranoid: true,
        createdAt: 'created-at',
        updatedAt: 'updated-at',
        deletedAt: 'deleted-at'
    };

    const Producto = sequelize.define(alias, columnas, config);

    Producto.associate = (models) => {

        Producto.hasMany(models.Referencia, {
            as: 'referencias',
            foreignKey: 'productos-fk'
        })

        Producto.belongsTo(models.Categoria, {
            as: 'categorias',
            foreignKey: 'categorias-fk'
        });

        Producto.belongsTo(models.Marca, {
            as: 'marcas',
            foreignKey: 'marcas-fk'
        });

        Producto.belongsToMany(models.Color, {
            as: 'colores',
            through: 'color_producto',
            foreignKey: 'productos-fk',
            otherKey: 'colores-fk',
        });

        Producto.belongsToMany(models.Medida, {
            as: 'medidas',
            through: 'medida_producto',
            foreignKey: 'productos-fk',
            otherKey: 'medidas-fk',
        });

        Producto.belongsToMany(models.Factura, {
            as: 'facturas',
            through: 'factura_producto',
            foreignKey: 'productos-fk',
            otherKey: 'facturas-fk',
        });
    }

    return Producto
};