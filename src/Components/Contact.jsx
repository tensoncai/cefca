import React, { Component } from "react";
import NavBar from './NavBar';
import Footer from './Footer';
import '../CSS/Styling.css';

class Contact extends Component {
  // backgroundImage: `url(${'/trees.jpg'})`
  render() {
    return (
      <div className="pageContainer">
        <NavBar />
        <div className="contentWrap">
          <div className="mainImageText" >
            <p className="connectWithUsText">
              Connect With Us
            </p>
          </div>
          <p style={{paddingLeft: '100px'}}>
            <span style={{display: 'block', fontSize: '30px', marginBottom: '10px'}}>Service times:</span>
            <span style={{display: 'block', fontSize: '20px'}}>Sundays: 10:30AM - Noon</span>
            <span style={{display: 'block', fontSize: '20px'}}>Tuesdays: 7:30 - 8:30PM Prayer</span>
            <span style={{display: 'block', fontSize: '20px'}}>Fridays: 7:30 - 9:30PM Study</span>
          </p>
          <p style={{paddingLeft: '100px'}}>
            <span style={{display: 'block', fontSize: '30px', marginBottom: '10px'}}>Location:</span>
            <span style={{display: 'block', fontSize: '20px'}}>4911 Lincoln Way</span>
            <span style={{display: 'block', fontSize: '20px', marginBottom:'20px'}}>Ames, IA 50014</span>
            <span style={{display: 'block', fontSize: '20px'}}>(515) 233-4436</span>
          </p>
          <div style={{alignItems: 'center'}}>
            <iframe title="myFrame" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2963.916820791477!2d-93.68619538563216!3d42.02351676428242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87ee7760c7d1184b%3A0xffa59b1133eff4aa!2s4911%20Lincoln%20Way%2C%20Ames%2C%20IA%2050014!5e0!3m2!1sen!2sus!4v1592410258940!5m2!1sen!2sus" 
                    style={{width: '800px', height: '450px', frameborder: '0px', border:'0px', paddingLeft: '100px'}}></iframe>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Contact;