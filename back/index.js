const express = require('express')
const app = express()
const cors = require('cors')
const port = 2999

const PI4 = require('./CalculatePI4');
const { RSA_NO_PADDING } = require('constants');

const sunRadiusKM = 696340;
var LimitofPiDecimal = 10;
var currentProcessedPi = "3.1"; //starting from 3.1 because I directly append with next element in the first call
var currentPiDecimal = 1; // because starting from .1


var forceCacheRefresh = false;
class DataCache {
    constructor(fetchFunction, minutesToLive = 10) {
      //this.millisecondsToLive = minutesToLive * 60 * 1000;
      this.fetchFunction = fetchFunction;
      this.cache = null;
      this.getData = this.getData.bind(this);
      //this.resetCache = this.resetCache.bind(this);
      this.isCacheExpired = this.isCacheExpired.bind(this);
      this.fetchDate = new Date(0);
    }
    isCacheExpired() {
      return (forceCacheRefresh);// || (this.fetchDate.getTime() + this.millisecondsToLive) < new Date().getTime());
    }
    getData() {
      if (!this.cache || this.isCacheExpired()) {
        console.log('new/expired cache - fetching new data');

        var processedData = this.fetchFunction(); // execute heavy method to calculate pi for example
        this.cache = processedData;
//        this.fetchDate = new Date(); // set to current time
        forceCacheRefresh = false;

        return processedData;
      } 
      else 
      {
        console.log('use data from cache');
        return this.cache; 
      }
    }
}


//alextodo return the string of the current pi value with the length based on the current limit of decimal point
calcPiValue = () => {
  console.log("call calc pi value, expect to call this at either the first request or after the decimal limit has been reached/renewed");

  var currentPi = PI4.calcPi(LimitofPiDecimal);

  return currentPi;
}
var piValue = new DataCache(calcPiValue);


// alextodo: increase index of string based on "currentPiDecimal" value
piIncreaseDecimal = () => {
  if(currentProcessedPi.length < 30)
  {
    console.log("inc decimal call piValue getData");
    let totalPiInString = piValue.getData();
    console.log("totalPiInString: ", totalPiInString);
    currentProcessedPi = currentProcessedPi + totalPiInString[currentPiDecimal+2]; 
  }
  return currentProcessedPi;
}


app.get('/calculate', cors(), (req, res) => {
  if((req.headers != null) 
  && (req.headers.origin != null) 
  && req.headers.origin === "http://localhost:3000")
  {
    var result = {
        pi: piIncreaseDecimal(),
        sunCircumferenceKM: 2 * 3.14 * sunRadiusKM
    };
    
    currentPiDecimal ++;
    if((currentPiDecimal == LimitofPiDecimal) && (LimitofPiDecimal < 30)) //alexnote: limit of 30 according to the solution in CalculatePI4
    {
      LimitofPiDecimal += 10;
      forceCacheRefresh = true;
    }
    
    res.json(result);
  }
  else
  {
    res.send("only certain client is allowed to access");
  }
})

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`)
})