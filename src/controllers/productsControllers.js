const dbProducts = require('../data/database') //requiero la base de datos de productos
const fs = require('fs');
const path = require('path');
const {check,validationResult,body} = require('express-validator');
const sequelize = require('sequelize');
const db  = require('../database/models');
const { Result } = require('express-validator');

module.exports = {
    products : (req, res) => {

        res.render('products',{
            
            title:"Productos",
            producto: dbProducts,
            
        })

    },
    productsDetails : (req, res) => {
        let id = req.params.id;
        let producto = dbProducts.filter(producto => {
            return producto.id == id
        })
        res.render('productDetails', {
            title: "Detalle del Producto",
            id: id,
            producto: producto[0],
            price:producto.price,
            image:producto.image
            
            }
    )
    },
    productsAdd : (req, res) => {
        res.render('productAdd',{
            title:"Agregar Productos"
        })
    },
    publicar: (req, res, next) =>{

        dbProducts.create({
            
        nombre: req.body.titulo,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        imagen:req.file[0].filename
        })
        .then(Result =>{
            return res.redirect('/products/productsAdd')
        })
        res.render('productAdd',{
            title:"Publicar"
        })
    },
    cart : (req, res) => {
        res.render('cart',{
            title:"Carrito"
        })
    },
    modify: (req,res)=>{
        let id = req.params.id;
        let producto = dbProducts.filter(producto => {
            return producto.id == id
        })
        res.render('modifyProduct', {
            title: "Modificar Productos",
            id: id,
            producto: producto,
            price:producto.price,
          
            description:producto.description,
            category:producto.category

        })
      },
    discount: (req,res) =>{

        res.render('products',{
        title:"OPORTUNIDADES",
        producto:dbProducts,   
        }
        )
      },
    category : (req,res)=>{
            let category = req.params.category;
            let producto = dbProducts.filter(producto => {
                return producto.category == category
            })
            res.render('products', {
                
                title: "Categoria "+ category.toUpperCase(),
                producto:producto,
                price:producto.price,
                image:producto.image
        })
    },
    search: function(req, res) {
  
        let errors = validationResult(req); 
        
        if(errors.isEmpty()){ 
            let buscar = req.query.search;
            let productos = [];
            dbProducts.forEach(producto => {
                if (producto.name.toLowerCase().includes(buscar)) {
                    productos.push(producto)
                }
            })
        res.render('products', {
            title: "Resultado de la búsqueda",
            producto: productos,
     
        })
    }else{
        return res.redirect('/')
    }
    },
    delete : (req,res)=>{
        let idProducto = req.params.id;
        dbProducts.forEach(producto=>{
            if(producto.id == idProducto){
                let aEliminar = dbProducts.indexOf(producto);
                dbProducts.splice(aEliminar,1);
            }
        })
        fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'), JSON.stringify(dbProducts));
        res.redirect('/users/profile')
    }
}
