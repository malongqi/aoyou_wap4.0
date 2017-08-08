<template>
    <div class="page" v-cloak>
        <loading :show="isLoading" position="absolute"></loading>
        <view-box v-ref:view-box>
            <div class="page-inner grade-wrap">
                <!--头部标题栏 START-->
                <div class="grade-header-box" slot="header">
                    <x-header :left-options="{showBack: true}" :right-options="{showMore: false}" title="钻级说明"  @on-click-title="scrollTop">
                    </x-header>
                </div>
                <!--头部标题栏 END-->
                <!--页面主体 START-->
                <div class="content">
                    <div class="grade-headline">遨游网产品钻级</div>
                    <div class="grade-desc">遨游“橙钻产品等级体系“是中青旅遨游精心打造的产品体系，致力于让消费者清晰透明的把握旅游产品标准等级体系，挑选心仪的旅游服务产品。凡标明了橙钻等级图示的产品，均符合以下标准：</div>
                    <!--3钻 START-->
                    <group class="grade-item"> 
                        <cell class="item-title" title="3钻标准"><div slot="icon" class="class-tag">3钻</div></cell>
                        <cell class="item-subtitle subtitle-green" title="跟团游标准"><div slot="icon" class="type-tag">跟团游</div></cell>
                        <div class="item-content">
                            <p>【住宿】入住当地3星级或外网评级3星标准酒店/客栈</p>
                            <p>【交通】旅游用车每人一正座，且旅游用车空座率不低于5%（景区或当地特种用车除外）</p>
                            <p>【餐饮】抵达之日赠送一瓶矿泉水</p>
                        </div>
                        <cell class="item-subtitle subtitle-orange" title="自由行标准"><div slot="icon" class="type-tag">自由行</div></cell>
                        <div class="item-content">
                            <p>【住宿】入住当地3星级或外网评级3星标准酒店/客栈。</p>
                        </div>
                    </group>
                    <!--3钻 END-->

                    <!--4钻 START-->
                    <group class="grade-item"> 
                        <cell class="item-title" title="4钻标准"><div slot="icon" class="class-tag">4钻</div></cell>
                        <cell class="item-subtitle subtitle-green" title="跟团游标准"><div slot="icon" class="type-tag">跟团游</div></cell>
                        <div class="item-content">
                            <p>【住宿】入住当地/国际4星级或外网评级4星标准酒店。入住天数至少占产品总入住天数的70%。目的地如无此等级酒店， 则选用无钻级和星级评定的特色体验型住宿场所（例如别墅、庄园、蒙古包等）</p>
                            <p>【交通】旅游用车空座率不低于10%（景区或当地特种用车和接送机用车除外）</p>
                            <p>【餐饮】含至少一次当地特色风味餐</p>
                        </div>
                        <cell class="item-subtitle subtitle-orange" title="自由行标准"><div slot="icon" class="type-tag">自由行</div></cell>
                        <div class="item-content">
                            <p>【住宿】入住当地/国际4星级或外网评级4星标准酒店。入住天数至少占产品总入住天数的70%。目的地如无此等级酒店， 则选用无钻级和星级评定的特色体验型住宿场所（例如别墅、庄园、蒙古包等）</p>
                        </div>
                    </group>
                    <!--4钻 END-->
                    <!--5钻 START-->
                    <group class="grade-item"> 
                        <cell class="item-title" title="5钻标准"><div slot="icon" class="class-tag">5钻</div></cell>
                        <cell class="item-subtitle subtitle-green" title="跟团游标准"><div slot="icon" class="type-tag">跟团游</div></cell>
                        <div class="item-content">
                            <p>【住宿】入住当地/国际5星级或外网评级5星标准酒店。入住天数至少占产品总入住天数的70%。如当地无五星标准酒店，则选择当地最高标准酒店。</p>
                            <p>【交通】旅游用车空座率不低于15%或配备专用行李车（景区或当地特种用车和接送机用车除外）</p>
                            <p>【航班】选择直飞航班或五星航空或转机时间不超过5小时（无其他选择航班除外）。</p>
                            <p>【餐饮】含至少二次当地特色风味餐</p>
                            <p>【领队/导游】安排3年以上工作经验的优秀领队</p><!--0228 F-->
                        </div>
                        <cell class="item-subtitle subtitle-orange" title="自由行标准"><div slot="icon" class="type-tag">自由行</div></cell>
                        <div class="item-content">
                            <p>【住宿】入住当地/国际5星级或外网评级5星标准酒店。入住天数至少占产品总入住天数的70%。如当地无五星标准酒店，则选择当地最高标准酒店。</p>
                            <p>【航班】选择直飞航班或五星航空或转机时间不超过5小时（无其他选择航班除外）。</p>
                        </div>
                    </group>
                    <!--5钻 END-->
                    <!--6钻 START-->
                    <group class="grade-item"> 
                        <cell class="item-title" title="6钻标准"><div slot="icon" class="class-tag">6钻</div></cell>
                        <cell class="item-subtitle subtitle-green" title="跟团游标准"><div slot="icon" class="type-tag">跟团游</div></cell>
                        <div class="item-content">
                            <p>【人数】每团最多16人。</p>
                            <p>【住宿】入住国际连锁五星级或网评五星级酒店或精品特色酒店，私家别墅或庄园，皇宫、城堡改建的特色酒店。入住天数至少占产品总入住天数的80%。</p>
                            <p>【交通】旅游用车空座率不低于40%或配备专用行李车（景区或当地特种用车和接送机用车除外）；行程内的火车、轮船安排不低于二等座/舱。</p>
                            <p>【餐饮】根据目的地情况，安排当地2次以上特色餐厅用餐。</p>
                            <p>【航班】国际航线安排商务舱，头等舱可选项，不使用红眼航班；选择直飞航班或五星航空或转机时间不超过4小时（无其他选择航班除外）。</p>
                            <p>【领队/导游】安排4年以上工作经验的优秀领队。</p>
                        </div>
                        <cell class="item-subtitle subtitle-orange" title="自由行标准"><div slot="icon" class="type-tag">自由行</div></cell>
                        <div class="item-content">
                            <p>【住宿】住国际连锁五星级或网评五星级酒店或精品特色酒店，私家别墅或庄园，皇宫、城堡改建的特色酒店。入住天数至少占产品总入住天数的80%。</p>
                            <p>【航班】国际航线安排商务舱，头等舱可选项，不使用红眼航班；选择直飞航班或五星航空或转机时间不超过4小时（无其他选择航班除外）。</p>
                        </div>
                    </group>
                    <!--6钻 END-->

                </div>
                <!--页面主体 END-->
            </div>

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

