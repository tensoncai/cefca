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
          <Nav className="mr-auto">
            <NavDropdown
              onMouseEnter = { () => this.setState({ about: true })}
              onMouseLeave = { () => this.setState({ about: false })}
              show={ this.state.about }
              title="About" id="collasible-nav-dropdown">
                <NavDropdown.Item id="navItem" href="/beliefs">What We Believe</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              onMouseEnter = { () => this.setState({ connect: true })}
              onMouseLeave = { () => this.setState({ connect:false })}
              show={ this.state.connect }
              title="Connect" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown 
              onMouseEnter = { () => this.setState({ sermons: true })}
              onMouseLeave = { () => this.setState({ sermons:false })}
              show={ this.state.sermons }
              title="Sermons" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown 
              onMouseEnter = { () => this.setState({ contact: true })}
              onMouseLeave = { () => this.setState({ contact:false })}
              show={ this.state.contact }
              title="Contact" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default NavBar;