import { useState } from "react";
import TextField from "../../Components/TextField";
import { Form } from "react-bootstrap";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const register = (event) => {
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
        if(data.error){
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
      <h2>Register Page</h2>
      <p>This is the Register page content.</p>
      <Form onSubmit={register}>
        {message ? <p style={{ color: error ? "red" : "green" }}>{message}</p> : null}
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
        <button type="submit">Register</button>
      </Form>
    </div>
  );
}
