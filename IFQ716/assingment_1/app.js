require("dotenv").config();
const http = require("http");
const fs = require("fs");
const path = require("path");

const API_BASE = "http://54.79.30.138:5000/";
// const API_KEY = process.env.;

function routing(req, res) {
  const url = req.url;
  const method = req.method;
  const filePath = path.join(__dirname, "client.html");

  // landing page?
  if (url.startsWith("") && method === "GET") {
    fs.readFile(filePath, "binary", function (err, file) {
      if (err) {
        res.writeHead(500, {
          "Content-Type": "application/json",
        });
        res.write(JSON.stringify({ error: err }));
        res.end();
        return;
      }

      res.writeHead(200, {
        "Content-Type": "text/html",
        "Access-Control-Allow-Origin": "*",
      });
      // res.write("server is running")
      res.end(file);
    });
  }
  // Route to get movies API?
  else if (url.startsWith("/movies")) {
    // Error handling first?

    if (method === "GET") {
    } // upload movies poster request?
    else if (method === "POST") {
    }
  }
  // Route when there is no matching page
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.write("Not Found");
    res.end();
  }
}

http.createServer(routing).listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
