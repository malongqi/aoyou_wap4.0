<template>
    <div class="page-wrap">
        <div class="page choose hotelplan">
            <view-box v-if="!showPagechoose">
                <headerbar class="shade" slot="header">
                    <span slot="left" class="icons icon-arrow" @click='back()'></span>
                    <div class="departciry">
                        <span class="citys" @click="">选择酒店</span>
                    </div>
                </headerbar>
                <div class="page-inner-hotelplan">
                    <div class="header-cover" :style="{opacity:isOpacity}"></div>
                    <div class="hotel" v-for='hotelPlan in stayPlace.HotelPlanList' :class="{'active':selectedData.stayPlaces[stayIndex].hotelPlan.HotelPlanID==hotelPlan.HotelPlanID}" :class="{'manyroom':hotelPlan.HotelList.length>0}">
                        <div class="title">
                            <h3>{{stayPlace.StayName}}酒店{{stayPlace.EndDay-stayPlace.StartDay+1}}晚</h3>
                            <p>入住{{ dateAdd(selectedData.depDate,stayPlace.StartDay-1)}}  离开{{ dateAdd(selectedData.depDate,stayPlace.EndDay)}}</p>
                            <div class="number">
                                <p @click="openRoomNum(hotelPlan)">{{hotelPlan.roomNum}}间<i class="bluedown"></i></p>
                                <p>{{hotelPlan.Stock>9?'充足':'仅剩'+hotelPlan.Stock+'间'}}</p>
                            </div>
                        </div>
                        <div v-for="hotelItem in hotelPlan.HotelList">
                            <div class="hotelsmall">
                                <ul>
                                    <li>
                                        <div class="cont clearfix">
                                            <img v-bind:src='hotelItem.HotelPicList && hotelItem.HotelPicList.length>0?hotelItem.HotelPicList[0]:"http://pic1.aoyou.com/wap4.0/index/bg-s.png?imageView2/1/w/80/h/60/q/90"' />
                                            <h3>{{hotelItem.HotelNameEng+hotelItem.HotelName}}</h3>
                                            <div class="grade">
                                                <span>参考等级：</span>
                                                <i class="icon-grade" v-for="item in hotelItem.StarLevel"></i>
                                            </div>
                                        </div>
                                        <p>地址：{{hotelItem.HotelAddress}}</p>
                                        <div class="line"></div>
                                    </li>
                                </ul>
                            </div>
                            <div v-for="roomPlanItem in hotelItem.RoomPlanList">
                                <div class="house" v-for='childitem in roomPlanItem.RoomList'>
                                    <div class="title"><i></i>{{childitem.RoomName}}</div>
                                    <div class="cont clearfix">
                                        <div class="tit">
                                            <p v-on:click="openRoomBrief(childitem)">详细</p>
                                        </div>
                                        <div class="detail">
                                            <p v-if="childitem.RoomArea>0||(childitem.BedTypeStr!=''&&childitem.BedSizeStr!='')">{{childitem.RoomArea>0? '面积/'+childitem.RoomArea+'m²':''}} <i class="iconshu" v-if="childitem.RoomArea>0"></i> {{childitem.BedTypeStr!=null&&childitem.BedTypeStr!=''&&childitem.BedSizeStr!=null&&childitem.BedSizeStr!=''?childitem.BedTypeStr+'/'+childitem.BedSizeStr:''}} </p>
                                            <p>{{childitem.MealInfoStr}} <i class="iconshu"></i> {{childitem.RoomNetText}} </p>
                                            <p>入住{{childitem.CheckInDate|dateFmt}}  离开{{childitem.CheckOutDate|dateFmt}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="choose clearfix">
                            <span class="btn" v-on:click="selectHotelPlan(hotelPlan,stayPlace.HotelPlanList.length)">{{selectedData.stayPlaces[stayIndex].hotelPlan.HotelPlanID==hotelPlan.HotelPlanID?'已选':'选择'}}</span>
                            <div class="txt">
                                <p>差价 <b>{{getPriceStr(hotelPlan.HotelPlanPrice,selectedData.stayPlaces[stayIndex].hotelPlan.HotelPlanPrice)}}</b>/间</p>
                            </div>
                        </div>
                        <i class="activeicon"></i>
                    </div>
                </div>
                <popup :show.sync="showroomnum">
                    <div class="popup2">
                        <group>
                            <h3>修改间数</h3>
                            <div class="item clearfix" @click="closeRoomNum(item)" v-for="item in roomNumList" :class="{'active':curRoomItem.roomNum==item.num}">
                                <span>{{item.num}}间</span>
                                <p v-html="item.desc"></p>
                                <label class="icon-right"></label>
                            </div>
                            <div class="blank"></div>
                        </group>
                    </div>
                </popup>
            </view-box>
        </div>
    </div>
</template>
<style lang="less">
    .choose.hotelplan .ay_tab_bd{
        padding-bottom: 0px;
        padding-top: 44px;
    }

    .page-inner-hotelplan{
        .shade{
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 10;
            border-bottom: 1px solid #DFDFDF;
        }
        .hotel {
            margin: 10px;
            border: #fff 1px solid;
            background: #fff;
            position: relative;
            border-radius: 10px;
            box-shadow: rgba(0, 0, 0, 0.15) 0 0 2px;

            a.change{
                border-top: 1px solid #DFDFDF;
                font-size: 14px;
                color: #41B3EE;
                height: 44px;
                width: 100%;
                display: block;
                text-align: center;
                line-height:44px;
            }

            .title{
                height:60px;
                border-bottom: 1px solid #DFDFDF;
                h3 {
                    height: 35px;
                    line-height: 45px;
                    font-size: 17px;
                    color: #333333;
                    letter-spacing: 0px;
                    padding: 0 10px;
                }
                p{
                    font-size: 12px;
                    color: #666666;
                    padding: 0 10px;
                }

                .number{
                    width: 80px;
                    text-align: right;
                    float: left;
                    position: absolute;
                    top: 18px;
                    right: 0;
                    p:first-child{
                        font-size: 14px;
                        color: #41B3EE;
                        letter-spacing: 0px;
                        line-height: 1;
                    }
                    p:last-child{
                        font-size: 12px;
                        color: #FF3232;
                        letter-spacing: 0px;
                    }
                }
            }

            .hotelsmall{
                width:100%;
                background: white;
                border-top: 1px solid #DFDFDF;
                &:nth-child(2){
                    border-top:0;
                }
                ul{
                    margin: 0 10px;
                    li{
                        border-bottom: 1px solid #DFDFDF;
                        padding-bottom: 10px;
                        .cont{
                            margin-top: 15px;
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
                                width: 64%;
                                float: left;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-line-clamp: 2;
                                -webkit-box-orient: vertical;
                            }
                            .grade{
                                height:10px;
                                display: inline-block;
                                width: 64%;
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
                            width: 100%;
                            text-overflow: ellipsis;
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

            }

            .house{
                margin: 15px 10px;

                .title{
                    font-size: 14px;
                    height: 20px;
                    line-height: 20px;
                    color: #333333;
                    letter-spacing: 0px;
                    border: 0;
                    i{
                        height: 20px;
                        width: 20px;
                        vertical-align: top;
                        margin-right: 8px;
                        display: inline-block;
                        background-repeat: no-repeat;
                        background-size: contain;
                        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA5pJREFUWAnNmU1ME0EUx9+srREtyQIGkl4xeFEvxmi8FYwmQOJHRI94NnrCkwdBD57kZjyLN22jIQESjbQ3ozFe1Iuo1xqIwCZWS2hlfP9Jp27b3Xa33S59yWZmZ+a999tX5ushqEkZXrIGhZTn5Y48LoWIC6K4lDIOc0KIrCTKcn9WGOID98+nR83vzbhiu97l7Mtf/X8LxRs7JC+SpCPeNXmkoM8GiRd7opGHr851r3nV9QQ4kZGx9T/WFEfrFhuOeTXuMi7HUX3Qt9+cTSZEzmVMubkhYGJh85KQ9EiSHChrBVARJFaloOuZ8Z7n9cwZbp389ySGFzenuT8VNBx8lmym4AO+3DgcOybeyK71DWuOFSfcFINs50mV7Os1J5OnRb7abk0E8TVhwgEIgSj5rAlYDeDIknUnrMjZowWf8G1vQ72CGBOC21L8SRXt1Uptexc8HYku2ydOGUQtJTnrWzsmhJ8Pwuzui5mH9BJU/onVOhfwUuIHTI9FgMCi31UEsUMUtgvYilwX4fsnYnRqIKr1Wirfrhbo9vu6a3Quujc6iB1HRbC4XbxZDw40QcF5tBXDloqxClAKeQEvnSRqv2cgA6cS3xu/xy95t1agK68t9aDuS/gwAjYDRyZfij4Gz378TT+3pHpQ9ytgM3Ce86sY1niwGThstsvh1LEDdHCfUA/qfgVsEV5n4li+m5G5lTxvOkTXDnc5qp/sj9KzM6Zjn5dGsEV4D2wqgoCbW9lSfgRbmhxyhvQC4jYGbFhmfAfQDgfjAEVbtTz+kic8LYiM8FnsB5N2+zGiI2fX0W06kgB78rW1CIMtwuHLsqMhu7Nm6xoS+hoOdd2u4dHmRcCGdRCAgQlgNJDdqFObvd+pDjYD91anzk5oAxvWwflOgHFiAJs6biUWNj412o/T4z1ONppuG17YrK/LF/3MeO9RdZrBjb/+6PB7NZMCRDqCEeqeIHHIDEo82MqVmP5fmtQFekfOBAXRih2eHDPpsZ67sKEiiApyJbiwoL6boi5NzKIZyoC4RSFXwrkz31ufNtZyyb7BoG90sFcGxAvuo7zxq9DiPWyBb/udGP7VMmMH4X1ZjCxaT7kMJS+jfSM/szxmXuWy4hesiKAi5gFI5EBBK7e7hK+Szwo4xePmXEVS5Wloum2pEA4GftblUfNedeQ0V81PrDt0udsJzIaAAO3oFLCOJEqkSJCFUBf9Tkqi2yF1Pax/Q/wDXM2s2a7SbcAAAAAASUVORK5CYII=");
                    }


                }

                .cont{
                    display: block;
                    .tit{
                        width:24px;
                        float: left;
                        p{
                            font-size: 12px;
                            color: #41B3EE;
                            line-height:24px;
                            position: relative;
                            right: 2px;
                        }
                    }
                    .detail{
                        width: 80%;
                        float: left;
                        margin-left: 5px;
                        padding-top: 4px;
                        p{
                            font-size: 12px;
                            color: #666666;
                            letter-spacing: 0px;
                            line-height: 17px;
                        }
                    }

                }

            }


        }

        .hotel.active{
            span{
                    color: #FC5A3F;
            }
            background: #FFFEF9;
            position: relative;
            overflow: hidden;
            .choose .btn{
                color:#4CD964;
                background: #FFFFFF;
                border: 1px solid #4CD964;
            }
            .hotelsmall{
                background: #FFFEF9;
            }
            i.activeicon{
                position: absolute;
                top: 0px;
                right: 0px;
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
                    line-height: 30px;
                    text-align: right;
                    b{
                        font-size:17px;
                        color:#FC5A3F;
                    }
                }
            }
        }
    }

</style>
<script>
import { go } from '../../libs/router'
  import {ViewBox,Headerbar,Search,Tab,Popup, TabItem, Group,XNumber, Cell, Scroller, Tabbar, TabbarItem,Actionsheet,Spinner} from '../../components'
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
      Popup,
      Spinner
    },
    data (){
      return {
        stayIndex:0,
        hpid:0,
        selectedData:{},
        roomDetial:{},
        roomNumList:[],
        curRoomItem:{},
        stayPlace:{},
        showroomnum:false,
        //屏幕宽度
        clientWidth:375,
        showPagechoose:false,
        shownext:true,
      }
    },
    methods: {
        takeData:function(){
            if(g_hotel_list&&g_hotel_list.length>0)
            {
                this.stayPlace=g_hotel_list[this.stayIndex]
            }
            this.changeDataNum()
        },
        returnTop:function(){
            document.querySelector('.page-inner').scrollTop = 0
        },
        changeDataNum:function(){
            this.clientWidth = document.body.clientWidth
        },//设置屏幕宽度
        initRoomNumList:function(){
            var min=Math.ceil((this.selectedData.an)/3)
          var max=this.selectedData.an
          this.roomNumList.splice(0,this.roomNumList.length)
          for(var i=min;i<=max;i++)
          {
              var roomNumItem={}
              roomNumItem.num=i
              roomNumItem.desc=''
                if(this.selectedData.an>i*2)
                {   
                    roomNumItem.desc='<i class="icon-tip"></i>根据酒店要求，3人及以上入住1间房间会产生费用增加，预订成功后，客服人员将与您电话确认。'
                }
                else if(this.selectedData.an<i*2)
                {
                    roomNumItem.desc='<i class="icon-tip"></i>(单间差<b>+￥'+this.curRoomSinglePrice+'</b> /人)'//
                }
               this.roomNumList.push(roomNumItem)
          }
        },
        openRoomBrief:function(item){
            this.roomDetial=item
            this.showroombrief=true
            this.$refs.picwall.rerender()
        },
        closeRoomBrief:function(){
            this.roomDetial={}
            this.showroombrief=false
        },
        openRoomNum:function(item){
            this.curRoomItem=item
            if(item.HotelPlanPrice)
            {
                this.curRoomSinglePrice=item.HotelPlanPrice/2
            }
            else if(item.PlanPrice)
            {
                this.curRoomSinglePrice=item.PlanPrice/2
            }
            this.initRoomNumList()
            this.showroomnum=true
        },
        closeRoomNum:function(item){
            this.curRoomItem.roomNum=item.num
            this.showroomnum=false
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
            if(dateStr)
            {
                return api.dateAdd(dateStr,days)
            }
            return ''
        },
        selectHotelPlan:function(hotelPlan,hotelPlanCount){
            if(g_selected_data.stayPlaces[this.stayIndex]&&g_selected_data.stayPlaces[this.stayIndex].hotelPlan)
            {
                hotelPlan.hotelPlanCount=hotelPlanCount
                g_selected_data.stayPlaces[this.stayIndex].hotelPlan=hotelPlan
                window.history.back()
            }
        },
        back:function(){
            window.history.back()
        }
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
                    this.stayIndex=transition.to.query.index
                    this.hpid=transition.to.query.hpid
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
        "dateFmt":function(val)
        {
            if(val.indexOf('T')>=0)
            {
                return val.split('T')[0]
            }
            else
            {
                return ''
            }
        }
    }
  }


</script>
