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
      res.result.data = json;
      json.map((item, index)=>{
        blogDB.title = item.title;
        blogDB.body = item.body;
        blogDB.number = index;
        blogDB.create_date = new Date();
      })
    })

  next();
});

const blogModel = mongoose.model('Blog', BlogSchema);
module.exports = blogModel;
