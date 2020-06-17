import React, { Component } from "react";
import NavBar from "./NavBar"
import Footer from "./Footer";
import "../CSS/Styling.css";

class Home extends Component {
  
  render() {
    return (
      <div className="home">
        <NavBar />
        <div className="mainImageText" style={{backgroundImage: `url(${'/church.jpeg'})`, color: 'black'}}>
          Welcome | 欢迎
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home;