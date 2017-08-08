<template>
    <div class="page-inner">
        <!--页面主体 START-->
        <div class="content index-wrap">
            <!--KV START-->
            <div class="kv-wrap">
                <div class="kv-bg">
                    <img src="../../assets/wap/member-kv-bg.png">
                    <div class="kv-mask"></div>
                </div>
                <div class="kv-content">
                    <div class="kv-tag" @click="goGrade">
                        <span>等级说明</span>
                    </div>
                    <div class="kv-main">
                        <div class="item item-side">
                            <p>积分</p>
                            <p><em>{{memberData.TotalPoint}}</em></p>
                        </div>
                        <div class="item item-media">
                            <div class="kv-circle" style='width:85px;height:85px;'>
                                <circle :percent="memberData.expericePercetage" :trail-width="2" trail-color="#3F5469" :stroke-width="2" stroke-color="#FF5523">
                                    <div class="member-avatar"><img :src="memberData.HeadPicUrl"></div>
                                </circle>
                            </div>
                            <div class="kv-badge"><img :src="memberData.MemberLevel | level"></div>

                        </div>
                        <div class="item item-side" @click="goMyCoins">
                            <p>游币</p>
                            <p><em>{{memberData.YouBi}}</em></p>
                        </div>
                    </div>
                    <div class="kv-bottom">
                        <p>达到{{memberData.NextLevelGrowth}}游币可以升级为<em>{{memberData.NextLevelTxt}}</em></p>
                    </div>
                </div>
            </div>
            <!--KV END-->

            <!--我的特权 START-->
            <group class="my-privilege">
                <cell class="list-title" title="我的特权" value="更多特权" link="/privilege" @click="goPrivilege"></cell>
                <flexbox :gutter="0" wrap="wrap" class="list-content">
                    <flexbox-item :span="1/4" v-for="privilegeItem in myPrivilegeLists" @click="goPrivilegeAnchor($index)">
                        <div v-if="privilegeItem.isShow" class="flex-box">
                            <div class="flex-media"><img :src="$index+1 | privilege"></div>
                            <div class="flex-title">{{privilegeItem.privilegeTitle}}</div>
                        </div>
                    </flexbox-item>
                </flexbox>
            </group>
            <!--我的特权 END-->
        </div>
        <!--页面主体 END-->

    </div>
</template>

