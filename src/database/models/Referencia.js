module.exports = (sequelize, DataTypes) => {

    const alias = 'Referencia';

    const columnas = {
        id:  {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        comentario: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        'fecha-creacion': {
            type: DataTypes.DATE,
            allowNull: false
        },
        'usuarios-fk':  {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        'productos-fk':  {
            type: DataTypes.INTEGER.UNSIGNED,
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
        tableName: 'referencias',
        timestamps: true,
        paranoid: true,
        createdAt: 'created-at',
        updatedAt: 'updated-at',
        deletedAt: 'deleted-at'
    };

    const Referencia =  sequelize.define(alias, columnas, config);

    Referencia.associate = (models) => {

        Referencia.belongsTo(models.Producto, {
            as: 'productos',
            foreignKey: 'productos-fk'
        });

        Referencia.belongsTo(models.Usuario, {
            as: 'usuarios',
            foreignKey: 'usuarios-fk'
        });
    };

    return Referencia
};