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
  current.scheduleFlag = 1;
  var events = current.events;
  if (events) {
    console.log("evnets'");
    day = Object.keys(events);
    console.log(day);
    for (var a = 0; a < day.length; a++) {
      target = $("#" + day[a]);
      var today = events[day[a]];
      // console.log(today);
      printDayBox(today, current);
    }
  } else {
    console.log("show events");
    showEvents(current);
  }
}

function printDayBox(today, current) {
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
      target.append(line);
    }
    // repeat for id=day2
  }
  showEvents(current);
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
