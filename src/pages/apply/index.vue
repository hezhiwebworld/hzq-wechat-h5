<template>
  <div class="container page-myapply">

    <headerTop :isscTop="true">
      <h1 slot="title">我的申请</h1>
      <!-- <ListLoan :isMore="isMore" :bannerList="bannerList"></ListLoan> -->
      <div   slot="content">
        <!-- <div class="hui-wrap"  slot="content"> -->
        <div class="tabs">
            <a :class="{curr : boxName === 'loan'}"  @click="get_loan"><i class="cufont cufont-loan-active"></i> 贷款</a>
            <a  :class="{curr : boxName === 'ccCard'}" @click="get_ccCard"><i class="cufont cufont-creditcard "></i> 信用卡(6)</a>
        </div>
        <div class="hui-content" v-show="boxName === 'loan'">
            <NoData></NoData>
        </div>
        <div class="list-apply list-apply-creditcard"  v-show="boxName === 'ccCard'" v-if="itemList.length != 0">
            <div class="item" v-for="(item, i) in  itemList"  :key="i">
                <div class="thumb"><img :src="item.imgUrl" alt=""></div>
                <h6>{{item.pname}}<small>{{item.desc}}</small></h6>
                <!-- <label class="process process-auditing">审核中</label> -->
            </div>
        </div>
    </div>
    </headerTop>

    
  </div>
</template>

<script>
// 组件引用
import headerTop from '@/components/header'
import NoData from  '@/components/nodata'

const loan = 'CREDIT_PRODUCT';
const ccCard = 'CREDIT_CARD'
export default {
  data () {
    return {
      boxName: 'loan',
      itemList: [],
      applyType : '',
      currentPage: 0,
      pageSize: 20,
    }
  },
  components: {
    headerTop, NoData
  },
  created() {
    this.applyType = loan
    this.getApplyList();
  },
  methods: {
    get_loan() {
      this.boxName = 'loan';
      this.applyType = loan;
      this.getApplyList();
    },
    get_ccCard() {
       this.boxName = 'ccCard';
       this.applyType = ccCard;
       this.getApplyList();
    },
    getApplyList() {
      let userInfo = this.getStorageSync('userInfo');
      let data = {
        userId: userInfo.userId,
        applyType: this.applyType ,
        pageSize: this.pageSize,
        currentPage: this.currentPage,
      }
      this.service.httpRequest({
        data: data,
        methods: 'POST',
        url: '/product/applyList.htm',
        type: 0
      }).then((res)=> {
        let temp = res.data;

        // 
        if(temp.code == '0'){
          this.itemList = temp.data.data;
          console.log(this.itemList)
          this.currentPage = temp.currentPage;
          this.pageSize = temp.pageSize
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
.tabs {
  margin-top: 44px;
}
</style>
