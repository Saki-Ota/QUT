import {
  displayFlightsInfo,
  findFlightWithAirportsIata,
  findFlightWithAirlineName,
  findFlightsCodeshare,
  findAircraftByType,
  calculateTimeDifference,
  calculateDistance,
  getDataForAnalysis,
  getMinimum,
  getMaximum,
  getAverage,
  findAirportByIata
} from './step3.js';


const sourceAiportDropdown = document.getElementById("filterSourceAirportSelect");
const destinationAirportDropdown = document.getElementById("filterDestinationAirportSelect");
const airlineDropdown = document.getElementById("filterAirlineSelect");
const aircraftDropdown = document.getElementById("filterAircraftSelect");
const cityDropdown = document.getElementById("filterCitySelect");
const searchButton = document.getElementById("searchButton");
const flightFilteredDisplay = document.getElementById("flightFilterDisplayDiv");
const flightResultDisplay = flightFilteredDisplay.appendChild(document.createElement("div"));
const airportFilteredDisplay = document.getElementById("airportFilterDisplayDiv");
const airportResultDisplay = airportFilteredDisplay.appendChild(document.createElement("div"));
const airportSearchButton = document.getElementById("searchAirportButton");
const searchTermInput = document.getElementById("filterSearchTermInput");
const largerstNumberOfFlightsButton = document.getElementById("searchAirportPairButton");
const greatestTimeDifferenceButton = document.getElementById("greatestTimeDifferenceButton");
const greatestDistanceButton = document.getElementById("greatestDistanceButton");
const airportStatisticsDisplay = document.getElementById("airportStatisticDisplayDiv");


// Get list of aiports by its IATA
const getAirportOptionsList = function (dataset, item) {
  let options = [];
  for (let i = 0; i < dataset.length; i++) {
    let data = dataset[i];
    if (!options.find((option) => option === data[item].iata)) {
      options.push(data[item].iata);
    }
  }
  return options.sort();
};

// Get list of airline
const getAirlineOptionsList = function (dataset, item) {
  let options = [];
  for (let i = 0; i < dataset.length; i++) {
    let data = dataset[i];
    if (!options.find((option) => option === data[item].name)) {
      options.push(data[item].name);
    }
  }
  return options;
};

// Get aircraft list
const getAircraftOptionList = function (dataset, item) {
  let results = [];
  let options = [];
  dataset.forEach((data) => {
    for (let i = 0; i < data[item].length; i++) {
      let aircraft = data[item][i];
      results.push(aircraft);
    }
  });

  for (let t = 0; t < results.length; t++) {
    let result = results[t];
    if (!options.find((option) => option === result)) {
      options.push(result);
    }
  }

  return options.sort();
};

const getAiportNameOptionsList = function (dataset) {
  return dataset.map((data) => data.name)
};

// Adding aiprot options on dropdown
const addOptions = function (id, optionList) {
  const selectedElement = document.getElementById(id);
  optionList.forEach((option) => {
    let optionElement = selectedElement.appendChild(
      document.createElement("option")
    );
    optionElement.value = option;
    optionElement.innerHTML = option;
  });
};

// DOM operation - interate throught search results and add elements to div
const showSearchResults = function(results){
    const flightsResultsTitle = flightResultDisplay.appendChild(
      document.createElement("h3")
    );
    flightsResultsTitle.innerHTML = "Flights Details";
    if (results.length === 0) {
      let noMatchingMessage = flightResultDisplay.appendChild(
        document.createElement("p")
      );
      noMatchingMessage.innerHTML = "No matching flights found";
    }

    for (const flight of results) {
      let sourceAirportName = flightResultDisplay.appendChild(
        document.createElement("p")
      );
      sourceAirportName.innerHTML = `Source Aiprot: ${flight.source_airport.name}`;

      let destinationAirportName = flightResultDisplay.appendChild(
        document.createElement("p")
      );
      destinationAirportName.innerHTML = `Destination Airport: ${flight.destination_airport.name}`;

      let airlineName = flightResultDisplay.appendChild(
        document.createElement("p")
      );
      airlineName.innerHTML = `Airline: ${flight.airline.name}`;

      let aircraftList = flight.aircraft;
      aircraftList.forEach((aircraft) => {
        let aircraftName = flightResultDisplay.appendChild(
          document.createElement("p")
        );
        aircraftName.innerHTML = `Aircraft: ${aircraft}`;
      });

      let distance = flightResultDisplay.appendChild(
        document.createElement("p")
      );
      let calculatedDistance = calculateDistance(
        results,
        flight.source_airport.iata,
        flight.destination_airport.iata
      );
      distance.innerHTML = `Distance: ${calculatedDistance} km`;

      let timeDifference = flightResultDisplay.appendChild(
        document.createElement("p")
      );
      let calculatedTimeDifference = calculateTimeDifference(
        results,
        flight.source_airport.iata,
        flight.destination_airport.iata
      );
      timeDifference.innerHTML = `Time difference: ${calculatedTimeDifference} Hour`;

      flightResultDisplay.appendChild(document.createElement("hr"));
    }
}

