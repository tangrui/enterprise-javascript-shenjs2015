vertx.createHttpServer()
  .requestHandler(function (req) {
    req.response()
    .putHeader("content-type", "text/plain")
    .end("Hello World!\n");
}).listen(8080, function() {
  print('listening on port 8080...');
});
