const state = {
  list: [],
  lotteries: []
}

const getters = {
  list: state => state.list
}

const mutations = {
  COMPOSE_RESULTS: (state, list) => {
    state.list = list
  },
  PUSH_LOTTERIES: (state, lottery) => {
    state.lotteries.push(lottery)
  }
}

const actions = {
  async importSeedData ({ commit }, list) {
    try {
      commit('COMPOSE_RESULTS', list)
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
