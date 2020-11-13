
const {check, validationResult,body} = require('express-validator');
const db = require('../database/models');
const bcrypt = require("bcrypt");

module.exports= [
    check('email').isEmail().withMessage('email invalido'),
    check('pass').isLength({min:1}).withMessage('contraseña invalida'),
    body('pass')
    .custom((value,{req})=>{
       
        return db.users.findOne({
            where:{
                email:req.body.email
            }
        })
        .then(user => {
            if(!bcrypt.compareSync(value, user.dataValues.password)){ //si no machea la contraseña
                return Promise.reject('Contraseña invalida')
            }
        })
        .catch((err) => {
            console.log(err)
            return Promise.reject('Credenciales inválidas')
        })
    })
]