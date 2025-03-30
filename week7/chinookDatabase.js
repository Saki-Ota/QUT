const sqlite3 = require("sqlite3");

let database = new sqlite3.Database("Chinook_Sqlite.sqlite", function (error) {
  if (error) {
    console.log(`Failed to connect to Chinook database: ${error.message}`);
  } else {
    console.log("Connected to Chinook database.");
  }
});

database.get("SELECT * FROM Artist WHERE ArtistId LIKE 22", (error, row) => {
  if (error) {
    console.log(`Failed to retrieve a row from Artist table`);
  } else if (row === undefined) {
    console.log("Could not find a Artist ID is 22");
  } else {
    console.log(`Artist ID 22 is ${row.Name}`);
  }
});

// use .all method to get all data that matches to the condition given
database.all(
  "SELECT Name FROM Track WHERE Milliseconds > 400000",
  (error, row) => {
    if (error) {
      console.log(`Failed to retireve tracks`);
    } else {
      console.log(row.length);
    }
  }
);
