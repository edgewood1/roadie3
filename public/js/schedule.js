var days = 3;
var target, today, li, y, line;
 
$("#schedule").on("click", showDayBoxes);

$("#save").on("click", readDayBoxesFromScreen);
var z = [];

$("#backToDo").on("click", returnToDo);

function returnToDo() {
  $("#daily").css("display", "none");

  $("#save").css("display", "none");
  $("#backToDo").css("display", "none");

  $("#toDo")
    .show()
    .addClass("col s0");
}


// schedule days
function showDayBoxes() {
  // get current with news items - 
var promise3 = new Promise(function(resolve, reject) {
  getAjax(resolve)
}).then(function(current){

  console.log(current)

  // SAVE BUCKETLIST TO DB!!!
  saveBucketList(current)
    
  // add the day scheduler on -
  $("#daily").css("display", "inline");

  $("#save").css("display", "inline");
  $("#backToDo").css("display", "inline");

  $("#toDo")
    .hide()
    .addClass("col s0");

  for (x = 0; x <= days; x++) {
    $("#box" + x).css("display", "inline");
  }
  readDayBoxesFromDb(current);
})
  

}

// reads events from database
// posts them into the dayboxes

function readDayBoxesFromDb(current) {
  console.log(current)
  $(".day-box").empty();

  database
    .ref(current.theme+"/")
    .on(
      "value",
      function(snapshot) {
        console.log(snapshot.val())
 
        var events = snapshot.val().events;
      
        day = Object.keys(events);
        
        for (var a = 0; a < day.length; a++) {
          // day = Object.keys
          // day1

          // target> id = day1
          target = $("#" + day[a]);

          // get now.day1 from db snapshot
          var today = events[day[a]];

          printDayBox(today) 
      }
    })
  }
      
  function printDayBox(today) {

          // create an li element with this now.day

          // loop through items of now.day1
          // console.log(today.length);
          for (var x = 0; x <= today.length; x++) {
            // insert now.day1[0] into li tag
            if (today[x]) {
            //  today = (today[x].substring(0, 10) + "...");

              line = $("<li>").text(today[x]);
              line.attr({
                value: today[x],
                draggable: true,
                id: "a" + x,
                ondragstart: "drag(event)",
                
              });
         

              // add it to id = day1
              target.append(line);
            }
            // repeat for id=day2
          }
        }
        // }

        // If any errors are experienced, log them to console.
    //   },
    //   function(errorObject) {
    //     console.log("The read failed: " + errorObject.code);
    //   }
    // ;
// }

/// READ and SAVE day boxes

function readDayBoxesFromScreen() {
 
  days = 3;
  var events = {};
 
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
console.log("read: ", events)
saveDayBoxes(events)
}

function saveDayBoxes(events) {
  console.log(events)
  database
    .ref(current.theme+"/")
    .update({
      events: events
    });
  readDayBoxesFromDb();
}
