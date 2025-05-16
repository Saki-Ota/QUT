var http = require("http");
var fs = require("fs");

const data = [
  "Siamese",
  "Persian",
  "Maine Coon",
  "Bengal",
  "Scottish Fold",
  "British Shorthair",
  "Sphynx",
  "Abyssinian",
  "American Shorthair",
  "Russian Blue",
  "Ragdoll",
  "Devon Rex",
  "Birman",
  "Siberian",
  "Manx",
  "Exotic Shorthair",
  "Burmese",
  "Tonkinese",
  "Savannah",
  "Himalayan",
];

function routing(req, res) {
  const url = req.url;
  const method = req.method;

  if (url.startsWith("/data")) { // This is the route for manuplating the data 
    if (method === "GET") { // get the list of cats
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(data));
      res.end();
    } else if (method === "POST") { // add a new cat to the list
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        try {
          const parsed = JSON.parse(body);
          const newCat = parsed.cat;
          if (newCat && typeof newCat === "string") {
            data.push(newCat);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(JSON.stringify({ message: "Cat added successfully!" }));
            res.end();
          } else {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.write(JSON.stringify({ error: "Invalid data" }));
            res.end();
          }
        } catch (error) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.write(JSON.stringify({ error: "Invalid JSON" }));
          res.end();
        }
      });
    }
  } else if (url.startsWith("/login")) {
    if (method == "POST") {
      res.write("Login");
      res.end();
    }
  } else if (url.startsWith("/client")) { // this is the route for the client.htnml and just read the file
    if (method == "GET") {
      const filename = "client.html";

      fs.readFile(filename, "binary", function (err, file) {
        if (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.write(JSON.stringify({ error: err }));
          res.end();
          return;
        }

        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(file);
      });
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("No matching page");
  }
}

http.createServer(routing).listen(3000, function () {
  console.log("server start at port 3000"); //the server object listens on port
});
