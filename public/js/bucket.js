// 1. config -
var current = {};

function pushBucketList(current) {
  if (current.bucketList == undefined) {
    current.bucketList = [current.bucketText];
  } else if (!current["bucketList"].includes(current["bucketText"])) {
    current["bucketList"].push(current["bucketText"]);
  }
  console.log("pushed bl", current);
  return current;
}

function initialReadDB(current) {
  console.log("2. initial read");
  var data = {};
  database.ref(current.theme + "/").on(
    "value",
    function(snapshot) {
      current = snapshot.val();
      console.log("read db: ", current);
    },
    function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    }
  );
  return current;
}

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
  console.log("4printBucketList ", current);
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

function getAjax(resolve) {
  return $.ajax({
    method: "GET",
    url: "/current",
    success: function(current) {
      resolve(current);
    }
  });
}

function postAjax(current, resolve) {
  $.post("/current", current, function(data) {
    console.log("success", data);
    resolve(data);
  }).fail(function(error) {
    console.log("error ", error);
  });
  // closes modal
  // $("#modal2").modal();
  console.log(current);
}

// title?
function postTitle(current) {
  console.log("PostTitle");
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
  return current;
}
