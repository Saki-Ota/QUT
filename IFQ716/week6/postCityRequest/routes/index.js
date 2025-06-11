const express = require("express");
const router = express.Router();


router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// Middleware to attach the database connection to the request object
router.use("/api/city", require("./api/city"));
router.use("/api/update", require("./api/update"));
router.use("/api/city/:CountryCode", require("./api/city"));

module.exports = router;
