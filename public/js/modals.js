// CREATE NEW PLACE -  MODAL1

$("#create").on("click", function(e) {
  $("#modal1").modal();
});

$("#submit").on("click", function(e) {
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
  }

  database.ref(theme+"/").update(datum)

  postAjax(datum)
  geoCode(datum)
});

// SELECT OLD PLACE - MODAL2

$("#place7").on("click", createPlaceModal);

function createPlaceModal() {
 
  $("#themeplace").empty();
  var theme, place1;
  database.ref().on(
    "value",
    
    function(snapshot) {
      console.log(snapshot.val());
      
      snapshot.forEach(function(snap) {
        
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
    },
    function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    }
  );
  //opens modal
  $("#modal2").modal();
}

// SELECT THEME IN PLACES MODAL2

$("#themeplace").on("click", selectNewPlace);

// MODAL 2 - SELECT NEW PLACE

function selectNewPlace(e) {
  var current = convertToCurrent(e)
  current = getDataForBucketList(current) 
  printBucketList(current)
  postAjax(current)
  geoCode(current)
}

function addToBucketList(e) {
  var itemClicked = check(e)
 
  var promise = new Promise(function(resolve, reject) {
    getCurrent(resolve);
  })
  promise.then(function(data) {
    data = pushBucketList(itemClicked, data)
    postAjax(data)
    saveNewBucketListItem(data)
    current = getDataForBucketList(data)
    printBucketList(data)

  })
}

function convertToCurrent(e) {

  var current = {
    place : e.target.dataset.name,
    theme : e.target.dataset.theme,
  }
  // closes modal
  $("#modal2").modal();

  return current;

}

function postAjax(current) {

  $.post( "/current", current, function(data) {
     
      console.log("success", data)
    
  }).fail(function(error) {
    console.log("error ", error);
  })

  // closes modal
  $("#modal2").modal();
  $("body").css("overflow", "auto");
 
}
