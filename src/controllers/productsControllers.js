const dbProducts = require("../data/database"); //requiero la base de datos de productos
const fs = require("fs");
const path = require("path");
const { check, validationResult, body } = require("express-validator");
const sequelize = require("sequelize");
const db = require("../database/models");
const { Result } = require("express-validator");
const Product = require("../database/models/Product");
const { and } = require("sequelize");

module.exports = {
  products: (req, res) => {
    db.products
      .findAll({
        includes: [{ association: "marca", association: "categoria" }],
      })
      .then((products) => {
        res.render("products", {
          title: "Productos",
          products: products,
        });
      });
  },
  productsDetails: (req, res) => {
    db.products.findByPk(req.params.id)
    .then((product) => {
      res.render("productDetails", {
        title: "Detalle del Producto",
        product: product,
      });
    });
  },


  //agregar producto
  productsAdd: (req, res) => {
    let categorias = db.categories.findAll({
      order: [["id", "ASC"]],
    });
    let marcas = db.Marcas.findAll({
      order: [["id", "ASC"]],
    });

        

    

    Promise.all([categorias, marcas]).then(([categorias, marcas]) => {
      res.render("productAdd", {
        title: "Agregar Productos",
        categorias: categorias,
        marcas: marcas,
   
      });
    });
  },
  publicar: (req, res, next) => {
    db.products
      .create({
        nombre: req.body.titulo,
        descripcion: req.body.descripcion,
        descuento: req.body.discount,
   
        precio: req.body.precio,
        marca_id: req.body.mark,
        categoria_id: req.body.class,
        imagen: req.files[0] ? req.files[0].filename : "default-image.png",
      })
      .then((Result) => {
        return res.redirect("/products");
      });
    res.render("products", {
      title: "Productos",
      products: db.products,
    });
  },

  //carrito
  cart: (req, res) => {
    res.render("cart", {
      title: "Carrito",
    });
  },

  //modificar productos
  modify: (req, res) => {
    let id = req.params.id;
    db.products.findByPk(id, 
      {includes: [{ association: "marca", association: "categoria" }]})
      .then((producto) => {
        res.render("modifyProduct", {
          title: "Modificar Productos",
          producto: producto,
          
       
          
        });
      })
    },

  save: (req,res) =>{

    db.products
    .update({
      nombre: req.body.titulo,
      descripcion: req.body.descripcion,
      descuento: req.body.discount,
      precio: req.body.precio,
      marca_id: req.body.mark,
      categoria_id: req.body.class,
   
    },{
      where:{
          
      id:req.params.id
    }
  })
    .then((Result) => {
      return res.redirect("/products/modify/"+req.params.id);
    });
  res.render("products", {
    title: "Productos",
    products: db.products,
  });
  },

  //descuentos
  discount: (req, res) => {
    db.products.findAll({
      where: db.products.discount > 10 
    })
    .then((products) => {
      res.render("products", {
        title: "Oportunidades",
        products: products,
      });
    });
  },

  //categorias
  category: (req, res) => {
    let category = req.params.category;
    db.categories
      .findAll({
        where:{ 
          nombre:category,
        }
      })
      .then((products) => {
        res.render("products", {
          title: "Categoria " + category.toUpperCase(),
          products: products,
         
        });
      });
  },

  //busqueda
  search: function (req, res) {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      let buscar = req.query.search;
     
      db.products.findAll({
        where: db.products.nombre == buscar
       
        
      }).then ((products)=>{
     
      res.render("products", {
        title: "Resultado para " + buscar,
        products: products,
      })})
    } else {
      return res.redirect("/");
    }
  },

  //borrar producto
  delete: (req, res) => {
    db.products.destroy({
      
        where: {
            id: req.params.id
        }
      })
      .then ((result) => {
          return res.redirect("/products")
        })
        }
      
};
