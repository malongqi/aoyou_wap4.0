<template>
    <div class="page-wrap">
        <div class="page fix-detail">
            <view-box>
                <div class="ay-header-box whitetheme" slot="header">
                    <div class="header-cover" :style="{opacity:isOpacity}"></div>
                    <headerbar>
                        <span slot="left" class="icons icon-arrow" @click="back()"></span>
                        <div class="departciry">
                            <span class="citys" @click="" :style="{opacity:isOpacity}">精选游记</span>
                        </div>
                    </headerbar>
                </div>
                <div class="page-inner" @touchstart = "outInput">
                    <section class="ay-section">
                        <div class="note-writer bor-1x">
                            <div class="rector" v-link="showMclick==1?{path:'travaler',query:{'bid':bid,'uid':topic.user_id}}:''">
                            <span class="referee-img">
                                <img :src='topic.icon!=null?topic.icon+"?imageView2/1/w/30/h/30/q/90":""'>
                            </span>
                                <span class="referee-label">
                                <p class="name">{{topic.user_nick_name}}</p>
                            </span>
                            </div>
                            
                        </div>
                        <h3 class="note-title">{{topic.title}}</h3>
                        <div class="summery">
                            <div v-for ="paraItem in topic.content" :class="{'parag':paraItem.type ==0,'imgbox':paraItem.type ==1}">
                                <p v-if="paraItem.type ==0"  v-html="paraItem.infor|enter"></p>
                                <img v-if="paraItem.type ==1"  :src="paraItem.infor+'?imageView2/1/w/335/h/230/q/90'">
                            </div>
                        </div>
                        <div class="block align-right">
                            <span v-if="topic.hits<=100000"><i class="icon-see"></i><em>{{topic.hits}}</em></span>
                            <span  v-if="topic.hits>100000"><i class="icon-see"></i><em>10w+</em></span>
                        </div>
                    </section>
                    <section class="ay-section">
                        <div class="message" v-for="messItem in Message">
                            <div class="note-writer">
                                <div class="rector">
                            <span class="referee-img">
                                <img :src="messItem.icon+'?imageView2/1/w/30/h/30/q/90'">
                            </span>
                                    <span class="referee-label">
                                <p class="name">{{messItem.reply_name}}</p>
                                <p>{{messItem.Adress}} <span>{{messItem.Time}}</span></p>
                            </span>
                                </div>
                            </div>
                            <div class="padl40">
                                <div v-for ="messItem in messItem.reply_content" :class="{'parag':messItem.type ==0,'imgbox':messItem.type ==1}">
                                    <p v-if="messItem.type ==0"  v-html="messItem.infor"></p>
                                    <img v-if="messItem.type ==1?messItem.infor!='':false"  :src="messItem.infor+'?imageView2/1/w/335/h/230/q/90'">
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <tabbar slot="bottom">
                    <div class="commentsbox" :class="{'active':showSendBtn}">
                        <div class="formbox">
                            <a @click="">

                                <i class="icon-write"></i>
                                <span class="closebtn" v-if="showCloseBtn" @click="clearInput"><i class="icon-close-small"  ></i></span>
                                {{key}}

                                <textarea rows="1" placeholder="用评论增添一笔精彩" type="text" v-on:focus="checkLogin()" v-on:blur="outInput()"   v-on:keydown="submitComment()" v-model="commentStr" v-el:ayinput ></textarea>

                            </a>
                            <div class="rightbar" v-if='!showSendBtn'>
                                <span class="btn" :class="{'active':isPulse}" @click= "pulseFun"><i class="icon-zan animated" :class="{'bounceIn':isPulse}"></i><em>{{topic.recommendAdd}}</em></span>
                                <span class="btn ml20" @click="share()" v-if="showShare"><i class="icon-share"></i><em></em></span>
                            </div>
                            <div class="btnbox" v-if='showSendBtn'>
                                <span class="sendbtn" @click="submitMassage()">发送</span>
                            </div>
                        </div>
                    </div>
                </tabbar>
            </view-box>
            <toast class="tips" :show.sync="showTip" type="text" width="100%" :time="5000">{{massage}}</toast>
        </div>
    </div>
