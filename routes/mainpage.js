var express = require('express');
var router = express.Router();

var contacts_controller = require('../controllers/contactsController');
var booking_controller = require('../controllers/bookingController');


router.get('/', contacts_controller.index);
//router.get('/mainpage/', contacts_controller.index);

router.get('/contacts', contacts_controller.contact_list);

router.get('/booking/:id', booking_controller.booking_detail);

router.post('/booking/:id', booking_controller.booking_detail_post);

router.get('/booking', booking_controller.booking_list);

module.exports = router;

