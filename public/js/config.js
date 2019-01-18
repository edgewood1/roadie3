// variables defined

var bucketList = [],
  y = 0,
  scheduleFlag;

// drag and drop / firebase config

function allowDrop(ev) {
  ev.preventDefault();
}
var draggedItem;

function drag(ev) {
  var name = ev.target.textContent;
  ev.dataTransfer.setData("application/x-moz-node", name);
  console.log(name);
}

function drop(ev, el) {
  ev.preventDefault();
  console.log(ev);
  console.log(" dropped here : ", el);
  var droppedItemID = ev.dataTransfer.getData("application/x-moz-node");

  console.log(droppedItemID);
  var x = $("li").filter(function() {
    return $(this).attr("value") == droppedItemID;
  });

  x = x[0];

  console.log(x);
  if (scheduleFlag == 0) {
    el.appendChild(x);
    //  addToBucketList(draggedItem)
  } else {
    $(x).addClass("daily_text");
    console.log(x);
    el.append(x);
    draggedEvent(x);
  }
}

function banDrop(ev) {}

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
