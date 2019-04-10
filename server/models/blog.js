const _ = require('lodash');
const crypto = require('crypto-js');
const mongoose = require('../database/core');
const { ROLES, RES, SECRET_KEY, USER_STATUS } = require('../config');
const { checkService } = require('../services');
const { wrapExec } = require('../helper/wrap');
const { ERROR } = require('../helper');
const fetch = require('node-fetch');


/**
 * 文档表
 */
const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    number: { type: Number, required: true },
    create_date: { type: Date }
  },
  { versionKey: false }
);

BlogSchema.static('get_blog', async (req, res, next) => {
  res.result = {data: []};
  await fetch('https://api.github.com/repos/375180728/front-tools/issues?creator=375180728&labels=blog')
    .then(res => res.json())
    .then(json => {
      let blogDB = new blogModel(json);
      console.log(blogDB);
      res.result.data = json;
      json.map((item, index)=>{
        blogDB.title = item.title;
        blogDB.body = item.body;
        blogDB.number = index;
        blogDB.create_date = new Date();
        console.log(blogDB);  
      })
    })

  // res.result = {data: [1,2,3]};
  // const user = req.body;
  // let errors = checkService.userRegister(user);
  // if (errors.length > 0) {
  //   throw new ERROR.verifiyError(errors);
  // }
  // let blogDB = new blogModel(blog);
  // userDB.status = USER_STATUS.INACTIVATED;
  // userDB.salt = crypto.MD5(new Date().getTime().toString()).toString();
  // userDB.password = crypto.AES.encrypt(user.password + userDB.slat, SECRET_KEY).toString();
  // userDB.create_date = new Date();
  // userDB.create_ip = _.chain(req.connection.remoteAddress).split(':').last().value();
  // let result = await wrapExec(res)(() => userModel.findOne({ username: user.username }).exec());
  // if (result) {
  //   throw new ERROR.BusinessError(['用户名已存在']);
  // }
  // // 保存用户
  // res.result = RES.SUCCESS(null, ['创建用户成功']);
  // next();
  
  // console.log(res);
  next();
});

const blogModel = mongoose.model('Blog', BlogSchema);
module.exports = blogModel;
