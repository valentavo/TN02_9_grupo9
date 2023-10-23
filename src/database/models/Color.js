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
            unique: true,
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

    Color.associate = (models) => {
        Color.hasMany(models.Producto, {
            as: 'product',
            foreignKey: 'colores-fk'
        });
    };

    return Color
};