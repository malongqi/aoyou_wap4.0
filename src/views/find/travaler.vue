<template>
    <div class="page tavaler">
        <view-box>
            <div class="ay-header-box fixed" slot="header">
                <div class="header-cover" :style="{opacity:isOpacity}">
                    <h4 class="title">{{user_nick_name}}</h4></div>
                <headerbar class="shade">
                    <span slot="left" class="icons icon-arrow" v-on:click='back()'></span>

                    <span slot="right" class="icons icon-share" v-on:click="share()" v-if="showShare"></span>
                </headerbar>
            </div>
            <div class="page-inner tavaler" @touchstart="touchmovefunc('start')" @touchMove="touchmovefunc('move')" @touchend="touchmovefunc('end')">
                <scroller lock-x scrollbar-y use-pullup height="100%" :pullup-status.sync="pullupStatus"
                          @pullup:loading="load">
                    <!--content slot-->
                    <!--精彩发现-->
                    <section>
                        <!--banner图-->
                        <blur :blur-amount=10 :url="userAvatar" :height=280 style="z-index: 6;">
                            <div class="avatar"><img :src="userAvatar"></div>
                        </blur>
                        <div class="banner">
                            <div class="ban-infor">
                                <h2>{{user_nick_name}}</h2>
                                <p>{{customerstatus}}</p>
                            </div>
                        </div>
                        <section class="ay-section">
                            <div class="selfdescrip">
                                <p>{{description}}</p>
                            </div>
                        </section>
                        <section>
                            <a class="note-item"  v-for="noteItem in Message" style="padding-top:0">
                                <div v-link="{path:'detail',query:{'bid':noteItem.board_id,'tid':noteItem.topic_id}}" v-on:click="ToDetail()">
                                <div class="imgbox">
                                    <img v-for="imgItem in noteItem.imageList" track-by="$index" :src="$index==0?imgItem+'?imageView2/2/w/750':imgItem+'?imageView2/1/w/121/h/80'">
                                </div>
                                <p class="title">{{noteItem.title}}</p>
                                </div>
                                <div class="item-block">

                                    <div class="block relate">
                                        <span v-if="noteItem.hits<=100000"><i class="icon-see"></i><em>{{noteItem.hits}}</em></span>
                                        <span  v-if="noteItem.hits>100000"><i class="icon-see"></i><em>10w+</em></span>
                                        <span><i class="icon-zan"></i><em>{{noteItem.recommendAdd}}</em></span>
                                    </div>
                                </div>
                            </a>
                        </section>
                        <div class="ending" v-if="has_next==0">
                            <p><span>已到底线</span></p>
                        </div>
                    </section>
                    <!--pullup slot-->
                    <div  slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
                        <span v-show="pullupStatus === 'default'"></span>
                        <span v-show="pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
                    </div>
                </scroller>
            </div>
        </view-box>
    </div>
</template>

