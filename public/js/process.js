// MODAL 2 - SELECT NEW PLACE

function createNewPlace(e) {
  $("#title").css("display", "none");
  // from modal get info
  current = getNewPlace(e);
  // save to db
  current = saveToDb(current);
  // save current create map / to do
  $.post("/current", current, function(data) {
    createMap(current);
    return current;
  });
}

function selectNewPlace(e) {
  // create current
  $("#modal2").modal();
  $("#title").css("display", "none");
  var current = convertToCurrent(e);
  // call db to get rest of data
  current = initialReadDB(current);
  // clean bucketList
  // current = JSON.stringify(current);
  console.log(current);
  $.ajax({
    url: "/content",
    method: "POST",
    data: current,
    success: function(current) {
      console.log("back home", current);

      current = printBucketList(current);

      current = postTitle(current);
      // save db data to current

      $.post("/current", current, function(data) {
        createMap(current);
        return current;
      });
    }
  });
}

function addToEvents(item) {
  var { text, id, location } = item;
  console.log(text + "  " + location);
  $.get("/current", function(current) {
    console.log("return");
    var event = current["events"];
    console.log(event[location]);

    if (event[location]) {
      event[location].push(text);

      event["eventsArr"].push(text);
      $.post("/current", current, function(current) {
        console.log("posted ", current);
      });
    }
  });
}

// after dragging to bucket list?
function addToBucketList(item) {
  // var { text, id } = item;
  console.log("addtobl");
  // console.log(text);
  // console.log(id);
  var div = $("#bucketText");
  var lis = div[0].children;
  var list = [];
  for (let item of lis) {
    list.push(item.textContent);
  }
  console.log(list);
  current["bucketList"] = list;
  // $.get("/current", function(current) {
  // add new item to current.bucketlist

  // current["bucketText"] = text;
  // current = pushBucketList(current);
  // current = JSON.stringify(current);
  //clean bucketlist
  console.log(current);
  // saveToDb(current);
  // readOldEvents(current);
  return current;

  // $.ajax({
  //   url: "/content",
  //   data: current,
  //   method: "POST",
  // success: function(current) {
  //     console.log("addbl - get content", current);
  //     // }).then(function(current) {
  //     // add to current
  //     // current = JSON.parse(current);
  //     $.post("/current", current, function(data) {
  //       console.log("saving new item!");
  //       // }).then(function(current) {
  //       // printBucketList(current);
  //       return current;
  //     });
  //   }
  // });
}

// daily boxes disappear

function returnToDo() {
  $("#daily").css("display", "none");
  $("#schedule").show();
  $("#save").css("display", "none");
  $("#backToDo").css("display", "none");

  $("#toDo")
    .show()
    .addClass("col s0");
}
