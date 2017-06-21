/**
 * http配置
 */
import axios from 'axios'
import store from '../store'
import * as types from '../store/types'

// axios 配置
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.timeout = 8000

// http response 拦截器
axios.interceptors.response.use(
  response => {
    // session过期
    if (response !== undefined && response.data.result !== undefined) {
      if (response.data.result.errorcode === -3 || response.data.result.msg === 'session expired!') {
        store.commit(types.SESSION_EXPIRED, { res: response })
      }
    }
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          store.commit(types.POST_LOGIN_OUT)
      }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error.response.data)
  })

export default axios
