let file_handles = require("./file_handles.js");
let error_handles = require("./error_handles.js");

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

    let body = [];

    req.on("data", (chunk) => {
      console.log("Receiving data");
      body.push(chunk);
    });

    req.on("end", () => {

      body = Buffer.concat(body).toString();

      console.log(body);
      console.log(body.length);

      res.writeHead(302, {"Location" : "/user.html"});
      res.end();
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
