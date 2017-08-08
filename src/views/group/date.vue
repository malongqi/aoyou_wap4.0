<template>
  <div class="page choose date">
    <headerbar class="shade" >
      <span slot="left" class="icons icon-arrow" @click="backindex"></span>
      <div class="departciry">
        <span class="citys" @click="">可选预订日期</span>
      </div>
    </headerbar>
    <view-box v-if="!showPagedate">
      <div class="page-inner-date">
        <div class="header-cover" :style="{opacity:isOpacity}"></div>
        <div class="calendar">
          <booking-calendar
            class="inline-calendar-demo"
            :calendar-data="calendarData"
            :show.sync="show"
            :range="range"
            :show-last-month="showLastMonth"
            :show-next-month="showNextMonth"
            :highlight-weekend="highlightWeekend"
            :return-six-rows="return6Rows"
            :hide-header="hideHeader"
            :hide-week-list="hideWeekList"
            :replace-text-list="replaceTextList"
            :custom-slot-fn="buildSlotFn"
            :disable-past="disablePast"
            :disable-future="disableFuture"
            :alert-text="alertText"
            :alertable="alertable"
            :days-info-key="daysInfoKey"
            :before-month-change="beforMonthChange"
            :customslotfunc="customslotfunc"
            :after-cell-clickfunc="cellfunc"
            v-ref:booking>
            </booking-calendar>
          <div class="booking-calendar" v-show="switchvalue">
            <table>
              <tbody>
                <tr v-for="xx in timerowlength">
                  <td v-on:click="othertableClickFunc($event)" class="othertabletd" v-for="nn in 7" v-html="nn | maketd xx" ></td>
                </tr>
                </tbody>
            </table>
          </div>
        </div>
        <div class="amount" v-show="isshowswitch">
          <div class="tip">
            <i class="icon-tip"></i>
            <p>即时确认：带有即时确认<b class="yellowcircle"></b>图标的日期，您预订后可直接在线支付，无需等待确认。</p>
          </div>
          <div class="instantconfirm">
            <switch title="仅展示即时确认日期" :value.sync="switchvalue"></switch>
          </div>
        </div>
        <div class="routechoose">
          <ul>
            <li v-for="item in journeyArray" @click="chooseJourney(item,$index)" :class="{immediately:item.FreeTourType==2}">
              <P>行程{{item.JourneyCode}}<em>即时确认</em></P>
              <span>{{item.JourneyDesc}}</span>
              <div class="price">&yen;{{item.ShowPrice}}</div>
              <i :class="{active:item.JourneyId==this.JourneyId && item.GroupID==this.GroupId}" v-if="item.GroupStock>0 || item.FreeTourType==1"></i>
              <i class="sellout" v-if="item.GroupStock<=0 && item.FreeTourType==2">售罄</i>
            </li>
          </ul>
        </div>
      </div>
      <tabbar class="ay-demo-tabbar" :style="{opacity:shownext}" icon-class="ay-center" slot="bottom" v-link="gobookinglink" @click="booking"
        name="gnextbook">
            <div class="next clearfix">
                <p>下一步<span>填写出行人信息</span></p>
                <i class="iconin"></i>
            </div>
        </tabbar>
    </view-box>
  </div>
