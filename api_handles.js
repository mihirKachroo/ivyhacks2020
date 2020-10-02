const sqlite3 = require("sqlite3").verbose();
let file_handles = require("./file_handles.js");
let error_handles = require("./error_handles.js");


let db = new sqlite3.Database("./ivyhacks.db", sqlite3.OPEN_READWRITE, (err) => {
  if(err) {
    return console.error(err.message);
  }
  console.log("Connected to the Sqlite database successfully");
});

let handlesArray = [];

/*var mainHandle = {
  path : "/",
  handle : function(req, res) {
    console.log("Main handle");
  }
};
handlesArray.push(mainHandle);*/

var currenciesHandle = {
  path : "/currencies",
  handle : function(req, res) {
    res.writeHead(200, {"Content-Type" : "text/json"});
    sql = "SELECT * FROM Currencies";
    var rtn;
    db.all(sql, function(err, rows) {
      console.log(rows);
      res.end(JSON.stringify(rows));
    });
  }
};
handlesArray.push(currenciesHandle);

var registerHandle = {
  path : "/register",
  handle : function(req, res) {
    //console.log(req);

    console.log(req.method);

    var data = "";

    req.on("data", (chunk) => {
      console.log("Receiving data");
      data += chunk.toString();
    });

    req.on("end", () => {
      console.log(data);

      res.writeHead(200, {"Content-Type" : "text/json"});
      res.end("Hello world");
    });


  }
};
handlesArray.push(registerHandle);




exports.handle_api = function(req, res, parse) {
  for(i = 0; i < handlesArray.length; i++) {
    if(handlesArray[i].path == parse.pathname) {
      handlesArray[i].handle(req, res);
      return;
    }
  }

  file_handles.handle_file(req, res, parse);
}
