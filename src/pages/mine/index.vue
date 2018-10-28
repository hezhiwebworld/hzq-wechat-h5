<template>
  <div class="container page-my">
    <header class="hui-header hui-header-transparent hui-header-scroll">
      <div id="hui-back"></div>
      <h1>个人中心</h1>
      <a href="setting.html" class="hui-header-icon cufont-setting"></a>
    </header>
    <div class="hui-wrap has-footer">
      <div class="user-cover">
        <a href="userinfo.html" class="user"><img src="../../../static/img/avatar.jpg" class="wow flipInY" data-wow-duration=".5s" data-wow-delay="0s" alt="" />
        <span class="wow fadeInUp"  data-wow-duration=".5s" data-wow-delay=".3s">演示用户<br><i class="cufont cufont-mobile"></i>13916163369</span></a>
      </div>
      <div class="hui-list" style="padding-top:10px;">
        <ul>
          <li> <a @click="go_apply"> <i class="hui-list-icons cufont cufont-apply wow fadeInUp" data-wow-duration=".5s" data-wow-delay="0.3s"></i>
              <div class="hui-list-text"> 我的申请
                <div class="hui-list-info"><span class="hui-badge hui-danger">6</span> <span class="hui-icons hui-icons-right"></span>
                </div>
              </div>
            </a> </li>
           <li> <a @click="go_message"> <i class="hui-list-icons cufont cufont-apply wow fadeInUp" data-wow-duration=".5s" data-wow-delay="0.3s"></i>
              <div class="hui-list-text"> 我的消息
                <div class="hui-list-info"><span class="hui-badge hui-danger">6</span> <span class="hui-icons hui-icons-right"></span>
                </div>
              </div>
            </a> </li>
          <li> <a href="use-agreement.html"> <i class="hui-list-icons cufont cufont-agreement wow fadeInUp" data-wow-duration=".5s" data-wow-delay="0.4s"></i>
              <div class="hui-list-text"> 服务协议
                <div class="hui-list-info"> <span class="hui-icons hui-icons-right"></span> </div>
              </div>
            </a> </li>
          <li> <a href="faq.html"> <i class="hui-list-icons cufont cufont-faq wow fadeInUp" data-wow-duration=".5s" data-wow-delay="0.4s"></i>
              <div class="hui-list-text"> 常见问题
                <div class="hui-list-info"> <span class="hui-icons hui-icons-right"></span> </div>
              </div>
            </a> </li>
          <li> <a href="about.html"> <i class="hui-list-icons cufont cufont-about wow fadeInUp" data-wow-duration=".5s" data-wow-delay="0.5s"></i>
              <div class="hui-list-text"> 关于我们
                <div class="hui-list-info"> <span class="hui-icons hui-icons-right"></span> </div>
              </div>
            </a> </li>
        </ul>
      </div>
      <div class="contact wow fadeInUp" data-wow-duration=".5s" data-wow-delay=".6s">
        400-888-8888
        <span>工作时间：周一至周五 9:00~18:00</span>
      </div>
      <div class="version wow bounceIn" data-wow-duration=".5s" data-wow-delay=".7s">
        <i class="appicon"><img src="../../../static/img/appicon.png" alt=""/></i>
        当前版本：V1.0
      </div>
      <button type="button" class="hui-button hui-button-block hui-button-large hui-primary wow fadeInUp" data-wow-duration=".5s" data-wow-delay=".8s" id="submit">退出登录</button>
    </div>

    <!-- 底部组件 -->
    <footerNav></footerNav>
  </div>
</template>

<script>
// 组件引用
import footerNav from '@/components/footer'
import {WOW} from 'wowjs'

export default {
  data () {
    return {
      isload: false
    }
  },
  components: {
    footerNav
  },
  methods: {
     go_apply() {
       this.navigatePageTo('/pages/apply/main')
     },
     go_message() {
       this.navigatePageTo('/pages/message/main')
     }

  },
  mounted() {
    // setTimeout(()=> {
    //   this.isload = true
    // }, 3000)
    this.$nextTick(()=> {
      var wow = new WOW({
          live: false,     
      });
      wow.init();

    })
  }
}
</script>

<style lang="less" scoped>
.container {
  background: #efefef;
  height: 100%;
  width: 100%;
}
</style>
