//
// Script for the popup.html
//
//------------------------------------------------------------------------------
// Global variables
//------------------------------------------------------------------------------
var bgPage = chrome.extension.getBackgroundPage();

//------------------------------------------------------------------------------
// Main method: Everything starts here!
//------------------------------------------------------------------------------
function main() {
  var mvgURL = 'http://www.mvg-live.de/serviceV1/departures/Westfriedhof/json?apiKey=nda251Axtbtdx5Vw&maxEntries=50';
  var xhr = new XMLHttpRequest();
  xhr.open('GET', mvgURL, false);
  xhr.onreadystatechange = function() {
    if (this.readyState == 4) {
      var responseObject = JSON.parse(this.responseText);
      console.log(responseObject);
      for (var index in responseObject.mvgLiveResponse.stations) {
        stationArray.unshift(responseObject.mvgLiveResponse.stations[index].name);
      }
      stationArray.sort();
      console.log(stationArray);
    }
  };
  xhr.send();

}
