// 用户输入值校验服务
const _ = require('lodash');
const { REX } = require('../helper');
const { ROLES, PLATFORMS, CASE_TYPE } = require('../config');

// 用户注册
const userRegister = function(input) {
  let errors = [];
  if (!input.username) {
    errors.push('用户名不能为空');
  } else if (!REX.ACCOUNT.test(input.username)) {
    errors.push('用户名格式不正确');
  }
  if (!input.password) {
    errors.push('密码不能为空');
  }
  if (!input.role) {
    errors.push('用户角色不能为空');
  } else if (!_.includes(ROLES.ALL, Number(input.role))) {
    errors.push('用户角色不正确');
  }
  if (!input.email) {
    errors.push('邮箱不能为空');
  } else if (!REX.EMAIL.test(input.email)) {
    errors.push('邮箱格式不正确');
  }
  return errors;
};

// 新建需求
const createCase = function(input) {
  let errors = [];
  if (!input.name) {
    errors.push('需求名称不能为空');
  } else if (input.name.length > 16) {
    errors.push('需求名称不能超过16位');
  }
  if (!input.jira_id) {
    errors.push('JIAR号不能为空');
  }
  if (!input.platform) {
    errors.push('开发平台不能为空');
  } else if (!_.includes(PLATFORMS.ALL, Number(input.platform))) {
    errors.push('开发平台ID不正确');
  }
  if (!input.type) {
    errors.push('需求类型不能为空');
  } else if (!_.includes(CASE_TYPE.ALL, Number(input.type))) {
    errors.push('需求类型ID不正确');
  }
  if (!input.relation_branch || !_.isArray(input.relation_branch) || input.relation_branch.length == 0) {
    errors.push('涉及分支不能为空');
  } else {
    _.each(input.relation_branch, branch => {
      if (!_.includes(['master', 'pc-master', 'h5-master'], branch)) {
        errors.push('涉及分支类型有误');
        return false;
      }
    });
  }
  // 同步功能时需要填写对应同步的平台
  if (input.type == CASE_TYPE.FUNCTION || input.type == CASE_TYPE.IMPROVE) {
    if (!input.sync_platforms || !_.isArray(input.sync_platforms) || input.sync_platforms.length == 0) {
      errors.push('被同步平台不能为空');
    } else {
      _.each(input.sync_platforms, item => {
        if (!_.includes(CASE_TYPE.ALL, Number(item))) {
          errors.push('被同步平台ID不正确');
        }
      });
    }
  }
  return errors;
};

module.exports.userRegister = userRegister;
module.exports.createCase = createCase;
