import { useState } from "react";
import TextField from "../../Components/TextField";
import { Form, Row, Col, Alert, Button } from "react-bootstrap";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (event) => {
    event.preventDefault();

    const API_URL = `https://d2h6rsg43otiqk.cloudfront.net/prod/user/register`;

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "EzensCqxyl63t09mVG6jr2AXriDQeimS95s4CdpV",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setMessage(data.message);
        setError(data.error);

        if (data.error) {
          setMessage(data.message);
        }
      })
      .catch((error) => {
        setError(true);
        setMessage("Registration failed: " + error.message);
      });
  };

  return (
    <div>
      <h2 className="text-center">Register</h2>
      <p className="text-center">Create your account</p>
      <Form onSubmit={handleRegister} className="justify-content-center">
        <Row
          className="justify-content-center mt-3"
          justify-content-center
          mt-3
        >
          <Col md={4}>
            {message ? (
              <Alert variant={!error ? "success" : "danger"}>
                {message}
              </Alert>
            ) : null}
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={4}>
            <TextField
              text="Email"
              type="email"
              onChange={setEmail}
              value={email}
            />
          </Col>
        </Row>

        <Row className="justify-content-center mt-3">
          <Col md={4}>
            <TextField
              text="Password"
              type="password"
              onChange={setPassword}
              value={password}
            />
          </Col>
        </Row>

        <Row className="justify-content-center mt-3">
          <Col md="auto">
            <Button type="submit" variant="primary">
              Register
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
