import { Link, useResolvedPath, useMatch } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

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
  function handleLogOut() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }
  return (
    <header className="bg-primary text-white">
      <Container>
        <Navbar expand="lg" variant="dark">
          <Navbar.Brand as={Link} to="/">
            My Application
          </Navbar.Brand>
          <Nav className="ms-auto">
            <HighlightLink to="/">Home</HighlightLink>
            {!isLoggedIn && <HighlightLink to="/login">Login</HighlightLink>}
            {!isLoggedIn && (
              <HighlightLink to="/register">Register</HighlightLink>
            )}
            {isLoggedIn && <HighlightLink to="/factors">Factors</HighlightLink>}
            {isLoggedIn && (
              <HighlightLink to="/rankings">Rankings</HighlightLink>
            )}
            {isLoggedIn ? (
              <Nav.Link to="/" as={Link} onClick={handleLogOut}>
                Logout
              </Nav.Link>
            ) : null}
          </Nav>
        </Navbar>
      </Container>
    </header>
  );
}
