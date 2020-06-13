import React, { Component } from "react";
import NavBar from "./NavBar"
import Footer from "./Footer";
import "../CSS/Styling.css";

class Home extends Component {

  
  render() {

    return (
      <div className="home">
        <NavBar />
        <div style={{ backgroundImage: `url(${'/cross3.jpg'})`, backgroundSize: 'cover', overflow: 'hidden', backgroundPosition: 'center', backgroundRepeat  : 'no-repeat' }} className="body">
          Welcome | 欢迎
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home;