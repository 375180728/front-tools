const _ = require('lodash');
const mongoose = require('../database/core');
const { RES, CASE_STATUS, CASE_TYPE } = require('../config');
const { checkService, gitService } = require('../services');
const { ERROR } = require('../helper');
const { wrapExec } = require('../helper/wrap');

/**
 * 需求实体表
 */
const CaseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    desc: { type: String },
    jira_id: { type: String, required: true },
    platform: { type: Number, required: true },
    type: { type: Number, required: true },
    sync_platforms: { type: Array },
    relation_branch: { type: Array },
    create_userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    create_date: { type: Date, default: Date.now },
    update_date: { type: Date },
    status: { type: Number }
  },
  { versionKey: false }
);

// 创建需求
CaseSchema.static('create', async (req, res, next) => {
  let messages = [];
  const errors = checkService.createCase(req.body);
  if (errors.length > 0) {
    throw new ERROR.verifiyError(errors);
  }
  // 检查JIAR号是否已经被关联
  let reqCase = req.body;
  let dbCase = await wrapExec(res)(() => CaseModel.findOne({ jira_id: _.toLower(reqCase.jira_id) }));
  if (dbCase) {
    throw new ERROR.BusinessError(['该JIRA单号已经被关联，请转至列表页查看']);
  }
  // 保存新需求
  let caseDB = new CaseModel(reqCase);
  caseDB.status = CASE_STATUS.OPEN;
  caseDB.create_userid = req.user.user_id._id;
  await wrapExec(res)(() => caseDB.save());
  messages.push('创建开发需求成功');
  // 在GITLAB上创建对应分支
  const { platform, relation_branch, jira_id } = reqCase;
  messages = _.concat(messages, await gitService.createBranch(platform, relation_branch, jira_id));
  res.result = RES.SUCCESS(null, messages);
  next();
});

// 查询需求
CaseSchema.static('search', async (req, res, next) => {
  const query = req.query;
  const like = new RegExp(query.match);
  const queryDb = {
    $or: [{ name: like }, { desc: like }, { jira_id: like }],
    status: query.status ? Number(query.status) : { $in: CASE_STATUS.ALL },
    type: query.type ? Number(query.type) : { $in: CASE_TYPE.ALL }
  };
  let caseList = await wrapExec(res)(() =>
    CaseModel.find(queryDb)
      .sort({ create_date: -1})
      .skip((query.page_no - 1) * query.per_size)
      .limit(Number(query.per_size))
  );
  const count = await wrapExec(res)(() =>CaseModel.find(queryDb).count());
  res.result = RES.SUCCESS({count: count, list: caseList}, ['成功']);
  next();
});

const CaseModel = mongoose.model('Case', CaseSchema);
module.exports = CaseModel;
