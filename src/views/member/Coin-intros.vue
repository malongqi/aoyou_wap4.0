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
        <div class="content coin-intros-wrap">
            <!--游币获得 START-->
            <div v-show="this.tabIndex === 0" class="coin-intros-content">
                <group class="intros-item">
                    <cell class="item-title" title="预订旅游线路"></cell>
                    <div class="item-content">
                        预订预制产品，获得实际消费金额的游币。预制产品包含标准参团产品、邮轮产品、自由行产品。旅行结束后第四天发放。<br><br>预订旅游定制产品，获得实际消费金额＊50%的游币。定制产品指消费者个性定制的旅游线路产品。旅行结束后第四天发放。
                    </div>
                </group>
                <group class="intros-item">
                    <cell class="item-title" title="产品评价"></cell>
                    <div class="item-content">
                        提交产品评分 50游币<br>
                        评价含文字描述 50游币<br>
                        评价含图片晒单 50游币<br>
                        以上均审核通过后获得<br>
                    </div>
                </group>
                <group class="intros-item">
                    <cell class="item-title" title="遨游论坛互动"></cell>
                    <div class="item-content">
                        <ul class="intros-terms">
                            <li>
                                <div class="terms-content">
                                    <span class="terms-title">奖励条件</span>
                                    <span class="terms-after">游币数</span>
                                    <span class="terms-desc">奖励次数</span>
                                </div>
                            </li>
                            <li>
                                <div class="terms-content">
                                    <span class="terms-title">设置头像</span>
                                    <span class="terms-after">20</span>
                                    <span class="terms-desc">一次性</span>
                                </div>
                            </li>
                            <li>
                                <div class="terms-content">
                                    <span class="terms-title">遨游微社区签到</span>
                                    <span class="terms-after">20</span>
                                    <span class="terms-desc">每天1次</span>
                                </div>
                            </li>
                            <li>
                                <div class="terms-content">
                                    <span class="terms-title">发表文章</span>
                                    <span class="terms-after">20</span>
                                    <span class="terms-desc">每天最多50次</span>
                                </div>
                            </li>
                            <li>
                                <div class="terms-content">
                                    <span class="terms-title">评论或回复文章</span>
                                    <span class="terms-after">5</span>
                                    <span class="terms-desc">每天最多50次</span>
                                </div>
                            </li>
                            <li>
                                <div class="terms-content">
                                    <span class="terms-title">发表文章被评论</span>
                                    <span class="terms-after">2</span>
                                    <span class="terms-desc">每天最多20次</span>
                                </div>
                            </li>
                            <li>
                                <div class="terms-content">
                                    <span class="terms-title">发起文章分享</span>
                                    <span class="terms-after">10</span>
                                    <span class="terms-desc">每天最多10次</span>
                                </div>
                            </li>
                            <li>
                                <div class="terms-content">
                                    <span class="terms-title">文章加精华</span>
                                    <span class="terms-after">50</span>
                                    <span class="terms-desc">每天最多10次</span>
                                </div>
                            </li>
                            <li>
                                <div class="terms-content">
                                    <span class="terms-title">参与投票</span>
                                    <span class="terms-after">5</span>
                                    <span class="terms-desc">每天最多1次</span>
                                </div>
                            </li>
                            <li>
                                <div class="terms-content">
                                    <span class="terms-title">发表日志</span>
                                    <span class="terms-after">5</span>
                                    <span class="terms-desc">每天10次</span>
                                </div>
                            </li>
                            <li>
                                <div class="terms-content">
                                    <span class="terms-title">设置头像</span>
                                    <span class="terms-after">20</span>
                                    <span class="terms-desc">一次性</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </group>
                <group class="intros-item">
                    <cell class="item-title" title="参与活动"></cell>
                    <div class="item-content">遨游网组织大量会员互动线上线下活动，参与活动将获得游币。</div>
                </group>
            </div>
            <!--游币获得 END-->
            <!--扣减说明 START-->
            <div v-show="this.tabIndex === 1" class="coin-intros-content">
                <group class="intros-item">
                    <cell class="item-title" title="有效期"></cell>
                    <div class="item-content">
                        游币的有效期均为一年，过期清零，不做保留。
                    </div>
                </group>
            </div>
            <!--扣减说明 END-->
        </div>
        <!--页面主体 END-->

    </div>
</template>

<script>
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
                tabIndex:0,
                tabList:["游币获得","扣减说明"]//切换标签
            }
        },
        methods: {

        },

        ready(){
        }
    }
</script>

<style lang="less">
    @import '../../styles/index.less';
    @import '../../styles/ayui/base/reset.less';

    .coin-intros-wrap{
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

    .coin-intros-content{
        padding: 40px 20px 30px 20px;
        width: 100%;
        box-sizing: border-box;

        .intros-item{
            .ay_cells{
                margin-top: 20px;

                &:before,&:after{
                    display: none;
                }
            }

            .ay_cell{
                padding: 0;
            }

            .ay_cell_hd{
                margin-right: 12px;
               width: 3px;
               height: 15px;
               border-radius: 3px;
               background-color: #FF5523;
            }

            .ay_cell_bd{

                & > P{
                    font-size: 17px;
                    line-height: 40px;
                }
            }

            .item-content{
                font-size: 14px;
                font-weight: 300;
                line-height: 20px;
            }

        }

        ul.intros-terms{
            width:100%;

            li{
                position: relative;

                &:first-child{
                     margin-bottom: 5px;
                     padding: 5px 0;

                     &:after{
                        .setBottomLine(#DFDFDF);
                     }
                     .terms-content span{
                        font-weight: normal;
                     }
                 }
            }

            .terms-content{
                position: relative;
                display: -webkit-box;
                display: -webkit-flex;
                display: flex;
                align-items: center;
                -webkit-align-items: center;
                -webkit-box-align: center;
                width:100%;
                height: auto;

                span{
                    display: block;
                    padding-right: 10px;
                    box-sizing: border-box;
                    font-size: 14px;
                    font-weight: 300;
                    line-height: 20px;

                    &:last-child{
                        padding-right: 0;
                    }
                }

                .terms-title{
                    width: 44%;
                }

                .terms-after{
                    width: 24%;
                }

                .terms-desc{
                    width: 32%;
                }
            }
        }



    }


</style>