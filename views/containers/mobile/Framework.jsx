import React, { Component } from 'react';
import { connect } from 'react-redux';

class Framework extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // 框架进入
  componentDidMount() {
    
  }

  render() {
    return (
      <div className="full">
       {React.Children.map(this.props.children, item => item)}
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
