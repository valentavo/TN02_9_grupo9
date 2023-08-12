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
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: 'defaultProfilePhoto.jpeg'
        },
        direccion: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        'fecha-nacimiento': {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        telefono: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        logged: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        'roles-fk': {
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
            as: 'roles',
            foreignKey: 'roles-fk'
        });

        Usuario.hasMany(models.Factura, {
            as: 'facturas',
            foreignKey: 'usuarios-fk'
        });

        Usuario.hasMany(models.Referencia, {
            as: 'referencias',
            foreignKey: 'usuarios-fk'
        });
    };

    return Usuario
};