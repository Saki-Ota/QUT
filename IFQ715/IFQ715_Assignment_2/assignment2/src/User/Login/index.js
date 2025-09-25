import { useState } from "react";
import TextField from "../../Components/TextField";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Login({setIsLoggedIn}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
//   const[ isLoggedIn, setIsLoggedIn] = useState(false);

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
      <h2>Login Page</h2>
      <p>This is the Login page content.</p>
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
    </div>
  );
}
