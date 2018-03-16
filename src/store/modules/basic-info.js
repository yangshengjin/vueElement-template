import $common from '../../api/common'
import * as types from '../types'

const state = {
  BusInfoList: {
    count: 0,
    list: []
  }
}

const getters = {
  BusInfoList: state => state.BusInfoList
}

const actions = {
  // 信息查询
  QueryBusInfo ({ commit, state }, params) {
    commit('tableLoading', { isLoading: true })
    return $common.QueryBusInfo(params).then((res) => {
      commit('tableLoading', { isLoading: false })
      if (res.list instanceof Array) {
        commit(types.QUERY_OLDER_LIST, { res })
      }
      return res
    }).catch(e => {
      commit('tableLoading', { isLoading: false })
    })
  }
}

const mutations = {
  [types.QUERY_OLDER_LIST] (state, { res }) {
    state.BusInfoList = {
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
