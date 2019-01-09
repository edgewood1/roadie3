
function map(data) { 
    var service = data.service;
    var map = data.map;
    console.log(data)
  map.setOptions({ scrollwheel: true });
  var input = document.getElementById("place");

  // auto complete >


  // Create the places service.
 
  var getNextPage = null;
  var moreButton = document.getElementById("more");
  moreButton.onclick = function() {
    moreButton.disabled = true;
    if (getNextPage) getNextPage();
  };

  // Perform a nearby search.
  service.nearbySearch(
    { location: pyrmont, radius: 2000, type: [type] },
    function(results, status, pagination) {
      if (status !== "OK") return;
 
      return (results)

    }
  );
}

module.exports = map;