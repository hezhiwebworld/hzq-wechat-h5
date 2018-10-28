<template>
  <div class="container" ref="wrapper">
    <header class="hui-header  hui-header-scroll" :class="{'hui-header-transparent' : !isscTop}">
      <div class="hui-header-icon cufont-menu" @click="slideMenuShow"></div>
      <h1 class="wow flipInX" data-wow-duration="1s" data-wow-delay=".5s"><img src="../../../static/img/logo.png" alt="" /></h1>
      <div class="hui-header-icon"></div>
    </header>
    <div class="hui-wrap has-footer">
      <!-- 广告 -->
      <banner :bannerList='bannerList'></banner>
      <!-- nav -->
      <div class="mainaction">
        <a @click="go_commonList(2)" class="wow flipInX inav_wrap" data-wow-duration=".5s" data-wow-delay="0s">
          <img src="../../../static/img/i-jsmd.png" alt="" class="inav" />极速秒贷<small>借五千以下</small> </a> 
        <a @click="go_commonList(1)" class="wow flipInX inav_wrap" data-wow-duration=".5s" data-wow-delay=".2s">
          <img src="../../../static/img/i-xdkcp.png" class="inav" />
          <!-- <span class="hui-badge hui-danger wow bounceIn" data-wow-duration=".5s" data-wow-delay="0.6s">8</span> -->
          新贷款产品<small>10点更新</small> </a>
        <a @click="go_commonList(3)" class="wow flipInX inav_wrap" data-wow-duration=".5s" data-wow-delay=".4s"> 
          <img src="../../../static/img/i-zmfj.png"  alt="" class="inav" />
          芝麻分借<small>480分以下</small> </a> 
        <a @click="go_commonList(4)" class="wow flipInX inav_wrap" data-wow-duration=".5s" data-wow-delay=".5s"> 
          <img src="../../../static/img/i-dexd.png" alt="" class="inav" />大额信贷<small>精准推荐</small> </a> </div>
      <!-- 最新信息 -->
      <div class="latestnews hui-scroll-news wow fadeInUp" data-wow-duration=".5s" data-wow-delay=".6s" id="scrollnew">
        <i class="cufont cufont-msg wow bounceIn" data-wow-duration=".5s" data-wow-delay="1s"></i>
        <!-- 小程序不支持支持 -->
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item , i)  in broadList" :key="i"><div class="hui-scroll-news-items"> {{item.tel}} 用户在 <span>{{item.channel}}</span> 成功放款{{item.amount}}元</div></swiper-slide>    
        </swiper>
      </div>
      <!-- 精品推荐 -->
      <div class="recommend wow fadeInUp" data-wow-duration=".5s" data-wow-delay=".7s">
        <div id="scroll">
          <div class="hui-flex">
            <div class="item"><img src="../../../static/img/swipe/recommend01.jpg" alt="" /></div>
            <div class="item"><img src="../../../static/img/swipe/recommend02.jpg" alt="" /></div>
          </div>
        </div>
      </div>
      <!-- 热门贷款产品 -->
      <div class="list-pro wow fadeInUp" data-wow-duration=".5s" data-wow-delay=".8s">
        <h4><i class="cufont cufont-hot"></i> 热门贷款产品<a @click="go_loan" class="cufont cufont-more btn-more"></a></h4>
         <div class="item" onClick="location.href='apply-loan.html'" v-for="(item, i) in  loanList" :key="i">
              <div class="thumb"><img :src="item.imgUrl" alt="" /></div>
              <h6>{{ item.pname }}<small>{{ item.remark }}</small></h6>
              <div class="quota"><span>可贷额度</span>{{ item.min }}~{{ item.max }}</div>
              <div class="dailyrate"><span>{{item.rate}}</span>日利率</div>
          </div>
      </div>
      <!-- 信用产品 -->
      <div class="list-pro list-pro-creditcard wow fadeInUp" data-wow-duration=".5s">
        <h4><i class="cufont cufont-creditcard"></i> 信用产品<a @click="go_creditcard" class="cufont cufont-more btn-more"></a></h4>
       <div class="item"  v-for="(item, i) in ccCard" :key="i">
          <div class="thumb"><img :src="item.imgUrl" alt="" /></div>
          <h6>{{ item.name }}<small>{{ item.remark}}</small></h6>
          <div class="applied">已有{{ item.num | applyNum }}人申请</div>
        </div>
      </div>
    </div>
     <!-- 遮掉层 -->
    <div class="dialog" v-show="slideMenu" @click="slideMenuHide">
      <div   ref="slideMenu">
        <div class="user">
          <div class="avatar"><img src="../../../static/img/avatar.jpg" alt="" /></div>
          演示用户
        </div>
      </div>
    </div>
    <!-- 底部tab -->
    <footerNav></footerNav>
    <!-- showTips -->
    <showTips></showTips>
  </div>
