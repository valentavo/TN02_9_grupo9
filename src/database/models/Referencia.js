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
        },
        'updated-at': {
            type: DataTypes.DATE,
        },
        'deleted-at': {
            type: DataTypes.DATE,
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
            as: 'producto',
            foreignKey: 'productos-fk'
        });

        Referencia.belongsTo(models.Usuario, {
            as: 'usuario',
            foreignKey: 'usuarios-fk'
        });
    };

    return Referencia
};