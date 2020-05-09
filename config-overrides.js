const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
  addWebpackPlugin,
  overrideDevServer,
} = require("customize-cra");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

//关闭source-map
const rewiredMap = () => (config) => {
  config.devtool =
    config.mode === "development" ? "cheap-module-source-map" : false;

  return config;
};

// 跨域配置
const devServerConfig = () => (config) => {
  return {
    ...config,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  };
};

module.exports = {
  webpack: override(
    fixBabelImports("antd", {
      //配置按需加载
      libraryDirectory: "es",
      style: true,
    }),
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,
      },
    }),
    addWebpackAlias({
      //处理警告  React-Hot-Loader: react-??-dom patch is not detected. React 16.6+ features may not work
      "react-dom": "@hot-loader/react-dom",
      //路径别名
      "@": path.resolve(__dirname, "src"),
    }),
    addWebpackPlugin(
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: "public/index.html",
      })
    ),
    // 关闭mapSource
    rewiredMap()
  ),
  devServer: overrideDevServer(devServerConfig()),
};
