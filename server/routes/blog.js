const blogModel = require('../models/blog');
const { RES } = require('../config');
const { _async_ } = require('../middleware');

module.exports = function(app) {
  app.get('/api/blog/get_blog', _async_(blogModel.get_blog), RES.CALLBACK);
};


