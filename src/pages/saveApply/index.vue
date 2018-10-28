<template>
  <div class="container">
    新增申请
  </div>
</template>
<script>
// 组件引用
import card from '@/components/card'

export default {
  data () {
    return {
    }
  },
  components: {
    card
  },
  methods: {
    saveApply() {
      this.service.httpRequest({
          data: {},
          methods: 'POST',
          url: '/product/saveApply.htm',
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
  background: #CCC;
  height: 100%;
  width: 100%;
}
</style>
