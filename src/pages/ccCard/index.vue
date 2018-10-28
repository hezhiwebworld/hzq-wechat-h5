<template>
  <div class="container" ref="wrapper">
    <headerTop :isscTop="isscTop">
      <h1 slot="title">信用卡</h1>
      <ListCC slot="content" :isMore="isMore" :bannerList='bannerList' :ccList="ccList"></ListCC>
    </headerTop>
    <!-- 底部组件 -->
    <footerNav></footerNav>
    
  </div>
</template>

<script>
// 组件引用
import footerNav from '@/components/footer'
import headerTop from '@/components/header'
import ListCC from '@/components/creditList'
import { randomString } from '@/common/utils'
import signMd from '@/common/signMd'


export default {
  data () {
    return {
      motto: 'Hello World',
      bannerList: [],
      scTop: 0, 
      isscTop: false,   // top滚动变色
      scrollHieght: 0,  // 滚动高度
      isMore: false,    // 是否加载更多
      isloadMoreData: false,
      ccList: [],
      pageSize: 6,
      currentPage:1,
    }
  },
  components: {
    footerNav, headerTop,ListCC 
  },
  created(){
    document.title = '信用卡';
  },
  mounted(){
    var that = this
    window.onscroll = function() {
      this.TopHeight = document.documentElement.scrollTop || document.body.scrollTop;
      that.scTop  = this.TopHeight
      that.scrollHieght = document.documentElement.scrollHeight - that.$refs.wrapper.getBoundingClientRect().height
      // 控制头部banner变色
      if(that.scTop > 44) {
          that.isscTop = true
      }else{
          that.isscTop = false
      }
      // 上拉加载
      if(that.scrollHieght - that.scTop < 100){
        that.isMore = true
        that.getCreditCardList()
      }else{
        that.isMore = false
      }

    }
    this.getCreditCardList()
  },
  methods: {
    getCreditCardList() {
      if(this.isloadMoreData) {
        return false
      }
      this.isloadMoreData = true;
      let data = {
         pageSize: this.pageSize,
         currentPage: this.currentPage,
         t: randomString()
       }
       data.sign = signMd(data);
       this.service.httpRequest({
          data: data,
          methods: 'POST',
          url: '/product/creditCardList',
          type: 0
       }).then((res)=> {
          if(res.data.code === '0'){
            this.pageSize = res.data.pageSize ;
            this.currentPage = parseInt(res.data.currentPage) +1;
            if(res.data.data.length === 0) {
              this.isloadMoreData = true;
            }else {
              this.isloadMoreData = false;
              this.ccList = this.ccList.concat(res.data.data)
            }
          }
       }).catch(()=> {
         // 异常
       }) 
     }
  }
}
</script>

<style lang="less" scoped>
.container {
  background: #CCC;
  height: 100%;
  width: 100%;
  // padding-bottom: 54px;
  box-sizing: border-box;
  overflow: auto;
}

.hui-header {
  font-size: 0;
}
</style>
