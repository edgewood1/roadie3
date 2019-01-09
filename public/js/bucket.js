// 1. config -

 
function check(e) {
  // get item pressed
  var itemClicked = e.target.textContent

  // var itemClicked = $(this).attr("value");
  console.log(itemClicked)
  // loop through items in bucketlist
  if (bucketList.includes(itemClicked)){
       return false;
    } else {
      return itemClicked    
    }
}

function pushBucketList(itemClicked, current) {
  
  if (current.bucketList == undefined) {
    console.log("no bucket")
    current.bucketList = [itemClicked]
  } else {
    console.log("item added")
  current["bucketList"].push(itemClicked);
  }
  return current;

}

  // add new item to database

function saveNewBucketListItem(current) {
  
  database
    .ref(current.theme + "/bucketList")

    .update(
      current.bucketList
    );

}

function getDataForBucketList(current) {
  
  var data ={}
  database
    .ref(current.theme+"/")
    .on(
      "value",
      function(snapshot) {
        current = snapshot.val()
      },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    )
  return current
}


function printBucketList(current) {
  var bucket = $("#bucketText");
  bucket.empty();
console.log(current)
  if (current.bucketList == undefined) {
    console.log("no bucketlist")
  } else {
  current["bucketList"].forEach(function(e) {
    console.log(e);

    var li = $("<li>");
    y++;
    li.attr({
      value: e,
      draggable: true,
      id: "a" + y,
      ondragstart: "drag(event)"
    });

    li.text(e);
    bucket.append(li);
  });
  }
  $("#bucketList").css("display", "inline");
  $("#toDo").css("display", "inline");
  return current
  
}

var current = {};

function getCurrent(resolve) {
  console.log("hit ajax")
  return $.ajax({
    method: "GET",
    url: "/current",
    success: function(current) {
      resolve(current)
    }
  });
}


