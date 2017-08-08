<template>
    <div class="content">
        <!--旅游线路订单列表 START-->
        <section class="ay-section"
                 v-if="visaXianlu.length > 0">
            <divider>旅游线路订单</divider>
            <div class="list visitor"
                 v-for="item in visaXianlu">
                <div class="list-header">
                    <div class="header-tag bg-green"
                         v-if="item.OrderType == 3">参团</div>
                    <div class="header-tag bg-orange"
                         v-if="item.OrderType == 4">自由行</div>
                    <div class="header-tag bg-brown"
                         v-if="item.OrderType == 97">签证</div>
                    <div class="header-title">{{item.OrderName}}</div>
                    <div class="header-subtitle">订单号：{{item.OrderNumber}}</div>
                </div>
                <group class="list-content">
                    <cell v-for="guestItem in item.GuestVisaInfo"
                          class="visitor-item"
                          :title="guestItem.GuestName"
                          :inline-desc="guestItem.StatusNode.VisaStatusDesc"
                          v-link="{path:'step',query:{'soid':item.SubOrderId,'gid':guestItem.GuestId,'gn':guestItem.GuestName}}"
                          :is-link="true">
                        <span slot="after-title">{{guestItem.StageNode.VisaStageText}} - <em>{{guestItem.StatusNode.VisaStatusText}}</em></span>
                        <p>{{guestItem.VisaStatusUpdateTime}}</p>
                    </cell>
                </group>
    
            </div>
        </section>
        <!--旅游线路订单列表 END-->
    
        <!--签证产品订单 START-->
        <section class="ay-section"
                 v-if="visa.length > 0">
            <divider>签证产品订单</divider>
            <div class="list visitor"
                 v-for="item in visa">
                <div class="list-header">
                    <div class="header-tag bg-green"
                         v-if="item.OrderType == 3">参团</div>
                    <div class="header-tag bg-orange"
                         v-if="item.OrderType == 4">自由行</div>
                    <div class="header-tag bg-brown"
                         v-if="item.OrderType == 97">签证</div>
                    <div class="header-title">{{item.OrderName}}</div>
                    <div class="header-subtitle">订单号：{{item.OrderNumber}}</div>
                </div>
                <group class="list-content">
                    <cell v-for="guestItem in item.GuestVisaInfo"
                          class="visitor-item"
                          :title="guestItem.GuestName"
                          :inline-desc="guestItem.StatusNode.VisaStatusDesc"
                          v-link="{path:'step',query:{'soid':item.SubOrderId,'gid':guestItem.GuestId,'gn':guestItem.GuestName}}"
                          :is-link="true">
                        <!--v-for 张三 李四 王武柳-->
                        <span slot="after-title">{{guestItem.StageNode.VisaStageText}} - <em>{{guestItem.StatusNode.VisaStatusText}}</em></span>
                        <p>{{guestItem.VisaStatusUpdateTime}}</p>
                    </cell>
                </group>
    
            </div>
        </section>
        <!--签证产品订单 END-->
    
        <!--猜你喜欢 START-->
        <!--<section class="ay-section" v-if="visaXianlu.length > 0 || visa.length > 0">
                <divider>猜你喜欢</divider>
                <div class="list product">
                    <group class="list-content">
                        <cell v-for="productItem in recommendProducts" class="product-item" link="http://www.baidu.com">
                            <div slot="child" class="item-content">
                                <div class="item-media">
                                    <div class="item-img">
                                        <img src="http://pic1.aoyou.com/wap4.0/index/visa-state-bg.png"  v-lazyload:opt.fadein="productItem.ImgUrl+'?imageView2/1/w/100/h/100'">
                                    </div>
                                    <div class="item-tag">北京出发</div>
                                    <div class="item-cover bg-green" v-if="productItem.TypeId =='1'">跟团游</div>
                                    <div class="item-cover bg-orange" v-if="productItem.TypeId =='4'">自由行</div>
                                </div>
                                <div class="item-inner">
                                    <div class="item-title">{{productItem.Title}}</div>
                                    <div class="item-subtitle">{{productItem.SubTitle}}</div>
                                    <div class="product-tag">
                                        <div class="tag-wrap">
                                            <span class="tag-red-border">自营</span>
                                            <span class="tag-red">优惠</span>
                                            <span class="tag-yellow">4钻</span>
                                            <span v-for="i in 2" class="tag-green">中秋</span>
                                            <span v-for="i in 2">蜜月度假</span>
                                        </div>
                                    </div>
                                    <div class="column">
                                        <div class="item-price"><b>¥ {{productItem.Price}}</b><span>起</span></div>
                                        <div class="item-date">日期 01-26, 01-27, 01-28</div>
                                    </div>
                                </div>
                            </div>
    
                        </cell>
                    </group>
                </div>
            </section>  -->
        <!--猜你喜欢 END-->
    
        <!--没有订单 START-->
        <div class="null-info"
             v-if="visaXianlu.length < 1 && visa.length < 1">
            <div class="null-info-box">
                <div class="null-media">
                    <img src="http://pic1.aoyou.com/wap4.0/index/pic-state-null.png">
                </div>
                <div class="null-inner">非常抱歉，您还没有签证相关的订单</div>
            </div>
        </div>
        <!--没有订单 END-->
    </div>
