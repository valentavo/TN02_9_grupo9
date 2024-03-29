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
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imagen: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        direccion: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        'fecha-nacimiento': {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        telefono: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
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
            as: 'role',
            foreignKey: 'roles-fk'
        });

        Usuario.hasMany(models.Factura, {
            as: 'bill',
            foreignKey: 'usuarios-fk'
        });

        Usuario.hasMany(models.Referencia, {
            as: 'reference',
            foreignKey: 'usuarios-fk'
        });
    };

    return Usuario
};