//
// Script for the options.html
//
//------------------------------------------------------------------------------
// Global variables
//------------------------------------------------------------------------------
var bgPage = chrome.extension.getBackgroundPage();
//
var departuresArray;

//------------------------------------------------------------------------------
// Main method: Everything starts here!
//------------------------------------------------------------------------------
function main() {
	showAllStations('#stationsDiv');
	refreshAllDepartures()
}

//------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------
function showAllStationsOLD(targetDiv) {
	var tableElement = $('<table>').addClass('stationsTable').appendTo($(targetDiv));
	for (var i in bgPage.stationsArray) {
		var trElement =$('<tr>').appendTo(tableElement);
		var tdElement =$('<td>').text(bgPage.stationsArray[i]).appendTo(trElement);
	}
}

//------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------
function showAllStations(targetDiv) {
	var selectElement = $('<select>').addClass('stationsTable').appendTo($(targetDiv));
	selectElement.select(function() {console.log(selectElement.value);});
	for (var i in bgPage.stationsArray) {
		var optionElement =$('<option>').attr({value:bgPage.stationsArray[i]}).text(bgPage.stationsArray[i]).appendTo(selectElement);
	}
	//
	selectElement['0'].value = bgPage.lastStation;
	//
	var buttonElement = $('<button>').text('Aktualisieren').appendTo($(targetDiv));
	buttonElement.click(function() {setStationAndRefreshAllDepartures(selectElement['0'].value);});
}

//------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------
function setStationAndRefreshAllDepartures(newStation) {
	bgPage.storeLastStation(newStation);
	refreshAllDepartures();
}

//------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------
function refreshAllDepartures() {
	console.log(bgPage.lastStation);
	//loadAllDepartures(bgPage.lastStation);
	showAllDepartures('#departuresDiv');
	
}

//------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------
function showAllDepartures(targetDiv) {
	$(targetDiv).empty();
	var tableElement = $('<table>').addClass('departuresTable').appendTo($(targetDiv));
	for (var i in departuresArray) {
		var trElement =$('<tr>').appendTo(tableElement);
		var tdElement =$('<td>').text(departuresArray[i].time).appendTo(trElement);
		var tdElement =$('<td>').text(departuresArray[i].line).appendTo(trElement);
		var tdElement =$('<td>').text(departuresArray[i].destination).appendTo(trElement);
	}
}


