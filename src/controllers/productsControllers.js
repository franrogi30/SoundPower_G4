const dbProducts = require('../data/database') //requiero la base de datos de productos
const fs = require('fs');
const path = require('path');
const {check,validationResult,body} = require('express-validator');
const sequelize = require('sequelize');
const db  = require('../database/models');
const { Result } = require('express-validator');

module.exports = {
    products : (req, res) => {
        db.products.findAll()
        .then((product) => {
            res.render('products', {
                title: "Productos",
                product: product 
            }
        )
    }).catch(console.log(error))

    },
    productsDetails : (req, res) => {
        db.products.findByPk(req.params.id)
        .then(product => {
            res.render('productDetails', {
                title: "Detalle del Producto",
                product: product 
            }
        )
    })

    },
    productsAdd : (req, res) => {
        let categorias = db.Category.findAll({
            order : [
                ['nombre','ASC']
            ]
        }
    )
        let marcas = db.Marcas.findAll({
            order : [
                ['nombre','ASC']
            ]
        }
    )
    Promise.all([categorias,marcas])
    .then(([categorias,marcas]) => {
        res.render('productAdd',{
            title:"Agregar Productos",
            categorias: categorias,
            marcas: marcas
        })
    })
    },
    publicar: (req, res, next) =>{

        db.products.create({
            
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
        db.products.destroy ({
            where: {
                id: req.params.id
            }
            .then(result =>{

            })
        })

    }
}
