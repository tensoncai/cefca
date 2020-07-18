import React, { Component } from "react";
import "../CSS/Styling.css";
import Dropzone from 'react-dropzone';
import { Modal, Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

class DropzoneUpload extends Component {
  // constructor(props) {
  //   super(props);
  // }

  onDelete = (fileName) => {
    this.props.onDelete(fileName);
  }
  
  render() {
    return (
      <Modal size="lg" show={this.props.show} onHide={this.props.handleClose}>
        <Dropzone className="dropContainer" accept="" onDrop={this.props.onDrop} multiple>
          {({getRootProps, getInputProps}) => (
          <section>
            <div {...getRootProps()} className="dropzone">
              <input {...getInputProps()}/>
              <p style={{fontSize: '20px'}}>Drop some files here, or click to select files</p>
            </div>
          </section>
          )}
        </Dropzone>
        <div style={{width: '100%'}} className="dropList">
          {this.props.selectedFiles.length > 0 && this.props.selectedFiles.map(file => (
            <li key={file.name} className="list-group-item" style={{width: '100%', textAlign: 'left'}}>
              {file.name}
              {this.props.isLoading ?
                <Spinner style={{float: 'right'}} animation="border" variant="primary" /> 
                :
                <Button style={{background: 'none', border: 'none', color: 'black', float: 'right'}} 
                      onClick={this.onDelete.bind(this, file.name)}>
                  Delete
                </Button>
              }
            </li>
          ))}
        </div>
        <Modal.Footer style={{border: 'none'}}>
          <Button className="mr-auto" variant="danger" onClick={this.props.handleClose}>
            Cancel
          </Button>
          <Button variant="primary" disabled={this.props.selectedFiles.length === 0} onClick={this.props.onUpload}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default DropzoneUpload;