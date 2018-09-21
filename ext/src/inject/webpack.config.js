const { join, resolve } = require('path');


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
    mode: 'development',
    entry: [
      '@babel/polyfill',
      join(__dirname, 'inject.js')
    ],
    module: {
      rules: rules
    },
    output: {
      path: join(ROOT_DIR, 'out/js/inject'),
      filename: 'inject.min.js'
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