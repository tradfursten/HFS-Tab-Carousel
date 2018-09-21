const { join, resolve } = require('path');
const { js, css } = require('../webpack/rules/index');

module.exports = (ROOT_DIR) => {
  return {
    mode: 'development',
    entry: [
      '@babel/polyfill',
      join(__dirname, 'background.js')
    ],
    module: {
      rules: [
        js,
        css
      ]
    },
    output: {
      path: join(ROOT_DIR, 'out/js/bg'),
      filename: 'background.min.js'
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