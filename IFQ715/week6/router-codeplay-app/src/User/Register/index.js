import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";

import TextField from "../TextField";

export default function Register() {
  return (
    <Container fluid="lg" className="pt-2">
      <main className="flex-grow-1">
        <Row className="viewport-height-75 align-items-center">
          <Col md={6} lg={5} className="text-center">
            <FontAwesomeIcon
              icon={faIdCard}
              className="page-icon text-secondary"
            />
          </Col>
          <Col md={6} lg={7}>
            <div style={{ width: "100%" }}>
              <h1 className="mb-5">Register</h1>

              <Form className=" mb-3">
                <Row className="g-3">
                  <TextField text="Email" type="email" size={6} />
                  <TextField text="Password" type="password" size={6} />
                  <TextField
                    text="Address"
                    type="text"
                    size={12}
                    placeholder={"1234 Main St"}
                  />
                  <TextField
                    text="Address 2"
                    type="text"
                    size={12}
                    placeholder={"Apartment, studio, or floor"}
                  />
                  <TextField text="City" type="text" size={6} />
                  <TextField
                    text="State"
                    type="text"
                    size={4}
                    Component={({ id }) => (
                      <Form.Select id={id}>
                        <option>...</option>
                      </Form.Select>
                    )}
                  />
                  <TextField text="Postcode" type="text" size={2} />
                  <div className="col-12">
                    <Button type="submit" variant="primary">
                      Register
                    </Button>
                  </div>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </main>
    </Container>
  );
}
