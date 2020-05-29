const state = {
  total: 0,
  list: []
}

const getters = {
  total: state => state.total,
  list: state => state.list
}

const mutations = {
  COMPOSE_RESULTS: (state, list, total) => {
    state.list = list
    state.total = total
  }
}

const actions = {
  async importSeedData ({ commit }, list, total) {
    try {
      commit('COMPOSE_RESULTS', list, total)
      return true
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
