const API = 'lrb-manager'
const fetchApi = require('./fetch').fetchApi

/**
 * 登录
 * @param {Objece} params 参数
 */
function PostLogin (params) {
  return fetchApi(API, 'biz_login', params)
}

/**
 * 查询接口
 */
function QueryOlderList (params) {
  return fetchApi(API, 'older/list', params)
}
export default {
  PostLogin,
  QueryOlderList
}
