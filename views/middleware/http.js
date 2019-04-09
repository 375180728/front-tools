import 'isomorphic-fetch';
import React from 'react';
import { DOMAIN } from '../constants/config';
import { Hex_MD5 } from '../helpers/unit';
window._FETCHING = {};

function checkStatus(response) {
  if (response.status === 200) {
    return response;
  } else if (response.status === 401) {
    setImmediate(() => (window.location.href = '#/auth/login'));
    window.UI.Modal.info({ title: 'Error', content: '登录超时，请重新登录', okText: '知道了', centered: true });
    throw new Error('无权限');
  } else if (response.status === 500) {
    throw new Error('系统错误')
  }
}

function request({ url, method, data }, successCallback, errorCallback) {
  
  fetch(DOMAIN + encodeURI(url), {
    method: method || 'GET',
    headers: {
      Authorization: window.AUTH_TOKEN
    },
    body: data ? JSON.stringify(data) : undefined
  })
    .then(checkStatus)
    .then(response => response.json())
    .then(successCallback)
    .catch(errorCallback);
}

// 生成请求 KEY
function uniqueFetch(url, method, data) {
  data = data || {};
  return Hex_MD5(url + method + JSON.stringify(data));
}

export default store => next => action => {
  if (!action.payload || !action.payload.url) {
    return next(action);
  }

  const { url, method, data } = action.payload;
  const { error, success, callback, ignoreError } = action;

  return request(
    { url, method, data },
    res => {
      // 回调函数
      if (callback && _.isFunction(callback)) {
        callback(res, action);
      }

      // 业务错误
      if (res.status != 10000) {
        if (!ignoreError) {
          window.UI.Modal.error({
            title: 'Error',
            content: join(res.messages, <br />),
            okText: '知道了',
            centered: true
          });
        }
        if (error && error.length > 0) {
          _.each(error, fn => {
            if (fn.type == 'function') {
              fn.action(fn.params, res);
            } else if (fn.type == 'action') {
              store.dispatch(fn.action(fn.params, res));
            }
          });
        }
        return;
      }

      // 成功额外后续
      if (success && success.length > 0) {
        _.each(success, fn => {
          if (fn.type == 'function') {
            fn.action(fn.params, res);
          } else if (fn.type == 'action') {
            store.dispatch(fn.action(fn.params, res));
          }
        });
      }
      // DISPATCH TYPE
      return next({ ...action, result: res });
    },
    error => {
      // if (callback && _.isFunction(callback)) {
      //   callback(res, action);
      // }
      console.warn(error.message); 
    }
  );
};

const join = function(messages) {
  return (
    <div>
      {messages.map((message, index) => {
        if (index == message.length - 1) {
          return <p key={index}>message</p>;
        } else {
          return (
            <p key={index}>
              {message}
              <br />
            </p>
          );
        }
      })}
    </div>
  );
};
