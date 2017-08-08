<template>
    <div class="comment-wrap">
        <view-box v-ref:view-box>

            <div class="page-inner">
                <!--头部标题栏 START-->
                <div class="visa-header-box" slot="header">
                    <x-header :left-options="{showBack: true}" :right-options="{showMore: false}"  title=""  @on-click-title="scrollTop">
                        <p class="page-title">客户点评<em>({{EvaluateTotal}})</em></p><!--0215F-->
                    </x-header>
                </div>
                <!--头部标题栏 END-->
                <div class="content" v-if="pagerOrderEvaluateInfosDTOs.length >0"><!--0216 F-->
                    <!--评论头部 START-->
                    <div class="comment-titlebar">
                        <group class="titlebar">
                            <cell class="">
                                <span slot="after-title" class="">整体满意度:<em>{{statics.RecommendValue}}%</em></span>
                            </cell>
                        </group>
                    </div>
                    <!--评论头部 END-->

                    <!--评论标签 START-->
                    <div class="comment-tag">
                        <div class="checker-wrap">
                            <checker
                                    value.sync="标签"
                                    default-item-class="comment-tag-item"
                                    selected-item-class="comment-tag-item-selected"
                                    disabled-item-class="comment-tag-item-disabled"
                                    @on-item-click="showPopup=false">
                                <checker-item value="{{lable.LableName}}" v-for="lable in lables">{{lable.LableName}}</checker-item>
                            </checker>
                        </div>

                    </div>
                    <!--评论标签 END-->

                    <!--评论内容 START-->
                    <div class="comment-list">
                        <group class="comment-item" v-for="item in pagerOrderEvaluateInfosDTOs">
                            <cell class="title-cell" :title="item.CustomerId+''">
                                <div slot="icon" class="avatar">
                                    <img src="http://pic1.aoyou.com/app40/privilege-08.png?imageView2/1/w/30/h/30/q/90">
                                </div>
                                <span slot="after-title" class="after-title"><i v-for="i in item.StarNum" class="icon-star"></i></span>
                                <div slot="value" class="right-value">{{item.EvaluateTime}}</div>
                            </cell>

                            <cell class="content-cell" :inline-desc="commentContentList[$index][0]">
                                <div slot="icon" class="content-title"><span class="tag-green">{{commentTitleList[$index][0]}}</span></div>
                            </cell>
                            <cell class="content-cell" :inline-desc="commentContentList[$index][1]">
                                <div slot="icon" class="content-title"><span class="tag-red">{{commentTitleList[$index][1]}}</span></div>
                            </cell>
                            <div class="comment-picture" v-if="item.PhotePath !== null">
                                <div class="picture-wrap">
                                    <p v-for="imgItem in item.PhotePath"><img :src="imgItem"></p>
                                </div>
                            </div>
                        </group>
                        <div v-if="isShowLoad" class="load-more" @click="takeData('more')" >
                            <p>点击加载更多</p>
                        </div><!--0215F-->

                    </div>

                    <!--已到底线-->
                    <div class="scroller-btm"  v-if="!isShowLoad">
                        <divider>已到底线</divider>
                    </div><!--*0215F*-->

                    <!--评论内容 END-->
                </div>

                <!--没有评论内容 START--><!--0216F-->
                <div  v-if="pagerOrderEvaluateInfosDTOs.length == 0" class="null-info">
                    <div class="null-media"><i class="icon-no-info"></i></div>
                    <div class="null-inner">客户暂无点评</div>
                </div>
                <!--没有评论内容 END-->

            </div>
        </view-box>
    </div>
</template>

