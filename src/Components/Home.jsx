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
          <div>
          <audio controls>
            <source src="6-28-2020主日学：罗马书.m4a" type="audio/mpeg"/>
            Your browser does not support the audio tag.
          </audio> 
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home;