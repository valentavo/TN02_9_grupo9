module.exports = (sequelize, DataTypes) => {

    const alias = 'Medida';

    const columnas = {
        id:  {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        medida: {
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
        tableName: 'medidas',
        timestamps: true,
        paranoid: true,
        createdAt: 'created-at',
        updatedAt: 'updated-at',
        deletedAt: 'deleted-at'
    };

    const Medida =  sequelize.define(alias, columnas, config);

    Medida.associate = (models) => {

        Medida.belongsToMany(models.Producto, {
            as: 'product',
            through: 'medida_producto',
            foreignKey: 'medidas-fk',
            otherKey: 'productos-fk',
        });
    }


    return Medida
};