</template>

<script>
// 自定义组件
import footerNav from '@/components/footer'
// import headerTop from '@/components/header'
import banner from '@/components/banner'
import showTips from '@/components/showtips'
// 自定义函数
import signMd from '@/common/signMd'
// 外部插件
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import {WOW} from 'wowjs'
import { mapState , mapMutations } from 'vuex'

export default {
  data () {
    return {
      scTop: 0, 
      isscTop: false,   // top滚动变色
      scrollHieght: 0,  // 滚动高度
      slideMenu: false,
      swiperOption: { //swiper4
         autoplay: {
          delay: 3000, //自动切换的时间间隔，单位ms
        },
        speed: 1000,
        direction: 'vertical',
        loop: true,
        simulateTouch: false,
        fadeEffect: {
          crossFade: false,
        },
        autoHeight: true
      },
      broadList: [], // 小喇叭
      loanList: [],
      bannerList: [], // 轮播图
      ccCard: [],
      isshowTips: false, // 是否显示弹窗
    }
  },
  components: {
    footerNav, banner, swiper,swiperSlide, showTips
  },
  created() {
    this.getIndex();
  },
  mounted(){
    //  动画模块
    this.$nextTick(()=> {
        var wow = new WOW({
            live: false,     
        });
        wow.init();
      })
  },
  computed: {
    ...mapState(['showTips'])
  },
  methods: {
     ...mapMutations(['UPDATE_ALERT']),
     // 侧边栏动画
     slideMenuShow() {
      return false;
      // this.slideMenu = true
      // this.$refs.slideMenu.className = 'hui-slide-menu  hui-slide-menu-show'
     },
     slideMenuHide() {
      //  this.slideMenu = false
      this.$refs.slideMenu.className = 'hui-slide-menu  hui-slide-menu-show hui-slide-menu-hide'
      setTimeout(()=>{
           this.slideMenu = false
          this.$refs.slideMenu.className = 'hui-slide-menu'
          },600);
     },
     go_saveuserinfo() {
       // 判断用户登录
       let userinfo =  this.getStorageSync('userInfo');
       if(userinfo){
         this.navigatePageTo('/pages/commonList/main', {entrance: 4})
       }else{
         this.navigatePageTo('/pages/saveuserinfo/main')
       }
       
     },
     go_loan() {
       this.navigatePageTo('/pages/loan/main', {entrance: 2})
     },
     go_creditcard() {
       this.navigatePageTo('/pages/ccCard/main', {entrance: 1})
     },
     go_commonList(num) {
       if(num === 4) {
          let userinfo =  this.getStorageSync('userInfo');
          if(userinfo){
            this.navigatePageTo('/pages/commonList/main', {entrance: num})
          }else{
            this.navigatePageTo('/pages/saveuserinfo/main')
          }
       }else {
         this.navigatePageTo('/pages/commonList/main', {entrance: num})
       } 
     },
     
     getIndex() {
       let data = {
         
       }
       data.sign = signMd(data)
       this.service.httpRequest({
          data: data,
          methods: 'POST',
          url: '/product/index',
          type: 0
       }).then((res)=>{
         console.log(res.data)
         if(res.data.code === '0') {
           let temp = res.data.data
           this.broadList = temp.hornData
           this.loanList = temp.hotLData
           this.ccCard = temp.hotCData
           this.bannerList = temp.cycleData
           console.log(this.broadList)
           console.log(JSON.parse(this.ccCard))
         }
       }).catch(()=> {
         console.log(this.showTips)
         if(!this.showTips){
            // this.UPDATE_ALERT({showTips: true})
         }         
       })
     },

  }
}
</script>

<style lang="less" scoped>
.container {
  background: #efefef;
  height: 100%;
  width: 100%;
}

.latestnews {
  overflow: hidden;
}

.dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1001;
}

.mainaction .inav {
  display: block;
  width: 44px;
  height: 44px;
  margin: 0 auto;
  margin-bottom: 5px;
  line-height: 44px;
  text-align: center;
}
.mainaction .inav_wrap{
  display: inline-block;
}
</style>
