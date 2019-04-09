const httpService = require('./httpService');
const _ = require('lodash');
const { PLATFORMS } = require('../config');
// GITLAB域
const GITLAB_DOMAIN = 'https://gitlab-dev.outwitinc.com/api/v3/';
// GIT 项目匹配
const PROJECT_MAPPING = [
  { platformId: PLATFORMS.XY, projectId: 313, prefix: 'xy'}, //255 为真实杏耀
  { platformId: PLATFORMS.XC, projectId: 169, prefix: 'xc'},
  { platformId: PLATFORMS.HY, projectId: 290, prefix: 'hy'},
  { platformId: PLATFORMS.HC, projectId: 309, prefix: 'hc'}
];

/**
 * 创建分支
 * @param {平台ID} platformId
 * @param {涉及分支} relationBranch
 * @param {JIRA单号} jiraId
 */
async function createBranch(platformId, relationBranch, jiraId) {
  const projectId = _.find(PROJECT_MAPPING, { platformId: Number(platformId) }).projectId;
  const projectPrefix = _.find(PROJECT_MAPPING, { platformId: Number(platformId) }).prefix;
  let messages = [];
  const loopCreate = async () => {
    for (index in relationBranch) {
      const targetBranch = relationBranch[index];
      let branchName = _.split(targetBranch, '-')[0];
      branchName = branchName == 'master' ? `${projectPrefix}-${jiraId.split('-')[1]}` : `${projectPrefix}-${jiraId.split('-')[1]}-${branchName}`;
      branchName = _.toLower(branchName);
      const uri = `projects/${projectId}/repository/branches?branch_name=${branchName}&ref=${targetBranch}`;
      const headers = {
        'PRIVATE-TOKEN': 'oEfhiJuXcvrkH8q5ezNS'
      };
      const result = await httpService.send(GITLAB_DOMAIN + uri, 'POST', null, headers);
      if (result.error) {
        const error = JSON.parse(result.error);
        messages.push(`创建分支【${branchName}】失败：` + error.message + ',请手动创建');
      } else {
        messages.push(`已经成功创建GIT分支：【${branchName}】`);
      }
    }
  };
  await loopCreate();
  return messages;
}

module.exports.createBranch = createBranch;
