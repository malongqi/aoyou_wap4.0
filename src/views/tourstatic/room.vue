<template>
    <div class="page-wrap">
        <div class="page choose fix-room">
            <view-box v-if="!showPagechoose">
                <headerbar class="shade" slot="header">
                    <span slot="left" class="icons icon-arrow" @click='back()'></span>
                    <div class="departciry">
                        <span class="citys" @click="">酒店详情</span>
                    </div>
                </headerbar>
                <div class="page-inner-room">
                    <div class="header-cover" :style="{opacity:isOpacity}"></div>
                    <div class="hotelsmall">
                        <ul>
                            <li>
                                <div class="cont clearfix">
                                    <img :src='hotelData.HotelPicList!=undefind?hotelData.HotelPicList[0]:"http://pic1.aoyou.com/wap4.0/index/bg-s.png?imageView2/1/w/80/h/60"' v-link="{path:hotelData.HotelPicList!=undefind?'hotelimg':'',query:{hid:hid}}">
                                    <div class="fix-longname">
                                        <h3 :style="{width:clientWidth-130 +'px'}">{{hotelData.HotelNameEng+hotelData.HotelName}}</h3>
                                        <div v-if="hotelData.StarLevel>5" class="grade" :style="{width:clientWidth-130 +'px'}"><span>参考等级：{{hotelData.StarLevelText}}</span>
                                            </div>
                                        <div class="grade" :style="{width:clientWidth-130 +'px'}" v-if="hotelData.StarLevel<=5"><span>参考等级：</span>
                                            <i class="icon-grade" v-for="item in hotelData.StarLevel"></i>
                                        </div>
                                    </div>
                                </div>
                                <p>地址：{{hotelData.HotelAddress}}</p>
                                <div class="line"></div>
                            </li>
                        </ul>
                         <div class="hoteldiscription">
                            <div class="cont">
                                <h3>酒店介绍</h3>
                                <p>{{hotelData.HotelDesc}}</p>
                            </div>
                        </div>
                    </div>                   
                </div>
            </view-box>
        </div>
    </div>
</template>
<style lang="less">
    .page-inner-room{
        .hotelsmall{
            width:100%;
            background: white;
            padding-top: 15px;
            border-top: 1px solid #DFDFDF;
            ul{
                margin: 0 10px;
                li{
                    //border-bottom: 1px solid #DFDFDF;
                    padding-bottom: 10px;
                    .cont{
                        display: block;
                        //height: 60px;
                        min-height: 60px;
                        height: auto;
                        line-height: 0;
                        .fix-longname{
                            padding-left: 80px;
                            h3{
                                margin-left: 10px;
                                font-size: 16px;
                                color: #333333;
                                line-height: 20px;
                                width: 240px;
                                //float: left;
                                min-height:40px;

                            }

                            .grade{
                                height:10px;
                                display: inline-block;
                                width: 240px;
                                margin-left: 10px;
                                margin-top: 5px;
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
                        img{
                            width:80px;
                            height:60px;
                            border-radius: 5px;
                            float: left;
                        }

                    }
                    p{
                        margin-top: 5px;
                        font-size: 12px;
                        color: #999999;
                        letter-spacing: 0px;
                        display: block;
                        width: 100%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
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

        .howlong{
            height:45px;
            width: 100%;
            text-align: center;
            font-size: 12px;
            color: #333333;
            line-height:45px;
            span{
                color:#999;
                margin: 0 5px;
            }
        }

        .roomcont{
            .room {
                margin: 10px;
                border: #fff 1px solid;
                background: #fff;
                position: relative;
                border-radius: 10px;
                box-shadow: rgba(0, 0, 0, 0.15) 0 0 2px;

                &:first-child{
                    margin-top: 0px;
                }

                i.activeicon{
                    display: none;
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
            .room.active{
                span{
                    color: #FC5A3F;
                }
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

        .hoteldiscription{
            .cont{
               margin: 10px;
                margin-top: 0;
                border: #fff 1px solid;
                background: #fff;
                position: relative;
                border-top: 1px solid #DFDFDF;
                padding: 10px 0;
                p{
                    font-size: 14px;
                    color: #333333;
                    letter-spacing: 0px;
                    line-height: 19px;
                }
                h3{
                    font-size: 16px;
                    color: #333333;
                    letter-spacing: 0px;
                    line-height: 2.5;
                }
            }
        }

        .shade{
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 10;
        }
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

    .fix-room.choose .ay_tab_bd{
        padding-bottom: 0px;
        //padding-top: 44px;
    }

    .fix-room{
        .page-inner-room .hotelsmall ul li p{
            overflow: inherit;
            word-break: break-all;
            display: inline-block;
        }
    }


</style>
<script>
    import { go } from '../../libs/router'
    import { ViewBox, Headerbar, Search, Tab, Popup, TabItem, Group, XNumber, Cell, Scroller, Swiper, SwiperItem, Tabbar, TabbarItem, Actionsheet, Spinner } from '../../components'
    export default {
        components: {
            // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
            // 否则挂载点和组件名字一致, 即vhead
            ViewBox,
            Headerbar,
            Search,
            Popup,
            Tab,
            TabItem,
            Group,
            XNumber,
            Cell,
            Scroller,
            Tabbar,
            TabbarItem,
            Actionsheet,
            Spinner,
            Swiper,
            SwiperItem,
        },
        data() {
            return {
                stayIndex: 0,
                hid: 0,
                rpid: 0,
                from: 0,
                selectedData: {},
                roomDetial: {},
                roomNumList: [],
                curRoomItem: {},
                curRoomSinglePrice: 0,
                //屏幕宽度
                clientWidth: 375,
                //数据
                mainData: {},
                dateData: [],
                saleData: {},
                pleasedData: {},
                calendarData: [],
                flightData: [],
                hotelData: [],

                showPagechoose: false,
                shownext: true,
                showroomnum: false,
                showroombrief: false
            }
        },
        methods: {
            takeData: function () {
                if (g_hotel_list && g_hotel_list.length > 0) {
                    for (var i = 0, len = g_hotel_list.length; i < len; i++) {
                        if (g_hotel_list[i].HotelId == this.hid) {
                            this.hotelData = g_hotel_list[i]
                        }
                    }
                }

            },
            returnTop: function () {
                document.querySelector('.page-inner').scrollTop = 0
            },
            back: function () {
                api.pageBack()
            }
        },
        route: {
            data: function (transition) {
                if (transition.to != null && transition.to != undefined) {
                    if(p_selected_data.pid>0)
                    {                  
                        this.hid = transition.to.query.hid
                        this.takeData()
                    }
                    else
                    {
                        api.pageBack()
                    }
                }
            }
        },
        filters: {
            "dateFmt": function (val) {
                if (val.indexOf('T') >= 0) {
                    return val.split('T')[0]
                }
                else {
                    return ''
                }
            }
        }
    }


</script>