import db from '../../utils/datastore'

const state = {
  taxList: [],
  taxTotal: 0,
  lotteries: []
}

const mutations = {
  set_tax_list: (state, taxList) => {
    state.taxList = taxList
  },
  set_tax_total: (state, total) => {
    state.taxTotal = total
  }
}

const actions = {
  async fetchTaxList ({ commit }, { page, size }) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await db.get('taxes')
          .take(size)
          .value()
        commit('set_tax_list', data)
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
  },
  async importSeedData ({ commit }, list) {
    return new Promise(async (resolve, reject) => {
      try {
        db.set('taxes', list).write()
        commit('set_tax_total', db.get('taxes').size().value())
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  },
  async cleanSeedData ({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        db.set('taxes', []).write()
        commit('set_tax_list', [])
        commit('set_tax_total', db.get('taxes').size().value())
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }
}

export default {
  state,
  mutations,
  actions
}
