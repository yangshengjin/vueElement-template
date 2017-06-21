import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'
import modules from './modules'
Vue.use(Vuex)

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
  menus: [], // 存储菜单数据
  responseData: { // 服务端接口返回的数据保存在这里
    UserInfo: null
  }
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules
})
