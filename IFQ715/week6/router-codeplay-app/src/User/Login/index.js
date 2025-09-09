import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";

import TextField from "../TextField";

export default function Login() {
  return (
    <Container fluid="lg" className="pt-2">
      <main className="flex-grow-1">
        <Row className="viewport-height-75 align-items-center">
          <Col md={6} lg={5} className="text-center">
            <FontAwesomeIcon
              icon={faDoorOpen}
              className="page-icon text-secondary"
            />
          </Col>
          <Col md={6} lg={7}>
            <h1 className="mb-5">Login</h1>

            <Form>
              <TextField text="Email" type="email" />
              <TextField text="Password" type="password" />
              <Button type="submit" variant="primary" className="mt-3">
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </main>
    </Container>
  );
}
