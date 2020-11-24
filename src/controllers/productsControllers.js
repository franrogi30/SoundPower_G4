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
  cart: (req, res) => {
    res.render("cart", {
      title: "Carrito",
    });
  },
  modify: (req, res) => {
    let id = req.params.id;
    db.products.findAll({
      where: {
        id: id,
      }.then((Categoria) => {
        res.render("modifyProduct", {
          title: "Modificar Productos",
          id: id,
          producto: producto,
          price: producto.price,

          description: producto.description,
          category: producto.category,
        });
      }),
    });
  },
  discount: (req, res) => {
    db.products.findAll().then((products) => {
      res.render("products", {
        title: "Oportunidades",
        products: products,
      });
    });
  },
  category: (req, res) => {
    let category = req.params.category;
    db.products
      .findAll({
        where: {
          categoria_id: category,
        },
      })
      .then((Categoria_id) => {
        res.render("products", {
          title: "Categoria " + category.toUpperCase(),
          producto: producto,
          price: producto.price,
          image: producto.image,
        });
      });
  },
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
  delete: (req, res) => {
    db.products.destroy({
      
        where: {
            id: req.body.id
        }
      })
      .then ((result) => {
          return res.render("products", {
            title:"productos".toUpperCase(),
            products:products
          })
        })
        }
      
};
