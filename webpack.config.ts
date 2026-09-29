import { fileURLToPath } from 'url';
import { dirname } from 'path';

import webpack from 'webpack';
import path from 'node:path';
import 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: webpack.Configuration = {
  entry: {
    index: './index.js',
  },
  output: {
    filename: '[name].js?[contenthash]',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devServer: {
    watchFiles: ['public'],
    static: './dist',
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Catan game',
      template: 'public/index.html',
      hash: true,
      inject: 'body',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            targets: 'defaults',
            presets: ['@babel/preset-react', '@babel/preset-typescript'],
            plugins: ['@babel/plugin-transform-export-namespace-from'],
          },
        },
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};

export default config;
