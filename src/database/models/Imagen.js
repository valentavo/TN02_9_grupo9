module.exports = (sequelize, DataTypes) => {

    const alias = 'Imagen';

    const columnas = {
        id:  {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        nombre: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        'productos-fk': {
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
        tableName: 'imagenes',
        timestamps: true,
        paranoid: true,
        createdAt: 'created-at',
        updatedAt: 'updated-at',
        deletedAt: 'deleted-at'
    };

    const Imagen = sequelize.define(alias, columnas, config);

    Imagen.associate = (models) => {
        Imagen.belongsTo(models.Producto , {
            as: 'producto',
            foreignKey: 'productos-fk'
        })
    };

    return Imagen
};