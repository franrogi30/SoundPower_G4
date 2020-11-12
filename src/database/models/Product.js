module.exports = (sequelize, dataTypes) => {
    let alias = "Products";
    let cols = {
        id:{
            type:dataTypes.INTEGER(),
            allowNull:false, 
            autoIncrement: true,
            primaryKey:true
        },
        nombre:{
            type:dataTypes.STRING(100),
            allowNull:false,
        },
        precio:{
            type:dataTypes.INTEGER(10).UNSIGNED,
            allowNull:false
        },
        descripcion:{
            type:dataTypes.STRING(255),
            allowNull:false,
        },
        descuento:{
            type:dataTypes.INTEGER(100).UNSIGNED,
            allowNull:false,
            defaultValue:null
        },
        imagen:{
            type:dataTypes.STRING(100),
            allowNull:false,
        },
        marca_id:{
            type:dataTypes.INTEGER(10),
            allowNull:false,
        },
        
        categoria_id:{
            type:dataTypes.INTEGER(10),
            allowNull:false,
        }
    }
    let config = {
        tableName: "products",
        timestamps: true,
        underscored:true
    }
    const Product = sequelize.define(alias,cols,config);
    Product.associate = function(models){
        Product.belongsToMany(models.users,{
            as : 'users', // Products.usuarios
            through : 'cart',//tabla intermedia 
            foreignKey : 'producto_id',//la clave foranea de este modelo en esa tabla intermedia
            otherKey : 'usuario_id'//la otra clave foranea del otro modelo en cuestion en esa tabla intermedia
        })
    }
    return Product;
}
