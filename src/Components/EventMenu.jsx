import React, { Component } from "react";
import MenuItem from '@material-ui/core/MenuItem';
import MatButton from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';

class EventMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null
    }
  }

  handleEventTypeClick = (e) => {
    this.setState({
      anchorEl: e.currentTarget
    });
  }

  closeMenu = () => {
    this.setState({
      anchorEl: null
    });
  }

  handleEventSelection = (filename, event) => {
    if (event.currentTarget && event.currentTarget.id) {
      this.props.handleEventChange(filename, event.currentTarget.id);
    }

    this.closeMenu();
  }
  
  render() {
    return (
      <div>
        <MatButton aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleEventTypeClick}>
          {this.props.eventSelected ? this.props.eventSelected : 'Event'}
        </MatButton>
        <Menu
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={this.closeMenu}
        >
          <MenuItem id='sermon' onClick={this.handleEventSelection.bind(this, this.props.filename)}>Sermon</MenuItem>
          <MenuItem id='sundaySchool' onClick={this.handleEventSelection.bind(this, this.props.filename)}>Sunday School</MenuItem>
          <MenuItem id='bibleStudy' onClick={this.handleEventSelection.bind(this, this.props.filename)}>Bible Study</MenuItem>
          <MenuItem id='other' onClick={this.handleEventSelection.bind(this, this.props.filename)}>Other</MenuItem>
        </Menu>
      </div>
    )
  }
}

export default EventMenu;