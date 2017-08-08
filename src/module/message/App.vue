<template>
    <div class="page" v-cloak>
        <loading :show="isLoading" position="absolute"></loading>
        <!--<router-view-->
                <!--:transition="'ay-pop-' + (direction === 'forward' ? 'in' : 'out')"-->
        <!--&gt;</router-view>-->
        <router-view
                :transition=""
        ></router-view>
    </div><!--0220F-->
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
    import {ViewBox,XHeader, Group, Cell, Loading} from '../../components'
    export default {
        components: {
            // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
            // 否则挂载点和组件名字一致, 即vhead
            ViewBox,
            XHeader,
            Group,
            Cell,
            Loading
        },
        store: store,
        vuex: {
            getters: {
                route: (state) => state.route,
                isLoading: (state) => state.isLoading,
                direction: (state) => state.direction
            }
        },
//        props: {
//            isResult:Boolean,
//        },
        data (){
            return {
                routerTransition: {//页面切换
                    forward: 'slideRL',
                    back: 'slideLR'
                },
                subTitle:""
            }
        },
        methods: {

            scrollTop () {
                this.$refs.viewBox.$els.viewBoxBody.scrollTop = 0
            }
        },

        events:{
            'child-title': function (msg) {
                this.subTitle = msg
                this.title=this.subTitle
            }
        },

        computed: {
            leftOptions () {
                return {
                    showBack: true
                }
            },
            rightOptions: {
                type: Object,
                default () {
                    return {
                        showMore: false
                    }
                }
            },
            headerTransition () {
                return this.direction === 'forward' ? 'ay-header-fade-in-right' : 'ay-header-fade-in-left'
            },

            title () {
                if (this.route.path === '/') return '消息'
                if (this.route.path === '/headlines') return '发现头条'
//                if (this.route.path.indexOf('/detail') >=0) return this.subTitle
		if (this.route.path.indexOf('/detail') >=0) return '发现头条'
            }
        }
    }

</script>

