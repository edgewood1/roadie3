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

function cleanBucketList(current) {
  console.log("cleanBucket! ", current);
  var count = 0;
  var events = current["events"];
  var bucketList = current["bucketList"];

  if (bucketList) {
    // remove null from bucketList
    var newArray = current["bucketList"].filter(function(el) {
      if (el != null || el != "") {
        count++;
        return el;
      }
    });

    current["bucketList"] = newArray;
  }

  // events Clean Up

  if (events) {
    bucketList.forEach(function(elem, item) {
      console.log("events Array - ", events["eventsArr"]);
      if (events["eventsArr"]) {
        if (events["eventsArr"].includes(elem)) {
          console.log(elem + "is in the events array");
          count++;
          bucketList[item] = null;
        }
      }
    });
  }

  if (bucketList) {
    // cleann again
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
  $("#title").text(
    "Destination: " + current.place + "  ~ Theme: " + current.theme
  );
  $("body").css("overflow", "auto");
}
