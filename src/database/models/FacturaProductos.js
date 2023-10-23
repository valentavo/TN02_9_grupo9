module.exports = (sequelize, DataTypes) => {

    const alias = 'FacturaProducto'; // Antes era factura_producto

    const columnas = {
        id:  {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        descuento: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        cantidad: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        'productos-fk':  {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {model: 'Producto', key: 'id'}
        },
        'facturas-fk':  {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {model: 'Factura', key: 'id'}
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
        tableName: 'facturas_productos',
        timestamps: true,
        paranoid: true,
        createdAt: 'created-at',
        updatedAt: 'updated-at',
        deletedAt: 'deleted-at'
    };

    return sequelize.define(alias, columnas, config);
};