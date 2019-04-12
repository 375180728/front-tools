const _ = require('lodash');
const crypto = require('crypto-js');
const mongoose = require('../database/core');
const userModel = require('./user');
const { RES, SECRET_KEY, TOKEN_EXPIRED_TIME, USER_STATUS } = require('../config');
const { wrapExec } = require('../helper/wrap')
const { ERROR } = require('../helper')
/**
 * 权限认证表
 */
const AuthSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    token: { type: String, required: true },
    login_ip: { type: String },
    create_date: { type: Date },
    update_date: { type: Date }
  },
  { versionKey: false }
);

// 登录认证
AuthSchema.static('login', async (req, res, next) => {
  const reqUser = req.body;
  if (!reqUser.username || !reqUser.password) {
    throw new ERROR.verifiyError(['用户名密码不能为空'])
  }
  // 查询用户
  let dbUser = await wrapExec(res)(() => userModel.findOne({ username: reqUser.username }).exec());
  if (!dbUser) {
    throw new ERROR.BusinessError(['用户名密码不正确']);
  }
  if(dbUser.status == USER_STATUS.INACTIVATED){
    throw new ERROR.BusinessError(['账号未激活，请联系管理员激活账号']);
  }
  const password = crypto.AES.decrypt(dbUser.password, SECRET_KEY).toString(crypto.enc.Utf8);
  if (password !== reqUser.password + dbUser.slat) {
    throw new ERROR.BusinessError(['用户名密码不正确']);
  }
  // 保存登录信息
  const token = crypto.MD5(new Date().getTime().toString() + Math.random()).toString();
  const authDB = {
    user_id: dbUser._id,
    token: token,
    create_date: new Date(),
    update_date: new Date(),
    login_ip: _.chain(req.connection.remoteAddress).split(':').last().value()
  };
  await wrapExec(res)(() => AuthModel.findOneAndUpdate({ user_id: dbUser._id }, authDB, { upsert: true }));
  res.result = RES.SUCCESS({
    user_id: dbUser._id,
    username: dbUser.username,
    token: token,
    role: dbUser.role
  });
  next();
});

// 鉴权
AuthSchema.static('accessAuth', async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    throw new ERROR.NoAuthError();
  }
  let result = await wrapExec(res)(() => AuthModel.findOne({ token: authorization }).populate('user_id').exec())
  if(!result || (new Date().getTime() - new Date(result.update_date).getTime()) / 1000 > TOKEN_EXPIRED_TIME){
    throw new ERROR.NoAuthError();
  }
  result.update_date = new Date();
  req.user = result;
  result = await wrapExec(res)(() => AuthModel.update(result))
  next();
});

const AuthModel = mongoose.model('Auth', AuthSchema);
module.exports = AuthModel;
