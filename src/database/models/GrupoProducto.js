module.exports = (sequelize, DataTypes) => {
    const alias = 'GrupoProducto';

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
        detalle: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        ingredientes: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        'marcas-fk':  { // se supone que las fk no se declaran aqui pero si en las relaciones abajo segun lucas
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        'categorias-fk':  {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
    };

    const config = {
        tableName: 'grupos-productos',
        timestamps: true,
        paranoid: true,
        createdAt: 'created-at',
        updatedAt: 'updated-at',
        deletedAt: 'deleted-at'
    };

    const GrupoProdcuto = sequelize.define(alias, columnas, config);

    GrupoProdcuto.associate = (models) => {

        GrupoProdcuto.hasMany(models.Producto, {
            as: 'product',
            foreignKey: 'grupos-productos-fk'
        });

        GrupoProdcuto.hasMany(models.Referencia, {
            as: 'reference',
            foreignKey: 'grupos-productos-fk'
        });

        GrupoProdcuto.hasMany(models.Imagen, {
            as: 'image',
            foreignKey: 'grupos-productos-fk'
        });

        GrupoProdcuto.belongsTo(models.Categoria, {
            as: 'category',
            foreignKey: 'categorias-fk'
        });

        GrupoProdcuto.belongsTo(models.Marca, {
            as: 'brand',
            foreignKey: {
                name: 'marcas-fk',
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            }
        }); 
    };
    
    return GrupoProdcuto
};