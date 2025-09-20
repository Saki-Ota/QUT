import { Link, useResolvedPath, useMatch } from "react-router-dom";
import { Container, Navbar, Nav, Button, Form } from "react-bootstrap";
import { use } from "react";

function HighlightLink(props) {
  let resolved = useResolvedPath(props.to);
  let match = useMatch({ path: resolved.pathname, end: true });
  return <Nav.Link {...props} active={match} />;
}

export default function Header({ isLoggedIn, setIsLoggedIn }) {
    const handleLogOut = () => {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    };

  return (
    <header>
      <Navbar bg="primary" expand="md" variant="dark">
        <Container fluid>
          <Navbar.Brand href="#">Weather or Not</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarSupportedContent" />
          <Navbar.Collapse id="navbarSupportedContent">
            <Nav className="me-auto">
              <HighlightLink to="/" as={Link}>
                Home
              </HighlightLink>
              {!isLoggedIn ? (
                <HighlightLink to="/login" as={Link}>
                  {" "}
                  Login{" "}
                </HighlightLink>
              ) : null}
              {!isLoggedIn ? (
                <HighlightLink to="/register" as={Link}>
                  {" "}
                  Register{" "}
                </HighlightLink>
              ) : null}
              {isLoggedIn ? (
                <HighlightLink to="/" as={Link} onClick={handleLogOut}>
                  Logout
                </HighlightLink>
              ) : null}
            </Nav>
            <form className="d-flex" role="search">
              <Form.Control
                className="me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <Button variant="success" type="submit">
                Search
              </Button>
            </form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
