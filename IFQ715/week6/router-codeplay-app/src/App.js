import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Location from "./Location";
import Login from "./User/Login";
import Register from "./User/Register";

import Header from "./Components/Header";
import Footer from "./Components/Footer";




function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="App">
          <Header />
          {/* the content */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/location" element={<Location />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}


export default App;
