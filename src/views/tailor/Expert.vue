<template>
    <div class="expert-wrap"><!--0220 F-->
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
                <section class="ay-section no-padding">
                    <div class="tailor-step">
                        <step :current.sync="step" background-color='' gutter="0">
                            <step-item title="填写信息" class="step-fill"></step-item>
                            <step-item title="选择专家" class="step-expert"></step-item>
                            <step-item title="成功提交" class="step-success"></step-item>
                        </step>
                    </div>
                </section>
                <!--步骤 END-->

                <!--列表 START-->
                <section class="ay-section expert-list">
                    <checker :value.sync="selectedExpert" default-item-class="expert-item" selected-item-class="expert--item-selected">
                        <checker-item :value="item.SID" v-for="item in groupList">
                            <div class="item-content">
                                <div class="item-media">
                                    <img v-bind:src="item.Photo">
                                </div>
                                <div class="item-inner">
                                    <div class="item-title">{{item.GoldServiceName}}</div>
                                    <div class="item-subtitle">{{item.Identity}}</div>
                                </div>
                            </div>
                        </checker-item>
                        <checker-item :value="item.GoldServiceID" v-for="item in expertList">
                            <div class="item-content">
                                <div class="item-media">
                                    <img v-bind:src="item.Photo">
                                </div>
                                <div class="item-inner">
                                    <div class="item-title">{{item.GoldServiceName}}</div>
                                    <div class="item-subtitle">{{item.Identity}}</div>
                                </div>
                            </div>
                        </checker-item>
                    </checker>
                </section>
                <!--列表 END-->

            </div>
            <!--页面 END-->

            <!--底部按钮 START-->
            <tabbar class="tailor-tabbar" icon-class="ay-center" slot="bottom">
                <!--v-link="{path:'/destination'}"-->
                <!-- v-link="{path:'/success'}" -->
                <x-button type="warn" text="确认提交"  :disabled="selectedExpert.length < 1" @click="submit" class="tailor-btn" ></x-button>
            </tabbar>
            <!--底部按钮 END-->

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
                step: 1,//起始步骤
                selectedExpert:[],//已选列表
                expertList:[],//选择专家组
                groupList:[]//选择连锁店组
            }
        },
        methods: {
            //获取数据
            takeData:function(){
                // this.$http.get('/static/tailor.json').then((response) => {
                //     // success callback
                //     var data = response.data
                //     this.expertList = data.ExpertList

                // }, (response) => {
                //     // error callback
                // });
                var vm = this
                var useCache = false
                var useProxy = true
                api.post({
                    path: api.config.microServiceHost.tailorurl,
                    controller: 'custom',
                    action: 'GetCustomSales',
                    param: JSON.stringify({}),
                    useCache: useCache,
                    useProxy: useProxy,
                    callback: function(obj) {
                        if (obj.ReturnCode == 0) {
                            var data = obj.Data
                            for(var i=0,len=data.length;i<len;i++)
                            {
                                if(data[i].SID==0)
                                {
                                    vm.expertList.push(data[i])
                                }
                                else
                                {
                                    vm.groupList.push(data[i])
                                }
                            }
                            for(var i=0,len=vm.groupList.length;i<len;i++)
                            {
                                vm.groupList[i].SID='g_'+vm.groupList[i].SID
                            }
                        }
                        commit('UPDATE_LOADING',false)/*0228 F*/
                    }
                })
            },
            submit:function(){
                var vm = this
                var temData=document.getElementById('tailor').value
                var customInfo=[]
                if(temData!="")
                {
                    customInfo = JSON.parse(temData);
                    if(this.selectedExpert.toString().indexOf('g_')==-1)
                    {                        
                        customInfo.GoldServiceID=this.selectedExpert
                        customInfo.SID=0
                    }
                    else
                    {
                        customInfo.SID=this.selectedExpert.split("_")[1]
                        customInfo.GoldServiceID=0             
                    }
                    var useCache = false
                    var useProxy = true
                    //提交定制单
                    api.post({
                        path: api.config.microServiceHost.tailorurl,
                        controller: 'custom',
                        action: 'CreateCustomChannel',
                        param: JSON.stringify(customInfo),
                        useCache: useCache,
                        useProxy: useProxy,
                        callback: function(obj) {
                            if(obj.ReturnCode==0)
                            {
                                go({path:"/success"},vm.$router)
                            }
                            commit('UPDATE_LOADING',false)/*0228 F*/
                        }
                    })
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
        created() {
            commit('UPDATE_LOADING',true)/*0228 F*/
        },

        ready(){
            this.takeData()
        }
    }
</script>

<style lang="less">
    @import '../../styles/index.less';
    @import '../../styles/ayui/base/reset.less';

    .expert-wrap{
        width: 100%;/*0220F*/
        height: 100%;/*0220F*/
        overflow: hidden;/*0220F*/
        background-color: #F5F5F5;

        .content{
            padding-bottom: 50px;
        }
    }

    .expert-list{
        padding:0 20px;
        width:100%;
        box-sizing: border-box;
        background-color:#fff;

        .expert-item{
            position: relative;
            width: 100%;
            height: 75px;

            &:after{
             .setBottomLine(#dfdfdf);
            }

            &:last-child{

                &:after{
                    display: none;
                }
            }
        }

        .expert--item-selected{
            background: no-repeat right center url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAYCAYAAADpnJ2CAAAAAXNSR0IArs4c6QAAAVZJREFUSA3t1LtKxEAUBuD/RHH7Lbd1tFBBH0Jbu6xNBEtRbLeOLyGLhSgENA/hK9gpKIudgpVPsHs8Z9zMGk1MNpdGHMhlLpmPf5IM8NcLtR2Q/ZUt0OQcDEJnaXehTdBi4FsxjBw9jMdPrSWcYdy1oQjv8BY3vDYSZmJE23Tz+Np4wlwsHt1puEbBIqxRsAzWGFgWawScB1PQfqXcN8fsm2c5Tpm59HudF3MJBXwBc08b5DMaIh4dERHbes6pCqZTJf/htZuXcYg9c/Zb0qrYDFwLBiCKyqB1MJ3fvS8OQw8P0ZUsbeDgb8tbF0uBWrHofXQpd/tat2WKor+6Ke2yEX/ZG3W7mu4gyfCiq0uYDMxEQbH079TF1PgBamM2qj1SdNevkOzz4RxQOzPRmpjOm/wWep8qFIYTrAcHkubCdhDe6iRLTV5UYX/Z8InpFI3779cV+ADHWsd9iDP8mgAAAABJRU5ErkJggg==);
            background-size: 14px;
        }

        .item-content{
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            align-items: center;
            -webkit-align-items: center;
            -webkit-box-align: center;
            width: 100%;
            height: 75px;
        }

        .item-media{
            width: 50px;
            height: 50px;
            background: no-repeat center url(data:image/png;base64,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);
            background-size: contain;
            border-radius: 50%;/*0228 F*/
            overflow: hidden;

            img{
                display: block;
                width: 100%;
                height: 100%;/*0228 F*/
                border-radius: 50%;/*0228 F*/
                border: 0;
                overflow: hidden;/*0228 F*/
            }
        }

        .item-inner{
            -webkit-flex: 1;
            flex: 1;
            -webkit-box-flex: 1;
            -moz-box-flex: 1;
            -ms-flex: 1;
            padding: 15px 0 15px 20px;
            width: 100%;
            box-sizing: border-box;
        }

        .item-title{
            font-size: 17px;
            color: #333333;
            line-height: 20px;
        }

        .item-subtitle{
            font-size: 14px;
            color: #999999;
            font-weight: 300;
            line-height: 20px;
        }
    }

    /*底部按钮*//*0223-F*/
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

            &.ay_btn_disabled{
                 background-color: #ccc;
             }
        }

        .ay_btn:after{
            display: none;
        }

        .ay_btn_warn:not(.ay_btn_disabled):active {
            background-color: #F0410D;
        }

    }

</style>