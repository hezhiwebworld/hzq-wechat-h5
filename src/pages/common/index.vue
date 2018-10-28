<template>
  <div class="container" ref="wrapper">
    <headerTop :isscTop="isscTop">
      <h1 slot="title"><i class="cufont cufont-zmf"></i> {{ title }} </h1>
      <ListLoan slot="content" :isMore="isMore" :bannerList="bannerList"  :loanList ='loanList' :newarrival="false"></ListLoan>
    </headerTop>   
  </div>
</template>

<script>
// 组件引用

import ListLoan from '@/components/loadList'
import headerTop from '@/components/header'

// 自定义函数
import signMd from '@/common/signMd'


import { mapMutations } from 'vuex'


export default {
  data () {
    return {
      motto: 'Hello World',
      scTop: 0, 
      isscTop: true,   
      scrollHieght: 0,  // 滚动高度
      isMore: false,    // 是否加载更多
      loanList: [],
      bannerList: [],
      isloadMoreData: false,
      title: '',
      pageSize: 8,
      currentPage:1,
    }
  },
  components: {
   ListLoan , headerTop
  },
  created(){
    document.title = '信用卡';
    this.getIndexProductList();
    console.log(this.newroot())
  },
  mounted(){
    this.title = this.getTitle();
    var that = this
    window.onscroll = function() {
      this.TopHeight = document.documentElement.scrollTop || document.body.scrollTop;
      that.scTop  = this.TopHeight
      that.scrollHieght = document.documentElement.scrollHeight - that.$refs.wrapper.getBoundingClientRect().height
      // 上拉加载
      if(that.scrollHieght - that.scTop < 100){
        that.isMore = true
        that.getIndexProductList()
      }else{
        that.isMore = false
      }
      
      // 滚动隐藏下拉菜单
      that.UPDATE_DIALOG({isshow: false})
    }
  },
  methods: {
    ...mapMutations(['UPDATE_DIALOG']),
      getIndexProductList() {
        if(this.isloadMoreData) {
         return false;
       }
       this.isloadMoreData = true
        let data = {
         entryType: this.newroot().query.entrance,
         pageSize: this.pageSize,
         currentPage: this.currentPage,
         t: this.pageSize,
       }
       data.sign = signMd(data)
       this.service.httpRequest({
          data: data,
          methods: 'POST',
          url: '/product/indexProductList',
          type: 0
       }).then((res)=>{
         console.log(res.data)
         if(res.data.code === '0') {
          
          this.pageSize = res.data.pageSize ;
          this.currentPage = parseInt(res.data.currentPage) +1;
          if(res.data.data.length === 0) {
            this.isloadMoreData = true;
          }else {
            this.isloadMoreData = false;
            this.loanList = this.loanList.concat(res.data.data)
          }        
         }
       }).catch(()=> {
         console.log(this.showTips)
         if(!this.showTips){
            // this.UPDATE_ALERT({showTips: true})
         }         
       })
     },
     getTitle() {
       switch (this.newroot().query.entrance.toString()) {
        case '1':
          return "新口子"         
        case '2':
          return "急速秒贷"        
        case '3':
          return "芝麻分贷"        
        case '4':
          return "大额信贷"         
        default:
          break;
      }
     }
  }
}
</script>

<style lang="less" scoped>
.container {
  background: #FFF;
  height: 100%;
  width: 100%;
  // padding-bottom: 54px;
  box-sizing: border-box;
  overflow: auto;
}

.hui-header {
  font-size: 0;
}

.hui-wrap.has-footer {
  padding-bottom: 0;
}
.top_nav {
  padding-top: 44px;
}

.container .list-pro{
  margin-bottom: 0;
  padding-bottom: 0;
}

</style>
