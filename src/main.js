import Vue from 'vue'
import App from './App.vue'
import router from './router'



// import axios from 'axios'
// Vue.use(axios)

// 引入element-ui组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import "assets/fonts/icon/iconfont.css"

// import iView from 'iview';
// import 'iview/dist/styles/iview.css';
// Vue.use(iView);




Vue.use(ElementUI)
import TreeTable from 'vue-table-with-tree-grid'
Vue.component('tree-table', TreeTable)

Vue.config.productionTip = false



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
