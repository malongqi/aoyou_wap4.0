<template>
  <div class="pages">
    <loading :show="isLoading" position="absolute"></loading><!--0228 F-->
    <router-view :transition = "shopdir"></router-view>
  </div>
</template>
<script>
  //定义初始字体大小
  (function (root) {
    var docEl = document.documentElement
    var timer = null
    var width
    var last
    function changeRem() {
      width = 375
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

  import store from '../../vuex/store'
  import {Loading} from '../../components'/*0228 F*/

  export default {
    components: {
      // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
      // 否则挂载点和组件名字一致, 即vhead
      Loading,
    },
    store: store,
    vuex: {
      getters: {
        route: (state) => state.route,
        isLoading: (state) => state.isLoading,
        direction: (state) => state.direction
      }
    }
  }/*0228 F*/
</script>
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
    .ay_tab_bd{
      padding-bottom: 0px;
    }
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
    color: #333333;
    &::-webkit-scrollbar{
      display: none;
      width:0;
      height:0;
    }
  }
  .ay_tabbar_icon span{
    display: block;
  }

</style>
