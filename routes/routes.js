var express = require("express");
const router = express.Router();
var path = require("path");

// const geoCode = require('./geoCode.js')
const map1 = require("./map");

// var x, pyrmont;

router.get("/schedule", function(req, res) {
  res.sendFile(path.join(__dirname, "../public", "schedule.html"));
});
module.exports = router;
