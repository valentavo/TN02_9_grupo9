module.exports = (sequelize, DataTypes) => { // el segundo parametro deberia ser dataTypes y no DataTypes

    const alias = 'Categoria';

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
        tableName: 'categorias',
        timestamps: true,
        paranoid: true,
        createdAt: 'created-at',
        updatedAt: 'updated-at',
        deletedAt: 'deleted-at'
    };

    const Categoria = sequelize.define(alias, columnas, config);

    Categoria.associate = (models) => {
        Categoria.hasMany(models.GrupoProducto , {
            as: 'productGroup',
            foreignKey: 'categorias-fk'
        })
    };

    return Categoria
};