<style lang="less">
    @import '../../styles/variable.less';

    .header-cover {
        width: 100%;
        height: 44px;
        top: 0;
        position: absolute;
        margin: 0 auto;
        background-color:@x-header-background-color ;
        opacity: 0;
        .title {
            height: 44px;
            line-height: 44px;
            text-align: center;
            font-size: 18px;
            font-weight: 400;
            width: auto;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #fff;
            -webkit-font-smoothing: antialiased;
        }
    }
    
    .selfdescrip {
        padding: 20px 0 30px;
        text-align: justify;
        font-size: 16px;
        -webkit-font-smoothing: antialiased;
        line-height: 27px;
    }
    
    .tavaler {
        .page-inner {
            padding-top: 0
        }
        .banner {
            position: absolute;
            top: 0;
            width: 100%;
            height: 280px;
            background: none;
            z-index: 7;
            background: rgba(0,0,0,.3);
        }
        .avatar {
            width: 70px;
            height: 70px;
            position: absolute;
            text-align: center;
            top: 85px;
            left: 50%;
            margin-left: -35px;
            color: #fff;
            border-radius: 50%;
            font-size: 18px;
            overflow: hidden;
            border: 3px solid #fff;
            img {
                display: block;
                width: 70px;
                height: 70px;
            }
        }
    }
    
    .fixed {
        position: fixed;
        height: 44px;
        width: 100%;
        z-index: 9;
        .ay-header-bar {
            background-color: transparent;
        }
    }
    
    .nobottom {
        .ay_tab_bd {
            padding-bottom: 0;
        }
    }
    
    .ban-infor {
        position: absolute;
        box-sizing: border-box;
        text-align: center;
        bottom: 19px;
        width: 100%;
        padding: 0 20px;
        color: #fff;
        -webkit-font-smoothing: antialiased;
        p {
            height: 66px;
            color: #fff;
            font-size: 12px;
            line-height: 1.4;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4;
        }
        h2 {
            padding: 10px 20px 5px 20px;
            line-height: 1;
            font-weight: normal;
            position: relative;
            z-index: 2;
            font-size: 19px;
        }
    }