// Filter flights and show the results
const searchEvent = function(dataset){
let sourceAirportValue = "Any";
let destinationAiportValue = "Any";
let airlineValue = "Any";
let aircraftValue = "Any";

sourceAiportDropdown.addEventListener("change", () => {
  sourceAirportValue = sourceAiportDropdown.value;
  airlineDropdown.disabled = true;
  aircraftDropdown.disabled = true;
});
destinationAirportDropdown.addEventListener("change", () => {
  destinationAiportValue = destinationAirportDropdown.value;
  airlineDropdown.disabled = true;
  aircraftDropdown.disabled = true;
});
airlineDropdown.addEventListener("change", () => {
  airlineValue = airlineDropdown.value;
  sourceAiportDropdown.disabled = true;
  destinationAirportDropdown.disabled = true;
  aircraftDropdown.disabled = true;
});
aircraftDropdown.addEventListener("change", () => {
  aircraftValue = aircraftDropdown.value;
  sourceAiportDropdown.disabled = true; 
  destinationAirportDropdown.disabled = true;
  airlineDropdown.disabled = true;
});

searchButton.addEventListener("click", () => {
    flightResultDisplay.innerHTML = "";

    let results = [];
    if (!sourceAiportDropdown.disabled && !destinationAirportDropdown.disabled) {
     results = findFlightWithAirportsIata(dataset,sourceAirportValue,destinationAiportValue).splice(0, 10);
    } else if (!airlineDropdown.disabled) {
      results = findFlightWithAirlineName(dataset, airlineValue).splice(0, 10);
    } else if (!aircraftDropdown.disabled) {
      results = findAircraftByType(dataset, aircraftValue).splice(0, 10);
    };
      
    // Adding element to div
    showSearchResults(results);
});
};

// Clear button to clear the search results however it does not reset the dropdown
const cleaerButton = document.getElementById("clearButton");
cleaerButton.addEventListener("click", () => {
  flightResultDisplay.innerHTML = "";
  sourceAiportDropdown.disabled = false;
  destinationAirportDropdown.disabled = false;
  airlineDropdown.disabled = false;
  aircraftDropdown.disabled = false;
  sourceAiportDropdown.selectedValue = "Any";
});


// click search button to filter flights
const flightSearch = function (dataset) {
flightResultDisplay.innerHTML = ""; 
searchEvent(dataset);
};

// DOM operation - interate throught search results and add elements to Airport div
const showAirportResults = function (results) {
  const airportResultsTitle = airportResultDisplay.appendChild(
    document.createElement("h3")
  );
  airportResultsTitle.innerHTML = "Airports Details";
  if (results.length === 0) {
    let noMatchingMessage = airportResultDisplay.appendChild(
      document.createElement("p")
    );
    noMatchingMessage.innerHTML = "No matching airports found";
  }

for (const result of results) {
  
    let airportName = airportResultDisplay.appendChild(
      document.createElement("p")
    );
    airportName.innerHTML = `Airport: ${result.name}`;

    let cityName = airportResultDisplay.appendChild(
      document.createElement("p")
    );
    cityName.innerHTML = `City: ${result.city}`;

    let countryName = airportResultDisplay.appendChild(
      document.createElement("p")
    );
    countryName.innerHTML = `Country: ${result.country}`;

    airportResultDisplay.appendChild(document.createElement("hr"));
  
}
};

// Filter airports by IATA and show the results
const airportSearchByIata = function (dataset) {
    cityDropdown.addEventListener("change", () => {
    airportResultDisplay.innerHTML = "";
    let airportIata = cityDropdown.value;
    let results = findAirportByIata(dataset, airportIata);
    showAirportResults(results);
  });
};

// search airport by keywork search
const searchAiportByKeyword = function (dataset, keyword) {
    if(keyword === "") {
      return [];
    }
  return dataset.filter((data) => {
    return (
      data.name.toLowerCase().includes(keyword.toLowerCase()) ||
      data.city.toLowerCase().includes(keyword.toLowerCase()) ||
      data.country.toLowerCase().includes(keyword.toLowerCase())
    );
  });
};

const airportSearchEvent  = function(dataset){
airportSearchButton.addEventListener("click", () => {
  airportResultDisplay.innerHTML = "";
  let keyword = searchTermInput.value;
  let results = searchAiportByKeyword(dataset, keyword);
  showAirportResults(results);
});
};

