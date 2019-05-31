import Vue from 'vue'
import './plugins/vuetify'
import './plugins/graphql'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
