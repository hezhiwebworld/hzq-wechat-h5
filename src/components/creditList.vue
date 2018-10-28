<template>
    <div class="hui-wrap has-footer ccList" ref="wrapper">
        <div class="ccList_wrap">
        <!-- 广告 -->
        <banner :bannerList='bannerList'></banner>
        <div class="list-pro list-pro-creditcard " v-if="ccList.length != 0">
            <div class="item"  v-for="(item, i) in ccList" :key="i" @click="go_CC_url(item.url)">
                <div class="thumb"><img :src="item.imgUrl" alt="" /></div>
                <h6>{{ item.name }}<small>{{ item.remark}}</small></h6>
                 <div class="applied">已有{{ item.num | applyNum }}人申请</div>
            </div>
        </div>
				 <loadMore v-show="isMore"></loadMore>
        </div>
    </div>
</template>
<script>
// 自定义组件
import banner from '@/components/banner'
import loadMore from '@/components/loadmore'
// 外部插件
// import BScroll from 'better-scroll'

export default {
	props: ['isMore', 'ccList', 'bannerList'],
  data() {
      return {
        }
  },
  components: {
      banner, loadMore
  },
  methods: {
    go_CC_url(url) {
      // 判断用户登录
      let userinfo =  this.getStorageSync('userInfo');
      if(userinfo){
        window.location.href = url
      }else {
        // 未登录
        this.navigatePageTo('/pages/login/main')
      }
    } 
  }
}
</script>
<style lang="less" scoped>
.ccList {
    height: 100%;
}


</style>

