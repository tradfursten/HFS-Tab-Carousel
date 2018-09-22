const { join, resolve } = require('path');
const { js, css, html } = require('./ext/src/webpack/rules/index');
const fs = require('fs');

const ROOT_DIR = __dirname;
const SRC_DIR = join(__dirname, 'ext/src');
const BACKGROUND_DIR = join(SRC_DIR, 'background');
const BROWSER_ACTION_DIR = join(SRC_DIR, 'browser_action');
const INJECT_DIR = join(SRC_DIR, 'inject');
const OPTIONS_DIR = join(SRC_DIR, 'options');

watchManifestFile();

module.exports = {
  mode: 'development',
  entry: {
    background: [
      '@babel/polyfill',
      join(BACKGROUND_DIR, 'background.js')
    ],

    browser_action: [
      join(BROWSER_ACTION_DIR, 'browser_action.js')
    ],

    inject: [
      join(INJECT_DIR, 'inject.js')
    ],

    options: [
      join(OPTIONS_DIR, 'options.js')
    ]
  },
  module: {
    rules: [
      js,
      css,
      html
    ]
  },
  output: {
    path: join(ROOT_DIR, 'out/js'),
    filename: '[name]/[name].min.js'
  },
  resolve: {
    alias: {
      'root': resolve(SRC_DIR)
    },
    modules: [ 'node_modules' ]
  }
};

function watchManifestFile () {
  const writeManifestFile = () => {
    console.log('Writing manifest file');
    fs.copyFileSync('./ext/manifest.json', './out/manifest.json');
    console.log('Wrote manifest file');
  };

  writeManifestFile();
  fs.watchFile('./ext/manifest.json', { presistant: true, recursive: false }, () => {
    writeManifestFile();
  });
}