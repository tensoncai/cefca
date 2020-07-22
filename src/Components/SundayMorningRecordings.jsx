import React, { Component } from "react";
import NavBar from "./NavBar"
import Footer from "./Footer";
import "../CSS/Styling.css";
import { Button } from "react-bootstrap";
// import S3 from 'aws-s3';
// import DropzoneUpload from "./DropzoneUpload";
// import PasswordModal from "./PasswordModal";
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { Link } from 'react-router-dom';

const DYNAMODB_URL = process.env.REACT_APP_DYNAMODB_URL;
const S3_AUDIO_PATH = process.env.REACT_APP_S3_AUDIO_PATH;

// const config = {
//   bucketName: process.env.REACT_APP_BUCKET_NAME,
//   region: 'us-east-2',
//   accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
//   secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
// }

// console.log(process.env.REACT_APP_ACCESS_KEY_ID);
/**
 * dropFileStatusProps object
 * dropFileStatusProps: {
 *      filename1: 0 means show trashcan
 *                 1 means show loading spinner
 *                 2 means show checkmark (successfully uploaded)
 *                 3 means show x mark (the file was not successfully uploaded)
 *  }
 */
// const S3Client = new S3(config);

class SundayMorningRecordings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storedAudioRecords: [],
      editIconClicked: false,
    }

    // this.onDrop                 = this.onDrop.bind(this);
    // this.handleShow             = this.handleShow.bind(this);
    // this.handleClose            = this.handleClose.bind(this);
    // this.deleteFileFromDropzone = this.deleteFileFromDropzone.bind(this);
    // this.onUploadClicked        = this.onUploadClicked.bind(this);
    // this.uploadToS3             = this.uploadToS3.bind(this);
    // this.uploadToDynamoDb       = this.uploadToDynamoDb.bind(this);
  }

  // onUploadClicked = () => {
  //   this.setState({
  //     showUploadButton: false
  //   });

  //   this.uploadToS3();
  //   this.uploadToDynamoDb();
  // }

  // onDrop = (fileList) => {
  //   var selectedFiles = this.state.selectedFiles;
  //   // check if newly dropped files are duplicates of currently selected files
  //   for (var i = 0; i < fileList.length; i++) {
  //     var fileExists = false;
  //     var curFile = fileList[i];
      
  //     for (var j = 0; j < selectedFiles.length; j++) {
  //       if (curFile.name === selectedFiles[j].name) {
  //         fileExists = true;
  //         break;
  //       }
  //     }

  //     if (!fileExists) {
  //       selectedFiles.push(curFile);
  //     }
  //   }

  //   this.setState({
  //     selectedFiles: selectedFiles,
  //     showUploadButton: true
  //   });

  //   // set the loading property for each selected file
  //   var obj = {};
  //   for (var index = 0; index < selectedFiles.length; index++) {
  //     var fileName = selectedFiles[index].name;
  //     obj[fileName] = 0;
  //   }

  //   this.setState({
  //     dropFileStatusProps: obj
  //   });
  // }

  // deleteFileFromDropzone = (fileName) => {
  //   // delete file from selectedFiles
  //   this.setState(prevState => ({
  //     selectedFiles: prevState.selectedFiles.filter(file => file.name !== fileName )
  //   }));

  //   // delete file loading property from dropFileStatusProps
  //   var obj = this.state.dropFileStatusProps;
  //   delete obj[fileName];
  //   this.setState({
  //     dropFileStatusProps: obj
  //   });
  // }

  // uploadToS3 = async () => {
  //   var obj = this.state.dropFileStatusProps;
    
  //   for (var i = 0; i < this.state.selectedFiles.length; i++) {
  //     var file = this.state.selectedFiles[i];
  //     var name = this.state.selectedFiles[i].name;

  //     // set status for the uploading file to 1 (which means to show the loading spinner)
  //     obj[name] = 1;
  //     this.setState({
  //       dropFileStatusProps: obj
  //     });

  //     // upload the file
  //     S3Client.uploadFile(file, name)
  //     .then((data) => {
  //       var key = data.key;
  //       var name = key.substring(0, key.length - 6); // s3client adds '.x-m4a' to the end
  //       console.log('key = ' + key);
  //       console.log('name = ' + name);

  //       var obj = this.state.dropFileStatusProps;
  //       obj[name] = 2; // the file was uploaded successfully, set a 2 to display the checkmark
  //       this.setState({
  //         dropFileStatusProps: obj
  //       }, () => console.log(this.state.dropFileStatusProps));
  //     })
  //     .catch(err => {
  //       this.setState({
  //         uploadingError: true
  //       }, () => console.log(err));
  //     })
  //   }
  // }

  componentDidMount = () => {
    this.fetchAllFromDynamoDb();
  }

  // deleteFromDynamoDb = async () => {
  //   const requestOptions = {
  //     method: 'DELETE',
  //     mode: 'cors',
  //     cache: 'no-cache',
  //     credentials: 'same-origin',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ name: 'react fetch test' })
  //   };

  //   const response = await fetch(DYNAMODB_URL, requestOptions);
  //   const jsonResponse = await response.json();
  //   console.log(jsonResponse);
  // }

  fetchAllFromDynamoDb = async () => {
    console.log('fetch from dynamo db');
    const response = await fetch(DYNAMODB_URL);
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    this.setState({
      storedAudioRecords: jsonResponse.Items
    }, () => console.log(this.state.storedAudioRecords));
  }

  // uploadToDynamoDb = async () => {
  //   var selectedFiles = this.state.selectedFiles;
  //   for (var i = 0; i < selectedFiles.length; i++) {
  //     const requestOptions = {
  //       method: 'POST',
  //       mode: 'cors',
  //       cache: 'no-cache',
  //       credentials: 'same-origin',
  //       headers: {'Content-Type': 'application/json'},
  //       body: JSON.stringify({name: selectedFiles[i].name, date: Date.now()})
  //     };

  //     const response = await fetch(DYNAMODB_URL, requestOptions);
  //     const jsonResponse = await response.json();
  //     console.log(jsonResponse);
  //   }
  // }

  // onDeleteClicked = () => {
  //   this.deleteFromDynamoDb();
  // }

  displayAudioRecords = () => {
    var audioRecords = this.state.storedAudioRecords;
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
          </div>
        </div>
      );
    }
  }

  editButtonStyle = {
    display: 'block', 
    borderRadius: '100%', 
    border: 'none',
    backgroundColor: 'white', 
    height: '50px', 
    width: '50px', 
    justifyContent: 'center',
    position: 'fixed',
    right: '0px',
    bottom: '60px'
  }

  render() {
    return (
      <div className="pageContainer">
        <NavBar />
        <div className="contentWrap">
          <Link
            to={{
              pathname: "/editpage", 
              state: {
                storedAudioRecords: this.state.storedAudioRecords
              }
          }}>
            <Button style={this.editButtonStyle} disabled={false} variant="primary">
              <EditRoundedIcon style={{fontSize: '20px', color: 'blue'}} />
            </Button>
          </Link>
          {this.displayAudioRecords()}
        </div>
        <Footer />
      </div>
    )
  }
}

export default SundayMorningRecordings;