<template>
    <div class="page">
        <headerbar class="headbar">
            <span slot="left" class="icons icon-arrow" @click='back()'></span>
            <div class="departciry">
                <span class="citys" @click="">客户点评</span>
                <span class="num" @click="">({{commentlist.TotalCount}})</span>
            </div>
        </headerbar>
        <view-box  v-ref:view-box  class="page-inner-comment" v-if="hascomment">
            <div class="page-inner">

                <div class="scroll-wrap">
                    <h3>整体满意度：<span>{{GoodValue}}%</span></h3>
                    <div class="label">
                        <span v-for="item in lables">{{item.LableName}}</span>
                    </div>
                    <section v-for="item in commentlist.PagerOrderEvaluateInfosDTOs">
                       <div class="person">
                            <div class="circle">
                                <img src="http://pic1.aoyou.com/app40/privilege-08.png"/>
                            </div>
                            <span>{{item.CustomerId}}</span>
                            <b>{{item.EvaluateTime}}</b>
                            <i v-for="star in item.StarNum" class="icon-star"></i>
                       </div>
                       <div class="satisfy clearfix" v-if="item.Titles[0].Replay!=''">
                            <span>{{item.Titles[0].Title}}</span>
                            <p>{{item.Titles[0].Replay}}</p>
                       </div>
                        <div class="satisfy clearfix"  v-if="item.Titles[0].Replay==''">
                            <span>{{item.Titles[0].Title}}</span>
                            <p>都很满意</p>
                        </div>
                        <div class="notsatisfy clearfix" v-if="item.Titles[1].Replay!=''">
                            <span>{{item.Titles[1].Title}}</span>
                            <p>{{item.Titles[1].Replay}}</p>
                        </div>
                        <div class="notsatisfy clearfix" v-if="item.Titles[1].Replay==''">
                            <span>{{item.Titles[1].Title}}</span>
                            <p>没有不满意</p>
                        </div>
                        <div class="imgcont" v-if="picList!=undefined? picList.length>0:false">
                            <ul>
                                <li><img v-bind:src="pic"></li>
                            </ul>
                        </div>
                    </section>
                    <div class="load-more" @click="loadMore" v-if="isShowLoad">
                        <p>点击加载更多</p>
                    </div><!--0214-->
                </div>

                <!--已到底线-->
                <div class="scroller-btm" v-if="!isShowLoad">
                    <divider>已到底线</divider>
                </div><!--*0213*-->

            </div>
        </view-box>
        <view-box class="page-inner-nocomment" v-if="!hascomment">
            <div class="page-inner">
                <div class="nocomment">
                    <span>客户暂无点评</span>
                </div>
            </div>
        </view-box>
    </div>
</template>

<style scoped>
    .headbar {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9;
    }
    
    .page-inner {
        padding-top: 44px;
        height: 100%;
        box-sizing: border-box;
    }
    
    .page-inner .person b {
        font-weight: 300;
    }
    /*0214*/
    
    .page-inner .person span {
        font-weight: normal;
    }
    /*0214*/

    .page .ay_tab_bd {
        padding-bottom: 0 !important;
    }
    
    .page-inner .scroll-wrap .xs-plugin-pullup-container {
        font-size: 14px;
        color: #999;
    }
