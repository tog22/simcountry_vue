import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// Addition for event bus
export const bus = new Vue()

new Vue({
  render: h => h(App),
}).$mount('#app')

import start_loop from './aspects/loop'
start_loop()