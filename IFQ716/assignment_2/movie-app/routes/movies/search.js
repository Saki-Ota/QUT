var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  const { title, year, page } = req.query;
    if (!title) {
        return res.status(400).json({ Error: true, Message: "Missing title" });
    }
    if (year && isNaN(year) || year && !/^\d{4}$/.test(year)) {
        return res
          .status(400)
          .json({
            Error: true,
            Message: "Invalid year format. Format must be yyyy",
          });
    }

  let query = req.db
    .from("basics")
    .select("primaryTitle", "startYear", "tconst", "titleType")
    .where("primaryTitle", "like", `%${title}%`);

  if (year) {
    query = query.andWhere("startYear", year);
  }

  query
    .then((rows) => {
      res.json({
        Error: false,
        Message: "Success",
        Data: rows.map((row) => ({
          Title: row.primaryTitle,
          Year: row.startYear,
          ID: row.tconst,
          Type: row.titleType,
        })),
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({ Error: true, Message: "Error in MySQL query" });
    });
});

module.exports = router;
