const express = require("express");
const router = express.Router();
const authorization = require("../../middleware/authorization");

// /api/update
router.post("/", authorization, function (req, res, next) {
  const { City, CountryCode, Pop } = req.body;

  if (!City || !CountryCode || !Pop) {
    return res
      .status(400)
      .json({ Error: true, Message: "Missing required fields" });
  }

  req
    .db("city")
    .where({ Name: City, CountryCode: CountryCode })
    .update({ Population: Pop })
    .then((count) => {
      if (count > 0) {
        res.json({
          Error: false,
          Message: "Population updated successfully",
          UpdatedRows: count,
        });
      } else {
        res.status(404).json({ Error: true, Message: "City not found" });
      }
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ Error: true, Message: "Error updating population" });
    });
});

module.exports = router;
