import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Routes from '../routes/default';
import Framework from '../../containers/default/Framework';
import 'antd/dist/antd.css';
require('../../styles/default/style.scss');

export default class Root extends Component {
  
  componentWillMount() {
    window.AUTH_TOKEN = $.getCookie('auth');
    window.AUTH_USERNAME = $.getCookie('username');
    window.AUTH_EXPIRESIN = $.getCookie('auth-expires-in');
  }

  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <Framework>
          <Routes />
        </Framework>
      </Provider>
    );
  }
}
