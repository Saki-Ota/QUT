import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { Container } from "react-bootstrap";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Location from "./Location";
import Login from "./User/Login";
import Register from "./User/Register";

import Header from "./Components/Header";
import Footer from "./Components/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column bg-light" id="wrapper">
        <Header />
        <Container fluid className="pt-2">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/location" element={<Location />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Container>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
