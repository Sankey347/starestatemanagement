import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './dependences/vcharts'
import jquery from 'jquery'
import FormDialog from './components/star_tool/star_formDialog'
Vue.config.productionTip = false
Vue.component('form-dialog',FormDialog)
Vue.prototype.$=jquery
/* eslint-disable no-new */
Vue.use(ElementUI);
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
