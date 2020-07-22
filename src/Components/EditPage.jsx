import React, { Component } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import "../CSS/Styling.css";
import PasswordModal from "./PasswordModal";
import DropzoneUpload from "./DropzoneUpload";
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import IconButton from '@material-ui/core/IconButton';

const S3_AUDIO_PATH = process.env.REACT_APP_S3_AUDIO_PATH;

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

  componentDidMount = () => {
    this.displayAudioRecords();
  }

  onDelete = () => {

  }
  
  displayAudioRecords = () => {
    var audioRecords = this.props.location.state.storedAudioRecords;
    console.log(audioRecords);
    if (audioRecords.length === 0) {
      return 'No audio recordings available'
    }
    else {
      return audioRecords.map((file) => 
        <div style={{paddingLeft: '30px', marginTop: '30px', marginBottom: '100px'}}>
          <div>
            <h5>{file.name}</h5>
          </div>
          <div>
            <audio style={{float: 'left', width: '50%'}} title={file.name} controls key={file.name} src={S3_AUDIO_PATH + file.name} type="audio/mpeg"/>
            <DeleteIcon onClick={this.onDelete} style={{float: 'left', marginLeft: '40px', marginTop: '5px', color: 'red', fontSize: '28px'}} />
          </div>
        </div>
      );
    }
  }

  showDropzone = () => {

  }

  render() {
    return (
      <div className="pageContainer">
      <NavBar />
      <div className="contentWrap">
        <div style={{marginRight: '60px', marginBottom: '30px'}}>
          <IconButton style={{float: 'right'}}>
            <CloudUploadIcon onClick={this.showDropzone} style={{float: 'right', color: 'blue'}} />
          </IconButton>
        </div>

        {/* <PasswordModal
          show={this.state.showPasswordModal} 
          handleClose={this.passwordModalClose}
        /> */}
        <div>
          {this.displayAudioRecords()}
        </div>
        <DropzoneUpload
          selectedFiles={this.state.selectedFiles} 
          onDelete={this.deleteFileFromDropzone} 
          onDrop={this.onDrop}
          show={this.state.showModal} 
          handleClose={this.handleClose} 
          onUpload={this.onUploadClicked}
          dropFileStatusProps={this.state.dropFileStatusProps}
          uploadingError={this.state.uploadingError}
        />
      </div>
      <Footer />
      </div>
    )
  }
}

export default EditPage;