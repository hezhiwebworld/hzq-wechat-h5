<template>
    <div class="nav">
        <div id="hui-footer"> 
        <a @click="go_index"  :class="{active: isactive === 'index'}" id="nav-home">
            <div class="hui-footer-icons cufont-logo"></div>
            <div class="hui-footer-text">首页</div>
        </a> 
        <a @click="go_load"  :class="{active: isactive  === 'loan'}" id="nav-loan">
            <div class="hui-footer-icons cufont-loan"></div>
            <div class="hui-footer-text">贷款</div>
        </a>
        <a @click="go_creditcard"  :class="{active: isactive ==='ccCard'}" id="nav-invoice">
            <div class="hui-footer-icons cufont-creditcard"></div>
            <div class="hui-footer-text">信用卡</div>
        </a>
        <a @click="go_mine" :class="{active: isactive === 'mine'}" id="nav-my">
            <div class="hui-footer-icons cufont-usercenter-active"></div>
            <div class="hui-footer-text">我的</div>
            </a> 
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isactive: '',
        }
    },
    created(){
        console.log(this.$route.name)
        this.isactive =  this.$route.name
    },
    methods: {
       go_index(){
        this.navigatePageTo('/pages/index/main')
       },
       go_load(){
        this.navigatePageTo('/pages/loan/main')
       },
       go_creditcard() {
        this.navigatePageTo('/pages/ccCard/main')
       },
       go_mine(){
        this.navigatePageTo('/pages/mine/main')
       }
    }
}
</script>
<style lang="less" scoped>
.nav {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 54px;
    z-index: 1000;
}
</style>


