module.exports._async_ = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
