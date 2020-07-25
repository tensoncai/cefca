import React, { Component } from "react";
import "../CSS/Styling.css";
import Dropzone from 'react-dropzone';
import { Modal, Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

class DropzoneUpload extends Component {
  constructor(props) {
    super(props);
  }

  onDelete = (fileName) => {
    this.props.onDelete(fileName);
  }

  handleDateChange = (filename, date) => {
    console.log(typeof(date));
    console.log(date);
    this.props.handleDateChange(filename, date);
  }

  displayDatePicker = (filename) => {
    console.log('filename = ' + filename);
    console.log('displaydatepicker');
    return <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              style={{marginLeft: '50px'}}
              keyboard='true'
              autoOk='true'
              format={"MMMM, d yyyy"}
              placeholder="MM/DD/YYYY"
              value={this.props.dropFileDates[filename] ? this.props.dropFileDates[filename]: null}
              // value={this.props.dropFileDates[filename]}
              inputVariant="standard"
              onChange={this.handleDateChange.bind(this, filename)} 
              InputProps={{disableUnderline: true}}
            />
          </MuiPickersUtilsProvider>
  }

  displayFiles = (fileName) => {
    if (this.props.dropFileStatusProps[fileName] === 0) {
      return <DeleteIcon style={{marginRight: '30px', float: 'right', color: 'red', fontSize: '28px'}} onClick={this.onDelete.bind(this, fileName)} />
    }

    if (this.props.dropFileStatusProps[fileName] === 1) {
      return <Spinner style={{float: 'right', color: '#0072ff'}} animation="border" />
    }

    if (this.props.dropFileStatusProps[fileName] === 2) {
      return <CheckCircleOutlineRoundedIcon style={{float: 'right', color: '#00c400', fontSize: '28px'}} />
    }
  }

  shouldDisableUploadButton = () => {
    var numOfFiles = this.props.selectedFiles.length;
    var numOfDates = Object.keys(this.props.dropFileDates).length;
    console.log('numOfFiles = ' + numOfFiles);
    console.log('numOfDates = ' + numOfDates);

    if (numOfFiles === 0) {
      return true;
    }

    if (numOfDates < numOfFiles) {
      return true;
    }

    return false;
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
        <div style={{marginTop: '8px', width: '100%'}} className="dropList">
          {this.props.selectedFiles.length > 0 && this.props.selectedFiles.map(file => (              
              <ul key={file.name} style={{paddingTop: '3px', columns: 3, listStyleType: 'none', borderBottom: '1px solid', borderBottomColor: '#e0e0e0'}}>
                  <li style={{fontSize: '18px', fontWeight: 'bold'}}>{file.name}</li>
                  <li>{this.displayDatePicker(file.name)}</li>
                  <li>{this.displayFiles(file.name)}</li>
              </ul>
          ))}
        </div>
        <Modal.Footer style={{border: 'none'}}>
          <Button className="mr-auto" variant="outline-danger" onClick={this.props.handleClose}>
            Cancel
          </Button>
          {this.props.uploadingError ? 
            <div style={{color: 'red', textAlign: 'center'}}>
              An error occurred. At least one file did not upload correctly.
            </div>
            :
            ''
          }
          <Button variant="outline-primary" disabled={this.shouldDisableUploadButton()} onClick={this.props.onUpload}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default DropzoneUpload;