const http = require("http");
const fs = require("fs");

const path = "guestBook.json";

function routing(req, res) {
  const url = req.url;
  if (url.startsWith("/form")) {
    // The form page
    res.writeHead(200, { "Content-Type": "text/html" }); // http header
    res.write(`
   <form action=/add method="POST">
       <p>Enter your name:</p>
       <input name="name">
       <br>
       <p>Enter your age:</p>
       <input name="age" type="number">
         <br>
       <p>Select your gender</p>
       <input name="gender" type="radio" value="Male"><label>Male</label>
       <input name="gender" type="radio" value="Female"><label>Female</label>
       <br>
       <p>Comment</p>
       <input name="comment" type="text">
       <br>

       <input type="submit">
   </form>
   `);
    res.end();
  } else if (url.startsWith("/add") && req.method === "POST") {
    let body = "";
    // Receive the data from the form
    req.on("data", (chunk) => {
      body += chunk.toString(); // convert Buffer to string
    });

    // After the data is received, write it to the guest book
    req.on("end", () => {
      const params = new URLSearchParams(body); // Get the part of the url after the first "?"

      // Read the guest book
      fs.readFile(path, function (err, data) {
        if (err) {
          res.write("Error reading guest book");
          res.end();
          return;
        }

        let guestBook = [];
        try {
          guestBook = JSON.parse(data);
        } catch (e) {}

        // Write the new entry to the guest book
        guestBook.push({
          name: params.get("name"),
          age: params.get("age"),
          gender: params.get("gender"),
          comment: params.get("comment"),
        });

        // Write the updated guest book to the file
        fs.writeFile(path, JSON.stringify(guestBook, null, 2), (err) => {
          if (err) {
            res.write("Error writing guest book");
            res.end();
            return;
          }
          res.write("Successfully updated the guest book");
          res.end();
        });
      });
    });
    // // The add page
    // fs.readFile(path, function (err, data) {
    //   if (err) {
    //     res.write("You should do some real error handling here");
    //     res.end();
    //     return;
    //   }

    //   // Try to read from the guestbook. If it fails, set the guest book to empty
    //   let guestBook = [];
    //   try {
    //     guestBook = JSON.parse(data);
    //   } catch (e) {}

    //   // Add the name in the url params to the guestbook
    //   const nameParams = new URLSearchParams(url.split("?")[1]); // Get the part of the url after the first "?"
    //   const ageParams = new URLSearchParams(url.split("?")[1]); // Get the part of the url after the first "?"
    //   const genderParams = new URLSearchParams(url.split("?")[1]); // Get the part of the url after the first "?"
    //   const commentParams = new URLSearchParams(url.split("?")[1]); // Get the part of the url after the first "?"
    //   guestBook.push({
    //     name: nameParams.get("name"),
    //     age: ageParams.get("age"),
    //     gender: genderParams.get("gender"),
    //     comment: commentParams.get("comment"),
    //   }); // Get the name param and add it to the guestbook

    //   // Write the updated guestbook to the filesystem
    //   fs.writeFile(path, JSON.stringify(guestBook), (err) => {
    //     if (err) {
    //       res.write("You should do some real error handling here");
    //       res.end();
    //       return;
    //     }
    //     res.write("Successfylly updated the guestbook");
    //     res.end();
    //   });
    // });
  } else if (url === "/read") {
    fs.readFile(path, function (err, data) {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Failed to read guest book");
        return;
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(data); // send raw JSON
    });
  } else {
    // No page matched the url
    res.write("No matching page");
    res.end();
  }
}
//create a server object:
http.createServer(routing).listen(3000, function () {
  console.log("server start at port 3000"); //the server object listens on port 3000
});

console.log("Test");
