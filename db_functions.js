const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database("./ivyhacks.db", sqlite3.OPEN_READWRITE, (err) => {
  if(err) {
    return console.error(err.message);
  }
  console.log("Connected to the Sqlite database successfully");
});





let create_session_stmt = db.prepare("INSERT INTO Sessions (name, key, timestamp) VALUES ((?),(?),(?));");

createSession function(user) {
  let secret = new String(Math.random());
  secret = secret(secret.indexOf(".") + 1, secret.length);

  console.log(secret);

  let d = new Date();
  create_session_stmt.run(user, secret, d.getTime());
  return secret;

}


exports.register = function(userdata) {
  
}
