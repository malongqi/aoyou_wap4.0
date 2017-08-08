<template>
    <div class="page" v-cloak>
        <loading :show="isLoading" position="absolute"></loading>
        <router-view :transition="'ay-pop-' + (direction === 'forward' ? 'in' : 'out')"></router-view>
    </div>
</template>


<script>
    //To define the initial font size start
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
    //To define the initial font size end

    //State mechanisms
    import store from '../../vuex/store'
    //Page jump mechanism
    import { go } from '../../libs/router'
    import { Loading } from '../../components'

    export default {
      components: {
        Loading
      },
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
    .page{
        min-width: 300px;
        max-width: 640px;
        margin:0  auto;
        background-color: #f5f5f5;
    }
    /**
       * vue-router transition
       **/
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
        -webkit-perspective: 1000px;/*透视属性*/
        animation-name: popInRight;
    }
    .ay-pop-in-leave {
        animation-name: popOutLeft;
    }
    @keyframes popInLeft {
        from {
            transform: translate3d(-30%, 0, 0);
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
            transform: translate3d(-30%, 0, 0);
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
