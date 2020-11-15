
let db = require('../database/models')

const {check,validationResult,body} = require('express-validator');

module.exports = [
    check('fname')
    .isLength({
        min:1
    })
    .withMessage("Debes ingresar tu nombre"),

    check('lname')
    .isLength({
        min:1
    })
    .withMessage("Debes ingresar tu apellido"),

    body('email')
    .custom(function(value){
        return db.users.findOne({
            where:{
                email:value
            }
            })
            .then(user => {
                if(user){
                    return Promise.reject('Este mail ya está registrado')
                }
            })
    }),

    check('email')
    .isEmail()
    .withMessage("Debes ingresar un email válido"),

    check('pass')
    .isLength({
        min:6,
        max:12
    })
    .withMessage("Debes ingresar una contraseña entre 6 y 12 caracteres"),

    body('cpass')
    .custom((value,{req})=>{
        if(value !== req.body.pass){
            return false
        }
        return true
    })
    .withMessage("Las contraseñas no coinciden"),

    check('bases')
    .isString("on")
    .withMessage("Debe aceptar las bases y condiciones"),

    body('avatar')
    .custom((value,{req})=>{
        if(req.fileValidationError){
            return false
        }else{
            return true
        }
    }).withMessage("Solo se permite png, jpg, jpeg, gif")

]
