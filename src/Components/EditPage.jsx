import React, { Component } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import "../CSS/Styling.css";
// import PasswordModal from "./PasswordModal";
import DropzoneUpload from "./DropzoneUpload";
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
// import SaveIcon from '@material-ui/icons/Save';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import S3 from 'aws-s3';

const DYNAMODB_URL = process.env.REACT_APP_DYNAMODB_URL;
const S3_AUDIO_PATH = process.env.REACT_APP_S3_AUDIO_PATH;
// const password = process.env.REACT_APP_PASSWORD_MODAL;

const config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME,
  region: 'us-east-2',
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
}

const S3Client = new S3(config);

/**
 * dropFileStatusProps object
 * dropFileStatusProps: {
 *      filename1: 0 means show trashcan
 *                 1 means show loading spinner
 *                 2 means show checkmark (successfully uploaded)
 *                 3 means show x mark (the file was not successfully uploaded)
 *  }
 */

class EditPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPasswordModal: true,
      selectedFiles: [],
      showDropzoneModal: false,
      showUploadButton: false,
      dropFileStatusProps: {},
      uploadingError: false,
      storedAudioRecords: [],
    }

    this.onDrop                 = this.onDrop.bind(this);
    this.dropzoneModalOpen      = this.dropzoneModalOpen.bind(this);
    this.dropzoneModalClose     = this.dropzoneModalClose.bind(this);
    this.deleteFileFromDropzone = this.deleteFileFromDropzone.bind(this);
    this.onUploadClicked        = this.onUploadClicked.bind(this);
    this.uploadToS3             = this.uploadToS3.bind(this);
    this.uploadToDynamoDb       = this.uploadToDynamoDb.bind(this);
    this.onDeleteClicked        = this.onDeleteClicked.bind(this);
  }

  /**
   * --------------------------------------------------------------
   * DROPZONE MODAL upload, delete, drop, show modal, close modal
   * --------------------------------------------------------------
   */

  onUploadClicked = () => {
    this.setState({
      showUploadButton: false
    });

    this.uploadToS3();
    this.uploadToDynamoDb();
  }

  deleteFileFromDropzone = (fileName) => {
    // delete file from selectedFiles
    this.setState(prevState => ({
      selectedFiles: prevState.selectedFiles.filter(file => file.name !== fileName )
    }));

    // delete file loading property from dropFileStatusProps
    var obj = this.state.dropFileStatusProps;
    delete obj[fileName];
    this.setState({
      dropFileStatusProps: obj
    });
  }

  onDrop = (fileList) => {
    var selectedFiles = this.state.selectedFiles;
    // check if newly dropped files are duplicates of currently selected files
    for (var i = 0; i < fileList.length; i++) {
      var fileExists = false;
      var curFile = fileList[i];
      for (var j = 0; j < selectedFiles.length; j++) {
        if (curFile.name === selectedFiles[j].name) {
          fileExists = true;
          break;
        }
      }

      if (!fileExists) {
        selectedFiles.push(curFile);
      }
    }

    this.setState({
      selectedFiles: selectedFiles,
      showUploadButton: true
    });

    // set the loading property for each selected file
    var obj = {};
    for (var index = 0; index < selectedFiles.length; index++) {
      var fileName = selectedFiles[index].name;
      obj[fileName] = 0;
    }

    this.setState({
      dropFileStatusProps: obj
    });
  }

  dropzoneModalOpen = () => {
    this.setState({
      showDropzoneModal: true
    });
  }

  dropzoneModalClose = () => {
    this.setState({
      showDropzoneModal: false,
      selectedFiles: [],
      dropFileStatusProps: {},
      uploadingError: false
    });
  }

  /**
   * --------------------------------------------------------------
   * S3 upload, delete (still need to do delete)
   * --------------------------------------------------------------
   */

  uploadToS3 = async () => {
    var obj = this.state.dropFileStatusProps;
    
    for (var i = 0; i < this.state.selectedFiles.length; i++) {
      var file = this.state.selectedFiles[i];
      var name = this.state.selectedFiles[i].name;

      // set status for the uploading file to 1 (which means to show the loading spinner)
      obj[name] = 1;
      this.setState({
        dropFileStatusProps: obj
      });

      // upload the file
      S3Client.uploadFile(file, name)
        .then((data) => {
          var key = data.key;
          var name = key.substring(0, key.length - 6); // s3client adds '.x-m4a' to the end
          var obj = this.state.dropFileStatusProps;
          obj[name] = 2; // the file was uploaded successfully, set a 2 to display the checkmark
          this.setState({
            dropFileStatusProps: obj
          }, () => console.log(this.state.dropFileStatusProps));
        })
        .catch(err => {
          this.setState({
            uploadingError: true
          }, () => console.log(err));
        })
    }
  }

  deleteFromS3 = (filename) => {
    console.log('delete from s3');
    S3Client
      .deleteFile(filename)
      .then(response => console.log(response))
      .catch(err => console.error(err))
  };

  /**
   * --------------------------------------------------------------
   * DYNAMO DB upload, delete
   * --------------------------------------------------------------
   */

  uploadToDynamoDb = async () => {
    var selectedFiles = this.state.selectedFiles;
    for (var i = 0; i < selectedFiles.length; i++) {
      const requestOptions = {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: selectedFiles[i].name, date: Date.now()})
      };

      const response = await fetch(DYNAMODB_URL, requestOptions);
      const jsonResponse = await response.json();
      console.log(jsonResponse);
    }
  }

  deleteFromDynamoDb = async (filename) => {
    console.log('delete from dynamo db');
    const requestOptions = {
      method: 'DELETE',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: filename })
    };

    const response = await fetch(DYNAMODB_URL, requestOptions);
    const jsonResponse = await response.json();
    console.log(jsonResponse);
  }

  onDeleteClicked = (filename) => {
    console.log('on delete clicked');
    console.log(filename)
    this.deleteFromDynamoDb(filename);
    this.deleteFromS3(filename);
  }

  /**
   * --------------------------------------------------------------
   * PASSWORD MODAL show modal, close modal
   * --------------------------------------------------------------
   */

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

  /**
   * --------------------------------------------------------------
   * ComponentDidMount, displaying audio files
   * --------------------------------------------------------------
   */

  componentDidMount = () => {
    this.displayAudioRecords();
  }
  
  displayAudioRecords = () => {
    var audioRecords = this.props.location.state.storedAudioRecords;
    console.log(audioRecords);
    if (audioRecords.length === 0) {
      return 'No audio recordings available'
    }
    else {
      return audioRecords.map((file) => 
        <div key={file.name} style={{paddingLeft: '30px', marginTop: '30px', marginBottom: '100px'}}>
          <div>
            <h5>{file.name}</h5>
          </div>
          <div>
            <audio style={{float: 'left', width: '50%'}} title={file.name} controls key={file.name} src={S3_AUDIO_PATH + file.name} type="audio/mpeg"/>
            <IconButton onClick={this.onDeleteClicked.bind(this, file.name)} style={{float: 'left', borderRadius: '50%', width: '45px', height: '45px', marginLeft: '45px'}}>
              <DeleteIcon style={{ color: 'red', fontSize: '28px'}} />
            </IconButton>
          </div>
        </div>
      );
    }
  }

  onExit = () => {
    window.location.href = '/sundaymorningrecordings';
  }

  cloudUploadIconStyle = {
    // marginRight: '15px',
    float: 'right', 
    color: 'blue',
    fontSize: '23px'
  }

  exitIconStyle = {
    // marginRight: '0px',
    float: 'right',
    color: 'green',
    fontSize: '23px'
  }

  render() {
    return (
      <div className="pageContainer">
        <NavBar />
        <div className="contentWrap">
          <div className="btn-group-vertical" style={{marginRight: '60px', marginBottom: '30px', float: 'right'}}>
            <Button
              onClick={this.dropzoneModalOpen}
              variant='contained'
              style={{backgroundColor: 'white', color: 'blue', float: 'right', fontSize: '15px', boxShadow: 'none', marginBottom: '30px'}}
              startIcon={<CloudUploadIcon style={this.cloudUploadIconStyle} />}
            >
              Upload
            </Button>
            <Button
              onClick={this.onExit}
              variant='contained'
              style={{backgroundColor: 'white', color: 'green', float: 'right', fontSize: '15px', boxShadow: 'none', marginBottom: '30px', paddingRight: '20px'}}
              startIcon={<ExitToAppIcon style={this.exitIconStyle} />}
            >
              Exit
            </Button>
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
            show={this.state.showDropzoneModal} 
            handleClose={this.dropzoneModalClose} 
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