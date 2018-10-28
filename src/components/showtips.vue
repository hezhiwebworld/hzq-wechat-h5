<template>
  <div class="dialog_show" v-show="showTips">
    <div class="dialog_wrap">
      <div class="dialog_con">{{ msg }}</div>
      <div class="dialog_btn">
        <div class="cancel" @touchstart="cancel">取消</div><div class="konw" @touchstart="konws">知道了</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState , mapMutations } from 'vuex'

export default {
  props: {
    msg:{
      default: 'axios异常，请稍后再试'
    }
  },
  data() {
    return {
      
    }
  },
  computed: {
    ...mapState(['showTips'])
  },
  methods: {
    ...mapMutations(['UPDATE_ALERT']),
    konws() {
      this.UPDATE_ALERT({showTips: false})
    },
    cancel() {
      this.UPDATE_ALERT({showTips: false})
    }
  }
}
</script>

<style lang="less" scoped>
.dialog_show{
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
  z-index: 1001;
  .dialog_wrap {
    background: #FFF;
    width: 70%;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 1px 1px 1px 1px #CCC;
    .dialog_btn{
      display: flex;
      text-align: center;
      padding: 10px; 
      .cancel {
        flex: 1;
      }
      .konw {
        flex: 1;
      }
    }
    .dialog_con {
      padding: 30px; 
      border-bottom: 1px solid #eeeeee;
    }
  }
}
</style>

