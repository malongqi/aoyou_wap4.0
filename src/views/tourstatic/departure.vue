<template>
    <div class="page">
        <headerbar class="headbar">
            <span slot="left" class="icons icon-arrow" @click='back()'></span>
            <div class="departciry">
                <span class="citys" @click="">各出发地-{{mainData.DepartCityText}}（往返价格）</span>
            </div>
        </headerbar>
        <view-box class="page-inner-departure">
            <p class="headtip">该产品支持您从以下出发地出发，您可以在下一步中选择您的出发地，我们将负责从您出发地到{{mainData.DepartCityText}}的往返交通服务。</p>
            <div class="list">
                <h3>可选择出发地：</h3>
                <p>{{mainData.TransportPolicy.AllDepartCity}}</p>
                <h4>中转城市：{{mainData.DepartCityText}}</h4>
                <h6>注：您选择的出发日期是指从{{mainData.DepartCityText}}出发的时间。</h6>
            </div>
            <div class="listprice">
                <h3>出发地 - 中转城市航班价格（往返）</h3>
                <div class="price" :class="{ oneline: item.TransportPolicyCityStr.length<7 }" v-for="item in mainData.TransportPolicy.TransportPolicyPriceList">
                    <p>出发地：{{item.TransportPolicyCityStr}}</p>
                    <span v-if="item.Price<0">-￥{{item.Price}}<b>起</b></span>
                    <span v-if="item.Price>0">+￥{{item.Price}}<b>起</b></span>
                    <span v-if="item.Price==0">免费</span>
                </div>
            </div>
            <h3 class="flight">出发地 - 中转城市航空公司：{{mainData.TransportPolicy.AirLineName}}</h3>
            <div class="tip clearfix"><i class="icon-tip"></i><p>由于机票库存实时更新，国内各出发地往返的最终航班时刻须以实际出票为准，敬请理解！</p></div>
        </view-box>
    </div>
</template>
<style lang="less">
    @import '../../styles/ayui/base/mixin/setOnepx.less';
    .page .ay-header-bar{
        position: relative;
        //border-bottom: 1px solid #DFDFDF;
        &:after {
            .setBottomLine(#DFDFDF);
        }
    }
    .page-inner-departure{
        p.headtip{
            background: white;
            padding: 15px 20px;
            font-size: 14px;
            color: #666666;
            line-height: 20px;
        }
        .list{
            background: white;
            margin-top: 10px;
            padding:0 20px 17px;
            h3{
                font-size: 16px;
                color: #333333;
                line-height: 27px;
                padding-top: 15px;
            }
            p{
                font-size: 16px;
                color: #333333;
                line-height: 27px;
                padding:0;
            }
            h4{
                margin-top: 17px;
                padding: 0;
                font-size: 16px;
                color: #333333;
                line-height: 27px;
            }
            h6{
                font-size: 12px;
                color: #FF5523;
                line-height: 12px;
            }
        }

        .listprice{
            margin-top: 10px;
            padding:0 20px;
            background: white;
            h3{
                height:60px;
                font-size: 16px;
                color: #333333;
                line-height: 60px;
            }
            .price{
                &:after {
                    .setBottomLine(#DFDFDF);
                }
                position: relative;
                margin-top: 15px;
                &:last-child{
                    border:0;
                }
                p{
                    //height:30px;
                    font-size: 16px;
                    color: #333333;
                    line-height: 27px;
                }
                span{
                    display: block;
                    font-size: 17px;
                    color: #FF5523;
                    line-height: 27px;
                    padding-bottom: 15px;
                    text-align: right;
                    b{
                        font-size: 12px;
                        color: #999;
                    }
                }
            }
            .price.oneline{
                padding-bottom: 15px;
                p{
                    display: inline-block;
                }
                span{
                    display: inline-block;
                    padding-bottom: 0;
                    font-size: 16px;
                    float: right;
                    position: relative;
                    top: 4px;
                }
            }


        }

        .flight{
            background: white;
            margin-top: 10px;
            font-size: 16px;
            color: #333333;
            line-height: 27px;
            padding:16.5px 20px;
        }
        .tip{
            font-size: 14px;
            color: #666666;
            line-height: 20px;
            margin: 10px 20px 40px 20px;
            i{
                float: left;
            }
            p{
                display: inline-block;
                float: left;
                width: 93%;
            }
        }
    }



</style>
<script>
import { go } from '../../libs/router'
  import {ViewBox,Headerbar} from '../../components'
  export default {
    components: {
      // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
      // 否则挂载点和组件名字一致, 即vhead
      ViewBox,
      Headerbar
    },
    data (){
      return {
        mainData:{}
      }
    },
    methods: {
        back:function(){
            window.history.back()
        },
        takeData:function(){
           //主信息
           this.mainData = p_mainData
           this.mainData.TransportPolicy = p_departure
           // this.$http.get('/static/tour_main.json').then((response) => {
           //    var data = response.data
           //    this.mainData = data.ProductBaseInfo

           //  }, (response) => {

           //  });           
      },
    },
    created() {
      this.takeData()
    }

  }


</script>
