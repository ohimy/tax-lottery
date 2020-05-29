import db from '../../utils/datastore'
import { paginate, randArray } from '../../utils/toolbox'

const state = {
  taxList: [],
  taxTotal: 0,
  lotteryList: [],
  lotteryTotal: 0,
  firstLottery: [],
  secondLottery: [],
  ThirdLottery: []
}

const mutations = {
  set_tax_list: (state, taxList) => {
    state.taxList = taxList
  },
  set_tax_total: (state, total) => {
    state.taxTotal = total
  },
  set_lottery_list: (state, lotteryList) => {
    state.lotteryList = lotteryList
  },
  set_lottery_total: (state, total) => {
    state.lotteryTotal = total
  }
}

const actions = {
  async fetchTaxList ({ commit }, { page, size }) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = db.get('taxes').value()
        const list = paginate(page, size, data)
        commit('set_tax_list', list)
        resolve(list)
      } catch (error) {
        reject(error)
      }
    })
  },
  async fetchLotteryList ({ commit }, { page, size }) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = db.get('lotteries').value()
        const list = paginate(page, size, data)
        commit('set_lottery_list', list)
        resolve(list)
      } catch (error) {
        reject(error)
      }
    })
  },
  async filterSeedData ({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        let lotteryList = []
        await db.get('taxes').value().forEach(tax => {
          const lotteryCount = tax.amount > 2000 ? 10 : parseInt(tax.amount / 200)
          for (let index = 0; index < lotteryCount; index++) {
            lotteryList.push({
              no: tax.no,
              code: tax.code
            })
          }
        })
        db.set('lotteries', lotteryList).write()
        commit('set_lottery_total', db.get('lotteries').size().value())
        resolve(true)
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
        db.set('lotteries', []).write()
        commit('set_tax_list', [])
        commit('set_tax_total', 0)
        commit('set_lottery_list', [])
        commit('set_lottery_total', 0)
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  },
  async lottery ({ commit }, count) {
    return new Promise(async (resolve, reject) => {
      try {
        const lot = db.get('lotteries').value()
        resolve(randArray(lot, count))
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
