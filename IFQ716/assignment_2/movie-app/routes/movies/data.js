const express = require("express");
const router = express.Router();

router.get("/", async function (req, res, next) {
  const { imdbId } = req.query;

  if (!imdbId) {
    return res.status(400).json({ Error: true, Message: "Missing imdbId" });
  }

  try {
    const movie = await req
      .db("basics")
      .select("primaryTitle", "startYear", "runtimeMinutes", "genres")
      .where("tconst", imdbId);

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

    const ratings = await req
      .db("ratings")
      .select("averageRating")
      .where("tconst", imdbId);

    res.json({
      Error: false,
      Message: "Success",
      Data: {
        Title: movie[0]?.primaryTitle || "N/A",
        Year: movie[0]?.startYear || "N/A",
        Runtime: movie[0]?.runtimeMinutes || "N/A",
        Genres: movie[0]?.genres || "N/A",
        Actors: actors.map((row) => row.primaryName),
        Director: directors.map((row) => row.primaryName),
        Writer: writers.map((row) => row.primaryName),
        Ratings: ratings.map((row) => ({
          Source: "Internet Movie Database",
          Value: row.averageRating || "N/A",
        })),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: true, Message: "Error in MySQL query" });
  }
});

module.exports = router;
