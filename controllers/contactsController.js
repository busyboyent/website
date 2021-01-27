/*var Contact = require('../models/contacts');
var Booking = require('../models/booking');

var async = require('async');

exports.contacts_list = function(req, res, next) {

  Contact.find()
    .exec(function (err, list_contacts) {
      if (err) { return next(err); }
      res.render('contacts_list', { title: 'Contact List', contacts_list: list_contacts });
    });

};


exports.contacts_detail = function(req, res, next) {

    function(err, results) {
      if (err) { return next(err); }
      if (result.contacts==null) {
          var err = new Error('contacts not found');
          err.status = 404;
          return next(err);
        }
      res.render('contacts_detail', { title: 'contacts ' + contacts.name, contacts:  contacts});
    }
};*/

var Contact = require('../models/contacts');
var Booking = require('../models/booking');

var async = require('async');

exports.index = function(req, res) {

    async.parallel({
        contacts_count: function(callback) {
            Contact.countDocuments({}, callback);
        },
        booking_available_count: function(callback) {
            Booking.countDocuments({status:'Available'}, callback);
        }
    }, function(err, results) {
        res.render('index', { title: 'Math Mech', error: err, data: results });
    });
};

exports.contact_list = function(req, res, next) {

  Contact.find()
    .exec(function (err, list_contact) {
      if (err) { return next(err); }
      res.render('contact_list', { title: 'Contact List', contact_list: list_contact });
    });

};
