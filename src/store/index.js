import Vue from 'vue'
import Vuex from 'vuex'
// import * as getters from './getters.js'

Vue.use(Vuex)

/** 状态定义 */

const store = new Vuex.Store({
  state: {
    direction: 'forward',
    userdata:{
      username: '',  // 用户姓名
      password: '',  // 密码
      repass: '', // 确认密码
      userId: ''  // 用户id
    },
    isshow: false, // 下拉菜单弹窗显示
    loan: {     // 默认的初始值
      amount: null, 
      type: '',
      rate: 0,
    },
    showTips:  false // 错误提示
  },
  mutations: {
    UPDATE_DIRECTION(state,payload) {
      state.direction = payload.direction
    },
    UPDATE_USERDATA(state, payload){
      state.userdata = payload.userdata
    },
    UPDATE_DIALOG(state, payload){
      state.isshow = payload.isshow
    },
    UPDATE_LOAN(state, payload){
      state.loan = payload.loan
    },
    UPDATE_ALERT(state, payload){
      state.showTips = payload.showTips
    }
  }
})

export default store
