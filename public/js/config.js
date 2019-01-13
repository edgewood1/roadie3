// variables defined

var bucketList = [],
  y = 0;
 
// drag and drop / firebase config

function allowDrop(ev) {
  ev.preventDefault();
}
var draggedItem;
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  
  draggedItem = ev.target.textContent;
}

// function drop(ev) {
//   ev.preventDefault();
//   var data = ev.dataTransfer.getData("text");
//   ev.target.appendChild(document.getElementById(data));
// }

function drop(ev, el) {
  ev.preventDefault();
  console.log(ev)
  var droppedItemID = ev.dataTransfer.getData("text");
  console.log(draggedItem)
   
  el.appendChild(document.getElementById(droppedItemID));
   addToBucketList(draggedItem)
  
//   var path = ev.path[1].id 
// var targetBox = ev.target.textContent
  // if (path == "bucketText" ) {
    
  //   console.log( droppedItem + " landed on " + targetBox + " via " + path) 
  //   addToBucketList(ev.target.textContent)
  // } else if (path == "bucketList2") {
  //   console.log( droppedItem + " landed on " + targetBox + " via " + path) 
  // } else {
  //   console.log("no dice")
  //   console.log( droppedItem + " landed on " + targetBox + " via " + path) 
  // }
}

function banDrop(ev) {

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
