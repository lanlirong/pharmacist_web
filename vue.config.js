const path = require("path");
module.exports = {
  // svg使用svg-sprite-loader
  chainWebpack(config) {
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear(); // 清除已有的loader
    svgRule
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, "./src/assets/svg"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      });
  },
  css: {
    loaderOptions: {
      less: {
        globalVars: {
          hack: "true; @import '~@/assets/style/variable.less';" // 设置全局css变量
        },
        // 定制antd主题，If you are using less-loader@5 please spread the lessOptions to options directly
        modifyVars: {
          "primary-color": "#15417F",
          "link-color": "#15417F",
          "success-color": "#67C23A",
          "warning-color": "#eac435",
          "error-color": "#f46b45",
          "text-color": "#505050",
          "border-color-base": "#efefef"
        },
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    open: true,
    host: "localhost",
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      "/api": {
        target: "http://localhost:80/",
        ws: true,
        changOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
