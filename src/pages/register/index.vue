<template>
  <div class="container page-register">
    <div class="hui-wrap">
        <!-- 注册 -->
        <div v-if="pagename===0" class="hui-center-title">
           <img src="../../../static/img/title-register.png" class="wow flipInY" data-wow-duration="1s"
                data-wow-delay="0s" alt="" />
            <h1 class="wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.2s">注册新账号<small>包赚钱 赚钱更轻松</small></h1>
        </div>
        <!-- 找回密码 -->
        <div v-if="pagename===1" class="hui-center-title"><img src="../../../static/img/title-forgotpsw.png" class="wow flipInY" data-wow-duration="1s"
                data-wow-delay="0s" alt="" />
            <h1 class="wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.2s">找回密码</h1>
        </div>
        <div class="hui-form" id="regForm">
            <div class="hui-form-items wow fadeInUp" :class="{focus: isonph}" data-wow-duration=".5s" data-wow-delay="0.3s">
                <input  v-model.trim="phone" type="text" class="hui-input hui-input-clear" placeholder="手机号" checkType="reg" checkData="^\d{11,11}$"
                    checkMsg="手机号应为11位数字"  @focus="isonph = true"  @blur="isonph = false "/>
                <button  type="button" class="hui-button hui-button-getcode hui-button-small" :class="{phcode : !isclick }" style="width: 140px; white-space: nowrap; padding:0; text-align:right" @click="get_phcode">{{countTime}}</button>
            </div>
            <div class="hui-form-items wow fadeInUp"  :class="{focus: isonpass}"  data-wow-duration=".5s" data-wow-delay="0.4s">
                <input v-model.trim="password" type="password" class="hui-input hui-pwd-eye" placeholder="输入密码" checkType="string" id="pwd"
                    checkData="6,20" value="" checkMsg="密码应为6-20个字符"   @focus="isonpass = true"  @blur="isonpass = false "/>
                <div class="hui-pwd-eyes" onclick="hui.eyesChange(this);"></div>
            </div>
            <div class="hui-form-items wow fadeInUp" :class="{focus: isonrepass}" data-wow-duration=".5s" data-wow-delay="0.5s">
                <input v-model.trim="repass" type="password" class="hui-input hui-pwd-eye" placeholder="确认密码" checkType="sameWithId"
                    checkData="pwd" value="" checkMsg="两次密码不一致"   @focus="isonrepass = true"  @blur="isonrepass = false " />
                <div class="hui-pwd-eyes" onclick="hui.eyesChange(this);"></div>
            </div>
            <div class="hui-form-items wow fadeInUp" :class="{focus: isonphcode }"  data-wow-duration=".5s" data-wow-delay="0.6s">
                <input v-model.trim="phcode" type="tel" class="hui-input" name="yzm" placeholder="短信验证码" checkType="reg" checkData="^\d{6,6}$"
                    checkMsg="短信验证码应该为6个数字"  @focus="isonphcode = true"  @blur="isonphcode = false " />
            </div>
        </div>
        <div class="btns"><button type="button" class="hui-button hui-button-large hui-primary wow fadeInUp"
                data-wow-duration=".5s" data-wow-delay=".8s" id="submit" @click="getRegister">{{pagename===0 ? '立即注册' : '重置密码' }} </button>
        </div>
        <div  v-if="pagename===0"  class="tip wow fadeInUp" data-wow-duration=".5s" data-wow-delay=".9s">已有账号？<a @click="go_login">立即登录</a></div>
    </div>
    <!-- showtip -->
    <div id="hui-toast" class="hui-fade-in" v-show="istips">
      <div id="hui-toast-msg">{{tipsMsg}}</div>
    </div>
    <!-- 加载完成之后淡入淡出 -->
    <!-- <showTips>
      <loading></loading>
    </showTips> -->
    <showTips></showTips>
  </div>
</template>

