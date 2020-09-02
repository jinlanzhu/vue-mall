import Vue from 'vue'
import App from './App.vue'
import router from './router'

// import axios from 'axios'
// Vue.use(axios)

// 引入element-ui组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import "assets/fonts/icon/iconfont.css"

import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
const _ = require('lodash');

Vue.use(VueQuillEditor, /* { default global options } */)

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
