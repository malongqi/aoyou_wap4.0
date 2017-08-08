<template>
  <div class="page page-preferential">
    <headerbar class="shade" @on-click-title="scrollTop">
      <span slot="left" class="icons icon-arrow" @click="backindex"></span>
      <div class="departciry">
        <span class="citys" @click="">线路优惠</span>
      </div>
    </headerbar>
    <view-box v-if="!showPagechoose" v-ref:view-box>
      <div class="page-inner-preferential">
        <div class="maincont">
          <section v-for="item in preferentialData">
            <h3>{{item.PreName}}</h3>
            <div class="time">
              <p>优惠时间：</p>
              <p>开始时间：{{item.PreStartDate}}</p>
              <p>结束时间：{{item.PreEndDate}}</p>
            </div>
            <div class="type">
              <p>优惠方式：</p>
              <p>{{item.PreDescription}}</p>
            </div>
          </section>
          <div class="more" v-if="specialOffers.length>0">
            <h6>更多福利和赠送</h6>
            <p>{{specialOffers}}</p>
          </div>
        </div>
      </div>
    </view-box>
  </div>
</template>
<style lang="less">
  @import '../../styles/ayui/base/mixin/setOnepx.less';

  .shade {
    position: absolute;
    width: 100%;
    top: 0;
    right: 0;
    z-index: 10;
    //border-bottom: 1px solid #DFDFDF;
    &:after {
      .setBottomLine(#DFDFDF);
    }
  }

  .page-preferential {
    .ay_tab_bd {
      padding-bottom: 0;
    }

  }

  .page-inner-preferential {
    background: white;
    padding-top: 1px;
    padding-bottom: 20px;

    .maincont {
      padding: 0 20px 40px;
      section {
        margin-top: 16px;
        h3 {
          font-size: 19px;
          color: #FF5523;
          line-height: 27px;
          font-weight: normal;
        }
        .time {
          font-size: 16px;
          color: #999999;
          margin-top: 16px;
          p {
            line-height: 27px;
            white-space: pre-line;
          }
        }
        .type {
          font-size: 16px;
          color: #333333;
          margin-top: 15px;
          p {
            line-height: 27px;
            white-space: pre-line;
          }
        }
      }

      .more {
        margin-top: 16px;
        h6 {
          font-size: 19px;
          color: #FF5523;
          line-height: 27px;
          margin-bottom: 15px;
          font-weight: normal;
        }
        p {
          font-size: 16px;
          color: #333333;
          line-height: 27px;
          white-space: pre-line;
        }
      }
    }
  }

  .ay-header-bar .ay-header-title, .ay-header-bar h1 {
    color: #333;
  }

  .ay-header-bar {
    background-color: white;
    .icon-arrow {
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAaZJREFUWAnt2LtOhEAUBuDlVphQaQsxNFYmxnBJrO2tjJWJhQ+hvoD21hYWdiY+gdYEqNxKOxJDqe0mclnPIEPYLOxyGZlTOAkMl/DzMSHhMJMJ8iax8jmOs6Np2mYURV+sMkmOyCLMNM3LNE3fkiR5B+gBi0yaMRho2/YVhN3AIpAly7JtGs6iHwQkOABdU4ggCM+GYTzRfRY9eeperQ6nKMqR67qzXoENF/UCjoUj5s7AMXGdgWPjOgF54FoDeeFaAXni1gJ541YCMeAagVhwtUBMuCUgNtwCECOuBFqWdT6fz+/IAdJIVfIXH/7f9G7rvNwC3EnlsikWHDHlQBixjwpwN47j48o+180cKIriBSheC4kII3oP7+QpV1lx87Lcgn+JLfiveIHje8W5DOBnQRA88ISWQILAiFwAYkQuAbEha4GYkI1ALMiVQAzItUDeyFZAnsjWQF7ITkAeyM7AsZG9gGMiewObkLIs73ueNyXnWbRB84O+739KknQIkLJUg4rIYgGjGYPnqGFOeqbr+iMEbkDhG6iqehuG4Te9wX/PewR+ABJJOSZyJumPAAAAAElFTkSuQmCC");
    }
  }

  .ay_tabbar {
    .next {
      width: 100%;
      background: #FF5523;
      height: 44px;
      padding: 0 20px;
      position: fixed;
      z-index: 10;
      bottom: 0;
      p {
        width: 285px;
        line-height: 44px;
        font-size: 17px;
        color: #FFFFFF;
        span {
          font-size: 12px;
          margin-left: 10px;
        }
      }
      i {
        position: absolute;
        right: 58px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }


</style>
<script>
  import {go} from '../../libs/router'
  import {
    ViewBox,
    Headerbar,
    Search,
    Tab,
    TabItem,
    Group,
    XNumber,
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
      XNumber,
      Cell,
      Scroller,
      Tabbar,
      TabbarItem,
      Actionsheet,
      Spinner
    },
    data (){
      return {
        showPagechoose: false,
        shownext: true,
        preferentialData: [],
        specialOffers: ""
      }
    },
    methods: {
      scrollTop () {
        var el = this.$refs.viewBox.$els.viewBoxBody
        $(el).animate({scrollTop: 0}, 200, null)
      },

      backindex: function () {
        window.history.back()
      },
      takeData: function () {
        //优惠信息列表
        if(g_selected_data.pid==0){
          window.history.back()
        }else{
          this.specialOffers = g_specialoffers
          this.preferentialData = g_preferentialData
        }
      }

    },
    ready() {
      this.takeData()

    }

  }

  function changeData(data) {
    //2016-03-21T00:00:00 To 2016年03月21日 00:00:00
    data = data.substr(0, 4) + '年' + data.substr(5, 2) + '月' + data.substr(8, 2) + '日 ' + data.substr(11)
    return data
  }


</script>
