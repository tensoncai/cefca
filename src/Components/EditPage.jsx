import React, { Component } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import "../CSS/Styling.css";
import ButtonGroup from 'react-bootstrap/ButtonGroup'
// import PasswordModal from "./PasswordModal";
import DropzoneUpload from "./DropzoneUpload";
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
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

const events = {
  SUNDAYSTUDY: 0,
  SUNDAYSERMON: 1,
  TUESDAYFRIDAYSTUDY: 2,
  OTHER: 3
}

/**
 * dropFileStatusProps: {
 *      filename1: 0 means show trashcan
 *                 1 means show loading spinner
 *                 2 means show checkmark (successfully uploaded)
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
      dropFileDates: {},
      dropFileEventTypes: {},
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
    this.handleDateChange       = this.handleDateChange.bind(this);
    // this.handleEventChange      = this.handleEventChange.bind(this);
  }

  /**
   * ---------------------------------------------------------------------------------
   * DROPZONE MODAL upload, delete, drop, show modal, close modal, date, event types
   * ---------------------------------------------------------------------------------
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
    }), /*() => console.log(this.state.selectedFiles)*/);

    // delete file loading property from dropFileStatusProps
    var obj = this.state.dropFileStatusProps;
    delete obj[fileName];
    this.setState({
      dropFileStatusProps: obj
    }, /*() => console.log(this.state.dropFileStatusProps)*/);

    // delete the date of the file
    var dateObj = this.state.dropFileDates;
    delete dateObj[fileName];
    this.setState({
      dropFileDates: dateObj
    }, /*() => console.log(this.state.dropFileDates)*/);

    // delete the event type of the file
    var eventObj = this.state.dropFileEventTypes;
    delete eventObj[fileName];
    this.setState({
      dropFileEventTypes: eventObj
    }, () => console.log(this.state.dropFileEventTypes));
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

    // set the status property for each selected file
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
    // console.log('dropzoneModalOpen');
    this.setState({
      showDropzoneModal: true
    });
  }

  dropzoneModalClose = () => {
    // console.log('dropzoneModalClose');
    this.setState({
      showDropzoneModal: false,
      selectedFiles: [],
      dropFileStatusProps: {},
      dropFileDates: {},
      dropFileEventTypes: {},
      uploadingError: false
    });
  }

  handleDateChange = (filename, date) => {
    var dateObj = this.state.dropFileDates;
    dateObj[filename] = date;
    this.setState({
      dropFileDates: dateObj
    }, /*() => console.log(this.state.dropFileDates)*/);
  }

  handleEventChange = (filename, event) => {
    console.log(event);
    var eventObj = this.state.dropFileEventTypes;
    eventObj[filename] = event;
    console.log('file NAME = ' + filename);
    this.setState({
      dropFileEventTypes: eventObj
    }, () => console.log(this.state.dropFileEventTypes));
  }

  /**
   * --------------------------------------------------------------
   * S3 upload and delete
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
    // console.log('delete from s3');
    S3Client
      .deleteFile(filename)
      .then(response => console.log(response))
      .catch(err => console.error(err))
  };

  /**
   * --------------------------------------------------------------
   * DYNAMO DB upload, delete, format date
   * --------------------------------------------------------------
   */

  formatDate = (filename) => {
    var year = this.state.dropFileDates[filename].getFullYear();
    var month = this.state.dropFileDates[filename].getMonth(); // Jan is 0
    var day = this.state.dropFileDates[filename].getDate();

    var m = '' + month;
    if (month < 10) {
      m = '0' + m;
    }

    var d = '' + day;
    if (day < 10) {
      d = '0' + d;
    }

    var dateString = '' + year + m + d;
    var dateNumber = parseInt(dateString, 10);

    // console.log('string = ' + dateString);
    // console.log('number = ' + dateNumber);
    return dateNumber;
  }

  uploadToDynamoDb = async () => {
    var selectedFiles = this.state.selectedFiles;
    for (var i = 0; i < selectedFiles.length; i++) {
      var file = selectedFiles[i];
      var dateNumber = this.formatDate(file.name);
      var eventType = this.state.dropFileEventTypes[file.name];

      const requestOptions = {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: file.name, date: dateNumber, event: eventType})
      };

      const response = await fetch(DYNAMODB_URL, requestOptions);
      const jsonResponse = await response.json();
      console.log(jsonResponse);
    }
  }

  deleteFromDynamoDb = async (filename) => {
    // console.log('delete from dynamo db');
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
    this.deleteFromDynamoDb(filename);
    this.deleteFromS3(filename);

    this.setState(prevState => ({
      storedAudioRecords: prevState.storedAudioRecords.filter(file => file.name !== filename )
    }), /*console.log(this.state.storedAudioRecords)*/);
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
    this.setState({
      storedAudioRecords: this.props.location.state.storedAudioRecords
    }, this.displayAudioRecords)
  }
  
  displayAudioRecords = () => {
    // console.log('displayAudioRecords');
    var audioRecords = this.state.storedAudioRecords;
    // console.log(audioRecords);
    if (audioRecords.length === 0) {
      return 'No audio recordings available'
    }
    else {
      return audioRecords.map((file) => 
        <div key={file.name} style={{paddingLeft: '30px', marginTop: '30px', marginBottom: '100px', width: '80%'}}>
          <div>
            <h5>{file.name}</h5>
          </div>
          <div>
            <audio style={{float: 'left', width: '75%'}} title={file.name} controls key={file.name} src={S3_AUDIO_PATH + file.name} type="audio/mpeg"/>
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

  /**
   * STYLINGS
   */

  uploadButtonStyle = {
    backgroundColor: 'white', 
    color: 'blue', 
    fontSize: '15px', 
    boxShadow: 'none',
    marginBottom: '30px',
  }

  cloudUploadIconStyle = {
    color: 'blue',
    fontSize: '23px'
  }

  exitButtonStyle = {
    backgroundColor: 'white', 
    color: '#08d30e',
    fontSize: '15px',
    boxShadow: 'none',
    marginBottom: '30px',
  }

  exitIconStyle = {
    color: '#08d30e',
    fontSize: '23px'
  }

  render() {
    return (
      <div className="pageContainer">
        <NavBar />
        <div className="contentWrap">
          {/* <div className="btn-group" style={{display: 'block', backgroundColor: 'red'}}> */}
          <ButtonGroup vertical style={{top: '30px', position: 'sticky', backgroundColor: 'white', float: 'right', marginRight: '30px', marginTop: '30px'}}>
            <Button
              onClick={this.onExit}
              variant='contained'
              style={this.exitButtonStyle}
              startIcon={<ExitToAppIcon style={this.exitIconStyle} />}
            >
              Exit
            </Button>
            <Button
              onClick={this.dropzoneModalOpen}
              variant='contained'
              style={this.uploadButtonStyle}
              startIcon={<CloudUploadIcon style={this.cloudUploadIconStyle} />}
            >
              Upload
            </Button>
          </ButtonGroup>  
          {/* </div> */}
          

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
            handleDateChange={this.handleDateChange}
            dropFileDates={this.state.dropFileDates}
            dropFileEventTypes={this.state.dropFileEventTypes}
            handleEventChange={this.handleEventChange}
          />
        </div>
        <Footer />
      </div>
    )
  }
}

export default EditPage;