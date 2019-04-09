// 没有权限错误
function NoAuthError(message) {
  this.msg = { messages: ['没有访问权限，请登录'], status: -401, error: '权限拒绝', timestamp: new Date().getTime() };
  this.code = 401;
}
NoAuthError.prototype = new Error();
NoAuthError.prototype.constructor = NoAuthError;

// 参数错误
function BadRequestError() {
  this.msg = { messages: ['请求参数错误'], status: -400, error: '请求参数错误', timestamp: new Date().getTime() };
  this.code = 400;
}
BadRequestError.prototype = new Error();
BadRequestError.prototype.constructor = BadRequestError;

// 校验错误
function verifiyError(message) {
  this.msg = { messages: message || ['校验不通过'], status: -100, error: '校验不通过', timestamp: new Date().getTime() };
  this.code = 200;
}
verifiyError.prototype = new Error();
verifiyError.prototype.constructor = verifiyError;

// 业务错误
function BusinessError(message) {
  this.msg = { messages: message || ['普通错误'], status: -101, error: '普通错误', timestamp: new Date().getTime() };
  this.code = 200;
}
BusinessError.prototype = new Error();
BusinessError.prototype.constructor = BusinessError;

// 数据库错误
function DatabaseError(message) {
  this.msg = { messages: message || ['数据库错误'], status: -600, error: '数据库错误', timestamp: new Date().getTime() };
  this.code = 200;
}
DatabaseError.prototype = new Error();
DatabaseError.prototype.constructor = DatabaseError;

module.exports.NoAuthError = NoAuthError;
module.exports.BadRequestError = BadRequestError;
module.exports.verifiyError = verifiyError;
module.exports.BusinessError = BusinessError;
module.exports.DatabaseError = DatabaseError;
