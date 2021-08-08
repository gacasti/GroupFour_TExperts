var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const { Booking } = require("../models/bookingModel");
const { Package } = require("../models/packageModel");
const { User } = require("../models/userModel");



/* GET all list of all packages */
router.get("/add/:_id", function (req, res, next) {
  const pkgid = req.params._id;

  Package.findOne({_id: pkgid  }, (err, pkg) => {
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