import { Form, Table, Col, Row } from "react-bootstrap";
import { useFactors, useCountries } from "../api";
import { useState, useEffect } from "react";
import SelectField from "../Components/SelectField";
import TextField from "../Components/TextField";
import { Navigate } from "react-router-dom";

export default function Factors({ isLoggedIn }) {
  const [year, setYear] = useState("");
  const [limit, setLimit] = useState("");
  const [country, setCountry] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Set parameters
  const [params, setParams] = useState({
    country: "",
    year: null,
    limit: null,
  });

  // Check api.js, useFactor should be called when a prameter is changed
  const { loading, factors, error } = useFactors(
    params.year,
    params.limit,
    params.country
  );
  const { countries } = useCountries();
  const years = [2015, 2016, 2017, 2018, 2019, 2020]; // limit year options between 2015 to 2020

  // if login state is false, go back to home
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const handleFactorsSubmit = (event) => {
    event.preventDefault();

    if (!year) {
      setErrorMessage("Year is required"); // If year is missing, API is not called
      return;
    }

    setErrorMessage(""); // clear old errors

    // set parameters based on the value submitted in form
    setParams({
      country: country || "",
      year: Number(year),
      limit: limit ? Number(limit) : null,
    });

    console.log(
      `Factors form submitted: country=${country}, year=${year}, limit=${limit}`
    );
  };

  function renderResults() {
    console.log("factors", factors);
    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error.message}</p>;
    if (!factors || factors.length === 0) return <p>No factors found</p>;
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Country</th>
            <th>Score</th>
            <th>Economy</th>
            <th>Family</th>
            <th>Health</th>
            <th>Freedom</th>
            <th>Generosity</th>
            <th>Trust</th>
          </tr>
        </thead>
        <tbody>
          {factors.map((factor, index) => (
            <tr key={index}>
              <td>{factor.rank}</td>
              <td>{factor.country}</td>
              <td>{factor.score}</td>
              <td>{factor.economy}</td>
              <td>{factor.family}</td>
              <td>{factor.health}</td>
              <td>{factor.freedom}</td>
              <td>{factor.generosity}</td>
              <td>{factor.trust}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  return (
    <div>
      <h2 className="text-center">Happiness Factors</h2>
      <p className="text-center">
        Please select year to see rankings and details of happiness factors. You
        can specify a country and limit
      </p>
      <Form onSubmit={handleFactorsSubmit} className="mb-5">
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <Row className="align-items-end">
          <Col>
            <SelectField
              text="Country (Optional)"
              options={countries}
              onChange={setCountry}
              value={country}
              firstOption="Select a country"
            />
          </Col>
          <Col>
            <SelectField
              text="Year *"
              options={years}
              onChange={setYear}
              value={year}
              firstOption="Select a year"
            />
          </Col>
          <Col>
            <TextField
              text="Limit (Optional)"
              type="number"
              placeholder="Please enter a limit"
              onChange={setLimit}
              value={limit}
            />
          </Col>
          <Col xs="auto">
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </Col>
        </Row>
      </Form>
      {(params.country || params.year || params.limit) && renderResults()}
    </div>
  );
}