</template>
<style lang="less">
  @import '../../styles/ayui/base/mixin/setOnepx.less';
    .choose.date{
        .ay-header-bar{
            position: absolute;
        }
    }

    .page-inner-date {
      padding-top: 44px; //头
      .calendar{
          background: white;
          width: 100%;
          overflow: hidden;
      }
      .routechoose{
        margin:10px 0;
        background: white;
        ul{
          margin: 0 20px;
          color: #333333;
          li{
            position: relative;
            height:60px;
            p{
              font-size: 17px;
              height:60px;
              line-height: 60px;
              display: inline-block;
              vertical-align: middle;
              em{
                display: none;
              }
            }
            span{
              font-size: 12px;
              margin-left: 10px;
            }
            .price{
              font-size: 17px;
              color: #FF5523;
              letter-spacing: 0.72px;
              height:60px;
              line-height: 60px;
              position: absolute;
              top:0;
              right: 36px;
            }
            i{
              height:16px;
              width: 16px;
              display: block;
              position: absolute;
              top:23px;
              right:0;
              background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAAXNSR0IArs4c6QAAAwpJREFUWAnNmGFqGkEUx2dWiaKIIVQQRSp4gtJDtA29QHqNlnwpzYeGfintNZILFNMeouQEgZSgBFIkEgwaErf/32THrqYmNnW3eTA6u755//+892bmjdb8hRwfHxeHw+EzDVlXa4VhWLPW1jChflf9rroHau18Pv+tWq0O+G0RsYsoHR4ePpHeO7UXAswvMkakhtLbU9tuNpv7d425lUi32318cXHxQUZeiYBs2zCXy9lCoWBWVlZMNps1mUzGYVxdXZnLy0sjfXN+fm5Go5GGXI+Rwo7039ZqtR/zCM0lIi8w+10NLAdBEJZKJVsul43682xNvR+Px6bf75uzs7NQfXD6msiGvIOXbsgfiYjEa2l+FJGgWCyatbW1ycxvWLjjBZ7q9XpmMBgYERlLfVNkPs8Ou0EEEiLwiTCsrq46L8wOus8z3jk9PZVpF643s2SmiBAOgXxRs5VKxeXCfUDnjSF3Tk5OQv1OexkP0yTgJKbY7qoFeIKEXLZgE9tggAWmx5gQiVZHmZwgKZMSbIMhKUeYDsqFRiFhn/iuvDD1et36Jek0EvgggTudjpxChMxThWjfe2RLLy1LNGkSIIMBFph6ZKM0Ntq2f6qfazQadtF9gsH/IuwzR0dHuGSk4+BRwNkhZnl2zLRIMAGwwAQbDoSGA8wksUqwe5vEMNch0kKZsyNtiWG2WM/uGOcAS1s8JhwCLVlHJI3VMjtRjwkHv3xndVJ/JjRUVYZNJm3xmHAgNI4IRU3a4jHhQGioMV1llTYRqrlIDiDS5oEjOm2JYbYDqm25ZkiNybabloAFJthwCKKS/6sSxlJFpSVggSm8PTj45ftezEIKXZ/JSRICAywwhbMNliNCPaD+DtU2hW7SAgZYYEbY10QA5t6hrz7VdpIhwjYYYEWY9H8T4fIjV22ojam2YxntFJfxgU1sgwFW/MLlc8ThyE1cfjZJIqrtZXoGW9iMEpS7zdRFy9Wss7N9EBcsT4o7jtj/3yunJ/MgLuGeDN/RdWNL3efyUvp/S8TJ0E/yj5pfehrdBCBjUlsAAAAASUVORK5CYII=") no-repeat;
              background-size:cover;
            }
            i.active{
              background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAA5tJREFUWAnFV1uITWEU/ta/57g3Mi4JD66JNAlTEnJ5cWmUotySPCDhQZISBgmJlDy4ldvUlJBbXjCeNKU8mCgZ86ShQTK5z5x/Weufs09nz76c4ziTXef8e6/1rfWt/a//X//ahAIvrlneA28+zrXWLmHQRGIeBpD89OIWJmoh8EtjzG2MGVRPNdd+d+qS/ylZLa7XzRlqf9NekF3NjPJ8eNUToQ1sak0PPkAXH79PsokNgLcu7Gk//dwN4u3M3DfJSZyOiL6B6YQZ2OsQnbr/KwoXGYC+dbodN8E8Pcror2VEDV4KS6NmIxQAr51fadPpe/LWI/6aKMFAZuOtQdkiqn3QmAsLBODy3Y6npSb3CV0QKVTlzoTxlZpznfbuIlce9e04hMvnzQbgFlypcu57jxqFw3FldC4AnXpd7VH4YmW0YiPMyTqgfEDYhe4s5ZTLBaD7XKanqK0W9i51YPo8mOqVQP8IcjFQLldb5J60wtnXrR8KLTJRhAHZkGEwh86B+vSFvXAc/OhOQO0/aLEy44YMNlpeS0bulcFs29dJ3lAfS65BOE7hNlrb/aj+daRVm0CjxoNbW8Dnj+V1p9xGD5a8yEIAU2bALFgG7uiAPbUf+PE9r5Vym85TLS82GVAxGGbjLofhujNA86tkfEar3LIL/CO1IJswiAzMlj2gfuXgZ0/A96+FMbES0gASruEjgRGjEgAS/vL1oPGV4E+tsGeOJGJDSpkCCYBbQoqMwOw65rYUps2MhkyaCqpeBbZp2NMHga9t0bg4KeOd0U4mVl9/F1QmW2trDUJBSIUzm6VdMAZ8/RLwKnDIxbkMyJXbaBsVkOY88I1LsLdrw0FIFXHk/SvAL56Bb13JsSr8Vrm9/ZNHp6U0rok1EwKkUjATJoOqZoPfNoOmzYKZVw3+8hn28A7g549Y8ySF55k9BZdiWrFB6rvku6NdThDdPAb26E6g8WkSR6wuW4pd9yoNZCwyo+C6s7C3rko6UsLtgSU1xZI7l8Kp3K4jynRCTQWdiGOlcHpeUYvOf0ltVk0KY7UzcnXAtUjSvfqAxLFJ1mwRKz7gU7j8tixbiLR1loa+IQDsjgfhcFwZ3y4FPs9/bUo1CJcTz1us3asfVKnGbFve5UspmwKfiC4/fC4LpKqk6dBp13a8yzeBcoYCUKHOhFfRe47Uu4O6YlVWzKW26sP56vLmvr/AGvCFuaNbF//j4zQ3CL3vrs/zPwyViQDyyheMAAAAAElFTkSuQmCC") no-repeat;
              background-size:cover;
            }
            i.sellout{
              background: none;
              height:60px;
              line-height: 60px;
              width: 30px;
              text-align: right;
              font-size: 12px;
              color: #999999;
              letter-spacing: 0.51px;
              top:0;
              font-style: normal;
            }
            &:after{
              .setBottomLine(#DFDFDF)
            }
          }
          li.immediately{
            p{
              margin-top: 14px;
              height: 46px;
              line-height: 1;
              em{
                display: block;
                font-size: 10px;
                margin-top: 5px;
                color: #FF5523;
              }
            }
          }
          li:last-child{
            &:after{
              display: none;
            }
          }
        }
      }
      .amount{
          width: 100%;
          .tip{
              height:60px;
              padding:0 15px;
              position: relative;
              p{
                  font-size: 14px;
                  color: #666666;
                  line-height: 20px;
                  padding-left: 18px;
                  margin-top: 10px;
                  display: inline-block;
                  width: 98%;
                  b.yellowcircle{
                      position: relative;
                      top: -2px;
                      left: 0;
                      margin: 0 2px;
                  }
              }
              i{
                  position: absolute;
                  margin-top: 11px;
              }
          }
          .instantconfirm{
              height: 60px;
              padding:0 20px;
              background: white;
              .ay_cell{
                  padding:0;
                  height: 60px;
                  label{
                      font-size:17px;
                  }
                  .ay_cell_ft{
                      margin-right: 0;
                      input.ay_switch{
                          height: 20px;
                          width: 60px;
                          position: absolute;
                          top: 15px;
                          right: 0px;
                          background: #F8F8F8;
                          border: 0;
                          &:before,&:after{
                              width: 25px;
                              height: 25px;
                              background: #F8F8F8;
                              box-shadow: 0px 2px 4px 0px rgba(51,51,51,0.20);
                              top: -4px;
                          }
                          &:checked{
                              background: #FFD6CA;
                              border:0;
                          }
                          &:checked:after{
                              background: #FF5523;
                              transform: translateX(35px);
                          }

                      }
                  }
              }
          }
      }

    }


    .yellowcircle{
        width: 6px;
        height: 6px;
        display: inline-block;
        position: absolute;
        top: 5px;
        left: 5px;
        background-repeat: no-repeat;
        background-size: cover;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAALRJREFUKBWVUsENwjAM9PlZWIAZ2AKxQXnyCzAUIj+e7QaoWzADCwBPzDlqEVIbFPyI4/PFTnyB9GZmkHa2YxjEZJlgyJU+Sv04ATDH4Iu11UJeOHO38nhs6ERti/p501T5J9mPsxA5zoU11Z5XOI6rTiCQgxIOE6kcFPTzwBzlG+cwvMNfppyTj67MyPUOsYydWBFprM38ktdgKEctNve1JgUpCjXshtTY98JRhaS0E0q/xht7OEEsXz1YUQAAAABJRU5ErkJggg==");
    }

  .booking-calendar td i{
    font-style: normal;
  }

</style>
<script>
let monthTimeInfo = {}
let _today = new Date()
let _nowMonth = _today.getMonth()+1>13?_today.getMonth()+1:1
import { go } from '../../libs/router'
import format from '../../components/datetime/format'
import BookingCalendar from '../../components/booking-calendar'
import {ViewBox,Headerbar,Tab, TabItem, Group,XNumber, Tabbar, TabbarItem,XButton, Cell, Divider,Switch} from '../../components'
import store from '../../vuex/store'/*0228 F*/
const commit = store.commit || store.dispatch /*0228 F*/
export default {
    components: {
      // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
      // 否则挂载点和组件名字一致, 即vhead
      ViewBox,
      Headerbar,
      Tab,
      TabItem,
      Group,
      XNumber,
      BookingCalendar,
      Tabbar,
      TabbarItem,
      XButton,
      Cell,
      Divider,
      Switch
    },
    data (){
      return {
        pid:0,
        depDate:'',
        selectedDate:'',
        selectedData:{},

         //数据
        mainData:{},
        dateData:[],
        saleData:{},
        pleasedData:{},
        calendarData:[],
        flightData:[],
        hotelData:[],

        switchvalue:false,
        //日历
        show: true,
        listValue: '',
        range: false,
        showLastMonth: false,
        showNextMonth: false,
        highlightWeekend: false,
        return6Rows: true,
        hideHeader: false,
        hideWeekList: false,
        replaceTextList: {},
        replace: true,
        changeWeeksList: false,
        buildSlotFn: () => '',
        disablePast: true,
        disableFuture: false,
        alertText:"请选择出发日期",
        alertable:false,
        daysInfoKey:"dayPriceList",

        timeinfolist:[],
        gobookinglink:'',

        showPagedate:false,
        shownext:true,
        adultNumber:0,
        childNumber:0,
        isshowswitch:true,

        journeyArray:[],
        JourneyId:0,
        GroupId:0
      }
    },
    watch:{
　　　　　switchvalue(curVal,oldVal){
　　　　　　　this.$refs.booking.tbodyshow = !this.$refs.booking.tbodyshow
　　　　　}
　　　},
      computed: {
        timerowlength: function () {
          if(!this.timeinfolist || this.timeinfolist.length<=0){
            return 0
          }else{
            return Math.ceil(this.timeinfolist.length/7)
          }
        }
      },
      filters:{
        maketd:function(colnum,rownum){
          let _tempcell =  this.timeinfolist[rownum*7+colnum]
            if(_tempcell){
                let _innerPriceList = _tempcell['info']['MultiGroupPriceView']
                if(_innerPriceList && _innerPriceList.length>0){
                    for(let pp =0,qq = _innerPriceList.length;pp<qq;pp++){
                        if(_innerPriceList[pp].ShowPrice != _tempcell['info']['ShowPrice']){
                            //_tempcell['price_after_text'] = '起'
                            break;
                        }
                    }
                }
            }
          return _tempcell?'<span timestr="'+_tempcell['info']['DepartDate']+'" id="info_'+_tempcell.daystr+'" class="'+_tempcell.weekclass+'">'+_tempcell.daystr+'</span><b class="price">&yen;'+_tempcell['info']['ShowPrice'] + '<i>'+(_tempcell['price_after_text']?_tempcell['price_after_text']:'')+'<i/>' +'</b><b class="air">库存'+_tempcell['info']['TotalStock'] +'</b><i class="yellowcircle"></i>':""
        }
      },
    methods: {
      takeData:function(){
          //价格日历信息列表
          var tempthis = this
          if(g_selected_data.pid==0){
            window.history.back()
          }
          var productParam={"ProductID":g_selected_data.pid}
          api.post({
                path: api.config.microServiceHost.groupurl,
                controller: 'ProductForWap',
                action: 'Select_GroupProductPriceCalendar_ByProductID',
                param: JSON.stringify(productParam),
                useCache: false,
                useProxy: true,
                callback: function(obj) {
                    if(obj.ReturnCode==0){
                          var data = obj.Data
                            //初始化即时信息
                            let tempdata = data.GroupPriceCalendarList
                            for(let z in tempdata){
                              let _forthisMonth = []
                              if(parseInt(tempdata[z].CurrentYear)>=_today.getFullYear()){//年份在今年以及以后
                                  for(let pp=0,qq=tempdata[z].dayPriceList.length;pp<qq;pp++){
                                  if(!tempdata[z].dayPriceList[pp].TotalStock>0 && tempdata[z].dayPriceList[pp].FreeTourType==2){
                                        tempdata[z].dayPriceList[pp].disable = true
                                  }else{
                                        if(tempdata[z].dayPriceList[pp].FreeTourType==2){
                                          let _date = new Date(tempdata[z].dayPriceList[pp].DepartDate)
                                          let _forthisDate = _date.getDate()//该日期的号
                                          if(_date.getFullYear()==_today.getFullYear() && _date.getMonth()==_nowMonth){

                                            if(_forthisDate>=_today.getDate()){
                                              if(g_selected_data.depDate!=""&&g_selected_data.depDate!=undefined && changeDate(g_selected_data.depDate)==tempdata[z].dayPriceList[pp].DepartDate.substr(0,10)){
                                                tempthis.journeyArray = tempdata[z].dayPriceList[pp].MultiGroupPriceView
                                              }
                                                _forthisMonth.push({daystr:_forthisDate,info:tempdata[z].dayPriceList[pp],weekclass:(_forthisDate==0||_forthisDate==6)?'weekendspan':''})
                                            }
                                          }else{
                                            if(g_selected_data.depDate!=""&&g_selected_data.depDate!=undefined && changeDate(g_selected_data.depDate)==tempdata[z].dayPriceList[pp].DepartDate.substr(0,10)){
                                              tempthis.journeyArray = tempdata[z].dayPriceList[pp].MultiGroupPriceView
                                            }
                                                _forthisMonth.push({daystr:_forthisDate,info:tempdata[z].dayPriceList[pp],weekclass:(_forthisDate==0||_forthisDate==6)?'weekendspan':''})
                                          }
                                        }
                                     }
                                  }
                              }
                              monthTimeInfo[tempdata[z].CurrentMonth] = _forthisMonth
                            }

                              tempthis.calendarData = tempdata
                              tempthis.$refs.booking.render(null,null,null,tempthis.calendarData)
                              if(g_selected_data.depDate!=""&&g_selected_data.depDate!=undefined){
                                tempthis.$refs.booking.gotoValue(changeDate(g_selected_data.depDate),tempthis.shitfunc)
                              }
                             tempthis.timeinfolist = monthTimeInfo[tempthis.$refs.booking.month+1]
                             tempthis.$nextTick(function(){
                                 if(g_selected_data.depDate!=""&&g_selected_data.depDate!=undefined){
                                    let _otherselectedStr = changeDate(g_selected_data.depDate)
                                    $('#info_'+(new Date(_otherselectedStr)).getDate()).parent().addClass('current')
                                  }
                             });
                             if(!tempthis.timeinfolist || tempthis.timeinfolist.length == undefined || tempthis.timeinfolist.length<=0){
                                tempthis.isshowswitch = false
                             }else{
                                tempthis.isshowswitch = true
                             }

                        commit('UPDATE_LOADING',false)/*0228 F*/

                    }
                }
          })

      },
      backindex:function(){
        api.pageBack()
      },
      booking:function(){
        var bookingvalue = this.$refs.booking.value//2017-02-19
        var _this = this
        if(this.$refs.booking.value.length>0 && this.JourneyId!=0){
            var bookurl="http://mbook.aoyou.com/S/Create/IndexGroup.html?pid="+g_selected_data.pid+"&i="+g_selected_data.an+"&pt=1&gid="+this.GroupId + "&journeyid="+this.JourneyId

              if (api.IsIOSClient()) {
                  window.location.href=bookurl
                }
             else if (window.action != null && window.action != undefined)
              {  
                 window.location.href=bookurl
              }
              else
              {
                 //window.location.replace(bookurl)
                window.location.href=bookurl
              }

        }else if(this.$refs.booking.value.length<=0){
          this.alertText = '请选择出发日期'
          this.alertable =true
          setTimeout(()=>{
            _this.alertable =false
          },1000)
        }
        else{
          //todo
          this.alertText = '请选择行程'
          this.alertable =true
          setTimeout(()=>{
            _this.alertable =false
          },1000)
        }

      },
      route:{
            data:function(transition){
                if(transition.to!=null&&transition.to!=undefined)
                {
                    if(g_selected_data.pid>0)
                    {
                        this.selectedData=g_selected_data
                        this.takeData()
                    }
                    else
                    {
                        api.pageBack()
                    }

                }
            }
        },
      cellfunc:function(a){
        $('.othertabletd').removeClass('current')
        $('#info_'+a.day).parent().addClass('current')
        this.journeyArray = a.info.MultiGroupPriceView /*5.9 add for 参团多行程*/
        this.setJourneyID()
      },
      shitfunc:function(str){
        let _gtday = new Date(str)
        str = str.substr(5)
        let a= null
        for(let ii=0;ii<this.calendarData.length;ii++){
          if(this.calendarData[ii].CurrentMonth == _gtday.getMonth()+1){
            for(let jj=0;jj<this.calendarData[ii].dayPriceList.length;jj++){
                if(this.calendarData[ii].dayPriceList[jj].DepartDate){
                    if(this.calendarData[ii].dayPriceList[jj].DepartDate.substr(5,5) == str){
                        a = this.calendarData[ii].dayPriceList[jj]
                        break
                    }
                }
            }
          }
        }
        $('.othertabletd').removeClass('current')
        $('#info_'+_gtday.getDate()).parent().addClass('current')
        this.journeyArray = a?a.MultiGroupPriceView:[] /*5.9 add for 参团多行程*/
        this.setJourneyID()
      },
      /*5.9 add for 参团多行程*/
      chooseJourney:function (item) {
        if(item.GroupStock>0 || item.FreeTourType==1){
          this.JourneyId = item.JourneyId
          this.GroupId = item.GroupID
        }
      },
      setJourneyID:function () {
        //选中日期默认选择第一个行程
        for(var i=0,length=this.journeyArray.length;i<length;i++){
          if(this.journeyArray[i].GroupStock>0 || this.journeyArray[i].FreeTourType==1){
            this.JourneyId = this.journeyArray[i].JourneyId
            this.GroupId = this.journeyArray[i].GroupID
            break
          }
        }
      },
      othertableClickFunc:function(e){
        $('.othertabletd').removeClass('current')
        $(e.currentTarget).addClass('current')
        let _str = $('span',e.currentTarget).attr('timestr')
        let _usedate = new Date(_str)
        let _usestr = _str.substr(5,5)
        let a= null
        _str = format(_usedate,'YYYY-MM-DD')
        this.$refs.booking.value= _str
        for(let ii=0;ii<this.calendarData.length;ii++){
          if(this.calendarData[ii].CurrentMonth == _usedate.getMonth()+1){
            for(let jj=0;jj<this.calendarData[ii].dayPriceList.length;jj++){
              if(this.calendarData[ii].dayPriceList[jj].DepartDate){
                if(this.calendarData[ii].dayPriceList[jj].DepartDate.substr(5,5) == _usestr){
                  a = this.calendarData[ii].dayPriceList[jj]
                  break
                }
              }
            }
          }
        }
        this.journeyArray = a?a.MultiGroupPriceView:[] /*5.9 add for 参团多行程*/
       this.setJourneyID()
      },
      beforMonthChange:function(m,monthidx){
        var tempthis = this
        this.timeinfolist = monthTimeInfo[m+1]

        if(!tempthis.timeinfolist || tempthis.timeinfolist.length == undefined || tempthis.timeinfolist.length<=0){
          tempthis.isshowswitch = false
        }else{
          tempthis.isshowswitch = true
        }

        let _valuedate  = new Date(this.$refs.booking.value)
        if(_valuedate && (m == _valuedate.getMonth())){
        this.$nextTick(function(){
            $('#info_'+_valuedate.getDate()).parent().addClass('current')
         });
        }else{
            $('.othertabletd.current').removeClass('current')
        }
        return
       },
     customslotfunc:function(k1,k2,_cell){
        if(_cell.disabled){
          return ''
        }else{
            let _innerPriceList = _cell['info']['MultiGroupPriceView']
            if(_innerPriceList && _innerPriceList.length>0){
                for(let pp =0,qq = _innerPriceList.length;pp<qq;pp++){
                    if(_innerPriceList[pp].ShowPrice != _cell['info']['ShowPrice']){
                        //_cell['price_after_text'] = '起'
                        break;
                    }
                }
            }
          if(_cell['info']['FreeTourType']==2){
            return '<b class="price">&yen;'+_cell['info']['ShowPrice'] +'<i>'+(_cell['price_after_text']?_cell['price_after_text']:'')+'</i></b><i class="yellowcircle"></i>'
          }else{
            return '<b class="price">&yen;'+_cell['info']['ShowPrice'] +'<i>'+(_cell['price_after_text']?_cell['price_after_text']:'')+'</i></b>'
          }

        }
     },

    },
    created(){
        commit('UPDATE_LOADING',true)/*0228 F*/
        if(g_selected_data.pid>0)
        {
            this.takeData()
        }
        else
        {
            api.pageBack()
        }
    },
    ready() {



    }

  }

  function changeDate(val){
        //02/19
        var date = new Date()
        var month = parseInt(val.substr(0,2))
        val = val.replace('/','-')
        if(date.getMonth()>month){
            val = parseInt(date.getFullYear())+1 +'-'+val
        }else{
            val = date.getFullYear() +'-'+val
        }
        return val
  }

</script>

