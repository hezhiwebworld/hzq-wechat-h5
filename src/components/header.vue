<template>
    <div class="top_nav">
        <header class="hui-header hui-header-scroll " :class="{'hui-header-transparent' : !isscTop}" >
            <div id="hui-back" @touchstart="go_back"></div>
            <slot name="title"></slot>
            <div class="hui-header-icon"></div>
        </header>
        <div ref="wrapper" class="header_wrap">
            <slot name="content"></slot>
        </div>
    </div>
</template>
<script>
export default {
    props: {
       isscTop: {
           default: false
       } 
    },
    data() {
        return  {
        //   isscTop: false
        }
    },
   methods: {
        go_back() {
            window.history.go(-1)
        }
   }
}
</script>
<style lang="less" scoped>
.top_nav {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: 0;
    z-index: 999;
    // height: 100%;
}

.header_wrap {
    height: 100%;
}
</style>



