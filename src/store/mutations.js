import * as types from './types'
import { MessageBox } from 'element-ui'
import router from '../router'
export default {
  tableLoading (state, { isLoading }) { // loading的显示
    state.comm.tableLoading = isLoading
  },
  // 获取菜单-保存菜单
  [types.GET_MENUS] (state, { menus }) {
    state.menus = menus
    window.localStorage.setItem('menus', JSON.stringify(menus))
  },
  // 登录
  [types.POST_LOGIN] (state, { UserInfo, loginParams }) {
    const _userInfo = Object.assign(UserInfo, loginParams)
    state.responseData['UserInfo'] = _userInfo
    window.localStorage.setItem('UserInfo', JSON.stringify(_userInfo))
  },
  [types.POST_LOGIN_OUT] (state) {
    state.responseData['UserInfo'] = null
    window.localStorage.removeItem('UserInfo')
    router.replace({
      path: '/login',
      query: { redirect: router.currentRoute.fullPath }
    })
  },
  [types.SESSION_EXPIRED] (state, { res }) {
    state.responseData['UserInfo'] = null
    window.localStorage.removeItem('UserInfo')
    MessageBox.alert('session过期，请重新登录!', '提示', {
      callback: action => {
        console.log(router.currentRoute)
        router.replace({
          path: '/login',
          query: { redirect: router.currentRoute.fullPath }
        })
      }
    })
  }
}