//    var intervaltime, mstime
    import store from '../../vuex/store'
    import { go } from '../../libs/router'
    import {Loading, ViewBox,XHeader,Divider, Group, Cell, Switch, Actionsheet, Confirm} from '../../components'
    export default {
        components: {
            // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
            // 否则挂载点和组件名字一致, 即vhead
            Loading,
            ViewBox,
            XHeader,
            Divider,
            Group,
            Cell,
            Switch,
            Actionsheet,
            Confirm
        },

        store: store,
        vuex: {
            getters: {
                route: (state) => state.route,
                isLoading: (state) => state.isLoading,
                direction: (state) => state.direction
            }
        },/*0228 F*/

        data (){
            return {

            }
        },
        methods: {

            //返回顶部 START
            scrollTop () {
                this.$refs.viewBox.$els.viewBoxBody.scrollTop = 0
            }
            //返回顶部 END

        },

        computed: {

        },

        ready(){
//            this.takeData()
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

    .icon-back{
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAlCAYAAABCr8kFAAAAAXNSR0IArs4c6QAAAVlJREFUSA2t1rtKxUAQBmA3ly7VsQ1IGitBJJfG0lKwEivBwofQU9npS5zCwsfQOpBU+gqSUluLkMSZGEMOJ5eZ2R1ISBbmy08gk7X3DFSSJIe+76+KovhWul4YhvdgPKJj2/appQPGcbyG/ic4MJiq6/pAnBAxANpkGEop9RoEwbkIHMNc171I0/SHDc5hbVI8UWsJQ4eckIKRQSpGAjnYIsjFZkEJNglKsVFQB9sBdbEt0ATWg6awFoyi6LZpmg3eYOHU+P/Q/1Z4Zwuwq0HLhw6GjgWJPgfgUVmWl4N79qUFdQdd710nJn6Gd3rNlrqGdtrAT2a/qqo3WDvu1mt40E2e5y9cuB9fptAexCQm0C3QBLoD6qKjoA46CUrRWVCCLoJclARyUDJIRVkgBWWDS6gInEIdxzkRbzizLPuCHesZ4P3og4kViRNiSiwcKLDxfIBL5Xne+hcZYijicZw0+QAAAABJRU5ErkJggg==);
    }

    .page{
        width: 100%;
        height: 100%;
        min-width: 300px;
        max-width: 640px;
        margin:0  auto;
        background: #f5f5f5;/*0224F*/
        overflow: hidden;

        .ay_cell{
            -webkit-tap-highlight-color:rgba(0,0,0,0);
        }
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
        padding: 44px 20px 30px 20px;
        width: 100%;
        height: 100%;
        background-color: #fff;
        box-sizing: border-box;
        overflow: scroll;

        &::-webkit-scrollbar{
             display: none;
             width:0;
             height:0;
         }
    }

    .grade-wrap{
        background-color: #fff;
    }

    /*头部标题栏*/
    .grade-header-box{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        z-index: 9;

        &:after{
         .setBottomLine(@ayCellBorderColor);
        }

        .ay-header{
            background-color: #fff;

            .ay-header-left{/*头部左侧*/
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

                    &:before{/*头部左侧箭头*/
                         top:28px;
                         left:40px;
                         width: 26px;
                         height:26px;
                         border-width: 3px 0 0 3px;
                        border-color:#333;
                     }
                }
            }


            .ay-header-title, .ay-header h1{/*头部中间标题*/
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
    }



    /*页面大标题*/
    .grade-headline{
        position: relative;
        margin-top: 8px;
        padding: 8px 0;
        font-size: 19px;
        color: #333;
        line-height: 44px;

        &:after{
            .setBottomLine(#DFDFDF);
        }
    }

    .grade-desc{
        padding-top: 15px;
        font-size: 16px;
        color: #333;
        font-weight: 300;
        line-height: 27px;
    }

    .grade-item{
        margin-top: 20px;
        font-size: 16px;
        color: #333;
        font-weight: 300;
        line-height: 27px;

        .ay_cells,.ay_cell{
            &:before, &:after{
                 display: none;
            }
        }

        .ay_cells{
            margin-top: 25px;
        }

        .ay_cell{
            padding: 0;
        }

        .item-title{
            .ay_cell_hd{
                width: 32px;
                height: 14px;
            }

            .class-tag{
                display: block;
                padding: 0;
                width: 50px;
                height: 28px;
                border: 1px solid #FDA403;
                border-radius: 6px;
                box-sizing: border-box;
                font-size: 20px;
                color: #FDA403;
                line-height: 26px;
                text-align: center;
                white-space: nowrap;
                transform: scale(0.5);
                -webkit-transform: scale(0.5);
                transform-origin: 0 0;
                -webkit-transform-origin: 0 0;
            }

            .ay_cell_bd{

                & > p{
                    font-size: 16px;
                    color: #FDA403;
                    font-weight: 300;
                    line-height: 27px;
                }
            }

        }

        .item-subtitle{
            .ay_cell_hd{
                margin-right: 5px;
            }

            .type-tag{
                width: 55px;
                height: 20px;
                font-size: 12px;
                color: #fff;
                line-height: 20px;
                text-align: center;
                border-radius: 5px;
            }


            .ay_cell_bd{
                & > p{
                      font-size: 16px;
                      font-weight: 300;
                      line-height: 27px;
                  }
            }
        }

        .subtitle-green{
            .type-tag{
                background-color: #70C100;
            }

            .ay_cell_bd>p{
                color: #70C100;
            }
        }

        .subtitle-orange{
            .type-tag{
                background-color: #FF6602;
            }

            .ay_cell_bd>p{
                color: #FF6602;
            }
        }

        .item-content{
            line-height: 27px;

            p{
                line-height: 27px;
            }
        }



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
