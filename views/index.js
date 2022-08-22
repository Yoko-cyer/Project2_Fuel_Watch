const fuelOne = document.getElementById("#1");

const getFuelStations = function () {
    var apiUrl = 'https://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS?Suburb=' + Karawara;
    console.log(apiUrl);

    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            displayFuelStations(data);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to find fuel stations near this area');
      });
  };
  
  
const displayFuelStations = function (data) {
    if (data.length === 0) {
      return;
    }
  
    for (let i = 0; i < data.length; i++) {
        let stationName = data[i].channel.item.title;

        fuelOne.textContent = stationName;        
    }
  };