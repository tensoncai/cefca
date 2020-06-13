import React, { Component } from "react";
import { Button, Form, FormControl, MenuItem } from 'react-bootstrap';
import "../CSS/Styling.css";

class Footer extends Component {

  render() {
    return (
      <div className="footer">
        <div>4911 Lincoln Way, Ames, IA 50014</div>
        <div>(515) 233-4436</div>
      </div>
      
    )
  }
}

export default Footer;