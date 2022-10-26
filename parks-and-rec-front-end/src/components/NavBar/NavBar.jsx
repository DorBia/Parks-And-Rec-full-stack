import { Link } from "react-router-dom";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

const NavBar = ({seasons}) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">Parks and Recreation</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="text-center">
          <Nav className="me-auto">
            <NavDropdown title="Seasons" id="collapsible-nav-dropdown">
            {seasons.map(season => <NavDropdown.Item as={Link} to={"/season/" + season.id} key={season.id}>{season.seasonsNumber}</NavDropdown.Item>)}
            </NavDropdown>
            <Nav.Link as={Link} to="/episodes">Episodes</Nav.Link>
            <Nav.Link as={Link} to="/characters">Characters</Nav.Link>
          </Nav>
          <Nav>
          <Nav.Link className="nav__link" as={Link} to="/login"> <Button variant="outline-light" className="log-in">Log In</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;