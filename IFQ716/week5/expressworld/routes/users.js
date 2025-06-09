var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/about", function (req, res) {
  res.send("about useres");
});

router.post("/register", function (req, res, next) {
  res.send("hello user");
});

router.get('/course/:courseId/unit/:unitId', function (req, res){
  res.send('You are studing ' + req.params.courseId + 'unit ' + req.params.unitId);
});
module.exports = router;
