<template>
    <div class="detail-wrap"><!--0220 F-->
        <view-box v-ref:view-box>

            <div class="message-header-box" slot="header">
                <!--<x-header :left-options="{showBack: true}" :right-options="{showBack: true}" :transition="headerTransition" :title="title" :class="{'white-header':route.path.indexOf('/detail')>=0 }" @on-click-title="scrollTop">-->
                <x-header :left-options="{showBack: true}" :right-options="{showBack: true}" :transition="" title="发现头条" class="white-header" @on-click-title="scrollTop">
                <div slot="right"  v-on:click="share()" v-if="showShare">
                    <i class="icons icon-share"></i>
                </div>
                </x-header>
            </div>

            <div class="page-inner message-detail">
                <div class="content">
                    <!--<div class="detail-media" v-if='imgUrl!=null&&imgUrl.length>0'>
                        <img :src="imgUrl+'?imageView2/1/w/162/h/109'">
                    </div>-->
                    <div class="detail-title">
                        <h2>{{title}}</h2>
                        <span>{{publishTime}}</span>
                    </div>
                    <div class="detail-content">
                        <div class="detail-txt" v-html="content"></div>
                        <div class="insert-wrap" v-if='product!=null&&product.productTitle!=null&&product.productTitle.length>0'>
                            <div class="insert-tag">{{product.recommendTitle}}</div>
                            <div class="insert-box" v-on:click='toProductDetail(product.productUrl)'>
                                <div class="insert-media">
                                    <img :src="product.imgUrl+'?imageView2/1/w/80/h/60'">
                                </div>
                                <div class="insert-inner">
                                    <div class="insert-title">{{product.productTitle}}</div>
                                    <div class="insert-price">¥{{product.price}}<span>起</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </view-box>

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
    import {ViewBox, XHeader,Scroller, Group, Cell, Divider, Card, Spinner} from '../../components'
    import store from '../../vuex/store'/*0228 F*/
    const commit = store.commit || store.dispatch /*0228 F*/
    export default {
        components: {
            // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
            // 否则挂载点和组件名字一致, 即vhead
            ViewBox,
            XHeader,
            Scroller,
            Group,
            Cell,
            Divider,
            Card,
            Spinner
        },

        data (){
            return {
                msgId:0,
                title:'',
                imgUrl:'',
                publishTime:'',
                content:'',
                product:[],
                showShare:api.showShare,
                shareTitle:"",
                shareSubTitle:"",
                shareImg:""
            }
        },
        methods: {

            takeData:function(i){
                // this.$http.get('/static/message_detail.json').then((response) => {
                //     // success callback
                //     var data = response.data
                //     this.title= data.title
                //     this.imgUrl = data.imgUrl
                //     this.publishTime = data.publishTime
                //     this.content = data.content
                //     this.product= data.product

                //     this.$dispatch('child-title', this.title)

                // }, (response) => {
                //     // error callback
                // });
                var vm = this
                var useCache = false
                var useProxy = true
                var msgParam={
                    MessageId:vm.msgId
                }
                api.post({
                    path: api.config.microServiceHost.elementurl,
                    controller: 'Message',
                    action: 'GetMessageInfo',
                    param: JSON.stringify(msgParam),
                    useCache: useCache,
                    useProxy: useProxy,
                    callback: function(obj) {
                        if (obj.ReturnCode == 0) {
                            var data = obj.Data
                            vm.title= data.title
                            vm.imgUrl = data.imgUrl
                            vm.publishTime = data.publishTime
                            vm.content = data.content
                            vm.product= data.product
                            vm.$dispatch('child-title', document.referrer.indexOf('/wap.html')>=0?'今日头条':data.title)
                            //微信分享
                            vm.shareTitle="发现头条："+data.title
                            vm.shareSubTitle=data.subtitle||"我在遨游网发现好品质旅游，好旅游上遨游"
                            vm.shareImg="http://pic1.aoyou.com/logo.jpg" //遨游logo
                            vm.initShareDialog()
                        }

                        commit('UPDATE_LOADING',false)/*0228 F*/
                    }
                });
            },
            toProductDetail:function(url){
                location.href=url
            },
            share:function(){
                api.openShareDialog(this.shareTitle, this.shareSubTitle, window.location.href, "", {})
            },
            //wap微信分享
            initShareDialog:function(){
                api.initShareDialog(this.shareTitle,this.shareSubTitle, window.location.href, this.shareImg)
            },

            scrollTop () {
                this.$refs.viewBox.$els.viewBoxBody.scrollTop = 0
            }/*0220F*/
        },
        created() {
            commit('UPDATE_LOADING',true)/*0228 F*/
        },
        route:{
            data:function(transition){
                if(transition.to!=null&&transition.to!=undefined)
                {
                    this.msgId=this.$route.query.msgId||0
                    this.takeData()
                }
            }
        }
    }

</script>

