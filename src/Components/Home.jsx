import React, { Component } from "react";
import NavBar from "./NavBar"
import Footer from "./Footer";
import "../CSS/Styling.css";

class Home extends Component {

  styling = {
    backgroundImage: `url(${'/cross3.jpg'})`,
    backgroundSize: 'cover', 
    overflow: 'hidden',
    backgroundPosition: 'center', 
    backgroundRepeat  : 'no-repeat',
    height: '400px', 
    fontSize: '70px', 
    textAlign: 'center',
    color: 'white',
    fontWeight: '100',
    lineHeight: '400px',
    marginBottom: '30px'
  }
  
  render() {

    return (
      <div className="home">
        <NavBar />
        <div style={this.styling} className="body">
          Welcome | 欢迎
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home;