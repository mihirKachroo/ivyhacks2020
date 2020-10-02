let http = require("http");
var url = require("url");

var api_handles = require("./api_handles.js");
var file_handles = require("./file_handles.js");


function handleServer(req, res) {

  let parse = url.parse(req.url, true);

  if(!parse.pathname.includes(".")) {
    api_handles.handle_api(req, res, parse);
  } else {
    file_handles.handle_file(req, res, parse);
  }

}



let server = http.createServer(handleServer);

server.listen(8000);

/*db.close((err) => {
  if(err) {
    return console.error(err.message);
  }
  console.log("Close the database connection.");
});*/
