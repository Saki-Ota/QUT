import "bootstrap/dist/css/bootstrap.min.css";
// import "./style.css";
import { Container } from "react-bootstrap";
import { useState } from "react";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Search from "./Search";
import Factors from "./Factors";
import Rankings from "./Rankings";
import Login from "./User/Login";
import Register from "./User/Register";

import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );
  console.log(`App: isLoggedIn = ${isLoggedIn}`);

  return (
    <BrowserRouter>
      <div className="d-flex flex-column bg-light" id="wrapper">
        <Header isLoggedIn={isLoggedIn}/>
        <Container fluid className="pt-2">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/factors" element={<Factors />} />
            <Route path="/rankings" element={<Rankings />} />
            <Route
              path="/login"
              element={<Login setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Container>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
