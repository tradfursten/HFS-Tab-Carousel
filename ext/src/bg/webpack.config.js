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
      join(__dirname, 'background.js')
    ],
    module: {
      rules: rules
    },
    output: {
      path: join(ROOT_DIR, 'out/js/bg'),
      filename: 'background.min.js'
    },
    resolve: {
      modules: [
        resolve(__dirname),
        'node_modules'
      ]
    }
  };
};