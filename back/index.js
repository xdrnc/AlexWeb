const express = require('express')
const app = express()
const cors = require('cors')
const port = 2999

const sunRadiusKM = 696340;
var currentPiDecimal = 2;
var LimitofPiDecimal = 10;


class DataCache {
    constructor(fetchFunction, minutesToLive = 10) {
      this.millisecondsToLive = minutesToLive * 60 * 1000;
      this.fetchFunction = fetchFunction;
      this.cache = null;
      this.getData = this.getData.bind(this);
      this.resetCache = this.resetCache.bind(this);
      this.isCacheExpired = this.isCacheExpired.bind(this);
      this.fetchDate = new Date(0);
    }
    isCacheExpired() {
      return (this.fetchDate.getTime() + this.millisecondsToLive) < new Date().getTime();
    }
    getData() {
      if (!this.cache || this.isCacheExpired()) {
        console.log('new/expired cache - fetching new data');
        return this.fetchFunction()
          .then((data) => {
            var processedData = data["data"].results;
            this.cache = processedData;
            this.fetchDate = new Date(); // set to current time
            return processedData;
        });
      } else {
        console.log('use data from cache');
        return Promise.resolve(this.cache);
      }
    }
    resetCache() { //alex: not used for now
     this.fetchDate = new Date(0); //1970-01-01T00:00:00.000Z
    }
}

//var piData = new Data


app.get('/calculate', cors(), (req, res) => {
//  console.log("current decimal: ", currentPiDecimal);
    var result = {
        pi: 3.14,
        sunCircumference: 2 * 3.14 * sunRadiusKM
    };
  
  currentPiDecimal ++;
  if(currentPiDecimal == LimitofPiDecimal)
  {
    LimitofPiDecimal += 10;
    //refresh cache
  }

//  console.log("limit of pi decimal: ", LimitofPiDecimal);
  res.json(result);
})

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`)
})