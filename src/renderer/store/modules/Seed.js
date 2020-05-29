import db from '../../utils/datastore'

const state = {
  list: [],
  lotteries: []
}

const getters = {
  list: state => state.list
}

const mutations = {
  FETCH_LIST: (state, list) => {
    state.list = list
  },
  PUSH_LOTTERIES: (state, lottery) => {
    state.lotteries.push(lottery)
  }
}

const actions = {
  async fetchTaxList ({ commit }, { page, size }) {
    try {
      const data = await db.get('texes')
        .take(size)
        .value()
      commit('FETCH_LIST', data)
      return true
    } catch (error) {
      console.log(error)
    }
  },
  async importSeedData ({ commit }, list) {
    try {
      await db.get('texes').push(list).write()
      console.log(db.get('texes').size().value())
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
