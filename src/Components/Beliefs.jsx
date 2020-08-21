import React, { Component } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
// import beliefStatement from './2019_nov_efca_sof_mandarin.pdf';

class Beliefs extends Component {

  render() {
    return (
      <div className="pageContainer">
        <NavBar />
        <div>
          <iframe style={{width: '100%', height: '100%', position: 'fixed'}} 
            src='/2019_nov_efca_sof_mandarin.pdf' 
          />
        </div>
        <Footer />
      </div>
    )
  }
}

export default Beliefs;