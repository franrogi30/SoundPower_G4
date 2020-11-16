const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const { check, validationResult, body } = require("express-validator");

const db = require("../database/models");
const Sequelize = require("sequelize");
let Op = Sequelize.Op;

module.exports = {

// registro de usuarios y administradores
  register: (req, res) => {
    res.render("register");
  },

  processRegister: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      db.users.create({
        nombre: req.body.fname,
        apellido: req.body.lname,
        email: req.body.email,
        contraseña: bcrypt.hashSync(req.body.pass, 10),
        avatar: req.files[0] ? req.files[0].filename : "default-image.png",
        rol: req.body.rol
      }).then( user => {
        res.redirect("/users/login")
      }).catch(error => {
        res.send(error)
      })
    }else{
      res.render("register", { 
        errors: errors.errors, 
        old: req.body})
    }      
  }
  ,
 // login  y logout
  Login: (req, res) => {
    res.render("login", {
      title: "Ingresá a tu cuenta",

    });
  },

  processLogin: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      db.users.findOne({
        where: {
          email: req.body.email,
        },
      }).then((user) => {
          req.session.user = {
            id: user.id,
            nick: user.nombre + " " + user.apellido,
            email: user.email,
            avatar:user.avatar,
            rol:user.rol
          };
          res.locals.user = req.session.user;
          res.render("index", {
            
            userSession: req.session.user,
            //user: user,
            avatar:user.avatar

          });
        }).catch((error) => res.send(error));
    } else {
      res.render("login", { errors: errors.errors });
    }
  },

  logout: function (req, res) {
    req.session.destroy(); //elimino la sesion

    return res.redirect("/");
  },

  //base de datos de perfiles
profiles:(req,res)=>{
db.users.findAll()
.then ((users) =>{
  res.render("users", {
    user:db.users,
    title:"usuarios".toUpperCase()
  }

    )
  })
},

adminProfiles: (req,res)=>{

},


//perfil de usuario
  profile: (req, res) => {
    
    db.users.findByPk(req.session.user.id)
      .then((user) => {
   console.log(user); 
        res.render("profile", {
          user: user,
          userSession: req.session.user,
          nick: user.nombre + " " + user.apellido,
          rol: req.body.rol,
          id:user.id
        });
      })
      .catch((error) => res.send(error));
  },

  processProfile: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      db.users.update({
        
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        contraseña: bcrypt.hashSync(req.body.pass, 10),
        
      })
        .then((result) => {
          return res.redirect("/users/profile/: <%= user.id %>",{
            userSession: req.session.user,
            nick: user.nombre + " " + user.apellido,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      res.render("profile", { errors: errors.errors });
    }
  },
};
