import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './utils/filters'; // 全局过滤器
import './assets/index'; // svg图标管理
// antd
import 'ant-design-vue/dist/antd.less';
import '@/assets/style/reset.css';
import '@/assets/style/antd-reset.css';
import {
  Button,
  message,
  Input,
  Card,
  Comment,
  Tooltip,
  Avatar,
  Icon,
  List,
  BackTop,
  Radio,
  FormModel,
  Table,
  Collapse,
  Checkbox,
  Col,
  Row,
  Tag,
  Pagination,
  Descriptions,
  AutoComplete,
  PageHeader,
  Spin,
  Select
} from 'ant-design-vue';

Vue.config.productionTip = false;

// antd 按需引入
Vue.use(Button);
Vue.use(Input);
Vue.use(Card);
Vue.use(Comment);
Vue.use(Tooltip);
Vue.use(Avatar);
Vue.use(Icon);
Vue.use(List);
Vue.use(BackTop);
Vue.use(Radio);
Vue.use(FormModel);
Vue.use(Table);
Vue.use(Collapse);
Vue.use(Checkbox);
Vue.use(Col);
Vue.use(Row);
Vue.use(Tag);
Vue.use(Pagination);
Vue.use(Descriptions);
Vue.use(AutoComplete);
Vue.use(PageHeader);
Vue.use(Spin);
Vue.use(Select);

Vue.prototype.$message = message;

// 注册全局组件
const requireComponent = require.context(
  // 其组件目录的相对路径
  './components',
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式
  /\.g\.vue$/
);
requireComponent.keys().forEach(fileName => {
  const comp = requireComponent(fileName).default;
  Vue.component(comp.name, comp);
});

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
