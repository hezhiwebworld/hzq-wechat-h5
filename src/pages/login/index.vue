<template>
  <div class="container page-register">
    <div class="hui-wrap">
      <div class="hui-center-title"><img src="../../../static/img/title-login.png" class="wow fadeInUp" data-wow-duration="1s"
          data-wow-delay="0s" alt="" />
        <h1></h1>
      </div>
      <div class="hui-form" id="loginForm">
        <div class="hui-form-items wow fadeInUp" :class="{focus: isonph}"  data-wow-duration=".5s" data-wow-delay="0.3s">
          <input v-model="phone" type="text" class="hui-input hui-input-clear" placeholder="手机号" checkType="reg"
            checkData="^\d{11,11}$" checkMsg="手机号应为11位数字"  @focus="isonph = true"  @blur="isonph = false " />
          <!-- <button @click="get_phcode"  :class="{phcode : !isclick }"   type="button" class="hui-button hui-button-getcode hui-button-small" style="width: 140px; white-space: nowrap; padding:0; text-align:right">{{countTime}}</button> -->
        </div>
        <div class="hui-form-items wow fadeInUp"  :class="{focus: isonphcode}"  data-wow-duration=".5s" data-wow-delay="0.4s">
          <input v-model="password" type="tel" class="hui-input" name="yzm" placeholder="密码"  checkType="reg" checkData="^\d{6,6}$"
            checkMsg="验证码应该为6个数字"  @focus="isonphcode = true"  @blur="isonphcode = false "/>
        </div>
      </div>
      <div class="btns wow fadeInUp" data-wow-duration=".5s" data-wow-delay=".5s">
        <button type="button" class="hui-button hui-button-large hui-primary" @click="getLogin">登录</button>
        <button type="button" class="hui-button hui-button-large" @click="go_register">立即注册</button>
      </div>
      <div class="tip wow fadeInUp" data-wow-duration=".5s" data-wow-delay=".6s">忘记了密码？<a  @click="go_forgetpass">找回密码</a></div>
    </div>
    <!-- showtip -->
    <div id="hui-toast" class="hui-fade-in" v-show="istips">
      <div id="hui-toast-msg">{{tipsMsg}}</div>
    </div>
  </div>
</template>

<script>
// 组件引用
import signMd from '@/common/signMd'
import {validTel, validCode, validpass} from '@/common/rules'
import {WOW} from 'wowjs'
import { randomString } from '@/common/utils'


export default {
  data () {
    return {
      isonphcode: false,
      isonph: false,
      countTime: "获取验证码",
      timeId: null,
      times: 59,
      isclick: true,  // 是否可以点击
      phone: "",
      password: "",
      istips: false,
      tipsMsg: "",
    }
  },
  mounted() {
    // 动画模块
    this.$nextTick(()=> {
      var wow = new WOW({
          live: false,     
      });
      wow.init();
    })
  },
  methods: {
     getLogin(){
       if(!this.validrules()){
         return false
       }
       let data = {
         tel: this.phone,
         pwd: this.password,
         t: randomString()
       }
       this.service.httpRequest({
        data: {},
        methods: 'POST',
        url: '/user/login.htm',
        type: 0
      }).then((res)=> {
        if(res.data.code === '0'){
          this.setStorageSync('userInfo', res.data.data)
          this.reLaunchPageTo('/pages/index/main')
        }
      }).catch(()=>{

      })
     },
    go_register() {
      this.reLaunchPageTo('/pages/register/main')
    },
    go_forgetpass() {
      this.reLaunchPageTo('/pages/forgetpass/main')
    },
    validrules(){
      if(!validTel(this.phone)) {
        this.tipsMsg = "请输入正确的手机号"
        this.showtip()
        return false;
      }
      if(!validpass(this.password)) {
        this.tipsMsg = "请输入正确格式的密码"
        this.showtip() 
        return false;      
      }
      return true;
    },
    showtip() {
      this.istips = true;
      clearTimeout(this.timeId)
      this.timeId = setTimeout(()=> {
        this.istips = false;
      }, 1500)
    }
  },
  destroyed() {
    clearInterval(this.timeId)
  }
}
</script>

<style lang="less" scoped>
@import '../../../static/css/animate';
@import '../../../static/css/hui';
@import '../../../static/css/style';

.container {
  // background:#fff;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.phcode{
  color: #8590a6;
}
</style>
