import React, { Component } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

class Beliefs extends Component {

  render() {
    return (
      <div className="beliefs">
        <NavBar />

        <div className="body">beliefs section</div>
        <Footer />
      </div>
    )
  }
}

export default Beliefs;