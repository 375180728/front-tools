import * as ACTION from '../constants/types/userTypes';
import { packageReq } from '../helpers/request';

//注册
export function register(request, callback) {
  var payload = packageReq('REGISTER', null, request, 'POST');
  return {
    type: ACTION.REGISTER,
    payload,
    callback,
    success: [
      {
        action: ({ msg }) => window.UI.message.success(msg),
        params: {msg: '注册账号成功，请通知管理员激活账号!',},
        type: 'function'
      }
    ]
  };
}

//登录
export function login(user, callback) {
  var payload = packageReq('LOGIN', null, _.omit(user, 'remember'), 'POST', true);
  return {
    type: ACTION.LOGIN,
    payload,
    callback,
    user
  };
}
