<template>
    <div class="need-wrap">
        <view-box v-ref:view-box>

            <div class="page-inner">

                <div class="popup">
                    <popup :show.sync="sortPopup">
                        <div  v-for="(i,sortItem) in PersonTypeList" class="check-list" :class="{'checked':isRadioChecked==sortItem.PersonTypeID}" @click="changeCheck(sortItem.PersonTypeID)">
                            <p>{{sortItem.PersonTypeName}}</p>
                            <i v-if="isRadioChecked==sortItem.PersonTypeID"></i>
                        </div>
                    </popup>
                </div>

                <div class="visa-head whitetheme">
                    <!--头部标题栏 START-->
                    <div class="visa-header-box" slot="header">
                        <x-header :left-options="{showBack: true}" :right-options="{showMore: false}"  title="所需材料"  @on-click-title="scrollTop">
                        </x-header>
                    </div>
                    <!--头部标题栏 END-->
                    <div class="manage-bar">
                        <div class="bar-left"></div>
                        <ul>
                            <li class="bar-item" :value="demo4">

                                <span class="btn-switch" @click="showAll">{{btnText}}</span>
                            </li>
                            <li class="bar-item"  @click="sortPopup=true,filterPopup=false,isflag=true" :class="{'active':sortPopup==true}">
                                <span class="btn-pull">{{sortTitle}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="content">
                    <section class="ay-section">
                        <div class="list-cell" v-for="listItem in MaterialList">
                            <div class="list-title"  @click=showCurrent(listItem)>
                                <p>{{listItem.MaterialName}}</p>
                                <i class="icon-arrdown" :class="{'active':listItem.IsShow}"></i>
                            </div>
                            <div class="list-detail" v-show="listItem.IsShow">
                                <p v-html="listItem.MaterialRemark"></p>
                                <!--<p class="clicksee" v-if="listItem.FilePath"><a :href="listItem.FilePath">查看样图</a></p>-->
                            </div>
                        </div>
                    </section>
                </div>
            </div>

        </view-box>
    </div>
</template>
<style scoped>
    .page{
        .ay_tab_bd{
            padding-bottom: 0;
        }
    }
    .visa-head{
        /*position:fixed;*//*0228 F*/
        position: absolute;/*0228 F*/
        width:100%;
        z-index:101
    }

</style>
<style lang="less">
    @import '../../styles/index.less';
    @import '../../styles/ayui/base/reset.less';
    .need-wrap{
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
            padding-top:88px;
            background:#fff;
        }
    }
    .manage-bar{
        position: relative;
        padding: 0 20px;
        width: 100%;
        height: 44px;
        top: 44px;
        position: absolute;
        box-sizing: border-box;
        background-color: #fff;
        z-index: 1;
        line-height: 44px;

        &:after{
         .setBottomLine(#DFDFDF);
         }

        .bar-item{
            display: block;
            margin-left:25px ;
            line-height: 0;
            float: right;
            &.active{
                .icon-filter{
                    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAypJREFUWAntV01IVFEUPuc544gkEUGW2yKJQEdNI9zUIlpkQcE4TZGQRC4qhCxxExRFYLQorahVWqZjQ0LQz6KIICOEfpxJg2pRUNCi0H4UnZo3p+8+fTbomzdv/MGNF+bdd8/9zne+d965975h8RUIzWPT5jG2EdpFxA+JZDP6exwKV8y1IPGVLif6E0bMZcRUq1FmVjWCDsCwVXze2rkUICKM4NfHgz+iznCzxjd7vpCmKRFo8UaI8I7dz8HVX3RsPNvfSDx7mVkpGmtSWXiRRA5i9I6yqIRvRIbNudnoxe8tBf8z/FzEWgXf6r2veP8XYfaSoxi/wS+fotykJmerSXV5Dkm8A8HdxHzeDK74JwRwy5NRcnEAxTgCYLX4Cv2zJYCGhi6T0EpwvyZZ3ZDIO/EKTKP4C2soLlcA/kkZ7OVg7ydzbjq9+AuqKE6tePJhVH0xd4bfJ/JMZMA0AnAVwbtQLItJj7fLiY1YqtNr4iteheCXDG/hQ5ODK/sUAQbYnbMfaj/jfgO9HThp2NK8yIESN1GsA26L8PRBDvW2WFFYCuD27kES3o1M6HBqwArZZOVsa/uhn8H8OnB8JHdWTTKspQAFxq7YTSynUDwK0yZVZUuTkUy2Q/AWVH0dWGKUIQHsNb8mY8xxUgEGQPJPo3+KVZFHo9FrppNdL4H1uaifVmBUgR/nYKTHDm8rgEMhnTI8e0CFVyLbsEIO25EZW60+2oqsQQQ/prU7ztrh1ZxSmbIh8E4szdsARsnlKuOOVxErJ6S+DkLPoei+U6argNtefrXCJdpsM2ACsXy6QIq9gTykx4Ko8Gxzzuyx5EoQXBWeeqx9ToIrqCMBCkiSfQTM/UjvGhr8a3FOxF4AlQmhTRB81/BxcHEsgEPPR0iTXSk5c/PqU2ISAI4FKB/ujPQl+FrecvODqOVEEmNaApJwzMi8IGAhAwsZmHYG8JfujvHFM6NFmM5WPDXQdnzx9OMAajS+eqfOO7KknQEORXCCelZgz1ffB24cQPU09PuDo2gWIEfHsYWfYTJOQNYvQES5iRkTaI5S9zMSYNJLZVGARG9X43QF/APFhQCKYhR2XAAAAABJRU5ErkJggg==);
                }

                .icon-sort{
                    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAR5JREFUWAnt1b8PwUAUB/Dvaxj8+DeszDZi8gd0ZPFHMHbBf4H9BhL/gsRiISHxFxgtxOa5q5Boi5P07haXdOjr9d7nXV9bwg+D/TKr6SQ2lHTb4zpQyJNYXpLmRGNeNJDO+XnOfjWns5YhABqAHsIQgA6yei2EIUC2LjtFC2EEQGK1B/QQRgCq+XQRxgC6CKMAHYRxwDeEFcAnhDVAIoIuXauAFwTRCFwaZFTQ9ri/ougAa1jfgWixf8B/Bzz2a0X2Kz0OAie7IZMeBcBDbKcTFwhVdV8eJ4loYTcb20Z4JNYL+fduhgi+tm0jwufuEvFsPFeIJ0B9Il0gXgAuEDGAbUQi4B1CxdMebwEqUawn0s4u1/sIiCFcACKI1Ak3lh60b0M7h04AAAAASUVORK5CYII=);
                }
            }
        }
    }

    .popup{
        position: absolute;
        left:0;
        width: 100%;
        z-index:101;

        .ay-popup-dialog{
            top:88px;
            bottom: auto;
            background-color: #fff;
        }

        .ay-popup-mask.ay-popup-show {
            transition: opacity 0.3s;
        }

        .ay-popup-enter {
            transform: translate3d(0, -100%, 0);
        }

        .ay-popup-leave {
            transform: translate3d(0, -100%, 0);
        }

        .ay-tap-active:active{
            background-color: #fff;
        }
    }
    .check-list{
        position: relative;
        display: block;
        width: 100%;
        box-sizing: border-box;
        padding: 0 20px;

        &.checked{
            color:#FF5523;
        }

        p{
            position: relative;
            width: 100%;
            line-height: 60px;
            font-size: 17px;
            color: #000;
            text-align: left;
            &:after{
                content: " ";
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 1px;
                border-bottom: 1px solid #D9D9D9;
                color: #D9D9D9;
                -webkit-transform-origin: 0 100%;
                transform-origin: 0 100%;
                -webkit-transform: scaleY(0.5);
                transform: scaleY(0.5);
            }
            &:active{
                color: #555;
            }
        }

        i{
            position: absolute;
            top:0;
            right: 10px;
            display: block;
            width: (24rem/20);
            height: 60px;
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAVCAYAAABVAo5cAAAAAXNSR0IArs4c6QAAAWBJREFUSA1jYKAD+B+pI/6/oYEJZBWYoJWdIEv+h6rMYfjz/QXD1cUH////z8hIS8sYri5ZwMDwPxZhB4cwTXwIDj50yxiZJjOuvvqO6j7EbhnDTIaVdzIZGRn/U9VCQpaBgpZqFhJjGdUsJNYyqlhIimUgC8Gp9H+aMev/UG0ekAApgFTLQGYDM6aaNMP7Dw8ZGH6++R+mEkOsheRYBraQgeGfJZAhCcyg7EC88H+4chwhS8m1DGKhIP82YGK9ALbkPzCI/zPMx2cpJZaB7ABnC2D8CQGDdC/QhwZgixkZ/gFlEhlX3l0E5kMJSi0DGQPPh4QspYZlKBaCOLgsZdCMXYJREDMiiiuQXmIB3IcwDVgt/c9wFChvC1MDDBd42QgXI5KBYSFIH4alyIZRYBnIGKwWgiSwWkqhZSBzcdaHoLqLgYHdGeimUyCFDMD6DFbFgPm0IkDNgv9RuoLUMh8AK5vcql2+sAsAAAAASUVORK5CYII=);
            background-position: center;
            background-repeat: no-repeat;
            background-size: (12rem/20);
        }

    }

    .list-cell{
        position: relative;
        &:after{
            content: " ";
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 1px;
            border-bottom: 1px solid #D9D9D9;
            color: #D9D9D9;
            -webkit-transform-origin: 0 100%;
            transform-origin: 0 100%;
            -webkit-transform: scaleY(0.5);
            transform: scaleY(0.5);
        }
        .list-title{
            position: relative;
            p{
                padding-right: 25px;/*0210*/
                width: 100%;
                line-height: 60px;
                font-size: 17px;
                color: #000;
                text-align: left;
                box-sizing: border-box;/*0210*/
            }
            .icon-arrdown{
                position: absolute;
                top:0;
                right: 10px;
                display: block;
                width: 13px;
                height: 60px;
                background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAPCAYAAAD6Ud/mAAAAAXNSR0IArs4c6QAAASpJREFUOBGtlD0OgkAQhV1s0NpSjTHegAsYW1tDrbegpOQkFhQ2WprIBWipjI3WloZG8T3CErKCLOgky87sDu/bf9GBOY4zRbUwTXPnuu6dbb8adAZxHK+gc/Q87yx83++GYXhBw1gIcUU9Rwfj1oaBz5IkOUFgiHKzLGtiFNXQOUIcZDMsdmn7CqSDwT+jKEoM27afCDYoD6r9AiuBUHONZXwJOVQkLeDvAeqzDeBGy1gBWWIbglSPH2ltYXUQ6uczagvTgZSC2Kg7M11IJUgH1gTyFSRhOBwH+L00OTsg8A20y3vCg8PTlW88c1X72CM1gcuowhDzP15GLUiax0+dqTCZrzOTPFc6dbUKawKhdu3SFQdAGOItCp8uW17GYs7ffD7C2R410nwDf9zPVdvfkrsAAAAASUVORK5CYII=);
                background-position: center;
                background-repeat: no-repeat;
                background-size:100%;

                &.active{
                     transform:rotate(180deg);
                     -webkit-transform:rotate(180deg);
                 }
            }
        }
        .list-detail{
            font-size: 14px;
            line-height: 21px;
            text-align: justify;

        }
        .clicksee{
            text-align: right;
            line-height: 40px;
            a{
                display: inline-block;
                line-height: 22px;
                color: #41B3EE;
                font-size: 12px;
            }
        }
    }
    .btn-pull{
        display: block;
        font-size: 14px;
        color: #FF5523;
        width: auto;/*0210*/
        line-height: 44px;
        vertical-align: middle;
        &:after{
            content: "";
            display: inline-block;
            width: 0;
            height: 0;
            margin-left: 2px;
            vertical-align: middle;
            border-top: 6px solid;
            border-right: 5px solid transparent;
            border-left: 5px solid transparent;
        }
    }
    .btn-switch{
        display: inline-block;
        position: relative;
        top: 7px;
        width: 75px;
        height: 30px;
        box-sizing: border-box;
        font-size: 14px;
        color:#41B3EE ;
        line-height: 28px;
        text-align: center;
        vertical-align: middle;
        border: 1px solid #DFDFDF;
        border-radius: 100px;
    }
