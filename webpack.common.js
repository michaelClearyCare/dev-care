const path = require('path')

module.exports = {
  // Add new entry points for any "top-level" ts/tsx files, e.g. devtools must be listed here but EventDisplay, which is consumed by devtools, does not.
  entry: {
    popup: path.join(__dirname, 'src/popup/index.tsx'),
    devtools: path.join(__dirname, 'src/devtools/index.tsx'),
    background: path.join(__dirname, 'src/background.ts'),
    contentScript: path.join(__dirname, 'src/contentScript.ts'),
    injection: path.join(__dirname, 'src/injection.ts')
  },
  output: {
    path: path.join(__dirname, 'dist/js'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: 'ts-loader'
      },
      {
        exclude: /node_modules/,
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  }
}
