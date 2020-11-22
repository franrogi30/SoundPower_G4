module.exports = (sequelize, dataTypes) => {
    let alias = "users";
    let cols = {
        id:{
            type:dataTypes.INTEGER(),
            allowNull:false, 
            autoIncrement: true,
            primaryKey:true
        },
        nombre:{
            type:dataTypes.STRING(50),
            allowNull:false,
            validate: {
                isAlpha:{
                    args:true,
                    msg:"El nombre solo puede contener letras"
                }
            }
        },
        apellido:{
            type:dataTypes.STRING(50),
            allowNull:false,
            validate: {
                isAlpha:{
                    msg:"El apellido solo puede contener letras"
                }
            }
        },
        email:{
            type:dataTypes.STRING(50),
            allowNull:false,
            unique:true,
        },
        contraseña:{
            type:dataTypes.STRING(100),
            allowNull:false
        },
        direccion:{
            type:dataTypes.STRING(100)
        },
        localidad:{
            type:dataTypes.STRING(100)
        },
        
        avatar:{
            type:dataTypes.STRING(100)
        },
        rol:{
            type:dataTypes.STRING(20),
            allowNull:false
        }
    }
    let config = {
        tableName: "users",
        timestamps: false,
        
    }
    let User = sequelize.define(alias,cols,config);
    User.associate = function(models){
        User.belongsToMany(models.products,{
            as : 'productos', 
            through : 'cart',//tabla intermedia 
            foreignKey : 'usuario_id',//la clave foranea de este modelo en esa tabla intermedia
            otherKey : 'producto_id'//la otra clave foranea del otro modelo en cuestion en esa tabla intermedia
        })
    }
    return User;
}
