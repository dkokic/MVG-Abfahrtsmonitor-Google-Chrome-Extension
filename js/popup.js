//
// Script for the popup.html
//
//------------------------------------------------------------------------------
// Global variables
//------------------------------------------------------------------------------
var bgPage = chrome.extension.getBackgroundPage();

//------------------------------------------------------------------------------
// Since Manifest v2 does not allow inline scripts and event handlers ...
//------------------------------------------------------------------------------
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-3928511-4']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

window.addEventListener("load", main);

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