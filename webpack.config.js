const bg = require('./ext/src/bg/webpack.config');
const inject = require('./ext/src/inject/webpack.config');
const browserAction = require('./ext/src/browser_action/webpack.config');

module.exports = [
  bg(__dirname),
  inject(__dirname),
  browserAction(__dirname)
];