</style>
<style lang="less">
    @import '../../styles/ayui/base/mixin/setOnepx.less';
    .ay-header-bar .is-left span {
        background-repeat: no-repeat;
        background-size: contain;
    }
    
    .departciry {
        .num {
            font-size: 14px;
            color: #666666;
        }
    }
    
    .page-inner-comment {
        /*background: white;*/
        /*0213*/
        padding: 0;
        /*0213*/
        overflow: hidden;
        .ay_tab_bd {
            padding-bottom: 0 !important;
        }
        .ay_tab_bd::-webkit-scrollbar {
            display: none;
        }
        h3 {
            font-size: 16px;
            color: #333333;
            letter-spacing: 0.67px;
            line-height: 20px;
            padding: 20px 6px;
            font-weight: normal;
            span {
                color: #FC5A3F;
            }
        }
        .label {
            margin: 10px 0;
            span {
                display: inline-block;
                margin-bottom: 10px;
                margin-right: 10px;
                padding: 0 16px;
                width: auto;
                height: 25px;
                background-color: #f6f6f6;
                border-radius: 50px;
                font-size: 14px;
                color: #666;
                line-height: 25px;
                font-weight: 300;
            }
        }
        section {
            &:before {
                .setTopLine(#DFDFDF);
            }
            //border-top: 1px solid #DFDFDF;
            position: relative;
            padding-top: 15px;
            padding-bottom: 15px;
            .person {
                .circle {
                    width: 30px;
                    height: 30px;
                    border-radius: 30px;
                    overflow: hidden;
                    display: inline-block;
                    vertical-align: bottom;
                    img {
                        width: 30px;
                        height: 30px;
                        overflow: hidden;
                    }
                }
                span {
                    font-size: 12px;
                    color: #333333;
                    margin-right: 5px;
                }
                b {
                    font-size: 12px;
                    color: #666666;
                    float: right;
                    margin-top: 8px;
                }
            }
            .satisfy,
            .notsatisfy {
                display: -webkit-box;
                /*0215F*/
                display: -webkit-flex;
                /*0215F*/
                display: flex;
                /*0215F*/
                align-items: flex-start;
                /*0215F*/
                -webkit-align-items: flex-start;
                /*0215F*/
                -webkit-box-align: flex-start;
                /*0215F*/
                margin-top: 10px;
                position: relative;
                span {
                    font-size: 14px;
                    /*font-size: (14rem/20);!*0215F*!*/
                    color: #3AB359;
                    letter-spacing: 0.59px;
                    height: 20px;
                    width: 53px;
                    /*width: 20%;!*0215F*!*/
                    border: 1px solid #3AB359;
                    border-radius: 50px;
                    display: block;
                    /*0215F*/
                    line-height: 20px;
                    /*top: 0;*/
                    /*0215F*/
                    /*position: absolute;*/
                    /*0215F*/
                    text-align: center;
                }
                p {
                    -webkit-flex: 1;
                    /*0215F*/
                    flex: 1;
                    /*0215F*/
                    -webkit-box-flex: 1;
                    /*0215F*/
                    -moz-box-flex: 1;
                    /*0215F*/
                    -ms-flex: 1;
                    /*0215F*/
                    padding-left: 10px;
                    /*0215F*/
                    box-sizing: border-box;
                    /*0215F*/
                    font-size: 16px;
                    color: #333333;
                    letter-spacing: 0.67px;
                    line-height: 20px;
                    width: 80%;
                    display: block;
                    /*0215F*/
                    /*float: right;*/
                    margin-top: 1px;
                }
            }
            .notsatisfy {
                span {
                    border: 1px solid #FF5000;
                    color: #FF5000;
                }
            }
            .imgcont {
                ul {
                    margin-top: 15px;
                    li {
                        width: 75px;
                        height: 75px;
                        border-radius: 10px;
                        overflow: hidden;
                        display: inline-block;
                        margin-right: 4.5px;
                        img {
                            width: 75px;
                            height: 75px;
                        }
                    }
                }
            }
        }
    }
    
    .page-inner-nocomment {
        .nocomment {
            font-size: 14px;
            color: #999999;
            height: 80px;
            margin-top: 55%;
            position: relative;
            background-position: top center;
            background-size: 13%;
            background-repeat: no-repeat;
            background-image: url("data:image/png;base64,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");
            span {
                position: absolute;
                bottom: 0;
                width: 100%;
                text-align: center;
            }
        }
    }
    
    i.icon-star {
        width: 10px;
        height: 10px;
        display: inline-block;
        margin-right: 1px;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAUCAYAAACJfM0wAAAAAXNSR0IArs4c6QAAAb1JREFUOBGlVMEuA1EUPXfaIBYSH1AbqQ0rQjU0ElobG0s/YGXPCgk27H2EH7DQxkZFW5FYt7HAL1gg7Vz3PmY603ntDG7y5t137jlnbt57M0DC4Kv8io6EdKSTEoHOwQ93LYmGkpD4enEJ7U7VcNOpZVqt3cbpnDiCqbc7hz4vmPtgNIntmMu5RbB7F5KSk6dSvRbCehbxHbPr7W1XasO6VZNFOmZmQqWQAX9k4dAcXD7t0XwvHdqT2gNouIXizSsRcZBHXF6eAH/ugDAFRlbmSTCPBEmxOdG7aJ9E25K5CRo6d6hUfTFC5k2Ap39tqmLTiNGKB6CeZo9pvbEHck4U/FeIh/ESk9Aec2V+Hy6O/mTu4ICK98eeNmSsIFcWdvsemKfqneUgqdg4C8KR62YI8vYgaWBuOg2bKj9ibEyYngeaBYt9uHZjYCaojcmtXLsxs5VsfUEfrt3Y1jFRFTqiYW0iYsy13JhoM109PcpRbFCpUdChudxSwfzI/Gh8QJOIMd7kC9IgasJJbaFUn6X1+qXBFNZcMFNTjoanMYvvR9TYpXGRbyM9Ok3F2kXvz0VlimlNOYZrNAFXSb8ACN6JY+e6y0oAAAAASUVORK5CYII=");
    }
    /*0211*/
    
    .scroll-wrap {
        padding: 0 20px;
        background-color: #fff;
    }
    
    .rotate {
        display: inline-block;
        transform: rotate(-180deg);
    }
    
    .pullup-arrow {
        transition: all linear 0.2s;
        color: #999;
        font-size: 16px;
    }
    
    .pullup-txt {
        color: #999;
        font-size: 14px;
        font-weight: 300;
        line-height: 40px;
    }
    /*0213*/
    
    .scroller-btm {
        padding: 0 20px;
        width: 100%;
        box-sizing: border-box;
        .ay-divider {
            color: #999;
            font-weight: 300;
            line-height: 20px;
        }
    }
    /*0213*/
    
    .load-more {
        position: relative;
        width: 100%;
        height: 60px;
        background-color: #fff;
        &:before {
            content: " ";
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 1px;
            border-top: 1px solid #DFDFDF;
            color: #DFDFDF;
            transform-origin: 0 0;
            transform: scaleY(0.5);
        }
        p {
            display: block;
            font-size: 14px;
            color: #41B3EE;
            font-weight: 300;
            line-height: 60px;
            text-align: center;
        }
    }
    /*0214*/
</style>
<script>
    import {
        go
    } from '../../libs/router'
    import {
        ViewBox,
        Headerbar,
        Cell,
        Scroller,
        Spinner,
        Divider
    } from '../../components'
    import store from '../../vuex/store'/*0228 F*/
    const commit = store.commit || store.dispatch /*0228 F*/
    export default {
        components: {
            // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
            // 否则挂载点和组件名字一致, 即vhead
            ViewBox,
            Headerbar,
            Cell,
            Scroller,
            Spinner,
            Divider
        },
        data() {
            return {
                picList: [],
                pullupStatus: 'default',
                hascomment: false,
                postpara: null,
                getpara1: function() {
                    var p = new Object();
                    p.ProductTypeId = 0;
                    p.ProductId = 0;
                    p.PageSize = 20;
                    p.PageNo = 0;
                    p.cruiseId = 0;
                    return p;
                },
                isShowLoad:false,
                commentlist: {
                    "PagerOrderEvaluateInfosDTOs": [{
                        "CustomerId": 3895,
                        "IdentityDesc": "----",
                        "EvaluateTime": "2015-11-30",
                        "StarNum": 5,
                        "VerifyRecord": null,
                        "Title": "满意&_&不满意",
                        "Titles": [{
                            "Title": "",
                            "Replay": ""
                        }, {
                            "Title": "",
                            "Replay": ""
                        }],
                        "Replay": "服务好，全程有人跟进。&_&",
                        "LabelName": "出签快",
                        "LabelNames": [],
                        "PhotePath": null,
                        "ProductName": ""
                    }],
                    "TotalCount": 0
                },
                GoodValue: 99,
                lables: [],
                myhost: "http://m.aoyou.com"
            }
        },
        methods: {
            back: function() {
                window.history.back()
            },
            takeData: function() {
                var useCache = false;
                var useProxy = true;

                //评价详情
                let _self = this

                this.GetEvDetai("new", this.postpara.PageNo + 1);

                //评价满意度
                var para1 = this.getpara1();
                //if (this.postpara.ProductTypeId != 5) {
                para1.ProductTypeId = 0;
                para1.ProductId = this.postpara.ProductId;
                para1.PageSize = this.postpara.PageSize;
                para1.PageNo = this.postpara.PageNo;
                para1.cruiseId = this.postpara.cruiseId;
                //}

                api.post({
                        path: api.config.microServiceHost.orderevalurl,
                        controller: 'Evaluate',
                        action: 'GetStatisticsEvaluateInfo',
                        param: JSON.stringify(para1),
                        useCache: useCache,
                        useProxy: useProxy,
                        callback: function(obj) {
                            if (obj.ReturnCode == 0) {
                                if (obj.Data != undefined) {
                                    globalthis.GoodValue = obj.Data.GoodValue;
                                }
                            }
                        }
                    })
                    //评价汇总
                var para2 = this.getpara1();
                //if (this.postpara.ProductTypeId != 5) {
                para2.ProductTypeId = 0;
                para2.ProductId = this.postpara.ProductId;
                para2.PageSize = this.postpara.PageSize;
                para2.PageNo = this.postpara.PageNo;
                para2.cruiseId = this.postpara.cruiseId;
                //}
                api.post({
                    path: api.config.microServiceHost.orderevalurl,
                    controller: 'Evaluate',
                    action: 'GetStatisticsLableInfo',
                    param: JSON.stringify(para2),
                    useCache: useCache,
                    useProxy: useProxy,
                    callback: function(obj) {
                        if (obj.ReturnCode == 0) {
                            if (obj.Data != undefined) {
                                globalthis.lables = obj.Data.slice(0, 10);
                            }
                        }
                    }
                })
            },

            //底部加载更多
            loadMore() {
                this.GetEvDetai("append", this.postpara.PageNo + 1);
            },
            GetEvDetai(mode, pageno) { //获取评价详情
                var useCache = false;
                var useProxy = true;
                var para2 = this.getpara1();
                // if (this.postpara.ProductTypeId != 5) {
                    para2.ProductTypeId = this.postpara.ProductTypeId;
                    para2.ProductId = this.postpara.ProductId;
                    para2.PageSize = this.postpara.PageSize;
                    para2.PageNo = pageno;
                    para2.cruiseId = this.postpara.cruiseId;
                // }
                api.post({
                    path: api.config.microServiceHost.orderevalurl,
                    controller: 'Evaluate',
                    action: 'GetPagerOrderEvaluateInfo',
                    param: JSON.stringify(para2),
                    useCache: useCache,
                    useProxy: useProxy,
                    callback: function(obj) {
                        if (obj.ReturnCode == 0) {

                            if (obj.Data != undefined) {
                                var commentlist = obj.Data;
                                //分解评价
                                if (commentlist.PagerOrderEvaluateInfosDTOs != undefined &&
                                    commentlist.PagerOrderEvaluateInfosDTOs != null) {
                                    globalthis.hascomment = true;

                                    for (var i = 0; i < commentlist.PagerOrderEvaluateInfosDTOs.length; i++) {
                                        var item = commentlist.PagerOrderEvaluateInfosDTOs[i];
                                        var Titles = item.Title.split("&_&");
                                        var Replays = item.Replay.split("&_&");
                                        // if(item.PhotePath!=null)
                                        // {
                                        //     var picList=item.PhotePath.split("&_&")
                                        //     var picUrl=""
                                        //     for(var i=0,lg=picList.length;i<lg;i++)
                                        //     {
                                        //         var picUrl=picList[i]
                                        //         picList[i] = "http://images1.aoyou.com/" + picUrl
                                        //     }
                                        //     globalthis.picList=picList
                                        // }
                                        item.Titles = new Array();
                                        for (var j = 0; j < Titles.length; j++) {
                                            var t = {
                                                "Title": Titles[j],
                                                "Replay": Replays[j] != undefined ? Replays[j] : ""
                                            };
                                            item.Titles.push(t);
                                        }

                                        item.LabelNames = item.LabelName.split("&_&");
                                        var dt = item.EvaluateTime.split("T");
                                        if (dt != undefined && dt.length == 2) {
                                            item.EvaluateTime = dt[0]
                                        }
                                    }

                                    if (mode == "append") {
                                        if (globalthis.commentlist != undefined &&
                                            globalthis.commentlist != null) {
                                            globalthis.postpara.PageNo++;
                                            for (var i = 0; i < commentlist.PagerOrderEvaluateInfosDTOs.length; i++) {
                                                globalthis.commentlist.PagerOrderEvaluateInfosDTOs.push(commentlist.PagerOrderEvaluateInfosDTOs[i]);
                                            }
                                            globalthis.commentlist.TotalCount = commentlist.TotalCount;
                                            if(globalthis.commentlist.PagerOrderEvaluateInfosDTOs.length<globalthis.commentlist.TotalCount)
                                            {   
                                                globalthis.isShowLoad=true
                                            }
                                            else
                                            {
                                                globalthis.isShowLoad=false
                                            }
                                        }

                                    } else if (mode == "new") {
                                        globalthis.postpara.PageNo++;
                                        globalthis.commentlist = commentlist;
                                        if(globalthis.commentlist.PagerOrderEvaluateInfosDTOs.length<globalthis.commentlist.TotalCount)
                                        {
                                            globalthis.isShowLoad=true
                                        }
                                    }
                                }

                            }
                            commit('UPDATE_LOADING',false)/*0228 F*/
                        }

                    }
                });
            }
        },
        created() {
            commit('UPDATE_LOADING',true)/*0228 F*/
        },

        ready() {

            globalthis = this;
            this.postpara = this.getpara1();
            this.postpara.ProductTypeId = this.$route.query.ProductTypeId;
            this.postpara.ProductId = this.$route.query.ProductId;
            this.takeData()
        }

    }
    var globalthis;
</script>