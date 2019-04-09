import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../../containers/mobile/pages/Home';
import Error404 from '../../containers/404'

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route component={Error404}/> 
        </Switch>
      </Router>
    );
  }
}
