import React, { Component } from "react";
import "../CSS/Styling.css";
import { Modal, Button, Form} from 'react-bootstrap';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import {Route, Link} from 'react-router-dom';
import SermonRecordings from "./SermonRecordings";

const password = process.env.REACT_APP_PASSWORD_MODAL;
class PasswordModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputPass: '',
      passIsValid: false
    }
  }

  handleChange = (e) => {
    this.setState({
      inputPass: e.target.value
    }, () => console.log(this.state.inputPass));
  }

  validatePass = () => {
    console.log('go clicked');
    if (this.state.inputPass === password) {
      this.setState({
        passIsValid: true
      });

      this.props.handleClose();
    }
    
    this.setState({
      passIsValid: false
    });
  }

  render() {
    return (
      <Modal size='lg' backdrop='static' show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header style={{border: 'none', display: 'flex', justifyContent: 'right'}}>
          <div style={{display: 'flex', justifyContent: 'right'}}>
            <Link to="/sermons">
              <CloseRoundedIcon style={{verticalAlign: 'right'}} onClick={this.props.handleClose} />
            </Link>
          </div>
        </Modal.Header>
        <Modal.Body>
        <div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Form.Control onChange={this.handleChange} style={{verticalAlign: 'middle'}} type="password" placeholder="Enter password" />
            <Button disabled={this.state.inputPass.length === 0} variant="outline-primary" onClick={this.validatePass}>Go</Button>
          </div>
          {/* <Route exact path="/sermons" render={(props) => <SermonRecordings {...props} />} /> */}

          {/* <div style={{display: 'flex', justifyContent: 'center', color: 'red'}}>
            {this.state.passIsValid ? '' : 'Wrong password'}
          </div> */}
        </div>
        </Modal.Body>
        <Modal.Footer style={{border: 'none'}}></Modal.Footer>
      </Modal>
    )
  }
}

export default PasswordModal;