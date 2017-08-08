<template>
    <div class="page-wrap">
        <div class="page choose fix-hotellist">
            <view-box v-if="!showPagechoose" slot="header">
                <headerbar class="shade fix-shade">
                    <span slot="left" class="icons icon-arrow" @click='back()'></span>
                    <div class="departciry">
                        <span class="citys" @click="">选择酒店</span>
                    </div>
                </headerbar>
                <div class="page-inner-hotellist">
                    <div class="header-cover" :style="{opacity:isOpacity}"></div>
                    <div class="hotelsmall" v-for="item in hotelData" v-link="{path:'room',query:{index:stayIndex,hid:item.HotelProductID,rpid:item.RoomPlanList[0].PlanID},replace:true}" :class="{'active':item.HotelProductID==selectedHotel.HotelProductID}">
                        <ul>
                            <li>
                                <div class="cont clearfix">
                                    <img :src='item.HotelPicList!=undefind?item.HotelPicList[0]:"http://pic1.aoyou.com/wap4.0/index/bg-s.png?imageView2/1/w/80/h/60"'>
                                    <h3 :style="{width:clientWidth-130 +'px'}">{{item.HotelNameEng+item.HotelName}}</h3>
                                    <div class="grade" :style="{width:clientWidth-130 +'px'}">
                                        <span>参考等级：</span>
                                        <i class="icon-grade" v-for="m in item.StarLevel"></i>
                                    </div>
                                </div>
                                <p>地址：{{item.HotelAddress}}</p>
                                <div class="price">
                                    {{getPriceStr(item.RoomPlanList[0].PlanPrice,curHotelLowestRoomPrice)}}
                                    <span>/间</span>
                                </div>
                                <div class="line"></div>
                            </li>
                        </ul>
                        <i class="activeicon"></i>
                    </div>
                </div>
            </view-box>
        </div>
    </div>
</template>
<style lang="less">
    .page-inner-hotellist{
        .hotelsmall{
            width:100%;
            background: white;
            padding-top: 15px;
            border-bottom: 1px solid #DFDFDF;

            ul{
                margin: 0 10px;
                li{
                    //padding-bottom: 10px;
                    .cont{
                        display: block;
                        height: 60px;
                        img{
                            width:80px;
                            height:60px;
                            border-radius: 5px;
                            float: left;
                        }
                        h3{
                            margin-left: 10px;
                            font-size: 16px;
                            color: #333333;
                            line-height: 20px;
                            width: 240px;
                            float: left;
                            min-height:40px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                        }

                        .grade{
                            height:10px;
                            display: inline-block;
                            width: 240px;
                            margin-left: 10px;
                            span{
                                font-size:12px;
                                vertical-align: super;
                                color:#999;
                            }
                            i.icon-grade{
                                vertical-align: super;
                            }
                        }
                    }
                    p{
                        margin-top: 5px;
                        font-size: 12px;
                        color: #999999;
                        letter-spacing: 0px;
                        display: block;
                        width: 65%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-inline-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                    }

                    .price{
                        display: inline-block;
                        font-size: 17px;
                        color: #FC5A3F;
                        letter-spacing: 0.72px;
                        float: right;
                        text-align: right;
                        span{
                            color:#999;
                            font-size: 12px;
                        }
                    }
                    .line{
                        margin: 14.5px 0;
                        border: 1px solid #DFDFDF;
                    }
                }
                li:last-child{
                    .line{
                        display: none;
                    }
                }
            }

            i.activeicon{
                display: none;
            }
        }

        .hotelsmall.active{
            background: #FFFEF9;
            position: relative;
            overflow: hidden;
            i.activeicon{
                position: absolute;
                top: 0px;
                right: 0px;
                height: 15px;
                width: 15px;
                display: inline-block;
                border-bottom-left-radius: 8px;
                background: #4CD964;
                background-size: 60%;
                background-position: center;
                background-repeat: no-repeat;
                background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAOCAYAAADNGCeJAAAAAXNSR0IArs4c6QAAAP9JREFUOBGlks0KAWEUhoWLYIEFpWbHBlkoJQsLW1fiupRLsVCyQLFgQfknjedozvSNGZPh1NP5fc/MfN/EYn+YbdtdmMIA4j+vQtyBG6iVf1qGugln3YIfQfQ3Q1SDA6jJZ6YjvxWiEux0C34OOXcRSQIqkHSLAQF9CzagtiIoeEYpDJ3uGJ/1NJ2Eeh5ErCZLLd8sxYlO4BdQNIfIMzADtS1ByZxxYxpyxRedxK/hNYxPgfmwPXnVFQcFDLTgCGpyyPJDypWrnQgaQXpfjcE6mDelS8Rfoe0ThRUQlMG8MVL7Dt0w3cceQvkFliD2gN7H4W8aLJCD70P4Yb8tewL3G312VnF72wAAAABJRU5ErkJggg==");
            }
        }

        .shade{
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 10;
            border-bottom: 1px solid #DFDFDF;
        }
    }

    .fix-hotellist.choose .ay_tab_bd{
        padding-bottom: 0px;
        padding-top: 44px;
    }

    .choose .shade.fix-shade{
        position: absolute;
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
        stayIndex:0,
        hid:0,
        curHotelLowestRoomPrice:0,
        selectedHotel:{},
        //屏幕宽度
        clientWidth:375,
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
    methods: {
      takeData:function(){
        //   this.$http.get('/static/tour_main.json').then((response) => {
        //     // success callback
        //     //debugger
        //     var data = response.data
        //     this.hotelData = data.HotelPriceList
        //     this.changeDataNum()

        //     }, (response) => {

        //     });
        if(g_hotel_list&&g_hotel_list.length>0)
        {
            var stayPlace=g_hotel_list[this.stayIndex]
            this.selectedHotel=this.selectedData.stayPlaces[this.stayIndex].hotel
            this.hotelData=stayPlace.HotelList
            for(var i=0,len=this.hotelData.length;i<len;i++)
            {
                if(this.hotelData[i].HotelProductID==this.selectedHotel.HotelProductID)
                {
                    if(this.hotelData[i].RoomPlanList.length>0)
                    {
                        this.curHotelLowestRoomPrice=this.hotelData[i].RoomPlanList[0].PlanPrice
                    }
                }
            }
            this.changeDataNum()
        }
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
      returnTop:function(){
        document.querySelector('.page-inner').scrollTop = 0
      },
      back:function(){
        window.history.back()
      },
      changeDataNum:function(){
        this.clientWidth = document.body.clientWidth
      }//设置屏幕宽度
    },
    ready() {
      //this.takeData()

    },
    route:{
        data:function(transition){
            if(transition.to!=null&&transition.to!=undefined)
            {
                if(g_selected_data.pid>0)
                {
                    this.selectedData=g_selected_data
                    this.stayIndex=transition.to.query.index
                    this.hid=transition.to.query.hid
                    this.takeData()
                }
                else
                {
                    api.pageBack()
                }
                
            }
        }
    },

  }


</script>
