const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const isDev = process.env.NODE_ENV === "development";

const Plugins = () => [
  new Dotenv(),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, "static", "index.html"),
    minify: {
      collapseWhitespace: !isDev,
    },
    favicon: path.join(__dirname, "static", "favicon.ico"),
  }),
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: isDev ? "[name].css" : "[name].[hash].css",
  }),
];

const Minify = () => {
  const config = {
    splitChunks: {
      chunks: "all",
    },
  };

  if (!isDev) {
    config.minimizer = [
      new OptimizeCssAssetWebpackPlugin(),
      new TerserWebpackPlugin(),
    ];
  }

  return config;
};

module.exports = {
  optimization: Minify(),
  devServer: {
    port: process.env.PORT,
    hot: isDev,
    compress: true,
    watchContentBase: true,
    open: false,
    historyApiFallback: true,
  },
  mode: "development",
  devtool: isDev ? "source-map" : "",
  entry: {
    app: path.join(__dirname, "src", "index.tsx"),
  },
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".d.ts", ".css", ".svg", ".graphql"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        loaders: ["babel-loader", "ts-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre",
      },
      {
        test: /\.css$/,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: isDev,
              importLoaders: 1,
              modules: {
                localIdentName: !isDev ? "[hash:base64]" : "[name]__[local]",
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: isDev,
              config: {
                path: require.resolve("./postcss.config.js"),
              },
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack", "url-loader"],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: "graphql-tag/loader",
      },
    ],
  },
  plugins: Plugins(),
};
