module.exports = (sequelize, dataTypes) => {
    let alias = "categories";
    let cols = {
        id:{
            type:dataTypes.INTEGER(11),
            allowNull:false, 
            autoIncrement: true,
            primaryKey:true
        },
        nombre:{
            type:dataTypes.STRING(45),
            allowNull:false,
        },
       

    }
    let config = {
        tableName: "categories",
        timestamps: false,
    }
    let Category = sequelize.define(alias,cols,config);
    Category.associate = function(models){
        Category.belongsTo(models.products,{
            as : 'products', // Products.marcas
            foreignKey : 'id',//la clave foranea de este modelo en esa tabla intermedia
            
        })

    }
    return Category;
}
