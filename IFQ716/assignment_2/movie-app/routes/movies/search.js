var express = require("express");
var router = express.Router();

router.get("/", async function (req, res, next) {
  const { title, year, page } = req.query;
  const currentPage = page ? parseInt(page) : 1;
  const perPage = 10; // Number of results per page
  const offset = (currentPage - 1) * perPage;

  if (!title) {
    return res.status(400).json({ Error: true, Message: "Missing title" });
  }

  if ((year && isNaN(year)) || (year && !/^\d{4}$/.test(year))) {
    return res.status(400).json({
      Error: true,
      Message: "Invalid year format. Format must be yyyy",
    });
  }

  if (page && (isNaN(page) || page < 1)) {
    return res.status(400).json({
      Error: true,
      Message: "Invalid page number. It must be a positive integer.",
    });
  }
  try {
    let dataQuery = req.db
      .from("basics")
      .select("primaryTitle", "startYear", "tconst", "titleType")
      .where("primaryTitle", "like", `%${title}%`)
      .limit(perPage)
      .offset(offset);
    if (year) {
      dataQuery = dataQuery.andWhere("startYear", year);
    }

    let totalQuery = req.db
      .from("basics")
      .count("tconst as total")
      .where("primaryTitle", "like", `%${title}%`);
    if (year) {
      totalQuery = totalQuery.andWhere("startYear", year);
    }

    const [rows, countResult] = await Promise.all([dataQuery, totalQuery]);
    const total = countResult[0].total;

    res.json({
      Data: rows.map((row) => ({
        Title: row.primaryTitle,
        Year: row.startYear,
        ID: row.tconst,
        Type: row.titleType,
      })),
      pagination: {
        total: total,
        lastpage: Math.ceil(total / perPage),
        perPage: perPage,
        currentPage: currentPage,
        from: offset + 1,
        to: offset + rows.length,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: true, Message: "Error in MySQL query" });
  }
});

module.exports = router;
