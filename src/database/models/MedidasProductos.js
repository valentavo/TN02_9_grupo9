module.exports = (sequelize, DataTypes) => {

    const alias = 'medida_producto'; // sera mejor usar upperCammelcase?

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
        'medidas-fk':  {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {model: 'Medida', key: 'id'}
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
        tableName: 'medidas_productos',
        timestamps: true,
        paranoid: true,
        createdAt: 'created-at',
        updatedAt: 'updated-at',
        deletedAt: 'deleted-at'
    };

    return sequelize.define(alias, columnas, config);
};