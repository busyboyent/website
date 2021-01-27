#! /usr/bin/env node

var userArgs = process.argv.slice(2);

var async = require('async')
var Booking = require('./models/booking')
var Contact = require('./models/contacts')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var bookings = []
var contacts = []

function contactsCreate(name, cont, picture, cb) {
  contactdetail = {name:name, cont:cont, picture:picture}
  
  var contact = new Contact(contactdetail);
       
  contact.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Contact: ' + contact);
    contacts.push(contact)
    cb(null, contact)
  }  );
}


function BookingCreate(aud, status, owner, time, cb) {
  bookingdetail = {aud: aud}
  if (status != false) bookingdetail.status = status
  if (owner != false) bookingdetail.owner = owner
  if (time != false) bookingdetail.time = time
    
  var booking = new Booking(bookingdetail);    
  booking.save(function (err) {
    if (err) {
      console.log('ERROR CREATING Booking: ' + booking);
      cb(err, null)
      return
    }
    console.log('New Booking: ' + booking);
    bookings.push(booking)
    cb(null, booking)
  }  );
}



function createContacts(cb) {
    async.parallel([
        function(callback) {
          contactsCreate('Солодушкин Святослав Игоревич', 'https://vk.com/solodushkin_si', 'solod', callback);
        },
        function(callback) {
          contactsCreate('Верников Борис Муневич', 'https://vk.com/id202172738', 'vernikov', callback);
        }
        ],
        cb);
}


function createBooking(cb) {
    async.parallel([
        function(callback) {
          BookingCreate('632', false, false, false, callback)
        },
        function(callback) {
          BookingCreate('514', false, false, false, callback)
        },
        function(callback) {
          BookingCreate('611', false, false, false, callback)
        },
        function(callback) {
          BookingCreate('628', false, false, false, callback)
        },
        function(callback) {
          BookingCreate('532', false, false, false, callback)
        },
        function(callback) {
          BookingCreate('605', false, false, false, callback)
        },
        function(callback) {
          BookingCreate('614', false, false, false, callback)
        },
        function(callback) {
          BookingCreate('615', false, false, false, callback)
        },
        function(callback) {
          BookingCreate('601', false, false, false, callback)
        },
        function(callback) {
          BookingCreate('628', false, false, false, callback)
        },
        function(callback) {
          BookingCreate('624', false, false, false, callback)
        }
        ],
        // Optional callback
        cb);
}



async.series([
    createContacts,
    createBooking
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('BOOKINGS: '+bookings);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});