var express = require('express');
var router = express.Router();
let controller = require ('../controllers/indexController');

/* GET homepage. */
router.get('/', controller.index);

router.get('/faqs',controller.faqs);

router.get('/contact',controller.contact);
router.get('/aboutUs',controller.aboutUs);



module.exports = router;