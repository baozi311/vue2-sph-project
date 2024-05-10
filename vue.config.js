const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      // /api就是配置的基础路径
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn",

        // 重写路径
        // 就是看你真正的接口当中要不要基础路径/api
        // 如果/api接口文档当中每个都有,那么就不用重写了

        // 如果接口文档当中没有基础的/api,而是自己造的/api
        // 那么就要重写调
        // pathRewrite: { "^/api": "" },
      },
    },
  },
});
