import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./Home";
import Beliefs from "./Beliefs"
class AppContainer extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/beliefs" component={Beliefs} />
        </Switch>
      </Router>
    );
  }
}

export default AppContainer;
