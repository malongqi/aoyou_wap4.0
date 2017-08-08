<template>
    <div class="success-wrap"><!--0220F-->
        <!--头部标题栏 START-->
        <div class="tailor-header-box" slot="header">
            <x-header :left-options="{showBack: true}" :right-options="{showMore: false}"  title="遨游定制"   @on-click-title="scrollTop">
            </x-header>
        </div>
        <!--头部标题栏 END-->

        <div class="page-inner">
            <!--页面 START-->
            <div class="content">
                <!--步骤 START-->
                <!--<section class="ay-section no-padding">-->
                    <!--<div class="tailor-step">-->
                        <!--<step :current.sync="step" background-color='' gutter="0">-->
                            <!--<step-item title="填写信息" class="step-fill"></step-item>-->
                            <!--<step-item title="选择专家" class="step-expert" v-show="isBJ"></step-item>-->
                            <!--<step-item title="成功提交" class="step-success"></step-item>-->
                        <!--</step>-->
                    <!--</div>-->
                <!--</section>-->
                <!--步骤 END-->

                <!--内容 START-->
                <section class="ay-section">
                    <div class="success-content">
                        <div class="item-media"><i class="icon-success"></i><img src="~assets/wap/icon-success.png"></div>
                        <div class="item-title">您已成功提交需求单！</div>
                        <div class="item-btn">
                            <x-button type="warn" @click="backToHead" text="返回首页" class="tailor-btn"></x-button>
                        </div>
                        <div class="item-info">
                            <p>半小时内会有专属于您的定制客服和您联系，您若有其他需求可直接与定制客服说明！</p>
                            <p>我们的工作时间为9:00-21:00，若您在工作时间外提交定制需求单，专属客服会在次日9点半之前联系您！</p>
                            <p>我们确保您的所有信息都不会泄露，请您安心。</p>
                        </div>
                    </div>
                </section>

                <!--内容 END-->

            </div>
            <!--页面 END-->

        </div>
    </div>


</template>

<script>
    import { go } from '../../libs/router'
    import {ViewBox,XHeader,Step, StepItem, Tabbar, TabbarItem, XButton, Checker, CheckerItem,} from '../../components'/*0220F*/
    import store from '../../vuex/store'/*0228 F*/
    const commit = store.commit || store.dispatch /*0228 F*/
    export default{
        components: {
            // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
            // 否则挂载点和组件名字一致, 即vhead
            ViewBox,
            XHeader,
            Step,
            StepItem,
            Tabbar,
            TabbarItem,
            XButton,
            Checker,
            CheckerItem,
        },/*0220F*/
        data(){
            return{
                step: 2,//起始步骤
                isBJ:true,//如果是北京出发再显示第二步
            }
        },
        methods: {
            //获取数据
            takeData:function(){
                var vm = this
                var data=JSON.parse(document.getElementById("tailor").value);
                this.isBJ= data.Birthland=="北京"||false
                document.getElementById("tailor").value=""
                commit('UPDATE_LOADING',false)/*0228 F*/
            },
            back:function(){
                window.history.back()
            },
            backToHead:function(){
                //api.pageGoTo("http://m.aoyou.com/wap.html","")
                  if (api.IsIOSClient()) {
                       window.webkit.messageHandlers.toAYHome.postMessage("遨游首页");
                     }
                else if (window.action != null && window.action != undefined) {
                        window.toapp.toAYHome();
                     }
                 else {
                       location.href = "http://m.aoyou.com";
                    }
            },

            //回到顶部 0220F
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
            }
        },/*0220F*/

        ready(){
            this.takeData()
        }
    }
</script>

<style lang="less">
    @import '../../styles/index.less';
    @import '../../styles/ayui/base/reset.less';

    .success-wrap{
        width: 100%;/*0220F*/
        height: 100%;/*0220F*/
        overflow: hidden;/*0220F*/
        background-color: #F5F5F5;
    }

    .success-content{
        padding: 44px 0 15px 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background-color: #fff;/**/

        .item-media{
            margin: 0 auto;
            width: (54rem/20);
            height: (54rem/20);

            img{
                display: block;
                width: 100%;
                border: 0;
            }
        }

        .item-title{
            margin-top: 20px;
            width: 100%;
            font-size: 17px;
            color: #333333;
            line-height: 24px;
            text-align: center;
        }

        .item-btn{
            margin-top: 30px;
            width: 100%;
            height: auto;

            button.ay_btn, input.ay_btn{
                margin: 0 auto;
                width: 53%;
                height: 45px;
                background: #FF5523;
                border-radius: 50px;
                font-size: 16px;
                color: #FFFFFF;
            }

            .ay_btn:after{
                display: none;
            }

            .ay_btn_warn:not(.ay_btn_disabled):active {
                background-color: #F0410D;
            }
        }

        .item-info{
            margin-top: 22px;
            width: 100%;
            height: auto;
            font-size: 14px;
            color: #999999;
            font-weight: 300;
            line-height: 20px;

            p{
                margin-bottom: 20px;
                display: block;
                font-size: 14px;
                color: #999999;
                font-weight: 300;
                line-height: 20px;

                &:last-child{
                     margin-bottom: 0;
                }
            }

        }

    }

    /*底部按钮*/
    .tailor-tabbar{
        align-items: center;
        -webkit-align-items: center;
        -webkit-box-align: center;

        button.ay_btn, input.ay_btn{
            margin: 0 auto;
            width: 53%;
            height: 45px;
            background: #FF5523;
            border-radius: 50px;
            font-size: 16px;
            color: #FFFFFF;
        }

        .ay_btn:after{
            display: none;
        }

        .ay_btn_warn:not(.ay_btn_disabled):active {
            background-color: #F0410D;
        }

    }


</style>