// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './AppH5'
import router from './router'
// import wxService from './api/wxService'
import httpService from './api/httpService'
import store from './store'

// 适配ios
import Promise from 'es6-promise';
Promise.polyfill();

// 全局样式
// import './assets/css/global.less'
import  '../static/js/app'

// 轮播图组件
import { Swipe, SwipeItem } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

// import { DatetimePicker } from 'mint-ui';
// import { REFUSED } from 'dns';
// Vue.component(DatetimePicker.name, DatetimePicker);


// ua 检测
var is_weixin = (function(){return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1})();

Vue.config.productionTip = false

// simple history management
const history = window.sessionStorage;
let historyCount = history.getItem('count') * 1;
router.beforeEach(function (to, from, next) {
  const toIndex = history.getItem(to.path);
  const fromIndex = history.getItem(from.path);
  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('UPDATE_DIRECTION', {direction: 'forward'})
    } else {
      store.commit('UPDATE_DIRECTION', {direction: 'reverse'})
      // store.commit('UPDATE_DIRECTION', {direction: 'forward'})
    }
  } else {
    ++historyCount;
    history.setItem('count', historyCount);
    to.path !== '/' && history.setItem(to.path, historyCount);
    store.commit('UPDATE_DIRECTION', {direction: 'forward'})
  }
  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1];
    window.location.href = `http${url}`
  } else {
    next()
  }
});

Vue.use(Vuex)
Vue.mixin({
  data () {
    return {
      service: '', // 服务
      router: '/', // 路由路径
      imgSrc: '' // 图片路径
    }
  },
  methods: {
      newroot () {
          return  this.$route
      },
      navigatePageTo (url, query) {  // todo 微信小程序传参需要适配
          if(query) {
            this.$router.push({
              path: url,
              query: query
            }) 
          }else{
            this.$router.push(url) 
          }
          
      },
      reLaunchPageTo (url, query) { 
          if(query) {
            this.$router.replace({
              path: url,
              query: query
            }) 
          }else{
            this.$router.replace(url)
          }
      },
      setStorageSync (name, data) {
          let toString = Object.prototype.toString
          if(toString.call(data) === '[object Undefined]') {
            return 
          }
          if(toString.call(data) === '[object String]') {
            sessionStorage.setItem(name, data)
            return
          }
          if(toString.call(data) === '[object Number]') {
            sessionStorage.setItem(name, data)
            return
          }
          if(toString.call(data) === '[object Boolean]') {
            sessionStorage.setItem(name, data)
            return
          }
          if(toString.call(data) === '[object Object]') {
            sessionStorage.setItem(name, JSON.stringify(data))
            return
          }
          if(toString.call(data) === '[object Array]') {
            sessionStorage.setItem(name, JSON.stringify(data))
            return
          }
          return null
      },
      getStorageSync (name) {
          if(!name){
            return null
          }
          return JSON.parse(sessionStorage.getItem(name))
      }
  },
  created () {
      console.log('chrome')
      this.service = httpService
  }
})



Vue.filter('applyNum', function (value) {
  
  // if(/(\d+)(\d{3})/.test(value.toString())) {
  //   value = value.toString().replace(/(\d+)(\d{3})/,'$1'+','+'$2')
  //   return value
  // }else{
  //   return value
  // }
  return value;
})

Vue.filter('tel', function (value) {
  
  // if(/(\d+)(\d{3})/.test(value.toString())) {
  //   value = value.toString().replace(/(\d+)(\d{3})/,'$1'+','+'$2')
  //   return value
  // }else{
  //   return value
  // }
  return value;
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
