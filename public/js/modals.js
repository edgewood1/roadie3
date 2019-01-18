// CREATE NEW PLACE -  MODAL1

$(".create").on("click", function(e) {
  console.log("create");
  $("#daily").css("display", "none");
  $("#modal1").modal();
});

$("#submit").on("click", modalToDB);

function modalToDB(e) {
  e.preventDefault();
  var datum = {};

  var place = $("#place")
    .val()
    .trim();
  var theme = $("#theme")
    .val()
    .trim();
  var arrive = $("#arrive")
    .val()
    .trim();
  var depart = $("#depart")
    .val()
    .trim();

  var start = moment(arrive);
  var end = moment(depart);
  var duration = moment.duration(end.diff(start));
  var days = duration.asDays();
  console.log(days);
  datum = {
    theme: theme,
    place: place,
    arrive: arrive,
    depart: depart,
    days: days,
    bucketList: [],
    events: []
  };
  console.log(datum);
  database.ref(theme + "/").update(datum);

  postAjax(datum);
  createMap(datum);
}

// SELECT OLD PLACE - MODAL2

$(".place7").on("click", function createPlaceModal() {
  $("#daily").css("display", "none");
  $("#modal2").modal();
  $("td").empty();
  var theme, place1;
  database.ref().on(
    "value",

    function(snapshot) {
      snapshot.forEach(function(snap) {
        place1 = snap.val().place;
        theme = snap.key;
        var tr = $("<tr>");
        var td = $("<td>");
        if (place1) {
          var message = place1 + "  |  " + theme;

          var a = $("<a>")
            .attr({
              class: "place2",
              "data-name": place1,
              "data-theme": theme
            })
            .text(message);
          td.append(a);
          tr.append(td);
          $("#themeplace").append(tr);
        } else {
          var message = "Use the 'create' tab to create an event";
          td.text(message);
          tr.append(td);
          $("#themeplace").append(tr);
        }
      });
    },
    function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    }
  );
  //opens modal
  // $("#modal2").modal();
});

// SELECT THEME IN PLACES MODAL2
$("#themeplace").on("click", selectNewPlace);

// create current

function convertToCurrent(e) {
  var current = {
    place: e.target.dataset.name,
    theme: e.target.dataset.theme
  };
  // closes modal
  $("#modal2").modal();

  return current;
}

// modal 3 - help

$(".help").on("click", function(e) {
  console.log("help");
  $("#daily").css("display", "none");
  $("#modal3").modal();
});
