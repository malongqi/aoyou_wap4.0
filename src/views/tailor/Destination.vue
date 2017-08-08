<template>
    <div class="page-inner destination-wrap">
        <!--头部标题栏 START-->
        <div class="white-header-box" slot="header">
            <x-header :left-options="{showBack: true}" :right-options="{showMore: false}" :transition="headerTransition"  title="目的地">
            </x-header>
        </div>
        <!--头部标题栏 END-->
        <div class="content">
            <!--已选列表 START-->
            <!--<div class="destination-select" >-->
            <div class="destination-select" v-show="selectedList.length>0">
                <a class="btn-clear" @click="clearAll()">清空</a>
                <div class="select-list">
                    <ul>
                        <li v-for="selectedItem in selectedList" track-by="$index">
                            <div class="item-content">
                                <span class="item-title">{{selectedItem.name}}</span>
                                <a @click="removeSelect($index,selectedItem)" class="btn-delete icon-close-white"></a>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>
            <!--已选列表 END-->

            <!--选择列表 START-->
            <div class="destination-content">
                <!--左侧区域列表 START-->
                <div class="destination-menu">
                    <div class="menu-list">
                        <ul>
                            <li v-for="regionItem in destinationListAll" @click="tabSelect($index)" :class="{'active':selectedTab == $index}" class="menu-item">
                                <span>{{regionItem.DestRegionDesc}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <!--左侧区域列表 END-->
                <!--右侧国家列表 START-->
                <div class="destination-list">
                        <ul class="checker-list" v-show="selectedContent == $index" class="list-wrap" v-for="regionItem in destinationListAll">
                            <li class="checker-item" :class="{'current':item.checked}" v-for="item in regionItem.DestinationList" @click="checkCities(item,$index)">
                                <label class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title">{{item.name}}</div>
                                    </div>
                                </label>
                            </li>
                        </ul>
                </div>
                <!--右侧国家列表 END-->
            </div>
            <!--选择列表 END-->

        </div>

        <div class="top-warning" v-show="isWarningShow" transition="ay-fade">
            <p class="warning-title">最多可选择4个目的地</p>
            <i class="btn-close-warning" @click="closeWarning"></i>
        </div>
        <div class="top-warning" v-show="isWarningShowOne" transition="ay-fade">
            <p class="warning-title">该城市已经存在咯</p>
            <i class="btn-close-warning" @click="closeWarning"></i>
        </div>

        <!--底部按钮 START-->
        <tabbar class="tailor-tabbar" icon-class="ay-center" slot="bottom">
            <x-button type="warn" :disabled="" v-link="{path:'/', query: { selcity: selectedListStr }}"  class="tailor-btn">确定</x-button>
        </tabbar>
        <!--底部按钮 END-->
    </div>
</template>

<script>
    import { go } from '../../libs/router'
    import {XHeader,Scroller, Checker, CheckerItem, Tabbar, TabbarItem, XButton} from '../../components'
    export default{
        components: {
            // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
            // 否则挂载点和组件名字一致, 即vhead
            XHeader,
            Scroller,
            Checker,
            CheckerItem,
            Tabbar,
            TabbarItem,
            XButton

        },
        data(){
            return{
                destinationListAll:[],//目的地列表
                selectedList:[],//已选列表
                isWarningShow:false,//是否显示顶部提醒
                isWarningShowOne:false,//已存在提示
                selectedContent:0,//展示的右侧列表
                selectedTab:0//选中的左侧标签
            }
        },
        methods: {
            clearAll:function(){
                for(let qq in this.selectedList){
                    this.selectedList[qq].item.checked = false
                }
                this.selectedList = []
            },
            removeSelect:function(idx,it){
                this.selectedList.$remove(this.selectedList[idx])
                it.item.checked = false
            },
            checkCities:function(it,idx){                
                //判断已有的城市
                var isContains=false
                for(var i=0,len=this.selectedList.length;i<len;i++)
                {
                     if(this.selectedList[i].name==it.name)
                     {
                        isContains=true
                        this.isWarningShowOne=true
                        // return
                     }
                }
               if(!isContains)
               {
                if(it.checked){
                    for(let t in this.selectedList){
                        if(this.selectedList[t] == it.name){
                            this.selectedList.$remove(this.selectedList[t])
                            it.checked = false
                            break;
                        }
                    }
                }else{
                    if(this.selectedList.length>=4){
                        this.isWarningShow = true
                        return
                    }
                    it.checked = true
                    this.selectedList.push({name:it.name,item:it})
                }
            }

            },
            //获取数据
            takeData:function(){
                this.$http.get('/static/tailor.json').then((response) => {
                    // success callback
                    let _tempselectedcity = {}
                    if(this.$route.query.selcity){
                        let _temparr = this.$route.query.selcity.split(" ")
                        for(let s in _temparr){
                            if(_temparr[s] && _temparr[s].trim() != ""){
                                _tempselectedcity[_temparr[s]] = true
                            }
                        }
                    }
                    var data = response.data
                    //返回数据中有重复的城市名 设置一个已选择的城市对象 为过滤数据使用
                    var selectedName={}
                    for(let p =0,q= data.DestinationListAll.length;p<q;p++){
                        for(let z in data.DestinationListAll[p].DestinationList){                            
                            let _ck = _tempselectedcity[data.DestinationListAll[p].DestinationList[z]] && (!selectedName[data.DestinationListAll[p].DestinationList[z]])?_tempselectedcity[data.DestinationListAll[p].DestinationList[z]]:false
                            data.DestinationListAll[p].DestinationList[z] = {name:data.DestinationListAll[p].DestinationList[z],checked:_ck}           
                            if(_ck){                              
                                    this.selectedList.push({name:data.DestinationListAll[p].DestinationList[z].name,item:data.DestinationListAll[p].DestinationList[z]})
                                selectedName[data.DestinationListAll[p].DestinationList[z].name]=true                            
                            }
                        }
                    }                
                    this.destinationListAll = data.DestinationListAll
                }, (response) => {
                    // error callback
                });
            },

            //关闭顶部提醒
            closeWarning(){
                this.isWarningShow = false
                this.isWarningShowOne=false
            },

            //切换区域标签
            tabSelect(i){
                this.selectedTab = i
                this.selectedContent = i
            },

            //右侧 选择国家
            selectChecker(){

            }


        },
        computed: {
        selectedListStr(){
            let restr = ''
            for(let s in this.selectedList){
                restr += (this.selectedList[s].name + " ")
            }
            return restr
        },
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

        },
        ready(){
            this.takeData()
        }
    }
</script>

<style lang="less">
    @import '../../styles/index.less';
    @import '../../styles/ayui/base/reset.less';

    .icon-close-white{
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAAQVJREFUSA3tkzsOgkAQhk20s1Bj5RWMhVJ4Ar2ApbHzULYewVhYWJh4HePrBvgNsGZhWRYFrXaSn03m9bHD0Gh48xNwTSAMwyaaoV6J3A55c9Ry5RpxijZI7IGmRkLiIDZGVyS2teVZ/RTtotL48eQwYPgEcotToufR2tAWoGyILlqTFAy/QNRNJO0uPlu/Qj+FI2TApCHKQoLCZq6gBaaPS25SDaJeIgeGK7L6IBpsqbpr51rFazlpnP0mipVakEqwHIiMy1iQX0ACQLnb+BXMcpP3dtUCo0kfOf8TC2xQ+mY0WCBlhStMUnaMq09AbRrs0RlNXIUJ7MR5QF1Xvo/7CfxnAi9fBRHRlnshXAAAAABJRU5ErkJggg==);
    }

    .tailor-header-box{

        .white-header{
            background-color: #fff;
            &:after{
               .setBottomLine(#dfdfdf);
               }

            .ay-header-left .left-arrow:before{
                border-color: #333
            }

            .ay-header-title, .ay-header h1{
                color: #333;
            }

        }

    }



    .destination-wrap{
        padding-top: 44px;
        padding-bottom: 60px;
        background-color: #F5F5F5;
        font-weight: 300;



        .content{
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            align-items: center;
            -webkit-align-items: center;
            -webkit-box-align: center;
            flex-direction: column;
            -webkit-flex-direction: column;
            -webkit-box-orient: vertical;
            -moz-box-orient: vertical;
            box-orient: vertical;
            -webkit-box-direction: vertical;
            padding-top: 44px;
            padding-bottom: 60px;
            height: 100%;
            overflow: hidden;
            box-sizing: border-box;
        }


        .tailor-tabbar{
            button.ay_btn, input.ay_btn{
                width: 40%;
            }
        }

    }

    /*已选列表*/
    .destination-select{

        position: relative;
        padding: 15px 65px 0 20px;
        width: 100%;
        min-height: 60px;
        /*height: 60px;*/
        max-height:105px;
        background-color: #fff;
        box-sizing: border-box;
        overflow: hidden;
        z-index: 9;

        &:after{
         .setBottomLine(#DFDFDF);
        }


        .btn-clear{
            display: block;
            position: absolute;
            right: (10rem/20);
            top: 0;
            padding: 0 (10rem/20);
            width: auto;
            height: auto;
            font-size: 14px;
            color: #333333;
            line-height: 40px;
        }


        ul{
            display: block;
            width: 100%;
            box-sizing: border-box;

            &:after{
                content: '';
                display: block;
                width: 100%;
                line-height: 0;
                clear: both;
            }

            li{
                display: block;
                float: left;
                margin-right: 7%;
                margin-bottom: 15px;
                width: 43%;
                height: 30px;
            }
        }

        .item-content{
            position: relative;
            width: 100%;
            height: 100%;
            background: #FFFFFF;
            border: 1px solid #FF5523;
            border-radius: 10px;
            box-sizing: border-box;
        }

        .item-title{
            display: block;
            font-size: 14px;
            color: #FF5523;
            text-align: center;
            line-height: 28px;
        }

        .btn-delete{
            position: absolute;
            right: -1px;
            top: -1px;
            width: 13px;
            height: 13px;
            border-radius: 0 8px 0 8px;
            background-color: #FF5523;
            overflow: hidden;
            background-size: 13px;
            background-repeat: no-repeat;
            background-position: center;
        }


    }

    .destination-content{
        -webkit-flex: 1;
        flex: 1;
        -webkit-box-flex: 1;
        -moz-box-flex: 1;
        -ms-flex: 1;
        position: relative;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background-color: #F5F5F5;
        overflow: hidden;

        &:after{
        display: block;
        content: '';
        width: 100%;
        line-height: 0;
        clear: both;
         }
    }

    /*左侧区域列表*/
    .destination-menu{
        position: absolute;
        left: 0;
        top: 0;
        width: 30%;
        height: 100%;
        overflow: hidden;
        box-sizing: border-box;

        .menu-list{
            padding:0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            box-sizing: border-box;

            ul{
                padding-left: 20px;
                width: 100%;
                height: 100%;
                overflow-x: hidden;
                overflow-y: scroll;
                -webkit-overflow-scrolling: touch;

                li{
                    display: block;
                }
            }

            .menu-item{
                position: relative;
                display: block;
                padding-right: 10px;
                width: 100%;
                height: 60px;
                font-size: 17px;
                color: #333333;
                font-weight: normal;
                line-height: 58px;
                box-sizing: border-box;

                &:after{
                     content: " ";
                     position: absolute;
                     left: 0;
                     bottom: 0;
                     width: 40px;
                     height: 1px;
                     border-bottom: 1px solid #DFDFDF;
                     color: #DFDFDF;
                     -webkit-transform-origin: 0 100%;
                     transform-origin: 0 100%;
                     -webkit-transform: scaleY(0.5);
                     transform: scaleY(0.5);
                 }

                &:last-child{
                    &:after{
                           border: 0;
                    }
                }


                span{
                    display: block;
                }

                &.active{
                     color: #FF5523;
                    &:after{
                         height: 2px;
                         border-bottom: 2px solid #FF5523;
                     }
                 }
            }
        }
    }

    /*右侧国家列表*/
    .destination-list{
        position: absolute;
        right: 0;
        top: 0;
        width: 70%;
        height: 100%;
        overflow: hidden;
        background-color: #fff;
        box-sizing: border-box;

        .destination-list-content{
            width: 100%;
            height: 100%;
            overflow-x: hidden;
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;
        }

        .checker-list{
            padding-top:20px;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            overflow-x: hidden;
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;

            &:after{
                 content: '';
                 display: block;
                 width: 100%;
                 line-height: 0;
                 clear: both;
             }

            &::-webkit-scrollbar {/*隐藏滚轮*/
                 display: none;
             }
        }

        .checker-item{
            float: left;
            display: block;
            position: relative;
            margin-left: 8%;
            margin-bottom: 15px;
            width: 38%;
            height: 30px;
            border-radius: 100px;
            z-index: 10;

            .item-content{
                position: relative;
                display: block;
                width: 100%;
            }

             .item-inner{
                 position: relative;
                 width: 100%;
                 height: 100%;

                &:after {
                     display: block;
                     content: " ";
                     width: 200%;
                     height: 200%;
                     position: absolute;
                     top: 0;
                     left: 0;
                     border: 1px solid #999;
                     -webkit-transform: scale(0.5);
                     transform: scale(0.5);
                     -webkit-transform-origin: 0 0;
                     transform-origin: 0 0;
                     box-sizing: border-box;
                     border-radius: 100px;
                 }
             }

            .item-title{
                 width: 100%;
                 height: 100%;
                 font-size: 14px;
                 color: #333;
                 line-height: 30px;
                 text-align: center;
            }

            &.current{
                 color: #FF5523;

                 .item-title{
                      color: #FF5523;
                 }

                .item-inner{
                    &:after{
                         border: 1px solid #FF5523;
                    }
                }

            }

            input:checked + .item-inner{

                &:after{
                     border: 1px solid #FF5523;
                 }

                .item-title{
                    color: #FF5523;
                }
            }
        }

    }

    /*提醒*/
    .top-warning{
        position: absolute;
        top:44px;
        left: 0;
        padding: 0 20px;
        width: 100%;
        height: 40px;
        background-color: rgba(255,170,9,0.95);
        box-sizing: border-box;
        z-index:10;
        .warning-title{
            font-size: 14px;
            color: #FFFFFF;
            line-height: 40px;
        }

        .btn-close-warning{
            display: block;
            position: absolute;
            right: 0;
            top:0;
            width: 40px;
            height: 40px;
            background: no-repeat center url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAPtJREFUSA2tlmEKgzAMRsvuvCGCFxiCNxg72gb+8wyj+z5pILqIabpAbK32vVpCMeWcO+SCvCMvqTHIKCwyu4TLjJR4oBOWcC6SDImZgkHuShuSYO4eTtywbgg6E+9UVEkwz4JPm93GSyGJCy6mWkkVvFYSgnslTfAzyV/gJxJd5/DlbbXIZG9LACkH0QaXRQBuSVxw77HwEZlqrTH12NnF6seD7eHw6MTYrxnwJ8aYOmISEPYrJ5hnDrNNcgSX72ySnMGbJF54SFILr5JE4S4J4D1Sx1otMtnbAmBVV5/w4K3oIbgswpC8KLgh+YvBuvceHcL8ackoLDKvX+cFj2wm/hEFAAAAAElFTkSuQmCC);
            background-size: 12px;
        }
    }


</style>