<script>


    import { go } from '../../libs/router'
    import store from '../../vuex/store'/*0228 F*/
    const commit = store.commit || store.dispatch /*0228 F*/
    import {ViewBox,XHeader, Group, Cell,Checker, CheckerItem,Tabbar,TabbarItem,Alert,Divider} from '../../components'/*0215F*/
    export default{
        components: {
            // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
            // 否则挂载点和组件名字一致, 即vhead
            ViewBox,
            XHeader,
            Group,
            Cell,
            Checker,
            CheckerItem,
            Tabbar,
            TabbarItem,
            Alert,
            Divider
        },/*0215F*/
        data(){
            return{
                pid:"0",
                EvaluateTotal:0,
                statics:{},//评价满意度
                lables:[],//标签
                pagerOrderEvaluateInfosDTOs:[],//评价内容
                commentTitleList:[],//满意不满意标题
                commentContentList:[],//评论内容
                isShowLoad:false
            }
        },
        methods: {
            //获取数据
            takeData:function(action){
                // this.$http.get('/static/visa_comment.json').then((response) => {
                //     success callback
                //     var data = response.data
                //     this.statics = data.Statics
                //     this.lables = data.Lables
                //     this.pagerOrderEvaluateInfosDTOs = data.PagerOrderEvaluateInfosDTOs

                //     for (let m = 0, n = this.pagerOrderEvaluateInfosDTOs.length; m < n; m++){
                //         this.commentTitleList.push(this.pagerOrderEvaluateInfosDTOs[m].Title.split("&_&"));//拆分满意不满意
                //         this.commentContentList.push(this.pagerOrderEvaluateInfosDTOs[m].Replay.split("&_&"))//拆分评论内容
                //     }

                // }, (response) => {
                //     error callback
                // });

                var vm = this
                var useCache = false
                var useProxy = true
                if(action=="more"){
                    pageSize=pageSize+1
                }
                var productParam={
                    "ProductId":vm.pid,
                    "ProductTypeId":"96",
                    "PageNo":"1",
                    "PageSize":10*pageSize,
                    "cruiseId":"0"
                }
                api.post({
                    path: api.config.microServiceHost.orderevalurl,
                    controller: 'Evaluate',
                    action: 'GetPagerOrderEvaluateInfo',
                    param: JSON.stringify(productParam),
                    useCache: useCache,
                    useProxy: useProxy,
                    callback: function(obj) {
                        if (obj.ReturnCode == 0) {
                            var data = obj.Data;
                         if(data.PagerOrderEvaluateInfosDTOs!=null){
                               vm.pagerOrderEvaluateInfosDTOs = data.PagerOrderEvaluateInfosDTOs
                            if(data.TotalCount>10*pageSize){
                                globalthis.isShowLoad=true   
                            }else{
                                globalthis.isShowLoad=false   
                            }
                            console.log(globalthis.isShowLoad)
                            console.log(data.TotalCount>10*pageSize)
                            for (let m = 0, n = vm.pagerOrderEvaluateInfosDTOs.length; m < n; m++){
                                vm.commentTitleList.push(vm.pagerOrderEvaluateInfosDTOs[m].Title.split("&_&"));//拆分满意不满意
                                var contentList=vm.pagerOrderEvaluateInfosDTOs[m].Replay.split("&_&")
                                if(contentList[0]==""){
                                    contentList[0]="都很满意"    
                                }
                                 if(contentList[1]==""){
                                    contentList[1]="没有不满意"    
                                }
                                   var date_ = new Date(vm.pagerOrderEvaluateInfosDTOs[m].EvaluateTime);
                                        var month = date_.getMonth() + 1
                                        vm.pagerOrderEvaluateInfosDTOs[m].EvaluateTime = date_.getFullYear() + "-" + month + "-" + date_.getDate();
                                vm.commentContentList.push(contentList)//拆分评论内容
                            }
                            console.log({"title":"result","data":data})   

                         }else{
                             vm.pagerOrderEvaluateInfosDTOs=[]
                         }
                        }
                    }
                })
                var labelParam={
                    "ProductId":vm.pid,
                    "ProductTypeId":"0"
                }
                api.post({
                    path: api.config.microServiceHost.orderevalurl,
                    controller: 'Evaluate',
                    action: 'GetStatisticsEvaluateInfo',
                    param: JSON.stringify(labelParam),
                    useCache: useCache,
                    useProxy: useProxy,
                    callback: function(obj) {
                        if (obj.ReturnCode == 0) {
                            var data = obj.Data;
                             if(data==null){
                                 vm.statics.EvaluateTotal=0  
                                 vm.EvaluateTotal=0  
                            }else
                            {
                                vm.statics = data
                                vm.EvaluateTotal= vm.statics.EvaluateTotal
                            }
                            console.log({"title":"RecommendValue","data":data})
                        }
                    }
                })
                api.post({
                    path: api.config.microServiceHost.orderevalurl,
                    controller: 'Evaluate',
                    action: 'GetStatisticsLableInfo',
                    param: JSON.stringify(labelParam),
                    useCache: useCache,
                    useProxy: useProxy,
                    callback: function(obj) {
                        if (obj.ReturnCode == 0) {
                            var data = obj.Data;
                            vm.lables = data
                            console.log({"title":"label","data":data})
                            commit('UPDATE_LOADING',false)/*0228 F*/
                        }
                    }
                })
            },


            //底部加载更多
            loadMore() {
                console.log("load more");
            },/*0215F*/


            //返回顶部 START
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

        },
        created(){
            commit('UPDATE_LOADING',true)/*0228 F*/
        },
        ready(){
            globalthis=this;
            this.pid=this.$route.query.pid||''
            pageSize=1
            this.takeData("new")
        }
    }
   var pageSize
   var globalthis;
   </script>

