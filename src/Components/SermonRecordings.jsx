import React, { Component } from "react";
import NavBar from "./NavBar"
import Footer from "./Footer";
import "../CSS/Styling.css";
import { Button } from "react-bootstrap";
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { Link } from 'react-router-dom';

const DYNAMODB_URL = process.env.REACT_APP_DYNAMODB_URL;
const S3_AUDIO_PATH = process.env.REACT_APP_S3_AUDIO_PATH;
class SermonRecordings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editIconClicked: false,

      // audio records
      allAudioRecords: [],
      sermons: [],
      sundaySchool: [],
      bibleStudy: [],
      other: [],

      // event button enable/disable
      disableSermons: false,
      disableSundaySchool: false,
      disableBibleStudy: false,
      disableOther: false
    }
  }

  componentDidMount = () => {
    console.log("component mount");
    // this.fetchAllFromDynamoDb();
  }

  // fetchAllFromDynamoDb = async () => {
  //   // fetch all audio file records from dynamoDB
  //   console.log("fetch");
  //   const response = await fetch(DYNAMODB_URL);
  //   const jsonResponse = await response.json();
  //   var fetchedAudioFiles = jsonResponse.Items;

  //   // separate the audio files by event type (sermon, sundayschool, biblestudy, and other)
  //   var sermonFiles = fetchedAudioFiles.filter(file => file.event === 'sermon');
  //   var sundaySchoolFiles = fetchedAudioFiles.filter(file => file.event === 'sundayschool');
  //   var bibleStudyFiles = fetchedAudioFiles.filter(file => file.event === 'biblestudy');
  //   var otherFiles = fetchedAudioFiles.filter(file => file.event === 'other');

  //   // sort the audio files by date (from most recent to least recent)
  //   sermonFiles.sort((file1, file2) => (file2.date > file1.date) ? 1 : -1);
  //   sundaySchoolFiles.sort((file1, file2) => (file2.date > file1.date) ? 1 : -1);
  //   bibleStudyFiles.sort((file1, file2) => (file2.date > file1.date) ? 1 : -1);
  //   otherFiles.sort((file1, file2) => (file2.date > file1.date) ? 1 : -1);
    
  //   // var items = [];
  //   // for (var i = 0; i < 3; i++) {
  //   //   items.push(sermonFiles[i]);
  //   // }

  //   this.setState({
  //     allAudioRecords: fetchedAudioFiles,
  //     sermons: sermonFiles,
  //     // sermons: items,
  //     sundaySchool: sundaySchoolFiles,
  //     bibleStudy: bibleStudyFiles,
  //     other: otherFiles
  //   });
  // }

  // displayAudioByEvent = () => {
  //   if (this.state.disableSermons === true) { // the event selected was 'sermons'
  //     return this.displayAudioRecords(this.state.sermons);
  //   }
  //   else if (this.state.disableSundaySchool === true) { // the event selected was 'sunday school'
  //     return this.displayAudioRecords(this.state.sundaySchool);
  //   }
  //   else if (this.state.disableBibleStudy === true) { // the event selected was 'bible study'
  //     return this.displayAudioRecords(this.state.bibleStudy);
  //   }
  //   else if (this.state.disableOther === true) { // the event selected was 'other'
  //     return this.displayAudioRecords(this.state.other);
  //   }
  // }

  // displayAudioRecords = (audioRecords) => {
  //   if (audioRecords.length === 0) {
  //     return (
  //       <div style={{textAlign: 'center', fontWeight: 'bold'}}>
  //         No audio recordings available for this event
  //       </div>
  //     )
  //   }
  //   else {
  //     return (
  //       audioRecords.map(file => {
  //         return (
  //           <div key={file.name} style={{margin: '100px', listStyleType: 'none'}}>
  //             <li style={{fontWeight: 'bold'}}>{file.name}</li>
  //             <li>
  //               <audio
  //                 style={{float: 'left', width: '80%'}} 
  //                 title={file.name}
  //                 controls
  //                 key={file.name}
  //                 id='audio'
  //               >
  //                 <source src={S3_AUDIO_PATH + file.name} type="audio/mpeg" />
  //               </audio>
  //             </li>
  //           </div>
  //         )
  //       })
  //     )
  //   }
  // }

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
    var eventSelected = e.currentTarget.value;
    
    switch (eventSelected) {
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
      default:
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
          <div style={{textAlign: 'center'}}>
            <div style={{display: 'inline block'}}>
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
          </div>
          <div>
            {/* {this.displayAudioByEvent()} */}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default SermonRecordings;