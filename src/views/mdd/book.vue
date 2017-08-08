<template>
    <div class="page book">
        <view-box>
            <div class="ay-header-box" slot="header">
                <div class="header-cover" :style="{opacity:isOpacity}"></div>
                <headerbar class="shade">
                    <span slot="left" class="icons icon-arrow" @click='back()'></span>
                    <div class="departciry">
                        <span class="citys" @click="" :style="{opacity:isOpacity}">遨游宝典-{{mainInfor.DesName}}</span>
                    </div>
                    <span slot="right"  class="icons icon-share" v-on:click="share()" v-if="showShare"></span>
                </headerbar>
            </div>
            <div class="page-inner" :class="{'overflow':overflowState}">

                <section class="ay-section">
                    <cell :title="mainInfor.TypeName"></cell>
                    <article class="ay-article" v-html="mainInfor.Content">
                    </article>
                </section>
            </div>
        </view-box>
        <div class="fixedNavBtn" @click="showSideNav"></div>
        <div class="sidenav">
            <div class="shade" v-show="isNavShow" @click="closeSideNav" @touchmove.prevent></div>
            <nav class="nav-list" :class="{right:isNavShow}">
                <div class="nav-head" @touchmove.prevent>
                    <div class="block">
                        <span class="left-btn" @click="closeSideNav"><i class="icons icon-close-black"></i></span>
                    </div>
                    <h3>目录</h3>
                </div>
                <ul class="nav">
                    <li v-for="navItem in mainInfor.MenuList" :class="{'active':typeId==navItem.TypeId}" @click="selectNav($index,navItem)">{{navItem.TypeName}}</li>
                </ul>
            </nav>
        </div>
    </div>
