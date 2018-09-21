module.exports = {
  test: /\.css$/,
  exclude: /node_modules/,
  use: {
    loader: 'raw-loader'
  }
};