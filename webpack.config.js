const path = require('path')

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react'
          ],
          plugins: [
            "@babel/plugin-proposal-class-properties"
          ]
        }
      }
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase : path.join(__dirname, 'public'),
    disableHostCheck: true,
    host: '192.168.0.2',
    port: 8080,
  },
  mode: 'development'
}
