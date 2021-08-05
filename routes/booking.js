var express = require('express');
var router = express.Router();
const { Booking } = require("../models/bookingModel");


/* GET all list of all packages */
router.get("/", function (req, res, next) {
  // Read the packages table from db
  Booking.find()
    //.populate("packages")
    .exec(function (err, booking) {
      if (err) throw err;
      res.render("booking", { listOfBooking: booking });
    });
});

// We could use the following to create packages.
router.post("/add", function (req, res, next) {
  const data = req.body;
  const booking = new Booking(data);
  booking.save(function (err) {
    if (err) return processErrors(err, "booking", req, res);
    res.redirect("/");
  });
});




function processErrors(errs, pageTemplate, req, res) {
  // If there are errors from the Model schema
  const errorArray = [];
  const errorKeys = Object.keys(errs.errors);
  errorKeys.forEach((key) => errorArray.push(errs.errors[key].message));
  return res.render(pageTemplate, {
    errors: errorArray,
    ...req.body,
  });
}

module.exports = router;