// 1. drag and drop

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
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
