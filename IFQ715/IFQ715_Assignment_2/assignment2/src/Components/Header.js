import { Link, useResolvedPath, useMatch, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./components.css"


function HighlightLink({ to, children }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });
  return (
    <Nav.Link as={Link} to={to} active={match}>
      {children}
    </Nav.Link>
  );
}

export default function Header({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  // when it is trigger, set isLoggedIn to false and remove token so a user is not able to access the contents which requires tokes/loging state
  function handleLogOut() {
    localStorage.removeItem("token"); 
    setIsLoggedIn(false);
    navigate("/")
  }
  return (
    <header className="bg-color text-white">
      <Container fluid>
        <Navbar expand="lg" variant="dark">

        {/* Contents links to be located left side */}
          <Nav className="me-auto">
            <Navbar.Brand as={Link} to="/">
              Happiness Data
            </Navbar.Brand>
            <HighlightLink to="/">Home</HighlightLink>
            {/* Show Factors and Rankings only user is logged in  */}
            {isLoggedIn && <HighlightLink to="/factors">Factors</HighlightLink>}
            {isLoggedIn && (
              <HighlightLink to="/rankings">Rankings</HighlightLink>
            )}
          </Nav>

          {/* Login features to be located right side */}
          <Nav className="ms-auto">
            {!isLoggedIn && <HighlightLink to="/login">Login</HighlightLink>}
            {!isLoggedIn && (
              <HighlightLink to="/register">Register</HighlightLink>
            )}
            {isLoggedIn && (
              <Nav.Link to="/" as={Link} onClick={handleLogOut}>
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar>
      </Container>
    </header>
  );
}
