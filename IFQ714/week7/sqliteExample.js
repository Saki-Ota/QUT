const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("example.db");

sdb.serialize(() => {
  // Create a table
  const sqlTable =
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)";
  db.run(sqlTable);

  // Insert some rows
  const stmtTemplate = "INSERT INTO users (name) VALUES (?)";
  const stmt = db.prepare(stmtTemplate);
  stmt.run("Joseph Bloggs");
  stmt.run("Jane Austen");
  stmt.finalize();

  // Query the database
  const sqlQuery = "SELECT id, name FROM users";
  db.each(sqlQuery, (err, row) => {
    if (err) {
      throw err;
    }
    console.log(`${row.id}: ${row.name}`);
  });
});

db.close();
