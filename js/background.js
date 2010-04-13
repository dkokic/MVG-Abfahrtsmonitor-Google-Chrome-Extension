//
// Script for the background.html
//
//------------------------------------------------------------------------------
// Global variables
//------------------------------------------------------------------------------
//
var appConfig;
//
var mvgService = new ServiceObject('http://www.mvg-live.de/serviceV1', 'nda251Axtbtdx5Vw');
//
var stationsArray = [];

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
function ServiceObject(serviceUrl, apiKey) {
	this.serviceUrl = serviceUrl;
	this.apiKey = apiKey;
	this.getAllStationsUrl = function() {
		return this.serviceUrl + '/stations/json?apiKey=' + this.apiKey;
	};
	this.getStationInfoUrl = function(station) {
		return this.serviceUrl + '/departures/' + station + '/json?apiKey=' + this.apiKey;
	};
}
// 'http://www.mvg-live.de/serviceV1/stations/json?apiKey=nda251Axtbtdx5Vw';
// 'http://www.mvg-live.de/serviceV1/departures/Westfriedhof/json?apiKey=nda251Axtbtdx5Vw&maxEntries=50';

//------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------
function loadAllStations() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', mvgService.getAllStationsUrl(), false);
  xhr.onreadystatechange = function() {
    if (this.readyState == 4) {
      var responseObject = JSON.parse(this.responseText);
      console.log(responseObject);
      for (var index in responseObject.mvgLiveResponse.stations) {
        stationsArray.unshift(responseObject.mvgLiveResponse.stations[index].name);
      }
      stationsArray.sort();
      console.log(stationsArray);
    }
  };
  xhr.send();
}

