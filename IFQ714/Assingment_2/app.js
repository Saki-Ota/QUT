const fs = require("fs");
const path = require("path");

// Step 1 - loading data sources
const airports = require("./A2_Airports.json");
const flights = require("./A2_Flights.json");
const { timeStamp } = require("console");


// Creat a new array of flight information objects, replacing source_aiport and desitination_aiport value to airport information by using the findMatchingAirpot()
const getNewFlightsData = function (flights, airports) {
  return flights.map((flight) => {
    return {
      source_airport: airports.find(
        (airport) => airport.id === flight.source_airport_id
      ),
      destination_airport: airports.find(
        (airport) => airport.id === flight.destination_airport_id
      ),
      codeshare: flight.codeshare,
      aircraft: flight.aircraft,
      airline: {
        code: flight.airline_code,
        name: flight.airline_name,
        country: flight.airline_country,
      },
    };
  });
};

// Step2 - Map function
// Create a new set of data with source and destination airports' latitude and longitude
const getLatitudeLongitudeTimestamp = function (dataset) {
  return dataset.map((data) => {
    return {
      timeStamp: new Date().toISOString(),
      sourceAirport: {
        latitude: data.source_airport.latitude,
        longitude: data.source_airport.longitude,
      },
      destination_airport: {
        latitude: data.destination_airport.latitude,
        longitude: data.destination_airport.longitude,
      },
    };
  });
};

const newFlightsData = getNewFlightsData(flights, airports);

// Step3
//  Display information on all flight in the dataset
const displayFlightsInfo = function (dataset) {
  return console.log(dataset);
};

// Display all flights that match with an airport name.
const findFlightWithAirportsIata = function (
  dataset,
  sourceAriport,
  destinationAirport
) {
  if (sourceAriport === "Any" && destinationAirport === "Any") {
    return dataset;
  }

  // Case: source is "Any" — filter only by destination
  if (sourceAriport === "Any") {
    return dataset.filter((flight) => flight.destination_airport.iata === destinationAirport);
  }

  // Case: destination is "Any" — filter only by source
  if (destinationAirport === "Any") {
    return dataset.filter(
      (flight) => flight.source_airport.iata === sourceAriport
    );
  }

  // Case: both are specific — filter by both
  return dataset.filter(
    (flight) =>
      flight.source_airport.iata === sourceAriport &&
      flight.destination_airport.iata === destinationAirport
  );
};

// Display all flights that matach with airline name
const findFlightWithAirlineName = function (dataset, airlineName) {
  if(airlineName === "Any"){
    return dataset;
  }  
  return dataset.filter((data) => data.airline.name === airlineName);
};

// Display all fights that match with codeshare boolean
const findFlightsCodeshare = function (dataset, codeshareBoolean) {
  return dataset.filter((data) => data.codeshare === codeshareBoolean);
};

// Display all flights that mtach with aircraf type
const findAircraftByType = function (dataset, aircraftType) {
  return dataset.filter((data) => data.aircraft.includes(aircraftType));
};

// Calculate time difference
const calculateTimeDifference = function (
  dataset,
  sourceAriportIata,
  destinationAirportIata
) {
  let sourceAirport = dataset.find(
    (data) => data.source_airport.iata === sourceAriportIata
  );
  let destinationAirport = dataset.find(
    (data) => data.destination_airport.iata == destinationAirportIata
  );
  return Math.abs(
    sourceAirport.source_airport.timezone -
      destinationAirport.destination_airport.timezone
  );
};

// Calculate distance between two airports: The formula is from https://qiita.com/y_tsubasa/items/690b31fa2cacaf439762
const calculateDistance = function (
  dataset,
  sourceAirport,
  destinationAirport
) {
  const airportsData = findFlightWithAirportsIata(
    dataset,
    sourceAirport,
    destinationAirport
  )[0];
  const R = Math.PI / 180;
  const sourceLatitude = airportsData.source_airport.latitude * R;
  const sourceLongitude = airportsData.source_airport.longitude * R;
  const destinationLatitude = airportsData.destination_airport.latitude * R;
  const destinationLongitude = airportsData.destination_airport.longitude * R;
  const distance = 6371 * Math.acos(Math.cos(sourceLatitude) * Math.cos(destinationLatitude) * Math.cos(destinationLongitude- sourceLongitude) + Math.sin(sourceLatitude) * Math.sin(destinationLatitude))
  return Math.floor(distance *100) / 100;
};

// Get number of flight between airports
const calculateNumberOfFlight = function (
  dataset,
  sourceAirport,
  destinationAirport
) {
  const num1 = findFlightWithAirportsIata(
    dataset,
    sourceAirport,
    destinationAirport
  ).length;
  const num2 = findFlightWithAirportsIata(
    dataset,
    destinationAirport,
    sourceAirport
  ).length;
  return num1 + num2;
};

// Extract necessary data from dataset for analysis
const getDataForAnalysis = function (dataset) {
  return dataset.map((data, index) => {
    return {
      id: index + 1,
      source_airport: data.source_airport.name,
      source_id: data.source_airport.id,
      source_iata: data.source_airport.iata,
      destination_airport: data.destination_airport.name,
      destination_id: data.destination_airport.id,
      destination_iata: data.destination_airport.iata,
      number_of_flights: calculateNumberOfFlight(
        dataset,
        data.source_airport.iata,
        data.destination_airport.iata
      ),
      distance: calculateDistance(
        dataset,
        data.source_airport.iata,
        data.destination_airport.iata
      ),
      time_difference: Math.abs(
        data.source_airport.timezone - data.destination_airport.timezone
      ),
    };
  });
};

// get minimum, maximum and average values
const getMinimum = function (dataset, element) {
  let elementsArray = dataset.map((data) => data[element]);
  elementsArray.sort((a, b) => a - b);
  return elementsArray[0];
};

const getMaximum = function (dataset, element) {
  let elementsArray = dataset.map((data) => data[element]);
  elementsArray.sort((a, b) => (a > b ? -1 : 1));
  return elementsArray[0];
};

const getAverage = function (dataset, element) {
  let sum = 0;
  for (let i = 0; i < dataset.length; i++) {
    sum += dataset[i][element];
  }

  return Math.floor((sum / dataset.length) * 100) / 100;
};

// Find Airport by IATA code
const findAirportByIata = function (dataset, iataCode) {
  return dataset.filter((data) => data.iata === iataCode);
};




module.exports = {
  airports,
  flights,
  newFlightsData,
  getNewFlightsData,
  getLatitudeLongitudeTimestamp,
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
  findAirportByIata,
};


