// var days = 3;
var target, today, li, y, line;

// on click --

// opens daily
$("#schedule").on("click", { param: readOldEvents }, saveSchedule);

// saves daily
$("#save").on("click", { param: readNewEvents }, saveDaily);

//returns to bucketList
$("#backToDo").on("click", returnToDo);

var z = [];

// get Current bucket list - why?
function getCurrent(resolve) {
  // var callback = event.data.param;
  new Promise(function(resolve, reject) {
    getAjax(resolve);
  }).then(function(current) {
    console.log("curretn - ", current);
    // return current;
    resolve(current);
  });
}

function readOldEvents(current) {
  var events = current.events;
  // events > events.day1, day2, eventsArr
  if (events) {
    // get keys from events object

    var day = Object.keys(events);

    // remove the "eventsArr"
    day = day.slice(0, -1);
    // loop through events keys,
    day.forEach(function(elem1, item1) {
      target = $("#" + elem1);
      var today = events[elem1];
      // loop through items in each event key array
      today.forEach(function(elem2, item2) {
        // post each item
        line = $("<li>").text(elem2);
        line.attr({
          value: elem2,
          draggable: true,
          id: "a" + item2,
          ondragstart: "drag(event)"
        });
        target.append(line);
      });
      // repeat for id=day2
    });
    showEvents(current);
  } else {
    console.log("show events");
    showEvents(current);
  }
}

// hides todo
function showEvents(current) {
  console.log("visible!!", current.days);
  $("#daily").css("display", "inline");
  $("#save").css("display", "inline");
  $("#backToDo").css("display", "inline");
  $("#toDo")
    .hide()
    .addClass("col s0");
  for (x = 0; x <= current.days; x++) {
    $("#box" + x).css("display", "inline");
  }
}

// what is the new event?
/// READ and SAVE day boxes

function readNewEvents(current, resolve) {
  days = 3;
  var events = {};
  var eventsArr = [];

  // loop through 3 days and get contents save in events obj
  for (var z = 1; z <= days; z++) {
    // create an object day.1.
    // to get this object:
    // get all the day1 children
    // map through them and return the trimmed text.
    events["day" + z] = $("#day" + z)
      .children()
      .map(function(e, x) {
        return $.trim($(this).text());
      })
      .get();
  }
  console.log(events);

  // loops through events object to create eventsArr
  for (x in events) {
    events[x].forEach(function(item) {
      eventsArr.push(item);
    });
  }
  events.eventsArr = eventsArr;

  current.events = events;
  console.log("new: ", current);
  resolve(current);
  // return current;
  // saveEvents(current);
}

// function saveEvents(current) {
function saveToDb(current) {
  console.log(current);
  database.ref(current.theme + "/").set(current);
  return current;
  // readDayBoxesFromDb(current);
  // })
}
