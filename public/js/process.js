// MODAL 2 - SELECT NEW PLACE

function selectNewPlace(e) {
  
    var current = convertToCurrent(e)
    
    current = getDataForBucketList(current) 
    
    printBucketList(current)
    x = postAjax(current) 
    
    createMap(current)
  }


  // from map.js - click on TO DO and goes to BUCKET

function addToBucketList(bucketText) {
    console.log("hit", bucketText)
    
    var promise = new Promise(function(resolve, reject) {
      getAjax(resolve);
    })
    promise.then(function(current) {
      current["bucketText"] = bucketText;
      // var current = check(current);
      // console.log(data)
      console.log(current)
      current = pushBucketList(current)
      
      
      var promise2 = new Promise(function(resolve, reject) {
        resolve = postAjax(current);
      })
      promise.then(function(current) {
      console.log(current)
      })
      // current= saveNewBucketListItem(current)
      // current = getDataForBucketList(current)
      // printBucketList(current)
    })
  }