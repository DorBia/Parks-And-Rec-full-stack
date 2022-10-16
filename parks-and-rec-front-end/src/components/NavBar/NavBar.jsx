import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

import "./NavBar.scss"

const NavBar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand to="">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Seasons" id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/season/1">Season 1</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/season/2">Season 2</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/season/3">Season 3</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/season/4">Season 4</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/season/5">Season 5</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/season/6">Season 6</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/season/7">Season 7</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link to="">Episodes</Nav.Link>
            <Nav.Link to="">Characters</Nav.Link>
          </Nav>
          <Nav>
          <Nav.Link className="nav__link" to=""> <Button variant="outline-light" className="log-in">Log In</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;