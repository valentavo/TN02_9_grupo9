module.exports = (sequelize, DataTypes) => {

    const alias = 'Producto';

    const columnas = {
        id:  {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        precio: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        cantidad: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        'colores-fk': {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        'medidas-fk': {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        'grupos-productos-fk': {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        'created-at': {
            type: DataTypes.DATE,
        },
        'updated-at': {
            type: DataTypes.DATE,
        },
        'deleted-at': {
            type: DataTypes.DATE,
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

        Producto.belongsTo(models.GrupoProducto, {
            as: 'productGroup',
            foreignKey: 'grupos-productos-fk'
        });

        Producto.belongsTo(models.Color, {
            as: 'color',
            foreignKey: 'colores-fk'
        });

        Producto.belongsTo(models.Medida, {
            as: 'size',
            foreignKey: 'medidas-fk'
        });

        Producto.belongsToMany(models.Factura, {
            as: 'bill',
            through: 'factura_producto',
            foreignKey: 'productos-fk',
            otherKey: 'facturas-fk',
        });
    }

    return Producto
};