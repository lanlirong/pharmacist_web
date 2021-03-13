import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "ant-design-vue/dist/antd.less";
import { Button, message, Input, Card } from "ant-design-vue";

Vue.config.productionTip = false;

import "./assets/index"; // svg图标管理
// 注册全局组件
const requireComponent = require.context(
  // 其组件目录的相对路径
  "./components",
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式
  /\.g\.vue$/
);
// antd 按需引入
Vue.use(Button);
Vue.use(Input);
Vue.use(Card);

Vue.prototype.$message = message;

requireComponent.keys().forEach(fileName => {
  const comp = requireComponent(fileName).default;
  Vue.component(comp.name, comp);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
