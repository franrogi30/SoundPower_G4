module.exports = (sequelize, dataTypes) => {
    let alias = "color";
    let cols = {
        id:{
            type:dataTypes.INTEGER(),
            allowNull:false, 
            autoIncrement: true,
            primaryKey:true
        },
        color:{
            type:dataTypes.STRING(60),
            allowNull:false,
        },

        
    }
    let config = {
        tableName: "Color",
        timestamps: true,
        underscored:true
    }
    const Color = sequelize.define(alias,cols,config);
    Color.associate = function(models){
        Color.belongsToMany(models.Products,{
            as : 'Products', 
            through : 'products_colors',//tabla intermedia 
            foreignKey : 'coloror_id',//la clave foranea de este modelo en esa tabla intermedia
            otherKey : 'producto_id'//la otra clave foranea del otro modelo en cuestion en esa tabla intermedia
        })
    }
    
    return Color;
}
