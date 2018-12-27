/// on LOAD - check for bucket list values
var bucketList = [],
  y = 0;
database.ref().on(
  "value",
  function(snapshot) {
    // If Firebase has a highPrice and highBidder stored, update our client-side variables
    if (snapshot.child("bucketList").exists()) {
      // Set the variables for highBidder/highPrice equal to the stored values.
      bucketList = snapshot.val().bucketList;
      console.log(bucketList);
      placeInBLfromDb(bucketList);
    }

    // If any errors are experienced, log them to console.
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  }
);

// on load, fill up bucket list

function placeInBLfromDb(bucketList) {
  bucketList.forEach(function(e) {
    var bucket = $("#bucketText");
    var li = $("<li>");
    y++;
    li.attr({
      value: e,
      draggable: true,
      id: "a" + y,
      ondragstart: "drag(event)"
    });

    li.text(e);
    bucket.append(li);
  });
}

// on click, place in bucketList

function placeInBucketList(e) {
  // get item clicked and target location
  var itemClicked = $(this).attr("value");
  var bucket = $("#bucketText");
  var li = $("<li>");
  // counter for each item
  y++;
  // add to bucket list
  li.attr({
    value: itemClicked,
    draggable: true,
    id: "a" + y,
    ondragstart: "drag(event)"
  });
  li.text(itemClicked);
  bucket.empty();
  bucket.append(li);

  // create the array to save in firebase

  bucketList.push(itemClicked);

  database.ref().update({
    bucketList: bucketList
  });
}
var days = 3;
var target, today, li, y, line;
var schedule = $("#schedule");
schedule.on("click", schedule2);

// schedule days
function schedule2() {
  // add the day scheduler on -

  $("#toDo")
    .hide()
    .addClass("col s0");

  for (x = 0; x <= days; x++) {
    $("#box" + x).css("display", "inline");
  }
  readDayBoxes();
}

function readDayBoxes() {
  $(".day-box").empty();
  database.ref().on(
    "value",
    function(snapshot) {
      // If Firebase has a highPrice and highBidder stored, update our client-side variables
      if (snapshot.child("now").exists()) {
        // Set the variables for highBidder/highPrice equal to the stored values.
        var now = snapshot.val().now;
        console.log(now);

        for (var a = 1; a <= 3; a++) {
          // day1
          day = "day" + a;
          // target> id = day1
          target = $("#" + day);

          // get now.day1 from db snapshot
          today = now[day];
          console.log(today); // an array

          // create an li element with this now.day

          // loop through items of now.day1
          console.log(today.length);
          for (var x = 0; x < today.length; x++) {
            // insert now.day1[0] into li tag
            if (today[x]) {
              line = $("<li>").text(today[x]);
              console.log("what we will print " + today[x]);

              // add it to id = day1
              target.append(line);
            }
            // repeat for id=day2
          }
        }
      }

      // If any errors are experienced, log them to console.
    },
    function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    }
  );
}

/// save daily events

$("#save").on("click", save);
var z = [];

function save() {
  days = 3;
  var now = {};
  console.log(now);

  // loop through 3 days
  for (var z = 1; z <= days; z++) {
    // create an object day.1.
    // to get this object:
    // get all the day1 children
    // map through them and return the trimmed text.
    now["day" + z] = $("#day" + z)
      .children()
      .map(function(e) {
        return $.trim($(this).text());
      })
      .get();
  }

  console.log(now);
  database.ref().update({
    now: now
  });
  readDayBoxes();
}
