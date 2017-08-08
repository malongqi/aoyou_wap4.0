<template>
    <div class="content">
        <!--姓名栏 START-->
        <div class="list visitor">
            <group class="list-content name-bar">
                <cell class="visitor-item" :title="guestInfo.GuestName" inline-desc="">
                    <span slot="after-title">{{guestInfo.VisaStageText}} - <em>{{guestInfo.VisaStatusText}}</em></span>
                </cell>
            </group>
        </div>
        <!--姓名栏 END-->

        <!--进度 START-->
        <div class="visa-step">
            <group class="step-content">
                <cell v-for="item in stageList" class="step-item" :title="item.VisaStageText" :inline-desc="item.VisaStatusDesc">
                    <div class="step-icon" slot="icon">
                        <i :class="{'step-green': item.CurStatus == -1,'step-red': item.CurStatus == 0,'step-gray': item.CurStatus == 1}">{{item.VisaStatusUpdateTime}}</i>
                    </div>
                    <span slot="after-title"><em>{{item.VisaStatusText}}</em></span>
                    <div class="time">
                        <p>{{newTimeList[$index][1]}}</p>
                        <p><span>{{newTimeList[$index][0]}}</span></p>
                    </div>
                </cell>
            </group>

        </div>
        <!--进度 START-->
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

    import { go } from '../../libs/router'
    import {ViewBox,XHeader,Divider, Group, Cell, Switch, Actionsheet, Confirm} from '../../components'
    import store from '../../vuex/store'/*0228 F*/
    const commit = store.commit || store.dispatch /*0228 F*/
    export default {
        components: {
            // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
            // 否则挂载点和组件名字一致, 即vhead
            ViewBox,
            XHeader,
            Divider,
            Group,
            Cell,
            Switch,
            Actionsheet,
            Confirm
        },
        props: {
            isResult:Boolean,
        },
        data (){
            return {
                isPageShow:true,//显示页面
                guestInfo: [],//个人信息-签证状态
                stageList: [],//详情页节点集合
                newTimeList:[]//拆分后的时间数组
            }
        },
        methods: {

            takeData:function(){
                var memebrId=api.getMemberId()
                if(memebrId=="")
                {
                    api.toLogin(location.href, location.href, "back")
                    return false
                    // location.href = "http://mpass.aoyou.com?from=" + location.href + "&forward=" + location.href;
                    //location.replace("http://mpass.aoyou.com?from=" + location.href + "&forward=" + location.href);
                }
                // this.$http.get('/static/visa_status_person.json').then((response) => {
                //     success callback
                //     var data = response.data
                //     this.guestInfo = data.GuestInfo//个人信息-签证状态
                //     this.stageList = data.StageList//详情页节点集合

                    

                // }, (response) => {
                //     error callback
                // });
                var vm = this
                var useCache = false
                var useProxy = true
                vm.soid=this.$route.query.soid||0
                vm.gid=this.$route.query.gid||0
                vm.gn=this.$route.query.gn||''
                var statusParam={
                    GusetId:vm.gid,
                    SubOrderId:vm.soid
                }
                api.post({
                    path: api.config.microServiceHost.orderurl,
                    controller: 'VisaStatus',
                    action: 'GetSingleGuestViasInfo',
                    param: JSON.stringify(statusParam),
                    useCache: useCache,
                    useProxy: useProxy,
                    callback: function(obj) {
                        if (obj.ReturnCode == 0) {
                            var data = obj.Data;
                            var GuestInfo={}
                            GuestInfo.GuestId=data.GuestInfo.GuestId
                            GuestInfo.GuestName=vm.gn
                            GuestInfo.VisaStageText=data.GuestInfo.StageNode.VisaStageText
                            GuestInfo.VisaStatusText=data.GuestInfo.StatusNode.VisaStatusText
                            vm.guestInfo=GuestInfo
                            vm.stageList.splice(0,vm.stageList.length)
                            for(var i=0;i<data.StageList.length;i++)
                            {
                                var item={}
                                item.VisaStage=data.StageList[i].VisaStage
                                item.VisaStageText=data.StageList[i].VisaStageText
                                item.VisaStatusText=''
                                item.VisaStatusDesc=''
                                item.FinishTime=''
                                item.CurStatus=1
                                if(item.VisaStage<data.GuestInfo.StageNode.VisaStage)
                                {
                                    item.CurStatus=-1
                                }
                                else if(item.VisaStage==data.GuestInfo.StageNode.VisaStage)
                                {
                                    item.VisaStatusText=data.GuestInfo.StatusNode.VisaStatusText
                                    item.VisaStatusDesc=data.GuestInfo.StatusNode.VisaStatusDesc
                                    item.CurStatus=0
                                    item.FinishTime=data.GuestInfo.VisaStatusUpdateTime
                                }
                                vm.stageList.push(item)
                            }
                            for (let m=0, n = vm.stageList.length; m < n; m++){//拆分时间
                                vm.newTimeList.push(vm.stageList[m].FinishTime.split(" "))
                            }
                            console.dir({"title":"状态详情","data":data})
                            commit('UPDATE_LOADING',false)/*0228 F*/
                        }
                    }
                });
            }

        },
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



    /*进度页*/
    .name-bar{
        .ay_cells{
            line-height:60px;

            &:before{
                 display: none;
             }
        }

    }

    .visa-step{
        margin-bottom: 10px;

    }

    .step-content{
        .ay_cells{
            margin-top: 0;
            padding-top:10px;

            &:before{
                display: none;
            }
        }

        .ay_cell{
            align-items: flex-start;
            -webkit-align-items: flex-start;
            -webkit-box-align: start;
            position: relative;/*0217 F*/
            padding: 0 0 10px 85px;/*0217 F*/
            width: 100%;/*0217 F*/
            box-sizing: border-box;/*0217 F*/

            &:first-child{
                &:before{
                    display: block;
                 }
            }

            &:last-child{
                padding-bottom:0;

                &:before{
                     display: none;
                 }

                .ay_cell_bd:after{
                    display: none;
                }
             }

            &:before{
                top: 2px;
                left: 105px;
                width: 1px;
                height: 100%;
                -webkit-transform: scaleX(0.5);
                transform: scaleX(0.5);
                border-left: 2px solid #DFDFDF;
             }
        }
    }

    .step-item{
    
        .ay_cell_hd{
            
            position: relative;
            z-index: 5;
        }
        .step-icon{
            padding-top: 2px;
            width: 40px;
            height: 15px;

            i{
                display: block;
                margin: 0 auto;
                width: 15px;
                height: 15px;
                background-color: #fff;
                border-radius: 50%;
                border: 2px solid #fff;
                box-sizing: border-box;

                &.step-green{
                    border-color: #4CD964;
                }

                &.step-red{
                    border-color: #FF5523;
                }

                &.step-gray{
                    border-color: #999;
                }
            }
        }

        .ay_cell_bd{
            
            position:relative;
            padding-right:20px;
            min-height: 65px;
            box-sizing: border-box;

            &:after{
                .setBottomLine(#dfdfdf);
            }

            & > p{
                display: block;
                font-size: 17px;
                color: #333;
                line-height: 20px;
                font-weight: 300;

                &.disable{
                    color:#999;
                 }

                span{
                    display: block;
                    float: right;
                    text-align: right;
                    font-size: 12px;
                    color: #FF5523;
                    font-weight: 300;
                }
            }
        }

        .ay-label-desc{
            display: block;
            padding-top: 2px;
            min-height: 36px;
            font-size: 12px;
            color: #999;
            font-weight: 300;
            line-height: 18px;
        }

        .ay_cell_ft{
            position: absolute;/*0217 F*/
            left: 0;/*0217 F*/
            top:0;/*0217 F*/
            display: block;
            -webkit-box-flex: none;/*0217 F*/
            -moz-box-flex: none;/*0217 F*/
            -webkit-flex-shrink: none;/*0217 F*/
            -ms-flex: none;/*0217 F*/
            flex: none;/*0217 F*/
            margin-right: 0;
            width: 85px;

           p{
               font-size: 12px;
               color: #333;
               font-weight: 300;
               line-height: 20px;

               span{
                   color: #aaa;
               }
           }
        }

    }


</style>
