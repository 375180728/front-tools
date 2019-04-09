var schedule = require('node-schedule');
var exec = require('child_process').exec;
const { DATE } = require('../helper');
const { DATABASE } = require('../config');

const rule = new schedule.RecurrenceRule();
rule.hour = [6, 13, 19];
rule.minute = [0];
rule.second = [0];

function scheduleBackupDB() {
  schedule.scheduleJob(rule, backupDB);
}

function backupDB() {
  const date = DATE.dateFtt('yyyyMMdd-hhmm', new Date());
  const mongoDump = `/download/mongodb-linux-x86_64-4.0.6/bin/mongodump`;
  const backPath = `/database/backup`;
  var cmd = `"${mongoDump}" -u ${DATABASE.USERNAME} -p ${DATABASE.PASSWORD} -h ${DATABASE.HOST} -d ${DATABASE.DB} --gzip --archive=${backPath}${date}.agz`;
  exec(cmd, function(error, stdout, stderr) {
    if (error) {
      console.error('备份数据库失败');
      console.error(error)
    }
  });
}

module.exports.scheduleBackupDB = scheduleBackupDB;
