<template>
    <div class="list-wrap"><!--0220F-->
        <view-box v-ref:view-box>
            <div class="message-header-box" slot="header">
                <!--<x-header :left-options="{showBack: true}" :right-options="{showBack: true}" :transition="headerTransition" :title="title" :class="{'white-header':route.path.indexOf('/detail')>=0 }" @on-click-title="scrollTop">-->
                <x-header :left-options="{showBack: true}" :right-options="{showBack: true}" :transition="" title="发现头条" @on-click-title="scrollTop">
                </x-header>
            </div>
            <div class="page-inner message-list">
                <div class="content">
                    <div v-if="messageList.length < 1" class="list-null">
                        <div class="null-content">
                            <div class="null-media"><img src="~assets/wap/icon-message-big.png"></div>
                            <div class="null-inner"><span class="null-title">暂无消息</span></div>
                        </div>
                    </div>
                    <scroller lock-x scrollbar-y use-pullup use-pulldown height="100%" @pullup:loading="loadMore" @pulldown:loading="refresh" :pullup-status.sync="pullupStatus"  :pulldown-status.sync="pulldownStatus"  v-ref:scroller>
                        <div class="list-wrap">
                            <div v-for="item in messageList" class="item-wrap" :class="{'disable':!item.MessageState}">
                                <!--<div v-for="item in n" class="item-wrap" :class="{'disable':!item.MessageState}">-->
                                <divider>{{item.MessageTime}}</divider>
                                <card :header="{title:item.MessageTitle}" :footer="{title:'点击查看',link:'/detail?msgId=311'}" class="message-card">
                                    <div slot="content" class="card-content">
                                        <div class="card-media">
                                            <img :src="item.MessageImageUrl+'?imageView2/1/w/305/h/160'">
                                            <!--<img src="~assets/wap/bg-b.png"  v-lazyload:opt.fadein="item.MessageImageUrl+'?imageView2/1/w/305/h/160'">-->
                                            <div v-if="!item.MessageState" class="img-cover"><span>{{$index}}活动已过期</span></div>
                                        </div>
                                        <div class="card-inner">
                                            <p>{{item.MessageDescription}}</p>
                                        </div>
                                    </div>
                                </card>
                            </div>
                        </div>

                        <div v-if="isListAll" class="list-bottom">
                            <p>已显示全部内容</p>
                        </div>

                        <!--pulldown slot-->
                        <div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-down" style="position: absolute; width: 100%; height: 40px; line-height: 40px; top: -40px; text-align: center;">
                            <span v-show="pulldownStatus === 'default'"></span>
                            <span class="pulldown-arrow" v-show="pulldownStatus === 'down' || pulldownStatus === 'up'" :class="{'rotate': pulldownStatus === 'up'}">↓</span>
                            <span v-show="pulldownStatus === 'loading'"><spinner type="ios-small"></spinner></span>
                        </div>

                        <!--pullup slot-->
                        <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
                            <span v-show="pullupStatus === 'default'"></span>
                            <span class="pullup-arrow" v-show="pullupStatus === 'down' || pullupStatus === 'up'" :class="{'rotate': pullupStatus === 'up'}">↑</span>
                            <span v-show="pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
                        </div>

                    </scroller>
                </div>
            </div>
        </view-box>
    </div>




<!--</div>-->
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

    import store from '../../vuex/store'
    import { go } from '../../libs/router'
    import {ViewBox, XHeader,Scroller, Group, Cell, Divider, Card, Spinner} from '../../components'

    export default {
        components: {
            // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
            // 否则挂载点和组件名字一致, 即vhead
            ViewBox,
            XHeader,
            Scroller,
            Group,
            Cell,
            Divider,
            Card,
            Spinner
        },
//        props: {
//            isResult:Boolean,
//        },
        data (){
            return {
                pulldownStatus: 'default',//下拉刷新状态
                pullupStatus: 'default',//上滑加载状态
                n:3,
                messageList:[],//列表
                isListAll: true//是否显示"已显示全部内容"
            }
        },
        methods: {

            takeData:function(){
                this.$http.get('/static/message_headlines.json').then((response) => {
                    // success callback
                    var data = response.data
                    this.messageList = data.MessageList
                    setTimeout(() => {
                        this.$broadcast('pullup:reset', 'lee111')
                        this.$broadcast('pullup:enable', 'lee111')
                        this.$broadcast('pullup:top', 'lee111')
                    }, 10)
                }, (response) => {
                    // error callback
                });
            },
            refresh (uuid) {//顶部下拉刷新
                setTimeout(() => {
                    this.n += 1
                    this.$nextTick(() => {
                        this.$broadcast('pulldown:reset', uuid)
                    })
                }, 2000)
            },
            loadMore (uuid) {//底部上拉加载
                setTimeout(() => {
                    this.n += 1
                    this.$nextTick(() => {
                        this.$broadcast('pullup:reset', uuid)
                    })
                }, 2000)
            },
            scrollTop () {
                this.$refs.viewBox.$els.viewBoxBody.scrollTop = 0
            }/*0220F*/

        },

//        created() {
//            this.takeData()
//        },

        ready(){
            this.takeData()
            setTimeout(() => {

                this.$broadcast('pulldown:reset', 'lee111')
                this.$broadcast('pullup:reset', 'lee111')
            }, 10);
        }
    }

