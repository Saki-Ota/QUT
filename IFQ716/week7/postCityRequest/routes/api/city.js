const { parse } = require("dotenv");
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
  const limit = parseInt(req.query.limit, 10) || 10; // Default limit to 10 if not provided
  const sortBy = req.query.sortBy || "Name"; // Default sort by Name if not provided
  const sortOrder = req.query.sortOrder || "asc"; // Default sort order to ascending if not provided
  req.db
    .from("city")
    .select("*")
    .where("CountryCode", "=", req.params.CountryCode)
    .limit(limit) // Apply the limit to the query
    .sortBy(sortBy, sortOrder) // Apply sorting based on query parameters
    .then((rows) => {
      res.json({ Error: false, Message: "Success", City: rows });
    })
    .catch((err) => {
      console.log(err);
      res.json({ Error: true, Message: "Error in MySQL query" });
    });
});

module.exports = router;
