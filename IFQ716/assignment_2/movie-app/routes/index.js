var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Middleware to attach the database connection to the request object
router.use("/movies/search", require("./movies/search"));
router.use("/movies/data", require("./movies/data"));
router.use("/posters", require("./posters"));

module.exports = router;