</script>

<style lang="less">
    @import '../../styles/index.less';
    @import '../../styles/ayui/base/reset.less';

    .list-wrap{
        width: 100%;
        height: 100%;
    }/*0220F*/

    /*列表*/
    .message-list{
        background-color: #F5F5F5;
        /*padding-top: 44px;*/
        /*height: 100%;*/
        /*box-sizing: border-box;*/

        .content{
            padding-bottom: 0;
            overflow: hidden;
        }

        .list-wrap{
            padding-top: 20px;
        }

        .item-wrap{
            margin-bottom: 20px;
            padding: 0 20px;
            width: 100%;
            box-sizing: border-box;
        }

        .ay-divider{
            padding: 0;
            width: 100%;
            font-size: 12px;
            color: #999;
            line-height:24px;

            &:before, &:after{
                display: none;
            }
        }

        .ay_panel{
            margin-top: 0;
            padding: 20px 15px 0 15px;
            border-radius: 10px;
            box-sizing: border-box;

            &:before, &:after{
                display: none;
            }
        }

        .ay_panel_hd{
            padding: 0;
            font-size: 17px;
            color: #333;
            line-height: 23px;

            &:after{
                display: none;
            }
        }

        .ay_panel_ft{
            margin-top: 10px;
            padding: 10px 0;
            font-size: 14px;
            color: #41B3EE;

            &:before{
                 left: 0;
                 border-top: 1px solid #DFDFDF;
                 color: #DFDFDF;
            }

            &:after{
                 right: 2px;
                 width: 9px;
                 height: 9px;
                 border-color: #777;
             }
        }

        .card-content{
            padding: 0;
        }

        .card-media{
            position: relative;
            margin-top: 10px;
            width: 100%;
            height: (160rem/20);

            img{
                display: block;
                width: 100%;
                height: 100%;
                border: none;
            }

            .img-cover{
                display: -webkit-box;
                display: -webkit-flex;
                display: flex;
                align-items: center;
                -webkit-align-items: center;
                -webkit-box-align: center;
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,.5);

                span{
                    display: block;
                    width: 100%;
                    font-size: 19px;
                    color: #fff;
                    text-align: center;
                }
            }
        }

        .card-inner{
            padding-top: 8px;
            font-size: 14px;
            color: #333;
            font-weight: 300;
            line-height: 20px;
        }

        .disable{
            .ay_panel_hd,.card-inner{
                color: #999;
            }
            .ay_panel_ft{
                color: #ccc;

                &:after{
                     border-color: #ccc;
                }

            }
        }

        .list-null{
            position: absolute;
            top: 35%;
            left: 0;
            box-sizing: border-box;
            width: 100%;
            height: 100%;

            .null-content{
                display: -webkit-box;
                display: -webkit-flex;
                display: flex;
                flex-direction: column;
                -webkit-flex-direction: column;
                -webkit-box-orient: vertical;
                -moz-box-orient: vertical;
                box-orient: vertical;
                -webkit-box-direction: vertical;
                align-items: center;
                -webkit-align-items: center;
                -webkit-box-align: center;
                width: 100%;
            }

            .null-media{
                width: 50px;
                height: 50px;
            }

            .null-inner{
                margin-top: 10px;
                width: 100%;
                line-height: 0;
                text-align: center;

                .null-title{
                    display: inline-block;
                    font-size: 17px;
                    color: #999;
                    font-weight: 300;
                    line-height: 30px;
                }
            }
        }

        .list-bottom{
            padding-bottom: 10px;
            width: 100%;
            height: 20px;

            p{
                display: block;
                width: 100%;
                font-size: 12px;
                color: #ccc;
                line-height: 20px;
                font-weight: 300;
                text-align: center;
            }
        }

    }

    /*.rotate {*/
        /*display: inline-block;*/
        /*transform: rotate(-180deg);*/
    /*}*/
    .pullup-arrow,.pulldown-arrow{
        color: #ccc;
        font-size: 12px;
        line-height: 20px;
    }

</style>
