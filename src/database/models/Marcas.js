module.exports = (sequelize, dataTypes) => {
    let alias = "Marcas";
    let cols = {
        id:{
            type:dataTypes.INTEGER(),
            allowNull:false, 
            autoIncrement: true,
            primaryKey:true
        },
        nombre:{
            type:dataTypes.STRING(60),
            allowNull:false,
        },
       
        imagen:{
            type:dataTypes.STRING(100),
            allowNull:false,
        },
     
        
    }
    let config = {
        tableName: "marcas",
        timestamps: true,
        underscored:true
    }
    const Product = sequelize.define(alias,cols,config);
    Product.associate = function(models){
        Product.belongsTo(models.Products,{
            as : 'marcas', // Products.marcas
            foreignKey : 'marca_id',//la clave foranea de este modelo en esa tabla intermedia
            
        }),
        Product.belongsToMany(models.Products,{
            as : 'product', 
            through : 'products_colors',//tabla intermedia 
            foreignKey : 'producto_id',//la clave foranea de este modelo en esa tabla intermedia
            otherKey : 'coloror_id'//la otra clave foranea del otro modelo en cuestion en esa tabla intermedia
        })
    }
    return Product;
}