// Clear button to clear the search results however it does not reset the dropdown
const airportClearButton = document.getElementById("clearAirportButton");
airportClearButton.addEventListener("click", () => {
  airportResultDisplay.innerHTML = "";
  cityDropdown.selectedValue = "Any";
});


// Get list of pairs of airports that have the largest number of flights
const getMostFrequentAirports = function (dataset) {
    let airportPairs = [];
    const maxFlights = getMaximum(dataset, "number_of_flights");
    console.log(maxFlights)
    dataset.forEach((data) => {
      if (data.number_of_flights === maxFlights) {
        airportPairs.push(data);
      }
    });

    return airportPairs;
};

// Get list of the flight with the greatest time difference
const getGreatestTimeDifferenceFilights = function (dataset) {
  let timeDifference = [];
  const maxTimeDifference = getMaximum(dataset, "time_difference");
  dataset.forEach((data) => {
    if (data.time_difference === maxTimeDifference) {
      timeDifference.push(data);
    }
  });
  return timeDifference;
}

// Get the flight with the greatest distance
const getGreatestDistanceFlights = function (dataset) {
  let distance = [];
  const maxDistance = getMaximum(dataset, "distance");
  dataset.forEach((data) => {
    if (data.distance === maxDistance) {
      distance.push(data);
    }
  });
  return distance;
};

// Trigger event on click to show the flight with the greatest frequenct of flights
const showGreatNumberOfFlight = function(dataset) {
    largerstNumberOfFlightsButton.addEventListener("click", () => {
      airportStatisticsDisplay.innerHTML = "";
      const maxFlights = getMaximum(dataset, "number_of_flights");
      let results = getMostFrequentAirports(dataset);
      const airportResultsTitle = airportStatisticsDisplay.appendChild(
        document.createElement("h3")
      );
      airportResultsTitle.innerHTML = "Most Frequent flights Airports pair";
      if (results.length === 0) {
        let noMatchingMessage = airportStatisticsDisplay.appendChild(
          document.createElement("p")
        );
        noMatchingMessage.innerHTML = "No result found";
      }
      let showResults = airportStatisticsDisplay.appendChild(
        document.createElement("p")
      );
      showResults.innerHTML = `Number of Flights: ${maxFlights} Airports Pair : ${results[0].source_airport} and ${results[0].destination_airport}`;
    });
};

// Trigger event on click to show the flight with the greatest time difference
const showGreatestTimeDifference = function(dataset) {
    greatestTimeDifferenceButton.addEventListener("click", () => {
      airportStatisticsDisplay.innerHTML = "";
      const maxTimeDifference = getMaximum(dataset, "time_difference");
      let results = getGreatestTimeDifferenceFilights(dataset);
      const airportResultsTitle = airportStatisticsDisplay.appendChild(
        document.createElement("h3")
      );
      airportResultsTitle.innerHTML = "Greatest Time Difference Aiprports pair";
      if (results.length === 0) {
        let noMatchingMessage = airportStatisticsDisplay.appendChild(
          document.createElement("p")
        );
        noMatchingMessage.innerHTML = "No result found";
      }
      let showResults = airportStatisticsDisplay.appendChild(
        document.createElement("p")
      );
      showResults.innerHTML = `Time Difference: ${maxTimeDifference} Hours:   Airports Pair : ${results[0].source_airport} and ${results[0].destination_airport}`;
    });
};

// Trigger event on click to show the flight with the greatest distance
const showGreatestDistance = function(dataset) {
    greatestDistanceButton.addEventListener("click", () => {
      airportStatisticsDisplay.innerHTML = "";
      const maxDistance = getMaximum(dataset, "distance");
      let results = getGreatestDistanceFlights(dataset);
      const airportResultsTitle = airportStatisticsDisplay.appendChild(
        document.createElement("h3")
      );
      airportResultsTitle.innerHTML = "Greatest Distance Aiprports pair";
      if (results.length === 0) {
        let noMatchingMessage = airportStatisticsDisplay.appendChild(
          document.createElement("p")
        );
        noMatchingMessage.innerHTML = "No result found";
      }
      let showResults = airportStatisticsDisplay.appendChild(
        document.createElement("p")
      );
      showResults.innerHTML = `Distance: ${maxDistance} km Airports Pair : ${results[0].source_airport} and ${results[0].destination_airport}`;
    });
};



export {
  getAirportOptionsList,
  getAirlineOptionsList,
  getAircraftOptionList,
  addOptions,
  flightSearch,
  showSearchResults,
  searchEvent,
  airportSearchByIata,
  getAiportNameOptionsList,
  searchAiportByKeyword,
  airportSearchEvent,
  getMostFrequentAirports,
  getGreatestTimeDifferenceFilights,
  getGreatestDistanceFlights,
  showGreatNumberOfFlight,
  showGreatestTimeDifference,
  showGreatestDistance

};
