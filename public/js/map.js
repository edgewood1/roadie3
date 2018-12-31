// submit a new place
// select type
// geocode, draw map, markers

// begin process

$(document).ready(function() {
  // geoCode(place, type);
});

var place = "Durham, NC",
  type = ["museum"];
var totalData, input, newinput, type, map, current;

// on click for selecting place from modal

$("#themeplace").on("click", showDetails);

function showDetails(e) {
  place = e.target.dataset.name;
  theme = e.target.dataset.theme;
  current = {
    place: place,
    theme: theme
  };
  $.ajax({
    method: "POST",
    url: "/current",
    data: current
  });
  console.log(current);
  geoCode(current);
  $("#modal2").modal();

  placeInBLfromDb(current);
}

// on click for create and bucket tab buttons

$("#create").on("click", function(e) {
  $("#modal1").modal();
});

$("#place7").on("click", function(e) {
  // e.preventDefault();
  $("#themeplace").empty();
  var theme, place1;
  database.ref().on(
    "value",
    // datum level
    function(snapshot) {
      console.log(snapshot.val());
      // dynamic theme level
      snapshot.forEach(function(snapshop1) {
        // place level --
        snapshop1.forEach(function(snap) {
          place1 = snap.val().place;
          theme = snap.key;
          var message = theme + " : " + place1;
          var li = $("<li>");
          var a = $("<a>")
            .attr({
              class: "place2",
              "data-name": place1,
              "data-theme": theme
            })
            .text(message);
          li.append(a);
          $("#themeplace").append(li);
        });
      });
    },
    function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    }
  );
  $("#modal2").modal();
});

// enter new place --

var theme,
  datum = {};
$("#submit").on("click", function(e) {
  e.preventDefault();

  place = $("#place")
    .val()
    .trim();
  theme = $("#theme")
    .val()
    .trim();
  place = { place: place };
  datum[theme] = place;

  // add the new place to database

  database.ref().on(
    "value",
    function(snapshot) {
      database.ref().update({ datum });
    },
    function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    }
  );

  console.log(place);
  geoCode(place);
});

// 1. geoCode

var x, pyrmont;
function geoCode(current) {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: current.place }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      lat = parseFloat(results[0].geometry.location.lat());
      long = parseFloat(results[0].geometry.location.lng());
      pyrmont = new google.maps.LatLng(lat, long);

      initMap(pyrmont, current);
    } else {
      alert("Something got wrong " + status);
    }
  });
}

// 2. draw map

function initMap(pyrmont, current) {
  map = new google.maps.Map(document.getElementById("map"), {
    center: pyrmont,
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

  // Create the places service.
  var service = new google.maps.places.PlacesService(map);
  var getNextPage = null;
  var moreButton = document.getElementById("more");
  moreButton.onclick = function() {
    moreButton.disabled = true;
    if (getNextPage) getNextPage();
  };

  // Perform a nearby search.
  service.nearbySearch(
    { location: pyrmont, radius: 2000, type: [current.type] },
    function(results, status, pagination) {
      if (status !== "OK") return;
      console.log(results);

      createMarkers(results);
      moreButton.disabled = !pagination.hasNextPage;
      getNextPage =
        pagination.hasNextPage &&
        function() {
          pagination.nextPage();
        };
    }
  );
}

// 3. create markers

function createMarkers(places) {
  $("#places").empty();
  var bounds = new google.maps.LatLngBounds();
  var placesList = $("#places");
  placesList.empty();
  for (var i = 0, place; (place = places[i]); i++) {
    var image = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };
    // console.log(place);
    var marker = new google.maps.Marker({
      map: map,
      icon: image,
      title: place.name,
      position: place.geometry.location
    });

    // gets the place name and lists it on the "to do" list
    var li = $("<li>");
    li.attr("value", place.name);
    // if name clicked, move to bucketList
    li.click(placeInBucketList);
    li.text(place.name);
    placesList.append(li);

    bounds.extend(place.geometry.location);
  }

  map.fitBounds(bounds);
}