</template>


<script>
//定义初始字体大小 START
(function (root) {
    var docEl = document.documentElement
    var timer = null
    var width
    var last
    function changeRem() {
        width = docEl.getBoundingClientRect().width
        if (last === width) {
            return
        }
        last = width
        root.rem = (width / 750) * 40
        if (/ZTE U930_TD/.test(navigator.userAgent)) {
            root.rem = root.rem * 1.13
        }
        docEl.style.fontSize = root.rem + 'px'
    }

    changeRem()
    root.addEventListener('resize', function () {
        clearTimeout(timer)
        timer = setTimeout(changeRem, 300)
    })

    root.addEventListener('orientationchange', function () {
        clearTimeout(timer)
        timer = setTimeout(changeRem, 300)
    })
})(window, undefined)
//定义初始字体大小 END

import { go } from '../../libs/router'
import store from '../../vuex/store'/*0228 F*/
const commit = store.commit || store.dispatch /*0228 F*/
import { ViewBox, XHeader, Divider, Group, Cell, Switch, Actionsheet, Confirm } from '../../components'
export default {
    components: {
        // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
        // 否则挂载点和组件名字一致, 即vhead
        ViewBox,
        XHeader,
        Divider,
        Group,
        Cell,
        Switch,
        Actionsheet,
        Confirm
    },
    props: {
        isResult: Boolean,
    },
    data() {
        return {
            isPageShow: true,//显示页面
            visaXianlu: [],//线路类型订单
            visa: [],//签证类型订单
            recommendProducts: []//猜你喜欢产品列表
        }
    },
    methods: {

        takeData: function () {
            var memebrId = api.getMemberId()
            if (memebrId == "") {
                api.toLogin('', location.href, "back")
                return false
                //location.href = "http://mpass.aoyou.com?forward=" + location.href;
                //location.replace("http://mpass.aoyou.com?forward=" + location.href,'')
            }
            var vm = this
            var useCache = false
            var useProxy = true
            // this.$http.get('/static/visa_status.json').then((response) => {
            //     // success callback
            //     var data = response.data
            //     //this.visaXianlu = data.VisaXianlu//线路类型订单
            //     //this.visa = data.Visa//签证类型订单
            //     this.recommendProducts = data.RecommendProducts//猜你喜欢产品列表
            // }, (response) => {
            //     // error callback
            // });
            if (memebrId != '') {
                var statusParam = {
                    CustomerId: memebrId,
                    SearchType: 'FreeAndGroup'
                }
                api.post({
                    path: api.config.microServiceHost.orderurl,
                    controller: 'VisaStatus',
                    action: 'GetVisaStatusOrderList',
                    param: JSON.stringify(statusParam),
                    useCache: useCache,
                    useProxy: useProxy,
                    callback: function (obj) {
                        if (obj.ReturnCode == 0) {
                            var data = obj.Data;
                            vm.visaXianlu.splice(0, vm.visaXianlu.length)
                            for (var i = 0, len = data.length; i < len; i++) {
                                vm.visaXianlu.push(data[i])
                            }
                            //vm.OrderCount=data.OrderCount
                            console.dir({ "title": "线路状态列表", "data": data })
                        }
                    }
                });
                var statusParam1 = {
                    CustomerId: memebrId,
                    SearchType: 'VisaAoyou'
                }
                api.post({
                    path: api.config.microServiceHost.orderurl,
                    controller: 'VisaStatus',
                    action: 'GetVisaStatusOrderList',
                    param: JSON.stringify(statusParam1),
                    useCache: useCache,
                    useProxy: useProxy,
                    callback: function (obj) {
                        if (obj.ReturnCode == 0) {
                            var data = obj.Data;
                            vm.visa.splice(0, vm.visa.length)
                            for (var i = 0, len = data.length; i < len; i++) {
                                vm.visa.push(data[i])
                            }
                            console.dir({ "title": "签证状态列表", "data": data })
                        }
                    }
                });

                var statusParam2 = {
                    CustomerId: memebrId,
                    SearchType: 'VisaTaobao'
                }
                api.post({
                    path: api.config.microServiceHost.orderurl,
                    controller: 'VisaStatus',
                    action: 'GetVisaStatusOrderList',
                    param: JSON.stringify(statusParam2),
                    useCache: useCache,
                    useProxy: useProxy,
                    callback: function (obj) {
                        if (obj.ReturnCode == 0) {
                            var data = obj.Data;
                            vm.visa.splice(0, vm.visa.length)
                            for (var i = 0, len = data.length; i < len; i++) {
                                vm.visa.push(data[i])
                            }
                            console.dir({ "title": "签证状态列表", "data": data })
                        }
                    }
                });
            }
        }

    },
    created() {

    },

    ready() {
        this.takeData()
    }
}

