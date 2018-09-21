const bg = require('./ext/src/bg/webpack.config');
const browserAction = require('./ext/src/browser_action/webpack.config');
const inject = require('./ext/src/inject/webpack.config');
const options = require('./ext/src/options/webpack.config');
const fs = require('fs');

module.exports = [
  bg(__dirname),
  browserAction(__dirname),
  inject(__dirname),
  options(__dirname)
];

watchManifestFile();

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
