<template>
    <div class="page">
        <view-box>
            <div class="page-inner">
                <div class="search-tab fixed whitetheme">
                    <div class="ay-header-btn is-left">
                            <span slot="left" class="icons icon-arrow">
                                <span  class="icons icon-arrow" @click="back()"></span>
                            </span>
                    </div>
                    <!--搜索组件-->
                    <a href="javascript:" class="search-btn" @click="searchFun" >搜索</a>
                    <search :results="results" placeholder="搜索精彩内容..." @result-click="resultClick" autofocus :list-height="searchHeight"   :auto-fixed="false" cancel-text=""></search>

                </div>
            </div>
        </view-box>
    </div>
</template>
<style scoped>
    .page .page-inner {
        background-color: #fff;
    }
</style>
<style lang="less">
    input{
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
        -webkit-user-modify: read-write-plaintext-only;
        -moz-box-shadow: none !important;
        -webkit-box-shadow: none !important;
        box-shadow: none !important;
        outline: 0;
        -webkit-appearance: none;
    }
    .search-tab {
        background-color: #fff;
        position: relative;
        .icons {
            display: block;
            height: 20px;
            text-align: center;
        }
        .ay-search-mask {
            display: none;
        }
        &:after {
            content: "";
            position: absolute;
            left: 0;
            bottom: -1px;
            width: 100%;
            height: 1px;
            border-bottom: 1px solid #C7C7C7;
            color: #C7C7C7;
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
            -webkit-transform: scaleY(0.5);
            transform: scaleY(0.5);
        }
        .ay_search_bar:before,.ay_search_bar:after{
            border-top: 0;
            border-bottom: 0;
        }
        .ay_search_inner .ay_icon_clear {
            top: 1px;
        }
        .search-btn {
            float: right;
            font-size: 17px;
            color: #333333;
            line-height: 44px;
            margin-right: 20px;
        }
        .ay_search_bar {
            padding: 6px 20px;
            background-color: #fff;
        }
        .ay_search_outer {
            background-color: #fff;
        }
        .ay_search_inner {
            padding-left: 40px;
        }
        .ay_search_inner .ay_search_input {
            padding: 5px 0;
            font-size: 14px;
        }
        .ay_search_inner .ay_icon_search {
            top: 0;
            left: 15px;
            line-height: 30px;
        }
        .ay_search_outer:after {
            border-radius: 100px;
        }
        .ay_icon_search:before {
            font-size: 15px;
        }
        .ay_search_cancel {
            font-size: 17px;
            color: #333333;
            line-height: 30px;
        }
        .ay_search_bar.ay_search_focusing .ay_search_cancel {
            display: none;
        }
    }
</style>
<script>
    import { go } from '../../libs/router'
  import {ViewBox,Search, Group, Cell,Actionsheet} from '../../components'
  export default {
    components: {
      // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
      // 否则挂载点和组件名字一致, 即vhead
      ViewBox,
      Search,
      Group,
      Cell,
      Actionsheet,
    },
    data (){
      return {
        results: [],
        }
    },
    methods: {
      takeData:function(){
        this.$http.get('/static/find.json').then((response) => {
          // success callback
          var data = response.data
          this.Message = data.news.list
          this.Travaler = data.traveler.list
          setTimeout(() => {
            this.$broadcast('pullup:reset', 'lee111')
            this.$broadcast('pullup:enable', 'lee111')
          }, 10)
        }, (response) => {

                });


            },
            searchFun: function() {
                //alert('开始搜索！！！')
                var key = document.getElementById('search_input').value
                this.$router.go('result?key=' + key)
            },

            resultClick: function() {
                window.alert('you click the result item: ' + JSON.stringify(item))
            },
            back: function() {
                api.pageBack()
            }
        },
        created() {
            this.searchHeight = `${document.body.clientHeight - 50}px` //计算搜索关键词列表高度：屏幕高度-顶部标题栏高度

        },
        ready() {
            console.log(document.referrer);
            this.takeData(1)
            setTimeout(() => {
                this.$broadcast('pullup:reset', 'lee111')
            }, 10)

        }
    }
</script>