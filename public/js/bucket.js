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
  console.log(place);
  var li = $("<li>");
  var a = Math.floor(Math.random() * 1000000);
  li.attr({
    value: place.name,
    draggable: true,
    id: "a" + a,
    ondragstart: "drag(event)",
    padding: "2em",
    margin: "0 2em 2em 0",
    // "box-shadow": "1px 1px 1px rgba(0, 0, 0, 0.3)",
    // "border-radius": "100px",
    border: "2px solid #ececec",
    background: "#F7F7F7",
    transition: "all .5s ease"
  });
  var revisedName = place["name"];
  // .slice(0, 22) + "...";
  li.text(revisedName);
  placesList.append(li);
}

function printBucketList(current) {
  console.log("4printBucketList ", current);
  var bucket = $("#bucketText");
  bucket.empty();

  if (current.bucketList == undefined) {
  } else {
    current["bucketList"].forEach(function(e, i) {
      var li = $("<li>");
      var a = Math.floor(Math.random() * 1000000);
      li.attr({
        value: e,
        draggable: true,
        id: "a" + a,
        ondragstart: "drag(event)"
      });

      li.text(e);
      bucket.append(li);
    });
  }
  $("#bucketList").css("display", "inline");
  // $("#toDo").css("display", "inline");
  makeEvents(current);
  return current;
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
