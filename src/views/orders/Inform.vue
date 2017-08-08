<template>
    <div class="page-wrap">
        <sticky>
            <x-header :left-options="{showBack: true}">出行通知<a slot="right"><span class="icon-message"></span></a></x-header>
        </sticky>
        <!--订单列表-->
        <div class="card-list" v-if="orders.length > 0">
            <card v-for="order in orders">
                <div slot="header" class="card-header">
                    <div class="title">订单号：{{order.MainOrderNO}}</div>
                </div>
                <div slot="content" class="card-content">
                    <span :class="['orange',{yellow:order.OrderType_m==4001,green:order.OrderType_m==3,blue:order.OrderType_m==3001,light:order.OrderType_m==1002,red:order.OrderType_m==26,brown:order.OrderType_m==97}]">{{order.OrderType_m | liter}}</span>
                    <div class="name">{{order.OrderName}}</div>
                    <div class="date">出行前1-2天发送，请您耐心等待</div>
                </div>
            </card>
        </div>
        <div class="no-result" v-if="orders.length <= 0">
            <img src="http://pic1.aoyou.com/app40/no.png">
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'

    Vue.use(VueAxios, axios)

    //Add the component
    import { XHeader, Sticky, Tab, TabItem, Card} from '../../components'

    export default {
        components: {
            XHeader,
            Sticky,
            Tab,
            TabItem,
            Card
        },
        data (){
            return {
                orders:[]
            }
        },
        filters:{
            'wrap'(value) {
                switch(value){
                    case 1:
                      return "待付款"
                    case 19:
                        return "已取消"
                    case 30:
                        return "待出行"
                    case 40:
                        return "待评价"
                    default:
                      return "已完成"
                }
            },
            'setArray'(value){
                switch(value){
                    case 1:
                      return ['查看合同','去支付']
                    case 19:
                        return ['再次购买']
                    case 30:
                        return ['出行通知','查看合同','上传资料']
                    case 40:
                        return ['去评价']
                    default:
                      return ['感谢您对我们的评价']
                }
            },
            'liter'(value){
                switch(value){
                    case 3:
                      return "跟团游"
                    case 4:
                        return "自由行"
                    case 3001:
                        return "邮轮"
                    case 1002:
                        return "当地玩乐"
                    case 26:
                        return "门票"
                    case 97:
                        return "签证"
                    default:
                      return "半自助"
                }
            }
        },
        ready(){

            this.axios.get("/static/order.json").then((response) => {
              this.orders = response.data.AttachItems
            })

        }
    }

</script>

<style lang="less" scoped>
    @import '../../styles/index.less';
    @import '../../styles/ayui/base/reset.less';

    /*20170118*/
    .page-wrap .ay_panel{
        margin-top: 0px;
        margin-bottom: 10px;
    }

    .no-result {
        margin: 30% auto 0;
    }

</style>
