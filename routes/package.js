var express = require('express');
var router = express.Router();
const { Bookingdetail } = require("../models/bookingdetailModel");

/* GET all list of all booking details */
router.get("/", function (req, res, next) {
  // Read the packages table from db
  Bookingdetail.find()
    //.populate("packages")
    .exec(function (err, packages) {
      if (err) throw err;
      res.render("bookingdetail", { listOfBookingdetail: bookingdetail });
    });
});

// We could use the following to create packages.
router.post("/add", function (req, res, next) {
  const data = req.body;
  const package = new Package(data);
  package.save(function (err) {
    if (err) return processErrors(err, "addbookingdetail", req, res);
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