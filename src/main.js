// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
import '../themes/element-default/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
// Vue.use(ElementUI, { size: 'small' })

import mixins from './libs/mixins'
// 注册全局mixins
Vue.mixin(mixins)
import store from './store'

// 实例化Vue的filter
import filters from './libs/filters'
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

// 自定义指令
// 获取dom节点
Vue.directive('dom', {
  bind: function (el, binding) {
    var obj = binding.value
    if (obj != null) {
      var key = Object.keys(binding.modifiers)[0] || 'el'
      Vue.set(obj, key, el)
    }
  }
})
// 只允许输入数字
Vue.directive('numberOnly', {
  update: function (el, binding) {
    el.value = el.value.replace(/\D+/, '')
  }
})

/**
 * 业务API -> 封装成全局变量
 */
import common from './api/common'
Object.defineProperty(Vue.prototype, '$common', { value: common })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
