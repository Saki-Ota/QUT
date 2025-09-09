import City from "../Components/City";
import { Row, Col } from "react-bootstrap";

const locations = [
  { city: "London" },
  { city: "Brisbane" },
  { city: "Amsterdam" },
  { city: "Beijing" },
];

export default function Locations() {
  return (
    <section id="locations">
      <div className="viewport-height-75 d-flex align-items-center">
        <div style={{ width: "100%" }}>
          <Row>
            <Col className="text-center mb-5 fs-1 text-secondary">
              <i className="fa-solid fa-thumbs-up thumb-icon me-3"></i> How
              about that weather.
            </Col>
          </Row>
          <Row>{locations.map(City)}</Row>
        </div>
      </div>
    </section>
  );
}
