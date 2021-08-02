var express = require('express');
var router = express.Router();

/* GET Thank you page. */
router.get('/', function (req, res, next) {
    res.render('thankyou', {
        title: 'Thank you',
        passedMsg: 'Thank you for registering ...'
    });
});

module.exports = router;