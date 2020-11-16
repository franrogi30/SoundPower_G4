
let db = require('../database/models')

const {check,validationResult,body} = require('express-validator');

module.exports = [




    body('avatar')
    .custom((value,{req})=>{
        if(req.fileValidationError){
            return false
        }else{
            return true
        }
    }).withMessage("Solo se permite png, jpg, jpeg, gif")

]
