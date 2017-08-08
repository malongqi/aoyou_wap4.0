<template>
    <div class="page-inner">

        <!--切换标签 START-->
        <div class="tab-box">
            <tab :line-width=2 active-color='#FF5523' default-color='#333' :index.sync="tabIndex">
                <tab-item v-for="item in tabList" :selected="tabIndex === $index" @click="tabIndex === $index">{{item}}</tab-item>
            </tab>
        </div>
        <!--切换标签 END-->
        <!--页面主体 START-->
        <div class="content privilege-wrap">
            <!--全部特权 START-->
            <div v-show="this.tabIndex === 0" class="privilege-list">
                <group>
                    <cell v-for="item in privilegeLists" :title="item.privilegeTitle" :inline-desc="item.privilegeDesc" class="privilege-item">
                        <!--<div slot="icon" class="item-media"><img v-bind:src="item.privilegeImg"></div>-->
                        <div slot="icon" class="item-media"><img :src="($index+1) | privilege"></div>
                    </cell>
                </group>
            </div>
            <!--全部特权 END-->
            <!--特权对比 START-->
            <div v-show="this.tabIndex === 1"  class="privilege-compare">
                <div class="compare-box">
                    <div class="compare-menu">
                        <table>
                            <thead>
                                <tr>
                                    <td>特权名称</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>预订奖励</td>
                                </tr>
                                <tr>
                                    <td>抵现特权</td>
                                </tr>
                                <tr>
                                    <td>优惠随行</td>
                                </tr>
                                <tr>
                                    <td>精选特惠</td>
                                </tr>
                                <tr>
                                    <td>尊享会员日</td>
                                </tr>
                                <tr>
                                    <td>购物返利</td>
                                </tr>
                                <tr>
                                    <td>乐享活动</td>
                                </tr>
                                <tr>
                                    <td>遨游陪签</td>
                                </tr>
                                <tr>
                                    <td>护照提醒</td>
                                </tr>
                                <tr>
                                    <td>专属顾问</td>
                                </tr>
                                <tr>
                                    <td>遨游到家</td>
                                </tr>
                                <tr>
                                    <td>赠送保险</td>
                                </tr>
                                <tr>
                                    <td>生日优惠</td>
                                </tr>
                                <tr>
                                    <td>生日蛋糕</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="compare-content">
                        <div class="table-wrap" :class="'active-'+this.myGrade">
                            <table>
                                <thead>
                                <tr>
                                    <td>普通</td>
                                    <td>白银</td>
                                    <td>黄金</td>
                                    <td>铂金</td>
                                    <td>钻石</td>
                                    <td>翡翠</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>1倍</td>
                                    <td>1倍</td>
                                    <td>1.1倍</td>
                                    <td>1.1倍</td>
                                    <td>1.2倍</td>
                                    <td>1.3倍</td>
                                </tr>
                                <tr>
                                    <td>1倍</td>
                                    <td>1倍</td>
                                    <td>1倍</td>
                                    <td>1.5倍</td>
                                    <td>1.8倍</td>
                                    <td>2倍</td>
                                </tr>
                                <tr>
                                    <td><img src="../../assets/wap/icon-checkmark-01.png"></td>
                                    <td><img src="../../assets/wap/icon-checkmark-01.png"></td>
                                    <td><img src="../../assets/wap/icon-checkmark-01.png"></td>
                                    <td><img src="../../assets/wap/icon-checkmark-01.png"></td>
                                    <td><img src="../../assets/wap/icon-checkmark-01.png"></td>
                                    <td><img src="../../assets/wap/icon-checkmark-02.png"></td>
                                </tr>
                                <tr>
                                    <td><img src="../../assets/wap/icon-checkmark-01.png"></td>
                                    <td><img src="../../assets/wap/icon-checkmark-01.png"></td>
                                    <td><img src="../../assets/wap/icon-checkmark-01.png"></td>
                                    <td><img src="../../assets/wap/icon-checkmark-01.png"></td>
                                    <td><img src="../../assets/wap/icon-checkmark-01.png"></td>
                                    <td><img src="../../assets/wap/icon-checkmark-02.png"></td>
                                </tr>
                                <tr>
                                    <td><img src="../../assets/wap/icon-checkmark-01.png"></td>
                                    <td><img src="../../assets/wap/icon-checkmark-01.png"></td>
                                    <td><img src="../../assets/wap/icon-checkmark-01.png"></td>
                                    <td><img src="../../assets/wap/icon-checkmark-01.png"></td>
                                    <td><img src="../../assets/wap/icon-checkmark-01.png"></td>
                                    <td><img src="../../assets/wap/icon-checkmark-02.png"></td>
                                </tr>
                                <tr>
                                    <td><img src="../../assets/wap/icon-checkmark-01.png"></td>
                                    <td><img src="../../assets/wap/icon-checkmark-01.png"></td>
                                    <td><img src="../../assets/wap/icon-checkmark-01.png"></td>
                                    <td><img src="../../assets/wap/icon-checkmark-01.png"></td>
                                    <td><img src="../../assets/wap/icon-checkmark-01.png"></td>
                                    <td><img src="../../assets/wap/icon-checkmark-02.png"></td>
                                </tr>
                                <tr>
                                    <td><img src="../../assets/wap/icon-checkmark-01.png"></td>
                                    <td><img src="../../assets/wap/icon-checkmark-01.png"></td>
                                    <td><img src="../../assets/wap/icon-checkmark-01.png"></td>
                                    <td><img src="../../assets/wap/icon-checkmark-01.png"></td>
                                    <td><img src="../../assets/wap/icon-checkmark-01.png"></td>
                                    <td><img src="../../assets/wap/icon-checkmark-02.png"></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td><img src="../../assets/wap/icon-checkmark-01.png"></td>
                                    <td><img src="../../assets/wap/icon-checkmark-01.png"></td>
                                    <td><img src="../../assets/wap/icon-checkmark-01.png"></td>
                                    <td><img src="../../assets/wap/icon-checkmark-01.png"></td>
                                    <td><img src="../../assets/wap/icon-checkmark-02.png"></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td><img src="../../assets/wap/icon-checkmark-01.png"></td>
                                    <td><img src="../../assets/wap/icon-checkmark-01.png"></td>
                                    <td><img src="../../assets/wap/icon-checkmark-01.png"></td>
                                    <td><img src="../../assets/wap/icon-checkmark-02.png"></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td><img src="../../assets/wap/icon-checkmark-01.png"></td>
                                    <td><img src="../../assets/wap/icon-checkmark-01.png"></td>
                                    <td><img src="../../assets/wap/icon-checkmark-01.png"></td>
                                    <td><img src="../../assets/wap/icon-checkmark-02.png"></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td><img src="../../assets/wap/icon-checkmark-01.png"></td>
                                    <td><img src="../../assets/wap/icon-checkmark-01.png"></td>
                                    <td><img src="../../assets/wap/icon-checkmark-02.png"></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td><img src="../../assets/wap/icon-checkmark-01.png"></td>
                                    <td><img src="../../assets/wap/icon-checkmark-02.png"></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td><img src="../../assets/wap/icon-checkmark-01.png"></td>
                                    <td><img src="../../assets/wap/icon-checkmark-02.png"></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td><img src="../../assets/wap/icon-checkmark-02.png"></td>
                                </tr>

                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
            <!--特权对比 END-->
        </div>
        <!--页面主体 END-->

    </div>
