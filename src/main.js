import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import MenuIcon from 'vue-material-design-icons/Menu.vue';

Vue.component('menu-icon', MenuIcon);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')