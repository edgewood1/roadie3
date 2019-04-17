// submit a new place
// select type
// geocode, draw map, markers

// begin process
var current = {};

$(document).ready(function() {
  //default place?
  console.log("hit");
  $(".sidenav").sidenav({ closeOnClick: true, menuWidth: 120 });
  $(".sidenav li").click(() => {
    $(".sidenav").sidenav("close");
  });
  $(".datepicker").datepicker();
  $("#toDo").attr("style", "display: none");
  $("#title").text("Use tabs to create or select a place");

  class Current {
    constructor(place) {
      this.place = place;
      this.bucketList = [];
      this.event = { eventsArr: [] };
      this.type = ["museum"];
      this.pyrmont = {};
    }
  }

  var current = new Current("Durham, NC");
  // current.place = "Durham, NC";
  // current.bucketList = [];
  // current.events = {};
  // current.events["eventsArr"] = [];

  // current.type = ["museum"];
  // current.pyrmont = {};
  $.post("/current", current, function(current) {
    createMap(current);
  });

  geoCode(current);
});

var totalData, input, newinput, map;
var x;
// 1. geoCode

function createMap(current) {
  console.log(current);
  current = geoCode(current);
  current
    .then(function(data) {
      console.log("init map");
      return initMap(data);
    })
    .then(function(data) {
      console.log("places");
      googlePlaces(data);
    });
}

function geoCode(current) {
  return new Promise(function(resolve, reject) {
    if (current.pyrmont == undefined) {
      current.pyrmont == {};
    }
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: current.place }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        lat = parseFloat(results[0].geometry.location.lat());
        long = parseFloat(results[0].geometry.location.lng());
        current.pyrmont = new google.maps.LatLng(lat, long);

        resolve(current);
        // initMap(pyrmont, current);
      } else {
        alert("Something got wrong " + status);
      }
    });
  });
}

// 2. draw map

function initMap(current) {
  return new Promise(function(resolve, reject) {
    map = new google.maps.Map(document.getElementById("map"), {
      center: current.pyrmont,
      zoom: 25
    });
    map.setOptions({ scrollwheel: true });
    var input = document.getElementById("place");

    // auto complete >

    var options = {
      types: ["(cities)"],
      componentRestrictions: { country: "us" }
    };

    var autocomplete = new google.maps.places.Autocomplete(input, options);
    $("#modal1").modal();
    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo("bounds", map);

    // Set the data fields to return when the user selects a place.
    autocomplete.setFields(["address_components", "geometry", "icon", "name"]);
    ///////////////////////////////////////////

    resolve(current);
  });
}

function googlePlaces(current) {
  // Create the places service.
  var service = new google.maps.places.PlacesService(map);
  current.service = service;

  // more
  var getNextPage = null;
  var moreButton = document.getElementById("more");
  moreButton.onclick = function() {
    moreButton.disabled = true;
    if (getNextPage) getNextPage();
  };

  // Perform a nearby search.
  service.nearbySearch(
    { location: current.pyrmont, radius: 2000, type: [current.type] },
    function(results, status, pagination) {
      if (status !== "OK") return;

      current.places = results;

      createMarkers(current);

      moreButton.disabled = !pagination.hasNextPage;
      getNextPage =
        pagination.hasNextPage &&
        function() {
          pagination.nextPage();
        };
    }
  );
  // add resolve?
}

// 3. create markers

function createMarkers(current) {
  console.log(current);
  if (!current) {
    console.log("there's no current object");
  }
  $("#places").empty();
  var bounds = new google.maps.LatLngBounds();
  placesList = $("#places");
  placesList.empty();

  // the loop
  for (var i = 0, place; (place = current.places[i]); i++) {
    var image = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    var marker = new google.maps.Marker({
      map: map,
      icon: image,
      title: place.name,
      position: place.geometry.location
    });
    // var events = current["events"];
    // console.log("1 - ", events);
    // console.log("bucketList: " + current["bucketList"]+ "  " + " name: ", current.places[i].name)
    // if (current.bucketList && events) {
    //   if (
    //     !current["bucketList"].includes(current.places[i].name) &&
    //     !events["eventsArr"].includes(current.places[i].name)
    //   ) {
    // placesList = location
    // loop #
    // place - gemetry

    // if (!current["events"]) {
    //   console.log("going to print to do");
    //   printToDo(i, placesList, place, current);

    //   // don't print item if in eventsArr OR bucketList
    // } else if (
    //   !events["eventsArr"].includes(place.name) &&
    //   !current["bucketList"].includes(place.name)
    // ) {
    printToDo(i, placesList, place, current);
    // }

    bounds.extend(place.geometry.location);
  }
  $("#bucketList").css("display", "inline");
  $("#toDo").css("display", "inline");
  map.fitBounds(bounds);
}
