<template>
    <div class="page">
        <view-box class="nobottom">
            <div class="page-inner tavaler" @touchstart="touchmovefunc('start')" @touchMove="touchmovefunc('move')" @touchend="touchmovefunc('end')">
                <div class="ay-header-box fixed">
                    <div class="header-cover" :style="{opacity:isOpacity}"></div>
                    <headerbar class="shade">
                        <span slot="left" class="icons icon-arrow" v-on:click='back()'></span>
                        <div class="departciry">
                            <span class="citys" @click="" :style="{opacity:isOpacity}"></span>
                        </div>
                        <span slot="right"  class="icons icon-share"></span>
                    </headerbar>
                </div>
                <scroller lock-x scrollbar-y use-pullup height="100%" :pullup-status.sync="pullupStatus" @pullup:loading="load">
                    <!--content slot-->
                    <!--精彩发现-->
                    <section>

                        <!--banner图-->
                        <blur :blur-amount=40 :url="url" :height=300 style="z-index: 6;">
                            <p class="avatar"><img :src="url"></p>
                        </blur>
                        <div class="banner">
                            <div class="ban-infor">
                                <h2>潘潘三条子</h2>
                                <p>热衷于旅游，摄影，美食，曾经去过70多个城市</p>
                            </div>
                        </div>

                        <section class="ay-section">
                            <a class="note-item"  v-for="noteItem in Message" >
                                <div class="imgbox">
                                    <img v-for="imgItem in noteItem.imageList" track-by="$index" :src="$index==0?imgItem+'?imageView2/1/w/375/h/155':imgItem+'?imageView2/1/w/121/h/80'">
                                </div>
                                <div class="item-block">
                                    <p class="title">{{noteItem.title}}</p>
                                    <div class="block relate">
                                        <span><i class="icon-see"></i><em>{{noteItem.hits}}</em></span>
                                        <span><i class="icon-zan"></i><em>{{noteItem.recommendAdd}}</em></span>
                                    </div>
                                </div>
                            </a>
                        </section>
                        <div class="ending" v-if="isFooter">
                            <span>已到底线</span>
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
    .header-cover{
        width: 100%;
        height: 44px;
        top: 0;
        position: absolute;
        margin: 0 auto;
        background-color: #E94709;
        opacity: 0;
    }
    .tavaler{
        .banner{
            position: absolute;
            top:0;
            width: 100%;
            height: 300px;
            background: none;
            z-index: 7;

        }
        .avatar {
            text-align: center;
            padding-top: 85px;
            color: #fff;
            font-size: 18px;
            img{
                width: 70px;
                height: 70px;
                border-radius: 50%;
                border: 4px solid #ececec;
            }
        }
    }
    .fixed{
        position:fixed;
        height: 44px;
        width: 100%;
        z-index: 9;
        .ay-header-bar{
            background-color:transparent;
        }
    }
    .nobottom{
        .ay_tab_bd{
            padding-bottom:0;
        }
    }


    .ban-infor{
        position: absolute;
        box-sizing: border-box;
        text-align: center;
        bottom: 74px;
        width: 100%;
        color: #fff;
        -webkit-font-smoothing: antialiased;
        p{
            color:#fff;
            font-size: 12px;
            line-height: 1.4;
            overflow: hidden;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
        }
        h2{
            font-size: 17px;
            font-weight: normal;
            padding: 10px 20px 5px 20px;
            line-height: 1;
            font-weight: normal;
            position: relative;
            z-index: 2;
            font-size: 28px;
        }
    }

</style>
<script>
  var lastMoveTime = 0;
  var lastMoveStart = 0;
  var stopInertiaMove = false; // 是否停止缓动
  import store from '../../vuex/store'
  const commit = store.commit || store.dispatch
  import { go } from '../../libs/router'
  import {ViewBox,Headerbar,Search,Tab, TabItem, Group, Cell, Scroller, Tabbar, TabbarItem,Actionsheet,Spinner,Blur} from '../../components'
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
      Spinner,
      Blur
    },
    data (){
      return {
        results: [],
        Message:[],
        isFooter:false,
        pullupStatus: 'default',
        isOpacity:0,
        url: 'http://images1.aoyou.com/sales/201606/jlx0h214162208.jpg?imageView2/1/w/256/h/192/q/90/'
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
      load (uuid) {
        this.$http.get('/static/find.json').then((response) => {
          // success callback
          var data = response.data
          this.Message = data.news.list
          var pageIndex= data.news.page
          var has_next = data.news.has_next
          setTimeout(() => {
               this.$broadcast('pullup:reset', uuid)
            }, 10)
        }, (response) => {

        });
      },
      touchmovefunc:function (type) {
        let e = event
        if(type=='start'){
            //缓动代码
            lastMoveStart = 0;
            lastMoveTime = e.timeStamp || Date.now();
            stopInertiaMove = true;
        }else if(type=='move'){
            //fix tab 移动大于254px时 置顶推荐主题标签
            if(this.getTrans() < -280){
                this.isOpacity = 1
            }else if(this.getTrans() >=-50){
                this.isOpacity = 0
            }else{
                this.isOpacity = Math.abs(this.getTrans())/280
            }
            //缓动代码
            var nowY = this.getTrans();
            var nowTime = e.timeStamp || Date.now();
            stopInertiaMove = true;
            if(nowTime - lastMoveTime > 300) {
                lastMoveTime = nowTime;
                lastMoveStart = nowY;
            }
         }else{
            //缓动代码
            var nowY = this.getTrans();
            var nowTime = e.timeStamp || Date.now();
            var v = (nowY - lastMoveStart) / (nowTime - lastMoveTime); //最后一段时间手指划动速度
            stopInertiaMove = false;
            var _this = this;
            (function(v, startTime,ev) {
                var dir = v > 0 ? -1 : 1; //加速度方向
                var deceleration = dir*0.0006;
                var duration = v / deceleration; // 速度消减至0所需时间
                if(Math.abs(duration)>3000){
                  duration = 1000
                }
                setTimeout(function(){
                    if(_this.getTrans() >= -50){
                        _this.isOpacity = 0
                        return;
                    }
                }, Math.abs(duration));
            })(v, nowTime,e);
         }
        },
        //页面touchmove移动 END
        getTrans:function(){
            let _trEle = this.$el.getElementsByClassName('xs-container')[0]
            if(_trEle){
                let _tempStr= document.defaultView.getComputedStyle(this.$el.getElementsByClassName('xs-container')[0]).transform.toString()
                return _tempStr.substring(7,_tempStr.length-1).split(',')[5]
            }else{
                return 0
            }
        }
    },
    created(){
        this.screenHeight = `${document.body.clientHeight - 99}px`//计算搜索关键词列表高度：屏幕高度-顶部标题栏高度
        this.searchHeight = `${document.body.clientHeight - 50}px`//计算搜索关键词列表高度：屏幕高度-顶部标题栏高度

    },
    ready() {
      this.takeData()
      setTimeout(() => {
        this.$broadcast('pullup:reset', 'lee111')
      }, 10)

    }
    }
</script>
