require("dotenv").config();
const http = require("http");
const fs = require("fs");
const path = require("path");

const REVIEWAPI_KEY = process.env.REVIEWAPI_KEY;
const REVIEWAPI_BASE = `http://www.omdbapi.com/?apikey=${REVIEWAPI_KEY}&`;

async function getMovieReviews(req, res) {
  const url = req.url;
  const movieTitle =
    new URLSearchParams(url.split("?")[1]).get("title") || "Moana"; // provide a default movie title for testing
  if (!movieTitle) {
    res.writeHead(400, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    res.end(
      JSON.stringify({
        error: true,
        message: "You must supply a title!",
      })
    );
    return;
  }

  try {
    const reviewResponse = await fetch(`${REVIEWAPI_BASE}s=${movieTitle}`);
    const reviewData = await reviewResponse.json();

    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    res.end(JSON.stringify(reviewData));
  } catch (e) {
    res.writeHead(500, {
      "Content-Type": "application/json",
    });
    res.end(
      JSON.stringify({
        error: true,
        message: "The remote detail server returned an invalid response",
      })
    );
  }
}

function routing(req, res) {
  // const url = req.url;
  // const method = req.method;

  // // landing page?
  // if (url.startsWith("") && method === "GET") {
  //   fs.readFile(filePath, "binary", function (err, file) {
  //     if (err) {
  //       res.writeHead(500, {
  //         "Content-Type": "application/json",
  //       });
  //       res.write(JSON.stringify({ error: err }));
  //       res.end();
  //       return;
  //     }

  //     res.writeHead(200, {
  //       "Content-Type": "text/html",
  //       "Access-Control-Allow-Origin": "*",
  //     });
  //     res.write("server is running")
  //     res.end(file);
  //   });
  // }
  // Route to get movies and posters APIs
  // else if (url.startsWith("/movies/search") && method === "GET") {}
  // else if (url.startsWith("movies/data/") && method === "GET") {}
  // else if (url.startsWith("posters") && method === "GET"){}
  // else if (url.startsWith("posters/add") && method === "POST"){}
  // Route when there is no matching page
  // else {
  //   res.writeHead(404, { "Content-Type": "application/json" });
  //   res.write("Not Found");
  //   res.end();
  // }
  // res.write("Running on 3000");
  // res.end();
  if (req.url.startsWith("/movies/search") && req.method === "GET") {
    getMovieReviews(req, res);
  } else {
    res.writeHead(404, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ error: true, message: "Not Found" }));
  }
}

http.createServer(routing).listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
