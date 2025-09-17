import { Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useWeather } from "../api";

export default function City({ city }) {
  let { loading, weather, error} = useWeather(city);

  const navigate = useNavigate();

  return (
    <Col md={6} lg={3} my={3} key={city}>
      {!loading && !error && weather? (
        <Card className="  full-width-card">
          <Card.Img
            variant="top"
            src="https://picsum.photos/id/10/200/100"
            alt="..."
          />
  
          <div className="d-flex justify-content-between p-3 text-bg-secondary">
            <h5 className="">{weather.location.name}</h5>
            <div className="subheading">{weather.location.localtime}</div>
          </div>
          <Card.Body>
            <div className="fw-lighter">Country:</div>
            <p>{weather.location.country}</p>

            <div className="fw-lighter">Region:</div>
            <p>{weather.location.region}</p>

            <div className="d-flex">
              <div className="me-4">
                <div className="fw-lighter">Lat:</div>
                <p>{weather.location.lat}</p>
              </div>
              <div>
                <div className="fw-lighter">Lon:</div>
                <p>{weather.location.lon}</p>
              </div>
            </div>

            <div className="fw-lighter">Timezone:</div>
            <p>{weather.location.tz_id}</p>

            <Button
              mt="auto"
              variant="warning"
              onClick={() =>
                navigate({ pathname: "/location", search: `?city=${city}` })
              }
            >
              Weather Information
            </Button>
          </Card.Body>
        </Card>
      ) : null}
    </Col>
  );
}
