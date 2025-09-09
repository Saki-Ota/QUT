import { Row, Col, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudSunRain } from "@fortawesome/free-solid-svg-icons";
import { useWeather } from "../api";
import City from "../Components/City";

import WeatherTable from "./WeatherTable";
import WeatherImage from "./WeatherImage";

const locations = [
  { city: "London" },
  { city: "Brisbane" },
  { city: "Amsterdam" },
  { city: "Beijing" },
];

export default function Location() {
  const weatherData = useWeather("London");
  return (
    <Container fluid="lg" className="d-flex flex-column flex-grow-1 pt-2 pt-5">
      <div className="text-center text-secondary mb-5 w-100">
        <FontAwesomeIcon
          icon={faCloudSunRain}
          className="page-icon my-5 mt-lg-0"
        />
      </div>
      <main className="flex-grow-1">
        <Row>
          <WeatherImage data={weatherData} />
          <WeatherTable data={weatherData} />
        </Row>

        <Row>
          <section id="other-locations" className="bg-secondary mt-5 py-5">
            <h2 className="text-light">Other Locations</h2>
            <div className="w-100">
              <Row>{locations.map(City)}</Row>
            </div>
          </section>
        </Row>
      </main>
    </Container>
  );
}
