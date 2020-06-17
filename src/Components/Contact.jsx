import React, { Component } from "react";
import NavBar from './NavBar';
import Footer from "./Footer";

class Contact extends Component {

  styling = {
    backgroundImage: `url(${'/trees.jpg'})`,
    backgroundSize: 'cover', 
    overflow: 'hidden', 
    backgroundPosition: 'center', 
    backgroundRepeat  : 'no-repeat',
    height: '400px', 
    fontSize: '50px', 
    textAlign: 'center',
    color: 'white',
    fontWeight: '200',
    lineHeight: '400px',
    marginBottom: '30px'
  }

  render() {
    return (
      <div>
        <NavBar />
        <div style={this.styling}>
          CONNECT WITH US
        </div>
        <p style={{padding: '30px'}}>
          <span style={{display: 'block', fontSize: '30px'}}>Service times:</span>
          <span style={{display: 'block', fontSize: '20px'}}>Sundays: 10:30AM - Noon</span>
          <span style={{display: 'block', fontSize: '20px'}}>Tuesdays: 7:30 - 8:30PM Prayer</span>
          <span style={{display: 'block', fontSize: '20px'}}>Fridays: 7:30 - 9:30PM Study</span>
        </p>
        <div>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2963.916820791477!2d-93.68619538563216!3d42.02351676428242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87ee7760c7d1184b%3A0xffa59b1133eff4aa!2s4911%20Lincoln%20Way%2C%20Ames%2C%20IA%2050014!5e0!3m2!1sen!2sus!4v1592410258940!5m2!1sen!2sus" style={{width: '600px', height: '450px', frameborder: '0px', border:'0px', allowfullscreen:'', tabindex: '0'}}></iframe>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Contact;