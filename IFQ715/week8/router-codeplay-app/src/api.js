import { useState, useEffect } from "react";

function getCurrentWeatherByQuery(query) {
  const API_KEY = "021a35cc105d42858f6104409252005";
  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${query}`
  return fetch(url)
  .then(
    (res) => res.json()
  )
}

export function useWeather(city) {
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getCurrentWeatherByQuery(city)
    .then((weather) => {
      console.log(`API call: ${weather}`);
      setWeather(weather);
    })
    .catch((error) => {
      setError(error);
    })
    .finally(() => {
      setLoading(false);
    });
  }, [city]
  );

  return (
    { loading: loading, 
    weather: weather, 
    error: error }
  ) ;
}
