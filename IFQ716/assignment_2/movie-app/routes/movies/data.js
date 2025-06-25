const express = require("express");
const router = express.Router();

router.get("/", async function (req, res, next) {
  const { imdbId } = req.query;

  if (!imdbId) {
    return res.status(400).json({ Error: true, Message: "Missing imdbId" });
  }

  try {
    const actors = await req
      .db("principals as p")
      .join("names as n", "p.nconst", "n.nconst")
      .select("n.primaryName")
      .where("p.tconst", imdbId)
      .andWhere("p.category", "actor");

    const directors = await req
      .db("principals as p")
      .join("names as n", "p.nconst", "n.nconst")
      .select("n.primaryName")
      .where("p.tconst", imdbId)
      .andWhere("p.category", "director");

    const writers = await req
      .db("principals as p")
      .join("names as n", "p.nconst", "n.nconst")
      .select("n.primaryName")
      .where("p.tconst", imdbId)
      .andWhere("p.category", "writer");

    res.json({
      Error: false,
      Message: "Success",
      Data: {
        actors: actors.map((row) => row.primaryName),
        directors: directors.map((row) => row.primaryName),
        writers: writers.map((row) => row.primaryName),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: true, Message: "Error in MySQL query" });
  }
});

module.exports = router;
