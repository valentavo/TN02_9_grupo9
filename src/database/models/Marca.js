module.exports = (sequelize, DataTypes) => {

    const alias = 'Marca';

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
        tableName: 'marcas',
        timestamps: true,
        paranoid: true,
        createdAt: 'created-at',
        updatedAt: 'updated-at',
        deletedAt: 'deleted-at'
    };

    const Marca = sequelize.define(alias, columnas, config);

    Marca.associate = (models) => {
        Marca.hasMany(models.Producto, {
            as: 'product',
            foreignKey: 'marcas-fk'
        });
    }

    return Marca

};