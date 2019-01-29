var express = require("express");
var path = require("path");
// var dragula = require("dragula/dragula")

require("dotenv").config();
// var routes = require("./routes/routes"); // 1
// app is a large object with a bunch of methods
var app = express();
// app.use(dragula())
var bodyParser = require("body-parser");
const port = process.env.PORT || 80;
app.use(express.static(path.join(__dirname, "public")));

// var admin = require("firebase-admin");

// var serviceAccount = require("./serviceActKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://fir-counter-56e8f.firebaseio.com"
// });

var current = {};
// app.use(express.static('public'));

// app.use(express.static(__dirname + "public"));

// app.use(routes);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/current", function(req, res) {
  console.log(req.body);
  res.send(current);
});

app.post("/current", function(req, res) {
  console.log("post! ", req.body);
  current.place = req.body.place;
  current.theme = req.body.theme;
  if (req.body.bucketList) {
    current.bucketList = req.body.bucketList;
  }
  if (req.body.events) {
    current.events = req.body.events;
  }
  if (req.body.pyrmont) {
    current.pyrmont = req.body.pyrmont;
  }
  if (req.body.arrive) {
    current.arrive = req.body.arrive;
  }
  if (req.body.depart) {
    current.depart = req.body.depart;
  }
  if (req.body.days) {
    current.days = req.body.days;
  }

  console.log(current);
  res.send(current);
});

app.listen(port, function() {
  console.log("go to ", port);
});
