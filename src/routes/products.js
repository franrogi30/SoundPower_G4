var express = require('express');
var router = express.Router();
var Controller = require('../controllers/productsControllers')
const imagenProducts = require('../middlewares/imagenProducts');
const upProducts = require('../middlewares/upProducts');
/* GET products page. */
router.get('/', Controller.products);
/* GET product Detail page*/
router.get('/details/:id', Controller.productsDetails);
/* GET product add products page*/
router.get('/add', Controller.productsAdd);
/* POST  add products */
router.post('/add',upProducts.any(),Controller.publicar)

/* GET/POST Cart page */
router.get('/cart', Controller.cart)

//Modify Products 

router.get('/modify/:id',Controller.modify)
router.post('/modify/:id', Controller.save)

// GET de categories
router.get('/categories/:category/',Controller.category)

//Delete products
router.delete('/delete/:id', Controller.delete)

router.get('/discount',Controller.discount)
router.get('/search',Controller.search)

module.exports = router;