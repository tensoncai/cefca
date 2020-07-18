import React, { Component } from "react";
import NavBar from "./NavBar"
import Footer from "./Footer";
import "../CSS/Styling.css";
import { Button } from "react-bootstrap";
import S3 from 'aws-s3';
import DropzoneUpload from "./DropzoneUpload";

const DYNAMODB_URL = process.env.REACT_APP_DYNAMODB_URL;
const S3_AUDIO_PATH = process.env.REACT_APP_S3_AUDIO_PATH;

const config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME,
  region: 'us-east-2',
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
}

// console.log(process.env.REACT_APP_ACCESS_KEY_ID);

const S3Client = new S3(config);

class SundayMorningRecordings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFiles: [],
      byteBuffers: [],
      showModal: false,
      isLoading: false,
      showUploadButton: false
    }

    this.onDrop = this.onDrop.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onDeleteDropFile = this.onDeleteDropFile.bind(this);
    this.onUploadClicked = this.onUploadClicked.bind(this);
    this.uploadToS3 = this.uploadToS3.bind(this);
    this.uploadToDynamoDb = this.uploadToDynamoDb.bind(this);
  }

  onUploadClicked = () => {
    this.setState({
      showUploadButton: false
    });

    this.uploadToS3();
    this.uploadToDynamoDb();
  }

  onDrop = (fileList) => {
    var selectedFiles = this.state.selectedFiles;

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
    }, () => console.log(this.state.selectedFiles));
  }

  onDeleteDropFile = (fileName) => {
    console.log("delete clicked");
    this.setState(prevState => ({
      selectedFiles: prevState.selectedFiles.filter(file => file.name !== fileName )
    }), () => console.log(this.state.selectedFiles));
  }

  uploadToS3 = async () => {
    for (var i = 0; i < this.state.selectedFiles.length; i++) {
      var file = this.state.selectedFiles[i];
      var name = this.state.selectedFiles[i].name;

      this.setState({
        isLoading: true
      });

      S3Client.uploadFile(file, name)
      .then((data) => {
        console.log(data);
        this.setState({
          isLoading: false
        })
      })
      .catch(err => console.error(err))
      console.log('s3 upload file ' + i);
    }
  }

  componentDidMount = () => {
    // this.getAllRecords();
  }

  deleteRecord = async () => {
    const requestOptions = {
      method: 'DELETE',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'react fetch test' })
    };

    const response = await fetch(DYNAMODB_URL, requestOptions);
    const jsonResponse = await response.json();
    console.log(jsonResponse);
  }

  getAllRecords = async () => {
    const response = await fetch(DYNAMODB_URL);
    const jsonResponse = await response.json();

    this.setState({
      selectedFiles: jsonResponse.Items
    }, this.displayFiles);
  }

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

  // uploadToS3 = async (key, byteBuffer) => {
  //   // uploads .m4a audio file to S3 bucket
  //   const requestOptions = {
  //     method: 'POST',
  //     mode: 'cors',
  //     cache: 'no-cache',
  //     credentials: 'same-origin',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ key: key, byteBuffer: byteBuffer })
  //   };

  //   // const response = await fetch(S3_URL, requestOptions);
  //   // const jsonResponse = await response.json();
  // }

  // onFileChange = (e) => {
  //   var fileList = e.target.files;
  //   var files = [];
  //   for (var i = 0; i < fileList.length; i++) {
  //     files.push(fileList[i]);
  //   }

  //   this.setState(prevState => ({
  //     selectedFiles: [...prevState.selectedFiles, files]
  //   }), () => console.log(this.state.selectedFiles));
  // }

  onDeleteClicked = () => {
    this.deleteRecord();
  }

  displayFiles = () => {
    if (this.state.selectedFiles.length === 0) {
      return 'No recordings'
    }
    else {
      console.log(this.state.selectedFiles);
      var fileHtmlElements = this.state.selectedFiles.map((file) => 
        <div style={{paddingLeft: '30px', marginBottom: '30px'}}>
          <h5>{file.name}</h5>
          {/* <audio style={{width: '50%', backgroundColor: 'blue'}} title={file.name} controls key={file.name} src={S3_AUDIO_PATH + file.name} type="audio/mpeg"/> */}
        </div>
      );

      return fileHtmlElements;
    }
  }

  handleShow = () => {
    this.setState({
      showModal: true
    });
  }

  handleClose = () => {
    this.setState({
      showModal: false,
      selectedFiles: []
    });
  }

  render() {
    return (
      <div className="pageContainer">
        <NavBar />
        <div  className="contentWrap">

          <Button variant="primary" onClick={this.handleShow}>
            Launch Modal
          </Button>
          
          <DropzoneUpload
            selectedFiles={this.state.selectedFiles} 
            onDelete={this.onDeleteDropFile} 
            onDrop={this.onDrop}
            show={this.state.showModal} 
            handleClose={this.handleClose} 
            onUpload={this.onUploadClicked}
            isLoading={this.state.isLoading}
          />
          
          
          {/* <input type="file" id="recording" accept=".m4a" onChange={this.onFileChange} multiple/> */}
          {/* <Button onClick={this.onUploadClicked}>Upload</Button> */}
         
          {/* {this.displayFiles()} */}
         

          {/* <Button onClick={this.onDeleteClicked}>Delete</Button> */}
        </div>
        <Footer />
      </div>
    )
  }
}

export default SundayMorningRecordings;