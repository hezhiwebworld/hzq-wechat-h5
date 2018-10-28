import Vue from 'vue'
import Router from 'vue-router'
import index from '../pages/index/index.vue'
import logs from '../pages/logs/index.vue'


import register from '../pages/register/index.vue'
import login from '../pages/login/index.vue'


import mine from '../pages/mine/index.vue'
import loan from '../pages/loan/index.vue'
import apply from '../pages/apply/index.vue'
import ccCard from '../pages/ccCard/index.vue'
import saveuserinfo from '../pages/saveuserinfo/index.vue'
import saveApply from '../pages/saveApply/index.vue'

import commonList from '../pages/common/index.vue'
// import message from '../pages/message/index.vue'



Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'index',
    component: index,
    alias: '/pages/index/main'
  }, {
    path: '/logs',
    name: 'logs',
    component: logs,
    alias: '/pages/logs/main'
  },
  {
    path: '/register',  // 注册, 忘记密码
    name: 'register',
    component: register,
    alias: '/pages/register/main'
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    alias: '/pages/login/main'
  },
  {
    path: '/mine',
    name: 'mine',
    component: mine,
    alias: '/pages/mine/main'
  },
  {
    path: '/loan',
    name: 'loan',
    component: loan,
    alias: '/pages/loan/main'
  },
  {
    path: '/apply',
    name: 'apply',
    component: apply,
    alias: '/pages/apply/main'
  },
  {
    path: '/ccCard',
    name: 'ccCard',
    component: ccCard,
    alias: '/pages/ccCard/main'
  },
  {
    path: '/saveuserinfo',
    name: 'saveuserinfo',
    component: saveuserinfo,
    alias: '/pages/saveuserinfo/main'
  },
  {
    path: '/saveApply',
    name: 'saveApply',
    component: saveApply,
    alias: '/pages/saveApply/main'
  },
   {
    path: '/commonList',
    name: 'commonList',
    component: commonList,
    alias: '/pages/commonList/main'
  }
  ]
})
