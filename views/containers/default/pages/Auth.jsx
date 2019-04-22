import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';
import Input from 'antd/lib/input';
import Icon from 'antd/lib/icon';
import Spin from 'antd/lib/spin';
import Radio from 'antd/lib/radio';

import Logo from '../../../i/login/logo.png';

export class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      form: this.props.match.params.form
    };
  }

  componentWillReceiveProps(nextProps) {
    const form = this.props.match.params.form;
    const nextForm = nextProps.match.params.form;
    if (form != nextForm) {
      this.setState({ form: nextForm });
    }
  }

  login(values) {
    this.setState({ submit: true });
    this.props.$$USER.login(values, () => this.setState({ submit: false }));
  }

  register(values) {
    this.setState({ submit: true });
    this.props.$$USER.register(values, () => this.setState({ submit: false }));
  }

  render() {
    return (
      <div className="auth-containers">
        <div className="l" />
        <div className="r">
          {this.state.form == 'register' ? (
            <WrapRigisterForm register={values => this.register(values)} submit={this.state.submit} />
          ) : (
            <WrapLoginForm login={values => this.login(values)} submit={this.state.submit} />
          )}
        </div>
        <div className="cat">
          <div className="hello" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  $user: state.user
});

const mapDispatchToProps = dispatch => ({
  $$USER: bindActionCreators(userAction, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);

class LoginForm extends Component {
  validate() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        return this.props.login(values);
      }
    });
  }

  handleKeyDown(event) {
    if (event.keyCode !== 13) {
      return;
    }
    if (!this.props.submit) {
      return;
    }
    this.validate();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const username = $.getCookie('username') || '';
    const password = $.getCookie('password') || '';
    return (
      <Form onKeyDown={this.handleKeyDown} onSubmit={() => this.validate()} className="auth-form">
        <h2>
          <img src={Logo} />
          FE Assist
        </h2>
        <div className="desc">FE Assist 致力于协助前端工程师更高效的完成工作</div>
        <Form.Item className="input">
          {getFieldDecorator('username', { rules: [{ required: true, message: '请填写用户名' }], initialValue: username })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
          )}
        </Form.Item>
        <Form.Item className="input">
          {getFieldDecorator('password', { rules: [{ required: true, message: '请填写密码' }], initialValue: password })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
          )}
        </Form.Item>
        <Form.Item className="input">
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(<Checkbox>记住用户</Checkbox>)}
          <a className="auth-form-rigister" href="#/auth/register">
            注册账户
          </a>
          <Spin spinning={this.props.submit}>
            <Button type="primary" htmlType="submit" className="auth-form-button">
              登 录
            </Button>
          </Spin>
        </Form.Item>
      </Form>
    );
  }
}
const WrapLoginForm = Form.create()(LoginForm);

class RigisterForm extends Component {
  validate() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.register(values);
      }
    });
  }

  handleKeyDown(event) {
    if (event.keyCode !== 13) {
      return;
    }
    if (!this.props.submit) {
      return;
    }
    this.validate();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onKeyDown={this.handleKeyDown} onSubmit={() => this.validate()} className="auth-form">
        <h2>
          <img src={Logo} />
          FE Assist
        </h2>
        <div className="desc">FE Assist 致力于协助前端工程师更高效的完成工作</div>
        <Form.Item className="input">
          {getFieldDecorator('username', { rules: [{ required: true, message: '请填写用户名' }], initialValue: '' })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
          )}
        </Form.Item>
        <Form.Item className="input">
          {getFieldDecorator('password', { rules: [{ required: true, message: '请填写密码' }], initialValue: '' })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
          )}
        </Form.Item>
        <Form.Item className="input">
          {getFieldDecorator('email', { rules: [{ required: true, message: '请填写电子邮箱' }], initialValue: '' })(
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="电子邮箱" />
          )}
        </Form.Item>
        <Form.Item className="input">
          {getFieldDecorator('role', { initialValue: '1' })(
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="1">前端</Radio.Button>
              <Radio.Button value="2">测试</Radio.Button>
              <Radio.Button value="3">产品</Radio.Button>
            </Radio.Group>
          )}
          <a className="auth-form-rigister" href="#/auth/login">
            使用已有账号登录!
          </a>
        </Form.Item>
        <Form.Item className="input">
          <Spin spinning={this.props.submit}>
            <Button type="primary" htmlType="submit" className="auth-form-button">
              注 册
            </Button>
          </Spin>
        </Form.Item>
      </Form>
    );
  }
}
const WrapRigisterForm = Form.create()(RigisterForm);
