var express = require("express");
var path = require("path");
// var dragula = require("dragula/dragula")

require("dotenv").config();
// var routes = require("./routes/routes"); // 1
// app is a large object with a bunch of methods
var app = express();
// app.use(dragula())
var bodyParser = require("body-parser");
const port = process.env.PORT || 3005;

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var content = require("./backend/content");

var current = {};

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/content", function(req, res) {
  console.log("hit!----------------");
  var cont = req.body;
  console.log(cont);
  var response = content.cleanBucketList(cont);
  console.log("returned json -= ", response);
  res.send(response);
});

app.get("/current", function(req, res) {
  console.log("new request -----------------new request");
  console.log("returning - ", current);
  return res.send(current);
});

app.post("/current", function(req, res) {
  console.log("new post -----------------new post");
  console.log("post! ", req.body);
  current = req.body;
  res.send(req.body);
});

app.listen(port, function() {
  console.log("go to ", port);
});