</template>
<style lang="less">
    @import '../../styles/index.less';
    @import '../../styles/ayui/base/reset.less';
    .book {
        background-color: #fff;
        .ay_tab_bd{
            padding-bottom: 0;
            padding-top: 44px;
        }
        .ay-section {
            padding: 0 20px;
            .ay_cell {
                height: 60px;
                line-height: 60px;
                font-size: 19px;
                padding: 0;
                position: relative;
                &:after {
                    content: "";
                    display: block;
                    width: 100%;
                    left: 0;
                    position: absolute;
                    bottom: 0;
                    border-bottom: 1px solid #DFDFDF;

                }
            }
        }
        .ay-article {
            line-height: 27px;
            font-size: 16px;
            color: #333;
            padding: 20px 0;
            word-break: break-all;
            img {
                width: 100%;
                display: block;
                margin: 20px 0;
            }

        }
        .fixedNavBtn {
            position: absolute;
            right: 0;
            bottom: 45px;
            width: 60px;
            height: 50px;
            border-top-left-radius: 100px;
            border-bottom-left-radius: 100px;
            background-color: #FF5523;
            &:after {
                content: "";
                display: block;
                width: 20px;
                height: 20px;
                background-size: 100%;
                background-repeat: no-repeat;
                background-position: center;
                background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAdCAYAAADYSS5zAAAAAXNSR0IArs4c6QAAAJZJREFUWAntllEKwCAIhnPn2A7URXbxvEfTIJBIFuSe9geysj+Vbw+aaq1ZrIiNS305maVnsZl2fBtxbvlJE0oNp6nDbpmIru540XZZ5JePyGhfxNICbzGeBFef3tnlaa0maj/LHxUbcUAABEAABMIISH/1BgAMCwuUMSwsQHIlGBZcNLgAARD4FQH04r3fjV68w6/14gdO9d2jR1dFXQAAAABJRU5ErkJggg==");
                line-height: 1;
                position: absolute;
                top: 50%;
                left: 50%;
                -webkit-transform: translateX(-50%) translateY(-50%);
                transform: translateX(-50%) translateY(-50%);
                color: #333;
                font-size: 2rem;
            }
        }
        .sidenav {
            .shade {
                position: fixed;
                height: 100%;
                top: 0;
                width: 100%;
                height: 100%;
                width: 100%;
                background-color: #000;
                opacity: .3;
                z-index: 10;
            }
            .nav-head{
                position: fixed;
                box-sizing:border-box;
                width: 100%;
                top:0;
                z-index:9;
                background: #fff;
                padding:0 20px;
            }
            .nav-list {
                box-sizing: border-box;
                top: 0;
                right: 0;
                position: fixed;
                height: 100%;
                width: 80%;
                background-color: #fff;
                padding: 100px 0 0;
                transform: translate(100%, 0);
                -webkit-transform: translate(100%, 0);
                -moz-transform: translate(100%, 0);
                -o-transform: translate(100%, 0);
                -ms-transform: translate(100%, 0);
                transition: All .4s ease;
                -webkit-transition: All .4s ease;
                -moz-transition: All .4s ease;
                -o-transition: All .4s ease;
                z-index: 11;
                h3 {
                    line-height: 60px;
                    color: #333;
                    font-size: 19px;
                    border-bottom: 1px solid #DFDFDF;
                }
            }
            .right {
                transition: All .4s ease;
                -webkit-transition: All .4s ease;
                -moz-transition: All .4s ease;
                -o-transition: All .4s ease;
                transform: translate(0, 0);
                -webkit-transform: translate(0, 0);
                -moz-transform: translate(-0, 0);
                -o-transform: translate(0, 0);
                -ms-transform: translate(0, 0);
            }
            .nav {
                height: 100%;
                overflow-y: scroll;
                padding: 0 20px;
                li {
                    position: relative;
                    height: 60px;
                    line-height: 60px;
                    font-size: 17px;
                    &:after {
                        content: "";
                        display: block;
                        position: absolute;
                        width: 40px;
                        height: 1px;
                        left: 0;
                        bottom: 0;
                        background-color: #DFDFDF;
                    }
                }
                .active {
                    color: #FF5523;
                }
            }

        }
        .block {
            box-sizing: border-box;
            height: 44px;
            line-height: 1;
        }
        .left-btn {
            display: inline-block;
            height: 40px;
            width: 40px;
            float: left;
        }
        .icon-close-black {
            display: inline-block;
            width: 15px;
            height: 15px;
            margin-top: 13px;
            background-repeat: no-repeat;
            background-size: contain;
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAA6FJREFUaAXV2zuIE0EYB/DsRkEkwUaLPAqrBO8QiySVjciVvgoPH4iVr0KxsjixSClYaaVXKb4KBUUiWEn6JNfYWAZEg6dokdgkmvj/Qibs7WWzMzuP7AwMM7s7uzO/28dNvk2cUqm0x3GcB6PR6EQikegg3261Wm9RWp/K5fJJuO4CkoHxHeo3krlcbh2Vi1i5C3kf8pl8Pv8NaQN1a1OlUrkM1zMAyES2Q0DnkplM5vFkBYpxctDwmM1owg6Hw0fQOBMTK/a7qNFl7E8O7UA7+jfEfRm36KUALA29Q+A15BEt+ZJ1aMLCsI7sP7NEI+NastPpfM5ms1+xcBzZ39CayzsM67rutWaz+TwJZALoDZvRPNhGo0FnPjEG24wWwW4BMzQ9nekpjeXYX96i2G1gWkH/f21AR8HOBNuAjooNBMcZLYOdC44jWhYbCo4TWgWWCxwHtCosN3iRaJVYIfAi0KqxwmCTaB3YSGATaF3YyGCdaJ1YKbAOtG6sNFgl2gRWCVgF2hRWGVgGbRKrFBwFbRpLY/R/yKd10mlOmJSOPUJ86SoiixRUCwy4UQyKhWWkB+Q5gBYwHT8MPRnDrP7pD6IFS31OY1qTASgrwiIn6Mg4lnDawHTwEDQ18SatZ5Z1pBVMnRAaIeDvqFJgMDDhMr6Oe/ZhYANFG+jNg9ZUrVZdvMQ6HNYJHmJHkHaEtZPdrvUME7ZWqz1B2PcCx0CX+/3+gWKx+Kbdbg852kdqog0siGWD147WAubA/obwD/JuJvWUy4PBYKlQKGg508rvYU7sCoBHkX96oNMqboHT3W73hY57etb/wmnHohVeLL5SMf52AaaWB9HHR+S9AX29SqfT5+v1+t+A7cKrlYFFsWykptFKwFGxi0BLg2WxptFSYFVYk+jIYNVYU+hIYF1YE2hhsG6sbrQQ2BRWJ5p7pmUaS2hMUD6hCJyRYdtqr9d7KTIj4zrDi8ASmKWwyQk+fr5OpVLneGZkoeBFY1Wj54LjglWJDgTHDasKPRMcV6wK9DZw3LGy6C1gW7Ay6CnYNmxU9BhsKzYK2rEdK4pOIlh2BzvdZDv6SoourrAYlG9brBbxJfdNvOH4gEGtIs+Khi4h7r2T3gpcCRi5NVg2/rC5N1ldhET/sR08pXVYNvZ5aFiHdIbvs8ZUYvkXCisuY++4vXUP+od3PVnHT2n8ZO0sNpxC3sTKe3iL98Xb0NY6PmXRT/BuYfxZ5Pf4VcvT/9VxHDK/F3xQAAAAAElFTkSuQmCC");
        }
    }
