import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { useState } from "react";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Factors from "./Factors";
import Rankings from "./Rankings";
import Login from "./User/Login";
import Register from "./User/Register";

import Header from "./Components/Header";
import Footer from "./Components/Footer";

// function to check token is still valid
import {jwtDecode} from "jwt-decode";

const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") &&
      !isTokenExpired(localStorage.getItem("token")) // check if the token is still valid
      ? true
      : false
  );
  console.log(localStorage.getItem("token"));
  console.log(`App: isLoggedIn = ${isLoggedIn}`);
  console.log('token expired?', isTokenExpired(localStorage.getItem("token")))

  return (
    // pass isLoggedIn state to Routes to manage the contents to be shown or not
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100" id="wrapper">
        <Header isLoggedIn={isLoggedIn} />
        <main className="flex-grow-1">
          <Container fluid className="pt-2">
            <Routes>
              <Route path="/" element={<Home isLoggedIn={isLoggedIn} />}
               /> 
              <Route
                path="/factors"
                element={<Factors isLoggedIn={isLoggedIn} />}
              /> 
              <Route
                path="/rankings"
                element={<Rankings isLoggedIn={isLoggedIn} />}
              />
              <Route
                path="/login"
                element={<Login setIsLoggedIn={setIsLoggedIn} />} // change isLoggedIn state to true if successful 
              />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