</template>
<style scoped>
    .ay-section {
        background: #fff;
        padding: 0 20px;
        margin-bottom: 10px;
    }
    
    .ay_tab_bd {
        padding-bottom: 50px !important;
    }
    
    .ay-section:last-child {
        margin-bottom: 0;
    }
</style>
<style lang="less">
    @import '../../styles/index.less';
    @import '../../styles/ayui/base/reset.less';
    .bor-1x{
        position: relative;
        &::after{
            content: " ";
            position: absolute;
            left: 0;
            width: 100%;
            height: 1px;
            color: #d9d9d9;
            bottom: 0;
            border-top: 1px solid #dfdfdf;
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
            -webkit-transform: scaleY(.5);
            transform: scaleY(.5);
        }
    }
    .page-wrap {
        box-sizing: border-box;
        background: #fff;
        -webkit-overflow-scrolling: touch;
        height: 100%;
        overflow: hidden;
    }
    .xs-container{
        -webkit-overflow-scrolling: touch;
    }
    .pages .page.fix-detail .ay_tab_bd {
        padding: 44px 0 50px;
    }
    
    .tips {
        .ay_toast {
            margin-top: 0;
            background: rgba(255, 171, 10, 0.9);
            top: 44px;
            left: 50%;
            margin-left: -3.8em;
            font-size: 14px;
            text-align: left;
            border-radius: 0;
            -webkit-font-smoothing: antialiased;
        }
        .ay_toast_text .ay_toast_content {
            padding: 10px 20px;
        }
    }
    
    .page-inner {
        color: #333333;
    }
    
    .ay-section:last-child {
        margin-bottom: 0;
    }
    
    .block {
        height: 60px;
        line-height: 60px;
        em {
            font-size: 12px;
            color: #999999;
            font-weight: normal;
        }
    }
    
    .align-right {
        text-align: right;
    }
    
    .note-writer {
        height: 60px;
        display: -webkit-flex;
        display: flex;
        align-items: center;
        color: #999999;
        font-size: 12px;
        overflow: hidden;
        .rector {
            display: flex;
            align-items: center;
        }
        .rec-img {
            img {
                width: 100%;
                border-radius: 6px;
                display: block;
            }
        }
        .rec-center {
            .title {
                padding-top: 0;
            }
        }
        .referee-img {
            display: block;
            width: (30rem/20);/*0228 F*/
            height: (30rem/20);/*0228 F*/
            border-radius: 50%;/*0228 F*/
            overflow: hidden;/*0228 F*/
            img {
                display: block;
                width: (30rem/20);/*0228 F*/
                height: (30rem/20);/*0228 F*/
                border-radius: 50%;
                overflow: hidden;
            }
        }
        .referee-label {
            margin-top: 2px;
            color: #999999;
            font-size: 12px;
            line-height: 1;
            margin-left: (10rem/20);/*0228 F*/;
            .name {
                color: #333333;
                margin-bottom: 3px;
            }
        }
    }
    
    .note-title {
        padding: 15px 0 0;
        margin-bottom: 10px;
        line-height: 1.2;
        font-size: 19px;
        font-weight: normal;
        font-weight: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }
    
    .summery {
        text-align: justify;
        padding-top: 20px;
        font-size: 16px;
        -webkit-font-smoothing: antialiased;
        line-height: 27px;
        word-break: break-all;
        .parag {
            margin-top: 20px;
        }
        .imgbox {
            margin-top: 20px;
        }
        img {
            display: block;
            width: 100%;
        }
    }
    
    .message:last-child {
        margin-bottom: 0;
        &:after {
            border-bottom: 0;
        }
    }
    
    .message {
        position: relative;
        text-align: justify;
        font-size: 16px;
        -webkit-font-smoothing: antialiased;
        line-height: 27px;
        padding-bottom: 15px;
        margin-bottom: 15px;
        word-break: break-word;
        &:after {
            content: " ";
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 1px;
            border-bottom: 1px solid #D9D9D9;
            color: #D9D9D9;
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
            -webkit-transform: scaleY(.5);
            transform: scaleY(.5);
        }
        .imgbox {
            img {
                width: 100%;
                display: block;
            }
        }
    }
    
    .description {
        line-height: 27px;
        .title {
            margin-top: 20px;
            font-size: 16px;
            font-weight: normal;
        }
        img {
            margin: 20px 0;
            display: block;
            width: 100%;
            margin: 20px 0;
        }
    }
    
    .padl40 {
        padding-left: 40px;
    }
    
    .active {}
    
    .commentsbox {
        width: 100%;
        box-sizing: border-box;
        height: 50px;
        border-top: 1px solid #D9D9D9;
        background-color: #fff;
        .formbox {
            padding: 10px 20px;
            box-sizing: border-box;
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            box-sizing: border-box;
            a {
                display: block;
                -webkit-box-flex: 1;
                -ms-flex: 1;
                flex: 1;
                background-color: #fff;
                border-radius: 100px;
                position: relative;
                box-sizing: border-box;
                padding: 0 30px 0 35px;
                height: 30px;
                line-height: 0;
                font-size: 17px;
                color: #999;
                border: 1px solid #DFDFDF;
                text-align: left;
                -webkit-font-smoothing: antialiased;
            }
            textarea{
                box-sizing: border-box;
                width: 100%;
                padding: 5px 0;
                height: 100%;
                line-height: 20px;
                background: transparent;
                border: 0;
                font-size: 12px;
                white-space: nowrap;
                outline: none;
                resize:none;
                overflow: hidden;
                -webkit-user-modify: read-write-plaintext-only;
            }
            input {
                box-sizing: border-box;
                width: 100%;
                line-height: 20px;
                height: 100%;
                background: transparent;
                border: 0;
                font-size: 12px;
                -webkit-user-modify: read-write-plaintext-only;
            }
            .icon-close-small {
                margin-right: 10px;
                margin-top: 8px;
            }
            .closebtn {
                height: 30px;
                width: 30px;
                position: absolute;
                right: 0;
                z-index: 2;
            }
        }
        .rightbar {
            box-sizing: border-box;
            padding-left: 20px;
            font-size: 12px;
            color: #999999;
            line-height: 30px;
            font-weight: normal;
            .btn{
                min-width: 30px;
                height: 30px;
                display: inline-block;
                vertical-align: middle;
            }
            .ml20{
                margin-left: 20px;
            }
        }
        .btnbox {
            box-sizing: border-box;
            padding-left: 15px;
            font-size: 12px;
            color: #999999;
            line-height: 30px;
            font-weight: normal;
            .sendbtn {
                display: inline-block;
                width: 45px;
                height: 28px;
                line-height: 28px;
                background: #FFFFFF;
                border: 1px solid #DFDFDF;
                border-radius: 100px;
                text-align: center;
            }
        }
        .icon-write {
            position: absolute;
            left: 10px;
            top: 5px;
            &:before {
                content: "";
                width: 1em;
                height: 1em;
                line-height: 1em;
                background-repeat: no-repeat;
                background-size: 100%;
                display: inline-block;
                vertical-align: middle;
                background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAA0ZJREFUSA29VldLa0EQ/mLBjmJXMBYsiGAKQUVs2H1R0Cd/pAqK2B8STcCnhNh9UeyIxt7Lvfcb3cM9JuYmmutA2HP27M63M/N9szH8+mP4QYuJNNbr6yu8Xi9OTk5QUVGBgoICHYQhkhE+PDxgenoa+/v7AmIwGNDd3Y3CwkINNEp7+ubDxcUFRkZGBCwpKQlVVVVgtWZnZ3F6eqp5jwggIxoeHsb5+TmysrLQ39+PxsZGlJeX4+npCRMTE7i7uxPQb6d0dXUVCwsLYO1KSkrQ2tqKmJg3anBubGwMh4eHyMnJQV9fH74MyHS5XC4sLS3Jya1WK2pqarTUqYf7+3uJ/vLyEk1NTfgSS5mmmZkZ7OzsIDo6Gi0tLSgrK1MYupEHi4uLkzmSKmzAq6srqYnP50NCQgK6urqQm5urA1EvJAvrd319jdTUVFRWVoYHeHR0hKmpKSFAeno6enp6kJKSovzrxu3tbczNzQlp8vLy5GDx8fGhA25ubsJut+Pl5UV01d7ejtjYWB2IevF4PFhcXBRZUPzNzc2IinoTREgp5Wa32y3+qqurUV9fr3zrRrKSh9rY2ABFX1dXB7PZrFsTFPD5+VnSsrW1JeRoaGiQOug8vL+QjUw3JcDI29raUFRU5Lf0U8CbmxsMDQ3h9vYWzH1nZyfy8/P9HHDi7OxMyEHqJycnS20zMjICrg0IeHx8jPHxcSk4ad/R0fEp2O7urkjk8fFRxM3eSfZ+Zn6t7eDgAKOjo6BmGBl15HQ6QYcfbXl5WSLjt9LSUvT29gYF434/wPX1dbB27IODg4PIzMyUHkmhE5zGcX5+XmtpNpsNZC2z8S/zA9zb25M9bFUsPoWdmJgot4CKlOleWVmRnsl0EzBU09WQnYEkYeHT0tLEB68agrIJr62tSTsjOXgI1is7OztULFmni5AEoH28pXnlmEwmiYhgTPPAwEDYYPSti1ABEkBFy4h5z/FvA7tMcXGxaExdQXQSjmmAJAp7Jc3hcAT0YbFYUFtbG/BbqJMaIOXACNiSKAfW6O8fL9BAnSNUILVOu4DZmghI0apGqxZFctQAI+k0mC9J6eTkpNA92MKvfjMajSIftV8nCzX5P8cfT+lv3RuPAzlD+EgAAAAASUVORK5CYII=');
            }
        }
        .icon-share {
            float: right;
            margin-top: 6px;
            display: inline-block;
            width: 15px;
            height: 15px;
            margin-right: 5px;
            vertical-align: -2px;
            background-size: contain;
            background-repeat: no-repeat;
            background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAfCAYAAADwbH0HAAAAAXNSR0IArs4c6QAAA21JREFUSA21lktIlFEUx51RZkaG0InoQYK1qE1Q1KKVFUlFRQi2MBLDEHWoCOlhRWCF0KKwQsvAx2BDTYiUvaBaJIUUBEEPa9ciCnqBLowkzHn0+3/MB6PM4/vG6cKZc+459/z/98x9fXl5OW5dXV2LrEA6rQyyOgbSQw6H4yN6Y6acnBFDdgSyi7FYzIt+2NPTU56O3KEgg5ZGo9E2zPXIPPlSNSra1djYOJAYJ7+Z/PPE4I0ZmMT/0K9g7JPEsabt7OvrW0LSGxw7kbSk8aS5ZrI0lZ4QKWYUGZIPwheoQuQB8S3yzWwFU1NT53AWMfge4m9oaPg5c1CqPpWehPQscZHWUW2ZxqKvoUbQ+4Tb29tbWV9f/1gxszkJ6u/Nc7vdB+yQUkmLSQr4Xr/fH0TPjwOP0t9P/wr4nkgkcpdJbjdJpbW5Fsqora39Km2lQXqGca0AR9B7WMfr8TzjKOXn539TH/9BVAfiZgJ3uru7d8ivZntXQ9pK3uk4aQ2V3TSQ+AG8RDbaIJZNvImxl/C56N6GvEJ+W8QkbSOnBQkj1VTUjzZaKBTyYaji36zntH+PcYfxXxA5cgucDbaIAXjE7NucTudu7GlHamJiYqVmQPwDEpOd2Kj8KH4duReQvypIDFqxIWxONg7AtQAq9DZZXD5yjw8MDLiqqqr+2qo4FaD87PBN0kzgmXSqJlLFckIcCATmgLUOibpcrqQ3lcgSW06Iw+FwLaCFVDvMsRxLJEhlz5qYdYXPofOqY9Seimimf9bE3EhbIVwO+Sc2z/2ZBKn6syaG1Njl6MuQ685O2rh4qpnkZjNo+ziZidJcBE0Q6tEf83q9gcRYEjvEzpfbeDazrpgK1gCi51BHqK6mpuaXbKstK2Le8GII+qnWBWm7nbU1J2abmHUq4Q1/DsAy5HVxcfExE8yOtkWsN5V1ekmlKyB57/F4KsybyA6pxlraXKxnGX+pvquMJ428p0gll8W4QLJpGYmpshzCIaoUvohO+Xy+TirVR0DWLSMxpCOgf0Fu8Bx22Pk8SjerjMS8o6MAlKYDySamzfVDicFgcHE2AFZyErC/m+OdbJphdSYnJztZzwVmIFdamGBfjeMZXLIdfPOW8vn5DrsoHvxfapyvz1V8j30WgVMGm2Y19iCi9cx1E+agOExSEfwDxuJgDdszrU0AAAAASUVORK5CYII=');
        }
        .active {
            color: #FF5523;
        }
    }
    
    .icon-close-small {
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-right: 5px;
        vertical-align: 0;
        background-size: contain;
        background-repeat: no-repeat;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAW5JREFUSA2tlrGOgkAQhge04DGoIIRAQQMWJjzavRoVUGE0QPQN6CxIbEi8+8kNAdxzl/Um0V13Zr+PzU6IRlVVz/P5TK7rUhzH9B9RliVdr1cKw5B2x+Px6/F4UNd11Pc92bb9kSPLMqrrmoZhoPv9TqbneRMQVhToBvaCwQG2GUURBUHAa2OBjmQNBxNsE+TD4fCRRAQHEzEKMNGVvIMvBDoSGfxFsEWiAhcKVCSqcLD2+BIFX9LlchnT8/abz9EtXCviGM+fECV4Lc9zYgmv8SiDo27qIt60HtfdxXkVOGqlAhQZhoFhEaK1RcHvD6mgKArCy3AdWENOFm8Fa7jjOIQPh4rkzy4SwdM0ZTbdbrdxzqdLkmTKzSfCE8jgEKme5EUgg/PTqUoWAlX4Fskk2ApXlYwCXbiKZH86nRZ9jsubdwtDZCPvmXeXZVlkNk0z7dWFM2B98W3bkun7PsGEvxj8FLxBZwQDLDDB/gZWDvxiU5SqSQAAAABJRU5ErkJggg==")
    }
    
    .commentsbox.active {
        background-color: #F5F5F5;
    }
    
    .animated {
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        &.bounceIn {
            -webkit-animation-duration: .75s;
            animation-duration: .75s;
        }
    }
    
    .bounceIn {
        -webkit-animation-name: bounceIn;
        animation-name: bounceIn;
    }
    
    @-webkit-keyframes bounceIn {
        from,
        20%,
        40%,
        60%,
        80%,
        to {
            -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
            animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
        }
        0% {
            opacity: 0;
            -webkit-transform: scale3d(.3, .3, .3);
            transform: scale3d(.3, .3, .3);
        }
        20% {
            -webkit-transform: scale3d(1.1, 1.1, 1.1);
            transform: scale3d(1.1, 1.1, 1.1);
        }
        40% {
            -webkit-transform: scale3d(.9, .9, .9);
            transform: scale3d(.9, .9, .9);
        }
        60% {
            opacity: 1;
            -webkit-transform: scale3d(1.03, 1.03, 1.03);
            transform: scale3d(1.03, 1.03, 1.03);
        }
        80% {
            -webkit-transform: scale3d(.97, .97, .97);
            transform: scale3d(.97, .97, .97);
        }
        to {
            opacity: 1;
            -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
        }
    }
    
    @keyframes bounceIn {
        from,
        20%,
        40%,
        60%,
        80%,
        to {
            -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
            animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
        }
        0% {
            opacity: 0;
            -webkit-transform: scale3d(.3, .3, .3);
            transform: scale3d(.3, .3, .3);
        }
        20% {
            -webkit-transform: scale3d(1.1, 1.1, 1.1);
            transform: scale3d(1.1, 1.1, 1.1);
        }
        40% {
            -webkit-transform: scale3d(.9, .9, .9);
            transform: scale3d(.9, .9, .9);
        }
        60% {
            opacity: 1;
            -webkit-transform: scale3d(1.03, 1.03, 1.03);
            transform: scale3d(1.03, 1.03, 1.03);
        }
        80% {
            -webkit-transform: scale3d(.97, .97, .97);
            transform: scale3d(.97, .97, .97);
        }
        to {
            opacity: 1;
            -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
        }
    }
    
    .bounceIn {
        -webkit-animation-name: bounceIn;
        animation-name: bounceIn;
    }