</style>
<script>
    import {ViewBox,Loading,Cell,Tabbar, TabbarItem,Headerbar} from '../../components'
    export default{
        components: {
            // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
            // 否则挂载点和组件名字一致, 即vhead
            ViewBox,
            Loading,
            Cell,
            Tabbar,
            TabbarItem,
            Headerbar
        },
        data(){
        return{
            backUrl:'',
            departCity:{},
            destId:0,
            typeId:0,
            mainInfor:[],
            navlist:[],
            isNavShow:false,
            showShare:api.showShare,
            shareTitle:"",
            shareSubTitle:"",
            shareImg:"",
            destName:"",
            overflowState:false
//            isRight:"-300px"
        }
    },
    methods:{
        tackData:function(){
            var vm = this
            var useCache = false
            var useProxy = true
            var destParam = {
                DestinationId:vm.destId,
                DestSubInfoTypeId:vm.typeId
            }
            api.post({
                path: api.config.microServiceHost.destinationurl,
                controller: 'Destination',
                action: 'GetDestnationSubInfo',
                param: JSON.stringify(destParam),
                useCache: useCache,
                useProxy: useProxy,
                callback: function(obj) {
                    if (obj.ReturnCode == 0) {
                        var data = obj.Data;
                        //data.Content=api.HTMLDecode(data.Content)
                        vm.mainInfor = data
                        //分享
                        vm.shareTitle=vm.destName+"遨游宝典，小编实地整理"
                        vm.shareSubTitle="实用目的地指南，特色玩法推荐，超值品质旅行，遨游旅行带你玩！"
                        vm.shareImg=data.ShareImg
                        vm.initShareDialog()
                        console.dir(data)
                    }
                }
            });
        },
        showSideNav:function(){
            this.isNavShow = true
            this.overflowState = true
        },
        closeSideNav:function(){
            this.isNavShow = false
            this.overflowState = false

        },
        selectNav:function (i,navItem){
            this.isNavShow = false
            this.typeId=navItem.TypeId
            this.tackData()
            this.overflowState = false
            document.querySelector('.ay-section').scrollIntoView()
        },
        back:function(){
            api.pageBack(window.location.href)
        },
        //app分享
        share:function(){
            api.openShareDialog(this.shareTitle, this.shareSubTitle, window.location.href, this.shareImg, {})
        },
        //wap微信分享
        initShareDialog:function(){
            api.initShareDialog(this.shareTitle,this.shareSubTitle, window.location.href, this.shareImg)
        }
    },
    created:function(){
        this.departCity=api.getDepCity()
    },
    route:{
        data:function(transition){
            if(transition.to!=null&&transition.to!=undefined)
            {
                this.destId=this.$route.query.destId||0
                this.typeId=this.$route.query.tid||0
                this.destName=decodeURIComponent(this.$route.query.destname)||""
                this.backUrl='http://m.aoyou.com/mdd.html#!/detail?destId='+this.destId
                this.tackData()
            }
        }
    }
}
</script>