<script>
    import { go } from '../../libs/router'
    import {Group, Cell,Circle, Flexbox, FlexboxItem} from '../../components'
    import store from '../../vuex/store'/*0228 F*/
    const commit = store.commit || store.dispatch /*0228 F*/
    export default{
        components: {
            // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
            // 否则挂载点和组件名字一致, 即vhead
            Group,
            Cell,
            Circle,
            Flexbox,
            FlexboxItem
        },
        data(){
            return{
                memberData:[],
                gradeList:[
                    {
                        gradeImg:"",
                        gradeTitle:"普通会员0",
                        gradePoint:2000
                    },{
                        gradeImg:"",
                        gradeTitle:"白银会员1",
                        gradePoint:18000
                    },{
                        gradeImg:"",
                        gradeTitle:"黄金会员2",
                        gradePoint:30000
                    },{
                        gradeImg:"",
                        gradeTitle:"铂金会员3",
                        gradePoint:70000
                    },{
                        gradeImg:"",
                        gradeTitle:"钻石会员4",
                        gradePoint:150000
                    },{
                        gradeImg:"",
                        gradeTitle:"翡翠会员5",
                        gradePoint:""
                    }
                ],
                myPrivilegeLists:[
                    {
                        privilegeTitle:"预订奖励",
                        privilegeImg:"",
                        isShow:null
                    },
                    {
                        privilegeTitle:"抵现特权",
                        privilegeImg:"",
                        isShow:null
                    },
                    {
                        privilegeTitle:"优惠随行",
                        privilegeImg:"",
                        isShow:null
                    },
                    {
                        privilegeTitle:"精选特惠",
                        privilegeImg:"",
                        isShow:null
                    },
                    {
                        privilegeTitle:"尊享会员日",
                        privilegeImg:"",
                        isShow:null
                    },
                    {
                        privilegeTitle:"购物返利",
                        privilegeImg:"",
                        isShow:null
                    },
                    {
                        privilegeTitle:"乐享活动",
                        privilegeImg:"",
                        isShow:null
                    },
                    {
                        privilegeTitle:"遨游陪签",
                        privilegeImg:"",
                        isShow:null
                    },
                    {
                        privilegeTitle:"护照提醒",
                        privilegeImg:"",
                        isShow:null
                    },
                    {
                        privilegeTitle:"专属顾问",
                        privilegeImg:"",
                        isShow:null
                    },
                    {
                        privilegeTitle:"遨游到家",
                        privilegeImg:"",
                        isShow:null
                    },
                    {
                        privilegeTitle:"赠送保险",
                        privilegeImg:"",
                        isShow:null
                    },
                    {
                        privilegeTitle:"生日礼包",
                        privilegeImg:"",
                        isShow:null
                    },
                    {
                        privilegeTitle:"生日蛋糕",
                        privilegeImg:"",
                        isShow:null
                    }
                ]
            }
        },
        methods: {
            //获取数据
            takeData:function(i){
                // this.$http.get('/static/member_index.json').then((response) => {
                //     // success callback
                //     this.memberData = response.data

                //     window.localStorage.setItem('currentLevel',this.memberData.MemberLevel)//记录会员当前等级

                //     this.myPrivilegeLists[0].isShow = this.memberData.YuDingJiangLi
                //     this.myPrivilegeLists[1].isShow = this.memberData.JiFenDiXian
                //     this.myPrivilegeLists[2].isShow = this.memberData.YouHuiSuiXing
                //     this.myPrivilegeLists[3].isShow = this.memberData.TeXuanTeHui
                //     this.myPrivilegeLists[4].isShow = this.memberData.ZunXiangHuiyuanRi
                //     this.myPrivilegeLists[5].isShow = this.memberData.GouWuFanLi
                //     this.myPrivilegeLists[6].isShow = this.memberData.HuiYuanLeXiang
                //     this.myPrivilegeLists[7].isShow = this.memberData.AoYouPeiQian
                //     this.myPrivilegeLists[8].isShow = this.memberData.HuZhaoGuoQiTiXing
                //     this.myPrivilegeLists[9].isShow = this.memberData.LvYouZhuanShu
                //     this.myPrivilegeLists[10].isShow = this.memberData.AoYouDaoJia
                //     this.myPrivilegeLists[11].isShow = this.memberData.ZengSongLvYouBaoXian
                //     this.myPrivilegeLists[12].isShow = this.memberData.ShengRiZhuanShu
                //     this.myPrivilegeLists[13].isShow = this.memberData.ZengSongShengRiDanGao

                // }, (response) => {
                //     // error callback
                // });
                var vm = this
                var useCache = false
                var useProxy = true
                var memberid=api.getMemberId()||api.getQueryString("memberid")
                var param=JSON.stringify({memberID:memberid})
                api.post({
                    path: api.config.microServiceHost.memberurl,
                    controller: 'CrmMember',
                    action: 'GetAccountInfo',
                    param: param,
                    useCache: useCache,
                    useProxy: useProxy,
                    callback: function(obj) {
                        if (obj.ReturnCode == 0) {
                            vm.memberData = obj.Data 
                            window.localStorage.setItem('currentLevel',vm.memberData.MemberLevel)//记录会员当前等级
                            vm.myPrivilegeLists[0].isShow = vm.memberData.YuDingJiangLi
                            vm.myPrivilegeLists[1].isShow = vm.memberData.JiFenDiXian
                            vm.myPrivilegeLists[2].isShow = vm.memberData.YouHuiSuiXing
                            vm.myPrivilegeLists[3].isShow = vm.memberData.TeXuanTeHui
                            vm.myPrivilegeLists[4].isShow = vm.memberData.ZunXiangHuiyuanRi
                            vm.myPrivilegeLists[5].isShow = vm.memberData.GouWuFanLi
                            vm.myPrivilegeLists[6].isShow = vm.memberData.HuiYuanLeXiang
                            vm.myPrivilegeLists[7].isShow = vm.memberData.AoYouPeiQian
                            vm.myPrivilegeLists[8].isShow = vm.memberData.HuZhaoGuoQiTiXing
                            vm.myPrivilegeLists[9].isShow = vm.memberData.LvYouZhuanShu
                            vm.myPrivilegeLists[10].isShow = vm.memberData.AoYouDaoJia
                            vm.myPrivilegeLists[11].isShow = vm.memberData.ZengSongLvYouBaoXian
                            vm.myPrivilegeLists[12].isShow = vm.memberData.ShengRiZhuanShu
                            vm.myPrivilegeLists[13].isShow = vm.memberData.ZengSongShengRiDanGao                    
                        }
                        commit('UPDATE_LOADING',false)/*0228 F*/
                    }
                });
            },

            //跳转等级说明页
            goGrade(){
                this.$router.go({path:'/grade'});
            },
            //跳转我的游币页
            goMyCoins(){
                this.$router.go({path:'/my-coins'});
            },
            //跳转更多特权页
            goPrivilege(){
                this.$router.go({path:'/privilege'});
                window.localStorage.removeItem('selectedPrivilege')//清除会员特权
            },

            //跳转更多特权页-锚点
            goPrivilegeAnchor(i){
                this.$router.go({path:'/privilege'});
                window.localStorage.setItem('selectedPrivilege',this.myPrivilegeLists[i].privilegeTitle)//记录会员特权
            }
        },
        created() {
            commit('UPDATE_LOADING',true)/*0228 F*/
        },

        ready(){
            this.takeData()
        },
        filters:{
            'level'(value){
                switch(value){
                    case 1:
                        return "http://pic1.aoyou.com/app40/badge-01.png"
                    case 2:
                        return "http://pic1.aoyou.com/app40/badge-02.png"
                    case 3:
                        return "http://pic1.aoyou.com/app40/badge-03.png"
                    case 4:
                        return "http://pic1.aoyou.com/app40/badge-04.png"
                    case 5:
                        return "http://pic1.aoyou.com/app40/badge-05.png"
                    case 6:
                        return "http://pic1.aoyou.com/app40/badge-06.png"
                    default:
                        return "http://pic1.aoyou.com/app40/badge-01.png"
                }
            },
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

    .index-wrap{
        background-color: #fff;
    }

    .kv-wrap{
        position: relative;
        margin-top: -(100rem/20);
        /*top:0;*/
        /*left: 0;*/
        width: 100%;
        height: (292rem/20);
        overflow: hidden;
    }

    .kv-bg{
        position: relative;
        width: 100%;
        height: 100%;
        z-index:2;

        img{
            display: block;
            width: 100%;
            border: 0;
        }

        .kv-mask{
            position: absolute;
            left:0;
            top:0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,.5);
        }
    }

    .kv-content{
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: (192rem/20);
        z-index:3;

        .kv-tag{
            position: absolute;
            top: 15px;
            right: 0;
            padding-left: 11px;
            width: 70px;
            height: 25px;
            background-color: #FF5523;
            border-radius: 25px 0 0 25px;
            box-sizing: border-box;
            line-height: 0;
            overflow: hidden;
            z-index:8;

            span{
                font-size: 12px;
                color: #fff;
                font-weight: 300;
                line-height: 25px;
            }
        }

        .kv-main{
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;

            align-items: flex-end;
            -webkit-align-items: flex-end;
            -webkit-box-align: end;

            position: relative;
            width: 100%;
            height: (133rem/20);
            box-sizing: border-box;

            .item{
                -webkit-flex: 1;
                flex: 1;
                -webkit-box-flex: 1;
                -moz-box-flex: 1;
                -ms-flex: 1;
                position: relative;
            }

            .item-side{
                padding-bottom: 15px;
                p{
                    font-size: 12px;
                    color: #fff;
                    text-align: center;

                    em{
                        font-size: 19px;
                    }
                }
            }

            .item-media{
                padding-bottom: 20px;
                box-sizing: border-box;
            }

            .kv-circle{
                margin: 0 auto;
                transform:rotateZ(180deg);
                -webkit-transform:rotateZ(180deg);

                .ay-circle{
                    path{
                        position: relative;
                    }
                    path:after{
                        content: '';
                        display: block;
                        width: 4px;
                        height: 4px;
                        background-color: #fff;
                    }
                }
            }

            .member-avatar{
                margin: 0 auto;
                width: 75px;
                height: 75px;
                background: no-repeat center url(data:image/png;base64,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);
                background-size: 100%;
                border-radius: 75px;
                overflow: hidden;
                transform:rotateZ(180deg);
                -webkit-transform:rotateZ(180deg);

                img{
                    display: block;
                    width: 100%;
                    border: 0;
                    border-radius: 75px;/*0210*/
                    overflow: hidden;/*0210*/
                }
            }

            .kv-badge{
                position: absolute;
                left: 50%;
                bottom: 15px;
                margin-left: -42px;
                width: 84px;
                height: 22px;

                img{
                    display: block;
                    margin:0  auto;
                    width: 100%;
                    border: 0;
                }
            }
        }

        .kv-bottom{
            position: absolute;
            left: 0;
            bottom:0;
            padding-top: 30px;
            width: 100%;
            height: (60rem/20);
            box-sizing: border-box;
            background: no-repeat center bottom url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAB4CAYAAACtvXe9AAAAAXNSR0IArs4c6QAAEAdJREFUeAHt3UusJFUZB3BmGEFG3jAgyEvlJfEFilFEohtlwQ6JISIaEx+JG000LowuVDauXLDQjQk7TDAhcUFcQVQMUfAFKk9hGIfH8BoQeTPj/xurSE/b907fnnvv9Kn+neTLqa6q7nvqVwX8b3Fu9UEHaQQIECAwOIHdu3d/JXXU4A7MAREgQIAAAQIECBAYikAC+4mpnamrhnJMjoMAAQIECBAgQIDA4AQS2K9LVbtxcAfngAgQIECAAAECBAgMQSBh/SOpXZXa015MHT6E43IMBAgQIECAAAECBAYjkJC+MXV7arRdOZgDdCAECBAgQIAAAQIEhiCQtP6F0cTeLd80hGNzDAQIECBAgAABAgQGIZCQvjm1fUJwfy3rThrEQToIAgQILLjAxgU/fodPgACBoQh8Iwdy8oSDOTjrPjthvVUECBAgQIAAAQIECKynQO6oH516ZsLd9n7VXes5Hj+LAAECBAgQIECAAIEJAknnP+wT+jL9JRPeahUBAgQIECBAgAABAushkKB+RKq+bGlf7efrMR4/gwABAgQIECBAgACBCQJJ69/cV2Lvtr+S3h+pTjC0igABAgQIECBAgMCaCiSIH5za1gXzabofrOmAfDgBAgQIECBAgACBRRVIGr8ydeik48/6y6ZJ6yP71B+wHjnps6wjQIAAAQIECBAgQGBGgYTsTakHUhP/sDTrb0yttH17xuF4GwECBAgQIECAAAECkwSSyL/YpfLvjW/P+mNSr3bbV9I9np03j3+e1wQIECBAgAABAgQIzCCQcL0xdW+XyG8Z/4isv6rbNkv3nfHP85oAAQIECBAgQIAAgRkEksavGEnk9USYo0Y/Jq9vGNm+0sVn84Yto59nmQABAgQIECBAgACBGQQSrG8fS+NX9B+T9RtST49tX+nLa/vP0xMgQIAAAQIECBAgMINAEvhFE1L4df1HZds5E7avdNVrecMF/WfqCRAgQIAAAQIECBBYoUAC9fUTUnh9O+qex0Km//yE7bOsuiNvOniFw7M7AQIECBwggY0H6Of6sQQIECAwQSBBur7d9PIJm2qO+6Xd+vMmbJ9lVd1x//osb/QeAgQIEFh/AcF9/c39RAIECCwn8Lls3LTEDld2609bYvssq6/JLwvnz/JG7yFAgAABAgQIECCwsAIJ0X9LLdVeyobjUrcutcOM6+/J+w5fWHQHToAAgUYE3HFv5EQZJgECwxdIeL4wR7ncNJia43516uhV1jg7n/ez/PwNq/y5Po4AAQIEVlFAcF9FTB9FgACB/RT49BTv/2r2WYuAXY+bvGaKn28XAgQIECBAgAABAostkDved6emadum2WnGfb682GfB0RMgQIAAAQIECBBYRiAh+9wVBO3nV7DvSnfdlTd8aZmh2kSAAAECB0jAVJkDBO/HEiBAYEzgk2Ovl3v5luU27ue2mobz04T3r+3n53g7AQIECKyygOC+yqA+jgABAjMKXDzj+9bibRXer014/3HKFzSthbDPJECAwAwCa/EHTjMMw1sIECCw2AIJyNsjcPIcKvwqY7p6w4YNO+ZwbIZEgACBhRJwx32hTreDJUBgHgUS2k/NuOYxtBfXp1J3ZoyX1QuNAAECBA6cgOB+4Oz9ZAIECPQCZ/ULc9qfkHH9MuH9+u6XjDkdpmERIEBg2AKC+7DPr6MjQKANgTPbGOZBn8k465GV308d28iYDZMAAQKDERDcB3MqHQgBAg0LtBLci3hz6ruprQnvP0qdVis1AgQIEFh7AcF97Y39BAIECOxLYMu+dpjD7YdnTN9KPZjwflPq8tRhczhOQyJAgMBgBAT3wZxKB0KAQMMCRzQ89vrvyKWpG1JPJrz/InV16pSGj8nQCRAgMJcCHgc5l6fFoAgQmEYg4fBN2e/Q1CFrUPXZm7qqZ5nX8lL9SrfV/hV469/BVcek3pwaWnshB/RU6v7Uf1KvpV7fR1/7vJp6ZQ3q5TzWsj5bI0CAQJMCgnuTp82gCcyfQEJ0heea/9xXfbtnv1xTKKoqnFZNWp60bnTf8e312v81DIK2IoFd2fvFrl5KX1WvR/ullvv9Jm2vbfWLSlX9ktIvv5BfFuqXEI0AAQL7LSC47zehDyDQlkACdt2hrvnJNT2jr/519RW4p+37YF593UXWCBD4f4H6vwhvBPksV7B/fgX9v7v9q+/r+fxC8HJeawQILJCA4L5AJ9uhtiuQsF3/rFaYPjp1VOrIKav2rXDeB/NarikgGgEC7QvUtJ83gny3/Gz656as2ndnqn4J2J1eI0BgzgUE9zk/QYY3DIEueFfYruBd85n7fnS5D+UVtseX672mhQRBI0Bg1QVq+lCF/Z2pCvN9oB9dfqbbXv3ocr3nOcE/ChqBdRAQ3NcB2Y8YjkACeE0HOS5VXz4zbVUIrxK8g6ARIDA4gQr+FeCrnl5BPZXAX9OINAIEphQQ3KeEstvwBBLCa8pIhfAtXR2fvqrW9TX+uu6GawQIECCwOgJ1V/+pkXpyZLnW1+uqJ7qqsO/JQMHQFlNAcF/M8z7Io+6CeIXwE0bqxCyPBvNarjBefd0F1wgQIECgLYG6s19Bvg/0fV/rHk/tGKknBP1oaIMRENwHcyqHeSAJ4/XIvwrfVW+dsDwa0o/Jdo0AAQIECIwK1Jz80TBf4f6xVPV7LSfk12M9NQJzKyC4z+2pGe7AEsbruqupKCctUX1Ar77+KFMjQIAAAQLrIVB/pNuH+uofXaJqyo4n8azHGfEz9hIQ3Pfi8GJ/BRLK667321Inj/SjyxXW6+65RxIGQSNAgACBJgVqnn3dra9g/0hqe9ePLm9PuK+7/RqBVRMQ3FeNctgflEBeX/Ved8BP6arCeb9cfR/W65suNQIECBAgQOB/38jbh/l/BaSvCvr98mMJ+K/DIjCNgOA+jdLA9+mmrtRc8dNSp471fTivO+UV3jUCBAgQIEBg9QQqtNed+z7IP5zlbanRfoepORHRDhLcF+AiSDCvr7ivUH76WPVBvcL6ISmNAAECBAgQmD+BlzOkCvZ9oN+a5dF6OMG+9tEGLiC4D+AEJ5gflsOoUP72rs7oXvdBveaUO9dB0AgQIECAwAAF6g9la879aJh/KK8f7Gprgr0n5gSj9SbMNXAGu/nldVf8HV1VQD8jVX2VYB4EjQABAgQIEJgo0Af7Psg/lL1q+Z9dbUuwryk72pwLbJjz8S3M8BLOD8/BvjPVh/N+ufrTU57CEgSNAAECBAgQWHWBekrO1tQDqQrzfb9nOaH++azT5kBAcF/Hk5BwXs8kP3Oszupe1xNbNAIECBAgQIDAvAnUM+3vT93X9bW8pxLq69n32joJCO6rDJ1wXo9DrHB+9lhVQK8nt2gECBAgQIAAgaEI1LfSVqC/d6zuT6h/aSgHOS/HIbjPeCYS0Ou55eeO1DlZrrBec9E3pjQCBAgQIECAwKIK7MqB11NwKtDfk7q7rwT6eo69NoOA4L4MWsJ5zSuvO+XnpcZDes1J1wgQIECAAAECBFYmUHPm9wrzef331H0J9TXfXltCQHAPTDe9pe6YV0Dv611ZrtC+KaURIECAAAECBAisrcBr+fiadvOPVAX5vu4x7SYaaQsV3BPQK4TXdJZ3j1U9ucX0liBoBAgQIECAAIE5E6hpN/Wkm7vG6t4E+gr7C9MGG9wT0muu+ftS7031Qb3uqvuG0CBoBAgQIECAAIHGBV7J+GvKTR/o/5rlvyTM19z6Qbbmg3sC+uacmfekKqCP1tGDPGMOigABAgQIECBAYDmBndlYIX607kygf2G5N7WwrangnpB+QlDfnzq/62u5pr6Y5hIEjQABAgQIECBAYKJATbepJ9z8uas/VZ8wvyN9M21ug3tC+mlRvCD1ga6vsH5SSiNAgAABAgQIECCwGgKP5kMqxP8xdUf1CfMPp5/LNhfBPSH99Oh8MNUH9Qrrx8+lmEERIECAAAECBAgMWeDJHFyF+D1BPv3tCfNb5+GA1z24J6RvyYF/KHXhSNU6jQABAgQIECBAgMA8CjyRQf1hpH6fMF/r1rWtaXBPSD8sR1N30T/cVYX1uruuESBAgAABAgQIEGhZoO7CV5i/rauaZvPiWh7Qqgb3BPUzM9g+pFdfT3mpbx/VCBAgQIAAAQIECAxZoL71tZ5k0wf52xLk71/NA545uCekH5qB1Fz0j6Yu6npTXgKhESBAgAABAgQIEIhATae5NfW7rr8jYf7lLM/Upg7uCerH5idc3FWF9QrtFd41AgQIECBAgAABAgT2LVChvf7otcL8b6sS5J9OP1VbMrgnqJ+cT/hY6pKur28fXXL/bNMIECBAgAABAgQIEJheYHd2rW9+/U3q19UnyD+SfmJ7I4h3Qf3j2esTqeprvrpGgAABAgQIECBAgMD6CdS8+FtSN1c/GuQ3JLD/JCsrrNc3kGoECBAgQIAAAQIECMyPQH3ja4X4myu41y16jQABAgQIECBAgACBORbYOMdjMzQCBAgQIECAAAECBDoBwd2lQIAAAQIECBAgQKABAcG9gZNkiAQIECBAgAABAgQEd9cAAQIECBAgQIAAgQYEBPcGTpIhEiBAgAABAgQIEBDcXQMECBAgQIAAAQIEGhAQ3Bs4SYZIgAABAgQIECBAQHB3DRAgQIAAAQIECBBoQEBwb+AkGSIBAgQIECBAgAABwd01QIAAAQIECBAgQKABAcG9gZNkiAQIECBAgAABAgQEd9cAAQIECBAgQIAAgQYEBPcGTpIhEiBAgAABAgQIEBDcXQMECBAgQIAAAQIEGhAQ3Bs4SYZIgAABAgQIECBAQHB3DRAgQIAAAQIECBBoQEBwb+AkGSIBAgQIECBAgAABwd01QIAAAQIECBAgQKABAcG9gZNkiAQIECBAgAABAgQEd9cAAQIECBAgQIAAgQYEBPcGTpIhEiBAgAABAgQIEBDcXQMECBAgQIAAAQIEGhAQ3Bs4SYZIgAABAgQIECBAQHB3DRAgQIAAAQIECBBoQEBwb+AkGSIBAgQIECBAgAABwd01QIAAAQIECBAgQKABAcG9gZNkiAQIECBAgAABAgQEd9cAAQIECBAgQIAAgQYEBPcGTpIhEiBAgAABAgQIEBDcXQMECBAgQIAAAQIEGhAQ3Bs4SYZIgAABAgQIECBAQHB3DRAgQIAAAQIECBBoQEBwb+AkGSIBAgQIECBAgAABwd01QIAAAQIECBAgQKABAcG9gZNkiAQIECBAgAABAgQEd9cAAQIECBAgQIAAgQYEBPcGTpIhEiBAgAABAgQIEBDcXQMECBAgQIAAAQIEGhAQ3Bs4SYZIgAABAgQIECBAQHB3DRAgQIAAAQIECBBoQEBwb+AkGSIBAgQIECBAgAABwd01QIAAAQIECBAgQKABAcG9gZNkiAQIECBAgAABAgQEd9cAAQIECBAgQIAAgQYEBPcGTpIhEiBAgAABAgQIEBDcXQMECBAgQIAAAQIEGhD4L/z/u8Cytu9DAAAAAElFTkSuQmCC);
            background-size: 100%;

            p{
                font-size: 12px;
                color: #999;
                font-weight: 300;
                text-align: center;
                line-height: 20px;

                em{
                    padding-left: 5px;
                    color: #FF5523;
                    font-weight: normal;
                }
            }
        }
    }

    .my-privilege{
        width: 100%;


        .ay_cells{
            margin-top: 0;

            &:before, &:after{
                display: none;
            }
        }

        .ay_cell{
            padding: 8px 0 8px 20px;
        }

        .list-title{
            .ay_cell_bd{
                & >p{
                    font-size: 19px;
                    color: #333;
                   }
            }

            .ay_cell_ft{
                position: relative;
                margin-right:20px;
                padding-right:15px;

                p{
                    font-size: 14px;
                    color: #41B3EE;
                    font-weight: 300;
                }

                &.with_arrow:after{
                     right: -12px;
                     margin-top: -5px;
                     width: 16px;
                     height: 16px;
                     border-color: #41B3EE;
                     border-width: 3px 3px 0 0;
                     transform: rotate(45deg) scale(0.5);
                     -webkit-transform: rotate(45deg) scale(0.5);
                     transform-origin: 0 0;
                     -webkit-transform-origin: 0 0;
                 }
            }
        }

        /*新增 0210 START*/
        .list-content{
            display: block;

            &:after{
                content: '';
                display: block;
                width: 100%;
                height: 0;
                line-height: 0;
                clear: both;
             }

            .ay-flexbox-item{
                float: left;
                width: 25%;
                box-sizing: border-box;
            }
        }
        /*新增 0210 END*/

        .ay-flexbox-item{
            padding: 15px 0 12px 0;
        }

        .flex-media{
            margin: 0 auto;
            width: 35px;
            height: 35px;
            background: no-repeat center url(data:image/png;base64,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);
            background-size: 100%;
            box-sizing: border-box;

            img{
                display: block;
                width: 100%;
                border: 0;
            }
        }

        .flex-title{
            -webkit-font-smoothing:antialiased;
            font-family: "Heiti SC";
            font-size: 14px;
            color: #333;
            text-align: center;
            line-height: 28px;
        }
    }


</style>