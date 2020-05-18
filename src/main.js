import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import utils from './helpers/Utils'
import MenuIcon from 'vue-material-design-icons/Menu.vue';

import axios from'axios'

if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = process.env.PROD_API;
}
else {
  axios.defaults.baseURL = process.env.LOCAL_API;
}

axios.interceptors.request.use(config => { 
  config.headers.Authorization = 'um token'
  return config; 
});

Vue.component('menu-icon', MenuIcon);
Vue.use({
  install() {
    Vue.utls = utils;
    Vue.prototype.$utils = utils;
  }
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
