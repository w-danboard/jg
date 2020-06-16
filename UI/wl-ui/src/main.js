import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import wlUi from './packages/index'

Vue.use(wlUi)
new Vue({
  render: h => h(App),
}).$mount('#app')
