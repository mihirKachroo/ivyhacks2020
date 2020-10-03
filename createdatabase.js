const sqlite3 = require("sqlite3").verbose();
const crypto = require("crypto");

sqlite3.verbose();

let db = new sqlite3.Database("./ivyhacks.db", (err) => {
  if(err) {
    console.log("OPening error");
    return console.error(err.message);
  }

  console.log("All good on the opening");

});

db.serialize(function() {
  let sql = "pragma foreign_keys=ON;"
  console.log("1");
  db.run(sql);

  sql = "CREATE TABLE USStates (postalcode VARCHAR(2) unique)";
  console.log("2");
  db.run(sql);

  sql = "INSERT INTO USStates (postalcode) VALUES (\"AL\"), (\"AK\"), (\"AZ\"), (\"AR\"), (\"CA\"), (\"CO\"), (\"CT\"), (\"DE\"), (\"FL\"), (\"GA\"), (\"HI\"), (\"ID\"), (\"IL\"), (\"IN\"), (\"IA\"), (\"KS\"), (\"KY\"), (\"LA\"), (\"ME\"), (\"MD\"), (\"MA\"), (\"MI\"), (\"MN\"), (\"MS\"), (\"MO\"), (\"MT\"), (\"NE\"), (\"NV\"), (\"NH\"), (\"NJ\"), (\"NM\"), (\"NY\"), (\"NC\"), (\"ND\"), (\"OH\"), (\"OK\"), (\"OR\"), (\"PA\"), (\"RI\"), (\"SC\"), (\"SD\"), (\"TN\"), (\"TX\"), (\"UT\"), (\"VT\"), (\"VA\"), (\"WA\"), (\"WV\"), (\"WI\"), (\"WY\");"
  console.log("3");
  db.run(sql);

  sql = "CREATE TABLE Currencies (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(15), symbol VARCHAR(1));";
  db.run(sql);

  sql = "INSERT INTO Currencies (name, symbol) VALUES (\"Dollar\", \"$\"), (\"Euro\", \"€\"), (\"Pound\", \"£\");"
  db.run(sql);

  sql = "CREATE TABLE Users (id INTEGER PRIMARY KEY AUTOINCREMENT, email VARCHAR(320), password_hash VARCHAR(64), first_name VARCHAR(50), last_name VARCHAR(50), currency INTEGER REFERENCES Currencies(id));"
  db.run(sql);

  sql = "CREATE TABLE Addresses (id INTEGER PRIMARY KEY AUTOINCREMENT, user INTEGER REFERENCES Users(id), street1 VARCHAR(255), street2 VARCHAR(255), zip INTEGER, city VARCHAR(255), country VARCHAR(255));"
  db.run(sql);

  sql = "CREATE TABLE Campaigns (id INTEGER PRIMARY KEY AUTOINCREMENT, user INTEGER REFERENCES Users(id), title VARCHAR(50), description VARCHAR(1500), ammount REAL, target_receiving_date INTEGER, target_repayment_date INTEGER);";
  db.run(sql);

  sql = "CREATE TABLE Images (id INTEGER PRIMARY KEY AUTOINCREMENT, campaign INTEGER REFERENCES Campaigns(id), filepath VARCHAR(50));";
  db.run(sql);

  //SHOULD CURRENCY BE AUTOMATICALLY INFERRED FROM TARGET CAMPAIGN AND DONATOR OR BE EXPLICITLY STORED? Memory efficiency vs Computational efficiency
  sql = "CREATE TABLE Transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, campaign INTEGER REFERENCES Campaigns(id), donator INTEGER REFERENCES Users(id), exchange_rate REAL);"; //Exchange rate * donator currency = campaign currency
  db.run(sql);

  sql = "CREATE TABLE Sessions (user VARCHAR(255) PRIMARY KEY, secret_key INTEGER, timestamp INTEGER);";
  db.run(sql);


  //sql = "CREATE TABLE  (id INTEGER REFERENCES Users(id), customer_id VARCHAR(255), account_id VARCHAR(255));";
  //db.run(sql);

  sql = "CREATE TABLE Accounts (account_id INTEGER, type VARCHAR(120), nickname VARCHAR(120), rewards INTEGER, balance INTEGER, user INTEGER REFERENCES Users(id));";
  db.run(sql);

  sql = "CREATE TABLE Customers (co_customer_id INTEGER, user INTEGER REFERENCES Users(id));"
  db.run(sql);
  //Test insertions

  sql = "INSERT INTO Users (email, password_hash, first_name, last_name, currency) VALUES ((?), (?), (?), (?), (?));";
  let stmt = db.prepare(sql);

  stmt.run("name@example.com","password","Name", "Last",1);
  stmt.run("jwstanly@gmail.com", "running", "John", "Stanly", 1);
  stmt.run("willway@outlook.com", "walkng", "Will", "McCoy", 1);
  stmt.run("european@eu.org", "fleeing", "A", "European", 2);
  stmt.run("brit@britain.com", "expanding", "A", "Brit", 3);
  //stmt.run("shouldfail@outlook.com", "failing", "A Failure", 3);

  //console.log(crypto.createHash("sha256").update("password").digest("hex"));

  stmt.finalize();

});


db.close( (err) => {
  if(err) {
    console.log("Closing Error");
    return console.error(err.message);
  }

  console.log("All good on the closing");
})
