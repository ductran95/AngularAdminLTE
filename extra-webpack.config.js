const path = require('path');

module.exports = {
  module: {
    rules: [{
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: [
          path.resolve(__dirname, "node_modules/icheck")
        ]
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        loader: 'file-loader',
        options: {
          publicPath: 'assets',
          // name: 'assets/lib/icheck/skins/[name].[ext]',
        }
        // include: [
        //   path.resolve(__dirname, "node_modules/icheck")
        // ]
      }
    ]
  }
};
