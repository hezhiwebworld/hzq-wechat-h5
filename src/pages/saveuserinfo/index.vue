<template>
  <div class="container page-perfectinfo">
    <header class="hui-header hui-header-light">
        <div id="hui-back" @touchstart="go_back"></div>
        <h1>完善信息</h1>
        <div class="hui-header-icon"></div>
    </header>
    <div class="hui-wrap">
        <form class="hui-form" id="form">
            <div class="hui-form-items">
                <div class="hui-form-items-title">手机号</div>
                <input type="text" class="hui-input" checkType="phone" v-model.trim="phone" placeholder="输入手机号" checkMsg="手机号格式有误">
                <a href="javascript:void(0)" class="cufont cufont-delete"></a>
            </div>
            <div class="hui-form-items">
                <div class="hui-form-items-title">姓名</div>
                <input type="text" class="hui-input" checkType="string"  v-model.trim="trueName" placeholder="请输入您的姓名" checkData="1," checkMsg="姓名不能为空">
                <a href="javascript:void(0)" class="cufont cufont-delete"></a>
            </div>
            <div class="hui-form-items">
                <div class="hui-form-items-title">身份证号</div>
                <input type="text" class="hui-input hui-input-clear" v-model.trim="cardNo" placeholder="请输入身份证号" checkType="reg" checkData="^\d{15,18}$"
                    checkMsg="身份证号格式有误" />
            </div>
            <div class="hui-form-items">
                <div class="hui-form-items-title" >所在城市</div>
                <button type="button" class="hui-button hui-button-picker" id="city" @click="showPicker(0)" ref="select0" >{{city}}</button>
            </div>
            <div class="hui-form-items">
                <div class="hui-form-items-title">职业</div>
                <button type="button" class="hui-button hui-button-picker" id="occupation" @click="openPicker(1)">{{job}}</button>
            </div>
        </form>
        <button type="button" class="hui-button hui-button-block hui-button-large hui-primary" id="submit" @click="saveUserInfo">确定</button>
    </div>
    <!-- 日期控件 -->
    <pick @select="handleSelect(0,arguments)" :selected-index="selectedIndex[0]"
      ref="picker0" :cancelTxt="cancelTxt"
      :confirmTxt="confirmTxt"
      @change="changrScroll"
      @valuechange ="hander"
      ></pick>

    <pick @select="handleSelect1(0,arguments)" :selected-index="selectedIndex[0]"
    ref="picker1" :cancelTxt="cancelTxt"
    :confirmTxt="confirmTxt"
    @change="changrScroll1"></pick>
  </div>
</template>

<script>
// 组件引用
import pick from '@/components/pick'
import { randomString } from '@/common/utils'
import signMd from '@/common/signMd';
import {validTel, validCode, validpass} from '@/common/rules'
import  '../../../static/js/app'

