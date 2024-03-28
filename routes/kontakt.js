var express = require('express');
var router = express.Router();
const bodyparser = require('body-parser');
const jsonParser = bodyparser.json()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('kontakt');
});

//POST contact form
router.post('/', jsonParser, function(req, res, next ) {
    //validate name, email and tekst.
    res.end()
});

module.exports = router;