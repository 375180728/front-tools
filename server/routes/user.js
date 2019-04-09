const userModel = require('../models/user');
const { RES } = require('../config');
const { _async_ } = require('../middleware');

module.exports = function(app) {
  app.post('/api/user/register', _async_(userModel.register), RES.CALLBACK);
};


