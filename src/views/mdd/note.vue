<template>
    <div class="page">
        <view-box>
            <div class="page-inner">
                <div class="ay-header-box whitetheme">
                    <div class="header-cover" :style="{opacity:isOpacity}"></div>
                    <headerbar class="shade">
                        <span slot="left" class="icons icon-arrow" @click="back()"></span>
                        <div class="departciry">
                            <span class="citys" @click="" :style="{opacity:isOpacity}">精选游记</span>
                        </div>
                        <span slot="right"  class="icons icon-share"></span>
                    </headerbar>
                </div>
                <section class="ay-section">
                    <div class="note-writer">
                        <div class="rector">
                            <span class="referee-img">
                                <img :src="NoteList.AuthorImg+'?imageView2/1/w/30/h/30'">
                            </span>
                            <span class="referee-label">
                                <p class="name">{{NoteList.AuthorName}}</p>
                                <p>{{NoteList.AuthorLabel}}</p>
                            </span>
                        </div>
                    </div>
                    <h3 class="note-title">{{NoteList.Title}}</h3>
                    <p class="summery">{{NoteList.Summary}}</p>
                    <div class="description" v-for="dayitem in Itinerary">
                        <h4 class="title">DAY{{$index}}{{dayitem.Title}}</h4>
                        <p>乘坐阿提哈德航空，媒体系统很强大，电影电视广播应有尽有，没有手机也不会无聊啦~</p>
                        <img src="http://images1.aoyou.com/productlist/201412/0bxnhd08170411.jpg?imageView2/1/w/335/h/180">
                    </div>
                </section>
                <section class="ay-section">
                    <div v-for="messItem in Message">
                        <div class="note-writer">
                            <div class="rector">
                            <span class="referee-img">
                                <img :src="messItem.AuthorImg+'?imageView2/1/w/30/h/30'">
                            </span>
                            <span class="referee-label">
                                <p class="name">{{messItem.AuthorName}}</p>
                                <p>{{messItem.Adress}} <span>{{messItem.Time}}</span></p>
                            </span>
                            </div>
                        </div>
                        <p class="padl40">{{messItem.Note}}</p>
                    </div>
                </section>
            </div>
        </view-box>
    </div>
</template>
<style lang="less">
    @import '../../styles/index.less';
    @import '../../styles/ayui/base/reset.less';
    .page-inner{
        overflow: scroll;
        color: #333333;
    }
    .ay-section{
        padding: 0 20px;
    }
    .note-writer{
        height: 60px;
        display: -webkit-flex;
        display: flex;
        align-items: center;
        color: #999999;
        font-size: 12px;
        overflow: hidden;
        .rector{
            display: flex;
            align-items: center;
        }
        .rec-img{
            img{
                width: 100%;
                border-radius:6px;
                display: block;
            }
        }
        .rec-center{
            .title{
                padding-top: 0;
            }
        }
        .referee-img{
            float: left;
            img{
                width: 30px;
                height: 30px;
                border-radius: 100px;
            }
        }
        .referee-label{
            margin-top: 2px;
            color: #999999;
            font-size: 12px;
            line-height: 1;
            margin-left: 10px;
            float: left;
            .name{
                color: #333333;
                margin-bottom: 3px;
            }
        }
    }
    .note-title{
        padding: 10px 0;
        line-height: 1.1;
        font-weight: normal;
    }
    .summery{
        margin-top: 20px;
        -webkit-font-smoothing: antialiased;
        line-height: 27px;
    }
    .description{
        line-height: 27px;
        .title{
            margin-top: 20px;
            font-size: 16px;
            font-weight: normal;
        }
        img{
            display: block;
            width: 100%;
            margin:20px 0;
        }
    }
    .padl40{
        padding-left: 40px;
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
        return {
            departCity: {},
            NoteList:[],
            Itinerary:[],
            Message:[]
        }
    },
    methods:{
        tackData:function () {
            this.$http.get('/static/note.json').then((response) => {
                // success callback
                var data = response.data
                this.NoteList = data
                this.Itinerary = this.NoteList.Itinerary
                this.Message = this.NoteList.Message
        },(response) =>{
                // error callback
            }
        )}
    },
    created(){
        this.tackData()
    }
    }
</script>
