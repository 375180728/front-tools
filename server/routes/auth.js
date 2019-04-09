const authModel = require('../models/auth');
const { _async_ } = require('../middleware');
const { RES } = require('../config');

module.exports = function(app) {
  app.post('/api/auth/login', _async_(authModel.login), RES.CALLBACK);
};