</script>

<style lang="less">
@import '../../styles/index.less';
@import '../../styles/ayui/base/reset.less';

/*状态页*/

.list {
    padding: 0 20px;
    margin-bottom: 10px;
    width: 100%;
    background-color: #fff;
    box-sizing: border-box;
}

.list-header {
    position: relative;
    padding: 20px 0;
    .header-tag {
        position: absolute;
        left: 0;
        top: 0;
        width: 55px;
        height: 20px;
        border-radius: 0 0 5px 5px;
        font-size: 12px;
        color: #fff;
        text-align: center;
        line-height: 20px;
        white-space: nowrap;
        box-sizing: border-box;
    }
    .header-title {
        padding: 5px 0;
        font-size: 16px;
        color: #333333;
        line-height: 20px;
        font-weight: 300;
    }
    .header-subtitle {
        font-size: 12px;
        color: #FF5523;
        line-height: 18px;
        font-weight: 300;
    }
}

.list-content {
    .ay_cells {
        margin-top: 0;
        &:after {
            display: none;
        }
    }
    .ay_cell {
        padding: 0;
    }
}

.visitor {
    .ay_cell {
        display: block;
        padding: 0;
    }
}

.visitor-item {
    display: block;
    /*人名标题*/
    .ay_cell_bd>p {
        font-size: 19px;
        color: #333333;
        /*右侧资料状态*/
        span {
            float: right;
            font-size: 14px;
            font-weight: 300;
            em {
                color: #FF5523;
            }
        }
    }
    /*资料状态描述述*/
    .ay-label-desc {
        padding-right: 30px;
        font-size: 12px;
        color: #333333;
        font-weight: 300;
        line-height: 18px;
        box-sizing: border-box;
        .ellipsisLn(1)
    }
    /*时间*/
    .ay_cell_ft {
        width: 100%;
        p {
            padding-bottom: 15px;
            font-size: 12px;
            color: #999;
            font-weight: 300;
            text-align: left;
            line-height: 18px;
        }
    }
    /*箭头*/
    .ay_cell_ft.with_arrow:after {
        top: auto;
        right: -12px;
        bottom: 18px;
        width: 16px;
        height: 16px;
        border-color: #777;
        border-width: 3px 3px 0 0;
        transform: rotate(45deg) scale(0.5);
        -webkit-transform: rotate(45deg) scale(0.5);
        transform-origin: 0 0;
        -webkit-transform-origin: 0 0;
    }
}


/*猜你喜欢 产品列表*/

.product {
    margin-bottom: 0;
    .ay_cells:before {
        display: none;
    }
}

