import Vue from 'vue'
import App from './App.vue'
// import VueRouter from "vue-router";
Vue.config.productionTip = false
import  router  from './router.js';




new Vue({
  render: h => h(App),
  router
}).$mount('#app')
