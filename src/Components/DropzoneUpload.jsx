import React, { Component } from "react";
import "../CSS/Styling.css";
import Dropzone from 'react-dropzone';
import { Modal, Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';

class DropzoneUpload extends Component {
  // constructor(props) {
  //   super(props);
  // }

  onDelete = (fileName) => {
    this.props.onDelete(fileName);
  }

  displayFiles = (fileName) => {
    if (this.props.dropFileStatusProps[fileName] === 0) {
      return <DeleteIcon style={{float: 'right', color: 'red', fontSize: '28px'}} onClick={this.onDelete.bind(this, fileName)}/>
    }

    if (this.props.dropFileStatusProps[fileName] === 1) {
      return <Spinner style={{float: 'right', color: '#0072ff'}} animation="border" />
    }

    if (this.props.dropFileStatusProps[fileName] === 2) {
      return <CheckCircleOutlineRoundedIcon style={{float: 'right', color: '#00c400', fontSize: '28px'}} />
    }
  }
  
  render() {
    return (
      <Modal size='lg' backdrop='static' show={this.props.show} onHide={this.props.handleClose}>
        <Dropzone className='dropContainer' accept='' onDrop={this.props.onDrop} multiple>
          {({getRootProps, getInputProps}) => (
          <section>
            <div {...getRootProps()} className='dropzone'>
              <input {...getInputProps()}/>
              <p style={{fontSize: '20px'}}>Drop some files here, or click to select files</p>
            </div>
          </section>
          )}
        </Dropzone>
        <div style={{width: '100%'}} className="dropList">
          {this.props.selectedFiles.length > 0 && this.props.selectedFiles.map(file => (
            <li key={file.name} className="list-group-item" style={{width: '100%', textAlign: 'left'}}>
              <div style={{fontSize: '18px', fontWeight: 'bold'}}>
                {file.name}
                {this.displayFiles(file.name)}
              </div>
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