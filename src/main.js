import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import VueGtag from 'vue-gtag'
import vuetify from './plugins/vuetify'

Vue.use(VueGtag, {
  config: {id: 'UA-156897241-1'},
})
Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App),
}).$mount('#app')
