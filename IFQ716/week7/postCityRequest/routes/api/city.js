const express = require("express");
const router = express.Router();

// /api/city
router.get("/", function (req, res, next) {
  req.db
    .from("city")
    .select("name", "district")
    .then((rows) => {
      res.json({ Error: false, Message: "Success", City: rows });
    })
    .catch((err) => {
      console.log(err);
      res.json({ Error: true, Message: "Error in MySQL query" });
    });
});

// /api/city/:CountryCode
router.get("/:CountryCode", function (req, res, next) {
  req.db
    .from("city")
    .select("*")
    .where("CountryCode", "=", req.params.CountryCode)
    .then((rows) => {
      res.json({ Error: false, Message: "Success", City: rows });
    })
    .catch((err) => {
      console.log(err);
      res.json({ Error: true, Message: "Error in MySQL query" });
    });
});

module.exports = router;
