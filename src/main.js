import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import TypeNav from '@/components/TypeNav';
import mockServer from '@/mock/mockServer';
import SliderLoop from '@/components/SliderLoop';
import Pagination from '@/components/Pagination';
import * as API from "@/api/index.js"
import 'element-ui/lib/theme-chalk/index.css';
import { Button, MessageBox, Message } from "element-ui";
import VueLazyload from "vue-lazyload"; //图片懒加载
import loading from "@/assets/images/loading.gif";
Vue.use(VueLazyload, {
  loading,
});

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;


Vue.component('TypeNav',TypeNav);
Vue.component('SliderLoop',SliderLoop);
Vue.component('Pagination',Pagination);
Vue.component(Button.name, Button);
Vue.config.productionTip = false;

new Vue({
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  render: h => h(App),
  router,
  store,
  mockServer
}).$mount('#app')
