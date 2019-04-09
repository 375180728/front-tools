const caseModel = require('../models/case');
const authModel = require('../models/auth');
const { RES } = require('../config');
const { _async_ } = require('../middleware');

module.exports = function(app) {
  app.post('/api/case', _async_(authModel.accessAuth), _async_(caseModel.create), RES.CALLBACK);
  app.get('/api/case/all', _async_(authModel.accessAuth) , _async_(caseModel.search), RES.CALLBACK);
};