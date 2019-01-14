// MODAL 2 - SELECT NEW PLACE

function selectNewPlace(e) {
    // create current
    var current = convertToCurrent(e)
    // call db to get rest of data
    current = initialReadDB(current) 
    // clean bucketList
    current = cleanBucketList(current)
    // print bucketlist, minus events
    printBucketList(current)
    // save db data to current
    x = postAjax(current) 
    console.log(current)
    // create a map and todo  (minus bucklist + event items)
    createMap(current)
  }


  // if you add to bucketList

function addToBucketList(bucketText) {
    console.log("hit", bucketText)
    // get current
    new Promise(function(resolve, reject) {
      getAjax(resolve);
    }).then(function(current) {
      // add new bucketItem to current
      current["bucketText"] = bucketText;
    
      current = pushBucketList(current)

     
      current = cleanBucketList(current)
       // add bucketItem to bucketList

      new Promise(function(resolve, reject) {
        resolve = postAjax(current);
      }).then(function(current) {
      console.log("added to current!", current)
      })

       printBucketList(current)
    })
  }

  function schedule() {
    
  }

