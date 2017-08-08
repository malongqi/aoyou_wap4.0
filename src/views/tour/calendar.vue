<template>
    <div class="page">
        <headerbar class="headbar">
            <span slot="left" class="icons icon-arrow" @click='back()'></span>
            <div class="departciry">
                <span class="citys" @click="">选择日期</span>
            </div>
        </headerbar>
        <view-box class="page-inner-detail">
            <devil-calendar
                    class="inline-calendar-demo"
                    :afterselectedfunc="afterselectedfunc"
                    :showfestval="showfestval"
                    :single-select="singleSelect"
                    :calendar-date-range="calendarDateRange"
                    v-ref:devil>
            </devil-calendar>

        </view-box>
    </div>
</template>
<script>
import { go } from '../../libs/router'
import DevilCalendar from '../../components/devil-calendar'
import {ViewBox,Headerbar, Group, Switch, Radio, XButton, Cell, Divider } from '../../components'

var tempdata = [];


module.exports = {
  data () {
    return {
      tindex:0,
      apid:0,
      curProduct:{},
      singleSelect:true,
      showfestval:true,
      calendarDateRange:[]
    }
  },
  methods:{
    back:function(){
        api.pageBack()
    },
    afterselectedfunc:function(reob){
      console.log(reob)
      if(this.curProduct.selectedDates==undefined)
      {
        this.curProduct.selectedDates=[]
      }
      else
      {
        this.curProduct.selectedDates.splice(0,this.curProduct.selectedDates.length)
      }
      for(var i=0;i<reob.length;i++ )
      {
        this.curProduct.selectedDates.push(reob[i])
      }
      if(this.curProduct.AddProductType==98&&this.curProduct.AddProductSubType==6)
      {
        if(this.curProduct.selectedDates.length==1)
        {
          this.curProduct.selectedDates.splice(0,this.curProduct.selectedDates.length)
          alert('酒店产品至少选择选择两个日期')
          return false
        }
      }
      api.pageBack()
    },
    initData:function(){
      if(g_selected_data.addProducts&&g_selected_data.addProducts[this.tindex])
      {
        var list=g_selected_data.addProducts[this.tindex]
        for(var i=0,len=list.addProductList.length;i<len;i++)
        {
          if(list.addProductList[i].AddProductID==this.apid)
          {
            this.curProduct=list.addProductList[i]
            this.singleSelect=this.curProduct.DateTwoOrOne==1
            this.calendarDateRange.splice(0,this.calendarDateRange.length)
            for(var j=0;j<list.addProductList[i].DatePriceList.length;j++)
            {
              var dateStr=list.addProductList[i].DatePriceList[j].Date
              dateStr=dateStr.split('T')[0]
              this.calendarDateRange.push(dateStr)
            }
            if(this.curProduct.selectedDates&&this.curProduct.selectedDates.length>0)
            {
              let rs = this.$refs.devil.checkDatesByArray(this.curProduct.selectedDates)
            }
            break
          }
        }
      }
      //alert(JSON.stringify(this.curProduct))
    }
  },
  components: {
    DevilCalendar,
    Group,
    Switch,
    Radio,
    XButton,
    Cell,
    Divider,
    ViewBox,
    Headerbar
  },
  ready(){
    
  },
  route:{
      data:function(transition){
          if(transition.to!=null&&transition.to!=undefined)
          {
              if(g_selected_data.pid>0)
              {
                  this.tindex=transition.to.query.tindex
                  this.apid=transition.to.query.apid
                  this.initData()
              }
              else
              {
                  api.pageBack()
              }
          }
      }
    }
}
</script>

<style lang="less">


</style>
