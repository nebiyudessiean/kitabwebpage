import Vue from 'vue'

import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import VueApexChart from "vue-apexcharts"
import '@/plugins/apexcharts'


Vue.config.productionTip = false
new Vue({
  vuetify,
  VueApexChart,
  router,

  
  render: h => h(App)
}).$mount('#app')
