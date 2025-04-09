// const fs = require("fs");
// const path = require("path");

// // // Step 1 - loading data sources
// // const airports = require("./A2_Airports.json");
// // const flights = require("./A2_Flights.json");
// // const { timeStamp } = require("console");

// // import airports from './A2_Airports.json' with {type: 'json'};
// // import flights from './A2_Flights.json' with {type: 'json'};


// // Below codes are the attempts to get data using fetch but failed
// // 
// const airPortsfilePath = path.join(__dirname, "./A2_Airports.json");
// const airportsUrl = fs.readFileSync(airPortsfilePath, "utf8");
// const flightsfilePath = path.join(__dirname, "./A2_Airports.json");
// const flightsUrl = fs.readFileSync(flightsfilePath, "utf8");

// const airports = require(airportsUrl)
// const flights = require(flightsUrl)

// console.log(airports;)

/*
const getData = function (url) {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      return data
    })
    .catch((error) => console.error(error.message));
};
const airports = getData(airportsJson)
const flights = getData(flightsJson)*/

// Step 1
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

export default getNewFlightsData;


