module.exports = {
  test: /\.html/,
  exclude: /node_modules/,
  use: {
    loader: 'file-loader',
    options: {
      name: '[name].[ext]'
    }
  }
};