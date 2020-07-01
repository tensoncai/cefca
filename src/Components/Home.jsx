import React, { Component } from "react";
import NavBar from "./NavBar"
import Footer from "./Footer";
import "../CSS/Styling.css";

class Home extends Component {
  // style={{backgroundImage: `url(${'/church.jpeg'})`, color: 'black'}}
  
  render() {
    return (
      <div className="pageContainer">
        <NavBar />
        <div className="contentWrap">
          <div className="mainImageText">
            <p className="welcomeText">
              Welcome to
              <br></br>
              Chinese Evangelical
              <br></br>
              Free Church of Ames
            </p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home;