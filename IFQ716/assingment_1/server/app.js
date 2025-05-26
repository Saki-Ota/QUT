require("dotenv").config();
const http = require("http");
const fs = require("fs");
const path = require("path");

const REVIEWAPI_KEY = process.env.REVIEWAPI_KEY;
const REVIEWAPI_BASE = `http://www.omdbapi.com/?apikey=${REVIEWAPI_KEY}&`;
const STREAMINGAPI_BASE = "streaming-availability.p.rapidapi.com";
const STREAMINGAPI_KEY = process.env.STREAMINGAPI_KEY;

async function getMovieReviewsByTitle(req, res) {
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

async function getMovieReviewsById(imdbId) {
  const apiUrl = `${REVIEWAPI_BASE}i=${imdbId}`;
  const reviewResponse = await fetch(apiUrl);
  const reviewData = await reviewResponse.json();
  return reviewData;
}
async function getStreamingData(imdbId) {
  const apiUrl = `https://${STREAMINGAPI_BASE}/shows/${imdbId}?series_granularity=episode&output_language=en&country=au`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": STREAMINGAPI_KEY,
      "x-rapidapi-host": STREAMINGAPI_BASE,
    },
  };

  const streamingResponse = await fetch(apiUrl, options);
  const streamingData = await streamingResponse.text();
  return streamingData;
}

async function getMoviesData(req, res) {
  const url = req.url;
  const imdbId =
    new URLSearchParams(url.split("?")[1]).get("imdbId") || "tt3521164"; // provide a default IMDb ID for testing

  if (!imdbId) {
    res.writeHead(400, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    res.end(
      JSON.stringify({
        error: true,
        message: "You must supply a imdbID!",
      })
    );
    return;
  }

  try{
    const movieReview = await getMovieReviewsById(imdbId);
    const movieStreaming = await getStreamingData(imdbId);

    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    res.end(
      JSON.stringify({ details: movieReview, streamingInfo: movieStreaming })
    );
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
};

function routing(req, res) {
  if (req.url.startsWith("/movies/search") && req.method === "GET") {
    getMovieReviewsByTitle(req, res);
  } else if (req.url.startsWith("/movies/data") && req.method === "GET") {
    getMoviesData(req, res);
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
