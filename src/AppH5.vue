<template>
  <div id="app">
    <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
      <!-- <keep-alive> -->
      <router-view class="router-view" ></router-view>
      <!-- </keep-alive> -->
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import Vue from "vue"
export default {
    name: 'App',
    data(){
      return {
        // direction: ''
      }
    },
    computed:{
      ...mapState(['direction'])
    },
    created () {
    }
}
</script>

<style lang="less">
@import '../static/css/animate';
@import '../static/css/hui';
@import '../static/css/style';

html, body ,div, a{
    padding: 0;
    margin: 0;
}
html, body {
  height: 100%;
  width: 100%;
}
#app{
    width: 100%;
    height:100%;
    // overflow: auto;
  }
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 300ms;
  height: 100%;
  top: 0;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}

.vux-pop-out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.vux-pop-out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.vux-pop-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.vux-pop-in-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}




</style>
