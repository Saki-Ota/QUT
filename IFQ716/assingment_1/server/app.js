require("dotenv").config();
const http = require("http");
const fs = require("fs");
const path = require("path");

const REVIEWAPI_KEY = process.env.REVIEWAPI_KEY;
const REVIEWAPI_BASE = `http://www.omdbapi.com/?apikey=${REVIEWAPI_KEY}&`;
const STREAMINGAPI_BASE = "streaming-availability.p.rapidapi.com";
const STREAMINGAPI_KEY = process.env.STREAMINGAPI_KEY;
const folderPath = "./posters";

// Fetch Movie Reviews API by title
async function handleGetMovieReviewsByTitle(req, res) {
  const url = req.url;
  const movieTitle =
    new URLSearchParams(url.split("?")[1]).get("title") || "Moana"; // provide a default movie title for testing
  // Check if the movie title is provided, if not return 400 error response
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

    // If successful, return the review data
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    res.end(JSON.stringify(reviewData));
  } catch (e) {
    // If an error occurs, return a 500 error response
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

// Fetch Movie Reviews API by IMDb ID
async function getMovieReviewsById(imdbId) {
  const apiUrl = `${REVIEWAPI_BASE}i=${imdbId}`;
  const reviewResponse = await fetch(apiUrl);
  const reviewData = await reviewResponse.json();
  return reviewData;
}

// Fetch Streaming Availability API by IMDb ID
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

// Get movies reviews and streaming data by IMDb ID, combining both data sources
async function handleGetMoviesData(req, res) {
  const url = req.url;
  const imdbId =
    new URLSearchParams(url.split("?")[1]).get("imdbId");

  // Check if the IMDb ID is provided, if not return 400 error response
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

  try {
    const movieReview = await getMovieReviewsById(imdbId);
    const movieStreaming = await getStreamingData(imdbId);

    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    // Combine the movie review and streaming data into a single response
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
}

// handle /Posters/ API requests
// GET poster request by IMDb ID
async function handleGetPosterImage(req, res) {
  const url = req.url;
  const imdbId =
    new URLSearchParams(url.split("?")[1]).get("imdbId");
  const filePath = path.join(folderPath, `${imdbId}.jpg`);
  // console.log(filePath);
  if (!imdbId) {
    res.writeHead(400, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    res.end(
      JSON.stringify({
        error: true,
        message: "You must supply an imdbID !",
      })
    );
    return;
  }

  try {
    if (fs.existsSync(filePath)) {
      res.writeHead(200, {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      });
      // create a read stream to send the image file
      fs.createReadStream(filePath).pipe(res);
    } else { // If the file does not exist, return a 404 error response
      res.writeHead(404, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      });
      res.end(
        JSON.stringify({
          error: true,
          message: "Poster image not found",
        })
      );
    }
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

// Upload poster image by IMDb ID


function routing(req, res) {
  if (req.url.startsWith("/movies/search") && req.method === "GET") {
    handleGetMovieReviewsByTitle(req, res);
  } else if (req.url.startsWith("/movies/data") && req.method === "GET") {
    handleGetMoviesData(req, res);
  } else if (req.url.startsWith("/posters/") && req.method === "GET") {
    handleGetPosterImage(req, res);
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
