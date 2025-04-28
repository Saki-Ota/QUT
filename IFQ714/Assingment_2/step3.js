import airports from './A2_Airports.json' with {type: 'json'};
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
//First attempt
/*{const findAircraftByType = function (dataset, aircraftType) {
    let result = [];
    for(let i =0; i < dataset.length; i++){
        let aircrafts = dataset[i].aircraft;
        for(let t=0; t < aircrafts.length; t++){
            let aircraft = aircrafts[t];
            console.log(aircraft)
            if (aircraft === aircraftType) {
                result.push(dataset[i]);
            }
        }
        
    }
    return result
}}*/
// Refactored
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


export {
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
