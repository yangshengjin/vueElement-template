import * as common from '../../api/common'
import * as types from '../types'

const state = {
  OlderList: {
    count: 0,
    list: []
  }
}

const getters = {
  OlderList: state => state.OlderList
}

const actions = {
  // 信息查询
  QueryOlderList ({ commit, state }, params) {
    commit('tableLoading', { isLoading: true })
    return common.QueryOlderList(params).then((res) => {
      commit('tableLoading', { isLoading: false })
      commit(types.QUERY_OLDER_LIST, { res })
      return res
    }).catch(e => {
      commit('tableLoading', { isLoading: false })
    })
  }
}

const mutations = {
  [types.QUERY_OLDER_LIST] (state, { res }) {
    state.OlderList = {
      list: res.list,
      count: res.count
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
