// 1. config -

var bucketList = [],
  y = 0;

function getDataForBucketList(current) {
  database
    .ref("datum/")
    .child(current.theme)
    .on(
      "value",
      function(snapshot) {
        bucketList = snapshot.val().bucketList;
        printBucketList(bucketList);
      },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
}
function printBucketList(bucketList) {
  var bucket = $("#bucketText");
  bucket.empty();
  bucketList.forEach(function(e) {
    console.log(e);

    var li = $("<li>");
    y++;
    li.attr({
      value: e,
      draggable: true,
      id: "a" + y,
      ondragstart: "drag(event)"
    });

    li.text(e);
    bucket.append(li);
  });
  $("#bucketList").css("display", "inline");
  $("#toDo").css("display", "inline");
}

// on click, place in bucketList

function saveNewBucketListItem(e) {
  console.log(e);
  // get item clicked and target location
  var itemClicked = $(this).attr("value");

  // add new item to database

  bucketList.push(itemClicked);

  database
    .ref("datum/")
    .child(current.theme)
    .update({
      bucketList: bucketList
    });

  getDataForBucketList(current);
  // if doesn't work, call getCurrent
}

var current = {};
/// on LOAD - check for bucket list values
// $(window).on("load", function() {
//   console.log("All assets are loaded");

function getCurrent(callback) {
  $.ajax({
    method: "GET",
    url: "/current",
    function(current) {
      return current;
    }
  });
}
