import { useState, useEffect } from "react";

const API_KEY = "EzensCqxyl63t09mVG6jr2AXriDQeimS95s4CdpV";

// Get rankings data
function getRankingsByQuery(country, year) {
  const url = `https://d2h6rsg43otiqk.cloudfront.net/prod/rankings?year=${year}&country=${country}`;

  return fetch(url, {
    method: "GET",
    headers: {
      "X-API-KEY": API_KEY,
      accept: "application/json",
    },
  }).then((res) => res.json());
}

// Get countries data
function getCountriesByQuery() {
  const url = "https://d2h6rsg43otiqk.cloudfront.net/prod/countries";
  return fetch(url, {
    method: "GET",
    headers: {
      "X-API-KEY": API_KEY,
      accept: "application/json",
    },
  }).then((res) => res.json());
}

// Get factors  data
function getFactorsByQuery(year, limit, country) {
  const baseUrl = `https://d2h6rsg43otiqk.cloudfront.net/prod/factors/${year}`;

  const params = new URLSearchParams();

  if (limit) params.append("limit", limit);
  if (country) params.append("country", country);

  console.log("params.toString()", params.toString());

  const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
  const token = localStorage.getItem("token");
  console.log('token', token);

  return fetch(url, {
    method: "GET",
    headers: {
      "X-API-KEY": API_KEY,
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
}

// Based on the response of query, error handling and set parameters
export function useRankings(country, year) {
  const [loading, setLoading] = useState(true);
  const [rankings, setRankings] = useState([]); // returns empty array to avoid undefined error
  const [error, setError] = useState(null);
  

  useEffect(() => {
    setLoading(true);
    if (year || country) {
      getRankingsByQuery(country, year)
        .then((rankings) => {
          console.log("API cal rankings:", rankings);
          setRankings(rankings);
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [country, year]); // call it only when coutnry or year value is changed

  return { loading: loading, rankings: rankings, error: error };
}

export function useCountries() {
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [countries, setCountries] = useState([]); // set empty array as initial state to avoide undefined error
  const [countriesError, setCountriesError] = useState(null);

  useEffect(() => {
    setCountriesLoading(true);
    getCountriesByQuery()
      .then((countries) => {
        setCountries(countries);
      })
      .catch((error) => {
        setCountriesError(error);
      })
      .finally(() => {
        setCountriesLoading(false);
      });
  }, []); // call it once

  return { loading: countriesLoading, countries: countries, error: countriesError };
}

export function useFactors(year, limit, country) {
  const [factorsLoading, setFactorsLoading] = useState(true);
  const [factors, setFactors] = useState();
  const [factorsError, setFactorsError] = useState(null);

  useEffect(() => {
    if(!year) return; // year must be mandatory

    setFactorsLoading(true);
    getFactorsByQuery(year, limit, country)
      .then((factors) => {
        console.log('API call factors', factors);
        setFactors(factors);
      })
      .catch((error) => {
        setFactorsError(error);
      })
      .finally(() => {
        setFactorsLoading(false);
      });
  }, [year, limit, country]); // call it ony when year, limit or country is changed 

  return { loading: factorsLoading, factors: factors, error: factorsError };
}
