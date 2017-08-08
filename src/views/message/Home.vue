<template>

    <div class="message-wrap"><!--0220F-->
        <view-box v-ref:view-box>
            <div class="message-header-box" slot="header">
                <!--<x-header :left-options="{showBack: true}" :right-options="{showBack: true}" :transition="headerTransition" :title="title" :class="{'white-header':route.path.indexOf('/detail')>=0 }" @on-click-title="scrollTop">-->
                <x-header :left-options="{showBack: true}" :right-options="{showBack: true}" :transition="" title="消息" @on-click-title="scrollTop">
                </x-header>
            </div>
        </view-box>

        <div class="page-inner">
            <div class="content">
                <group class="message-group">
                    <cell title="发现头条w" inline-desc="双十一今日抢购通告：3999大溪地自由行再减1000元" link="/headlines">
                        <div slot="icon" class="list-icon">
                            <i class="icon-headline"></i>
                        </div>
                        <span>刚刚</span>
                    </cell>
                </group>
            </div>
        </div>
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

//    import store from '../../vuex/store'
    import { go } from '../../libs/router'
    import {ViewBox, XHeader, Group, Cell} from '../../components'
    export default {
        components: {
            // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
            // 否则挂载点和组件名字一致, 即vhead
            ViewBox,
            XHeader,
            Group,
            Cell,
        },
//        props: {
//            isResult:Boolean,
//        },
        data (){
            return {
//                isPageShow:true,//显示页面
//                isVisaShow:false,//是否显示全部签证页
//                isSelect:true,//底部导航选中
//                navList:[],//头部信息
//                bannerLists:[],//banner轮播图
//                VisaList:[],//热门签证标题链接
//                hotVisaList:[],//热门签证列表
//                weeklySalesList:[],//本周特惠列表
//                otherMenuList:[],//页面底部菜单图片
//                screenHeight:'0px',//屏幕高度
            }
        },
        methods: {

            takeData:function(i){
                this.$http.get('/static/visa_data.json').then((response) => {
                    // success callback
                    var data = response.data
                    this.navList = data.NavList
                    this.bannerLists = data.BannerLists
                    this.VisaList = data.VisaList//签证标题、链接用
                    this.hotVisaList = data.HotVisaList
                    this.weeklySalesList = data.WeeklySalesList
                    this.otherMenuList = data.OtherMenuList
                }, (response) => {
                    // error callback
                });
            },
            scrollTop () {
                this.$refs.viewBox.$els.viewBoxBody.scrollTop = 0
            }/*0220F*/


        },
        created() {
//            this.takeData()
        }
    }

</script>

<style lang="less">
    @import '../../styles/index.less';
    @import '../../styles/ayui/base/reset.less';

    .message-wrap{
        width: 100%;
        height: 100%;
        background-color: #F5F5F5;
    }/*0220F*/

    /*列表*/
    .message-group{
        margin-bottom: 10px;
        width: 100%;
        height: auto;

        .ay_cells{
            margin-top: 0;
            padding: 0 20px;

            &:before, &:after{
                display: none;
            }
        }

        .ay_cell{
            padding: 17px 0;
        }

        .list-icon{
            width: 40px;
            height: 40px;
        }

        .ay_cell_bd {
            padding-left:10px;

           & > p{
                  font-size: 19px;
                  color: #333;
                  line-height: 22px;
           }
        }
        .ay-label-desc{
            display: inline-block;
            position: relative;
            top: 2px;
            height: 18px;
            font-size: 14px;
            color: #999;
            line-height: 18px;
            font-weight: 300;
            .ellipsisLn(1)
        }

        .ay_cell_ft{
            align-items: flex-start;
            -webkit-align-items: flex-start;
            -webkit-box-align: start;
            position: absolute;
            top:20px;
            right: 0;
            margin-right: 0;
            width: auto;
            font-size: 12px;
            color: #999;
            text-align: right;
            line-height: 18px;
            font-weight: 300;

            &.with_arrow:after{
                display: none;
            }
        }
    }


</style>
