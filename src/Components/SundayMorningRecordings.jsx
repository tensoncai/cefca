import React, { Component } from "react";
import NavBar from "./NavBar"
import Footer from "./Footer";
import "../CSS/Styling.css";
import { Button } from "react-bootstrap";
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { Link } from 'react-router-dom';

const DYNAMODB_URL = process.env.REACT_APP_DYNAMODB_URL;
const S3_AUDIO_PATH = process.env.REACT_APP_S3_AUDIO_PATH;

class SundayMorningRecordings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editIconClicked: false,
      allAudioRecords: [],
      sermons: [],
      sundaySchool: [],
      bibleStudy: [],
      other: [],
      eventButtons: {
        disableSermons: false,
        disableSundaySchool: false,
        disableBibleStudy: false,
        disableOther: false
      }
    }
  }

  componentDidMount = () => {
    // this.fetchAllFromDynamoDb();
  }

  fetchAllFromDynamoDb = async () => {
    // fetch all file records from dynamoDB
    const response = await fetch(DYNAMODB_URL);
    const jsonResponse = await response.json();

    // separate the audio files by event type (sermon, sundayschool, biblestudy, and other)
    var fetchedAudioFiles = jsonResponse.Items;
    
    var sermonFiles = fetchedAudioFiles.filter(file => file.event === 'sermon');
    var sundaySchoolFiles = fetchedAudioFiles.filter(file => file.event === 'sundayschool');
    var bibleStudyFiles = fetchedAudioFiles.filter(file => file.event === 'biblestudy');
    var otherFiles = fetchedAudioFiles.filter(file => file.event === 'other');

    // sort the audio files by date (from most recent to least recent)
    sermonFiles.sort((file1, file2) => (file2.date > file1.date) ? 1 : -1);
    sundaySchoolFiles.sort((file1, file2) => (file2.date > file1.date) ? 1 : -1);
    bibleStudyFiles.sort((file1, file2) => (file2.date > file1.date) ? 1 : -1);
    otherFiles.sort((file1, file2) => (file2.date > file1.date) ? 1 : -1);
    
    this.setState({
      allAudioRecords: fetchedAudioFiles,
      sermons: sermonFiles,
      sundaySchool: sundaySchoolFiles,
      bibleStudy: bibleStudyFiles,
      other: otherFiles
    }, () => console.log(this.state));
  }

  displayAudioRecords = () => {
    var audioRecords = this.state.allAudioRecords;
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
            <audio 
              style={{float: 'left', width: '50%'}} 
              title={file.name} 
              controls
              key={file.name} 
              src={S3_AUDIO_PATH + file.name} 
              type="audio/mpeg"/>
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

  eventButtonStyle = {
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    margin: '30px',
    height: '100px',
    width: '150px',
    borderRadius: '10px',
    border: 'none',
    fontSize: '20px',
    fontWeight: 'bold'
  }

  onEventButtonClicked = (e) => {
    console.log(e.currentTarget.value);
    switch (e.currentTarget.value) {
      case 'sermons':
        this.setState({
          disableSermons: true,
          disableSundaySchool: false,
          disableBibleStudy: false,
          disableOther: false,
        });
        break;
      case 'sundaySchool': 
        this.setState({
          disableSermons: false,
          disableSundaySchool: true,
          disableBibleStudy: false,
          disableOther: false,
        });
        break;
      case 'bibleStudy': 
        this.setState({
          disableSermons: false,
          disableSundaySchool: false,
          disableBibleStudy: true,
          disableOther: false,
        });
        break;
      case 'other': 
        this.setState({
          disableSermons: false,
          disableSundaySchool: false,
          disableBibleStudy: false,
          disableOther: true,
        });
        break;
    }
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
                storedAudioRecords: this.state.allAudioRecords
              }
          }}>
            <Button style={this.editButtonStyle} disabled={false} variant="primary">
              <EditRoundedIcon style={{fontSize: '20px', color: 'blue'}} />
            </Button>
          </Link>
          <div>
            <Button
              value='sermons'
              id="eventButtonStyle"
              style={{background: 'linear-gradient(0deg, #F09819 30%, #EDDE5D 100%)'}}
              onClick={this.onEventButtonClicked}
              disabled={this.state.disableSermons}
            >
              Sermons
            </Button>
            <Button 
              value="sundaySchool"
              id="eventButtonStyle" 
              style={{background: 'linear-gradient(#8fdab0 0%, #228B22 100%)'}}
              onClick={this.onEventButtonClicked}
              disabled={this.state.disableSundaySchool}
            >
              Sunday School
            </Button>
            <Button 
              value="bibleStudy"
              id="eventButtonStyle" 
              style={{background: 'linear-gradient(0deg, #b30000 0%, #ff7676 100%)'}}
              onClick={this.onEventButtonClicked}
              disabled={this.state.disableBibleStudy}
            >
              Bible Study
            </Button>
            <Button 
              value="other"
              id="eventButtonStyle" 
              style={{background: 'linear-gradient(0deg, #0276FD 0%, #B9D3EE 100%)'}}
              onClick={this.onEventButtonClicked}
              disabled={this.state.disableOther}
            >
              Other
            </Button>
          </div>
          {/* {this.displayAudioRecords()} */}
        </div>
        <Footer />
      </div>
    )
  }
}

export default SundayMorningRecordings;