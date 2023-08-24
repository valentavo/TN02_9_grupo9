module.exports = (sequelize, DataTypes) => {

    const alias = 'Producto';

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
        precio: {
            type: DataTypes.DECIMAL(10, 2).UNSIGNED,
            allowNull: false
        },
        detalle: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        cantidad: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        'marcas-fk':  { // se supone que las fk no se declaran aqui pero si en las relaciones abajo segun lucas
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        'categorias-fk':  {
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
        tableName: 'productos',
        timestamps: true,
        paranoid: true,
        createdAt: 'created-at',
        updatedAt: 'updated-at',
        deletedAt: 'deleted-at'
    };

    const Producto = sequelize.define(alias, columnas, config);

    Producto.associate = (models) => {

        Producto.hasMany(models.Referencia, {
            as: 'reference',
            foreignKey: 'productos-fk'
        });

        Producto.hasMany(models.Imagen, {
            as: 'image',
            foreignKey: 'productos-fk'
        });

        Producto.belongsTo(models.Categoria, {
            as: 'category',
            foreignKey: 'categorias-fk'
        });

        Producto.belongsTo(models.Marca, {
            as: 'brand',
            foreignKey: {
                name: 'marcas-fk',
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            }
        });

        Producto.belongsToMany(models.Color, {
            as: 'color',
            through: 'ColoresProductos',
            foreignKey: 'productos-fk',
            otherKey: 'colores-fk',
        });

        Producto.belongsToMany(models.Medida, {
            as: 'size',
            through: 'medida_producto',
            foreignKey: 'productos-fk',
            otherKey: 'medidas-fk',
        });

        Producto.belongsToMany(models.Factura, {
            as: 'bill',
            through: 'factura_producto',
            foreignKey: 'productos-fk',
            otherKey: 'facturas-fk',
        });
    }

    return Producto
};