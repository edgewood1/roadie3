var days = 3;
var target, today, li, y, line;
var schedule = $("#schedule");
schedule.on("click", schedule2);

// schedule days
function schedule2() {
  // add the day scheduler on -
  $("#save").css("display", "inline");

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
  database
    .ref("datum/")
    .child(current.theme)
    .on(
      "value",
      function(snapshot) {
        // If Firebase has a highPrice and highBidder stored, update our client-side variables
        // if (snapshot.child("now").exists()) {
        // Set the variables for highBidder/highPrice equal to the stored values.
        var events = snapshot.val().events;
        console.log(events);
        day = Object.keys(events);
        console.log(day);
        for (var a = 0; a < day.length; a++) {
          // day = Object.keys
          // day1

          // target> id = day1
          target = $("#" + day[a]);

          // get now.day1 from db snapshot
          var today = events[day[a]];
          console.log(today); // an array

          // create an li element with this now.day

          // loop through items of now.day1
          // console.log(today.length);
          for (var x = 0; x <= today.length; x++) {
            // insert now.day1[0] into li tag
            if (today[x]) {
              line = $("<li>").text(today[x]);
              line.attr({
                value: today[x],
                draggable: true,
                id: "a" + x,
                ondragstart: "drag(event)"
              });
              console.log("what we will print " + today[x]);

              // add it to id = day1
              target.append(line);
            }
            // repeat for id=day2
          }
        }
        // }

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
  var events = {};
  console.log(events);

  // loop through 3 days
  for (var z = 1; z <= days; z++) {
    // create an object day.1.
    // to get this object:
    // get all the day1 children
    // map through them and return the trimmed text.
    events["day" + z] = $("#day" + z)
      .children()
      .map(function(e) {
        return $.trim($(this).text());
      })
      .get();
  }

  database
    .ref("datum/")
    .child(current.theme)
    .update({
      events: events
    });
  readDayBoxes();
}
