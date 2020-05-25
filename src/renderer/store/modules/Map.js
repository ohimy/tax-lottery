import { fetchMapList } from '../../api/map'

const state = {
  total: 0,
  list: []
}

const getters = {
  total: state => state.total,
  list: state => state.list
}

const mutations = {
  COMPOSE_RESULTS: (state, payload) => {
    state.list = payload.data
    state.total = payload.count
  }
}

const actions = {
  async asyncTask ({ commit }, params) {
    // do something async
    try {
      const { status, count, data } = await fetchMapList(params)
      if (status === 0) {
        commit('COMPOSE_RESULTS', {
          data,
          count
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
