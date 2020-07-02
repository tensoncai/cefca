import React, { Component } from "react";
import NavBar from "./NavBar"
import Footer from "./Footer";
import "../CSS/Styling.css";
import { Button } from "react-bootstrap";

class SundayMorningRecordings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFiles: [],
      fileHtmlElements: null
    }

    this.onFileChange = this.onFileChange.bind(this)
  }

  componentDidMount = () => {
    // make a call to the database. 

    // fetch all recordings and display them on the page
  }

  onFileChange = (e) => {

    var fileList = e.target.files;

    var files = [];
    var i;
    for (i = 0; i < fileList.length; i++) {
      var file = URL.createObjectURL(fileList[i]);
      files.push(file);
    }

    this.setState({
      selectedFiles: files
    }, () => console.log(this.state.selectedFiles));
  }

  onUploadClicked = () => {

    // send selected files to server



    // var fileHtmlElements = this.state.selectedFiles.map((file) => {
    //   return <audio controls><source src={file.name} type="audio/mpeg"/></audio>;
    // });

    // this.setState({
    //   fileHtmlElements: fileHtmlElements
    // });

    // return fileHtmlElements;
  }

  displayFiles = () => {
    if (this.state.selectedFiles.length === 0) {
      return 'No recordings'
    }
    else {
      var fileHtmlElements = this.state.selectedFiles.map((file) => {
        return <audio controls key={file} src={file} type="audio/mpeg"/>
      })

      return fileHtmlElements;
    }
  }

  render() {
    return (
      <div className="pageContainer">
        <NavBar />
        <div className="contentWrap">
        <input type="file" id="recording" accept=".m4a" onChange={this.onFileChange} multiple/>
        <Button onClick={this.onUploadClicked}>Upload</Button>
          <div>
            {this.displayFiles()}
          {/* <audio controls><source src="6-28-2020主日学：罗马书.m4a" type="audio/mpeg"/></audio>; */}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default SundayMorningRecordings;