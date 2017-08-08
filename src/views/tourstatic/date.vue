<template>
    <div class="page choose date">
        <view-box v-if="!showPagedate">
            <headerbar class="shade" slot="header">
                <span slot="left" class="icons icon-arrow" @click="back"></span>
                <div class="departciry">
                    <span class="citys" @click="">可选预订日期</span>
                </div>
            </headerbar>
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
                <div class="amount" v-if="isShowConfirm">
                    <div class="tip">
                        <i class="icon-tip"></i>
                        <p>即时确认：带有即时确认<b class="yellowcircle"></b>图标的日期，您预订后可直接在线支付，无需等待确认。</p>
                    </div>
                    <div class="instantconfirm">
                        <switch title="仅展示即时确认日期" :value.sync="switchvalue"></switch>
                    </div>
                </div>
            </div>
            <tabbar class="ay-demo-tabbar" :style="{opacity:shownext}" icon-class="ay-center" slot="bottom" @click="booking" name="tnextbook">
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
    .page-inner-date {
        //padding-top: 44px;

        .shade {
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 10;
            border-bottom: 1px solid #DFDFDF;
            &:after {
                .setBottomLine(#DFDFDF);
            }

        }

        .calendar{
            background: white;
            width: 100%;
            overflow: hidden;
        }

        .amount{
            width: 100%;
            margin-bottom: 10px;
            .tip{
                height:60px;
                padding:0 20px;
                position: relative;
                p{
                    font-size: 14px;
                    color: #666666;
                    line-height: 20px;
                    padding-left: 18px;
                    margin-top: 10px;
                    display: inline-block;
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
                            border:0;
                            background: #F8F8F8;
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

    .choose.date{
        .ay_tab_bd{
            padding-bottom: 88px;
        }

        .ay_tabbar:before{
            display: none;
        }
    }

</style>
<script>
let monthTimeInfo = {}
let _today = new Date()
let _nowMonth = _today.getMonth()+1>13?_today.getMonth()+1:1
import { go } from '../../libs/router'
import BookingCalendar from '../../components/booking-calendar'
import format from '../../components/datetime/format'
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
         //数据
        mainData:{},
        dateData:[],
        saleData:{},
        pleasedData:{},
        calendarData:[],
        flightData:[],
        hotelData:[],
        selectedData:{},
        depDate:"",

        switchvalue:false,

        //日历
        show: true,
        value: '',
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
        isShowConfirm:false,

        gobookinglink:'',
        showPagedate:false,
        shownext:true,
        adultNumber:0,
        childNumber:0,
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
          return _tempcell?'<span timestr="'+_tempcell['info']['DepartDate']+'" id="info_'+_tempcell.daystr+'" class="'+_tempcell.weekclass+'">'+_tempcell.daystr+'</span><b class="price">￥'+_tempcell['info']['ShowPrice'] +'</b><b class="air">库存'+_tempcell['info']['ShowStock'] +'</b><i class="yellowcircle"></i>':""
        }
      },
    methods: {
      takeData:function(){
           var vm = this
            var useCache = false
            var useProxy = true
            var pgParam = {
                "ProductID":p_selected_data.pid,
            }
            if(p_selected_data.confirmType==2)
            {
              vm.isShowConfirm=true
            }
            api.post({
                path: api.config.microServiceHost.packageurl,
                controller: 'package',
                action: 'Select_PackageProductPrice_Calendar_ByProductID',
                param: JSON.stringify(pgParam),
                useCache: useCache,
                useProxy: useProxy,
                callback: function(obj) {
                    if (obj.ReturnCode == 0) {
                    var data=obj.Data
                     //初始化即时信息
                    let tempdata = data
                    for(let z in tempdata){
                      let _forthisMonth = []
                      if(parseInt(tempdata[z].CurrentYear)>=_today.getFullYear()){//年份在今年以及以后
                          for(let pp=0,qq=tempdata[z].dayPriceList.length;pp<qq;pp++){
                               if(!tempdata[z].dayPriceList[pp].ShowStock>0 && tempdata[z].dayPriceList[pp].FreeTourType==2){
                                    tempdata[z].dayPriceList[pp].disable = true
                              }else{
                                if(tempdata[z].dayPriceList[pp].FreeTourType==2){
                                  let _date = new Date(tempdata[z].dayPriceList[pp].DepartDate)
                                        _forthisMonth.push({daystr:_date.getDate(),info:tempdata[z].dayPriceList[pp],weekclass:(_date.getDay()==0||_date.getDay()==6)?'weekendspan':''})

                                }
                              }
                          }
                      }
                      monthTimeInfo[tempdata[z].CurrentMonth] = _forthisMonth
                    }
                    vm.calendarData=tempdata
                    vm.$refs.booking.render(null,null,null,vm.calendarData)
                    if(p_selected_data.depDate){
                      vm.$refs.booking.gotoValue(p_selected_data.depDate)
                    }
                     vm.timeinfolist = monthTimeInfo[vm.$refs.booking.month+1]
                     
                     vm.$nextTick(function(){
                     if(p_selected_data.depDate!=""&&p_selected_data.depDate!=undefined){
                        $('#info_'+(new Date(p_selected_data.depDate)).getDate()).parent().addClass('current')
                          }
                     });

                     commit('UPDATE_LOADING',false)/*0228 F*/
                    }
                }
            });

      },
      // back:function(){
      //   window.history.back()
      // },
      booking:function(){
      // var qr=this.$route.query
        if(this.$refs.booking.value && this.$refs.booking.value.length>0){
            var bookurl="http://mbook.aoyou.com/S/Create/Index.html?pid="+p_selected_data.pid+"&pt="+p_selected_data.pt+"&i="+p_selected_data.i+"&dt="+this.$refs.booking.value
            //api.pageGoTo(bookurl,"")
               if (api.IsIOSClient()) {
                  window.location.href=bookurl
                }
             else if (window.action != null && window.action != undefined)
              {  
                 window.location.href=bookurl
              }
              else
              {
                 window.location.replace(bookurl)
              }
            //window.location.href=bookurl
            // this.gobookinglink = 'choose'
        }else{
            this.$refs.booking.alertShow = true
            this.$refs.booking.alertable =true
            var temp = this
            setTimeout(function(){
                temp.$refs.booking.alertShow = false
                temp.$refs.booking.alertable =false
            },1000)
        }
      },
      cellfunc:function(a){
        $('.othertabletd').removeClass('current')
        $('#info_'+a.day).parent().addClass('current')
      },
      othertableClickFunc:function(e){
        $('.othertabletd').removeClass('current')
        $(e.currentTarget).addClass('current')
        let _str = $('span',e.currentTarget).attr('timestr')
        _str = format(new Date(_str),'YYYY-MM-DD')
        this.$refs.booking.value= _str
      },
      beforMonthChange:function(m,monthidx){
       this.timeinfolist = monthTimeInfo[m+1]
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
          if(_cell['info']['FreeTourType']==2){
            return '<b class="price">￥'+_cell['info']['ShowPrice'] +'</b><i class="yellowcircle"></i>'
          }else{
            return '<b class="price">￥'+_cell['info']['ShowPrice'] +'</b>'
          }
        }
     },
      back:function(){
        api.pageBack()
      }
    },
    created(){
        commit('UPDATE_LOADING',true)/*0228 F*/
        this.takeData()
    },
    ready() {
        // this.takeData()
    },
    route:{
        data:function(transition){
            if(transition.to!=null&&transition.to!=undefined)
            {
                if(p_selected_data.pid>0)
                {
                    this.selectedData=p_selected_data
                    this.takeData()
                }
                else
                {
                    api.pageBack()
                }

            }
        }
    }
  }

function getResult (val) {
          let rs = []
          for (let i = 0; i < 8; i++) {
            rs.push({
              title: `${val} result: ${i + 1} `,
              other: i
            })
          }
          return rs
      }
</script>
