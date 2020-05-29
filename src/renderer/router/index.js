import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: require('@/views/Index').default
    },
    {
      path: '/seeds',
      name: 'SeedIndex',
      component: require('@/views/Seed').default
    },
    {
      path: '/prize',
      name: 'PrizeIndex',
      component: require('@/views/Prize').default
    },
    {
      path: '/lotteries',
      name: 'LotteryIndex',
      component: require('@/views/Lottery').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
