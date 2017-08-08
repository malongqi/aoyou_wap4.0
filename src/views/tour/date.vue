<template>
    <div>
        <div class="page choose fix-date">
            <view-box v-if="!showPagedate">
                <headerbar class="shade" slot="header">
                    <span slot="left" class="icons icon-arrow" @click='back()'></span>
                    <div class="departciry">
                        <span class="citys" @click="">选择日期和人数</span>
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
                                :customslotfunc="customslotfunc"
                                v-ref:booking>
                        </booking-calendar>
                    </div>
                    <div class="amount">
                        <div class="adult">
                            <span>成人</span>
                            <div class="num">
                                <x-number :min="1" :max="9" :value="selectedData.an" :width="30" @on-change="adultNumberOnChange" name="listen"></x-number>
                            </div>
                        </div>
                        <div class="child">
                            <span>儿童</span><b>2-12岁</b>
                            <div class="num">
                                <x-number :min="0" :max="9" :value="selectedData.cn" :width="30" @on-change="childNumberOnChange" name="listen"></x-number>
                            </div>
                        </div>
                        <div class="tip">
                            <i class="icon-tip"></i>
                            <p>不支持儿童单独预订，儿童默认不占床不占票，儿童入住酒店需要遵循酒店入住政策</p>
                        </div>
                    </div>
                </div>
                <tabbar class="ay-demo-tabbar" :style="{opacity:shownext}" icon-class="ay-center" slot="bottom" >
                    <div class="next clearfix" @click="booking" name="dcontinuebook">
                        <p>继续预订</p>
                        <i class="iconin"></i>
                    </div>
                </tabbar>
            </view-box>
        </div>
    </div>
</template>
<style lang="less">
    @import '../../styles/ayui/base/mixin/setOnepx.less';
    .choose .shade {
        position: fixed;
        width: 100%;
        top: 0;
        z-index: 10;
        //border-bottom: 1px solid #DFDFDF;
        &:after {
            .setBottomLine(#DFDFDF);
        }
    }

    .fix-date{
        .ay_tab_bd{
            padding-top: 44px;
        }
    }


    .page-inner-date {
        //padding-top: 44px; //头

        .shade {
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 10;
            //border-bottom: 1px solid #DFDFDF;
            &:after {
                .setBottomLine(#DFDFDF);
            }
        }

        .calendar{
            height:330px;
            background: white;
            width: 100%;
            overflow: hidden;
        }

        .amount{
            padding:0 20px;
            background: white;
            margin-top: 10px;

            .adult,.child{
                height:60px;
                //border-bottom: 1px solid #DFDFDF;
                position: relative;
                &:after {
                    .setBottomLine(#DFDFDF);
                }
                span{
                    font-size: 17px;
                    color: #333333;
                    line-height:60px;
                }
                b{
                    font-size: 12px;
                    color: #333333;
                    font-weight:normal;
                    margin-left: 10px;
                }
                .num{
                    float: right;
                    height:30px;
                    margin: 15px 0;
                    input{
                        border: 0;
                        width: 30px;
                        color: #333;
                        font-size: 17px;
                        padding-left: 10px;
                        text-align: center;
                    }
                }

            }
            .tip{
                height:60px;
                position: relative;

                p{
                    font-size: 14px;
                    color: #666666;
                    line-height: 20px;
                    margin-top: 12px;
                }

                i{
                    float: left;
                }
            }

        }

        .ay-number-selector{
            border:0;
            background: red;
            border-radius: 50%;
            color:white;
            font-size: 24px;
        }
        .ay-number-disabled{
            background: #DFDFDF;
        }
        .ay_cell_ft{
            margin-right: 0;
            font-size: 24px;
            width:100%;
            display: inline-block;
            input{
                padding-left: 5px;
                padding-right: 5px;
            }
        }
        .ay_cell{
            position: relative;
            top: 5px;
            padding:0;
            display: inline-block;
        }
    }

</style>
<script>
import { go } from '../../libs/router'
import BookingCalendar from '../../components/booking-calendar'
  import {ViewBox,Headerbar,Tab, TabItem, Group,XNumber, Tabbar, TabbarItem,XButton, Cell, Divider} from '../../components'

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
      Divider

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

        gobookinglink:'',

        showPagedate:false,
        shownext:true,
        adultNumber:0,
        childNumber:0,
      }
    },
    methods: {
      takeData:function(){
        //     this.$http.get('/static/tour_main.json').then((response) => {
        //   // success callback
        //   //debugger
        //   var data = response.data
        // //   this.calendarData = data.ProductPriceList
        // //      this.$refs.booking.render(null,null,null,this.calendarData)
        // }, (response) => {

        // });
        var vm=this
        var depPriceParam={
            "ProductID":vm.selectedData.pid,
            "DepartDate":vm.selectedData.depDate
        }
        api.post({
            path: api.config.microServiceHost.packageurl,
            controller: 'Combined',
            action: 'Select_CombinedPrice_List_ByProductID',
            param: JSON.stringify(depPriceParam),
            useCache: false,
            useProxy: true,
            callback: function(obj) {
                if (obj.ReturnCode == 0) {
                    var data=obj.Data
                    vm.calendarData=data
                    vm.$refs.booking.render(null,null,null,vm.calendarData)
                    if(depPriceParam.DepartDate!='')
                    {
                        vm.$refs.booking.gotoValue(depPriceParam.DepartDate)
                    }
                    console.log({"title":"depPrice","data":obj})

                    commit('UPDATE_LOADING',false)/*0228 F*/
                }
            }
        })
      },
      back:function(){
        window.history.back()
      },
      booking:function(){
        g_air_list.splice(0,g_air_list.length)
        g_hotel_list.splice(0,g_hotel_list.length)
        g_selected_data.addProducts.splice(0,g_selected_data.addProducts.length)
        
        
        console.log(g_selected_data)
        if(this.$refs.booking.value.length>0){
            this.selectedData.depDate=this.$refs.booking.value
            g_selected_data=this.selectedData
            this.$router.go('choose')
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
      adultNumberOnChange:function(val){
          this.selectedData.an=val
      },
      childNumberOnChange:function(val){
          this.selectedData.cn=val
      },
      customslotfunc:function(k1,k2,_cell){
            if(_cell.disabled){
            return ''
            }else{
            return '<b class="price">￥'+_cell['info']['ShowPrice'] +'</b>'
            }
        }
    },
    created(){
        commit('UPDATE_LOADING',true)/*0228 F*/
    },
    ready() {

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
