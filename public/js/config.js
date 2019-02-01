// variables defined

var bucketList = [],
  y = 0,
  scheduleFlag;

var draggedItem;

// 1. Item dragged -----

function allowDrop(ev) {
  ev.preventDefault();
}

// 2. the dragging of item

function drag(ev) {
  var name = ev.target.textContent;
  ev.dataTransfer.setData("application/x-moz-node", name);
  console.log(name);
}

// 3. dropping the item --

function drop(ev, el) {
  ev.preventDefault();
  console.log(" what is dropped: ", ev);
  console.dir(el);
  var droppedItemID = ev.dataTransfer.getData("application/x-moz-node");

  console.log(droppedItemID);
  // loop through li tags to see if this value is already present?
  var x = $("li").filter(function() {
    return $(this).attr("value") == droppedItemID;
  });

  x = x[0];
  console.log("hey - ", el["className"]);
  if (el["className"].includes("dayBox")) {
    console.log("daybox!");
    $(x).addClass("daily_text");
    //   console.log(x);
    el.append(x);
  } else if (el["id"].includes("bucketText")) {
    el.appendChild(x);
    console.log("added, ", x);

    addToBucketList(droppedItemID);
  }
}

// firebase config

var config = {
  apiKey: "AIzaSyCWgNfUftwU-qBUaM2mYCq1hf-MrH9Hj2o",
  authDomain: "fir-counter-56e8f.firebaseapp.com",
  databaseURL: "https://fir-counter-56e8f.firebaseio.com",
  projectId: "fir-counter-56e8f",
  storageBucket: "fir-counter-56e8f.appspot.com",
  messagingSenderId: "565377657653"
};

firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();