</style>
<script>
    import store from '../../vuex/store'
    const commit = store.commit || store.dispatch
    import {
        ViewBox,
        Cell,
        Tabbar,
        TabbarItem,
        Headerbar,
        Toast
    } from '../../components'
    export default {
        components: {
            // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
            // 否则挂载点和组件名字一致, 即vhead
            ViewBox,
            Cell,
            Tabbar,
            TabbarItem,
            Headerbar,
            Toast
        },
        data: function() {
            return {
                bid: '0',
                tid: '0',
                pageNo: 1,
                pageSize: 20,
                has_next: 1,
                commentStr: '',
                memberId: '',
                topic: [],
                Message: [],
                isPulse: false,
                apptitle: '分享标题',
                appdesc: '分享描述',
                applink: '跳转地址',
                appimgUrl: '图片地址',
                jsonParam: [],
                showSendBtn: false,
                showCloseBtn: false,
                showTip: false,
                massage: '',
                showMclick: 0,
                showShare:api.showShare,
                shareTitle:"",
                shareSubTitle:"",
                shareImg:"",
            }
        },
        methods: {
            tackData: function() {
                var vm = this
                var useCache = false
                var useProxy = true
//                vm.pageNo++
                    var detailParam = {
                        "fid": vm.bid,
                        "topicId": vm.tid,
                        "pageNo":vm.pageNo,
                        "pageSize": vm.pageSize
                    }
                api.post({
                    path: api.config.microServiceHost.findurl,
                    controller: 'Precious',
                    action: 'GetPostList',
                    param: JSON.stringify(detailParam),
                    useCache: useCache,
                    useProxy: useProxy,
                    callback: function(obj) {
                        if (obj.ReturnCode == 0) {
                            var data = obj.Data;
			                this.bid = data.boardId;
                            //获取游记头图
                            var imgArr=[]
                            if(data.topic!=null) {
                                vm.topic = data.topic
                                for (var i = 0; i < data.topic.content.length; i++) {
                                    if (data.topic.content[i].type == 1) {
                                        imgArr.push(data.topic.content[i].infor)
                                        break;
                                    }
                                }
                                vm.shareTitle = "遨游旅行家" + vm.topic.user_nick_name + "：" + vm.topic.title
                            }
                            vm.shareSubTitle="遨游旅行家，发现精彩旅行"
                            vm.shareImg=imgArr[0]
                            vm.initShareDialog()
                            vm.Message = data.list
			                 commit('UPDATE_LOADING',false)
                        }
                    }
                })
                vm.memberId = api.getMemberId();
                // vm.memberId = "6MKXfkLf9cgQGSlt8TwkCQ==";
                if (vm.memberId != '' && vm.memberId != null && vm.memberId != 0) {

                    var SupportParam = {
                        "tid": vm.tid,
                        "aoyouId": vm.memberId
                    }

                    api.post({
                        path: api.config.microServiceHost.findurl,
                        controller: 'Precious',
                        action: 'GetSupportStatus',
                        param: JSON.stringify(SupportParam),
                        useCache: useCache,
                        useProxy: useProxy,
                        callback: function(obj) {
                            if (obj.ReturnCode == 0) {
                                var data = obj.Data;
                                if (true == data) {
                                    vm.isPulse = true;
                                    this.isPulse=vm.isPulse 
                                }

                            }
                        }
                    })
                }

            },
            pulseFun: function() {
                this.memberId = api.getMemberId()
                if (typeof(memberid) == 'undefined' && this.memberId == '' || this.memberId == null || this.memberId == 0) {
                    api.toLogin(encodeURIComponent(location.href), encodeURIComponent(location.href), "stay")
                    return false
                    // var loginUrl = "http://mpass.aoyou.com?from=" + encodeURIComponent(location.href) + "&forward=" + encodeURIComponent(location.href);
                    // window.location.replace(loginUrl);
                } else if (!this.isPulse) {
                    var vm = this
                    var supportParam = {
                        "aoyouid": vm.memberId,
                        "tid": vm.tid,
                        //"pid":vm.topic.reply_posts_id,
                        "action": "support"
                    }
                    api.post({
                        path: api.config.microServiceHost.findurl,
                        controller: 'Precious',
                        action: 'PostSupport',
                        param: JSON.stringify(supportParam),
                        useCache: false,
                        useProxy: true,
                        callback: function(obj) {
                            if (obj.ReturnCode == 0) {
                                var data = obj.Data                                
                                if (false != data) {
                                    vm.showTip = true
                                    vm.massage = obj.Message
                                    vm.isPulse = true;
                                    vm.topic.recommendAdd += 1;
                                    
                                } else {
                                    vm.massage = '一个用户只能点赞一次！';
                                    vm.showTip = true;
                                     vm.isPulse = true;
                                }
                            } else {
                                alert('点赞失败')
                                 vm.isPulse = true;
                            }
                        }
                    })

                }

            },
            shareFun: function() {
                var vm = this;
                var jsonParam = {
                    "title": vm.apptitle,
                    "content": vm.appcontent,
                    "linkUrl": vm.applinkUrl,
                    "picUrl": vm.apppicUrl,
                    otherJson: {}
                }
                if (window.webkit != null && window.webkit != undefined) {

                    window.webkit.messageHandlers.invokeAYShare.postMessage(jsonParam);
                }
                if (window.action != null && window.action != undefined) {
                    window.action.invokeAYShare(JSON.stringify(jsonParam));
                }
            },
            back: function() {
                api.pageBack()
            },
            submitMassage: function() {
                this.send()

            },

            send: function() {
                this.memberId = api.getMemberId()

                if (this.memberId == '' || this.memberId == null || this.memberId == 0) {
                    api.toLogin(encodeURIComponent(location.href), encodeURIComponent(location.href), "stay")
                    return false
                    // var loginUrl = "http://mpass.aoyou.com?from=" + encodeURIComponent(location.href) + "&forward=" + encodeURIComponent(location.href);
                    // window.location.replace(loginUrl);
                } else {
                    var vm = this
                    if (vm.commentStr.length == 0) {
                        vm.showTip = true
                        
                        vm.massage = '请填写评论内容'
                        return false
                    } else if (vm.commentStr.length < 20) {
                        vm.showTip = true
                        vm.massage = '评论内容请大于20个字'
                        return false
                    }
                    var useCache = false
                    var useProxy = true
                    var replyParam = {
                        "tid": vm.tid,
                        "fid": vm.bid,
                        "message": vm.commentStr,
                        "platType": 0,
                        "memberId": vm.memberId
                    }
                    api.post({
                        path: api.config.microServiceHost.findurl,
                        controller: 'Precious',
                        action: 'ReplyThread',
                        param: JSON.stringify(replyParam),
                        useCache: useCache,
                        useProxy: useProxy,
                        callback: function(obj) {
                            if (obj.ReturnCode == 0) {
                                var data = obj.Data;
                                if (data.rs == 1) {
                                    vm.commentStr = ''
                                    window.location.reload();
                                } else {
                                    vm.showTip = true
                                    vm.massage = data.head.errInfo
                                }

                            } else {
                                vm.showTip = true
                                vm.massage = '发送失败... 换根手指再试一次！'
                            }
                        }
                    })
                }
            },
            submitComment: function() {
                if (event && event.keyCode == 13) {
                    this.send()
                }
            },
            checkLogin: function() {
                this.showSendBtn = true
                var u = navigator.userAgent, app = navigator.appVersion;
                var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                if (isiOS) {
                    setTimeout(() => {
                     this.scrollBottom()
                    }, 100);
                }
                document.querySelector('.page-wrap').style.transform="translate3d(0px, -10px, 0px)"
                this.memberId = api.getMemberId()
                if (this.memberId == '') {
                    api.toLogin(encodeURIComponent(location.href), encodeURIComponent(location.href), "stay")
                    return false
                    // var loginUrl = "http://mpass.aoyou.com?from=" + encodeURIComponent(location.href) + "&forward=" + encodeURIComponent(location.href);
                    // //api.pageGoTo(loginUrl)
                    // window.location.href = loginUrl;
                }
            },
            outInput: function() {
                var vm = this
                if (vm.commentStr == '') {
                    vm.showSendBtn = false
                } else {
                    vm.showSendBtn = true
                }
                this.$els.ayinput.blur()
                document.querySelector('.page-wrap').style.transform="translate3d(0, 0, 0)"
                // t=setTimeout(function(){
                //     vm.commentStr+='outInput'
                //     if(vm.commentStr ==''){
                //         vm.showSendBtn= false
                //     }else{
                //         vm.showSendBtn= true
                //     }

                //     vm.showCloseBtn= false
                // },100)

            },
            clearInput: function(e) {
                e.stopPropagation()
                this.commentStr = ''
                this.showSendBtn = false
                this.$els.ayinput.focus()
            },
            share:function(){
                api.openShareDialog(this.shareTitle, this.shareSubTitle, window.location.href, this.shareImg, {})
            },
            //wap微信分享
            initShareDialog:function(){
                api.initShareDialog(this.shareTitle,this.shareSubTitle, window.location.href, this.shareImg)
            },
            scrollBottom:function() {
                window.scrollTo(0, $('body').height());
            }
        },
        ready: function() {


            this.showSendBtn = false;
            //  var memberid = api.getCookie("memberid");
            //     if (memberid == undefined || memberid == "") {
            //         api.pageGoTo("http://mpass.aoyou.com?from=" + location.href + "&forward=" + location.href);
            //        }
            //        else
            //        {
            //            this.memberId=memberid;
            //        }
            var t = this.$route.query.t;
            if (t != undefined && t != null && t != "") {
                this.showMclick = 0;
            } else {
                this.showMclick = 1;
            }
        },
        created() {
            commit('UPDATE_LOADING',true)
        },
        watch: {
            'commentStr': function(val, oldVal) {
                this.showCloseBtn = true
                if (val == '') {
                    this.showCloseBtn = false
                    this.showSendBtn = true
                }
            }
        },
        route: {
            data: function(transition) {
                if (transition.to != null && transition.to != undefined) {
                    this.bid = this.$route.query.bid || ''
                    this.tid = this.$route.query.tid || ''
                    this.tackData()
                }
            }
        },
        filters: {
            "enter": function(val) {
                val = val.replace(new RegExp(/\r\n/g), '<br/>')
                return val
            }
        }
    }
</script>