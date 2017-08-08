<template>
    <section class="page-wrap">
        <div class="page choose fix-choose">
            <view-box v-if="!showPagechoose">
                <div class="ay-header-box" slot="header">
                    <div class="header-cover" :style="{opacity:isOpacity}"></div>
                    <headerbar>
                        <span slot="left" class="icons icon-arrow" @click='back()'></span>
                        <div class="departciry">
                            <span class="citys" @click="">选择产品</span>
                        </div>
                    </headerbar>
                    <div class="detail clearfix">
                        <div class="date">
                            <p>{{selectedData.depDate}}</p><p>出发日期</p>
                        </div>
                        <div class="adult">
                            <p>{{selectedData.an}}</p><p>成人</p>
                        </div>
                        <div class="child">
                            <p>{{selectedData.cn}}</p><p>儿童</p>
                        </div>
                        <div class="price">
                            <p>{{total}}</p><p @click="popupmoney">费用明细<i></i></p>
                        </div>
                    </div>
                </div>
                <div class="page-inner">
                    <div class="ticket">
                        <h3>机票</h3>
                        <div class="cont" v-for="item in (selectedData.pid!=undefined?selectedData.air.AirTicketList:[])">
                            <div class="flight" v-for="childitem in item.AirProductSegmentList">
                                <div class="other clearfix">
                                    <span class="flightno">D{{childitem.NoOfDay}}</span>

                                    <span class="depdate">{{dateAdd(selectedData.depDate,childitem.NoOfDay-1)|dateForShort}}<a class="airline">{{childitem.AirlineName}}{{childitem.FlightNo}}</a>{{childitem.FlightCabin}}</span>

                                    <span class="number">{{selectedData.air.AirStock>9?'充足':'仅剩'+selectedData.air.AirStock+'张'}}</span>
                                </div>
                                <div class="time clearfix">
                                    <div class="set-off">
                                        <p>{{childitem.LeaveTime|timeFmt}}</p>
                                        <p>{{childitem.LeavePortName}}</p>
                                    </div>
                                    <div class="line"></div>
                                    <div class="set-down">
                                        <p>{{childitem.ArriveTime|timeFmt}}</p>
                                        <p>{{childitem.ArrivePortName}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a class="change" v-link="'flight'" v-if="selectedData.air!=undefined&&selectedData.air.airCount!=undefined&&selectedData.air.airCount>1">更换机票</a>
                    </div>
                    <div class="hotel" v-for="(stayIndex,stayItem) in selectedData.stayPlaces" :class="{'manyhotel':stayItem.hotelPlan.HotelList&&stayItem.hotelPlan.HotelList.length>1}">
                    <div v-if="stayItem.hotel.HotelProductID">
                        <div class="title">
                            <h3>{{stayItem.StayName}}酒店{{stayItem.EndDay-stayItem.StartDay+1}}晚</h3>
                            <p>入住{{ dateAdd(selectedData.depDate,stayItem.StartDay-1)}}  离开{{ dateAdd(selectedData.depDate,stayItem.EndDay)}}</p>
                        </div>
                        <div class="hotelsmall">
                            <ul>
                                <li>
                                    <div class="cont clearfix">
                                        <img v-bind:src='stayItem.hotel.HotelPicList != void 0 && stayItem.hotel.HotelPicList && stayItem.hotel.HotelPicList.length>0?stayItem.hotel.HotelPicList[0]:"http://pic1.aoyou.com/wap4.0/index/bg-s.png?imageView2/1/w/80/h/60/q/90"' @click="recordTop" v-link="{path:'hotelimg',query:{index:$index,hid:stayItem.hotel.HotelProductID,rpid:stayItem.hotel.roomPlan.PlanID}}">
                                        <h3 :style="{width:clientWidth-132 +'px'}" @click="recordTop" v-link="{path:'room',query:{index:$index,hid:stayItem.hotel.HotelProductID,rpid:stayItem.hotel.roomPlan.PlanID,from:1}}">{{stayItem.hotel.HotelNameEng+stayItem.hotel.HotelName}}</h3>
                                        <div class="grade" :style="{width:clientWidth-132 +'px'}"><span>参考等级：</span>
                                            <i class="icon-grade" v-for="item in stayItem.hotel.StarLevel"></i>
                                        </div>
                                    </div>
                                    <p>地址：{{stayItem.hotel.HotelAddress}}</p>
                                    <div v-if="stayItem.hotel.RoomPlanList.length>1" class="changeroom" @click="recordTop" v-link="{path:'room',query:{index:$index,hid:stayItem.hotel.HotelProductID,rpid:stayItem.hotel.roomPlan.PlanID,from:1}}">更换房型</div>
                                    <div class="line"></div>
                                </li>
                            </ul>
                        </div>
                        <div class="room" :class="{'manyroom':stayItem.hotel.roomPlan.RoomList.length>1}">
                            <div class="house" v-for='childitem in stayItem.hotel.roomPlan.RoomList' @click="openRoomBrief(childitem)">
                                <div class="title"><i @click="openRoomBrief(childitem)"></i>{{childitem.RoomName}}</div>
                                <div class="cont clearfix">
                                    <div class="tit">
                                        <p @click="openRoomBrief(childitem)">详细</p>
                                    </div>
                                    <div class="detail">
                                        <p v-if="childitem.RoomArea>0||(childitem.BedTypeStr!=''&&childitem.BedSizeStr!='')">{{childitem.RoomArea>0? '面积/'+childitem.RoomArea+'m²':''}} <i class="iconshu" v-if="childitem.RoomArea>0"></i> {{childitem.BedTypeStr!=null&&childitem.BedTypeStr!=''&&childitem.BedSizeStr!=null&&childitem.BedSizeStr!=''?childitem.BedTypeStr+'/'+childitem.BedSizeStr:''}} </p>
                                        <p>{{childitem.MealInfoStr}} <i class="iconshu" v-if="childitem.RoomNetText"></i> {{childitem.RoomNetText}} </p>
                                        <p>入住{{childitem.CheckInDate|dateFmt}}  离开{{childitem.CheckOutDate|dateFmt}}</p>
                                    </div>
                                    <div class="number">
                                        <p @click="openRoomNum(stayItem.hotel.roomPlan)">{{stayItem.hotel.roomPlan.roomNum}}间<i class="bluedown"></i></p>
                                        <p>{{stayItem.hotel.roomPlan.Stock>9?'充足':'仅剩'+stayItem.hotel.roomPlan.Stock+'间'}}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <a v-if="stayItem.hotel.hotelCount>1" class="change" @click="recordTop" v-link="{path:'hotellist',query:{index:$index,hid:stayItem.hotel.HotelProductID}}">更换酒店</a>
                    </div>
                    <div v-if="stayItem.hotelPlan.HotelList&&stayItem.hotelPlan.HotelList.length>0">
                        <div class="title">
                            <h3>{{stayItem.StayName}}酒店{{stayItem.EndDay-stayItem.StartDay+1}}晚</h3>
                            <p>入住{{ dateAdd(selectedData.depDate,stayItem.StartDay-1)}}  离开{{ dateAdd(selectedData.depDate,stayItem.EndDay)}}</p>
                            <div class="numberformanyhotel">
                                <p @click="openRoomNum(stayItem.hotelPlan)">{{stayItem.hotelPlan.roomNum}}间<i class="bluedown"></i></p>
                                <p>{{stayItem.hotelPlan.Stock>9?'充足':'仅剩'+stayItem.hotelPlan.Stock+'间'}}</p>
                            </div>
                        </div>
                        <div v-for="hotelItem in stayItem.hotelPlan.HotelList">
                            <div class="hotelsmall">
                                <ul>
                                    <li>
                                        <div class="cont clearfix">
                                            <img v-bind:src='hotelItem.HotelPicList && hotelItem.HotelPicList.length>0?hotelItem.HotelPicList[0]:"http://pic1.aoyou.com/wap4.0/index/bg-s.png?imageView2/1/w/80/h/60/q/90"' @click="recordTop" v-link="{path:'hotelimg',query:{index:stayIndex,hpid:stayItem.hotelPlan.HotelPlanID,hid:hotelItem.HotelProductID}}">
                                            <h3 :style="{width:clientWidth-132 +'px'}" @click="recordTop" v-link="{path:'room2',query:{index:stayIndex,hpid:stayItem.hotelPlan.HotelPlanID,hid:hotelItem.HotelProductID}}">{{hotelItem.HotelNameEng+hotelItem.HotelName}}</h3>
                                            <div class="grade" :style="{width:clientWidth-132 +'px'}"><span>参考等级：</span>
                                                <i class="icon-grade" v-for="item in hotelItem.StarLevel"></i>
                                            </div>
                                        </div>
                                        <p>地址：{{hotelItem.HotelAddress}}</p>
                                        <div class="line"></div>
                                    </li>
                                </ul>
                            </div>
                            <div class="room" v-for='roomPlanItem in hotelItem.RoomPlanList'>
                                <div class="house" v-for='childitem in roomPlanItem.RoomList' @click="openRoomBrief(childitem)">
                                    <div class="title"><i @click="openRoomBrief(childitem)"></i>{{childitem.RoomName}}</div>
                                    <div class="cont clearfix">
                                        <div class="tit">
                                            <p @click="openRoomBrief(childitem)">详细</p>
                                        </div>
                                        <div class="detail">
                                            <p v-if="childitem.RoomArea>0||(childitem.BedTypeStr!=''&&childitem.BedSizeStr!='')">{{childitem.RoomArea>0? '面积/'+childitem.RoomArea+'m²':''}} <i class="iconshu" v-if="childitem.RoomArea>0"></i> {{childitem.BedTypeStr!=null&&childitem.BedTypeStr!=''&&childitem.BedSizeStr!=null&&childitem.BedSizeStr!=''?childitem.BedTypeStr+'/'+childitem.BedSizeStr:''}} </p>
                                            <p>{{childitem.MealInfoStr}} <i class="iconshu"></i> {{childitem.RoomNetText}} </p>
                                            <p>入住{{childitem.CheckInDate|dateFmt}}  离开{{childitem.CheckOutDate|dateFmt}}</p>
                                        </div>
                                        <div class="number">
                                            <p @click="openRoomNum(stayItem.hotelPlan)">{{stayItem.hotelPlan.roomNum}}间<i class="bluedown"></i></p>
                                            <p>{{stayItem.hotelPlan.Stock>9?'充足':'仅剩'+stayItem.hotelPlan.Stock+'间'}}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <a v-if="stayItem.hotelPlan.hotelPlanCount>1" class="change" @click="recordTop" v-link="{path:'hotelplan',query:{index:$index,hpid:stayItem.hotelPlan.HotelPlanID}}">更换酒店</a>
                    </div>
                    </div>
                    <div class="title" v-show="(giveAddProduct!=undefined&&giveAddProduct.addProductSubTypeList!=undefined&&giveAddProduct.addProductSubTypeList.length>0)||(selectedData.addProducts!=undefined&&selectedData.addProducts.length>0)">
                        <p class="line">继续购买</p>
                    </div>
                    <div class="present" v-if="giveAddProduct&&giveAddProduct.TypeName">
                        <h3>{{giveAddProduct.TypeName}}</h3>
                        <div v-for="item in giveAddProduct.addProductSubTypeList">
                            <div v-for="subItem in item.addProductList" class="subItem">
                                <div class="cont clearfix">
                                    <div class="left">
                                        <p class="type">{{item.SubTypeName}}</p>
                                        <p class="tit">{{subItem.AddProductName}}</p>
                                        <p class="num">{{selectedData.an+selectedData.cn}}份</p>
                                    </div>
                                    <div class="right">
                                        <div class="vmiddle">
                                            <p>免费</p>
                                            <p @click="recordTop" v-link="{path:'service',query:{apid:subItem.AddProductID,aptid:subItem.AddProductType,aprice:0,unit:''}}">详情<i class="greydown"></i></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="fun" v-for="(tindex,item) in selectedData.addProducts">
                        <h3>{{item.SubTypeName}}</h3>
                        <div class="cont" :class="{borderclass:!item.isShow&&$index==1}" v-for="subItem in item.addProductList" v-show="subItem.isSubShow">
                          <div class="clearfix">
                              <div class="left">
                                  <p>{{subItem.AddProductName}}</p>
                              </div>
                              <div class="right">
                                  <p><span>￥{{subItem.MinPrice}}</span> /{{subItem.Unit}}</p>
                                  <p @click="recordTop" v-link="{path:'service',query:{apid:subItem.AddProductID,aptid:subItem.AddProductType,aprice:subItem.MinPrice,unit:subItem.Unit}}">详情<i class="greydown"></i></p>
                              </div>
                          </div>
                          <div class="contnum">
                              <x-number :min="0" :max="9" :value="subItem.num" :obj="subItem" :width="25" @on-change="addPackageProduct"></x-number>
                              <span v-if="subItem.selectedDates&&subItem.selectedDates.length>0&&subItem.num!=undefined&&subItem.num>0" @click="recordTop" class="active" v-link="{path:'calendar',query:{tindex:tindex,apid:subItem.AddProductID}}">{{subItem.selectedDates|selectedDatesFmt}}</span>
                              <span v-if="(subItem.selectedDates==undefined||subItem.selectedDates.length==0)&&subItem.num!=undefined&&subItem.num>0" @click="recordTop" v-link="{path:'calendar',query:{tindex:tindex,apid:subItem.AddProductID}}">{{subItem.DateTwoOrOne==1?'选择日期':'起始日期~终止日期'}}</span>
                          </div>
                        </div>
                        <a v-show="item.addProductList.length>2" class="change" v-on:click="OpenFunFunc(item)">{{item.isShow?'收起':'更多'+item.SubTypeName}}<i class="icon-expand" v-show="!item.isShow"></i><i class="icon-shrink" v-show="item.isShow"></i></a>
                    </div>
                </div>
                <tabbar class="ay-demo-tabbar" :style="{opacity:shownext}" icon-class="ay-center" slot="bottom" v-show='showBook'>
                    <div class="next clearfix" v-on:click="toBook()"  name="dnextbook">
                        <p>下一步<span>填写出行人信息</span></p>
                        <i class="iconin"></i>
                    </div>
                </tabbar>
                <!--<a class="ay-popup-mask" :class="{ ay-popup-show: showask }" @click="popupask"></a>-->
            </view-box>
            <!--插件使用-->
            <popup :show.sync="showroomnum">
                <div class="popup2">
                    <group>
                        <h3>修改间数</h3>
                        <div class="item" @click="closeRoomNum(item.num)" v-for="item in roomNumList" :class="{'active':curRoomItem.roomNum==item.num}">
                            <span>{{item.num}}间</span>
                            <p v-html="item.desc"></p>
                            <label class="icon-right"></label>
                        </div>
                        <div class="blank"></div>
                    </group>
                </div>
            </popup>
            <popup :show.sync="showmoney" >
                <div class="popup4">
                    <div class="cont">
                        <div class="close clearfix" @touchmove.prevent><i class="icon-close" @click="popupmoney"></i></div>
                        <ul>
                            <li>
                                <h3>出游团费({{selectedData.an}}成人{{selectedData.cn}}儿童)<span>￥{{subTotal}}</span></h3>
                            </li>
                            <li v-for='item in selectedData.addProducts'>
                                <h3 v-if="item.total>0">{{item.SubTypeName}}<span>￥{{item.total}}</span></h3>
                                <p v-for='subItem in item.addProductList|addProductShow'><em>{{subItem.AddProductName}}</em><span>￥{{subItem.total>0?subItem.total:subItem.MinPrice}} × {{subItem.num}}</span></p>
                            </li>
                            <li v-if="giveAddProduct.addProductSubTypeList!=undefined&&giveAddProduct.addProductSubTypeList.length>0">
                                <h3>超值赠送<span class="present-price">免费</span></h3>
                                <div v-for="item in giveAddProduct.addProductSubTypeList">
                                    <p v-for='subItem in item.addProductList'><em>{{subItem.AddProductName}}</em><span>￥0 × {{selectedData.an+selectedData.cn}}</span></p>
                                </div>
                            </li>
                        </ul>
                        <div class="total" @touchmove.prevent><p><span></span>{{total}}</p><span>总额</span></div>
                    </div>
                </div>
            </popup>
            <popup :show.sync="showroombrief">
                <div class="popup3" @touchMove.prevent="">
                    <group>
                        <div class="cont">
                            <div class="close"><i class="icon-close" @click="closeRoomBrief()"></i></div>
                            <div :class="['pic',{'no-slider':  roomDetial.RoomPicList && roomDetial.RoomPicList.length > 0}]">

                                <swiper loop :aspect-ratio="440/670" :list="tempImgobj" dots-position="center" height="11rem" v-ref:picWall>
                                    <!--<swiper-item class="swiper-demo-img" v-for="item in roomDetial.RoomPicList"><img :src="item"></swiper-item>-->
                                </swiper>
                            </div>
                            <h3>{{roomDetial.RoomName}}</h3>
                            <p v-if="roomDetial.RoomArea>0">面积：{{roomDetial.RoomArea}}m²</p>
                            <p v-if="roomDetial.BedTypeStr&&roomDetial.BedTypeStr!=''&&roomDetial.BedSizeStr&&roomDetial.BedSizeStr!=''">床型：{{roomDetial.BedTypeStr}}/{{roomDetial.BedSizeStr}}</p>
                            <p>含餐：{{roomDetial.MealInfoStr}}</p>
                            <p v-if="roomDetial.RoomNetText">Wifi：{{roomDetial.RoomNetText}}</p>
                            <div class="blank"></div>
                        </div>
                    </group>
                </div>
            </popup>
            <!--增加 选择使用日期 提示-->
            <div class="alertContent" v-show="alertContentShow" transition="expand">请选择使用日期</div>
            <!--提示结束-->
        </div>
    </section>
</template>
<style lang="less">
    @import '../../styles/ayui/base/mixin/setOnepx.less';
    /*增加 选择使用日期 提示*/
    .alertContent{
        background-color:#FFAB0A;
        height:40px;
        position:fixed;
        width:100%;
        opacity:0.95;
        color:#fff;
        font-size: 14px;
        padding-left:20px;
        font-weight:100;
        line-height: 38px;
        top: 44px;
    }

    .expand-transition {
        transition: all .3s ease;
        height: 40px;
        overflow: hidden;
        z-index:11;
    }
    .expand-enter,.expand-leave {
        height: 0;
        opacity: 0;
    }

    /*提示结束*/



    .page-wrap{
        box-sizing: border-box;
        background: #fff;
        -webkit-overflow-scrolling: touch;
        height: 100%;
        overflow: hidden;
    }


    .choose {
        .ay_tab_bd {
            padding-bottom: 46px;
            padding-top: 105px;
        }

        .ay-slider{
            background: url('http://pic1.aoyou.com/app40/room_tip.jpg') no-repeat;
            background-size: 100%;
            border-radius: 10px;
        }

        .no-slider .ay-slider{
            background: transparent;

            & > .ay-swiper {
                background: #333;
            }
        }

        .page-inner{
            padding-top: 0;
        }

        .ay-slider > .ay-indicator > a > .ay-icon-dot.active, .ay-slider .ay-indicator-right > a > .ay-icon-dot.active{
            background-color: #FF4700;
        }

        .ay-slider > .ay-indicator > a > .ay-icon-dot, .ay-slider .ay-indicator-right > a > .ay-icon-dot{
            width: 20px;
            height: 2px;
            border-radius: 0px;
        }

        .ay-header-bar .ay-header-btn{
            padding: 0;


        }
    }

    .popup2{
        .blank{
            width: 100%;
            height:30px;
            background: white;
            //border-top:1px solid #DFDFDF;
            position: relative;
            &:before {
                .setTopLine(#DFDFDF);
            }
        }
        h3{
            height:60px;
            line-height:60px;
            font-size: 19px;
            color: #333333;
            letter-spacing: 0.8px;
            margin:0 20px;
            position: relative;
            //border-bottom:1px solid #DFDFDF;
            &:after {
                .setBottomLine(#DFDFDF);
            }
        }
        .item{
            margin: 0 20px;
            height:60px;
            //border-bottom:1px solid #DFDFDF;
            position: relative;
            &:after {
                .setBottomLine(#DFDFDF);
                visibility: visible;
            }
            &:nth-last-child(2){
                &:after{
                    display: none;
                }
            }
            span{
                display: inline-block;
                width: 30px;
                height:60px;
                line-height:60px;
                font-size: 17px;
                color: #333333;
                letter-spacing: 0.72px;
                float: left;
            }
            p{
                margin: 0 12px;
                vertical-align: middle;
                display: inline-block;
                font-size: 12px;
                color: #999999;
                letter-spacing: 0px;
                line-height: 15px;
                float: left;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                b{
                    color:#FC5A3F;
                    font-weight:normal;
                }
            }
            label{
                display: none;
            }
        }
        .item.active{
            span{
                color: #FC5A3F;
            }
            label{
                display: inline-block;
                line-height: 60px;
                float: left;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                right: 0;
            }
        }

        .ay_cells{
            margin-top: 0;
        }
    }


    .popup4{
        height: 460px;
        overflow: hidden;
        background: #fff;

        .ay_cells:after{
            display: none;
        }

        .ay_cells{
            margin-top: 0;
        }
        .cont{
            background: white;
            padding: 0 20px;
            overflow: hidden;
            .close{height: 44px;}
            ul{
                height: 256px;
                overflow-y: auto;
                width: 100%;
                -webkit-overflow-scrolling: touch;
                overflow-x: hidden;
                padding-right: 8px;

                &::-webkit-scrollbar {
                    display: none;
                    width: 0;
                    height: 0;
                }

                li{
                    position: relative;
                    h3{
                        height:50px;
                        line-height:50px;
                        font-size: 16px;
                        color: #333333;
                        letter-spacing: 0.67px;
                        position: relative;
                        &:after {
                            .setBottomLine(#DFDFDF);
                        }
                        //border-bottom: 1px solid #DFDFDF;
                        em{
                            display: block;
                            width: 75%;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            word-wrap: normal;
                        }

                        span{
                            display: block;
                            position: absolute;
                            width: 25%;
                            top: 0;
                            right: 0;
                            text-align: right;
                        }
                    }
                    p{
                        display: -webkit-box;
                        display: -webkit-flex;
                        display: flex;
                        padding: 8px 0;
                        line-height:16px;
                        font-size: 12px;
                        color: #999999;
                        letter-spacing: 0.5px;
                        &:last-child{
                            border-bottom: 1px solid #DFDFDF;
                        }
                        em{
                            display: block;
                            width: 70%;
                            margin-right: 5%;
                        }

                        span{
                            display: block;
                            width: 25%;
                            text-align: right;
                        }
                    }
                }
            }
            .total{
                height:160px;
                line-height:60px;
                font-size: 24px;
                color: #FC5A3F;
                letter-spacing: 0.13px;
                text-align: right;

                span{
                    display: inline-block;
                    float: right;
                    font-size: 16px;
                    color: #FC5A3F;
                    letter-spacing: 0.67px;
                }
                p{
                    display: inline-block;
                    float: right;
                    font-size: 24px;
                    color: #FC5A3F;
                    letter-spacing: 0.13px;
                    span{
                        font-size: 17px;
                        color: #FC5A3F;
                        letter-spacing: 0px;
                        float: left;
                        margin-left: 20px;
                        position: relative;
                        top: 2px;
                    }
                }
            }
        }
    }

    /*修改样式  20170210*/
    .popup4 .icon-close{
        margin-right: -10px;
        margin-top:10px;
    }

    .ay-header-box{
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 10;
        .detail{
            background: white;
            height: 30px;
            padding: 15px 20px;
            position: relative;
            &:before {
                .setTopLine(#DFDFDF);
            }
            //border-top: 1px solid #DFDFDF;
            .date{
                height:30px;
                width:100px;
                display: inline-block;
                float: left;
                position: relative;
                &:after {
                    .setRightLine(#DFDFDF);
                }
                //border-right:1px solid #DFDFDF;
            }
            .adult{
                height: 30px;
                width: 40px;
                display: inline-block;
                float: left;
                padding-left: 10px;
                position: relative;
                &:after {
                    .setRightLine(#DFDFDF);
                }
                //border-right:1px solid #DFDFDF;
            }
            .child{
                height: 30px;
                width: 40px;
                display: inline-block;
                float: left;
                padding-left: 10px;
            }
            .price{
                width:70px;
                height:30px;
                display: inline-block;
                float: right;
                text-align: right;
                p:first-child{
                    font-size: 19px;
                    color: #FC5A3F;
                    letter-spacing: 0px;
                    -webkit-font-smoothing: antialiased;
                }
                p:last-child{
                    font-size: 12px;
                    color: #41B3EE;
                    letter-spacing: 0.05px;
                    margin-top: 2px;
                    i{
                        width: 8px;
                        height: 5px;
                        vertical-align: middle;
                        display: inline-block;
                        margin-left: 5px;
                        background-repeat: no-repeat;
                        background-size: contain;
                        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAKCAYAAAC9vt6cAAAAAXNSR0IArs4c6QAAAKtJREFUKBVjdNzybibDf4Y0BnIAI8MsJhFFwVxGBobjpOoH6QHpZVqtzfiLlZU9mIGR4TnRhgDVgvSA9DKBNO304H7OxMwSzMjA+IuQISA1ILUgPSC1YANAjL2efMf/MzLmgtj4AEgNSC1MDdwAkMB+H4FZQK/Mgkli0EA5sBokCRQDQOK4AhUWaEh6wUwMA7AGKlKgETQApAA5UNEDDd0AvHzHLR/SQBifIgBzyzPiJMqtmgAAAABJRU5ErkJggg==");
                    }
                }
            }
            p:first-child{
                font-size: 15px;
                color: #333333;
                letter-spacing: 0.63px;
                line-height: 14px;
                font-weight:500;
                -webkit-font-smoothing: antialiased;
            }
            p:last-child{
                font-size: 12px;
                color: #999999;
                letter-spacing: 0.5px;
                line-height: 14px;
                -webkit-font-smoothing: antialiased;
            }
        }

    }

    .page-inner{
        .title{
            height:50px;
            width: 100%;
            //background: white;
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

        .ticket{
            margin: 10px;
            border: #fff 1px solid;
            background: #fff;
            position: relative;
            border-radius: 10px;
            box-shadow: rgba(0, 0, 0, 0.15) 0 0 2px;

            h3{
                height:44px;
                line-height:44px;
                font-size: 17px;
                color: #333333;
                letter-spacing: 0px;
                padding: 0 10px;
                //border-bottom: 1px solid #DFDFDF;
                position: relative;
                &:after {
                    .setBottomLine(#DFDFDF);
                }
            }
            .cont{
                .flight{
                    padding: 15px 10px;
                    border-bottom: #c0c7ce 1px dashed;
                    position: relative;
                    &:before,&:after{
                        content: '';
                        position: absolute;
                        bottom: -5px;
                        background: #efeff4;
                        height: 8px;
                        width: 8px;
                        border-radius:5px;
                        border: #efeff4 1px solid;
                    }
                    &:before{
                        left: -5px;
                        -webkit-transform: rotate(45deg);
                        transform: rotate(45deg);
                    }
                    &:after{
                        right: -5px;
                        -webkit-transform: rotate(-135deg);
                        transform: rotate(-135deg);
                    }

                    .other{
                        //height:20px;
                        span.flightno{
                            border: 1px solid #FF5523;
                            border-radius: 50px;
                            font-size: 12px;
                            color: #FF5523;
                            padding: 0px 4px;
                            line-height:1.4;
                        }
                        span{
                            font-size: 12px;
                            color: #666666;
                            padding:0 5px;
                            float: left;
                        }
                        span.depdate{
                            width:75%;
                        }
                        a.airline{
                            position: relative;
                            margin-left: 6px;
                            margin-right: 6px;
                            padding-left:2px;
                            padding-right:2px;

                            &:before{
                                content: '';
                                display: block;
                                width: 1px;
                                height: 11px;
                                background: #DFDFDF;
                                position: absolute;
                                top: 1px;
                                left: -2px;
                            }

                            &:after{
                                content: '';
                                display: block;
                                width: 1px;
                                height: 11px;
                                background: #DFDFDF;
                                position: absolute;
                                top: 1px;
                                right: -3px;
                            }
                        }
                        span.number{
                            color: #FF3232;
                            float: right;
                            position: absolute;
                            right: 3px;
                        }

                    }
                    .time{
                        margin: 0 10.4% 0;
                        .set-off{
                            float: left;
                            width:42%;
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
                            width: 16%;
                            height: 55px;
                            background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAAAOCAYAAAB5EtGGAAAAAXNSR0IArs4c6QAAAUVJREFUSA3t1j1LxEAQBmA3m2ij115ldzaWgpVgcTZCCrGw90gg1VUWFqIWgtjZ5rMLyKUO6SwE/4BwHNeaAxshhQaEmA/fLQauuH8wLiyzS6p5mJmsWGO6PM+7bdv2R9O0R8dxfpcZxPKFyzmKoq2qqj6Q76YQYoYNF+eV8tfowClalvUtpTwFxrzrul1UzAsq54IMWFYKJZ8kyXpRFNe4XwFHoJVuUDF3rFEIB1VyBpQnbKnr+pGkD5xjmqYz0zQbGAzRStvC9/1LCD1wRqHcAaKOXywHLSGsihi+xf9MgUyWZRt5nj+jYw7Uu4U9ShzHvbIsJwA5hs8CKHusUVzXPQRECJAdxE/DMIa2bU91XNitIAj6dV3fI/ERQDBGxBt+xScAeVcYLAdt0zQ95H4OkEo92ICyTyAKhe1C64zDMBysAvgDBi578VjEFQMAAAAASUVORK5CYII=") ;
                            background-repeat: no-repeat;
                            background-position-y: 15px;
                            background-size: contain;
                        }
                        .set-down{
                            float: left;
                            width:42%;
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
                    &:after{
                        display: none;
                    }
                    &:before{
                        display: none;
                    }
                    .other{
                        span.number{
                            display: none;
                        }
                    }
                }

            }
            a.change{
                position: relative;
                &:before {
                    .setTopLine(#DFDFDF);
                }
                //border-top: 1px solid #DFDFDF;
                font-size: 14px;
                color: #41B3EE;
                height: 44px;
                width: 100%;
                display: block;
                text-align: center;
                line-height:44px;
            }
        }

        .hotel {
            margin: 10px;
            border: #fff 1px solid;
            background: #fff;
            position: relative;
            border-radius: 10px;
            box-shadow: rgba(0, 0, 0, 0.15) 0 0 2px;

            a.change{
                position: relative;
                &:before {
                    .setTopLine(#DFDFDF);
                }
                //border-top: 1px solid #DFDFDF;
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
                //border-bottom: 1px solid #DFDFDF;
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
            }

            .hotelsmall{
                width:100%;
                background: white;
                position: relative;
                border-top: 1px solid #DFDFDF;

                &:nth-child(2){
                    border-top:0;
                }
                ul{
                    margin: 0 10px;
                    li{
                        border-bottom: 1px solid #DFDFDF;
                        //padding-bottom: 10px;
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
                                width: 240px;
                                min-height:38px;
                                float: left;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-line-clamp: 2;
                                -webkit-box-orient: vertical;
                            }
                            .grade{
                                height:20px;
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
                            width: 73%;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-inline-box;
                            -webkit-line-clamp: 1;
                            -webkit-box-orient: vertical;
                            word-break:break-all;
                        }
                        .changeroom{
                            font-size: 14px;
                            color: #41B3EE;
                            letter-spacing: 0px;
                            display: inline-block;
                            float: right;
                            width: 56px;
                            margin-top: 3px;
                        }

                        .line{
                            margin: 14.5px 0;
                            border:1px solid #DFDFDF;
                        }
                    }
                    li:last-child{
                        .line{
                            display: none;
                        }
                    }
                }

            }



            .room{
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
                            width: 65%;
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
                        .number{
                            width: 60px;
                            text-align: right;
                            float: right;
                            position: relative;
                            bottom: 5px;
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

                }
            }

            .room.manyroom{
                .house{
                    position: relative;
                    margin-top: 20px;
                    &:first-child{
                        margin-top: 15px;
                    }
                    &:first-child:before{
                        display: none;
                    }
                    &:before{
                        content: '';
                        border-bottom: 1px solid #DFDFDF;
                        position: absolute;
                        top: -10px;
                        left: 30px;
                        width: 60%;
                    }
                    .cont .number{
                        display: none;
                    }

                }
                .house:first-child{
                    .cont .number{
                        display: block;
                        top: 50px;
                        bottom:0
                    }
                }
            }



        }

        .hotel.manyhotel{
            .room .house .cont .number{
                display: none;
            }
            .numberformanyhotel{
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

        .present{
            margin: 10px;
            border: #fff 1px solid;
            background: #fff;
            position: relative;
            border-radius: 10px;
            box-shadow: rgba(0, 0, 0, 0.15) 0 0 2px;
            h3{
                height:44px;
                line-height:44px;
                font-size: 17px;
                color: #333333;
                letter-spacing: 0px;
                padding: 0 10px;
                border-bottom: 1px solid #DFDFDF;
            }

            .subItem:last-child{
                .cont{
                    border-bottom: 0;
                    padding-bottom: 0px;
                }
            }

            .cont{
                margin: 15px 10px;
                position: relative;
                border-bottom: 1px solid #DFDFDF;
                padding-bottom: 15px;

                .left{
                    width: 64%;
                    float: left;
                    display: inline-block;
                    p.type{
                        font-size: 14px;
                        color: #999999;
                        letter-spacing: 0px;
                    }
                    p.tit{
                        font-size: 16px;
                        color: #333333;
                        letter-spacing: 0.67px;
                        line-height: 20px;
                        overflow : hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                    }
                    p.num{
                        font-size: 14px;
                        color: #666666;
                        letter-spacing: 0px;
                    }
                }
                .right{
                    width:35px;
                    display: inline-block;
                    float: left;

                    .vmiddle{
                        position: absolute;
                        right: 0;
                        top:50%;
                        transform: translateY(-50%);
                    }
                    p:first-child{
                        text-align: right;
                        font-size: 14px;
                        color: #FC5A3F;
                        letter-spacing: 0.59px;
                        line-height:1;
                    }
                    p:last-child{
                        text-align: right;
                        font-size: 12px;
                        color: #999999;
                        letter-spacing: 0.5px;
                    }
                }
            }
        }

        .fun{
            margin: 10px;
            border: #fff 1px solid;
            background: #fff;
            position: relative;
            border-radius: 10px;
            box-shadow: rgba(0, 0, 0, 0.15) 0 0 2px;
            h3{
                height:44px;
                line-height:44px;
                font-size: 17px;
                color: #333333;
                letter-spacing: 0px;
                padding: 0 10px;
                border-bottom: 1px solid #DFDFDF;
            }
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

            .cont{
                margin: 15px 10px 7.5px;
                position: relative;
                border-bottom: 1px solid #DFDFDF;
                padding-bottom: 15px;
                &:nth-last-child(2){
                    border-bottom: 0;
                    padding-bottom: 0px;
                }

                .left{
                    width: 64%;
                    display: inline-block;
                    float: left;
                    p{
                        font-size: 16px;
                        color: #333333;
                        letter-spacing: 0.67px;
                        line-height: 20px;
                        overflow : hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                    }
                }
                .right{
                    width:88px;
                    display: inline-block;
                    float: right;
                    p{
                        text-align: right;
                        font-size: 12px;
                        color: #999;
                        letter-spacing: 0.5px;
                        white-space: nowrap;
                        overflow: hidden;
                        width: 100%;

                        span{
                            font-size: 14px;
                            color:#FC5A3F;
                        }
                    }
                }

                .contnum{
                    height:30px;
                    margin-top: 7.5px;
                    input{
                        border: 0;
                        width: 25px;
                        color: #333;
                        font-size: 17px;
                    }
                    span{
                        border: 1px solid #DFDFDF;
                        border-radius: 10px;
                        font-size: 14px;
                        color: #999999;
                        line-height: 30px;
                        text-align: center;
                        margin-left: 0px;
                        padding: 6px 11px;
                        box-sizing: border-box;
                        vertical-align: super;
                    }
                    span.active{
                        border: 1px solid #FF5523;
                        color:#FF5523;
                        position: relative;
                    }
                }
            }

            .cont.borderclass{
                border:0;
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
            padding:0;
            display: inline-block;
        }
    }


    i.bluedown{
        width: 8px;
        height: 5px;
        vertical-align: middle;
        display: inline-block;
        margin-left: 5px;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAKCAYAAAC9vt6cAAAAAXNSR0IArs4c6QAAAKtJREFUKBVjdNzybibDf4Y0BnIAI8MsJhFFwVxGBobjpOoH6QHpZVqtzfiLlZU9mIGR4TnRhgDVgvSA9DKBNO304H7OxMwSzMjA+IuQISA1ILUgPSC1YANAjL2efMf/MzLmgtj4AEgNSC1MDdwAkMB+H4FZQK/Mgkli0EA5sBokCRQDQOK4AhUWaEh6wUwMA7AGKlKgETQApAA5UNEDDd0AvHzHLR/SQBifIgBzyzPiJMqtmgAAAABJRU5ErkJggg==");
    }
    i.greydown{
        width: 8px;
        height: 5px;
        vertical-align: middle;
        display: inline-block;
        margin-left: 5px;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAKCAYAAAC9vt6cAAAAAXNSR0IArs4c6QAAAKNJREFUKBWdUEEKwyAQdBV69zm99Q8BPyDm1gdV8S+55Sn9Q0DsToiS2kZIFgbd3ZlBh15cQoiRcaW81Fo/WTlfUM/QSmPMwuKB8T5hAu4ALRVRjPGeUppyzrcy+3cS0aKUelhr11fLQsKAl/hOt8ApYhCrARrnnOcDOCq/cer+ywDTTqhraFW5XX4MDkKtobUGNcR2UULFfB9ay+v2IYQR6JE+HAo33NpkSt8AAAAASUVORK5CYII=");

    }

    i.iconshu{
        width: 2px;
        height: 13px;
        vertical-align: middle;
        display: inline-block;
        margin-left: 5px;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAYCAYAAADQ+yzZAAAAAXNSR0IArs4c6QAAABZJREFUCB1jvH///n8GIGACESAwPBgAF68DzKurHmwAAAAASUVORK5CYII=");
    }

    i.add{
        width: 30px;
        height: 30px;
        vertical-align: middle;
        display: inline-block;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAABMVJREFUaAXlW01oE1EQntlKlILk4E9bvQhWRRARPBShVntTEASh1YqiJ0XBk9qL6EE9+XPyIHpSFKsVBEGwt/pTEA+CeJFqRS/+6yEUigab5zdvN+lmd7PJJptNNjuQ7Nu3b2fm2/ezk3lfmOok6tDGdspkeknRRiK1hojxUZ2keCFMykdkmlhN49o3XJvEcZKYXlE6PcHXX82YTcL95jDVqf3rl1J2Zi/l1C443wMQqer0cxb3viSDH1Cq/Q7fevOjOj3uu0IBrAZX9ZFSJ6F+Gxyd5zZTSw3/w91jxHyRR98/q0WT3FsTYDW4sh9D9iz09NbqSIX3T1Abn+a7U08qbO9qVhVgtW9tF2WzlwF2yKUxigqmEUqljvPtt1+DmgsMWO1evZ1ysyMwlA5qLOT2GTLahvjeu8dB9BpBGmMIHyc1+wj3NBqsuJ0WX7RPAUBU1MPqWPd8+q6uYQgfCKA7uqZMN6mDD/OVqb/ljJYFrAa6l0DJQ6y+m8opa+x1fgH7O/n+1E8/P3yHtO7ZWIAViLpDHlo+l8TsC1gP46bvWTs2gJap5yMlAZsLVJPOWR9Ass74LWSec1i/emQ1VlTygfjZbPg1phxx2w6vV5YLsA4q/mbfwulmePXU8uwyND+11hmcuHtQIqj4g5UHldbRoOORFfWw2tO9lWbVuKNNvE/buN8eexf38Kw6F290Ht47MBUAI8DYguZR/erx8KxuVb0WNm2gABhnJ+pm0q54Qx/R1efmR8rRSAGbnsM6U/Fn5nP4P9490AjYRV3mhV9fiI5GARpJhAXtyyVzYvawpGVCz1R4gJWqPFgpL14m3xEIsjAaI1mBhc5BRWC3kSYsjIbOLuqEWyO9icI29whWQ6dSq84uRuFoWDaQQUXa2EC8jLxxQgRYsWhJkjwpotYAsOwIJEVYAGP7IzGiOueZez2qdsgSNR06H/zdOjrlb/v3V6Jrp4heP/NvV8lV7Gsx4kxk+qrdA7JZsUdQtupQigL6yOYQVHEWQzpZIoCxXRmCyLCTnghbJN4W3eHINCPh9RHv4hXh6KtAi3PODnZXcFNITZg+oYdlMzopwt8AWHbekyJqUno4QYAZgIVTkRQBVkMIJOhlcCpaXYARWA2TLQMCScuLeilY5T2MvAfYMq0uFkYTMKhBGNbClqm/2IMTe7muloFNY7RyWhYPaqyuNvPK8xGZgA0vgsprL3Ucy3O9ClstJtcq97TUHbGuZ2NLnuNVACyA1MBKJI1bbvdhgu9/KPzUMudwvvuYzuSLLXMEkc2OpQgwj34YRyAyYm8Q6zKw2HcOBUsRYA0ODDccM7oc76+MsPWcEFyA9Y45GG7o6ZyzcWzOxXdh6XlQE12ABZTFjRiODUC3o8Ne/A6Nzd12rgbJgRvCipmriUEJrDysRQdLeerZw4XGoPOhv18Uzpu+AF+1z6UdLXoPezVLFPVQHoDmLnZSPxaxm14PpCnqxDf4WI5nqfEEcdhiuF1oGsKa+SYZxpwVqlVFUnZIO7UkiiAu4PVyD4ZbQyMyiQaFZReQDa/9d/ZgkHOLyCbcrqjoTo35k4fzoVg8KKEG1e9vPESXsCg9ddoOeh54DvsZUEPrOij3Z6jl/6jl9RCa9a94/wFNI4+djOYmNAAAAABJRU5ErkJggg==");
    }

    i.minusorange{
        width: 30px;
        height: 30px;
        vertical-align: middle;
        display: inline-block;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAABIxJREFUaAXlW01oE0EUfi8pUQoSxL9WL0KrIogIHkSo1d4UBEFotaLoqeLBU7UX0YN68ufkQerJolhtQRAEe/OvID0UxItUK3rR+ksJhaLBZvze7Jomu5ufTTbJ/jxIdnd25s375s3OzL75lqlGovq2N1Mq1UGKthOpTUSMn2ohxctQpfxE5ojVHO59xb0pHKeIaZKSyXG+NTlvZPH2n71Up45tXU3p+SOUUQdh/A6ASFSmn9MoO0ExfkiJ5nt85833yvTYS3kCWPVs6CSlzkL9XhjaZK+mmhT+i9JjxHyVR96/qEaTlK0KsOpp60KXvQg9HdUaUmb5cYrzeb4//azM/LZsFQFWRze3Ujp9HWB7bRrrkcA0TIlEP999O+O2OteA1aGN+yizMIyKkm4r8zh/imLxXn7w7okbvTE3mdGF+0ktPEaZRoMVs5Nii7bJBYiyPKxOty+hb2oQXfi4C931y8o0RGv4JN+Y/lOq0pKAVXf7Kih5hNF3Zylljb3Pr1D/AR6d/lHMjqJdWns2EGAFonbII9PmgpiLAtbd2PeezcUG0PLoFZGCgI0ByqfPbBFAMs4UG8gcn2E99chorKhggxSrs+H3mDLE8f1OU5YNsF5U/Em/hdF+mHqqabsULUlsti5O7B6UFVTwwUpDJfVq0NJkeR5Wh9v30IJ6askT7Ms4d+WuvfM9vKAuBRudg/UWTFnAWGDsRvZ6vfU4WFazpA4Tm64gCxhXZ2pWZeMVZ7HpZ1hHKn7Pf/b+5b3xSA0LEERY2rxOIieGhyUs43mkwi9gxQ5EYTRGMhcWOgblJwNrYIuJkXV0cTY1i1aoMOBWA+NqohKBweXJ5TEdSg09WGlBOBRh4xjWy4gbR0SAFYOWBMmjImoTAMuOQFSEBTC2PyIjqqXJ2OtR1UPe1knUd5lo5drqdeVq+DVDNHiO6PWL3NTKzrGvxVhnItLnwZR08yXRitbKDClVSkCf2lUqVxn3OY0uHS0RwNiu9ECk24knvJafX4wu7Y3eOUbA6yPm4vXe6PO5FqZP8LBsRkdF+CsAy857VERNiYcjBJgBWDgVURFgjQmBBF4GpyLsAozAGjPYMiCQhF7UhGCVeRhxD7Blwi4mRgMwqEHo1sKWCakAm8ZoxrRMHtRYSNEKrLH/XC/Dw5IEHpQcQik52PL3lrrb8MoTut2HcR79kH3VWvSwuJbpQug8DCJbLqY8wDzy4SlAD+dmCPQ5sOTuHAqWPMAaHBhuOKb0ebD/UsLWs0KwAdY75mC4wdMZa+bAXIvtwtJzoCbaAAsokxsxEBiAdkMHnPgdGps972IKggO3hRWzmBKAM7DyMBadKGSpo4ezmUHng79fZa99fwJbtc2FDc2bh52yRYp6KA2guYst1IVBbMipQXyRJrbBxlI8S43HjcEmw+2KbwhrxkwygGdWqFZlSckubdUSKYK4gNfDPRhuDV2RyWpQWHYu2fDafqsH3VybRDbhdtWL7tSYjzysjWLyoIQaVLvPeIiuYVB6bq3b7bXrZ7hYBap3yxrK/O4N/YdaTo3g10/x/gGD2Xe9foozegAAAABJRU5ErkJggg==");

    }
    i.minusgrey{
        width: 30px;
        height: 30px;
        vertical-align: middle;
        display: inline-block;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAABI9JREFUaAXlm01LG0EYxzdrMFqQUqRtYvHtFDz3UArS1luFQqG39GJv/QBab/ZQj60fwFu9tDdBEOrNtgjioefiydea2CJFhGgkxv7/25mwu9msm+yumd0MLJOZzDzz/OaZmZ3MPEloIYWDg4Mb5XJ59OLi4j6ayCYSiSziNJ6ey8vLHjaLvBNEfArI20S82dHR8SOZTK719fUVkQ48JIKUWCgU7pyenr6EzBd4HuDpbFL+Oept4Fns7u7+lE6nfzcpp6ZaIMC7u7uPKpXKG0h/Cksla1rxkYFRUEb1FV3X3w8MDHz3Icqo6gt4e3t7DFLeAXLUryJe6gN+DW3NDA8Pf/VS3qlMU8AAzUDYHBrPOQkNOw/gn9HG5NDQUL7RthoGBuw4QNngzUYbC7j8McBzgP7SiFy9kcKAnUT5ZTythqXa1GFZ6MS0p+DJwrBoCoLnIXHCk9TrL7QAS7+GxUtXNX0lcD6fv10qlZYA/fAqYa38HrDrqVTqeSaT+eOmh+uQpmWjAEtAGkTommoamMNYdcua4airmHrmbMvnuhYWi4Gqc9YCYUtMCN1t2f+TjnMYFcbx9TJ6rG6HOEpTJBPzuQJVnjm9smqAAZsB6E9UUOHV46cL+Z4esW9OnCw4FwNYdhQNRhZLsFh4a2vrCb5dtZSIfmLMvPe2WBhDYDb6fFYCO1MVeG9v7zHm7rX86rGqFG6KTGSTrVSBcTIxJTPjFpvZjDnMk4qzs7Nf6I1Af7yr0nEY1uWurq57PDkxLMxjmbjCstPJJo6eNDmkeQYV92AwJni6iE33X9A2e+AWlY46x6+pWzqPUtsAlkbpJKsuzo2jYiVfepKVczjrS0q0Kmd1LNltA0xWWpjXH+0S0txoGPc8folxJaL19vZquBfyK8pSHwuNdnR0pOE9aslvMtGj46UcCHAYsIRiB1J2EIGscuMRhLxIyOCixetK34HDjsMv6CCHdBByycoJR2DfY4ZzbH9/Pwi9wpRxwiFdCLMFxWQXuGhtKqZUaOqQlRZuG2Cy6vSpCK1LFRNMVp0OJNCLPhVxD+dk1YW3DB1I4h42yCo3HotxpwWfwWgA0zUIL+Xgdw2K9CLZyEh1DGDhB7WiiH5hqLEifb3kkNboBxVGSyrINLNVgen0BdNzxY5VIJPZoa0KLCjfxooWMNhdzZiZLMC4S11Fj9AHKxaBLOabQ0JZgAXlJOJj8TnKERnIYgk1wLwxR8/k8NBtIJKBupPBfvtPmBpgZqIg3fmm+TmiYVow1Khv8QCwfwuPgI/Ii5onzwLm7Ss7i0y7AmOFS+3s7KwiVtoLrwoDb7zBwcExDOeSzLPHjkNaFmJFuvMhXpd5qsbUUehaF5a6u1pYwtHScGeaR1rV4e3ZudTVwhKYlua8QDyFR5nVm7pQJ6Gbq2WrLPKD15heerA4NyetdlwL30GcncLlHr06gqdlOzK2TR3qvXrcjOdpDtcTQEc2NDwLi1+LuxPaas2fPOwdQD8o4RoU2t94cAD3ob+//5u97UbTvixsb+zw8PBusVjMIT/ef9SygzOt6l/x/gHR4LJ3oqruWwAAAABJRU5ErkJggg==");

    }

    i.iconmore{
        width: 14px;
        height: 14px;
        vertical-align: middle;
        display: inline-block;
        margin-left: 5px;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAAAXNSR0IArs4c6QAAAfNJREFUWAnt181KAlEUAOB7RjMKw5QI2oW0atEzVEqGPxSR2za9RG2iB+gdeoAWUuAPobkLgra2q72VWkSLSD3dI80w2uiMd+5Qwb2b8f6d83F05o6MqaYqoCqgKqAqoCqgKqAq8BcrkCi9L2RrGPgNWxbRt1lsLR5X0T+YH/SB7DVOPTdfCgxxFQCaGsO9cjqS1+e9vsaKzRXsQA4Rozz/A9Ng4yo5e6/n1fQPjUZrn5DU54sjHQa5eL61pc97eSVktw0VQn7njwLikTmnAWUaC5onuHaig+zMa6yO5OWZM+dHZNPmvgGFycApMKibJ73GDkPyr/7DD9qJ2WJAK/FgHXz+dY59NC/wCjsKiajtXKZCN2aHcTPpg7HC2zJ22lVkOK+P9a4Anz5g2XIqfN43LtCxQ1YzocJg2B9QWuAlVgRJJkuoV1hR5EiobKwbpC1UFtYt0hHULVYG0jFUFCsLORbUDsvnd6vp8AWtoyYTSfGG3vU0adVGPbr4+h5WNpIcY0Np0ygsP+oOu8gOBs9uOhbpxLF6mFNMuyYEpaBDsRYZ3SIppDCUNjvBykC6htphZSGlQIdhZSIph/GaRx3RVknO3PFXxDX+O6r1YgA8AWjbojeOqMPxPvpzlii9LmVuse/t3HEAtVBVQFVAVeD/VeALNF2Ict3F48wAAAAASUVORK5CYII=");
    }

    i.iconin{
        width: 14px;
        height: 14px;
        vertical-align: middle;
        display: inline-block;
        margin-left: 5px;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAAAXNSR0IArs4c6QAAARdJREFUWAntlLsNwjAQhmMKHhmBVWhpWACJlhFYgJ6ah8QAtDAAjICYgjUIf6RYsSzLCYejXPFbOvmVu3z5ZCfL2NIaMGnL1dWKophhtkA8jTHXekfRCJBzxAdh2wGDzqSIPx1QZ0vo9Ed1sADaOIDuUBcsyIaIu0vojNXBTggrvj2RRFil2Ygf+RbNyt3FM2k27ke+S7Nyd/FMmo37ke82mF3LK3eQCdgc8Ub47TLo4H3/lNwheRoo8Aqs9bMEhXtfYzV/oB/1Q+W9tQEy9x7vZ0rIVN5pkiZxBtDKXxBvd+vTAFuxnzlN0mRrA6kexJlcIUJNz+0uPxaEpwClLsgKdOmB6oO0xwega8QNsUWM7Tp7GvjRwBfRSSIKrp39mAAAAABJRU5ErkJggg==");
    }

    i.icon-grade{
        width: 10px;
        height: 10px;
        vertical-align: top;
        display: inline-block;
        margin-right: 1px;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAZxJREFUOBGtk71KA1EQhWfWTUysrSxMaZFCBX8KGyNJyAMIIhIUrNT0FlYWgj6AFoIgBCMiPoBBjI2FiYWCCIKVtbUJ2ch45ia7mF9CkoXdO/fMme/OvbvLVLsktxigSnGPSFZIZJyYvxFnach/xEuPH2qT+4UJ+i3vEnEcnlF4vhBfkR084MhDST3sGSvODUrCOq+7mEsoTBpNJA1QoC5fnbyR7V/WhRmd2eT8PAM22cJYlZgcEwj52nqIX8k3MmNjm6mOMCV0BLlLoCGwLLgTrtT/KAkLq0/3D6oRwLKIZXhgQLCwZX4fGBAsACkzOCBlLBoLnaLLz/6hYIBlcfi6jM87hVt6hmotGMrSLRPH8reQDnsGotYwlOVCRITpbl5/rTVX62pkvqDoU5KZzQ5Nh1pohGhoHUG6K1C1KE2ocWFGaiyudXqMTrcac3VzphOK5lP/YZr3OnTNasB5bKPTfVdrGpHjWGGnEaY+7wybiiBIdm4VjjN0GzR55iJe3ibH85et/Kp1BKpBcrNT5PC5xuSTDY4UXkzc5vEHFL+BhCUwUu0AAAAASUVORK5CYII=");
    }

    i.icondel{
        position: absolute;
        top: -1px;
        right: -1px;
        height: 12px;
        width: 12px;
        display: inline-block;
        border-bottom-left-radius: 7px;
        border-top-right-radius: 7px;
        background: #FF5523;
        background-size: 60%;
        background-position: center;
        background-repeat: no-repeat;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAYAAADtc08vAAAAAXNSR0IArs4c6QAAAOZJREFUKBWVkrENwjAQRSNBRwGIihUQBaRgAliAEtExFC0jIAoKCiTWQQTYILyfyJbtOI446cXx3f3v2E6WEWVZ9mANY81TQc8QNtC3fUyOoPjAyhaCF2oLeIHiZMtMzlWqfnwZGibkJC7qlup5cw1mpJ5O0TMhL7FZWW1v5ayBXkjMoWGiRgjFuSc2kxYT97O1clycMEFTRbfYMdkZlTMeTD05Igj3bDy8g42aRMT67MbB/iPOMYjejmfSsrI97aQJxQl03nOLyVQ/0BZMJK+KpnA7exkM4AIPWHp7i0zokckdrjD6ASnFEdH47PRsAAAAAElFTkSuQmCC");
    }

    .page.choose{
        .ay-header-bar .ay-header-title, .ay-header-bar h1{
            color: #333;
        }

        .ay-header-bar{
            background-color: white;
        }
        .ay_tab{
            .ay_tabbar{
                .next{
                    width: 100%;
                    background: #FF5523;
                    height: 44px;
                    padding: 0 20px;
                    position: fixed;
                    z-index: 10;
                    bottom: 0;
                    p{
                        width: 285px;
                        line-height:44px;
                        font-size: 17px;
                        color: #FFFFFF;
                        span{
                            font-size:12px;
                            margin-left: 10px;
                        }
                    }
                    i{
                        position: absolute;
                        right: 58px;
                        top: 50%;
                        transform: translateY(-50%);
                    }
                }
            }
        }
    }

    .present-price{
        font-family: STHeitiSC-Medium;
        font-size: 17px;
        color: #F6A623;
        letter-spacing: 0.36px;
    }


    .fix-choose{
        .popup3{
            .ay-slider > .ay-swiper > .ay-swiper-item{
                border-radius: 10px;
                overflow: hidden;
                .ay-swiper-desc{
                    display: none;
                }
            }

            .ay-slider > .ay-indicator, .ay-slider .ay-indicator-right{
                bottom: 6px;
                height: 10px;
                a{
                    line-height: 10px;
                }

            }
        }
    }
</style>
<script>
import { go } from '../../libs/router'
  import {ViewBox,Headerbar,Search,Tab, TabItem,Popup, Group,XNumber, Cell, Scroller, Tabbar, TabbarItem,Swiper,SwiperItem,Actionsheet,Spinner} from '../../components'
  const imgList = [
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1484542331913&di=9777fc4ad0ddb9ecf0421fe41eb7cdc1&imgtype=0&src=http%3A%2F%2Fi0.hexunimg.cn%2F2015-11-15%2F180575318.jpg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1484542331913&di=b79579ac34bc8c3413ab8918d5a0fc1f&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201508%2F21%2F20150821000811_Ghet2.jpeg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1484542331912&di=8046b334487f5a3e7846b43aaa6d7ffc&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201508%2F21%2F20150821001021_y2MFk.jpeg'
 ]

import store from '../../vuex/store'/*0228 F*/
const commit = store.commit || store.dispatch /*0228 F*/

  export default {
    components: {
      // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
      // 否则挂载点和组件名字一致, 即vhead
      ViewBox,
      Headerbar,
      Search,
      Tab,
      TabItem,
      Popup,
      Group,
      XNumber,
      Cell,
      Scroller,
      Tabbar,
      TabbarItem,
      Actionsheet,
      Swiper,
      SwiperItem,
      Spinner
    },
    data (){
      return {
        selectedData:{},
        roomDetial:{},
        roomNumList:[],
        curRoomItem:{},
        curRoomSinglePrice:0,
        giveAddProduct:{},
        packageAddProduct:[],
        curAddPackageItem:{},
        //屏幕宽度
        clientWidth:375,

        showPagedate:true,
        showPagechoose:false,
        shownext:true,
        showroomnum:false,
        showmoney:false,
        showroombrief:false,
        demo04_list: imgList,

        //数据
        mainData:{},
        dateData:[],
        saleData:{},
        pleasedData:{},
        calendarData:[],
        flightData:[],
        hotelData:[],

        //radio
        jsj1Min:0,
        jsj1Number:0,

        //展开收起
        isOpenFun:false,
        childNumber:0,
        adultNumberMin:true,
        childNumberMin:true,
        alertContentShow:false,
        showBook:true,
        tempImgobj:[]
      }
    },
    computed:{
        total:function(){
            if(this.selectedData.calTotal!=undefined)
            {
                return this.selectedData.calTotal()
            }
            else
            {
                '...'
            }
        },
        subTotal:function(){
            if(this.selectedData.calAirTotal!=undefined&&this.selectedData.calHotelTotal!=undefined)
            {
                return this.selectedData.calAirTotal()+this.selectedData.calHotelTotal()
            }
            else
            {
                '...'
            }
        },
        checkOutDate:function(){
            if(this.selectedData&&this.selectedData.hotel)
            {
                if(this.selectedData.depDate&&this.selectedData.hotel.StayNights)
                {
                    return this.dateAdd(this.selectedData.depDate,this.selectedData.hotel.StayNights)
                }
            }
            return ''
        }
    },
    methods: {
      back:function(){
        window.history.back()
      },
      returnTop:function(){
        document.querySelector('.page-inner').scrollTop = 0
      },
      removeParent:function(){
        alert('从数组中删除选中日期')
      },
      setScrollTop() {
        if(!sessionStorage.getItem('top')){
           //
        }else{
            setTimeout(() => {
                document.querySelector('.page-inner').scrollTop = sessionStorage.getItem('top')
                sessionStorage.setItem('top',  0)
            }, 50)
        }
      },
      recordTop() {
        sessionStorage.setItem('top',  document.querySelector('.page-inner').scrollTop)
      },
      OpenFunFunc:function(item){
        item.isShow=!item.isShow
        for(var i=0;i<item.addProductList.length;i++)
        {
            if(i<2)
            {
                item.addProductList[i].isSubShow=true
            }
            else
            {
                item.addProductList[i].isSubShow=item.isShow
            }
        }
      },
      popuproombrief:function(){
        this.showroombrief = !this.showroombrief
         if(this.showroombrief){
            this.$refs.picwall.rerender()
        }
      },
      popuproomnum:function(){
        this.showroomnum = !this.showroomnum
        //this.showmoney = !this.showmoney
      },
      popupmoney:function(){
        this.showmoney = !this.showmoney
      },
      takeData:function(){
        //   this.$http.get('/static/tour_main.json').then((response) => {
        //   success callback
        //   debugger
        //   var data = response.data
        //   this.hotelData = data.HotelPriceList[0].HotelList[0]
        //   for(var i in this.hotelData.RoomPlanList){
        //     var temp = this.hotelData.RoomPlanList[i]
        //     for(var j in temp.RoomList){
        //         temp.RoomList[j].CheckInDate = temp.RoomList[j].CheckInDate.substr(0,10)
        //         temp.RoomList[j].CheckOutDate = temp.RoomList[j].CheckOutDate.substr(0,10)
        //     }
        //   }

        //   for(var i in data.AirPriceList){
        //     var tempdata = data.AirPriceList[i].AirTicketList[0].AirProductSegmentList
        //     for(var m in tempdata){
        //         tempdata[m].ArriveTime = changeTime(tempdata[m].ArriveTime)
        //         tempdata[m].LeaveTime = changeTime(tempdata[m].LeaveTime)
        //     }
        //     data.AirPriceList[i].AirTicketList[0].AirProductSegmentList = tempdata
        //    }
        //   this.flightData = data.AirPriceList
        //   this.changeDataNum()

        // }, (response) => {

        // });
        var vm=this
        if(g_air_list.length==0)
        {
            var flightParam={
                "ProductID":vm.selectedData.pid,
                "DepartDate":vm.selectedData.depDate
            }
            api.post({
                path: api.config.microServiceHost.packageurl,
                controller: 'Combined',
                action: 'Select_AirSolution_List_ByProductIDAndDepartDate',
                param: JSON.stringify(flightParam),
                useCache: false,
                useProxy: true,
                callback: function(obj) {
                    if (obj.ReturnCode == 0) {
                        var data=obj.Data
                        for(var i=0;i<data.length;i++)
                        {
                            if(i==0)
                            {
                                data[i].isSelected=1
                                g_selected_data.air=data[i]
                                g_selected_data.air.airCount=data.length
                                vm.selectedData.air=g_selected_data.air
                            }
                            else
                            {
                                data[i].isSelected=0
                            }
                        }
                        g_air_list=data

                        commit('UPDATE_LOADING',false)/*0228 F*/
                    }
                }
            })
        }
        else
        {
            vm.flightData.push(vm.selectedData.air)
            commit('UPDATE_LOADING',false)/*0228 F*/

        }
        if(g_hotel_list.length==0)
        {
            var hotelParam={
                "ProductID":vm.selectedData.pid,
                "DepartDate":vm.selectedData.depDate
            }
            vm.showBook=false
            api.post({
                path: api.config.microServiceHost.packageurl,
                controller: 'Combined',
                action: 'Select_HotelStay_List_ByProductIDAndDepartDate',
                param: JSON.stringify(hotelParam),
                useCache: false,
                useProxy: true,
                callback: function(obj) {
                    if (obj.ReturnCode == 0) {
                        var data=obj.Data
                        if(data&&data.length>0)
                        {
                            g_selected_data.stayPlaces.splice(0,g_selected_data.stayPlaces.length)
                            var roomNum=Math.ceil((vm.selectedData.an)/2)
                            for(var i=0,len=data.length;i<len;i++)
                            {
                                var stayItem={}
                                stayItem.StayID=data[i].StayID
                                stayItem.StayName=data[i].StayName
                                stayItem.StartDay=data[i].StartDay
                                stayItem.EndDay=data[i].EndDay
                                stayItem.hotel={}
                                stayItem.hotelPlan={}
                                if(data[i].HotelList&&data[i].HotelList.length>0)
                                {
                                    for(var j=0,lenj=data[i].HotelList.length;j<lenj;j++)
                                    {
                                        for(var k=0,lenk=data[i].HotelList[j].RoomPlanList.length;k<lenk;k++)
                                        {
                                            data[i].HotelList[j].RoomPlanList[k].roomNum=roomNum
                                        }
                                    }
                                    stayItem.hotel=data[i].HotelList[0]
                                    stayItem.hotel.hotelCount=data[i].HotelList.length
                                    stayItem.hotel.roomPlan={}
                                    if(data[i].HotelList[0].RoomPlanList&&data[i].HotelList[0].RoomPlanList.length>0)
                                    {
                                        stayItem.hotel.roomPlan=data[i].HotelList[0].RoomPlanList[0]
                                    }
                                    
                                }
                                else if(data[i].HotelPlanList&&data[i].HotelPlanList.length>0)
                                {
                                    for(var j=0,lenj=data[i].HotelPlanList.length;j<lenj;j++)
                                    {
                                        data[i].HotelPlanList[j].roomNum=roomNum
                                    }
                                    stayItem.hotelPlan=data[i].HotelPlanList[0]
                                    stayItem.hotelPlan.hotelPlanCount=data[i].HotelPlanList.length
                                }
                                g_selected_data.stayPlaces.push(stayItem)
                            }
                            vm.selectedData.stayPlaces=g_selected_data.stayPlaces
                            g_hotel_list=data
                            vm.showBook=true
                        }
                        commit('UPDATE_LOADING',false)/*0228 F*/
                    }
                }
            })
        }
        else
        {
            commit('UPDATE_LOADING',false)/*0228 F*/
        }
        if(g_selected_data.addProducts.length==0)
        {
            var addProductParam={
                "ProductID":vm.selectedData.pid,
                "DepartDate":vm.selectedData.depDate
            }
            api.post({
                path: api.config.microServiceHost.packageurl,
                controller: 'Common',
                action: 'Select_AddProduct_ByProductIDAndDepartDate',
                param: JSON.stringify(addProductParam),
                useCache: false,
                useProxy: true,
                callback: function(obj) {
                    if (obj.ReturnCode == 0) {
                        var data=obj.Data
                        g_package_add_product=data
                        if(data.GiveAddProduct)
                        {
                            vm.giveAddProduct=data.GiveAddProduct
                        }
                        if(data.NoGiveAddProduct&&data.NoGiveAddProduct.length>0)
                        {
                            for(var i=0;i<data.NoGiveAddProduct.length;i++)
                            {
                                data.NoGiveAddProduct[i].isShow=false
                                data.NoGiveAddProduct[i].total=0
                                for(var j=0;j<data.NoGiveAddProduct[i].addProductList.length;j++)
                                {
                                    data.NoGiveAddProduct[i].addProductList[j].isSubShow=j<2
                                    data.NoGiveAddProduct[i].addProductList[j].num=0
                                }
                                
                            }
                            g_selected_data.addProducts=data.NoGiveAddProduct
                            vm.selectedData.addProducts=g_selected_data.addProducts
                        }

                        commit('UPDATE_LOADING',false)/*0228 F*/
                    }
                }
            })
        }
        else
        {
            vm.selectedData.addProducts=g_selected_data.addProducts
            vm.giveAddProduct=g_package_add_product.GiveAddProduct
            commit('UPDATE_LOADING',false)/*0228 F*/
        }
        
        this.changeDataNum()
      },
      openRoomBrief:function(item){
          this.roomDetial=item
          this.showroombrief=true
          this.tempImgobj = []
          for(var i = 0;i < this.roomDetial.RoomPicList.length; i++) {
             var tempobj = {'img':this.roomDetial.RoomPicList[i]}
             this.tempImgobj.push(tempobj)
          }
          this.$refs.picwall.rerender()
      },
      closeRoomBrief:function(){
          this.roomDetial={}
          this.tempImgobj = []
          this.showroombrief=false
      },
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
      closeRoomNum:function(num){
          this.curRoomItem.roomNum=num
          this.showroomnum=false
      },
      dateAdd:function(dateStr,days){
          return api.dateAdd(dateStr,days)
      },
      addPackageProduct:function(val,item){
          item.num=val
      },
      toBook:function(){
          /*console.log("开始提示")
            this.alertContentShow = true
            let temp = this
            setTimeout(function(){
                temp.alertContentShow =false
            },1000)
            console.log("结束提示")*/
          var url='http://mbook.aoyou.com/S/Create/IndexForCombined.html?'
          url+='pid='+g_selected_data.pid
          url+='&pt='+g_selected_data.tid
          url+='&adult='+g_selected_data.an+'&child='+g_selected_data.cn
          url+='&airid='+g_selected_data.air.AirPlanID+'&dt='+g_selected_data.depDate
          var hotelslns=[]
          for(var i=0;i<g_selected_data.stayPlaces.length;i++)
          {
              var stayItem=g_selected_data.stayPlaces[i]
              if(stayItem.hotel&&stayItem.hotel.HotelID)
              {
                  var hotel=stayItem.hotel
                  if(hotel.roomPlan&&hotel.roomPlan.PlanID)
                  {
                    hotelslns.push(hotel.roomPlan.PlanID+'_'+hotel.roomPlan.roomNum)
                  }
                  
              }
              else if(stayItem.hotelPlan&&stayItem.hotelPlan.HotelPlanID)
              {
                  var hotelPlan=stayItem.hotelPlan
                  hotelslns.push(hotelPlan.HotelPlanID+'_'+hotelPlan.roomNum)
              }           
          }
          var ds=[]
            for(var i=0,len=g_selected_data.addProducts.length;i<len;i++)
            {
                var typeList=g_selected_data.addProducts[i]
                for(var j=0,lenj=typeList.addProductList.length;j<lenj;j++)
                {
                    var subItem=typeList.addProductList[j]
                    if(subItem.num>0)
                    {
                        if(subItem.selectedDates!=undefined&&subItem.selectedDates.length>0)
                        {
                            var tmpArr=[]
                            tmpArr.push(subItem.selectedDates[0])
                            if(subItem.selectedDates.length>1)
                            {
                                tmpArr.push(subItem.selectedDates[subItem.selectedDates.length-1])
                            }
                            var dateStr=tmpArr
                        }
                        else
                        {
                            this.showAlert()
                            //alert('请选择附加服务：'+subItem.AddProductName+' 的日期')
                            return false
                        }
                        //var dateStr=(subItem.selectedDates!=undefined&&subItem.selectedDates.length>0?subItem.selectedDates:subItem.DatePriceList[0].Date.split('T')[0])
                        ds.push(subItem.AddProductID+'_'+dateStr+'_'+subItem.num+'_'+subItem.AddProductSubType+'_'+subItem.AddProductType+(subItem.element_detailKey_str!=undefined&&subItem.element_detailKey_str.length>0?'_'+subItem.element_detailKey_str:''))
                    }
                }
            }
          url+='&hotelslns='+hotelslns.join('|')
          url+='&ds='+ds.join('|')
          //window.location.href=url
            if (api.IsIOSClient()) {
                  window.location.href=url
                }
             else if (window.action != null && window.action != undefined)
              {  
                 window.location.href=url
              }
              else
              {
                  window.location.replace(url)
              }
 
         
          //api.pageGoTo(url)
      },
      showAlert:function(){
        var vm=this
        vm.alertContentShow=true
        setTimeout(function(){
            vm.alertContentShow=false
        },2000)
      },
      changeDataNum:function(){
        this.clientWidth = document.body.clientWidth
      }//设置屏幕宽度 并改变显示日期个数
    },
    created(){
        this.screenHeight = `${document.body.clientHeight - 99}px`//计算搜索关键词列表高度：屏幕高度-顶部标题栏高度
        this.searchHeight = `${document.body.clientHeight - 50}px`//计算搜索关键词列表高度：屏幕高度-顶部标题栏高度
        commit('UPDATE_LOADING',true)/*0228 F*/
    },
    route:{
        data:function(transition){
            if(transition.to!=null&&transition.to!=undefined)
            {
                if(g_selected_data.pid>0){
                    this.selectedData=g_selected_data
                    this.takeData()
                }
                else{
                    api.pageBack()
                }
            }
            this.setScrollTop()
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
        },
        "timeFmt":function(val)
        {
            if(val.length>=4)
            {
                return val.substr(0,2) + ":" + val.substr(2,2)
            }
            else 
            {
                return val
            }
        },
        "dateForShort":function(val)
        {
            var tmp=val.split('-')
            if(tmp.length==3)
            {
                
                return tmp[1]+'-'+tmp[2]
            }
            else
            {
                return ''
            }
        },
        "addProductShow":function(val)
        {
            var rs=[]
            for(var i=0;i<val.length;i++)
            {
                if(val[i].num>0)
                {
                    rs.push(val[i])
                }
            }
            return rs
        },
        "selectedDatesFmt":function(val){
            if(val&&val.length>0)
            {
                if(val.length==1)
                {
                    return val[0].replace(/\-/g, ".")
                }
                else
                {
                    return val[0].replace(/\-/g, ".")+'~'+val[val.length-1].replace(/\-/g, ".")
                }
            }
        }
    }
  }

function changeTime(val){
    //1125 To 11:25
    val = val.substr(0,2) + ":" + val.substr(2,2)
    return val
}
</script>