</style>
<script>
    import store from '../../vuex/store'/*0228 F*/
    const commit = store.commit || store.dispatch /*0228 F*/
    import {ViewBox,XHeader,Loading,Cell,Tabbar,Group, TabbarItem,Headerbar,Popup,Checker, CheckerItem} from '../../components'
    export default{
        components: {
            // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
            // 否则挂载点和组件名字一致, 即vhead
            ViewBox,
            XHeader,
            Loading,
            Cell,
            Tabbar,
            Group,
            TabbarItem,
            Headerbar,
            Popup,
            Checker,
            CheckerItem
        },
        data(){
            return {
                MaterialList:[],
                PersonTypeList:[],
                sortPopup:false,
                isRadioChecked:1,
                sortTitle:"",
                isflag:false,
                btnText:"全部展开"
            }
        },
        methods:{
            tackData:function () {
            //     this.$http.get('/static/visa_detail.json').then((response) => {
            //         // success callback
            //         //debugger
            //         var data = response.data
            //         this.PersonTypeList = data.PersonTypeList
            //         this.MaterialList = this.PersonTypeList[this.isRadioChecked-1].MaterialList
            //         this.sortTitle = this.PersonTypeList[this.isRadioChecked-1].PersonTypeName
            // },(response) =>{
            //         // error callback
            //     }

            // )
                var personTypeList=window.sessionStorage.getItem("personTypeList");
                if(personTypeList!=null&&personTypeList.length>0)
                {
                    personTypeList=JSON.parse(personTypeList)
                    for(var i=0,len=personTypeList.length;i<len;i++)
                    {
                        for(var j=0;j<personTypeList[i].MaterialList.length;j++)
                        {
                            personTypeList[i].MaterialList[j].IsShow=false
                        }
                        this.PersonTypeList.push(personTypeList[i])
                    }
                    this.MaterialList = this.PersonTypeList[this.isRadioChecked-1].MaterialList
                    this.sortTitle = this.PersonTypeList[this.isRadioChecked-1].PersonTypeName
                    console.log({"title":"personTypeList","data":personTypeList})
                }
                commit('UPDATE_LOADING',false)/*0228 F*/
            },
            changeCheck:function(i){
                this.isRadioChecked = i
                this.sortPopup = false
                this.MaterialList = this.PersonTypeList[this.isRadioChecked-1].MaterialList
                this.sortTitle = this.PersonTypeList[this.isRadioChecked-1].PersonTypeName
                this.btnText ="全部展开"
                this.isflag=false
            },
            showAll:function(){
                this.isflag = !this.isflag
                for(var n =0; n <this.MaterialList.length; n++){
                    if(this.isflag){
                        this.btnText ="全部收起"
                        this.MaterialList[n].IsShow  = true
                    }else{
                        this.btnText ="全部展开"
                        this.MaterialList[n].IsShow  = false
                    }
                }
            },/*0215F*/
            showCurrent:function(item){
                item.IsShow = !item.IsShow
            },
            //返回顶部 START
            scrollTop () {
                this.$refs.viewBox.$els.viewBoxBody.scrollTop = 0
            }
        },
        created(){
            commit('UPDATE_LOADING',true)/*0228 F*/
            this.tackData()
        }
    }
</script>
