//
// Script for the background.html
//
//------------------------------------------------------------------------------
// Global variables
//------------------------------------------------------------------------------
//
var appConfig;
//
var stationArray = [];

//------------------------------------------------------------------------------
//Main method: Everything starts here!
//------------------------------------------------------------------------------
function main() {
  loadAppConfig();
  // Restore state from localStorage
  restoreState();
  //
  loadAllStations();
}

//------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------
function loadAppConfig() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', chrome.extension.getURL('manifest.json'), false);
  xhr.onreadystatechange = function() {
    if (this.readyState == 4) {
      appConfig = JSON.parse(this.responseText);
    }
  };
  xhr.send();
}

//------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------
function restoreState() {
  var storedVersion = localStorage['version'];
  if (appConfig.version != storedVersion) {
    chrome.tabs.create({'url': chrome.extension.getURL('infonews.html'), 'selected': true}, function(tab) {
      // Tab opened: possible migration procedures
    });
    localStorage.setItem('version', appConfig.version);
  }
  //
}

//------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------
function loadAllStations() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://www.mvg-live.de/serviceV1/stations/json?apiKey=nda251Axtbtdx5Vw', false);
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

