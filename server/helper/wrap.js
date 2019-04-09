var Promise = require('bluebird');
const { ERROR } = require('../helper')

function wrapExec(res) {
  return async function(fn) {
    return await new Promise((resolve, reject) => {
      fn()
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          res.status(200);
          res.json({ messages: [error.toString()] || ['数据库错误'], status: -600, error: '数据库错误', timestamp: new Date().getTime() });
        });
    });
  };
}

module.exports.wrapExec = wrapExec;
