import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../../containers/default/pages/Home';
import Auth from '../../containers/default/pages/Auth';
import Tools from '../../containers/default/pages/Tools';
import Docs from '../../containers/default/pages/Docs';
import L1 from '../../containers/default/pages/Lessons/Front-End/L1';
import Blog from '../../containers/default/pages/Blog';
import Error404 from '../../containers/404';

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/auth/:form" component={Auth} />
          <Route exact path="/tools/:dir" component={Tools} />
          <Route exact path="/docs/:dir" component={Blog} />
          <Route component={Error404} />
        </Switch>
      </Router>
    );
  }
}
