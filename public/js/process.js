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

  postAjaxCreateMap(current);
}

function selectNewPlace(e) {
  // create current
  $("#modal2").modal();
  $("#title").css("display", "none");
  var current = convertToCurrent(e);
  // call db to get rest of data
  current = initialReadDB(current);
  // clean bucketList

  // current = cleanBucketList(current);
  new Promise(function(resolve, reject) {
    current = JSON.stringify(current);
    $.get("/content/" + current, function(current) {
      console.log("back home", current);
      // return current;
      resolve(current);
    });
  }).then(function(current) {
    // print bucketlist, minus events
    current = printBucketList(current);

    current = postTitle(current);
    // save db data to current

    postAjaxCreateMap(current);
  });
}

function postAjaxCreateMap(current) {
  // $ajax("/current"
  new Promise(function(resolve, reject) {
    postAjax(current, resolve);
  }).then(function(current) {
    createMap(current);
    return current;
  });
}

// if you add to bucketList
function saveSchedule() {
  $("#schedule").hide();

  // get current

  new Promise(function(resolve, reject) {
    getAjax(resolve);
  }).then(function(current) {
    // save bucketlist
    // current.scheduleFlag == 1;
    current = saveToDb(current);
    // parse events and show dailies
    readOldEvents(current);
  });
}

function addToBucketList(bucketText) {
  new Promise(function(resolve, reject) {
    getAjax(resolve);
  }).then(function(current) {
    // add new bucketItem to current

    current["bucketText"] = bucketText;

    current = pushBucketList(current);

    // current = cleanBucketList(current);
    // add bucketItem to bucketList
    new Promise(function(resolve, reject) {
      current = JSON.stringify(current);
      $.get("/content/" + current, function(current) {
        console.log("back home", current);
        // return current;
        resolve(current);
      });
    }).then(function(current) {

    new Promise(function(resolve, reject) {
      console.log("saving new item!");

      postAjax(current, resolve);
    }).then(function(current) {
      printBucketList(current);
      //   console.log("added to current!", current);
    });
  });
}

function saveDaily() {
  // read daily
  new Promise(function(resolve, reject) {
    var current = getAjax(resolve);
  }).then(function(current) {
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