export default {
  data () {
    return {
      pickerValue:'',
      selectedIndex: [
        [0],
        [1, 0],
        [0, 1, 2],
        [0, 0, 0]
      ],
      state: 0,
      cancelTxt: '取消',
      confirmTxt: '确定',
      pList: [],
      cList: [],
      aList: [],
      data1: [],
      data2: [],
      data3: [],
      data4: [{
                text:'工程师',
                value: 0
              },
              {
                text:'教室',
                value: 1
              },
              {
                text:'工人',
                value: 2
              },
              {
                text:'农民',
                value: 3
              }, 
            ],
      pindex: 0,
      cindex: 0,
      aindex:0,
      job: '请选择职业',
      city: '请选择城市',
      phone: '17557283492' ,  // 手机号
      trueName: 'hezhi' , // 真实姓名
      cardNo: '429001199212217433' ,  // 身份证
    }
  },
  mounted(){
    this.getInitData()
    
  },
  components: {
    pick
  },
  methods: {
    go_back() {
        window.history.go(-1)
    },
    hander(args,a,c,d) {
      console.log(args,a,c,d)
    },
    changrScroll(col, row) {
      if(col === 0 ) {
        this.getCityData( Object.entries(addRes)[row])
        this.$refs.picker0.setData([this.data1, this.data2, this.data3])
        this.$refs.picker0.setSelectedIndex([row, 0, 0])
        this.reloadView()
        // 记录索引
        this.pindex = row
        this.cindex =0
        this.aindex = 0
      }else if(col === 1) {
        let temp = Object.entries(addRes)[this.pindex][1].child
        this.getAreaData(Object.entries(temp)[row])
        this.$refs.picker0.setData([this.data1, this.data2, this.data3])
        this.$refs.picker0.setSelectedIndex([this.pindex, row, 0])
        this.reloadView()
        this.cindex = row
        this.aindex = 0
      } else if(col === 2) {
        this.$refs.picker0.setSelectedIndex([this.pindex, this.cindex, row])
        this.reloadView()
        this.aindex = row
      }
      console.log(this.pindex, this.cindex, this.aindex)
    },
    changrScroll1(col, row) {
      console.log(col, row)
     
      if(col === 0 ) {
        this.getCityData( Object.entries(addRes)[row])
        this.$refs.picker0.setData([this.data1, this.data2, this.data3])
        this.$refs.picker0.setSelectedIndex([row, 0, 0])
        // 记录索引
        this.pindex = row
        this.cindex =0
        this.aindex = 0
      }else if(col === 1) {
        let temp = Object.entries(addRes)[this.pindex][1].child
        this.getAreaData(Object.entries(temp)[row])
        this.$refs.picker0.setData([this.data1, this.data2, this.data3])
        this.$refs.picker0.setSelectedIndex([this.pindex, row, 0])
        this.cindex = row
        this.aindex = 0
        // getCityData(addRes[row])
      } else if(col === 2) {
        this.$refs.picker0.setSelectedIndex([this.pindex, this.cindex, row])
        this.aindex = row
        // getCityData(addRes[row])
      }
      console.log(this.pindex, this.cindex, this.aindex)
    },
    reloadView() {
      let picker = this.$refs['picker0']
      picker.hide()
      picker.show()
    },
    showPicker (index) {
      this.$refs.picker0.setData([this.data1, this.data2, this.data3])
      if(this.pindex) {
        this.$refs.picker0.setSelectedIndex([this.pindex, this.cindex, this.aindex])
      }else{
        this.$refs.picker0.setSelectedIndex([this.pindex, 0, 0])
      }
      
      console.log(this.data)
      let picker = this.$refs['picker' + index]
      picker.show()
    },
    openPicker(index) {
      this.$refs.picker1.setData([this.data4])
      this.$refs.picker1.setSelectedIndex([0])
      let picker = this.$refs['picker' + index]
      picker.show()
    },
    handleSelect(index, params){
      console.log(index,params)
      this.city = params[2].join(' ')
    },
    handleSelect1(index, params){
      this.job =params[2][0]
    },
    getInitData() {
      this.pList = Object.entries(addRes) 
      let allList = this.pList
      for (let i = 0; i < allList.length ; i++) {
        let item = {
          text: allList[i][1].name ,
          value: allList[i][0],
          item :allList[i]
        }
        this.data1.push(item)
      }

      this.cList =  Object.entries(this.pList[0][1].child)
      allList = this.cList
      for (let i = 0; i < allList.length ; i++) {
        let item = {
          text: allList[i][1].name ,
          value: allList[i][0],
          item:allList[i]
        }
        this.data2.push(item)
      }

      this.aList =  Object.entries(this.cList[0][1].child)
      allList = this.aList
      for (let i = 0; i < allList.length ; i++) {
        let item = {
          text: allList[i][1],
          value: allList[i][0],
          item:allList[i]
        }
        this.data3.push(item)
      }

    },
    getCityData(item) {
      this.cList =  Object.entries(item[1].child)
      let allList = this.cList
      this.data2 = []
      for (let i = 0; i < allList.length ; i++) {
        let item = {
          text: allList[i][1].name ,
          value: allList[i][0],
          item: allList[i]
        }
        this.data2.push(item)
      }

      this.aList =  Object.entries(this.cList[0][1].child)
      console.log(this.aList)
      allList = this.aList
      this.data3 = []
      for (let i = 0; i < allList.length ; i++) {
        let item = {
          text: allList[i][1],
          value: allList[i][0],
          item:allList[i]
        }
        this.data3.push(item)
      }

    },
    getAreaData(item) {
  
       this.aList =  Object.entries(item[1].child)
      
        let allList = this.aList
        this.data3 = []
        for (let i = 0; i < allList.length ; i++) {
          let item = {
            text: allList[i][1],
            value: allList[i][0],
            item:allList[i]
          }
          this.data3.push(item)
        }
    },
    saveUserInfo() {
      let data = {
        tel:  this.phone,
        realName: this.trueName,
        idNo: this.cardNo,
        city: this.city,
        occupation: this.job,
        t: randomString()
      }
      data.sign = signMd(data)
      this.service.httpRequest({
          data: data,
          methods: 'POST',
          url: '/product/userInfo',
       }).then((res)=> {
          if(res.data.code === '0'){
           this.reLaunchPageTo('/pages/commonList/main', {entrance: 4})
          }
       }).catch(()=> {
         // 异常
       })
    },
    validrules(){
      if(!validTel(this.phone)) {
        this.tipsMsg = "请输入正确的手机号"
        this.showtip()
        return false;
      }
      if(!validCode(this.phcode)) {
        this.tipsMsg = "请输入正确的短信验证码"
        this.showtip()   
        return false;    
      }
      if(!validpass(this.password)) {
        this.tipsMsg = "请输入正确格式的密码"
        this.showtip() 
        return false;      
      }
      if(this.password != this.repass) {
        this.tipsMsg = "两次输入密码不一致"
        this.showtip()
        return false;
      }

      return true;
    },
  }
}
</script>

<style lang="less" scoped>
.container {
  background: #efefef;
  height: 100%;
  width: 100%;
}
</style>
