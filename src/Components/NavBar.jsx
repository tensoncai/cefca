import React, { Component } from "react";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import "../CSS/Styling.css";

class NavBar extends Component {
  state = {
    about: false,
    connect: false,
    sermons: false,
    contact: false
  };

  render() {
    return (
      <Navbar className="navbar" collapseOnSelect expand="lg" variant="dark">
        <Navbar.Brand id="navBrand" href="/">CEFCA</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <NavDropdown title="About" id="collasible-nav-dropdown">
                <NavDropdown.Item id="navItem" href="/beliefs">What We Believe</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Connect" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Sermons" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link id="navLink" href="/contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default NavBar;