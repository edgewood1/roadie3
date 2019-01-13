var map;
var place = "Durham, NC";

$(document).ready(function() {
  $(".dropdown-trigger").dropdown();
  $(".collapsible").collapsible();

  createMap(place);
});

$("#submit").on("click", function(e) {
  e.preventDefault();
  place = $("#place")
    .val()
    .trim();
  console.log(place);
  geoCode(place);
});

function initMap(pyrmont) {
  // geoCode(pyrmont);

  // dropDown();
  console.log(pyrmont);

  map = new google.maps.Map(document.getElementById("map"), {
    // center: new google.maps.LatLng(pyrmont[0], pyrmont[1]),
    center: pyrmont,
    zoom: 25
  });
  map.setOptions({ scrollwheel: true });
  var input = document.getElementById("place");

  // auto complete >

  var autocomplete = new google.maps.places.Autocomplete(input);

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
    { location: pyrmont, radius: 1000, type: ["museum"] },
    function(results, status, pagination) {
      if (status !== "OK") return;

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

function createMarkers(places) {
  var bounds = new google.maps.LatLngBounds();
  var placesList = document.getElementById("places");

  for (var i = 0, place; (place = places[i]); i++) {
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

    // var li = document.createElement("li");
    // li.textContent = place.name;
    // placesList.appendChild(li);

    bounds.extend(place.geometry.location);
  }
  map.fitBounds(bounds);
}
var x;
function geoCode(place) {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: place }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      lat = parseFloat(results[0].geometry.location.lat());
      long = parseFloat(results[0].geometry.location.lng());
      x = new google.maps.LatLng(lat, long);
      // if (lat > 0) {
      //   lat = `+lat`;
      // } else if (lng > 0) {
      //   lng = `+lng`;
      // }

      // pyrmont = { lat: lat, lng: long };
      pyrmont = [lat, long];
      initMap(x);
      // return pyrmont;
      // return x;
    } else {
      alert("Something got wrong " + status);
    }
  });
}

function dropDown() {
  var t = [
    {
      sacred: [
        "cemetery",
        "church",
        "hindu_temple",
        "mosque",
        "synagogue",
        "campground"
      ],
      collections: [
        "aquarium",
        "art_gallery",
        "book_store",
        "library",
        "movie_theater",
        "museum",
        "zoo",
        "bicycle_store"
      ],

      amusement: [
        "spa",
        "amusement_park",
        "bowling_alley",
        "casino",
        "night_club",
        "bar",
        "stadium",
        "gym",
        "stores"
      ],
      supplies: [
        "bakery",
        "cafe",
        "liquor_store",
        "meal_delivery",
        "meal_takeaway",
        "restaurant"
      ]
    }
  ];

  {
    /* <div class="collapsible-header"><i class="material-icons" id="amusement">spectacle</i>First</div>
      <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div> */
  }
  t[0].meditation.forEach(function(t, i) {
    var option = $("<div>").attr({ value: t, class: "collapsible-body" });
    option.append("<span>").text(t);
    console.log(t);
    $("#amusement").after(option);
  });
}
