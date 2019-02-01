// select type

// $(".type").on("click", function(e) {
//   input = $(this)
//     .attr("value")
//     .toLowerCase();
//   type = null;

//   type = t[input];

//   initMap(pyrmont, type);

// });

var t = [];
t.sacred = [
  "cemetery",
  "church",
  "hindu_temple",
  "mosque",
  "synagogue",
  "campground"
];
t.collections = [
  "aquarium",
  "art_gallery",
  "book_store",
  "library",
  "movie_theater",
  "museum",
  "zoo",
  "bicycle_store"
];
t.amusements = [
  "spa",
  "amusement_park",
  "bowling_alley",
  "casino",
  "night_club",
  "bar",
  "stadium",
  "gym",
  "stores"
];
t.nourishment = [
  "bakery",
  "cafe",
  "liquor_store",
  "meal_delivery",
  "meal_takeaway",
  "restaurant"
];

function cleanBucketList(current) {
  console.log("cleanBucket! ", current);
  var count = 0;

  if (!current["events"]) {
    current["events"] = {};
    current.events.eventsArr = [];
  }

  if (!current["bucketList"]) {
    current["bucketList"] = [];
  }

  // remove null from bucketList

  if (current["bucketList"]) {
    var newArray = current["bucketList"].filter(function(el) {
      if (el != null || el != "") {
        count++;
        return el;
      }
    });
    current["bucketList"] = newArray;
  }

  // make sure toDo doesn't include items from bucketlist

  if (current.events["eventsArr"]) {
    current["bucketList"].forEach(function(elem, item) {
      // console.log("events Array - ", events["eventsArr"]);
      // if (events["eventsArr"]) {
      if (current.events["eventsArr"].includes(elem)) {
        console.log(elem + "is in the events array");
        count++;
        current.bucketList[item] = null;
      }
      // }
    });
  }
  // make sure dailys not in bucket List

  // remove nulls from bucketList
  if (current["bucketList"]) {
    var newArray = current["bucketList"].filter(function(el) {
      if (el != null || el != "") {
        count++;
        return el;
      }
    });

    current["bucketList"] = newArray;
    console.log("number of clean ups: ", count);
  }
  return current;
}

// add new item to database

function saveBucketList(current) {
  database.ref(current.theme + "/").update({
    bucketList: current.bucketList
  });
  return current;
}