</template>

<script>

    var List = []
    var scrollingTop = 0

    import { go } from '../../libs/router'
    import {Tab, TabItem, Group, Cell} from '../../components'
    export default{
        components: {
            // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
            // 否则挂载点和组件名字一致, 即vhead
            Tab,
            TabItem,
            Group,
            Cell
        },
        data(){
            return{
                tabIndex:0,//展示的切换标签
                myGrade:"",//当前等级
                tabList:["全部特权","特权对比"],//切换标签
                //全部特权列表
              privilegeLists:
              [
                {
                  "privilegeTitle":"预订奖励",
                  "privilegeImg":"http://images1.aoyou.com/productlist/201312/h8db8431133322.jpg",
                  "privilegeDesc":"会员预订相应品类的旅游产品，在旅行结束后获得订单实际金额*倍数的积分数额，积分可用于积分商城兑换礼品或下次预订折抵款项消费。"
                },
                {
                  "privilegeTitle":"抵现特权",
                  "privilegeImg":"http://images1.aoyou.com/productlist/201312/h8db8431133322.jpg",
                  "privilegeDesc":"会员享受在预订相应品类旅游产品、机票时，使用积分折抵现金的特权。抵现金额上限为本订单成交金额的10%*倍数。"
                },
                {
                  "privilegeTitle":"优惠随行",
                  "privilegeImg":"",
                  "privilegeDesc":"会员免费在遨游“全球优惠券商城”下载各大机场免税店、全球知名商圈的购物优惠券，立减最高15%的购物优惠。"
                },
                {
                  "privilegeTitle":"精选特惠",
                  "privilegeImg":"",
                  "privilegeDesc":"会员享受遨游以EDM、短信、会员商城展示等方式提供给会员的精选及优惠产品。"
                },
                {
                  "privilegeTitle":"购物返利",
                  "privilegeImg":"",
                  "privilegeDesc":"会员可享受遨游与银联国际共同为会员提供的在境外用银联卡（62开头银行卡）购物刷卡获得的奖励，具体奖励规则及兑奖流程、活动时间以实际发布内容为准。"
                },
                {
                  "privilegeTitle":"尊享会员日",
                  "privilegeImg":"",
                  "privilegeDesc":"会员可享受会员日所有活动特权（如线路价格直降、出境游送WIFI、专车送机、送礼品等，）具体特权以实际活动内容为准。"
                },
                {
                  "privilegeTitle":"乐享活动",
                  "privilegeImg":"",
                  "privilegeDesc":"遨游将不定期策划组织主题沙龙、趣味互动、户外活动等会员乐享活动。"
                },
                {
                  "privilegeTitle":"遨游陪签",
                  "privilegeImg":"",
                  "privilegeDesc":"白银级别以上会员在办理英国、美国、欧洲申根国家等目的地签证时，享受由中青旅遨游总部（北京）专业送签顾问提供流程讲解、资料交接等一对一的陪签服务，另针对满足签证国家要求的高等级会员本人提供免费升级办理多次签证服务。请通过400电话预约。"
                },
                {
                  "privilegeTitle":"护照提醒",
                  "privilegeImg":"",
                  "privilegeDesc":"黄金级别以上会员且在遨游有准确护照信息登记的，在护照到期日前进行温馨提示。"
                },
                {
                  "privilegeTitle":"专属顾问",
                  "privilegeImg":"",
                  "privilegeDesc":"黄金级别以上会员，根据预订旅游产品特点安排旅游专属顾问服务。"
                },
                {
                  "privilegeTitle":"遨游到家",
                  "privilegeImg":"",
                  "privilegeDesc":"铂金级别以上会员享受由遨游专业旅游顾问提供上门服务（仅限北京地区五环以内用户）请通过400电话预约到家服务。"
                },
                {
                  "privilegeTitle":"赠送保险",
                  "privilegeImg":"",
                  "privilegeDesc":"钻石级别以上会员，预订并出行出境游团队、自由行产品，赠送会员本人旅游意外险。如果您购买的产品已含保险，将不再额外赠送保险。"
                },
                {
                  "privilegeTitle":"生日礼包",
                  "privilegeImg":"",
                  "privilegeDesc":"钻石级别以上会员，在生日当月预订出境游团队、自由行产品的首笔订单金额超过15000元，可获得500元/订单生日专属优惠。"
                },
                {
                  "privilegeTitle":"生日蛋糕",
                  "privilegeImg":"",
                  "privilegeDesc":"翡翠级别会员，在生日前夕，会有专人与会员联系确认配送信息，并将蛋糕配送至相关地址。"
                }
              ]
            }
        },
        methods: {
            //跳转至相应锚点
            setAnchor:function(){
                let current = window.localStorage.getItem('selectedPrivilege')
                for(let i=0; i<this.privilegeLists.length; i++){
                    if(this.privilegeLists[i].privilegeTitle == current){

                        var num = List[i] - 84;
                        $('.content').animate({scrollTop: num}, 100);
                    }
                }
            },
        },

        ready(){
            this.setAnchor()
            this.myGrade = window.localStorage.getItem('currentLevel');//获取会员等级
            window.setTimeout(function () {
                $('.privilege-item').each(function (i, item) {
                    List.push($(item).offset().top);
                });
            }, 500);
        },
        filters:{
            'privilege'(value){
                switch(value){
                    case 1:
                        return "http://pic1.aoyou.com/app40/privilege-01.png"
                    case 2:
                        return "http://pic1.aoyou.com/app40/privilege-02.png"
                    case 3:
                        return "http://pic1.aoyou.com/app40/privilege-03.png"
                    case 4:
                        return "http://pic1.aoyou.com/app40/privilege-04.png"
                    case 5:
                        return "http://pic1.aoyou.com/app40/privilege-05.png"
                    case 6:
                        return "http://pic1.aoyou.com/app40/privilege-06.png"
                    case 7:
                        return "http://pic1.aoyou.com/app40/privilege-07.png"
                    case 8:
                        return "http://pic1.aoyou.com/app40/privilege-08.png"
                    case 9:
                        return "http://pic1.aoyou.com/app40/privilege-09.png"
                    case 10:
                        return "http://pic1.aoyou.com/app40/privilege-10.png"
                    case 11:
                        return "http://pic1.aoyou.com/app40/privilege-11.png"
                    case 12:
                        return "http://pic1.aoyou.com/app40/privilege-12.png"
                    case 13:
                        return "http://pic1.aoyou.com/app40/privilege-13.png"
                    case 14:
                        return "http://pic1.aoyou.com/app40/privilege-14.png"
                    default:
                        return "http://pic1.aoyou.com/app40/privilege-bg.png"
                }
            }
        }
    }
