// 用户密码加密私钥
module.exports.SECRET_KEY = 'U2FsdGVkX19h37oAKw/0/DsxRFH/8E/wG2ZHK/VeE8wkbncmIjm2aWvQzE106Xp7';

// 数据库
module.exports.DATABASE = {
  USERNAME: 'psx',
  PASSWORD: 'd1fdd9764212a7e4ce78cff0b9f5b99a',
  HOST: '127.0.0.1:27017',
  DB: 'front-tools'
}

// 服务器日志路径
module.exports.LOG_PATH = process.env.NODE_ENV == 'production' ? '/www/logs/front-tools' : 'C:\\logs\\front-tools';

// token过期时间
module.exports.TOKEN_EXPIRED_TIME = 3600;

// 用户角色
module.exports.ROLES = {
  FRONT_END: 1, // 前端
  TESTER: 2, // 测试
  PRODUCT: 3, // 产品
  ALL: [1, 2, 3]
};

// 用户状态
module.exports.USER_STATUS = {
  INACTIVATED: 0,
  ACTIVATED: 1,
  DISABLE: 2
}

// 平台ID
module.exports.PLATFORMS = {
  XY: 1,
  XC: 2,
  HY: 3,
  HC: 4,
  ALL: [1, 2, 3, 4]
};

// 需求类型
module.exports.CASE_TYPE = {
  USUAL: 1, // 日常需求
  FUNCTION: 2, // 功能同步
  IMPROVE: 3, // 优化同步
  BUG: 3, // BUG修复同步
  ALL: [1, 2, 3, 4]
};

// 需求状态
module.exports.CASE_STATUS = {
  OPEN: 1, // 打开
  CLOSE: 2, // 关闭
  PENDING: 3, // 等待
  ALL: [1, 2, 3]
};

// 服务器响应值
module.exports.RES = require('./response');
