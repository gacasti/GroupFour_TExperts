var express = require('express');
var moment = require('moment');
const mongoose = require('mongoose');
var router = express.Router();
const { Booking } = require("../models/bookingModel");
const { Bookingdetail } = require("../models/bookingdetailModel");
const { Package } = require("../models/packageModel");
const { User } = require("../models/userModel");

/* GET all list of all packages */
router.get("/add/:_id", function (req, res, next) {
  const pkgid = req.params._id;

  Package.findOne({ _id: pkgid }, (err, pkg) => {
    if (err) console.log(err);
    // provide the form to fill a booking info
    // console.log(`This is the the package name: ==> ${pkg.PkgName}`);
    console.log(pkg)
    res.render("bookingadd", { pkg });
  });
});

// We could use the following to create packages.
router.post("/add", function (req, res, next) {
  const bookingData = req.body;
  const booking = new Booking(bookingData);
  const userId = user.userid;

  booking.CustomerId = userId;
  booking.PackageId = PackageId;

  booking.save(function (err) {
    if (err) return processErrors(err, "booking", req, res);
    res.redirect("/");
  });
});


// Create a booking
router.post("/book", function (req, res, next) {
  const booking = new Booking();
  const bookingDetail = new Bookingdetail();
  // ****** Assign values for booking object ******
  const b_Id = Math.floor(Math.random() * 1000000);

  const currUser = req.body.CustomerId;
  //  Create a BookingId and ._id for booking record
  booking.BookingId = 1000 + b_Id;
  booking._id = 1000 + b_Id;

  // CustomerId
  booking.CustomerId = currUser;

  // PackageId
  booking.PackageId = req.body.PackageId;

  // Number of travelers
  booking.TravelerCount = req.body.TravelerCount;

  // Add booking date of today
  booking.BookingDate = moment(new Date().toJSON().slice(0, 10));

  // Assign values for bookings details object ...

  booking.save(function (err) {
    if (err) return processErrors(err, "bookingadd", req, res, req.body);
    res.redirect("/booking/bookings/" + currUser);

  });

  // bookingDetail.save(function (err) {
  //   if (err) return processErrors(err, "bookingadd", req, res, req.body);
  //   res.redirect("/booking/bookings/" + currUser);
  // });
});

/****  Get booking for a specific Customer ***** */
/* GET the product details page, for the given product Id. */
router.get("/bookings/:userid", function (req, res, next) {
  const userid = req.params.userid;
  console.log(`******* This is the user id from Bookings: ${userid} *********`);
  Booking.find({ CustomerId: userid }, (err, userGBokings) => {
    if (err) console.log(err);
    console.log(userGBokings);
    res.render("bookings", { bookings: userGBokings });
  });
});

/* GET the purchases page. */
router.get("/purchases/", function (req, res, next) {
  Purchase.find({ userId: 3 })
    // Replace the productId with the corresponding product object from the products collection(table)
    .populate("productId")
    .exec((err, purchases) => {
      if (err) console.log(err);
      res.render("purchases", { purchases });
    });
});

/* Process the product return, sent as GET request, for the given product Id. */
router.get("/cancel/:bookingid", function (req, res, next) {
  const bookingId = req.params.bookingid;
  // const custId = 0;
  // Booking.findOne({ _id: bookingId }, (err, oneBooking) => {
  //   if (err) console.log(err);
  //   console.log(`******* This is the returned booking to DELETE ${oneBooking} ******`)
  //   custId = oneBooking.CustomerId;
  // });
  Booking.findOneAndDelete({ _id: bookingId }, (err) => {
    if (err) console.log(err);
    res.redirect("/"); // Redirect to the purchases page
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