<style lang="less">
    @import '../../styles/index.less';
    @import '../../styles/ayui/base/reset.less';

    .detail-wrap{
        width: 100%;
        height: 100%;
    }/*0220F*/

    .message-header-box{
        .white-header{
            background-color: #fff;

            &:after{
                 content: " ";
                 position: absolute;
                 left: 0;
                 bottom: 0;
                 width: 100%;
                 height: 1px;
                 border-bottom: 1px solid #DFDFDF;
                 color: #DFDFDF;
                 -webkit-transform-origin: 0 100%;
                 transform-origin: 0 100%;
                 -webkit-transform: scaleY(0.5);
                 transform: scaleY(0.5);
             }

            .icon-share{
                background: no-repeat center url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABAdJREFUWAntmE1IVFEUx+crXaigmbNwXJTQB0QYOCPYInSRLZQoY2gRUrRzIxQE9mVqEESLsoVtMqIgKFtEMZoIaYuBnA8oadVmJHBMlBFqFtOMM9P/jO887jxmhjfz7gwEXXjv3I9zz/l57r3n3dFk+l+yI9De3t6d3VO4ZS08LHfU5XLdSafTUw6HwxQOhz/psW7WKsHI0VQqdd1sNjthbJ92PF8b+u5AIPAm3zjBwe5NHrdYLLf9fv84t/NJiziA8A/CiA997mLgyAYAG0RbYl0LR2PwM4b+EVEvV10F7OjoaIPCBJ5duRRL7csFx7b0QNpYOZlM3kA9A4doeLEEl3w+33ceL0ViRcbFZYXdJFYma98rkKZ8y61GEAAuhpAFB3u32CakB3DsLw3YDzxWKJI8gXT38gQZkYOtLDj80YPo40O52dTUdFoLiYiLczI4IiDzGZK0rDAgOvK0trb2I3p7BMPh2dnZPwSJvjmhf1wLKRUQxsdywU1PT8cRQQeDIHJhqhNkXV1dQUhpgDit/fAppg2P3W4/S3AEgwgeIkkF9ZVMBa/FxcVYLkin03mVdKQB9vb2vkVkXpBRyBmCowhRmwqgjuzUMu9loZ4LcstqtX4kHWmAo6Ojqb6+vouAu4y91S/CkSMAUp7NFCx3FiB1ciQx/5XNZjuxtLQUpH4+VSbsnzR1UAkGg2r/To+xNz4CjcizG7AC/+bt2traBgBF9ViVFsFCzpDnugmOdBDJz3rhSL8igPBzipxRwfLO79T0vcsO2NPTU4Oo0Qnn8o4remTZASORyDmA1Cgwy/jmftEDxjplBXS73VZEb5id4YA847peWVbAUCh0HiD7CQZwkerq6id6wVhPvW5xhyzZ2dm5Ox6P32d7iOQDr9f7m9v5JL5Ih2msqqpqC/rhsgEmEolJ+LErID/wOXuo1AsKpKRvpBCLxUiYy7LESPrDiBgdjkzB8g4Wk/t4HknpgIC7Art3BSeP8WNqRmgXVZW2xF1dXbZoNHoPkSNALgtY2iFulCKlAGJjHwfcJOAyG1wBWYA8g6XdLgWM5xgCxCXAiU09gecYG1Tka9yiB/guqBkrqmkIEBGrx6PC4TD8wjOC3zSPINXbUVFEGmVDgIgcf7bo1vwSUNfwKfsJqXFTetMQIO6Nm7iaX8Dtdw4XzPXSMfLPNARIZpFCnuc3b3xEeh40jpRt4d8BxMYOMTvSxwGuV1JiPx9kf8yjRhDpIsCDOJ1PKw2p+JtiBvD4qa7mAyi04ZcXdUr99xs7LFImkBlcyKdf1X+Fra6urjc3N2/A0Ek8an+RhmWoJ2BkCNnBQ8ayQNbW1gItLS3vEd5GjNXgqSelCpUV+JlH5AYYrkJ+jbn5CznlhgHnzeWxAAAAAElFTkSuQmCC);
                background-size: 20px 20px;
            }

            .ay-header-left .left-arrow:before{
                border-color: #333;
            }

            .ay-header-title span, h1 span{
                color: #333;
            }
        }
    }

    .message-detail{
        background-color: #fff;
        color:#333;

        .content{
            padding: 64px 20px 20px 20px;
        }

        .detail-media,.detail-title,detail-content{
            margin-bottom: 20px;
            width: 100%;
        }

        .detail-title{
            h1,span{
                display: block;
            }

            h2{
                font-size: 19px;
                line-height: 28px;
            }

            span{
                padding-top: 3px;
                font-size: 12px;
                color: #999;
                font-weight: 300;
                line-height: 18px;
            }
        }

        .detail-content{
            p{
                display: block;
                margin-bottom: 27px;
                font-size: 16px;
                font-weight: 300;
                line-height: 27px;
            }
        }

        .insert-wrap{
            position: relative;
            margin-bottom: 20px;
            padding: 8px 0 0 0;
            width: 100%;
            height: 100%;

            .insert-tag{/*0122*/
                position: absolute;
                left: 0;
                top: 0;
                margin: 0 10px;
                padding: 0 5px;
                width: auto;
                background-color: #fff;
                font-size: 12px;
                line-height: 16px;
                box-sizing: border-box;
                .ellipsisLn(1)
            }

            .insert-box{
                display: -webkit-box;
                display: -webkit-flex;
                display: flex;
                align-items: center;
                -webkit-align-items: center;
                -webkit-box-align: center;
                padding: 20px 10px;
                width: 100%;
                /*height: (50rem/20);*/
                box-sizing: border-box;
                border: 1px solid #DFDFDF;
                cursor: pointer;
            }

            .insert-media{
                width: (80rem/20);
                height: (60rem/20);
                overflow: hidden;

                img{
                    height: 100%;
                }
            }

            .insert-inner{
                -webkit-flex: 1;
                flex: 1;
                -webkit-box-flex: 1;
                -moz-box-flex: 1;
                -ms-flex: 1;
                padding-left: 10px;
                width: 100%;

                .insert-title{
                    width: 100%;
                    height: (40rem/20);
                    font-size: 16px;
                    color: #333333;
                    line-height: (20rem/20);
                    .ellipsisLn(2)
                }

                .insert-price{
                    position: relative;
                    top: (2rem/20);
                    font-size: 19px;
                    color: #FC5A3F;
                    letter-spacing: 0;
                    font-weight: 300;
                    line-height: (20rem/20);

                    span{
                        padding-left: 2px;
                        font-size: 12px;
                    }
                }
            }
        }
    }
    .icon-share {
            float: right;
            display: inline-block;
            width: 40px;
            height: 40px;
            margin-right: 10px;
            vertical-align: -2px;
            background-size: contain;
            background-repeat: no-repeat;
            background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAfCAYAAADwbH0HAAAAAXNSR0IArs4c6QAAA21JREFUSA21lktIlFEUx51RZkaG0InoQYK1qE1Q1KKVFUlFRQi2MBLDEHWoCOlhRWCF0KKwQsvAx2BDTYiUvaBaJIUUBEEPa9ciCnqBLowkzHn0+3/MB6PM4/vG6cKZc+459/z/98x9fXl5OW5dXV2LrEA6rQyyOgbSQw6H4yN6Y6acnBFDdgSyi7FYzIt+2NPTU56O3KEgg5ZGo9E2zPXIPPlSNSra1djYOJAYJ7+Z/PPE4I0ZmMT/0K9g7JPEsabt7OvrW0LSGxw7kbSk8aS5ZrI0lZ4QKWYUGZIPwheoQuQB8S3yzWwFU1NT53AWMfge4m9oaPg5c1CqPpWehPQscZHWUW2ZxqKvoUbQ+4Tb29tbWV9f/1gxszkJ6u/Nc7vdB+yQUkmLSQr4Xr/fH0TPjwOP0t9P/wr4nkgkcpdJbjdJpbW5Fsqora39Km2lQXqGca0AR9B7WMfr8TzjKOXn539TH/9BVAfiZgJ3uru7d8ivZntXQ9pK3uk4aQ2V3TSQ+AG8RDbaIJZNvImxl/C56N6GvEJ+W8QkbSOnBQkj1VTUjzZaKBTyYaji36zntH+PcYfxXxA5cgucDbaIAXjE7NucTudu7GlHamJiYqVmQPwDEpOd2Kj8KH4duReQvypIDFqxIWxONg7AtQAq9DZZXD5yjw8MDLiqqqr+2qo4FaD87PBN0kzgmXSqJlLFckIcCATmgLUOibpcrqQ3lcgSW06Iw+FwLaCFVDvMsRxLJEhlz5qYdYXPofOqY9Seimimf9bE3EhbIVwO+Sc2z/2ZBKn6syaG1Njl6MuQ685O2rh4qpnkZjNo+ziZidJcBE0Q6tEf83q9gcRYEjvEzpfbeDazrpgK1gCi51BHqK6mpuaXbKstK2Le8GII+qnWBWm7nbU1J2abmHUq4Q1/DsAy5HVxcfExE8yOtkWsN5V1ekmlKyB57/F4KsybyA6pxlraXKxnGX+pvquMJ428p0gll8W4QLJpGYmpshzCIaoUvohO+Xy+TirVR0DWLSMxpCOgf0Fu8Bx22Pk8SjerjMS8o6MAlKYDySamzfVDicFgcHE2AFZyErC/m+OdbJphdSYnJztZzwVmIFdamGBfjeMZXLIdfPOW8vn5DrsoHvxfapyvz1V8j30WgVMGm2Y19iCi9cx1E+agOExSEfwDxuJgDdszrU0AAAAASUVORK5CYII=');
        }
</style>