<script>
// 组件引用
import card from '@/components/card'
import loading from '@/components/loading'
import signMd from '@/common/signMd'
import {validTel, validCode, validpass} from '@/common/rules'
import { randomString } from '@/common/utils'
import {WOW} from 'wowjs'
import showTips from '@/components/showtips'
import { mapState , mapMutations } from 'vuex'

const PAGEREGISTER = 0  // 注册
const PAGEFORGETPASS = 1 // 忘记密码

export default {
  data () {
    return {
    phone: '',
    phcode: '',
    password: '',
    repass: '',
    isonph: false,
    isonpass: false,
    isonrepass: false,
    isonphcode: false,
    isonvcode: false,
    istips: false,
    tipsMsg: "",
    timeId: null, // 定时器的id
    isclick: true,  // 是否可以点击
    countTime: "获取验证码",
    times: 59,
    pagename: PAGEREGISTER
    }
  },
  components: {
    card, loading, showTips
  },
  computed: {
    ...mapState(['showTips'])
  },
  mounted() {
    document.title = "注册新账号"
    if(this.newroot().query.passmiss == 1) {
      this.pagename = PAGEFORGETPASS
    }
    // 动画模块
    this.$nextTick(()=> {
      var wow = new WOW({
          live: false,     
      });
      wow.init();

    })
  },
  methods: {
    ...mapMutations(['UPDATE_ALERT']),
    go_login () {
     this.navigatePageTo('/pages/login/main')
    },
    getRegister(){
      if(!this.validrules()) {
        return false;
      }
      let data = {
        tel: this.phone,
        telMsg: this.phcode,
        pwd: this.password,
        pwd1: this.repass,
        t: randomString()
      };
      let url = "";
      data.sign = signMd(data)
      // url
      if(this.pagename === 0){
        url = '/user/register.htm'
      }else {
        url = '/user/forgetPwd.htm'
      }
      this.service.httpRequest({
        data: data,
        methods: 'POST',
        url: url,
        type: 0
      }).then((res)=> {
        if(res.data.code === '0'){
          this.reLaunchPageTo('/pages/login/main')
        }
      }).catch(()=> {
        if(!this.showTips){
            this.UPDATE_ALERT({showTips: true})
         } 
      })
    },
    sendMsg(){
      let data = {
        tel : this.phone,
        msgType: 0,  // 注册
        t: randomString()
      }
      data.sign = signMd(data)
      this.service.httpRequest({
        data: data,
        methods: 'POST',
        url: '/user/sendMsg.htm',
        type: 0
      }).then((res)=>{
        console.log(res)
        if(res.data.code === '0'){
          this.phcode = res.data
        }
        
      })
    },
    get_phcode() {
      if(!this.isclick){
        return false;
      }
      this.sendMsg() // 发送验证码
      this.isclick = false;
      clearInterval(this.timeId)
      this.countTime  = this.times + ' 秒后可重发'
      this.timeId = setInterval(()=> {
        this.times--
        this.countTime  = this.times + ' 秒后可重发'
        if(this.times <= 0 ) {
          this.isclick = true;
          this.countTime  = '获取验证码';
          this.times = 59;
          return false;
        }
      }, 1000)
    },
    validrules(){
      if(!validTel(this.phone)) {
        this.tipsMsg = "请输入正确的手机号"
        this.showtip()
        return false;
      }
      if(!validCode(this.phcode)) {
        this.tipsMsg = "请输入正确的短信验证码"
        this.showtip()   
        return false;    
      }
      if(!validpass(this.password)) {
        this.tipsMsg = "请输入正确格式的密码"
        this.showtip() 
        return false;      
      }
      if(this.password != this.repass) {
        this.tipsMsg = "两次输入密码不一致"
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
  created(){
    
  },
  destroyed() {
    clearTimeout(this.timeId)
  }
}
</script>

<style lang="less" scoped>



.container {
  background:#fff;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.phcode{
  color: #8590a6;
}
</style>
