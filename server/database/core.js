const { DATABASE } = require('../config')
const mongoose = require('mongoose');
const bluebird = require('bluebird');

const DB_HOST = `mongodb://${DATABASE.USERNAME}:${DATABASE.PASSWORD}@${DATABASE.HOST}/${DATABASE.DB}`;

mongoose.Promise = bluebird;
mongoose.connect(DB_HOST);

mongoose.connection.on('connected', () => {
  console.log('链接mongodb成功');
});

mongoose.connection.on('error', () => {
  console.log('链接mongodb失败');
});

mongoose.connection.on('disconnected', () => {
  console.log('断开mongodb链接');
});

module.exports = mongoose;


