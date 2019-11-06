const thoughts = require('./thoughts/thoughts.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(thoughts);
};