</script>

<style lang="less">
    @import '../../styles/index.less';
    @import '../../styles/ayui/base/reset.less';

    .privilege-wrap{
        padding-top: 84px;
        background-color: #fff;
    }

    .tab-box{
        position: absolute;
        top:44px;
        left: 0;
        padding: 0 60px;
        width: 100%;
        height: 40px;
        background-color: #fff;
        box-sizing: border-box;
        z-index: 10;

        &:after{
         .setBottomLine(#DFDFDF)
        }

         .ay-tab{
             position: relative;
             height: 40px;
             z-index: 11;
             background: none;
         }

        .ay-tab-item,.ay-tab-ink-bar{
            margin: 0 18px;
        }

        .ay-tab-item{
            background: none;
            line-height: 40px;
        }
    }

    .privilege-list{
        padding:22px 20px;

        .ay_cells{
            margin-top: 0;

            &:before,&:after{
                display: none;
            }
        }

        .ay_cell{
            padding: 15px 0 0 0;

            &:before,&:after{
                display: none;
            }
        }

        img{
            width: 35px;
            height: 35px;
            border: 0;
        }
    }

    .privilege-item{
        align-items: flex-start;
        -webkit-align-items: flex-start;
        -webkit-box-align: start;

        .item-media{
            width: 35px;
            height: 35px;
            background: no-repeat center url(data:image/png;base64,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);
            background-size: 100%;
        }


        .ay_cell_bd{
            position: relative;
            margin-left:15px;
            padding:0 0 15px 0;

            &:after{
             .setBottomLine(#DFDFDF);
            }


            & > p{
                font-size: 17px;
                line-height: 20px;
            }

            .ay-label-desc{
                display: block;
                padding-top:10px;/*0217 F*/
                font-size: 14px;
                color: #333;
                font-weight: 300;
                line-height: 20px;
            }
        }

        .ay_cell_ft{
            display: none;
        }
    }

    .privilege-compare{
        position: relative;/*0222F*/
        /*top: 0;!*0222F*!*/
        /*left: 0;!*0222F*!*/
        padding: 0 10px 15px 10px;/*0222F*/
        width: 100%;
        height: 100%;/*0222F*/
        box-sizing: border-box;

        table{
            width: 100%;
            border-collapse: collapse;

            td{
                padding: 5px;
                border: 1px solid #DFDFDF;
                font-size: 12px;
                color: #333;
                font-weight: 300;
                text-align: center;
                line-height: 20px;
                box-sizing: border-box;

                img{
                    width: 10px;
                    height: auto;
                }
            }

            thead{
                td{
                    font-size: 14px;
                    font-weight: normal;
                }
            }
        }
    }

    .compare-box{
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        align-items: flex-start;
        -webkit-align-items: flex-start;
        -webkit-box-align: start;
        position: relative;
        padding:15px 0 0 0;/*0222F*/
        width: 100%;
        height: 100%;/*0222F*/
        box-sizing: border-box;/*0222F*/
        overflow-y: scroll;/*0222F*/

        &::-webkit-scrollbar {
             display: none;
        }
    }

    .compare-menu{
        position: absolute;
        z-index: 8;/*0222F*/
        top: 15px;/*0222F*/
        left:0;
        width: 100px;
        height: auto;/*0222F*/

        table{
            background: #F5F5F5;

            td{
                font-weight: normal;
            }
        }

    }

    .compare-content{
        padding: 0 0 0 99px;
        width: 100%;
        height: auto;/*0222F*/
        box-sizing: border-box;
        overflow-x: scroll;/*0222F*/

        &::-webkit-scrollbar {/*隐藏滚轮*/
             display: none;
             width: 0;
        }

        .table-wrap{
            width: (300rem/20);
        }

        table{
            thead{
                background: #f5f5f5;
            }

            td{
                width: (50rem/20);
            }
        }

        .active-1{
            tbody{
                td{
                    &:nth-child(1){
                         background: #FFFFEB;
                     }
                }
            }
        }

        .active-2{
            tbody{
                td{
                    &:nth-child(2){
                         background: #FFFFEB;
                     }
                }
            }
        }

        .active-3{
            tbody{
                td{
                    &:nth-child(3){
                         background: #FFFFEB;
                     }
                }
            }
        }

        .active-4{
            tbody{
                td{
                    &:nth-child(4){
                         background: #FFFFEB;
                     }
                }
            }
        }

        .active-5{
            tbody{
                td{
                    &:nth-child(5){
                         background: #FFFFEB;
                     }
                }
            }
        }

        .active-6{
            tbody{
                td{
                    &:nth-child(6){
                         background: #FFFFEB;
                     }
                }
            }
        }

    }






</style>