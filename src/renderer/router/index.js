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
      path: '/import',
      name: 'ImportData',
      component: require('@/views/ImportData').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
