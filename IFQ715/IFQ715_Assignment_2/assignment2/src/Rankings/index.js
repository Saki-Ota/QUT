import { useRankings, useCountries } from "../api";
import { Form, Table } from "react-bootstrap";
import { use, useState } from "react";

import SelectField from "../Components/SelectField";
import TextField from "../Components/TextField";


export default function Rankings() {
  const [country, setCountry] = useState("");
  const [year, setYear] = useState("");
  const [submitted, setSubmitted] = useState(false); 

  const [params, setParams] = useState({
    country: "",
    year: "",
  });

  const { loading, rankings, error } = useRankings(params.country, params.year);
  const { countriesLoading, countries, countriesError } = useCountries();

  const handleRankingsSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    setParams({
      country: country || "",
      year: year ? Number(year) : "",
    });
    
    console.log(`Rankings form submitted: country=${country}, year=${year}`);
  };

  function renderCountryResults() {
    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <p style={{ color: "red" }}>Error: {error.message}</p>;
    }
    if (!rankings || rankings.length === 0) {
      return <p>No rankings found</p>;
    }
    return (
      console.log(rankings),
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Year</th>
            <th>Rank</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((ranking, index) => (
            <tr key={index}>
              <td>{ranking.year}</td>
              <td>{ranking.rank}</td>
              <td>{ranking.score}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    ); 
  }

  function renderYearResults() {
    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <p style={{ color: "red" }}>Error: {error.message}</p>;
    }
    if (!rankings || rankings.length === 0) {
      return <p>No rankings found</p>;
    }
    return (
      console.log(rankings),
      (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Country</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            { 
              rankings.slice(0,20).map((ranking, index) => (
              <tr key={index}>
                <td>{ranking.rank}</td>
                <td>{ranking.country}</td>
                <td>{ranking.score}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )
    );
  }

  return (
    <div>
      <h2>Rankings Page</h2>
      <p>Please select a country, year or both to see rankings</p>
      <Form onSubmit={handleRankingsSubmit}>
        <SelectField
          text="Country"
          options={countries}
          onChange={setCountry}
          value={country}
        />
        <TextField text="Year" type="number" onChange={setYear} value={year} />
        <button type="submit" className="btn btn-primary mb-2">
          Search
        </button>
      </Form>
      {(submitted && !params.country && !params.year) && <p>Please select a country or year.</p>}
      {(params.country) && renderCountryResults()}
      {(params.year && !params.country) && renderYearResults()}
    </div>
  );
}
