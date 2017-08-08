<template>
    <div class="page-wrap">
        <div class="page choose flight">
            <view-box v-if="!showPageflight">
                <div class="ay-header-flight-box" slot="header">
                    <div class="header-cover" :style="{opacity:isOpacity}"></div>
                    <headerbar>
                        <span slot="left" class="icons icon-arrow" @click='back()'></span>
                        <div class="departciry">
                            <span class="citys" @click="">选择机票</span>
                        </div>
                    </headerbar>
                    <div class="detail clearfix">
                        <div class="left">
                            <p>{{leaveDate}}</p>
                            <p>{{leaveCityName}}-{{arriveCityName}}</p>
                        </div>
                        <div class="right">
                            <p>{{returnDate}}</p>
                            <p>{{arriveCityName}}-{{leaveCityName}}</p>
                        </div>
                    </div>
                </div>
                <div class="page-inner">
                    <section v-for="item in flightData" :class="{'active':selectedData.air.AirPlanID==item.AirPlanID}">
                        <div class="cont" v-for="subItem in item.AirTicketList">
                            <div class="flight" v-for="childitem in subItem.AirProductSegmentList">
                                <div class="other clearfix">
                                    <span class="flightno">D{{childitem.NoOfDay}}</span>
                                    <p>
                                        <span>{{dateAdd(selectedData.depDate,childitem.NoOfDay-1)|dateShort}}</span>
                                        <span class="airline">{{childitem.CountryName}}{{childitem.AirlineName}}{{childitem.FlightNo}}</span>
                                        <span>{{childitem.FlightCabin}}</span>
                                    </p>
                                </div>
                                <div class="time clearfix">
                                    <div class="set-off">
                                        <p>{{childitem.LeaveTime|changeTime}}</p>
                                        <p>{{childitem.LeavePortName}}</p>
                                    </div>
                                    <div class="line"></div>
                                    <div class="set-down">
                                        <p>{{childitem.ArriveTime|changeTime}}</p>
                                        <p>{{childitem.ArrivePortName}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="choose clearfix">
                            <span class="btn" @click="selectFlight(item)">{{selectedData.air.AirPlanID==item.AirPlanID?'已选':'选择'}}</span>
                            <div class="txt">
                                <p>差价 <b>{{getPriceStr(item.AdultPrice,selectedData.air.AdultPrice)}}</b>/人</p>
                                <p>{{item.AirStock>9?'充足':'仅剩'+item.AirStock+'张'}}</p>
                            </div>
                        </div>
                        <i class="activeicon" v-if="selectedData.air.AirPlanID==item.AirPlanID"></i>
                    </section>
                    <div class="title">
                        <p class="line">已显示所有机票</p>
                    </div>
                </div>
            </view-box>
        </div>
    </div>
</template>
<style lang="less">
    .ay-header-flight-box{
        position: fixed;
        width: 100%;
        top: 0;
        z-index: 10;
        .detail{
            background: white;
            height: 30px;
            padding: 15px 20px;
            border-top:1px solid #DFDFDF;
            .left,.right{
                width: 50%;
                //margin-left: 20px;
                float: left;
                display: inline-block;
                p:first-child{
                    font-size: 15px;
                    color: #333333;
                    letter-spacing: 0.63px;
                    line-height: 14px;
                    font-weight:500;
                }
                p:last-child{
                    font-size: 12px;
                    color: #999999;
                    letter-spacing: 0.5px;
                    line-height: 14px;
                    margin-top: 5px;
                }
            }
            .right{
                padding-left: 20px;
                border-left: 1px solid #DFDFDF;
                box-sizing: border-box;
            }
        }
    }

    .flight.choose .ay_tab_bd{
        padding-bottom: 0;
    }

    .page-inner{
        padding-top:105px;

        section{
            margin: 10px;
            border: #fff 1px solid;
            background: #fff;
            position: relative;
            border-radius: 10px;
            box-shadow: rgba(0, 0, 0, 0.15) 0 0 2px;
            i.activeicon{
                display: none;
            }
            .cont{
                padding: 0 10px;
                .flight{
                    padding: 15px 0px;
                    border-bottom: #c0c7ce 1px dashed;
                    position: relative;

                    .other{
                        p{
                            width:90%;
                            margin-left: 28px;
                        }
                        //height:20px;
                        span.flightno{
                            border: 1px solid #FF5523;
                            border-radius: 50px;
                            font-size: 12px;
                            color: #FF5523;
                            padding: 0px 4px;
                            line-height: 1.4;
                        }
                        span{
                            font-size: 12px;
                            color: #666666;
                            padding:0 5px;
                            float: left;
                        }
                        span.airline{
                            border-left:1px solid #DFDFDF;
                            border-right:1px solid #DFDFDF;
                        }
                        span.number{
                            color: #FF3232;
                            float: right;
                            position: absolute;
                            right: 3px;
                        }
                    }
                    .time{
                        margin: 0px 35px 0;
                        .set-off{
                            float: left;
                            width:40%;
                            p:first-child{
                                font-size: 23px;
                                color: #333333;
                                text-align: left;
                            }
                            p:last-child{
                                font-size: 12px;
                                color: #666666;
                                text-align: left;
                            }
                        }
                        .line{
                            float: left;
                            width: 34px;
                            height: 55px;
                            background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAAAOCAYAAAB5EtGGAAAAAXNSR0IArs4c6QAAAUVJREFUSA3t1j1LxEAQBmA3m2ij115ldzaWgpVgcTZCCrGw90gg1VUWFqIWgtjZ5rMLyKUO6SwE/4BwHNeaAxshhQaEmA/fLQauuH8wLiyzS6p5mJmsWGO6PM+7bdv2R9O0R8dxfpcZxPKFyzmKoq2qqj6Q76YQYoYNF+eV8tfowClalvUtpTwFxrzrul1UzAsq54IMWFYKJZ8kyXpRFNe4XwFHoJVuUDF3rFEIB1VyBpQnbKnr+pGkD5xjmqYz0zQbGAzRStvC9/1LCD1wRqHcAaKOXywHLSGsihi+xf9MgUyWZRt5nj+jYw7Uu4U9ShzHvbIsJwA5hs8CKHusUVzXPQRECJAdxE/DMIa2bU91XNitIAj6dV3fI/ERQDBGxBt+xScAeVcYLAdt0zQ95H4OkEo92ICyTyAKhe1C64zDMBysAvgDBi578VjEFQMAAAAASUVORK5CYII=") ;
                            background-repeat: no-repeat;
                            background-position-y: 15px;
                            background-size: contain;
                        }
                        .set-down{
                            float: left;
                            width:40%;
                            p:first-child{
                                font-size: 23px;
                                color: #333333;
                                text-align: right;
                            }
                            p:last-child{
                                font-size: 12px;
                                color: #666666;
                                text-align: right;
                            }
                        }
                    }
                }
                .flight:last-child{
                    border-bottom: none;
                }
            }
            .choose{
                height: 60px;
                border-top: 1px solid #DFDFDF;
                .btn{
                    display: inline-block;
                    background: #FF5523;
                    border-radius: 50px;
                    width: 80px;
                    height: 30px;
                    float: right;
                    font-size: 14px;
                    color: #FFFFFF;
                    text-align: center;
                    line-height: 30px;
                    margin: 15px 10px;
                }
                .txt{
                    float: right;
                    display: inline-block;
                    height: 31px;
                    padding-top: 13px;
                    p{
                        font-size: 12px;
                        color: #999999;
                        letter-spacing: 0.5px;
                        line-height: 1.2;
                        text-align: right;
                        b{
                            font-size:17px;
                            color:#FC5A3F;
                        }
                    }
                }
            }
        }
        section.active{
            background: #FFFEF9;
            border: #4CD964 1px solid;
            position: relative;
            overflow: hidden;
            .choose .btn{
                color:#4CD964;
                background: #FFFFFF;
                border: 1px solid #4CD964;
            }
            i.activeicon{
                position: absolute;
                top: -1px;
                right: -1px;
                height: 15px;
                width: 15px;
                display: inline-block;
                border-bottom-left-radius: 8px;
                border-top-right-radius: 8px;
                background: #4CD964;
                background-size: 60%;
                background-position: center;
                background-repeat: no-repeat;
                background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAOCAYAAADNGCeJAAAAAXNSR0IArs4c6QAAAP9JREFUOBGlks0KAWEUhoWLYIEFpWbHBlkoJQsLW1fiupRLsVCyQLFgQfknjedozvSNGZPh1NP5fc/MfN/EYn+YbdtdmMIA4j+vQtyBG6iVf1qGugln3YIfQfQ3Q1SDA6jJZ6YjvxWiEux0C34OOXcRSQIqkHSLAQF9CzagtiIoeEYpDJ3uGJ/1NJ2Eeh5ErCZLLd8sxYlO4BdQNIfIMzADtS1ByZxxYxpyxRedxK/hNYxPgfmwPXnVFQcFDLTgCGpyyPJDypWrnQgaQXpfjcE6mDelS8Rfoe0ThRUQlMG8MVL7Dt0w3cceQvkFliD2gN7H4W8aLJCD70P4Yb8tewL3G312VnF72wAAAABJRU5ErkJggg==");
            }
        }
        .title{
            height:50px;
            width: 100%;
            p.line{
                margin: 0px 20px;
                padding: 14px 0;
                font-size: 14px;
                color: #999999;
                letter-spacing: 0.59px;
                text-align: center;
                display: table;
                white-space: nowrap;
                &:after{
                    content: '';
                    display: table-cell;
                    position: relative;
                    top: 50%;
                    width: 50%;
                    background-position: left 1em top 50%;
                    background-repeat: no-repeat;
                    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAAABCAYAAADgmyMuAAAAAXNSR0IArs4c6QAAABhJREFUKBVjvH///n+GUTAaAqMhMCRDAACLqwOeD7OHSQAAAABJRU5ErkJggg==");
                }
                &:before{
                    content: '';
                    display: table-cell;
                    position: relative;
                    top: 50%;
                    width: 50%;
                    background-position: right 1em top 50%;
                    background-repeat: no-repeat;
                    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAAABCAYAAADgmyMuAAAAAXNSR0IArs4c6QAAABhJREFUKBVjvH///n+GUTAaAqMhMCRDAACLqwOeD7OHSQAAAABJRU5ErkJggg==");
                }
            }
        }
    }

</style>
<script>
import { go } from '../../libs/router'
  import {ViewBox,Headerbar,Search,Tab, TabItem, Group,XNumber, Cell, Scroller, Tabbar, TabbarItem,Actionsheet,Spinner} from '../../components'
  export default {
    components: {
      // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
      // 否则挂载点和组件名字一致, 即vhead
      ViewBox,
      Headerbar,
      Search,
      Tab,
      TabItem,
      Group,
      XNumber,
      Cell,
      Scroller,
      Tabbar,
      TabbarItem,
      Actionsheet,
      Spinner
    },
    data (){
      return {
        selectedData:{},
         //数据
        mainData:{},
        dateData:[],
        saleData:{},
        pleasedData:{},
        calendarData:[],
        flightData:[],
        hotelData:[],

        showPagechoose:false,
        shownext:true,
      }
    },
    computed:{
        leaveDate:function(){
            if(this.selectedData&&this.selectedData.air)
            {
                if(this.selectedData.air.AirTicketList&&this.selectedData.air.AirTicketList.length>0)
                {
                   var firstAirTicketList= this.selectedData.air.AirTicketList[0]
                   if(firstAirTicketList&&firstAirTicketList.AirProductSegmentList.length>0)
                   {
                       var firstAirProductSegmentList=firstAirTicketList.AirProductSegmentList[0]
                       return this.dateAdd(this.selectedData.depDate,firstAirProductSegmentList.NoOfDay-1)
                   }
                }
            }
            return ''
        },
        returnDate:function(){
            if(this.selectedData&&this.selectedData.air)
            {
                if(this.selectedData.air.AirTicketList&&this.selectedData.air.AirTicketList.length>0)
                {
                   var lastAirTicketList= this.selectedData.air.AirTicketList[this.selectedData.air.AirTicketList.length-1]
                   if(lastAirTicketList&&lastAirTicketList.AirProductSegmentList.length>0)
                   {
                       var lastAirProductSegmentList=lastAirTicketList.AirProductSegmentList[lastAirTicketList.AirProductSegmentList.length-1]
                       return this.dateAdd(this.selectedData.depDate,lastAirProductSegmentList.NoOfDay-1)
                   }
                }
            }
            return ''
        },
        leaveCityName:function(){
            if(this.selectedData&&this.selectedData.air)
            {
                if(this.selectedData.air.AirTicketList&&this.selectedData.air.AirTicketList.length>0)
                {
                   var firstAirTicketList= this.selectedData.air.AirTicketList[0]
                   if(firstAirTicketList&&firstAirTicketList.AirProductSegmentList.length>0)
                   {
                       var firstAirProductSegmentList=firstAirTicketList.AirProductSegmentList[0]
                       return firstAirProductSegmentList.LeaveCityName
                   }
                }
            }
            return ''
        },
        arriveCityName:function(){
            if(this.selectedData&&this.selectedData.air)
            {
                if(this.selectedData.air.AirTicketList&&this.selectedData.air.AirTicketList.length>0)
                {
                   var lastAirTicketList= this.selectedData.air.AirTicketList[this.selectedData.air.AirTicketList.length-1]
                   if(lastAirTicketList&&lastAirTicketList.AirProductSegmentList.length>0)
                   {
                       var lastAirProductSegmentList=lastAirTicketList.AirProductSegmentList[lastAirTicketList.AirProductSegmentList.length-1]
                       return lastAirProductSegmentList.LeaveCityName
                   }
                }
            }
            return ''
        }
    },
    methods: {
       takeData:function(){
        //   this.$http.get('/static/tour_main.json').then((response) => {
        //   // success callback
        //   //debugger
        //   var data = response.data
        //   for(var i in data.AirPriceList){
        //     var tempdata = data.AirPriceList[i].AirTicketList[0].AirProductSegmentList
        //     for(var m in tempdata){
        //         tempdata[m].ArriveTime = changeTime(tempdata[m].ArriveTime)
        //         tempdata[m].LeaveTime = changeTime(tempdata[m].LeaveTime)
        //     }
        //     data.AirPriceList[i].AirTicketList[0].AirProductSegmentList = tempdata
        //    }
        //   this.flightData = data.AirPriceList


        // }, (response) => {

        // });

      },
      getPriceStr:function(price,curPrice){
          if(price>curPrice)
          {
              return "+￥"+(price-curPrice)
          }
          else if(price==curPrice)
          {
              return "￥"+(price-curPrice)
          }
          else
          {
              return "-￥"+(curPrice-price)
          }
      },
      dateAdd:function(dateStr,days){
          return api.dateAdd(dateStr,days)
      },
      selectFlight:function(item){
        if(this.selectedData.air.AirPlanID!=item.AirPlanID)
        {
            item.airCount=g_air_list.length
            g_selected_data.air=item
        }
        api.pageBack()
      },
      back:function(){
          window.history.back() 
      },
      returnTop:function(){
        document.querySelector('.page-inner').scrollTop = 0
      },
      scrollFunction:function(e){
        //header
        if(this.isAppShow){
          if(document.querySelector('.page-inner').scrollTop > 64){
            this.isFixed = true
          }else {
            this.isFixed = false
          }
        }else{
          this.isFixed = true
        }
        //show top 移动大于400px时 显示回到顶部按钮
        var mTop = document.getElementById('tablistbar').offsetTop-48;
        if(document.querySelector('.page-inner').scrollTop > mTop){
          this.isTablist = true
        }else {
          this.isTablist = false
        }
        //返回顶部
        if(document.querySelector('.page-inner').scrollTop > 600){
          this.isReturnTop = true
        }else {
          this.isReturnTop = false
        }

      },
    },
    created(){
        this.screenHeight = `${document.body.clientHeight - 99}px`//计算搜索关键词列表高度：屏幕高度-顶部标题栏高度
        this.searchHeight = `${document.body.clientHeight - 50}px`//计算搜索关键词列表高度：屏幕高度-顶部标题栏高度

    },
    ready() {
      this.takeData()

    },
    route:{
        data:function(transition){
            if(transition.to!=null&&transition.to!=undefined)
            {
                if(g_selected_data.pid>0&&g_air_list.length>0)
                {
                    this.selectedData=g_selected_data
                    var tmpArr=[]
                    for(var i=0;i<g_air_list.length;i++)
                    {
                        if(g_air_list[i].AirPlanID==this.selectedData.air.AirPlanID)
                        {
                            tmpArr.splice(0,0,g_air_list[i])
                        }
                        else
                        {
                            tmpArr.push(g_air_list[i])
                        }
                    }
                    this.flightData=tmpArr
                    this.takeData()
                }
                else
                {
                    api.pageBack()
                }
                
            }
        }
    },
    filters:{
        "changeTime":function(val){
            val = val.substr(0,2) + ":" + val.substr(2,2)
            return val
        },
        "dateShort":function(val){
            var arr=val.split('-')
            if(arr.length==3)
            {
                return arr[1]+'-'+arr[2]
            }
        }
    }
  }
</script>
