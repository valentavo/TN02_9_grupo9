module.exports = (sequelize, DataTypes) => {

    const alias = 'Color';

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
        tableName: 'colores',
        timestamps: true,
        paranoid: true,
        createdAt: 'created-at',
        updatedAt: 'updated-at',
        deletedAt: 'deleted-at'
    };

    const Color = sequelize.define(alias, columnas, config);

    Color.Associate = (models) => {
        Color.belongsToMany(models.Producto, {
            as: 'product',
            through: 'ColoresProductos',
            foreignKey: 'colores-fk',
            otherKey: 'productos-fk',
        });
    };

    return Color
};