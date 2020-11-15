module.exports = (sequelize, dataTypes) => {
    let alias = "Categories";
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
       

    }
    let config = {
        tableName: "categorias",
        timestamps: true,
        underscored:true
    }
    const Product = sequelize.define(alias,cols,config);
    Product.associate = function(models){
        Product.belongsTo(models.Products,{
            as : 'categorias', // Products.marcas
            foreignKey : 'categoria_id',//la clave foranea de este modelo en esa tabla intermedia
            
        })

    }
    return Product;
}
