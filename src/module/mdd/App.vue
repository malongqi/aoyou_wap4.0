<template>
    <div class="pages">
        <loading :show="isLoading" position="absolute"></loading><!--0228 F-->
        <router-view :transition = "shopdir"></router-view>
    </div>
</template>

<style lang="less">
    @import '../../styles/index.less';
    @import '../../styles/ayui/base/reset.less';
    html, body,.pages,.page{
        height: 100%;
        width: 100%;
        background-color: #f5f5f5;/*0228 F*/
        overflow: hidden;
    &::-webkit-scrollbar{
         display: none;
         width:0;
         height:0;
     }
    }
    li{
        list-style: none;
    }
    a{
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
    em{
        font-style: normal;
    }
    input:focus{
        outline: none;
    }
    .page{
        min-width: 300px;
        max-width: 640px;
        margin:0  auto;
        background: #f5f5f5;
        font-family: Helvetica, sans-serif;
        .ay_tabbar_item {
            padding: 7px 0 5px;
        }
        .ay_tabbar_icon+.ay_tabbar_label {
            margin-top: 0;
            line-height: 1.2;
        }
        .ay_tabbar_item.fix-select.ay_bar_item_on .ay_tabbar_label {
            color: #FF5523;
        }
        .ay_tabbar_item.ay_bar_item_on .ay_tabbar_label {
            color: #565960;
            font-size: 12px;
        }
    }
    .page-inner{
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        &::-webkit-scrollbar{
            display: none;
            width:0;
            height:0;
        }
    }
    .ay-header-box {
        position: absolute;
        top: 0;
        left: 0;
        height: 44px;
        width: 100%;
        z-index: 9;
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
        -webkit-backface-visibility: hidden;
        -webkit-perspective: 1000;
        .header-cover {
            width: 100%;
            height: 44px;
            top: 0;
            position: absolute;
            margin: 0 auto;
            background-color: @x-header-background-color;
            opacity: 0;
        }
        .tran-opacity {
            opacity: 1;
            transition: opacity 2s;
            -moz-transition: opacity 2s;
            -webkit-transition: opacity 2s;
            -o-transition: opacity 2s;
        }
    }
    .ay_tabbar_icon span{
        display: block;
    }
</style>
<script>
(function(root) {
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
        root.addEventListener('resize', function() {
            clearTimeout(timer)
            timer = setTimeout(changeRem, 300)
        })

        root.addEventListener('orientationchange', function() {
            clearTimeout(timer)
            timer = setTimeout(changeRem, 300)
        })
    })(window, undefined)
import { go } from '../../libs/router'
import store from '../../vuex/store'
import {Loading, ViewBox,Tabbar, TabbarItem} from '../../components'/*0228 F*/
let param
export default {
    components: {
        // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
        // 否则挂载点和组件名字一致, 即vhead
        Loading,
        ViewBox,
        Tabbar,
        TabbarItem,
    },
    store: store,/*0228 F*/
    vuex: {
        getters: {
            route: (state) => state.route,
            isLoading: (state) => state.isLoading,
            direction: (state) => state.direction
        }
    },/*0228 F*/
    data(){
        return{
            isSelect:true,
            index:0,
            navlist:[],
            homeAdvs:[],
            homeKeyWords:[],

         }

    },
    methods:{
    },
    created(){
        // this.contenHeight = `${document.body.clientHeight - 110}px`
        // this.takeData()

    }
}
</script>
