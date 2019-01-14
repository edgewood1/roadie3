var days = 3;
var target, today, li, y, line;

// on click -- 

$("#backToDo").on("click", returnToDo);
 
$("#schedule").on("click", {param:readOldEvents}, getCurrent);

$("#save").on("click", {param:readNewEvents}, getCurrent);
var z = [];

function saveEvents() {

}

// daily boxes disappear

function returnToDo() {
  $("#daily").css("display", "none");

  $("#save").css("display", "none");
  $("#backToDo").css("display", "none");

  $("#toDo")
    .show()
    .addClass("col s0");
}

// get Current bucket list - why? 
function getCurrent(event) {
  var callback = event.data.param
  new Promise(function(resolve, reject) {
    getAjax(resolve)
  }).then(function(current){
  current = cleanBucketList(current) 
  callback(current)
  })
}

function readOldEvents(current) {
  var events = current.events
  if (events) {
    console.log("evnets'")
  day = Object.keys(events);        
    for (var a = 0; a < day.length; a++) {
      target = $("#" + day[a]);
      var today = events[day[a]];
      printDayBox(today) 
     }
    } else {
      console.log("show events")
      showEvents()
    }
}
 
 function printDayBox(today) {

    for (var x = 0; x <= today.length; x++) {
      // insert now.day1[0] into li tag
      if (today[x]) {
      
        line = $("<li>").text(today[x]);
        line.attr({
          value: today[x],
          draggable: true,
          id: "a" + x,
          ondragstart: "drag(event)",
        });
        target.append(line);
      }  
      // repeat for id=day2
    }
    showEvents()
  }

  function showEvents() {
    console.log("visible!!")
    $("#daily").css("display", "inline");
    $("#save").css("display", "inline");
    $("#backToDo").css("display", "inline");
    $("#toDo")
      .hide()
      .addClass("col s0");
    for (x = 0; x <= days; x++) {
      $("#box" + x).css("display", "inline");
    }
  }

/// READ and SAVE day boxes

function readNewEvents(current) {
 
  days = 3;
  var events = {};
  var eventsArr = [];
 
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
  for (x in events) {
    events[x].forEach(function(item) {
      eventsArr.push(item)
    })
  }
  events.eventsArr = eventsArr;
console.log("read: ", events)
current.events = events
saveEvents(current)
}

function saveEvents(current) {

  // new Promise(function(resolve, reject) {
  //   getAjax(resolve)
  // }).then(function(current) {

  
  console.log(current)
  database
    .ref(current.theme+"/")
    .update({
      events: current.events
    });
  // readDayBoxesFromDb(current);
  // })
}
