import { Form, Table } from "react-bootstrap";
import { useFactors, useCountries } from "../api";
import { useState } from "react";
import SelectField from "../Components/SelectField";
import TextField from "../Components/TextField";

export default function Factors() {
  const [year, setYear] = useState("");
  const [limit, setLimit] = useState("");
  const [country, setCountry] = useState("");

  const [params, setParams] = useState({
    country: "",
    year: null,
    limit: null,
  });

  const { loading, factors, error } = useFactors(
    params.year,
    params.limit,
    params.country
  );
  const { countries } = useCountries();

  const handleFactorsSubmit = (event) => {
    event.preventDefault();

    if (!year) {
      alert("Year is required");
      return;
    }

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
    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error.message}</p>;
    if (!factors || factors.length === 0) return <p>No factors found</p>;
    return (console.log(factors),
      (
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
            { 
              factors.map((factor, index) => (
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
      )
    );
  }

  return (
    <div>
      <h2>Factors Page</h2>
      <p>Please select year to see rankings. You can specify a country and limit</p>

      <Form onSubmit={handleFactorsSubmit}>
        <SelectField
          text="Country"
          options={countries}
          onChange={setCountry}
          value={country}
        />
        <TextField
          text="Year"
          type="number"
          onChange={setYear}
          value={year}
          required
        />
        <TextField
          text="Limit"
          type="number"
          onChange={setLimit}
          value={limit}
        />
        <button type="submit" className="btn btn-primary mb-2">
          Search
        </button>
      </Form>

      {(params.country || params.year || params.limit) && renderResults()}
    </div>
  );
}