</style>
<script>
    var lastMoveTime = 0;
    var lastMoveStart = 0;
    var stopInertiaMove = false; // 是否停止缓动
    import store from '../../vuex/store'
    const commit = store.commit || store.dispatch
    import {
        go
    } from '../../libs/router'
    import {
        ViewBox,
        Headerbar,
        Search,
        Tab,
        TabItem,
        Group,
        Cell,
        Scroller,
        Tabbar,
        TabbarItem,
        Actionsheet,
        Spinner,
        Blur

    } from '../../components'
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
            Cell,
            Scroller,
            Tabbar,
            TabbarItem,
            Actionsheet,
            Spinner,
            Blur

        },
        data() {
            return {
                bid: '0', //合并前备份
                uid: '0',
                pageNo: 0,
                pageSize: 5,
                has_next: 1,
                user_nick_name: '',
                userAvatar: '',
                customerstatus: '',
                description: '',
                results: [],
                Message: [],
                HeaderInfor: [],
                isFooter: false,
                pullupStatus: 'default',
                isOpacity: 0,
                url: 'http://images1.aoyou.com/sales/201606/jlx0h214162208.jpg?imageView2/1/w/256/h/192/q/90/',
                type: 0,
                showShare:api.showShare,
                shareTitle:"",
                shareSubTitle:"",
                shareImg:"",
            }
        },
        methods: {
            takeData: function() {
                this.getList()
            },
            load(uuid) {
                this.getList(uuid)
            },
            getList: function(uuid) {

                var vm = this
                var useCache = false
                var useProxy = true
                if (vm.has_next == 1) {
                    vm.pageNo++
                        var detailParam = {
                            "fid": vm.bid,
                            "uid": vm.uid,
                            "pageNo": vm.pageNo,
                            "pageSize": vm.pageSize
                        }
                    api.post({
                        path: api.config.microServiceHost.findurl,
                        controller: 'Precious',
                        action: 'GetTravelerNewsList',
                        param: JSON.stringify(detailParam),
                        useCache: useCache,
                        useProxy: useProxy,
                        callback: function(obj) {
                            if (obj.ReturnCode == 0) {
                                var data = obj.Data;
                                //微信分享
                                vm.shareTitle="遨游旅行家："+data.forumInfo.boardname
                                vm.shareSubTitle=data.forumInfo.description
                                vm.shareImg=data.forumInfo.icon
                                vm.initShareDialog()

                                vm.customerstatus = data.forumInfo.customerstatus
                                vm.description = data.forumInfo.description
                                if (data.list != null && data.list.length > 0) {
                                    vm.user_nick_name = data.list[0].user_nick_name

                                    vm.userAvatar = data.list[0].userAvatar
                                    var flag = (vm.Message.length + 1) % 2;
                                    for (var i = 0, len = data.list.length; i < len; i++) {
                                        if ((i + 1) % 2 == flag) {
                                            data.list[i].imageList = data.list[i].imageList.splice(0, 1);
                                        } else {

                                            data.list[i].imageList = data.list[i].imageList.splice(0, 4);
                                        }
                                        vm.Message.push(data.list[i])
                                    }
                                    if (uuid) {
                                        setTimeout(() => {
                                            vm.$broadcast('pullup:reset', uuid)
                                        }, 10)
                                    } else {
                                        setTimeout(() => {
                                            vm.$broadcast('pullup:reset', 'lee111')
                                            vm.$broadcast('pullup:enable', 'lee111')
                                        }, 10)
                                    }
                                } else {
                                    vm.has_next = 0
                                }
				                commit('UPDATE_LOADING',false)
                            }
                        }
                    })
                }
            },
            back: function() {
                api.pageBack()
            },
            touchmovefunc: function(type) {
                let e = event
                if (type == 'start') {
                    //缓动代码
                    lastMoveStart = 0;
                    lastMoveTime = e.timeStamp || Date.now();
                    stopInertiaMove = true;
                } else if (type == 'move') {
                    //fix tab 移动大于254px时 置顶推荐主题标签
                    if (this.getTrans() < -280) {
                        this.isOpacity = 1
                    } else if (this.getTrans() >= -50) {
                        this.isOpacity = 0
                    } else {
                        this.isOpacity = Math.abs(this.getTrans()) / 280
                    }
                    //缓动代码
                    var nowY = this.getTrans();
                    var nowTime = e.timeStamp || Date.now();
                    stopInertiaMove = true;
                    if (nowTime - lastMoveTime > 300) {
                        lastMoveTime = nowTime;
                        lastMoveStart = nowY;
                    }
                } else {
                    //缓动代码
                    var nowY = this.getTrans();
                    var nowTime = e.timeStamp || Date.now();
                    var v = (nowY - lastMoveStart) / (nowTime - lastMoveTime); //最后一段时间手指划动速度
                    stopInertiaMove = false;
                    var _this = this;
                    (function(v, startTime, ev) {
                        var dir = v > 0 ? -1 : 1; //加速度方向
                        var deceleration = dir * 0.0006;
                        var duration = v / deceleration; // 速度消减至0所需时间
                        if (Math.abs(duration) > 3000) {
                            duration = 1000
                        }
                        setTimeout(function() {
                            if (_this.getTrans() >= -50) {
                                _this.isOpacity = 0
                                return;
                            }
                        }, Math.abs(duration));
                    })(v, nowTime, e);
                }
            },
            //页面touchmove移动 END
            getTrans: function() {
                let _trEle = this.$el.getElementsByClassName('xs-container')[0]
                if (_trEle) {
                    let _tempStr = document.defaultView.getComputedStyle(this.$el.getElementsByClassName('xs-container')[0]).transform.toString()
                    return _tempStr.substring(7, _tempStr.length - 1).split(',')[5]
                } else {
                    return 0
                }
            },
            share:function(){
                api.openShareDialog(this.shareTitle, this.shareSubTitle, window.location.href, this.shareImg, {})
            },
            //wap微信分享
            initShareDialog:function(){
                api.initShareDialog(this.shareTitle,this.shareSubTitle, window.location.href, this.shareImg)
            }
        },
        created() {
            commit('UPDATE_LOADING',true)
            this.screenHeight = `${document.body.clientHeight - 99}px` //计算搜索关键词列表高度：屏幕高度-顶部标题栏高度
            this.searchHeight = `${document.body.clientHeight - 50}px` //计算搜索关键词列表高度：屏幕高度-顶部标题栏高度

        },
        ready() {
            this.uid = this.$route.query.uid
            this.bid = this.$route.query.bid
            this.takeData()
                //   setTimeout(() => {
                //     this.$broadcast('pullup:reset', 'lee111')
                //   }, 10)

        }
    }
</script>