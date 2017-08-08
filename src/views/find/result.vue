<template>
    <div class="page">
        <view-box class="nobottom">
            <div class="page-inner">
                <div class="search-tab fixed whitetheme">
                    <div class="ay-header-btn is-left">
                            <span slot="left" class="icons icon-arrow">
                                <span  class="icons icon-arrow" @click="back()"></span>
                            </span>
                    </div>
                    <!--搜索组件-->
                    <search :results="results" placeholder="" @click="ClickFun"   :auto-fixed="false" cancel-text=""></search>

                </div>
                <div v-if="noresult" class="no-result">
                    没有找到相关游记
                </div>
                <scroller lock-x scrollbar-y use-pullup height="100%" :pullup-status.sync="pullupStatus" @pullup:loading="load">
                    <!--content slot-->
                    <!--精彩发现-->
                    <section>
                        <section>
                            <a class="note-item"  v-for="noteItem in Message" >
                                <div class="head" v-link="{path:'travaler',query:{'bid':noteItem.board_id,'uid':noteItem.user_id}}">
                                    <span class="avatar"><img :src="noteItem.userAvatar+'?imageView2/1/w/30/h/30'"></span>
                                    <div class="avatar-infor">
                                        <span class="name divider">{{noteItem.board_name}}</span><span class="label">{{noteItem.customerstatus}}</span>
                                    </div>
                                </div>
                                <div v-link="{path:'detail',query:{'bid':noteItem.board_id,'tid':noteItem.topic_id}}">
                                    <div class="imgbox">
                                        <img v-for="imgItem in noteItem.imageList" track-by="$index" :src="$index==0?imgItem+'?imageView2/1/w/375/h/155':imgItem+'?imageView2/1/w/121/h/80'">
                                    </div>
                                    <p class="title">{{noteItem.title}}</p>
                                </div>
                                <div class="item-block">
                                    <div class="block relate">
                                        <span v-if="noteItem.hits<=100000"><i class="icon-see"></i><em>{{noteItem.hits}}</em></span>
                                        <span  v-if="noteItem.hits>100000"><i class="icon-see"></i><em>10w+</em></span>
                                        <span><i class="icon-zan"></i><em>{{noteItem.recommendAdd}}</em></span>
                                    </div>
                                </div>
                            </a>
                        </section>
                        <div class="ending" v-if="isFooter">
                            <p><span>已到底线</span></p>
                        </div>
                    </section>
                    <!--pullup slot-->
                    <div  slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
                        <span v-show="pullupStatus === 'default'"></span>
                        <span v-show="pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
                    </div>
                </scroller>
            </div>
        </view-box>
    </div>
</template>
<style lang="less">
    .nobottom {
        .ay_tab_bd {
            padding-bottom: 0;
        }
    }
    
    .search-tab {
        .ay-header-btn {
            box-sizing: border-box;
            padding: 12px 0 10px;
            width: 30px;
            line-height: 30px;
            height: 30px;
            font-size: 14px;
            line-height: 21px;
            color: #fff;
            padding: 5px 0 0px;
            width: 20px;
        }
        .is-left {
            float: left;
            margin-left: 20px;
            margin-top: 6px;
        }
    }
    
    .no-result {
        margin-top: 100px;
        text-align: center;
    }
</style>
<script>
    import store from '../../vuex/store'
    const commit = store.commit || store.dispatch
    import {
        go
    } from '../../libs/router'
    import {
        ViewBox,
        Headerbar,
        Search,
        Tab,
        TabItem,
        Group,
        Cell,
        Scroller,
        Tabbar,
        TabbarItem,
        Actionsheet,
        Spinner

    } from '../../components'
    export default {
        components: {
            // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
            // 否则挂载点和组件名字一致, 即vhead
            ViewBox,
            Headerbar,
            Search,
            Tab,
            TabItem,
            Group,
            Cell,
            Scroller,
            Tabbar,
            TabbarItem,
            Actionsheet,
            Spinner
        },
        data: function() {
            return {
                Message: [],
                isFooter: false,
                noresult: false,
                pullupStatus: 'default',
                pageNo: 0,
                pageSize: 10,
                has_next: 1,
                key: '',
            }
        },
        methods: {
            load: function(uuid) {
                this.search()
                setTimeout(() => {
                    this.$broadcast('pullup:reset', uuid)
                }, 10)
            },
            search: function() {
                var vm = this
                var useCache = false
                var useProxy = true
                if (vm.has_next == 1) {

                    vm.pageNo++
                        var searchParam = {
                            "keyword": vm.key,
                            "pageNo": vm.pageNo,
                            "pageSize": vm.pageSize
                        }
                    api.post({
                        path: api.config.microServiceHost.findurl,
                        controller: 'Precious',
                        action: 'GetSearchList',
                        param: JSON.stringify(searchParam),
                        useCache: useCache,
                        useProxy: useProxy,
                        callback: function(obj) {
                            if (obj.ReturnCode == 0) {
                                var data = obj.Data;
                                vm.has_next = data.has_next
                                if (data.list != null && data.list.length > 0) {
                                    for (var i = 0; i < data.list.length; i++) {
                                        var item = {}
                                        item.user_id = data.list[i].user_id;
                                        item.topic_id = data.list[i].topic_id;
                                        item.board_id = data.list[i].board_id;
                                        item.board_name = data.list[i].board_name || data.list[i].user_nick_name
                                        item.title = data.list[i].title
                                        item.userAvatar = data.list[i].userAvatar
                                        item.imageList = []
                                        if ((i + 1) % 2 == 0) {
                                            for (var j = 0; j < (data.list[i].imageList.length > 4 ? 4 : data.list[i].imageList.length); j++) {
                                                item.imageList.push(data.list[i].imageList[j])
                                            }
                                        } else {
                                            if (data.list[i].imageList != null && data.list[i].imageList.length > 0) {
                                                item.imageList.push(data.list[i].imageList[0])
                                            }
                                        }
                                        item.hits = data.list[i].hits
                                        item.recommendAdd = data.list[i].recommendAdd
                                        item.customerstatus = data.list[i].customerstatus
                                        item.isAct = '0'

                                        vm.Message.push(item)
                                    }
                                    setTimeout(() => {
                                        vm.$broadcast('pullup:reset', 'lee111')
                                        vm.$broadcast('pullup:enable', 'lee111')
                                    }, 10)
                                    document.getElementById('search_input').placeholder = vm.key
                                    if(vm.Message.length == data.total_num){
                                        vm.isFooter = true
                                    }
                                } else if (data.total_num == 0) {
                                    vm.noresult = true
                                    vm.isFooter = false
                                }
                                 commit('UPDATE_LOADING',false)
                            }
                        }
                    })
                }
            },
            back: function() {
                //window.history.back()
                api.pageBack()
            },
            ClickFun: function() {
                this.$router.go('/search')
            }
        },
        created: function() {
            commit('UPDATE_LOADING',true)
            this.screenHeight = `${document.body.clientHeight - 99}px` //计算搜索关键词列表高度：屏幕高度-顶部标题栏高度
            this.searchHeight = `${document.body.clientHeight - 50}px` //计算搜索关键词列表高度：屏幕高度-顶部标题栏高度
        },
        route: {
            data: function(transition) {
                if (transition.to != null && transition.to != undefined) {                              
                    this.key = this.$route.query.key || ''
                    _ozprm=this.key
                    this.search()
                }
            }
        },
        ready() {
            
        }
    }
</script>
