//const fuelOne = document.getElementById("#1");
const XMLHttpRequest = require('xhr2');

const xhttp = new XMLHttpRequest();

function loadXML () {
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const resText = xhttp.responseText;
      console.log(resText);
      const prices = resText.responseXML.getElementsByTagName("price")[1];
      console.log(prices);
     }
  };
}
xhttp.open("GET", "https://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS?Suburb=Karawara", true);
xhttp.send();

function getXML(xml) {
    const xmlDoc = xml.responseXML;
    const prices = xmlDoc.getElementsByTagName("price")[0];
    console.log(prices);

}
  
  
const displayFuelStations = function (data) {
    if (data.length === 0) {
      return;
    }
  
    for (let i = 0; i < data.length; i++) {
        let stationName = data[i].channel.item.title;

        fuelOne.textContent = stationName;        
    }
  };
  loadXML();