import * as types from './types'
import { MessageBox } from 'element-ui'
import router from '../router'
export default {
  tableLoading (state, { isLoading }) { // loading的显示
    state.comm.tableLoading = isLoading
  },
  [types.GET_MENUS] (state, { menus }) {
    state.menus = menus
  },
  [types.POST_LOGIN] (state, { UserInfo }) {
    state.responseData['UserInfo'] = UserInfo
    window.localStorage.setItem('UserInfo', JSON.stringify(UserInfo))
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
