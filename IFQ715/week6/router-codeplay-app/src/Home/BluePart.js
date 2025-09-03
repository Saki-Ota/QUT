import world1 from "./world1.svg";

import { Row, Col } from "react-bootstrap";

export default function BluePart() {
  return (
    <section id="blue-part">
      <Row className="bg-primary text-light  viewport-height-75 ">
        <Col md={6} className="position-relative">
          <div className="position-absolute top-50 start-50 translate-middle">
            <img src={world1} className="img-fluid" width="100%" alt="..." />
          </div>
        </Col>
        <Col md={6} className="position-relative">
          <div className="position-absolute top-50 start-50 translate-middle">
            <p className="fs-1">This section is very blue.</p>
            <p className="fs-3">Like the sky.</p>
            <p>but bluer.</p>
          </div>
        </Col>
      </Row>
    </section>
  );
}
