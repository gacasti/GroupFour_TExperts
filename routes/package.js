var express = require('express');
var router = express.Router();
const { Package } = require("../models/packageModel");

/* GET package page. */
// router.get('/', function (req, res, next) {
//   // res.render('index', { title: 'Travel Experts', tcGreetings: rg.greet() });
//   res.render('package');
// });

/* GET all list of all packages */
router.get("/", function (req, res, next) {
  // const message = req.query.msg;
  // const message = req.session.msg; // Read the message from the session variable
  // req.session.msg = null; // Delete the message, as we no longer need it
  Package.find()
    //.populate("user") //This populates the user id with actual user information!
    .exec(function (err, packages) {
      if (err) throw err;
      res.render("package", { listOfPackages: packages });
    });
});

/* GET the add form. */
router.get("/add", function (req, res, next) {
  res.render("addpackage");
});
// Process the added product data
router.post("/add", function (req, res, next) {
  const data = req.body;
  const package = new Package(data);
  package.save(function (err) {
    if (err) return processErrors(err, "addpackage", req, res);
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