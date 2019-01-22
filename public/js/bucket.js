// 1. config -
var current = {};

function pushBucketList(current) {
  if (current.bucketList == undefined) {
    current.bucketList = [current.bucketText];
  } else if (!current["bucketList"].includes(current["bucketText"])) {
    current["bucketList"].push(current["bucketText"]);
  }
  return current;
}

// clean bucketlist and events

function cleanBucketList(current) {
  console.log("cleanBucket! ", current);
  var count = 0;

  if (!current["events"]) {
    current["events"] = {};
    current.events.eventsArr = [];
  }

  if (!current["bucketList"]) {
    current["bucketList"] = [];
  }

  // remove null from bucketList

  if (current["bucketList"]) {
    var newArray = current["bucketList"].filter(function(el) {
      if (el != null || el != "") {
        count++;
        return el;
      }
    });
    current["bucketList"] = newArray;
  }

  // make sure toDo doesn't include items from bucketlist

  if (current.events["eventsArr"]) {
    current["bucketList"].forEach(function(elem, item) {
      // console.log("events Array - ", events["eventsArr"]);
      // if (events["eventsArr"]) {
      if (current.events["eventsArr"].includes(elem)) {
        console.log(elem + "is in the events array");
        count++;
        current.bucketList[item] = null;
      }
      // }
    });
  }
  // make sure dailys not in bucket List

  // remove nulls from bucketList
  if (current["bucketList"]) {
    var newArray = current["bucketList"].filter(function(el) {
      if (el != null || el != "") {
        count++;
        return el;
      }
    });

    current["bucketList"] = newArray;
    console.log("number of clean ups: ", count);
  }
  return current;
}

// add new item to database

function saveBucketList(current) {
  database.ref(current.theme + "/").update({
    bucketList: current.bucketList
  });
  return current;
}

function initialReadDB(current) {
  var data = {};
  database.ref(current.theme + "/").on(
    "value",
    function(snapshot) {
      current = snapshot.val();
    },
    function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    }
  );
  return current;
}

// ------------
// print
// ----------- from map>

function cleanToDo(i, placeList, place) {}

function printToDo(i, placesList, place) {
  // gets the place name and lists it on the "to do" list

  var li = $("<li>");

  li.attr({
    value: place.name,
    draggable: true,
    id: "a" + i,
    ondragstart: "drag(event)",
    padding: "2em",
    margin: "0 2em 2em 0",
    // "box-shadow": "1px 1px 1px rgba(0, 0, 0, 0.3)",
    // "border-radius": "100px",
    border: "2px solid #ececec",
    background: "#F7F7F7",
    transition: "all .5s ease"
  });

  li.text(place.name);
  placesList.append(li);
}

function printBucketList(current) {
  var bucket = $("#bucketText");
  bucket.empty();

  if (current.bucketList == undefined) {
  } else {
    current["bucketList"].forEach(function(e) {
      var li = $("<li>");
      y++;
      li.attr({
        value: e,
        draggable: true,
        // id: "a" + y,
        ondragstart: "drag(event)"
      });

      li.text(e);
      bucket.append(li);
    });
  }
  $("#bucketList").css("display", "inline");
  $("#toDo").css("display", "inline");
  return current;
}

// ---------------------- current
//
//

function getAjax(resolve) {
  return $.ajax({
    method: "GET",
    url: "/current",
    success: function(current) {
      resolve(current);
    }
  });
}

function postAjax(current) {
  console.log(current);
  $.post("/current", current, function(data) {
    console.log("success", data);
    return data;
  }).fail(function(error) {
    console.log("error ", error);
  });
  // closes modal
  $("#modal2").modal();
  console.log(current);
  var doThis = current["place"].slice(0, -5);
  $("#destination")
    .text("Destination: " + doThis)
    .css("margin-bottom", "2%");
  $("#theme1")
    .text("Theme: " + current.theme)
    .css("margin-bottom", "2%");
  $("#arrive1")
    .text("Arrival: " + current.arrive)
    .css("margin-bottom", "2%");
  $("#depart1")
    .text("Depart: " + current.depart)
    .css("margin-bottom", "2%");
  $("body").css("overflow", "auto");
}
