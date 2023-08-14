module.exports = (sequelize, DataTypes) => {

    const alias = 'Usuario';

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
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imagen: {
            type: DataTypes.TEXT
        },
        direccion: {
            type: DataTypes.TEXT
        },
        'fecha-nacimiento': {
            type: DataTypes.DATEONLY,
        },
        telefono: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
        logged: {
            type: DataTypes.BOOLEAN,
        },
        'roles-fk': {
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
        tableName: 'usuarios',
        timestamps: true,
        paranoid: true,
        createdAt: 'created-at',
        updatedAt: 'updated-at',
        deletedAt: 'deleted-at'
    };

    const Usuario = sequelize.define(alias, columnas, config);

    Usuario.associate = (models) => {

        Usuario.belongsTo(models.Rol, {
            as: 'rol',
            foreignKey: 'roles-fk'
        });

        Usuario.hasMany(models.Factura, {
            as: 'factura',
            foreignKey: 'usuarios-fk'
        });

        Usuario.hasMany(models.Referencia, {
            as: 'referencia',
            foreignKey: 'usuarios-fk'
        });
    };

    return Usuario
};