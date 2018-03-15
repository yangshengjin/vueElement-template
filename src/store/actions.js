import $comApi from '../api/common'
import * as types from './types'

// 登录
export const PostLogin = ({ commit, state }, params) => {
  return $comApi.PostLogin(params).then((res) => {
    window.localStorage.setItem('menus', JSON.stringify(res.menus))
    if (res.status.code === 1) {
      commit(types.POST_LOGIN, { UserInfo: res.status, loginParams: params })
      commit(types.GET_MENUS, { menus: res.menus })
    }
    return res
  }).catch(e => {
  })
}

