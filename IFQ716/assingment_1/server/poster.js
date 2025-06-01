// check if imdb ID exists in the images folder, if not return 500 error response
// if the path exists, read the file and return it as a response
// reference
// fs.existSync(): https://nodejs.org/en/learn/manipulating-files/working-with-folders-in-nodejs
// fs.writeFile(): https://nodejs.org/en/learn/manipulating-files/writing-files-in-nodejs, https://www.geeksforgeeks.org/node-js-fs-writefile-method/
// JS blob : https://developer.mozilla.org/ja/docs/Web/API/Blob
// multipart/form-data : https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST#multipart_form_data

const fs = require("fs");
const path = require("path");

const folderPath = "./posters";

async function handleGetPosterImage(req, res) {
  const url = req.url;
  const imdbId =
    new URLSearchParams(url.split("?")[1]).get("imdbId") || "tt3521164"; // provide a default  imdbID for testing
  const filePath = path.join(folderPath, `${imdbId}.jpg`);
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
    // Check if the file exists ??
    if (fs.existsSync(filePath)) {
      res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      });
      res.end(JSON.stringify(filePath));
      //   console.log(`File exists: ${filePath}`);
      //   return filePath; // Return the path if the file exists
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
}

async function uploadPosterImage(req, res) {
  const url = req.url;
  const imdbId =
    new URLSearchParams(url.split("?")[1]).get("imdbId") || "tt3521164"; // provide a default  imdbID for testing
  const folderPath = "./posters"; // Ensure this folder exists
  const filePath = path.join(folderPath, `${imdbId}.jpg`);

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
    // Write the file to the specified path
    const writeStream = fs.createWriteStream(filePath);
    req.pipe(writeStream);

    writeStream.on("finish", () => {
      res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      });
      res.end(JSON.stringify({ message: "Poster uploaded successfully!" }));
    });
  } catch (error) {
    res.writeHead(500, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    res.end(
      JSON.stringify({
        error: true,
        message: "An error occurred while uploading the poster.",
      })
    );
  }
}
