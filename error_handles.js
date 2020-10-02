exports.handle_error = function (req, res) {
  res.writeHead(404, {"Content-Type" : "text/html"});
  res.end("404 Page Not Found");
}
