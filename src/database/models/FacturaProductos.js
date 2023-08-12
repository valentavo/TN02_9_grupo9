module.exports = (sequelize, DataTypes) => {

    const alias = 'factura_producto'; // sera mejor usar upperCammelcase?

    const columnas = {
        id:  {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
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
        descuento: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        precio: {
            type: DataTypes.DECIMAL(6 , 2),
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
        tableName: 'facturas_productos',
        timestamps: true,
        paranoid: true,
        createdAt: 'created-at',
        updatedAt: 'updated-at',
        deletedAt: 'deleted-at'
    };

    return sequelize.define(alias, columnas, config);
};