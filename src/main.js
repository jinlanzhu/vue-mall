import Vue from 'vue'
import App from './App.vue'
import router from './router'

// import axios from 'axios'
// Vue.use(axios)

// 引入element-ui组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import "assets/fonts/icon/iconfont.css"

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
