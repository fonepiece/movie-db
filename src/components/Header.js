import { Container, Nav, Navbar } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import logo from "../images/logo.png";

function Header() {
  const { pathname } = useLocation();

  return (
    <header>
      <Navbar bg="black" variant="dark" expand="md">
        <Container className="navigation">
          <Navbar.Brand href="/">
              <img className="logo-header" src={logo} alt="Website Logo - Cinefun" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/" active={pathname === "/"}>
                HOME
              </Nav.Link>
              <Nav.Link href="/about" active={pathname === "/about"}>
                ABOUT
              </Nav.Link>
              <Nav.Link href="/favorites" active={pathname === "/favorites"}>
                FAVOURITES
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
