import React, { Component } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

class Beliefs extends Component {

  render() {
    return (
      <div className="pageContainer">
        <NavBar />
        <div>
          <embed src='/2019_nov_efca_sof_mandarin.pdf#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&scrollbar=0' type="application/pdf" width="100%" height="800px"></embed>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Beliefs;