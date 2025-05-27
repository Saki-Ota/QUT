// check if imdb ID exists in the images folder, if not return 500 error response 
// if the path exists, read the file and return it as a response
// reference : https://nodejs.org/en/learn/manipulating-files/working-with-folders-in-nodejs

const fs = require("fs");
const path = require("path");


const folderPath = './images'; 
const testImdbId = 'tt3521164'// Path to the folder containing images

async function checkImageExists(imdbId) {
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
  };

  try{
    // Check if the file exists ?? 
    if (fs.existsSync(filePath)) {
      return filePath; // Return the path if the file exists
    } 
  } catch(e) {
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
  



