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

export default getLatitudeLongitudeTimestamp;
