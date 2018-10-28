<template>
    <div class="hui-wrap has-footer ccList" ref="wrapper">
        <div class="ccList_wrap">
        <!-- 广告 -->
        <banner :bannerList='bannerList' v-if="bannerList.length != 0"></banner>
         <!-- 筛选 -->
        <cateTab v-if="newarrival"></cateTab>
         <!-- 贷款产品 -->
        <div class="list-pro" v-if="loanList.length != 0">
            <div class="item"  v-for="(item, i) in  loanList" :key="i" >
                <div class="thumb"><img :src="item.imgUrl" alt="" /></div>
                <h6>{{ item.pname }}<small>{{ item.remark }}</small></h6>
                <div class="quota"><span>可贷额度</span>{{ item.min }}~{{ item.max }}</div>
                <div class="dailyrate"><span>{{item.rate}}%</span>日利率</div>
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
import cateTab from '@/components/categrey'
// 外部插件
// import BScroll from 'better-scroll'

export default {
    props: ['isMore', 'bannerList', 'loanList', 'newarrival'],
    data() {
        return {

        }
    },
    components: {
        banner, loadMore, cateTab
    },
    mounted() {
        // this.initScoll();
    }, 
    methods: {
      go_CC_url(url) {
        // 判断用户登录
        let userinfo =  this.getStorageSync('userInfo');
        if(userinfo){
          window.location.href = url
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

