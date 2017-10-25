const { join, resolve } = require('path');

const rules = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['env']
      }
    }
  },
  {
    test: /\.css$/,
    exclude: /node_modules/,
    use: {
      loader: 'raw-loader'
    }
  }
];


module.exports = (ROOT_DIR) => {
  return {
    entry: [
      'babel-polyfill',
      join(__dirname, 'browser_action.js')
    ],
    module: {
      rules: rules
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