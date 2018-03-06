const API = 'cwxt-base-cms'
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
function QueryBusInfo (params) {
  return fetchApi(API, 'bus_info/list', params)
}
export default {
  PostLogin,
  QueryBusInfo
}
