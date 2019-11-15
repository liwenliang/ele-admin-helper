import yxform from './src/components/Form/index.vue'
import yxtable from './src/components/Table/index.vue'
import _Vue from 'vue'

const MyPlugin = {}
MyPlugin.install = Vue => {
  if (!Vue) {
    window.Vue = Vue = _Vue
  }
  Vue.component('Yxtable', yxtable)
  Vue.component('Yxform', yxform)
}

export default MyPlugin
