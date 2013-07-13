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
  var mvgURL = 'http://www.mvg-live.de/ims/dfiStaticAnzeige.svc?haltestelle=' + escape(bgPage.lastStation) + '&ubahn=checked&bus=checked&tram=checked&sbahn=';
  var xhr = new XMLHttpRequest();
  xhr.open('GET', mvgURL, true);
  xhr.onreadystatechange = function() {
    console.log(this.readyState);
    if (this.readyState == 4) {
      console.log(this.responseText);
      var responseDOM = $(this.responseText);
      responseDOM.appendTo('body');
      $.each($('.stationColumn'), function(index, element) { $(element).text($.trim($(element).text())); });
      $('#intermezzo').remove();
    }
  };
  xhr.send();
  $('<div>').attr({id: 'intermezzo'}).text('Bitte warten ...').appendTo('body');
}

// http://www.mvg-live.de/ims/dfiStaticAnzeige.svc?haltestelle=Am+M%fcnchner+Tor&ubahn=checked&bus=checked&tram=checked&sbahn=