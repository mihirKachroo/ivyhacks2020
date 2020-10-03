var fs = require("fs");

let error_handles = require("./error_handles.js");

function extractFileExtension(string) {
  let dotIdx = string.lastIndexOf(".");
  let slashIdx = string.lastIndexOf("/");
  if(dotIdx == -1) return "";
  if(dotIdx < slashIdx) return "";
  return string.slice(dotIdx, string.length);

}

function mimeFromExtension(string) {
  if(string === ".html") {
    return "text/html";
  } else if(string === ".css") {
    return "text/css";
  } else if(string === ".js") {
    return "test/javascript";
  } else if(string === ".json") {
    return "application/json";
  } else if(string === ".png") {
    return "image/png";
  } else if(string === ".jpg" || string === ".jpeg") {
    return "image/jpeg";
  } else if(string === ".ico") {
    return "image/vnd.microsoft.icon";
  } else {
    return "text";
  }
}

exports.handle_file = function(req, res, parse) {
  let path = parse.pathname;
  let extension = extractFileExtension(path);

  if(extension === "")
    path += "/index.html";

  path = "files" + path;

  fs.readFile(path, function (err, data) {
    if(err) {
      error_handles.handle_error(req, res, parse);
      return;
    }

    res.writeHead(200, {"Content-Type" : mimeFromExtension(extension)});
    res.write(data);
    res.end();
  });
}
