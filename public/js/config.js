// 1. Item dragged -----

function allowDrop(ev) {
  ev.preventDefault();
}

// 2. the dragging of item

function drag(ev) {
  var send = {
    text: ev.target.textContent,
    id: ev.target.id
  };
  send = JSON.stringify(send);
  ev.dataTransfer.setData("application/x-moz-node", send);
}

// 3. dropping the item --

function drop(ev, el) {
  ev.preventDefault();
  var item = ev.dataTransfer.getData("application/x-moz-node");
  item = JSON.parse(item);

  var { text, id } = item;
  var dropLocation = el;

  var fullItem = $("#" + id);
  console.log(fullItem);
  //daily
  if (dropLocation["className"].includes("drop")) {
    console.log("daybox!");
    // $(dro).addClass("daily_text");
    dropLocation.append(fullItem[0]);
    console.log("id ", id);
    console.log("text ", text);
    console.log(dropLocation["id"]);
    item.location = dropLocation["id"];
    // addToEvents(item);
    //bucketlist
  } else if (dropLocation["id"].includes("bucketText")) {
    dropLocation.appendChild(fullItem[0]);
    // addToBucketList(item);
  } else if (dropLocation["id"].includes("places")) {
    dropLocation.append(fullItem[0]);
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
