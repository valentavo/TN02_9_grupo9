module.exports = (sequelize, DataTypes) => {

    const alias = 'Referencia';

    const columnas = {
        id:  {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        puntuacion:  {
            type: DataTypes.SMALLINT.UNSIGNED,
            allowNull: false
        },
        comentario: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        visibilidad:  {
            type: DataTypes.TINYINT.UNSIGNED,
            allowNull: false
        },
        'usuarios-fk':  {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        'grupos-productos-fk':  {
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

        Referencia.belongsTo(models.GrupoProducto, {
            as: 'productGroup',
            foreignKey: 'grupos-productos-fk'
        });

        Referencia.belongsTo(models.Usuario, {
            as: 'user',
            foreignKey: 'usuarios-fk'
        });
    };

    return Referencia
};