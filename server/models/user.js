const _ = require('lodash');
const crypto = require('crypto-js');
const mongoose = require('../database/core');
const { ROLES, RES, SECRET_KEY, USER_STATUS } = require('../config');
const { checkService } = require('../services');
const { wrapExec } = require('../helper/wrap')
const { ERROR } = require('../helper')
/**
 * 用户表
 */
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    salt: { type: String, require: true },
    role: { type: Number, required: true, default: ROLES.FRONT_END },
    status: {type: Number, required: true, default: USER_STATUS.INACTIVATED},
    create_ip: { type: String, required: true },
    create_date: { type: Date }
  },
  { versionKey: false }
);

UserSchema.static('register', async (req, res, next) => {
  const user = req.body;
  let errors = checkService.userRegister(user);
  if (errors.length > 0) {
    throw new ERROR.verifiyError(errors);
  }
  let userDB = new userModel(user);
  userDB.status = USER_STATUS.INACTIVATED;
  userDB.salt = crypto.MD5(new Date().getTime().toString()).toString();
  userDB.password = crypto.AES.encrypt(user.password + userDB.slat, SECRET_KEY).toString();
  userDB.create_date = new Date();
  userDB.create_ip = _.chain(req.connection.remoteAddress).split(':').last().value();
  console.log(userDB);
  let result = await wrapExec(res)(() => userModel.findOne({ username: user.username }).exec());
  if (result) {
    throw new ERROR.BusinessError(['用户名已存在']);
  }
  // 保存用户
  result = await wrapExec(res)(() => userDB.save());
  res.result = RES.SUCCESS(null, ['创建用户成功']);
  next();
});

const userModel = mongoose.model('User', UserSchema);
module.exports = userModel;