<style lang="less">
    @import '../../styles/index.less';
    @import '../../styles/ayui/base/reset.less';

    .icon-star{
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAYAAABiS3YzAAAAAXNSR0IArs4c6QAAAe5JREFUOBGdVUFLG0EU/t42S0QoFCx6KkSllqJQEd0GxcTEiD+jB8FjTx56ae8eS9Gz+DOSmBiJ2GpAKPVgIygIQqFgoVRM093Xt9smzO6YZHBg2DfffO+bN/Pe7ACGjfMv3xlSzWhccJY5P8Ocd6ZNPCwTEpj/R9n6dvei7tMAF5M5eG6hzaPYFC0dHLfHdxi9I2UvfJbsvr1DJwR1jZQLyQWwW454MMiapNynzyFcGWiiXJ17iIb7FAzp3pqcp54cQgVMG4jhKwYendGL/C9FE8RFZ0UEZgUcky5CPKQSjGzClfDqIKrDQ4m4NDMOl3buJaatSBewrYxF2aMTPLDT+LeaRjMH6AzxvhRlPl4E2afs/ilisbQIXJqLKEzCKWCnKb0X+IcSxeVkAk1Pss0JxaWHSSewaFGq4VuLGBL1Qa6knqBxWxNrsEXq/KVz2P0OZXa/qxyt+IMtkNSDWbuJCvpumiiXFx4bVwLxGNdW7ej6mij+3E5ESR3HDBs/vzyLzuuixONRkpTbDynsbcFDNyfgua4WhC7KrJJuJLPr6IuP0NLhK1jWqIh/ELHf7YXD/ADWRYEJiawpfVM2N0q5wzc0X7322X7ZiPhruSxypa0tQVyB9Z35ZLXJs/GeK86winWy5S/2XF6D9ej8X03Dlqxdp1j/AAAAAElFTkSuQmCC);
    }

    .icon-no-info{
        background-image: url("data:image/png;base64,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");
    }/*0217 F*/

    .tag-green{
        border-color: #3AB359;
        color: #3AB359
    }
    .tag-red{
        border-color: #FF5000;
        color: #FF5000
    }

    .comment-wrap{
        position: absolute;
        top:0;
        left: 0;
        padding:0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        overflow: hidden;
        font-family:sans-serif;

        .content{
            padding-bottom: 0;
            /*background-color: #fff;*//*0215F*/
        }

        .page-title{
            em{
                padding-left: 4px;
               font-size: 14px;
               color: #666;
               font-weight: 300;
            }
        }/*0215F*/
    }
    .comment-titlebar{
        .ay_cells{
            margin-top: 0;
            padding:0 20px;

            &:before{
                display: none;
             }
        }

        .titlebar {
            .ay_cells{
                &:after{
                     display: none;
                 }/*0215 F*/
            }
            .ay_cell_bd {

                & > p {
                    font-size: 17px;
                }

                span {
                    color: #666;
                    font-weight: 300;

                    em {
                        padding-left: 5px;
                        font-family: Arial, sans-serif;
                        color: #E63C37;
                        font-weight: 300;/*0215 F*/
                    }
                }
            }

            .ay_cell_ft{
                display: none;
            }
        }
    }


    /*评论标签*/
    .comment-tag{
        padding: 0 20px;
        width: 100%;
        box-sizing: border-box;
        background-color: #fff;/*0215F*/
        overflow:hidden;

        .checker-wrap{
            width: 100%;
            overflow: hidden;
        }

        .ay-checker-box{
            padding-top: 10px;
            padding-bottom: 5px;
            width: 103%;
            line-height: 0;
        }

        .comment-tag-item{
            margin-bottom: 10px;
            margin-right: 10px;
            padding: 0 16px;
            width: auto;
            height: 25px;
            background-color: #f6f6f6;
            border-radius: 50px;
            font-size: 14px;
            color: #666;
            line-height: 25px;
            font-weight: 300;
        }
    }

    /*评论列表*/
    .comment-list{
        padding: 0 20px;/*0215F*/
        background-color: #fff;/*0215F*/
    }

    .comment-item{
        .ay_cells{
            margin-top:0;
            padding-bottom:15px;

            &:before{
                border-color: #dfdfdf;
             }

            &:after{
                  display: none;
             }
        }

        .ay_cell{
            &:before,&:after{
                  display: none;
            }
        }

        .title-cell{/*评论标题*/
            padding:15px 0 5px 0;

            .ay_cell_hd{
                margin-right:10px;
            }

            .ay_cell_bd{
                & > p{
                    font-size: 12px;
                    line-height: 20px;
                }
            }

            .avatar {
                width: 30px;
                height: 30px;
                border-radius: 30px;
                overflow: hidden;

                img {
                    display: block;
                    width: auto;
                    border: 0;
                }
            }

            .after-title{
                padding-left: 10px;
                line-heigh:0;

                i{
                    display: inline-block;
                    margin-right: 1px;
                    width: 10px;
                    height: 10px;
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: contain;
                }
            }

            .right-value{
                font-size: 12px;
                color: #666;
                font-weight: 300;
                line-height: 20px;
                white-space: nowrap;
            }
        }

        /*评论内容*/
        .content-cell{
            align-items: flex-start;
            -webkit-align-items: flex-start;
            -webkit-box-align: start;
            margin-top: 10px;
            padding:0;

            .content-title{
                padding-top: 1px;
                width: 54px;
                height: 20px;
                overflow: hidden;

                span{
                    display: block;
                    width: 106px;
                    height: 40px;
                    border-radius: 40px;
                    box-sizing: border-box;
                    border-width: 1px;
                    border-style: solid;
                    font-size: 28px;
                    font-weight: 300;
                    line-height: 38px;
                    text-align: center;
                    transform: scale(0.5);
                    -webkit-transform: scale(0.5);
                    transform-origin: 0 0;
                    -webkit-transform-origin: 0 0;

                }
            }

            .ay-label-desc{
                display: block;
                padding-left: 16px;
                font-size: 16px;
                color: #333;
                font-weight: 300;
                line-height: 22px;
            }

            .ay_cell_ft{
                display: none;
            }

        }

        /*评论图片*/
        .comment-picture{
            padding-top: 15px;
            width: 100%;
            overflow:hidden;

            .picture-wrap{
                width:110%;
                line-height:0;

                &:after{
                    content: '';
                    display: block;
                    width: 100%;
                    height: 0;
                    line-height: 0;
                    clear: both;
                 }

                p{
                    display: block;
                    float: left;
                    margin-right: 10px;
                    width: (105rem/20);
                    height: (75rem/20);
                    border-radius: 6px;
                    overflow: hidden;
                }

                img{
                    display: block;
                    width:100%;
                    border: 0;
                }
            }
        }
    }
    /*0215F START*/
    .scroller-btm{
        padding: 10px 20px;
        width: 100%;
        box-sizing: border-box;

        .ay-divider{
            color: #999;
            font-weight: 300;
            line-height: 20px;
        }
    }


    .load-more{
        position: relative;
        width: 100%;
        height: 60px;
        background-color: #fff;

        &:before{
             content: " ";
             position: absolute;
             left: 0;
             top: 0;
             width: 100%;
             height: 1px;
             border-top: 1px solid #DFDFDF;
             color: #DFDFDF;
             transform-origin: 0 0;
             transform: scaleY(0.5);
         }

        p{
            display: block;
            font-size: 14px;
            color: #41B3EE;
            font-weight: 300;
            line-height: 60px;
            text-align: center;
        }
    }
    /*0215F END*/

    /*无信息*//*0216*/
    .null-info{
        position: absolute;
        top:50%;
        left: 0;
        margin-top: -60px;/*0228 F*/
        padding-top: 6px;
        width: 100%;
        height: 100px;
        box-sizing: border-box;

        .null-media{
            margin: 0 auto;
            width: 50px;
            height: 50px;

            i{
                display: block;
                width: 50px;
                height: 50px;
                background-position: center;
                background-repeat: no-repeat;
                background-size: contain;
            }
        }

        .null-inner{
            padding: 12px 0;
            font-size: 14px;
            color: #999;
            font-weight: 300;
            text-align: center;
            line-height: 20px;
        }
    }


</style>