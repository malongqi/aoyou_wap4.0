<template>
    <div class="page-wrap">
        <sticky>
            <x-header @click="back" :left-options="{showBack: true, preventGoBack:true}" >我的订单
                <!--<a slot="right"><span class="icon-message" @click="ToMessageCenter()"></span></a>-->
                </x-header>
            <!--tab切换标签-->
            <tab :line-width=1 active-color="#FF5523">
                <tab-item :selected="currentList === item" v-for="item in orderLists" @click="currentList = item">{{item}}</tab-item>
            </tab>
        </sticky>
        <!--订单列表-->
        <div class="card-list" v-if="orders!=null?orders.length>0:false">
            <card v-for="order in orders">
                <div slot="header" class="card-header">
                    <div class="title">订单号：{{order.MainOrderNO}}</div>
                    <div :class="['staute', {cancel:order.Status_m==19}]" v-if="order.Status_m != 45&&order.OrderType_m!=6">{{order.Status_m | wrap}}</div>
                    <div :class="['staute', {cancel:order.Status_m==19}]" v-if="order.OrderType_m == 6">{{order.AirStatuTxt}}</div>
                   
                    <div class="img-info" v-if="order.Status_m == 45"></div>
                </div>
                <div slot="content" class="card-content" @click="" v-link="{path:'/details',query: {mainorderid:order.MainOrderID,suborderid:order.SubOrderID,orderno:order.MainOrderNO,type:order.OrderType_m }}">
                    <span :class="['orange',{green:order.OrderType_m==2,
                    blue:order.OrderType_m==3,
                    light:order.OrderType_m==4?true:order.OrderType_m==8,
                    red:order.OrderType_m==5,
                    lightg:order.OrderType_m==6,
                    brown:order.OrderType_m==7}]">{{order.OrderType_m | liter}}</span>
                    <div class="name" v-if="order.OrderType_m==6">{{order.OrderName|fordername}}</div>
                    <div class="name" v-if="order.OrderType_m!=6">{{order.OrderName}}</div>
                    <div class="date">出行日期：{{order.StartDate}} 至 {{order.EndDate}}</div>
                    <div class="price">
                        <span>
                            <span v-if="order.OrderNumber>0">共{{order.OrderNumber}}人出游</span>
                            <span v-if="order.OrderType_m==6">{{order.number+order.chdNumber |airnumber}}</span>
                             合计：</span>
                        <b>￥{{order.OrderMoney}}</b>
                    </div>
                </div>
                <div slot="footer" class="card-footer">
                    <div v-if="order.OrderType_m!=6" >
                        <span v-if="order.NoticeStatus==1" 
                        @click="tap('出行通知',order.MainOrderNO,order.ProductID,order.OrderType_m,order.MainOrderID,order.OrderType,order.ProductType,order.SubOrderID,order.SubProductType,order.CruiseID,order.CruiseCompanyID,order.CruiseRouteID)">出行通知</span>
                        <span v-for="item in order | setArray"
                        @click="tap(item,order.MainOrderNO,order.ProductID,order.OrderType_m,order.MainOrderID,order.OrderType,order.ProductType,order.SubOrderID,order.SubProductType,order.CruiseID,order.CruiseCompanyID,order.CruiseRouteID)">{{item}}</span>   
                    </div>
                     <div v-if="order.OrderType_m==6&&order.AirStatu==0&&order.IsCanPayOnline==1">                     
                       <span  
                        @click="tap('去支付',order.MainOrderNO,order.ProductID,order.OrderType_m,order.MainOrderID,order.OrderType,order.ProductType,order.SubOrderID,order.SubProductType,order.CruiseID,order.CruiseCompanyID,order.CruiseRouteID)">去支付</span>          
                    </div>
                    <span class="info" v-if="order.Status_m == 45">感谢您对我们的评价</span>
                </div>
            </card>
        </div>
        <!--查看半年前订单-->
        <div class="order-more" v-if="isShowMore" @click="GetOrderListNext(nextdate)">
            查看半年前订单
        </div>
        <!--底线组件-->
        <divider v-if="isShowResult">我是有底线的</divider>
        <!--没有评价结果显示-->
        <div class="no-result" v-if="orders!=null?!orders.length>0:false">
            <img src="http://pic1.aoyou.com/app40/no.png"/>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'
    import store from '../../vuex/store'
    const commit = store.commit || store.dispatch

    Vue.use(VueAxios, axios)

    //Add the component
    import {
        XHeader,
        Sticky,
        Tab,
        TabItem,
        Card,
        Divider
    } from '../../components'

    export default {
        components: {
            XHeader,
            Sticky,
            Tab,
            TabItem,
            Card,
            Divider
        },
        data() {
            return {
                orderLists: ['全部', '待付款', '待出行', '待评价'],
                currentList: '全部',
                orders: [],
                isShowMore: true,
                isShowResult: false,
                nextdate: "",
                getOrderPara: {
                    "memberid": 0,
                    "startdate": "",
                    "type": 1,
                    "mode": "new",
                    "enddate": ""
                },
                appVersion:0,
                myhost: "http://m.aoyou.com"
            }
        },
        methods: {
            tap(name, mainorderno,
             productid, OrderType_m, 
             mainorderid, ordertype, 
             producttype, suborderid,
             SubProductType,cruiseid,
             CruiseCompanyID,CruiseRouteID) {
                if ("去评价" == name) {
                    var para = "ordertype_m=" + OrderType_m +
                        "&SubOrderno=" + mainorderno +
                        "&memberid=" + this.getOrderPara.memberid +
                        "&ProductId=" + productid+
                        "&suborderid="+suborderid+
                        "&CruiseID="+cruiseid+
                        "&CruiseCompanyID="+CruiseCompanyID+
                        "&CruiseRouteID="+CruiseRouteID;
            
                    var url = "http://m.aoyou.com/order.html#!/evaluation?" + para
                    window.location.href = url
                } else if ("去支付" == name) {
                    debugger
                    this.GetPayId(this.getOrderPara.memberid, ordertype, producttype, suborderid, mainorderid, mainorderno,SubProductType)
                } else if ("出行通知" == name) {
                    window.location.href = "http://mmy.aoyou.com/TravelTrips/FreeTravelTrip?mainOrderID=" + mainorderid
                }
            },
            GetOrderListNext(nextdate) {

                globalThis.getOrderPara.mode = "append";
                globalThis.getOrderPara.enddate = nextdate;
                GetOrderList(globalThis.getOrderPara);
            },
            ToMessageCenter() {
                api.pageGoTo("messagecenter", "","messagecenter");
            },
            NoMessage() {
                alert(`没有消息`);
            },
            GetPayId(memberid, orderType, producttype, orderID, mainorderid, orderNo,subproducttype) {
                var useCache = false;
                var useProxy = true;
                var paypara = {
                     "mainorderid":mainorderid,
                    "memberid": memberid,
                    "orderType": producttype,
                    "orderID": orderID,
                    "orderNo": orderNo
                }
                api.post({
                    path: api.config.microServiceHost.orderurl,
                    controller: 'OrderData',
                    action: 'ToPay',
                    param: JSON.stringify(paypara),
                    useCache: useCache,
                    useProxy: useProxy,
                    callback: function(obj) {
                        if (obj.ReturnCode == 0) {
                            if (true) {
                                var successParam = {
                                    OrderID: orderID,
                                    MainOrderID: mainorderid,
                                    OrderNo: orderNo,
                                    IsCanPay: 1,
                                    PayID: obj.Data,
                                    ProductType: producttype,
                                    SubProductType: subproducttype
                                };

                                 if (api.IsIOSClient()) {
                                    window.webkit.messageHandlers.bookingSuccess.postMessage(JSON.stringify(successParam));
                                } else if (api.IsAndroidClient()) {
                                    window.action.payment(JSON.stringify(successParam));
                                }else{
                                   var payhref;
                                   
                                    if (orderType==1||orderType == 27||(orderType==29&&subproducttype==6)) {
                                        //机票
                                        payhref = "https://mpay.aoyou.com/s/flightpay/index.html?orderid=" + successParam.OrderID +
                                            "&mainorderid=" + successParam.MainOrderID +
                                            "&payid=" + successParam.PayID;

                                    } else {
                                        payhref = "https://mpay.aoyou.com/S/Pay/Index.html?orderid=" + successParam.OrderID +
                                         "&mainorderid=" + successParam.MainOrderID + 
                                         "&payid=" + successParam.PayID;

                                    }
                                    window.location.href = payhref;
                                }
                            }
                        }
                    }
                });
            },
            back:function () {
                if(!(window.webkit||window.action))
                {
                    window.location.href="http://mmy.aoyou.com/"
                }
                else {
                    api.pageBack()
                }

            }
        },
        computed: {

        },
        filters: {
            'wrap' (value) {
                switch (value) {
                    case 1:
                        return "待付款"
                    case 5:
                        return "待确认"
                    case 19:
                        return "已取消"
                    case 2:
                        return "待出行"
                    case 30:
                        return "待出行"
                    case 35:
                        return "出行中"
                    case 40:
                        return "待评价"
                    case 45:
                        return "已完成"
                    default:
                        return "未知"
                }
            },
            'setArray' (value) {
                switch (value.Status_m) {
                    case 1:
                        if(this.isShowCut && (value.ProductType==3||value.ProductType==4))
                        {
                            return['去砍价']
                        }
                        else{
                            return ['去支付']
                        }
                    case 5:
                        return []
                    case 19:
                        return []
                            // case 2:
                            // return ['出行通知']
                            // case 30:
                            //     return ['出行通知']
                            // case 35:
                            //     return ['出行通知']
                    case 40:
                        return ['去评价']
                    case 45:
                        return []

                }
            },
        
            'liter' (value) {
                switch (value) {
                    case 1:
                        return "自由行"
                    case 2:
                        return "跟团游"

                    case 3:
                        return "邮轮"
                    case 4:
                        return "当地玩乐"
                    case 5:
                        return "门票"
                    case 6:
                        return "机票"
                    case 7:
                        return "签证"
                    case 8:
                        return "当地玩乐"
                    default:
                        return "半自助"
                }
            },
            'airnumber'(pnumber){
                var re="";
                if(pnumber>0){
                    re=pnumber+"人";
                }
               return re;
            },
            'airchdnumber'(chdnumber){
                 var re="";
                if(chdnumber>0){
                    re=chdnumber+"儿童";
                }
                return re;
            },
            'fordername'(ordername){
                if(ordername){
                    var ons=ordername.replace("_"," ");
                return ons;
                }
                return "";
               
            }
        },
        watch: {
            'currentList' (newVal, oldVal) {
                switch (newVal) {

                    case "全部":
                        {
                            globalThis.getOrderPara.type = 1;
                            globalThis.getOrderPara.mode = "new";
                            globalThis.getOrderPara.startdate = "";
                            globalThis.getOrderPara.enddate = "";
                            GetOrderList();

                        }
                        break;
                    case "待付款":
                        {
                            globalThis.getOrderPara.type = 2;
                            globalThis.getOrderPara.mode = "new";
                            globalThis.getOrderPara.startdate = "";
                            globalThis.getOrderPara.enddate = "";
                            GetOrderList();
                        }
                        break;
                    case "待出行":
                        {

                            globalThis.getOrderPara.type = 3;
                            globalThis.getOrderPara.mode = "new";
                            globalThis.getOrderPara.startdate = "";
                            globalThis.getOrderPara.enddate = "";
                            GetOrderList();
                        }

                        break;
                    case "待评价":
                        {

                            globalThis.getOrderPara.type = 4;
                            globalThis.getOrderPara.mode = "new";
                            globalThis.getOrderPara.startdate = "";
                            globalThis.getOrderPara.enddate = "";
                            GetOrderList();
                        }

                        break;
                }
            }
        },
        ready() {
            globalThis = this;
            var ver=this.$route.query.appVersion;
            if(ver&&ver!="undefined"){
                this.appVersion=ver.replace("app","").replace("android","");
            }
            
            var memid =api.getCookie("memberid");
            if (memid == undefined || memid == "") {
                memid = this.$route.query.memberid;
                api.setCookie("memberid", memid);
                
            }
            globalThis.getOrderPara.memberid = memid;
            if (memid == undefined || memid == "") {
                var url = encodeURIComponent(location.href)
                api.toLogin(url, url, "back")
                return false
//                window.location.href = "http://mpass.aoyou.com?from=" + encodeURIComponent(location.href)  + "&forward=" + encodeURIComponent(location.href)
            }

            var currentType = this.$route.query.type;
            if (currentType != undefined && parseInt(currentType) > 0) {
                this.currentList = this.orderLists[currentType - 1];
                globalThis.getOrderPara.type = currentType;
            }
            globalThis.getOrderPara.mode = "new";

            GetOrderList();
        }
    }

    var globalThis;
    //mode=append追加/new新建
    function GetOrderList() {
        var useCache = false;
        var useProxy = true;

        if (globalThis.getOrderPara.mode == "new") {
            globalThis.orders = null;
        }else if(globalThis.getOrderPara.mode == "append"){
            globalThis.isShowMore=false;
        }
        var qp = JSON.stringify(globalThis.getOrderPara);
        commit('UPDATE_LOADING',true)
        var actionname="GetOrderListMore";
        if (api.IsIOSClient()||api.IsAndroidClient()) {
             if(globalThis.appVersion<400410)
            {
                actionname="GetOrderList";
            }                       
        }
            

       
        api.post({
            path: api.config.microServiceHost.orderurl,
            controller: 'OrderData',
            action: actionname,
            param: qp,
            useCache: useCache,
            useProxy: useProxy,
            callback: function(obj) {
                commit('UPDATE_LOADING',false)
                if (obj.ReturnCode == 0) {

                    //alert(obj.JsonResult);

                    var jsonobj = JSON.parse(obj.Data);
                    if (globalThis.getOrderPara.mode == "append") {
                        for (var i = 0; i < jsonobj.OrderItems.length; i++) {
                            globalThis.orders.push(jsonobj.OrderItems[i]);
                        }

                    }
                    if (globalThis.getOrderPara.mode == "new") {
                        globalThis.orders = jsonobj.OrderItems;
                    }
                    globalThis.isShowMore = jsonobj.NextCount > 0;
                    globalThis.nextdate = jsonobj.NextDate;
                }
                else{
                    globalThis.isShowMore=true;
                }
            }
        });
    }

    function NoMessage() {
        alert(`没有消息`);
    }
