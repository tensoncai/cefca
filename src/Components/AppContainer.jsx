import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./Home";
import Beliefs from "./Beliefs";
import Contact from "./Contact";
import SundayMorningRecordings from "./SundayMorningRecordings";
import EditPage from "./EditPage";

class AppContainer extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/beliefs" component={Beliefs} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/sundaymorningrecordings" component={SundayMorningRecordings} />
          <Route exact path="/editpage" component={EditPage} />
        </Switch>
      </Router>
    );
  }
}

export default AppContainer;
