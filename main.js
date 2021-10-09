import Vue from 'vue'

/*
var requirejs = require('requirejs');
requirejs.config({
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require
});
*/

import App from './App.vue'

Vue.config.productionTip = false

// Addition for event bus
export const bus = new Vue()

new Vue({
  render: h => h(App),
}).$mount('#app')

import start_loop from './aspects/loop'
start_loop()