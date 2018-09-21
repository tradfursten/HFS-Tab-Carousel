const { join, resolve } = require('path');
const { js, css, html } = require('../webpack/rules/index');

module.exports = (ROOT_DIR) => {
  return {
    mode: 'development',
    entry: [
      '@babel/polyfill',
      join(__dirname, 'options.js')
    ],
    module: {
      rules: [
        js,
        css,
        html
      ]
    },
    output: {
      path: join(ROOT_DIR, 'out/js/options'),
      filename: 'options.min.js'
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