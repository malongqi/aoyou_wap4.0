<template>
    <div class="page-wrap">
        <view-box v-ref:view-box>
            <x-header  :left-options="{showBack: true}" slot="header">积分规则</x-header>
            <div class="page-content">
                <!--如何获得积分-->
                <div class="page-section">
                    <div class="page-title">如何获得积分</div>
                    <table>
                        <tr><th>行为</th><th>积分额</th></tr>
                        <tr><td>预订旅游预制产品（包括标准参团产品、邮轮产品、自由行产品）</td><td>实际消费金额（旅行结束后第四天发放）</td></tr>
                        <tr><td>预订旅游定制产品</td><td>实际消费金额×50%（旅行结束后第四天发放）</td></tr>
                        <tr><td>完善邮件信息并认证</td><td>200积分</td></tr>
                    </table>
                    <ol class="page-tip">
                        <li>预订机票、签证、租车、导游、门票、当地玩乐等单项服务产品不生成积分。</li>
                        <li>订单积分由下单会员获得。</li>
                        <li>使用代金券、积分、互通卡等方式支付的费用不再生成积分。</li>
                        <li>同业客户、单位客户联系人不获得积分。</li>
                        <li>会员级别越高，可获得的积分比例相应增加。</li>
                        <li>积分规则可进行动态优化调整，以最新发布为准。</li>
                        <li>积分两年有效，如2015.6.6日生成的积分，有效期至2017.6.5，过期清零。积分过期信息会在网站会员中心、微信服务号及APP明示。</li>
                        <li>会员可登录www.aoyou.com，或遨游旅行APP,进入会员中心查询积分累计及使用情况。也可致电客服热线400-600-6666查询积分情况。</li>
                        <li>重要提示：中青旅遨游网将对积分政策进行动态优化调整，请以官网最新发布为准。</li>
                    </ol>
                </div>
                <!--积分使用规则-->
                <div class="page-section">
                    <div class="page-title">积分使用规则</div>
                    <p class="page-note">在达到兑换起点时，积分可用于折抵款项消费旅游产品或兑换礼品。</p>
                    <ol class="page-tip">
                        <li>积分折抵旅游费用的起点为2000分，按1%比例折抵，即：每2000积分折抵20元旅游费用。高于起点后积分折抵现金以千分为单位，积分不足千分的，不可折抵款项使用。</li>
                        <li>使用积分折抵款项的旅游产品包括：预制产品、定制产品、机票单项产品等，具体与遨游产品详情页或预订支付页提示为准。</li>
                        <li>使用积分折抵旅游款项的额度，基础抵现比例为订单总额的10%，会员级别越高，可抵现的订单总额越高。</li>
                        <li>积分抵现时，会员仅可使用本人积分。</li>
                        <li>会员须提供真实有效的注册信息，如信息变更需及时更改，否则积分有可能被冻结无法使用。</li>
                        <li>不同帐户内的会员积分不可以合并与转赠。<br>
                            重要提示：中青旅遨游网将对积分政策进行动态</li>
                        <li>优化调整，请以官网最新发布为准。</li>
                    </ol><br>
                </div>
            </div>
        </view-box>
    </div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'

    Vue.use(VueAxios, axios)

    //Add the component
    import { XHeader, ViewBox} from '../../components'

    export default {
        components: {
            XHeader,
            ViewBox
        },
        data (){
            return {

            }
        },
        methods: {
            tap(name,id) {
                alert(`产品名称:${name},产品编号:${id}`)
            }

        },
        ready(){

        }
    }

</script>

<style lang="less">
    @import '../../styles/index.less';
    @import '../../styles/ayui/base/reset.less';

    /*页面样式 20170116*/
    .ay-header{
        position: absolute;
        top:0;
        left: 0;
        width: 100%;
        height: 44px;
        line-height: 44px;
        font-size: 19px;
        background-color: #fff;
        z-index: 9;

        &:after{
            .setBottomLine(#e5e5e5);
        }
    }

    .ay-header .ay-header-left .left-arrow:before{
        border: 2px solid #333;
        border-width: 1px 0 0 1px;
    }

    .ay-header .ay-header-title, .ay-header h1{
        color: #333;
    }
</style>

<style lang="less" scoped>
    @import '../../styles/index.less';
    @import '../../styles/ayui/base/reset.less';

    /*最外层包裹*/
    .page{
        position: relative;
        height: 100%;
    }

    .page-wrap{
        box-sizing: border-box;
        background: #fff;
        height: 100%;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
    }

    .page-content{
        padding: 44px 20px 0;

        .page-section{
            margin-top: 28px;

            .page-title{
                position: relative;
                font-family: STHeitiSC-Medium;
                font-size: 17px;
                text-indent: 12px;
                color: #333333;

                &:before{
                    content: '';
                    position: absolute;
                    top: 6px;
                    left: 0;
                    width: 3px;
                    height: 15px;
                    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAeCAYAAAAPSW++AAAAAXNSR0IArs4c6QAAAGNJREFUKBVj/B+qzcbA+LOJ4f//OAYQYGRcxPCfvY4FKlgOFgQR//+XA8UYmOAq4TJgyTgmICWJLAZlS4IksIJRCYxgGQ0SrEHyHEOUgeE5EzitossA0y8LKAGD0io8qUITNQDC1R4nyaGYFAAAAABJRU5ErkJggg==) no-repeat;
                    background-size: 100%;
                }
            }

            table{
                margin-top: 10px;
                width: 100%;
                border-collapse:collapse;

                th{
                    height: 40px;
                    line-height: 40px;
                    background: #F5F5F5;
                    border: 1px solid #DFDFDF;
                    width: 50%;
                    font-family: STHeitiSC-Medium;
                    font-size: 14px;
                    color: #333333;
                }

                td{
                    font-family: STHeitiSC-Light;
                    font-size: 12px;
                    color: #333333;
                    line-height: 19px;
                    background: #FFFFFF;
                    border: 1px solid #DFDFDF;
                    padding: 9px 12px;
                    height: 57px;
                    text-align: center;
                }
            }

            .page-tip{
                padding: 0 20px;
                margin-top: 10px;
                font-family: STHeitiSC-Light;
                font-size: 14px;
                color: #333333;
                line-height: 19px;

                li{
                    list-style-type: decimal;
                }
            }

            .page-note{
                margin-top: 10px;
                font-family: STHeitiSC-Light;
                font-size: 14px;
                color: #333333;
                line-height: 19px;
            }

        }
    }
</style>

