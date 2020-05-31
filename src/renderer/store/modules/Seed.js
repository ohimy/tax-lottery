import db from '../../utils/datastore'
import { paginate, shuffle, sample } from '../../utils/toolbox'

const state = {
  taxList: [],
  taxTotal: 0,
  lotteryList: [],
  lotteryTotal: 0,
  firstLottery: [],
  secondLottery: [],
  thirdLottery: [],
  noList: []
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
  },
  add_no_list: (state, no) => {
    state.noList.push(no)
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
            lotteryList.push(tax.no)
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
  async lottery ({ commit, state }, lottery) {
    return new Promise(async (resolve, reject) => {
      try {
        const lot = db.get('lotteries').value()
        let noList = state.noList
        switch (lottery) {
          case 1: {
            let list = new Set()
            while (list.size < 1) {
              let item = sample(lot)
              if (noList.indexOf(item) === -1) {
                list.add(item)
                commit('add_no_list', item)
              }
            }
            const data = Array.from(list)
            commit('set_first_lottery', data)
            db.set('first_lottery', data).write()
            resolve(data)
            break
          }
          case 2: {
            let list = new Set()
            while (list.size < 10) {
              let item = sample(lot)
              if (noList.indexOf(item) === -1) {
                list.add(item)
                commit('add_no_list', item)
              }
            }
            commit('set_second_lottery', Array.from(list))
            db.set('second_lottery', Array.from(list)).write()
            resolve(Array.from(list))
            break
          }
          case 3: {
            let list = new Set()
            while (list.size < 100) {
              let item = sample(lot)
              if (noList.indexOf(item) === -1) {
                list.add(item)
                commit('add_no_list', item)
              }
            }
            // 保存到vuex
            commit('set_third_lottery', Array.from(list))
            // 保存到数据库
            db.set('third_lottery', Array.from(list)).write()
            resolve(Array.from(list))
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
