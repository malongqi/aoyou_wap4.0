<template>
    <div class="page" v-cloak>
        <loading :show="isLoading" position="absolute"></loading>
        <view-box v-ref:view-box>
            <!--头部标题栏 START-->
            <div class="white-header-box" slot="header">
                <x-header :left-options="{showBack: true}" :right-options="{showMore: false}" :transition="headerTransition"  :title="title"  :class="{'white-header':route.path.indexOf('/destination') >=  0}"  @on-click-title="scrollTop">
                </x-header>
            </div>
            <!--头部标题栏 END-->

            <router-view
                    :transition="'ay-pop-' + (direction === 'forward' ? 'in' : 'out')"
            ></router-view>

        </view-box>

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

    import store from '../../vuex/store'
    import { go } from '../../libs/router'
    import {ViewBox,XHeader,Loading} from '../../components'
    export default {
        components: {
            // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
            // 否则挂载点和组件名字一致, 即vhead
            ViewBox,
            XHeader,
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
        data (){
            return {

            }
        },
        methods: {
            //回到顶部
            scrollTop () {
                this.$refs.viewBox.$els.viewBoxBody.scrollTop = 0
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
//                if (this.route.path.indexOf("/destination") >=  0) return '目的地'
                if (this.route.path.indexOf("/coin-intros")>=0) return '游币说明'
                if (this.route.path.indexOf("/my-coins")>=0) return '我的游币'
                if (this.route.path.indexOf("/privilege")>=0) return '更多特权'
                if (this.route.path.indexOf("/grade")>=0) return '会员等级说明'
                else return '会员中心'
            }
        },
        ready(){

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

    em{
        font-style: normal;
    }

    input:focus{
        outline: none;
    }

    [v-cloak] { display: none }


    .icon-tel{
        background-image: url(data:image/png;base64,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);
    }
    .icon-message{
        background-image: url(data:image/png;base64,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);
    }
    .icon-back{
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAlCAYAAABCr8kFAAAAAXNSR0IArs4c6QAAAVlJREFUSA2t1rtKxUAQBmA3ly7VsQ1IGitBJJfG0lKwEivBwofQU9npS5zCwsfQOpBU+gqSUluLkMSZGEMOJ5eZ2R1ISBbmy08gk7X3DFSSJIe+76+KovhWul4YhvdgPKJj2/appQPGcbyG/ic4MJiq6/pAnBAxANpkGEop9RoEwbkIHMNc171I0/SHDc5hbVI8UWsJQ4eckIKRQSpGAjnYIsjFZkEJNglKsVFQB9sBdbEt0ATWg6awFoyi6LZpmg3eYOHU+P/Q/1Z4Zwuwq0HLhw6GjgWJPgfgUVmWl4N79qUFdQdd710nJn6Gd3rNlrqGdtrAT2a/qqo3WDvu1mt40E2e5y9cuB9fptAexCQm0C3QBLoD6qKjoA46CUrRWVCCLoJclARyUDJIRVkgBWWDS6gInEIdxzkRbzizLPuCHesZ4P3og4kViRNiSiwcKLDxfIBL5Xne+hcZYijicZw0+QAAAABJRU5ErkJggg==);
    }


    .page{
        width: 100%;
        height: 100%;
        min-width: 300px;
        max-width: 640px;
        margin:0  auto;
        /*background: #efeff4;*//*0228 F*/
        overflow: hidden;

        .ay_cell{
            padding: (17rem/20) 0;
            -webkit-tap-highlight-color:rgba(0,0,0,0);
        }
        .ay-tap-active{
            -webkit-tap-highlight-color:rgba(0,0,0,0);
            tap-highlight-color:rgba(0,0,0,0);

            &:active{
                 background-color: rgba(255,255,255,0);
             }
        }

        .ay_tabbar{
            height: 60px;
            background-color:#fff;

            &:before{
                 height: 2px;
                 border-top:2px solid #d9d9d9;
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
        -webkit-overflow-scrolling: touch;


        &::-webkit-scrollbar{
             display: none;
             width:0;
             height:0;
         }
    }


    /*页面头部标题*/
    .white-header-box{
        position: absolute;
        top:0;
        left: 0;
        width: 100%;
        height: 44px;
        z-index:9;

        &.fixed-header{
            position: fixed;
        }

        &:after{
            .setBottomLine(@ayCellBorderColor);
        }

        .ay-header{
            background-color: #fff;

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
                         border-color:#333;
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
                color: #333;

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

        .white-header{
            background-color: #fff;
            &:after{
             .setBottomLine(#dfdfdf);
             }

            .ay-header-left .left-arrow:before{
                border-color: #333
            }

            .ay-header-title, .ay-header h1{
                color: #333;
            }

        }


    }

    .ay-section{
        padding: 0 20px;
        background-color: #fff;
        margin-bottom: 10px;

        .ay_cells{
            margin-top: 0;
        }


        .ay_cell_ft.with_arrow:after {
            top: 50%;
            right: 1px;
            margin-top: -5px;
            width: 9px;
            height: 9px;
            border-color: #777;
        }


        &.no-padding{
            padding: 0;
        }
    }

    /*初始页左滑出*/
    .slideInLeft-transition {
        transition:transform .3s;
        -webkit-transition: transform .3s;
    }
    .slideInLeft-enter, .slideInLeft-leave {
        -webkit-transform: translate3d(-20%, 0, 0);
        transform: translate3d(-20%, 0, 0);
    }

    /*右滑入*/
    .slideInRight-transition {
        transition:transform .3s;
        -webkit-transition: transform .3s;
    }
    .slideInRight-enter, .slideInRight-leave {
        -webkit-transform: translate3d(100%, 0, 0);
        transform: translate3d(100%, 0, 0);
    }

    /*底部向上滑入*/
    .slideInUp-transition {
        transition:transform .3s;
        -webkit-transition: transform .3s;
    }
    .slideInUp-enter, .slideInUp-leave {
        -webkit-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0);
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
