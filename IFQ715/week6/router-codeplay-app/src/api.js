const fakeCity = {
  location: {
    name: "London",
    region: "City of London, Greater London",
    country: "United Kingdom",
    lat: 51.52,
    lon: -0.11,
    tz_id: "Europe/London",
    localtime_epoch: 1661740986,
    localtime: "2022-08-29 3:43",
  },
  current: {
    last_updated_epoch: 1661740200,
    last_updated: "2022-08-29 03:30",
    temp_c: 16.0,
    temp_f: 60.8,
    is_day: 0,
    condition: {
      text: "Clear",
      icon: "//cdn.weatherapi.com/weather/64x64/night/113.png",
      code: 1000,
    },
    wind_mph: 5.6,
    wind_kph: 9.0,
    wind_degree: 40,
    wind_dir: "NE",
    pressure_mb: 1023.0,
    pressure_in: 30.21,
    precip_mm: 0.0,
    precip_in: 0.0,
    humidity: 77,
    cloud: 0,
    feelslike_c: 16.0,
    feelslike_f: 60.8,
    vis_km: 10.0,
    vis_miles: 6.0,
    uv: 1.0,
    gust_mph: 10.5,
    gust_kph: 16.9,
  },
};

export function useWeather(city) {
  return fakeCity;
}
