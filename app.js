var express = require("express");
var path = require("path");
var routes = require("./routes/routes"); // 1
// app is a large object with a bunch of methods
var app = express();
var bodyParser = require("body-parser");
const port = 3005 || process.env.PORT;
app.use(express.static(path.join(__dirname, "public")));

var current = {};
// app.use(express.static('public'));

// app.use(express.static(__dirname + "public"));

app.use(routes);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/current", function(req, res) {
  console.log(req.body)
  res.send(current);
});

app.post("/current", function(req, res) {
  console.log("post! ", req.body)
  current.place = req.body.place;
  current.theme = req.body.theme;
  if (req.body.bucketList) {
  current.bucketList = req.body.bucketList;
  }
  if (req.body.events) {
  current.events = req.body.events;
  }
  
  console.log(current);
});

app.listen(port, function() {
  console.log("go to ", port);
});
