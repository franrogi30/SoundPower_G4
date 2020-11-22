module.exports = (sequelize, dataTypes) => {
    let alias = "Marcas";
    let cols = {
        id:{
            type:dataTypes.INTEGER(11),
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
        tableName: "marcas",
        timestamps: false
    }
    let Marcas = sequelize.define(alias,cols,config);
    Marcas.associate = function(models){
        Marcas.hasMany(models.products,{
            as : 'products', // Products.marcas
            foreignKey : 'marca_id',//la clave foranea de este modelo en esa tabla intermedia
            
        })

    }
    return Marcas;
}
