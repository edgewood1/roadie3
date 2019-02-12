var contents = {
  pushBucketList: function(current) {
    if (current.bucketList == undefined) {
      current.bucketList = [current.bucketText];
    } else if (!current["bucketList"].includes(current["bucketText"])) {
      current["bucketList"].push(current["bucketText"]);
    }
    console.log("pushed bl", current);
    return current;
  },
  cleanBucketList: function(current) {
    console.log("3> cleanbucketlist");
    var count = 0;
    // current = JSON.parse(current);
    console.log(current);
    // make sure current contains a bucketlist / events
    if (!current["events"]) {
      current["events"] = {};
      current.events.eventsArr = [];
    }

    if (!current["bucketList"]) {
      current["bucketList"] = [];
    }

    // remove null from bucketList

    if (current["bucketList"]) {
      var newArray1 = current["bucketList"].filter(function(el) {
        if (el != null || el != "") {
          return el;
        } else {
          count++;
          console.log("removing ", el);
        }
      });
      console.log("newArray1 ", newArray1);
      current["bucketList"] = newArray1;
    }

    // make sure bucketList doesn't contain items from daily
    // create new bucketlist that doesn't contain dailies
    // if daily includes bucketlist item

    if (current.events["eventsArr"]) {
      var newArray2 = current["bucketList"].filter(function(el) {
        if (!current.events["eventsArr"].includes(el)) {
          return el;
        } else {
          count++;
          console.log("removing ", el);
        }
      });
      console.log("newArray2 ", newArray2);
      current["bucketList"] = newArray2;

      console.log("cleaned " + count + " items from bucketlist");
    }
    console.log("new bucket list ", current);
    return current;
  }
};

module.exports = contents;
