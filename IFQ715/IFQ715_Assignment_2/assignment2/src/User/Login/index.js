import { useState } from "react";
import TextField from "../../Components/TextField";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Login({setIsLoggedIn}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    const API_URL = "https://d2h6rsg43otiqk.cloudfront.net/prod/user/login";
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
        if (data.error) {
          setMessage(data.message);
        } else {
          // if login was succssful, store JWT locally, change loginState to true then go back to home
          localStorage.setItem("token", data.token);
          setIsLoggedIn(true);
          navigate({ pathname: "/" });
        }
      })
      .catch((error) => {
        setMessage("Login failed: " + error.message);
      });
  };

  return (
    <div>
      <h2 className="text-center">Login</h2>
      <p className="text-center">
        Don't have account? Create an <a href="../Register">account</a>
      </p>
      <Form onSubmit={handleLogin}>
        {message ? (
          <Row className="justify-content-center mt-3">
            <Col md={4}>
              <Alert variant="danger">{message}</Alert>
            </Col>
          </Row>
        ): null}

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
              Login
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
