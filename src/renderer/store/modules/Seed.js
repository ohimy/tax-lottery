import db from '../../utils/datastore'
import { paginate, shuffle, sample } from '../../utils/toolbox'

const state = {
  taxList: [],
  taxTotal: 0,
  lotteryList: [],
  lotteryTotal: 0,
  firstLottery: [],
  secondLottery: [],
  thirdLottery: []
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
  },
  set_first_lottery: (state, lottery) => {
    state.firstLottery = lottery
  },
  set_second_lottery: (state, lottery) => {
    state.secondLottery = lottery
  },
  set_third_lottery: (state, lottery) => {
    state.thirdLottery = lottery
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
  // 导入发票数据
  async importSeedData ({ commit }, list) {
    return new Promise(async (resolve, reject) => {
      try {
        await db.set('taxes', list).write()
        commit('set_tax_total', db.get('taxes').size().value())
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  },
  // 清空所有
  async cleanSeedData ({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        await db.set('taxes', []).write()
        await db.set('lotteries', []).write()
        await db.set('first_lottery', []).write()
        await db.set('second_lottery', []).write()
        await db.set('third_lottery', []).write()
        commit('set_tax_list', [])
        commit('set_tax_total', 0)
        commit('set_lottery_list', [])
        commit('set_lottery_total', 0)
        commit('set_first_lottery', [])
        commit('set_second_lottery', [])
        commit('set_third_lottery', [])
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  },
  // 打乱奖池
  async shuffle ({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        let lot = await db.get('lotteries').value()
        const current = shuffle(lot)
        await db.set('lotteries', current).write()
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  },
  // 抽奖 lottery 1，2，3 对应一二三等奖
  async lottery ({ commit }, lottery) {
    return new Promise(async (resolve, reject) => {
      try {
        const lot = db.get('lotteries').value()
        switch (lottery) {
          case 1: {
            const list = await sample(lot)
            const data = [list]
            commit('set_first_lottery', data)
            db.set('first_lottery', data).write()
            resolve(data)
            break
          }
          case 2: {
            let list = []
            for (let index = 0; index < 10; index++) {
              list.push(sample(lot))
            }
            commit('set_second_lottery', list)
            db.set('second_lottery', list).write()
            resolve(list)
            break
          }
          case 3: {
            let list = []
            for (let index = 0; index < 100; index++) {
              list.push(sample(lot))
            }
            commit('set_third_lottery', list)
            db.set('third_lottery', list).write()
            resolve(list)
            break
          }
          default:
            resolve([])
            break
        }
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
