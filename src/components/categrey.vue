<template>
<div class="cate">
    <div class="filter">
      <div class="select" @click="upmenu_amount">{{loan_amount}}
        <div class="hui-icons hui-icons-down2"></div>
      </div>
      <div class="select" @click="upmenu_type">{{loan_type}}
        <div class="hui-icons hui-icons-down2"></div>
      </div>
      <div class="select" @click="upmenu_rate">{{loan_rate}}
        <div class="hui-icons hui-icons-down2"></div>
      </div>
    </div>
    <div class="menu_wrap" v-show="isshow">
      <div v-for="(item,index) in data"  :key="index" class="item" @click="categray(item, index)">{{item}}</div>
    </div>
    <div class="dialog" :style="{top: bHeight + 40 + 'px'}" v-show="isshow"></div>
</div>
 
</template>
<script>
import { mapState, mapMutations } from 'vuex';

const AMOUNT_WRAP = 0;
const TYPE_WRAP = 1;
const RATE_WRAP = 2;

export default {
  data() {
    return {
      data: [],
      data1: ['所有贷款', '身份证贷款', '银行卡贷', '信用卡贷','公积金贷', '社保贷', '芝麻分贷' ],
      data1_key: ['ALL', 'ID', 'ID', 'CARD', 'GJJ', 'SB','ZMFD' ],
      data2: ['推荐排序', '贷款成功率', '放款速度快', '贷款利率低', '贷款额度大' ],
      data2_key: [0, 1, 2, 3, 4],
      data3: ['所有金额', '2000以下', '2000-5000', '5000-10000', '10000-30000', '30000以上'],
      data3_key: [null, 1, 2, 3, 4, 5],
      loan_amount: '所有金额',
      loan_type: '所有贷款',
      loan_rate: '推荐排序',
      loan_amount_key:'',
      loan_type_key:'',
      loan_rate_key:'',
      menu_name: 0,
    }
  },
  computed: {
    ...mapState(['isshow', 'loan']),
    bHeight() {
        // 动态计算图片高度
          let doc = document.body || document.documentElement;
          let p = doc.clientWidth;
        return 600*p/1125
    }
  },
  methods: {
    ...mapMutations(['UPDATE_DIALOG', 'UPDATE_LOAN']),
    upmenu_amount() {
      this.data = this.data3;
      this.menu_name = AMOUNT_WRAP;
      this.UPDATE_DIALOG({isshow: true});
    },
    upmenu_type() {
      this.data = this.data1
      this.menu_name = TYPE_WRAP;
      this.UPDATE_DIALOG({isshow: true})
    },
    upmenu_rate() {
      this.data = this.data2
      this.menu_name = RATE_WRAP;
      this.UPDATE_DIALOG({isshow: true})
    },
    categray(item, index) {
      if(this.menu_name === 0) {
        this.loan_amount = this.data[index]
        this.loan_amount_key = this.data3_key[index]
      }else if(this.menu_name === 1) {
        this.loan_type = this.data[index]
        this.loan_type_key = this.data1_key[index]
      }else if(this.menu_name === 2) {
        this.loan_rate = this.data[index]
        this.loan_rate_key = this.data2_key[index]
      }
      this.UPDATE_DIALOG({isshow: false})
      this.UPDATE_LOAN({
        loan:{
          amount: this.loan_amount_key,
          type: this.loan_type_key,
          rate: this.loan_rate_key
        }
      })
    }
  }


}
</script>
<style lang="less" scoped>
.cate {
  position: relative;
  z-index: 98;
  // overflow: auto;
}
.filter {
  display: flex;
  height: 40px;
  text-align: center;
  padding: 0;
  .select{
    flex: 1;
    position: relative;
    font-size: 13px;
  }
}

.menu_wrap{
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  margin: auto;
  background: #FFFFFF;
  // display: flex;
  width: 96%;
  padding: 10px 2%;
  z-index: 98;
  .item{
    flex: 1;
    flex-wrap: wrap;
    height: 50px;
    line-height: 50px;
    padding: 0px 12px;
    width: auto;
    border-bottom: 1px solid #F7F8F9;
  }
}

.dialog{
  position: fixed;
  top: 40px;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 97;
}

</style>