</script>

<style lang="less">
    @import '../../styles/index.less';
    @import '../../styles/ayui/base/reset.less';
    /*最外层包裹*/
    
    .page {
        position: relative;
        height: 100%;
    }
    
    .page-wrap {
        box-sizing: border-box;
        background: #F5F5F5;
        height: 100%;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        .ay-sticky {
            z-index: 9999;
        }
    }
    /*页面样式 20170116*/
    
    .ay-header .ay-header-left {
        left: 22px;
    }
    
    .ay-tab-ink-bar {
        margin: 0 20px;
        height: 2px !important;
    }
    
    .page-wrap .ay-header .icon-message {
        display: block;
        width: 23px;
        height: 21px;
        background: url(data:image/png;base64,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);
        background-size: 100%;
        background-repeat: no-repeat;
    }
    
    .ay-header {
        height: 44px;
        line-height: 44px;
        font-size: 19px;
        background-color: #fff;
        &:after {
            .setBottomLine(#e5e5e5);
        }
    }
    
    .ay-header .ay-header-left .left-arrow:before {
        border: 2px solid #333;
        border-width: 1px 0 0 1px;
    }
    
    .ay-header .ay-header-title,
    .ay-header h1 {
        color: #333;
    }
    
    .card-list {}
    
    .no-result {
        margin: 30% auto 0;
        img {
            width: 100%;
            display: block;
        }
    }
    
    .page-wrap {
        .ay_panel {
            margin-top: 10px;
        }
        .ay_panel_bd {
            padding: 0 20px;
        }
    }
    
    .card-header {
        position: relative;
        height: 35px;
        line-height: 35px;
        overflow: hidden;
        .title {
            position: absolute;
            top: 0;
            left: 20px;
            font-size: 12px;
            color: #999;
        }
        .staute {
            position: absolute;
            top: 0;
            right: 20px;
            font-size: 14px;
            color: #FF5523;
            &.cancel {
                color: #999999;
            }
        }
        .img-info {
            position: absolute;
            top: 0;
            width: 52px;
            height: 28px;
            margin-top: 3px;
            right: 20px;
            background: url(data:image/png;base64,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);
            background-size: 100%;
        }
    }
    
    .card-content {
        position: relative;
        height: 100px;
        overflow: hidden;
        &:after {
            .setBottomLine(#e5e5e5);
        }
        &:before {
            .setTopLine(#e5e5e5);
        }
        .orange {
            display: block;
            width: 55px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            background: #FF6602;
            font-family: STHeitiSC-Medium;
            font-size: 12px;
            color: #FFFFFF;
            border-radius: 0 0 5px 5px;
            font-weight: 100;
            -webkit-font-smoothing: antialiased;
            &.yellow {
                background: #FEA833;
            }
            &.green {
                background: #70C100;
            }
            &.blue {
                background: #35A3EC;
            }
            &.light {
                background: #64D58E;
            }
            &.brown {
                background: #BF956A;
            }
            &.red {
                background: #FF7375;
            }
            &.lightg{
                background: #09C6AB;
            }
        }
        .name {
            .ellipsis(1);
            font-size: 14px;
            height: 14px;
            line-height: 14px;
            color: #333;
            margin: 10px 0 3px;
        }
        .date {
            .ellipsis(1);
            color: #999;
            font-size: 12px;
        }
        .price {
            margin-top: 6px;
            text-align: right;
            color: #333;
            font-size: 12px;
            b {
                font-size: 17px;
            }
        }
    }
    
    .card-footer {
        padding: 0 20px;
        height: 50px;
        text-align: right;
        overflow: hidden;
        span {
            display: inline-block;
            text-align: center;
            font-family: STHeitiSC-Light;
            font-size: 14px;
            color: #333333;
            letter-spacing: 0px;
            margin-top: 9px;
            margin-left: 10px;
            width: 75px;
            height: 30px;
            line-height: 30px;
            background: #FFFFFF;
            border: 1px solid #DFDFDF;
            border-radius: 15px;
            &:last-child {
                color: #FF5523;
                border: 1px solid #FF5523;
            }
            &.info {
                font-family: STHeitiSC-Medium;
                width: auto;
                font-weight: 100;
                -webkit-font-smoothing: antialiased;
                font-size: 14px;
                color: #999999;
                letter-spacing: 0px;
                border: 0;
                border-radius: 0;
            }
        }
    }
    
    .order-more {
        font-family: STHeitiSC-Light;
        margin-top: 10px;
        font-size: 14px;
        color: #41B3EE;
        letter-spacing: 0px;
        height: 60px;
        line-height: 60px;
        background: #FFFFFF;
        text-align: center;
    }
    
    .page .ay-divider {
        padding: 24px 20px;
        font-family: STHeitiSC-Light;
        font-size: 12px;
        color: #999999;
        letter-spacing: 0.5px;
    }

    .whitetheme {
        background-color: #fff;
        border-bottom: 1px solid #dfdfdf;
    }
</style>