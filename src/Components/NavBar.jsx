import React, { Component } from "react";
import { Navbar, Nav } from 'react-bootstrap';
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
      <Navbar className="navbar" collapseOnSelect expand="sm" variant="dark">
        <Navbar.Brand id="navBrand" href="/">CEFCA</Navbar.Brand>
        <Navbar.Toggle id="navBarToggle" aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link id="navLink" href="/beliefs">Beliefs</Nav.Link>
            <Nav.Link id="navLink" href="/sermons">Sermons</Nav.Link>
            <Nav.Link id="navLink" href="/contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default NavBar;