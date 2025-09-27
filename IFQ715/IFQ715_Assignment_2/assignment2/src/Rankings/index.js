import { useRankings, useCountries } from "../api";
import { Form, Table, Col, Row } from "react-bootstrap";
import { useState } from "react";
import { Navigate } from "react-router-dom";

import SelectField from "../Components/SelectField";

export default function Rankings({isLoggedIn}) {
  const [country, setCountry] = useState("");
  const [year, setYear] = useState("");
  const [submitted, setSubmitted] = useState(false); 

  const [params, setParams] = useState({
    country: "",
    year: "",
  });

  // check api.js useRankings should only be called when a parameter is changed
  const { loading, rankings, error } = useRankings(params.country, params.year); 
  const { countriesLoading, countries, countriesError } = useCountries();

  const years = [2015, 2016, 2017, 2018, 2019, 2020]; // limit year options

  // redirect to home if login state is false, not render ranking page
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

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
    console.log(rankings);

    return (
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
    console.log(rankings)

    return (
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
      <h2 className="mt-3 text-center">Happiness Rankings</h2>
      <p className="text-center">
        Please select a country, year or both to see rankings
      </p>
      <Form onSubmit={handleRankingsSubmit} className="mb-5">
        <Row className="align-items-end">
          <Col>
            <SelectField
              text="Country"
              options={countries}
              onChange={setCountry}
              value={country}
              firstOption="Select a country"
            />
          </Col>
          <Col>
            <SelectField
              text="Year"
              options={years}
              onChange={setYear}
              value={year}
              firstOption="Select a year"
            />
          </Col>
          <Col xs="auto">
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </Col>
        </Row>
      </Form>
      {submitted && !params.country && !params.year && (
        <p>Please select a country or year.</p>
      )}
      {/* when country value is changed*/}
      {params.country && renderCountryResults()}
      {/* when country value is not changed*/}
      {params.year && !params.country && renderYearResults()}
    </div>
  );
}
