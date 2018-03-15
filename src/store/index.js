import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'
import modules from './modules'
Vue.use(Vuex)
// 获取菜单
let menus = window.localStorage.getItem('menus')
// 获取用户信息
let UserInfo = localStorage.getItem('UserInfo')
try {
  menus = JSON.parse(menus)
  UserInfo = JSON.parse(UserInfo)
} catch (error) {
  console.log(JSON.stringify(error))
  menus = []
  UserInfo = {}
}
/**
 **拿本地菜单(测试供测试使用，请不要随意打开)
 */
menus = require('../libs/menus').default

// 应用初始状态
const state = {
  comm: {
    tableLoading: false,
    tabSelected: 'Home',
    indexConf: {
      isFooter: true,
      isBack: true,
      title: '' // 标题
    },
    Authority: null
  },
  menus: menus, // 存储菜单数据
  responseData: { // 服务端接口返回的数据保存在这里
    UserInfo: UserInfo
  }
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules
})
