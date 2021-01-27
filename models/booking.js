const { DateTime } = require("luxon");

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookingSchema = new Schema(
  {
  	aud :{type: String, required: true},
    status: {type: String, required: true, enum: ['Available','Reserved'], default: 'Available'},
    owner :{type: String, required: true, default: 'undefined'},
    time :{type: String, required: true, default: 'undefined'}
  }
);

BookingSchema
.virtual('url')
.get(function () {
  return '/mainpage/booking/' + this._id;
});

BookingSchema
.virtual('reservation_url')
.get(function () {
  return '/mainpage/booking/' + this._id;
});

module.exports = mongoose.model('Booking', BookingSchema);