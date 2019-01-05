var theme;
var datum,
  current = {};

// CREATE NEW PLACE -  MODAL1

$("#create").on("click", function(e) {
  $("#modal1").modal();
});

// CREATE NEW PLACE - MODAL 1

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

// SELECT OLD PLACE - MODAL2

$("#place7").on("click", getSavedThemes);

function getSavedThemes() {
  console.log("hit");
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
          console.log(message);
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
}

// SELECT THEME IN PLACES MODAL2

$("#themeplace").on("click", storeAjax);

function storeAjax(e) {
  //   if (window.location.pathname === "/") {
  //     window.location += "bucket.html";
  //   }
  current.place = e.target.dataset.name;
  current.theme = e.target.dataset.theme;
  console.log("hit");
  $.ajax({
    method: "POST",
    url: "/current",
    data: current
  });

  $("#modal2").modal();

  geoCode(current);
  placeInBLfromDb(current);
}
// function openBucket() {
//   console.log(window.location.pathname);
//   if (window.location.pathname == "/") {
//     window.location += "bucket.html";
//     console.log("open");
//   }

//   geoCode(current);

//   placeInBLfromDb(current);
