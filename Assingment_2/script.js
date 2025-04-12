import airports from './json/A2_Airports.json' with {type: 'json'};
import flights from './json/A2_Flights.json' with {type: 'json'};
import getNewFlightsData from './step1.js';
import getLatitudeLongitudeTimestamp from './step2.js';
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
import {
  getAirportOptionsList,
  getAirlineOptionsList,
  getAircraftOptionList,
  addOptions,
  flightSearch,
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
} from './step4.js'

const newFlightsData = getNewFlightsData(flights, airports);
const newLatitudeAndLongitude = getLatitudeLongitudeTimestamp(newFlightsData);
const newAnalysisData = getDataForAnalysis(newFlightsData);


const sourceAirportList = getAirportOptionsList(newFlightsData, "source_airport");
const destinationAirportList = getAirportOptionsList(newFlightsData, "destination_airport");
const airlineList = getAirlineOptionsList(newFlightsData, "airline");
const aircraftList = getAircraftOptionList(newFlightsData, "aircraft");
const airportList = getAiportNameOptionsList(airports);


addOptions("filterSourceAirportSelect", sourceAirportList);
addOptions("filterDestinationAirportSelect", destinationAirportList);
addOptions("filterAirlineSelect", airlineList);
addOptions("filterCitySelect", sourceAirportList);
addOptions("filterAircraftSelect", aircraftList)



flightSearch(newFlightsData);
airportSearchByIata(airports);
airportSearchEvent(airports);
showGreatNumberOfFlight(newAnalysisData);
showGreatestTimeDifference(newAnalysisData);
showGreatestDistance(newAnalysisData);


console.log("newFlightsData", newFlightsData[0]);







