const { airports, flights } = require("./app.js");
const {
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
} = require("./app.js");
const newFlightsData = getNewFlightsData(flights, airports);
const newAnalysisData = getDataForAnalysis(newFlightsData);


test("Check it creates a new array and takes elements from two passed datasets", () => {
  expect(getNewFlightsData(flights, airports)).toEqual(newFlightsData);
});

test("Check it creates a new array and takes elements from airports dataset", () => {
  expect(getNewFlightsData(flights, airports)[0].destination_airport).toEqual(
    {
      altitude: 56,
      city: "Argyle",
      country: "Australia",
      iata: "PUG",
      id: 6312,
      latitude: -32.5069007873535,
      longitude: 137.716995239258,
      name: "Port Augusta Airport",
      timezone: 9.5,
    }
  );
});

test("", () => {
  expect(getLatitudeLongitudeTimestamp(newFlightsData)[0].destination_airport).toEqual(
    {
      latitude: -32.5069007873535,
      longitude: 137.716995239258,
    }
  );
});


test("Check it iterates through dataset and grabs all flights that matches given source and destination aiports IATA", () => {
    expect(findFlightWithAirportsIata(newFlightsData, "MEL", "SYD").length).toEqual(7);
});

test("Check it iterates through given dataset and grabs all flights that matches given airline name", () => {
  expect(
    findFlightWithAirlineName(newFlightsData, "Sharp Airlines")[0]
  ).toEqual({
    aircraft: ["Fairchild Swearingen Metroliner"],
    airline: { code: undefined, country: "Australia", name: "Sharp Airlines" },
    codeshare: false,
    destination_airport: {
      altitude: 56,
      city: "Argyle",
      country: "Australia",
      iata: "PUG",
      id: 6312,
      latitude: -32.5069007873535,
      longitude: 137.716995239258,
      name: "Port Augusta Airport",
      timezone: 9.5,
    },
    source_airport: {
      altitude: 20,
      city: "Adelaide",
      country: "Australia",
      iata: "ADL",
      id: 3341,
      latitude: -34.945,
      longitude: 138.531006,
      name: "Adelaide International Airport",
      timezone: 9.5,
    },
  });
});

test("Check it loops through the given dataset and grabs all flights that given matches codeshare boolean ", () => {
  expect(findFlightsCodeshare(newFlightsData, true).length).toEqual(299);
});

test("Check it loops throught the given dataset and grabs all flights that mathces given aircraft type", () => {
  expect(findAircraftByType(newFlightsData, "Airbus A330")[0].aircraft).toEqual(
    ["Airbus A330"]
  );
});

test("Check it finds flights information based on given airport IATA then calculates time difference between two airport", () => {
  expect(calculateTimeDifference(newFlightsData, "MEL", "ADL")).toEqual(0.5);
});

test("Checks it calculate distance between two given airports", () => {
  expect(calculateDistance(newFlightsData, "BNE", "CNS")).toEqual(1391.12);
});

test("Check it loops though the given dataset and extract certain information and creats a new dataset ", () => {
  expect(getDataForAnalysis(newFlightsData)[0]).toEqual({
    destination_airport: "Port Augusta Airport",
    destination_iata: "PUG",
    destination_id: 6312,
    distance: 281.35,
    id: 1,
    number_of_flights: 2,
    source_airport: "Adelaide International Airport",
    source_iata: "ADL",
    source_id: 3341,
    time_difference: 0,
  });
});
test("Check it loops though the given dataset and creates a new dataset. The number of item in the new dataset should be the same as original dataset. ", () => {
  expect(getDataForAnalysis(newFlightsData).length).toEqual(776);
});

test("Checks it iterates through all data in the given dataset and find the minimum value of the given element", () => {
  expect(getMinimum(newAnalysisData, "distance")).toEqual(64.67);
});

test("Checks it iterates through all data in the given dataset and find the maximum value of the given element", () => {
  expect(getMaximum(newAnalysisData, "distance")).toEqual(3750.61);
});

test("Checks it iterates through all data in the given dataset and find the average value of the given element", () => {
  expect(getAverage(newAnalysisData, "distance")).toEqual(1104.11);
});

test("Checks aiprots objects and returns the airpot information that matches given IATA", () => {
  expect(findAirportByIata(airports, "BNE")).toEqual([
    {
      altitude: 13,
      city: "Brisbane",
      country: "Australia",
      iata: "BNE",
      id: 3320,
      latitude: -27.3841991424561,
      longitude: 153.117004394531,
      name: "Brisbane International Airport",
      timezone: 10,
    },
  ]);
});
