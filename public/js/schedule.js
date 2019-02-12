// var days = 3;
var target, today, li, y, line;

// on click --

// opens daily
$("#schedule").on("click", { param: readOldEvents }, saveSchedule);

// saves daily
$("#save").on("click", { param: current }, saveDaily);

//returns to bucketList
$("#backToDo").on("click", returnToDo);

var z = [];

// opens Daily
function saveSchedule() {
  $("#schedule").hide();

  // read bucket list and put into list
  var div = $("#bucketText");
  var lis = div[0].children;
  var list = [];
  for (let item of lis) {
    list.push(item.textContent);
  }

  // get current
  $.get("/current", function(current) {
    // add bucketlist
    current["bucketList"] = list;
    // clean bucketlist
    $.ajax({
      url: "/content",
      data: current,
      method: "POST",
      success: function(current) {
        console.log("addbl - get content", current);

        // post bucketlist
        $.post("/current", current, function(current) {
          // save to db

          current = saveToDb(current);

          //read old events from current
          showEvents(current);
          // readOldEvents(current);

          // show events
        });
      }
    });
  });
}

function makeEvents(current) {
  for (i = 1; i <= current.days; i++) {
    // create a box for each day
    var div1 = $("<div>")
      .addClass("box")
      .css({ position: "relative" });
    var div2 = $("<div>")
      .text("Day " + i)
      .css({ color: "#f7f7f7" });
    var div3 = $("<div>")
      .attr({
        id: "day" + i,
        ondrop: "drop(event, this)",
        ondragover: "allowDrop(event)"
      })
      .addClass("drop")
      .css({
        display: "flex",
        height: "calc(14vh)",
        "flex-direction": "column"
      });

    div1.append(div2);
    div1.append(div3);
    $("#daily").append(div1);
  }
  // showEvents(current)
  return;
}

function showEvents(current) {
  $("#toDo").css("display", "none");
  $("#daily").css("display", "grid");
  $("#save").css("display", "inline");
  $("#backToDo").css("display", "inline");

  //
  //   var div2 = $("<div>")
  //     .attr({
  //       id: "day" + i,
  //       ondrop: "drop(event, this)",
  //       ondragover: "allowDrop(event)"
  //     })
  //     .addClass("box");

  //   $("#daily").append(div2);
  // }
  readOldEvents(current);
}
function readOldEvents(current) {
  console.log("hit", current);

  var events = current.events;
  // events > events.day1, day2, eventsArr
  if (events) {
    // get day keys removing eventsArr
    var day = Object.keys(events);
    day = day.slice(0, -1);

    // loop through events keys,
    day.forEach(function(elem1, item1) {
      target = $("#" + elem1);
      target.empty();
      var today = events[elem1];
      // loop through items in each event key array
      today.forEach(function(elem2) {
        // post each item
        line = $("<li>").text(elem2);
        var a = Math.floor(Math.random() * 1000000);
        line.attr({
          value: elem2,
          draggable: true,
          id: "a" + a,
          ondragstart: "drag(event)"
        });
        console.log(target);

        target.append(line);
      });
      // repeat for id=day2
    });
    // showEvents(current);
  } else {
    console.log("show events");
    // showEvents(current);
  }
}

// what is the new event?
/// READ and SAVE day boxes

function readNewEvents(current, resolve) {
  current.events = {};
  var here = current.events;
  here["eventsArr"] = [];
  console.log(current);
  var days = parseInt(current["days"]);
  console.log(days);
  // loop through 3 days and get contents save in events obj
  for (z = 1; z <= days; z++) {
    console.log(z);
    var x = "day" + z;
    var y = $("#" + x);

    // console.log(y[0].children);

    if (y[0]["children"].length > 0) {
      console.log("children at ", x);
      var list = y[0].children;
      here[x] = [];
      for (let item of list) {
        here[x].push(item.textContent);
        here["eventsArr"].push(item.textContent);
      }
    }
  }
  console.log(current);
  resolve(current);
}

// function saveEvents(current) {
function saveToDb(current) {
  console.log(current);
  database.ref(current.theme + "/").set(current);
  return current;
  // readDayBoxesFromDb(current);
  // })
}
function saveDaily() {
  // read daily

  $.get("/current", function(current) {
    new Promise(function(resolve, reject) {
      readNewEvents(current, resolve);
    }).then(function(data) {
      console.log(data);

      $.post("/current", current, function(data) {
        current = saveToDb(current);
      });
    });
  });
}
