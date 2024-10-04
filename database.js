const sqlite3 = require("sqlite3").verbose();

// Connect to SQLite database
const db = new sqlite3.Database(":memory:");

// Create a table and seed some data
db.serialize(() => {
  db.run("CREATE TABLE projects (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)");
  db.run("INSERT INTO projects (name) VALUES ('Project Alpha')");
  db.run("INSERT INTO projects (name) VALUES ('Project Beta')");
  db.run("INSERT INTO projects (name) VALUES ('Project Gamma')");
});

module.exports = db;
