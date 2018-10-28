<template>
  <div class="container page-msg">
    <headerTop :isscTop="true">
      <h1 slot="title">我的消息</h1>
      <!-- <ListLoan :isMore="isMore" :bannerList="bannerList"></ListLoan> -->
      <div  slot="content">
      <!-- <div class="hui-wrap" slot="content"> -->
          <ul class="list-msg">
            <p class="date">2018/08/09</p>
            <li><i class="itfont itfont-message"></i>
              <h4>消息标题</h4>
              <p>消息内容消息内容消息内容消息内容消息内容消息内容</p>
            </li>
            <p class="date">2018/08/09</p>
            <li><i class="itfont itfont-message"></i>
              <h4>消息标题</h4>
              <p>消息内容消息内容消息内容消息内容消息内容消息内容</p>
            </li>
            <p class="date">2018/08/09</p>
            <li><i class="itfont itfont-message"></i>
              <h4>消息标题</h4>
              <p>消息内容消息内容消息内容消息内容消息内容消息内容</p>
            </li>
            <p class="date">2018/08/09</p>
            <li><i class="itfont itfont-message"></i>
              <h4>消息标题</h4>
              <p>消息内容消息内容消息内容消息内容消息内容消息内容</p>
            </li>
            <p class="date">2018/08/09</p>
            <li><i class="itfont itfont-message"></i>
              <h4>消息标题</h4>
              <p>消息内容消息内容消息内容消息内容消息内容消息内容</p>
            </li>
          </ul>
        </div>
   
    </headerTop>

    
  </div>
</template>

<script>
// 组件引用
import headerTop from '@/components/header'
import NoData from  '@/components/nodata'


export default {
  data () {
    return {
      boxName: 'loan'
    }
  },
  components: {
    headerTop, NoData
  },
  methods: {
    get_loan() {
      this.boxName = 'loan'
    },
    get_ccCard() {
       this.boxName = 'ccCard'
    },
    getApplyList() {
      this.service.httpRequest({
        data: {},
        methods: 'POST',
        url: '/user/applyList.htm',
        type: 0
      }).then((res)=> {
        if(res.data.code === '0'){
          this.reLaunchPageTo('/pages/mine/main')
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
  background: #efefef;
  height: 100%;
  width: 100%;
}

.hide {
  display: none;
}

.list-msg {
  margin-top: 44px;
}
</style>
