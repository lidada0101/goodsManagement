import Vue from 'vue'
import Router from 'vue-router'

const Test = () => import('@/views/test/index.vue')
const home = () => import('@/views/home/home.vue')
const outstoreroom = () => import('@/views/outstoreroom/outstoreroom.vue')
const joinstoreroom = () => import('@/views/joinstoreroom/joinstoreroom.vue')
const storeroom = () => import('@/views/storeroom/storeroom.vue')

Vue.use(Router)

export default new Router({
  routes: [
    { // 首页
      path: '/',
      name: 'home',
      component: home,
    },
    { // 出库
      path: '/outstoreroom',
      name: 'outstoreroom',
      component: outstoreroom,
    },
    { // 入库
      path: '/joinstoreroom',
      name: 'joinstoreroom',
      component: joinstoreroom,
    },
    { // 仓库
      path: '/storeroom',
      name: 'storeroom',
      component: storeroom,
    },
    { // 测试
      path: '/test',
      name: 'test',
      component: Test,
    }
  ]
})
