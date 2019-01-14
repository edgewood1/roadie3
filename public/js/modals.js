// CREATE NEW PLACE -  MODAL1

$("#create").on("click", function(e) {
  $("#daily").css("display", "none")
  $("#modal1").modal();
});

$("#help").on("click", function(e) {
  $("#modal3").modal();
})

$("#submit").on("click", modalToDB)

function modalToDB(e) {
  e.preventDefault();
  var datum={}
 
  var place = $("#place")
    .val()
    .trim();
  var theme = $("#theme")
    .val()
    .trim(); 
 
  datum = {
    theme: theme,
    place: place, 
    bucketList: [],
    events: [] 
  };

  database.ref(theme+"/").update(datum);

  postAjax(datum);
  createMap(datum);
};

// SELECT OLD PLACE - MODAL2

$("#place7").on("click", function createPlaceModal() {
  $("#daily").css("display", "none");
  $("#modal2").modal();
  $("#themeplace").empty();
  var theme, place1;
  database.ref().on(
    "value",
    
    function(snapshot) {
      snapshot.forEach(function(snap) {
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
    },
    function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    }
  );
  //opens modal
  // $("#modal2").modal();
})

// SELECT THEME IN PLACES MODAL2
$("#themeplace").on("click", selectNewPlace);

// create current

function convertToCurrent(e) {
  var current = {
    place : e.target.dataset.name,
    theme : e.target.dataset.theme,
  }
  // closes modal
  $("#modal2").modal();

  return current;
}






