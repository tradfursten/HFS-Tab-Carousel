const { join, resolve } = require('path');
const { js, css } = require('../webpack/rules/index');

module.exports = (ROOT_DIR) => {
  return {
    mode: 'development',
    entry: [
      '@babel/polyfill',
      join(__dirname, 'browser_action.js')
    ],
    module: {
      rules: [
        js,
        css
      ]
    },
    output: {
      path: join(ROOT_DIR, 'out/js/browser_action'),
      filename: 'browser_action.min.js'
    },
    resolve: {
      modules: [
        resolve(__dirname),
        resolve(ROOT_DIR),
        'node_modules'
      ]
    }
  };
};