import Vue from 'vue'
import App from './App'

import store from './libs/store/index.js'
import plugins from './libs/plugins/index.js'


Vue.prototype.$store = store;
Vue.config.productionTip = false

App.mpType = 'app'

Vue.use(plugins);
const app = new Vue({
  store,
  ...App
})
app.$mount()
