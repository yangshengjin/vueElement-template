import axios from './http'

// API请求域名
const URI = ''

// 请求参数配置
const requireData = (postData) => {
  if (postData !== undefined) {
    let postDataStr = JSON.stringify(postData)
    postData = JSON.parse(postDataStr)
  }
  /* 拿取用户uid */
  let uid = -1
  /* 拿取角色roleId */
  let roleId = -1
  let UserInfo = localStorage.getItem('UserInfo')
  let districtId = -1
  if (UserInfo !== null) {
    UserInfo = JSON.parse(UserInfo)
    districtId = UserInfo.districtId
    uid = Number(UserInfo.uid)
    roleId = Number(UserInfo.roleId)
  }
  var oData = {
    handle: 0,
    shandle: 0,
    data: {
      phead: {
        pversion: 1,
        uid: uid,
        roleId: roleId,
        cid: 3,
        cversion: 1,
        cversionname: '5.3',
        channel: 1,
        requesttime: new Date(),
        coordinates: '',
        positions: ''
      },
      districtId: districtId
    }
  }
  if (postData instanceof Object) {
    for (let x in postData) {
      oData.data[x] = postData[x]
    }
  }
  return JSON.stringify(oData)
}

/**
 * 抓取远端API的结构
 * https://developers.douban.com/wiki/?title=movie_v2
 * @param  {String} api    api 根地址
 * @param  {String} path   请求路径
 * @param  {Objece} params 参数
 * @return {Promise}       包含抓取任务的Promise
 */
const fetchPost = (api, path, params) => {
  params = requireData(params)
  return axios.post(`${URI}/${api}/${path}`, params)
    .then(res => {
      console.log('请求成功')
      return res.data
    })
    .catch(e => {
      console.log(e)
      console.log('网络出错')
    })
}

/**
 * 抓取远程特定类型的API
 * https://www.grandsea.com.cn/test/sfc-search/city_list
 * @type  {String} type   类型，例如：'city_list'
 * @param  {Objece} params 参数
 * @return {Promise}       包含抓取任务的Promise
 */
function fetchApi (api, type, params) {
  return fetchPost(api, type, params)
}

export {
  fetchPost,
  fetchApi
}
