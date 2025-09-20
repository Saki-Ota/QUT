import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import TextField from "../TextField";

export default function Login({setIsLoggedIn}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    const API_URL = `https://d2h6rsg43otiqk.cloudfront.net/prod`;
    const url = `${API_URL}/user/login`;

    fetch(url, {
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
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          setMessage(data.message);
        } else {
          localStorage.setItem("token", data.token);
          setIsLoggedIn(true);
          navigate({ pathname: "/" });
        }
      });
  };

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

            <Form onSubmit={handleLogin}>
              {message ? <Alert variant="danger">{message}</Alert> : null}
              <TextField
                text="Email"
                type="email"
                onChange={setEmail}
                value={email}
              />
              <TextField
                text="Password"
                type="password"
                onChange={setPassword}
                value={password}
              />
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
