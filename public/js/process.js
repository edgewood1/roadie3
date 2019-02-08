// MODAL 2 - SELECT NEW PLACE

function createNewPlace(e) {
  $("#title").css("display", "none");
  // from modal
  // get info
  current = getNewPlace(e);
  // save to current
  // save to db
  current = saveToDb(current);
  // create map / to do
  // database.ref(theme + "/").update(current);

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

  current = JSON.stringify(current);

  $.get("/content/" + current, function(current) {
    console.log("back home", current);

    current = printBucketList(current);

    current = postTitle(current);
    // save db data to current

    $.post("/current", current, function(data) {
      createMap(current);
      return current;
    });
  });
}

// if you add to bucketList
function saveSchedule() {
  $("#schedule").hide();

  // get current
  $.ajax({
    method: "GET",
    url: "/current",
    success: function(current) {
      current = saveToDb(current);
      // parse events and show dailies
      readOldEvents(current);
    }
  });
}

function addToBucketList(bucketText) {
  $.get("/current", function(current) {
    // add new bucketItem to current

    current["bucketText"] = bucketText;
    current = pushBucketList(current);
    current = JSON.stringify(current);
    //clean bucketlist
    $.get("/content/" + current, function(current) {
      console.log("back home", current);
    }).then(function(current) {
      // add to db
      $.post("/current", current, function(data) {
        console.log("saving new item!");
      }).then(function(current) {
        printBucketList(current);
      });
    });
  });
}

function saveDaily() {
  // read daily
  $.get("/current", function(current) {
    new Promise(function(resolve, reject) {
      current = readNewEvents(current, resolve);
    }).then(function(current) {
      saveToDb(current);
    });
  });
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
