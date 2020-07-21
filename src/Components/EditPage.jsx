import React, { Component } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import "../CSS/Styling.css";
import PasswordModal from "./PasswordModal";

const password = process.env.REACT_APP_PASSWORD_MODAL;

class EditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPasswordModal: true
    }
  }

  passwordModalOpen = () => {
    this.setState({
      showPasswordModal: true
    });
  }

  passwordModalClose = () => {
    this.setState({
      showPasswordModal: false
    });
  }
  

  render() {
    return (
      <div className="pageContainer">
      <NavBar />
      <div className="contentWrap">
        <PasswordModal
          show={this.state.showPasswordModal} 
          handleClose={this.passwordModalClose} 
        />
      </div>
      <Footer />
      </div>
    )
  }
}

export default EditPage;