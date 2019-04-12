import React, { Component } from 'react';
import { connect } from 'react-redux';
import BackTop from 'antd/lib/back-top'

class Framework extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // 框架进入 
  componentDidMount() {
    if (!_.includes(window.location.href, '#/auth/login') && !_.includes(window.location.href, '#/auth/register')) {
      if (!window.AUTH_TOKEN) {
        window.location.href = '#/auth/login';
        return;
      }
    }
  }

  render() {
    return (
      <div className="full">
       {React.Children.map(this.props.children, item => item)}
       <BackTop />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Framework);
