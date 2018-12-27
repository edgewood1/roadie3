var express = require("express");
var path = require("path");
var routes = require("./routes/routes"); // 1
// app is a large object with a bunch of methods
var app = express();
var bodyParser = require("body-parser");

app.use(express.static(path.join(__dirname, "public")));

// app.use(express.static('public'));

// app.use(express.static(__dirname + "public"));

app.use(routes);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(3001);
