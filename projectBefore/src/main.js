import Vue from 'vue'
import App from './App'
import router from './router'
//清除浏览器默认样式
import "@/assets/css/reset.css"
// 引入elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//引入axios请求
import axios from 'axios'
// axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
Vue.config.productionTip = false
axios.defaults.headers['Accept'] = '*'
Vue.prototype.$ajax = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount("#app")
