<template>
    <div class="banner">
        <mt-swipe :auto="4000" class="wrapper"  @change="handleChange" :style="{height:bHeight + 'px'}"
        >
        <mt-swipe-item v-for="(item,index) in bannerList" :key="index"><img :src="item.imgUrl"  @click="go_ad(item)"></mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
export default {
    props: ['bannerList'],
    data(){
        return {
                
        }
    },
    created() {
        console.log(this.bHeight)
    },
    computed: {
        bHeight() {
            // 动态计算图片高度
             let doc = document.body || document.documentElement;
             let p = doc.clientWidth;
            return 600*p/1125
        }
    },
    methods:{
      go_ad(item) {
        console.log(1)
        window.location.href = item.requestUrl
      },
      handleChange() {

      }
    }
}
</script>
<style lang="less">
.wrapper {
    // height: 200px;
} 
.wrapper img {
    width: 100%;
    height: 100%;
}
</style>