<style lang="less">
    @import '../../styles/index.less';
    @import '../../styles/ayui/base/reset.less';
    html, body {
        height: 100%;
        width: 100%;
        background-color: #f5f5f5;/*0228 F*/
        overflow-x: hidden;

        &::-webkit-scrollbar{
             display: none;
             width:0;
             height:0;
         }
    }

    li{
        list-style: none;
    }

    a{
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    img{
        display: block;
        width: 100%;
        border: none;
    }

    em{
        font-style: normal;
    }

    input:focus{
        outline: none;
    }

    [v-cloak] { display: none }

    .icon-headline{
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 100%;
        background: #FFC05E no-repeat center url(data:image/png;base64,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);
        background-size: contain;
    }

    .icon-share{
        display: block;
        width: 100%;
        height: 100%;
        background: no-repeat center url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABAdJREFUWAntmE1IVFEUx+crXaigmbNwXJTQB0QYOCPYInSRLZQoY2gRUrRzIxQE9mVqEESLsoVtMqIgKFtEMZoIaYuBnA8oadVmJHBMlBFqFtOMM9P/jO887jxmhjfz7gwEXXjv3I9zz/l57r3n3dFk+l+yI9De3t6d3VO4ZS08LHfU5XLdSafTUw6HwxQOhz/psW7WKsHI0VQqdd1sNjthbJ92PF8b+u5AIPAm3zjBwe5NHrdYLLf9fv84t/NJiziA8A/CiA997mLgyAYAG0RbYl0LR2PwM4b+EVEvV10F7OjoaIPCBJ5duRRL7csFx7b0QNpYOZlM3kA9A4doeLEEl3w+33ceL0ViRcbFZYXdJFYma98rkKZ8y61GEAAuhpAFB3u32CakB3DsLw3YDzxWKJI8gXT38gQZkYOtLDj80YPo40O52dTUdFoLiYiLczI4IiDzGZK0rDAgOvK0trb2I3p7BMPh2dnZPwSJvjmhf1wLKRUQxsdywU1PT8cRQQeDIHJhqhNkXV1dQUhpgDit/fAppg2P3W4/S3AEgwgeIkkF9ZVMBa/FxcVYLkin03mVdKQB9vb2vkVkXpBRyBmCowhRmwqgjuzUMu9loZ4LcstqtX4kHWmAo6Ojqb6+vouAu4y91S/CkSMAUp7NFCx3FiB1ciQx/5XNZjuxtLQUpH4+VSbsnzR1UAkGg2r/To+xNz4CjcizG7AC/+bt2traBgBF9ViVFsFCzpDnugmOdBDJz3rhSL8igPBzipxRwfLO79T0vcsO2NPTU4Oo0Qnn8o4remTZASORyDmA1Cgwy/jmftEDxjplBXS73VZEb5id4YA847peWVbAUCh0HiD7CQZwkerq6id6wVhPvW5xhyzZ2dm5Ox6P32d7iOQDr9f7m9v5JL5Ih2msqqpqC/rhsgEmEolJ+LErID/wOXuo1AsKpKRvpBCLxUiYy7LESPrDiBgdjkzB8g4Wk/t4HknpgIC7Art3BSeP8WNqRmgXVZW2xF1dXbZoNHoPkSNALgtY2iFulCKlAGJjHwfcJOAyG1wBWYA8g6XdLgWM5xgCxCXAiU09gecYG1Tka9yiB/guqBkrqmkIEBGrx6PC4TD8wjOC3zSPINXbUVFEGmVDgIgcf7bo1vwSUNfwKfsJqXFTetMQIO6Nm7iaX8Dtdw4XzPXSMfLPNARIZpFCnuc3b3xEeh40jpRt4d8BxMYOMTvSxwGuV1JiPx9kf8yjRhDpIsCDOJ1PKw2p+JtiBvD4qa7mAyi04ZcXdUr99xs7LFImkBlcyKdf1X+Fra6urjc3N2/A0Ek8an+RhmWoJ2BkCNnBQ8ayQNbW1gItLS3vEd5GjNXgqSelCpUV+JlH5AYYrkJ+jbn5CznlhgHnzeWxAAAAAElFTkSuQmCC);
        background-size: contain;
    }

    .page {
        width: 100%;
        height: 100%;
        min-width: 300px;
        max-width: 640px;
        margin:0  auto;
        background: #f5f5f5;/*0220F*//*0224F*/
        overflow: hidden;

        .ay_tab_bd{
            padding-bottom: 0;
        }/*0220F*/

        /*去掉点击高亮*/
        .ay-tap-active{
            -webkit-tap-highlight-color:rgba(0,0,0,0);
            tap-highlight-color:rgba(0,0,0,0);

            &:active{
                 background-color: rgba(255,255,255,0);
             }
        }
    }

    .page-inner{
        position: absolute;
        top:0;
        left: 0;
        padding:0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        overflow: hidden;
        font-family:sans-serif;
    }

    .content{
        position: absolute;
        top:0;
        left: 0;
        padding:44px 0 0 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        overflow: scroll;

        &::-webkit-scrollbar{
             display: none;
             width:0;
             height:0;
        }
    }


    /*页面头部开始部分*/
    .message-header-box{
        position: absolute;
        top:0;
        left: 0;
        width: 100%;
        height: 44px;
        z-index:9;

        .ay-header{
            background-color: #FF5523;

            .ay-header-left{
                top:0;
                left: 0;
                width:44px;
                height:44px;

                .ay-header-back{
                    display: none;
                }
                .left-arrow{
                    top: 0;
                    left: 0;
                    width: 88px;
                    height: 88px;
                    transform: scale(0.5);
                    -webkit-transform: scale(0.5);
                    transform-origin: 0 0;
                    -webkit-transform-origin: 0 0;


                    &:before{
                         top:28px;
                         left:40px;
                         width: 26px;
                         height:26px;
                         border-width: 3px 0 0 3px;
                    }
                }
            }

            .ay-header-right{
                top:0;
                right: 0;
                width:44px;
                height:44px;

                .ay-header-more{
                    display: none;
                }

                a,button{
                    margin-left: 0;
                }
            }

            .ay-header-title, .ay-header h1{
                margin: 0 70px;
                box-sizing: border-box;
                font-size: 19px;

                span{
                    width: 100%;
                    height: 40px;
                    overflow: hidden;
                    -o-text-overflow: ellipsis;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    word-wrap: normal;
                    font-size: 19px;
                }

            }
        }

        .header-other{
            width: 100%;
            height: 100%;
        }
    }


    .pullup-arrow {
        transition: all linear 0.2s;
        color: #666;
        font-size: 25px;
    }




    /**
    * vue-router transition
    **/
    .ay-pop-out-transition,
    .ay-pop-in-transition {
        width: 100%;
        animation-duration: 0.5s;
        animation-fill-mode: both;
        backface-visibility: hidden;
    }
    .ay-pop-out-enter,
    .ay-pop-out-leave,
    .ay-pop-in-enter,
    .ay-pop-in-leave {
        will-change: transform;
        height: 100%;
        position: absolute;
        left: 0;
    }
    .ay-pop-out-enter {
        animation-name: popInLeft;
    }
    .ay-pop-out-leave {
        animation-name: popOutRight;
    }
    .ay-pop-in-enter {
        -webkit-perspective: 1000px;/*透视属性*/
        animation-name: popInRight;
    }
    .ay-pop-in-leave {
        animation-name: popOutLeft;
    }
    @keyframes popInLeft {
        from {
            transform: translate3d(-30%, 0, 0);
        }
        to {
            transform: translate3d(0, 0, 0);
        }
    }
    @keyframes popOutLeft {
        from {
            transform: translate3d(0, 0, 0);
        }
        to {
            transform: translate3d(-30%, 0, 0);
        }
    }
    @keyframes popInRight {
        from {
            transform: translate3d(100%, 0, 0);
        }
        to {
            transform: translate3d(0, 0, 0);
        }
    }
    @keyframes popOutRight {
        from {
            transform: translate3d(0, 0, 0);
        }
        to {
            transform: translate3d(100%, 0, 0);
        }
    }

</style>