.product-item {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    -webkit-align-items: center;
    -webkit-box-align: center;
    padding: 15px 0;
    width: 100%;
    box-sizing: border-box;
    .ay_cell_ft {
        display: none;
    }
    .item-content {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: justify;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
        padding: 15px 0;
        width: 100%;
        /*height: (95rem/20);*/
        box-sizing: border-box;
    }
    .item-media {
        -webkit-box-flex: 0 0 auto;
        -moz-box-flex: 0 0 auto;
        -webkit-flex-shrink: 0;
        -ms-flex: 0 0 auto;
        flex: 0 0 auto;
        position: relative;
        margin: 0 10px 0 0;
        padding: 0;
        width: 80px;
        height: 100px;
        border-radius: 5px;
        border: none;
        background-color: #f0f0f0;
        /*background-image: url(data:image/png;base64,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);*/
        /*background-position: center;*/
        /*background-repeat: no-repeat;*/
        /*background-size: 75%;*/
        overflow: hidden;
        .item-img {
            width: 100%;
            height: 80px;
            img {
                display: block;
                width: 100%;
                height: 100%;
                border: 0;
            }
        }
        .item-tag {
            position: absolute;
            left: 0;
            top: 0;
            padding: 0 4px;
            width: auto;
            height: 16px;
            background-color: rgba(0, 0, 0, .5);
            border-radius: 5px 0 0 0;
            font-size: 12px;
            color: #fff;
            text-align: center;
            white-space: nowrap;
            line-height: 16px;
        }
        .item-cover {
            /*position: absolute;*/
            /*left: 0;*/
            /*bottom: 0;*/
            width: 100%;
            height: 20px;
            font-size: 12px;
            color: #fff;
            text-align: center;
            line-height: 20px;
        }
    }
    .item-inner {
        position: relative;
        -webkit-flex: 1;
        flex: 1;
        -webkit-box-flex: 1;
        -moz-box-flex: 1;
        -ms-flex: 1;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        align-items: flex-start;
        -webkit-align-items: flex-start;
        -webkit-box-align: start;
        flex-direction: column;
        -webkit-flex-direction: column;
        -webkit-box-orient: vertical;
        -moz-box-orient: vertical;
        box-orient: vertical;
        -webkit-box-direction: vertical;
        padding: 0;
        width: 100%;
        height: 100px;
        box-sizing: border-box;
        /*&:after{*/
        /*.setBottomLine(@ayCellBorderColor);*/
        /*}*/
    }
    .item-title {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 40px;
        font-size: 16px;
        color: #333;
        font-weight: normal;
        line-height: 20px;
        .ellipsisLn(2)
    }
    .item-subtitle {
        margin-top: 4px;
        width: 100%;
        height: 16px;
        font-size: 12px;
        color: #999;
        font-weight: 300;
        line-height: 16px;
        .ellipsisLn(1)
    }
    .product-tag {
        margin-top: 4px;
        width: 100%;
        height: 16px;
        overflow: hidden;
    }
    .tag-wrap {
        /*display: -webkit-box;*/
        /*display: -webkit-flex;*/
        /*display: flex;*/
        /*align-items: flex-start;*/
        /*-webkit-align-items: flex-start;*/
        /*-webkit-box-align: start;*/
        width: 200%;
        height: 32px;
        overflow: hidden;
        transform: scale(0.5);
        -webkit-transform: scale(0.5);
        transform-origin: 0 0;
        -webkit-transform-origin: 0 0;
        span {
            float: left;
            display: block;
            margin: 0 10px 4px 0;
            padding: 0 5px;
            height: 28px;
            background-color: #F5F4EF;
            border: 1px solid #ccc;
            border-radius: 6px;
            box-sizing: border-box;
            font-size: 20px;
            color: #666;
            font-weight: 300;
            line-height: 28px;
            text-align: center;
            text-wrap: none;
            &.tag-red {
                background-color: #F50000;
                border: 1px solid #F50000;
                color: #fff;
            }
            &.tag-red-border {
                background-color: #fff;
                border: 1px solid #F50000;
                color: #F50000;
            }
            &.tag-yellow {
                background-color: #fff;
                border: 1px solid #FDA403;
                color: #FDA403;
            }
            &.tag-green {
                background-color: #fff;
                border: 1px solid #5FC579;
                color: #5FC579;
            }
        }
    }
    .column {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        align-items: flex-end;
        -webkit-align-items: flex-end;
        -webkit-box-align: end;
        width: 100%;
    }
    .item-price {
        -webkit-flex: 1;
        flex: 1;
        -webkit-box-flex: 1;
        -moz-box-flex: 1;
        -ms-flex: 1;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        align-items: flex-end;
        -webkit-align-items: flex-end;
        -webkit-box-align: flex-end;
        width: 100%;
        height: 20px;
        color: #FC5A3F;
        overflow: hidden;
        em {
            display: block;
            font-size: 19px;
            font-style: normal;
            vertical-align: baseline;
            line-height: 16px;
        }
        b {
            display: block;
            padding: 0 4px 0 0;
            font-size: 19px;
            font-weight: normal;
            vertical-align: baseline;
            line-height: 18px;
            white-space: nowrap;
        }
        span {
            position: relative;
            top: 1px;
            display: block;
            font-size: 12px;
            color: #999;
            font-weight: 300;
            vertical-align: baseline;
            line-height: 16px;
        }
    }
    .item-date {
        position: relative;
        top: 1px;
        padding-top: 4px;
        width: 110px;
        height: 20px;
        box-sizing: border-box;
        font-size: 12px;
        color: #999;
        text-align: right;
        font-weight: 300;
        line-height: 16px;
        .ellipsisLn(1)
    }
}

.null-info {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    -webkit-align-items: center;
    -webkit-box-align: center;
    padding-bottom: 44px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    .null-info-box {
        width: 100%;
        height: auto;
        .null-media {
            margin: 0 auto;
            width: 50px;
            height: 50px;
            img {
                display: block;
                width: 100%;
                border: none;
            }
        }
        .null-inner {
            margin-top: 15px;
            width: 100%;
            font-size: 14px;
            color: #999;
            text-align: center;
            font-weight: 300;
            line-height: 20px;
        }
    }
}
</style>
