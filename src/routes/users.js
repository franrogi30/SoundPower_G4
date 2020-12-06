var express = require('express');
var router = express.Router();
var controller = require('../controllers/usersController.js');
const loginValidator = require('../validator/loginValidator');
const registerValidator = require('../validator/registerValidator');
const profileValidator =require('../validator/profileValidator')

const upAvatar = require('../middlewares/upAvatar')


/* register page */
router.get('/register', controller.register);
router.post('/register',upAvatar.any(),registerValidator,controller.processRegister);
//router.post('/register',controller.save)

// login page
router.get('/login', controller.Login)
router.post('/login',loginValidator,controller.processLogin)

//profile page
router.get('/profile/:id',controller.profile)
router.put('/profile/:id',upAvatar.any() ,profileValidator,controller.processProfile)


// logout
router.post('/logout', controller.logout)
router.get('/logout', controller.logout)
//admin users
router.get('/admin/', controller.profiles)
router.put('/admin/:id', controller.adminProfiles)
// delete user
router.delete('/delete/:id',controller.delete)
module.exports = router;