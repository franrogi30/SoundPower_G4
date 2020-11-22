
const {check, validationResult,body} = require('express-validator');
const db = require('../database/models');
const bcrypt = require("bcrypt");

module.exports= [
    check('email')
    .isEmail()
    .withMessage('Debes ingresar un email válido'),

    check('pass')
    .isLength({
        min:1
    })
    .withMessage('Escribe tu contraseña'),

    body('pass')
    .custom((value,{req})=>{
        return db.users.findOne({
            where:{
                email:req.body.email
            }
        })
        .then(user => {
            if(!bcrypt.compareSync(value,user.dataValues.contraseña)){ //si no machea la contraseña
                return Promise.reject('No coincide la contraseña')
            }
        })
        .catch(() => {
            return Promise.reject('Credenciales Inválidas')
        })
    })
]