module.exports = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['env'],
      plugins: [
        ['@babel/plugin-proposal-class-properties']
      ]
    }
  }
};