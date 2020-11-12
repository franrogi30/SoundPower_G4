var express = require('express');
var router = express.Router();
var controller = require('../controllers/usersController.js');
const loginValidator = require('../validator/loginValidator');
const registerValidator = require('../validator/registerValidator');

const upAvatar = require('../middlewares/upAvatar')


/* register page */
router.get('/register', controller.register);
router.post('/register',upAvatar.any(),registerValidator,controller.processRegister);
//router.post('/register',controller.save)

// login page
router.get('/login', controller.Login)
router.post('/login',controller.processLogin)

//profile page
router.get('/profile',controller.profile)
router.post('/profile',upAvatar.any(),registerValidator,controller.processProfile)


// logout
router.get('/logout', controller.logout)
router.post('/logout', controller.logout)

module.exports = router;