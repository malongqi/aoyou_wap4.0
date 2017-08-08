<template>
    <div class="pages">
        <loading :show="isLoading" position="absolute"></loading><!--0228 F-->
        <router-view></router-view>
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
      },/*0228 F*/
      store: store,
      vuex: {
          getters: {
              route: (state) => state.route,
              isLoading: (state) => state.isLoading,
              direction: (state) => state.direction
          }
      }
  }
</script>
<style lang="less">
    @import '../../styles/index.less';
    @import '../../styles/ayui/base/reset.less';
    html, body,.pages,.page{
        height: 100%;
        width: 100%;
        background-color: #f5f5f5;/*0228 F*/
        overflow-x: hidden;

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
    .page {
        width: 100%;
        height: 100%;
        min-width: 300px;
        max-width: 640px;
        margin:0  auto;
        /*background: #efeff4;*//*0228 F*/
        overflow: hidden;
        font-family: Helvetica, sans-serif;
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



    /**
* vue-router transition
*/
    .ay-pop-out-transition,
    .ay-pop-in-transition {
        width: 100%;
        animation-duration: 0.5s;
        animation-fill-mode: both;
        backface-visibility: hidden;
    }
    .ay-pop-out-enter,
    .ay-pop-out-leave,
    .ay-pop-in-enter,
    .ay-pop-in-leave {
        will-change: transform;
        height: 100%;
        position: absolute;
        left: 0;
    }
    .ay-pop-out-enter {
        animation-name: popInLeft;
    }
    .ay-pop-out-leave {
        animation-name: popOutRight;
    }
    .ay-pop-in-enter {
        -webkit-perspective: 1000px;//透视属性
        animation-name: popInRight;
    }
    .ay-pop-in-leave {
        animation-name: popOutLeft;
    }
    @keyframes popInLeft {
        from {
            transform: translate3d(-100%, 0, 0);
        }
        to {
            transform: translate3d(0, 0, 0);
        }
    }
    @keyframes popOutLeft {
        from {
            transform: translate3d(0, 0, 0);
        }
        to {
            transform: translate3d(-100%, 0, 0);
        }
    }
    @keyframes popInRight {
        from {
            transform: translate3d(100%, 0, 0);
        }
        to {
            transform: translate3d(0, 0, 0);
        }
    }
    @keyframes popOutRight {
        from {
            transform: translate3d(0, 0, 0);
        }
        to {
            transform: translate3d(100%, 0, 0);
        }
    }

</style>
