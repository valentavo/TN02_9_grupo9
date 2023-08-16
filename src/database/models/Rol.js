module.exports = (sequelize, DataTypes) => {

    const alias = 'Rol';

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
        tableName: 'roles',
        timestamps: true,
        paranoid: true,
        createdAt: 'created-at',
        updatedAt: 'updated-at',
        deletedAt: 'deleted-at'
    };

    const Rol =  sequelize.define(alias, columnas, config);

    Rol.associate = (models) => {
        Rol.hasMany(models.Usuario, {
            as: 'user',
            foreignKey: 'roles-fk'
        })
    };

    return Rol
};