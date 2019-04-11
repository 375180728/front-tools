const http = require('http');
const routes = require('./server/routes');
const { FILE, DATE } = require('./server/helper')
const { LOG_PATH } = require('./server/config')
const express = require('express');
var compression = require('compression')
const _ = require('lodash');
const { scheduleBackupDB } = require('./server/jobs/backupDB')

const app = new express();
app.use(compression());
const port = 3333;

Reset = '\x1b[0m';
FgRed = '\x1b[31m';
FgGreen = '\x1b[32m';
FgYellow = '\x1b[33m';
FgBlue = '\x1b[34m';

app.use(function(req, res, next) {
  var data = '';
  req.setEncoding('utf8');
  req.on('data', function(chunk) {
    data += chunk;
  });
  req.on('end', function() {
    try {
      req.body = JSON.parse(data);
    } catch (e) {}
    if (_.includes(req.url, '/api/')) {
      console.log(Reset, '');
      console.log(FgRed, '--------------------START--------------------');
      console.log(Reset, '');
      console.log(FgGreen, '#请求地址: ' + req.url);
      console.log(FgGreen, '#请求方法: ' + req.method);
      console.log(FgGreen, '#请求时间: ' + new Date());
      console.log(FgGreen, '#请求BODY: ');
      console.log(Reset, JSON.stringify(req.body, null, 2));
      console.log(Reset, '');
      console.log(FgRed, '---------------------END---------------------');
      console.log(Reset, '');
    }
    next();
  });
});

// 文档
app.use('/docs', express.static(__dirname+'/docs'))
app.get("/docs/:dir", function(req, res) {
  console.log(req.params.dir);
  res.sendFile(__dirname + `/docs/${req.params.dir}/index.html`)
})

// 工具
app.use('/tools', express.static(__dirname+'/tools'))
app.get("/tools/:dir", function(req, res) {
  res.sendFile(__dirname + `/tools/${req.params.dir}/index.html`)
})

// 前端静态
app.use('/dist', express.static(__dirname+'/dist'))
app.get("/", function(req, res) {
  var deviceAgent = req.headers["user-agent"].toLowerCase();
  var agentID = deviceAgent.match(/(iphone|ipod|ipad|android|webos|blackberry|iemobile|opera mini)/);
  if(agentID){
    res.sendFile(__dirname + `/dist/mobile/index.html`)
  }else{
    res.sendFile(__dirname + `/dist/pc/index.html`)
  }
})

// 本地测试数据路由
routes.user(app);
routes.auth(app);
routes.case(app);
routes.blog(app);


// 异常捕获
app.use(function(err, req, res, next) {
  const path = LOG_PATH + DATE.dateFtt('yyyy-MM-dd', new Date()) + '_errors.log';
  const contents = [
    '-----------' + DATE.dateFtt('yyyy-MM-dd hh:mm:ss', new Date()) + '-----------',
    "message:\n" + err.message,
    "stack:\n" + err.stack,
    "request path:" + req.url,
    "request method:" + req.method,
    "request body:\n" + JSON.stringify(req.body, null, 2),
    '-----------END-----------'
  ]
  if(err.code == 500 || !err.code){
    FILE.writeFile(path, _.join(contents, '\n'));
  }
  res.status(err.code || 500);
  res.json(err.msg || {messages: [err.message], error: '系统错误', timestamp: new Date().getTime()});
});

// 定时任务备份数据库
if(process.env.NODE_ENV == 'production'){
  scheduleBackupDB();
}
var server = http.createServer(app);

server.listen(port, function() {
  console.log('Listening on %j', server.address());
});
