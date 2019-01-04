var express = require("express");
var path = require("path");
var routes = require("./routes/routes"); // 1
// app is a large object with a bunch of methods
var app = express();
var bodyParser = require("body-parser");
const port = process.env.PORT || 8080;
app.use(express.static(path.join(__dirname, "public")));

var current = {};
// app.use(express.static('public'));

// app.use(express.static(__dirname + "public"));

app.use(routes);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/bucket.html"));
});

app.get("/current", function(req, res) {
  res.send(current);
});

app.post("/current", function(req, res) {
  current.place = { place: req.body.place };
  current.theme = { theme: req.body.theme };
  console.log(current);
});

app.listen(port, function() {
  console.log("go to port");
});
