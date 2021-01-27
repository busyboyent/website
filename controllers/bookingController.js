var Booking = require('../models/booking');
const { body,validationResult } = require("express-validator");

exports.booking_list = function(req, res, next) {

  Booking.find()
    .sort([['aud']])
    .exec(function (err, list_bookings) {
      if (err) { return next(err); }
      res.render('booking_list', { title: 'Booking List', booking_list: list_bookings });
    });

};

exports.booking_detail = function(req, res, next) {

    Booking.findById(req.params.id)
    .exec(function (err, booking) {
      if (err) { return next(err); }
      if (booking==null) {
          var err = new Error('Booking not found');
          err.status = 404;
          return next(err);
        }
      res.render('booking_detail', { title: 'Бронирование аудитории № ' + booking.aud, booking:  booking});
    })
};

exports.booking_detail_post  = [

    body('aud', 'Неправильное подтверждение аудитории').trim().isLength({ min: 0, max : 633 }).escape(),
	  body('owner', 'Вы должны указать свое имя.').trim().isLength({ min: 3 }).escape(),
    body('time', 'Неправильно указано время бронирования.').trim().isLength({ min: 1, max : 2 }).matches(/\d/).escape(),
    
    (req, res, next) => {
    	const errors = validationResult(req);

    	var booking = new Booking(
    	{
          aud: req.body.aud,
          status: 'Reserved',
          owner: req.body.owner,
          time: req.body.time,
          _id:req.params.id
    	})


    	if (!errors.isEmpty()) {
            (

              Booking.findById(req.params.id)
              .exec(function (err, booking) {
                if (err) { return next(err); }
                  if (booking==null) {
                    var err = new Error('Booking not found');
                    err.status = 404;
                    return next(err);
                }
              res.render('booking_detail', { title: 'Бронирование: аудитории № ' + booking.aud, booking:  booking, errors: errors.array()});})   
            );
            return;
        }
        else {
        	Booking.findByIdAndUpdate(req.params.id, booking, {}, function (err,thebook) {
                if (err) { return next(err); }
                   res.redirect(/mainpage/);
                });
        }
    }

];

