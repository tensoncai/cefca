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
              Welcome to<br/>Chinese Evangelical<br/>Free Church of Ames
            </p>
          </div>
          <div>
            <img src='/CEFCA.jpg' />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home;