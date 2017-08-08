<template>
    <div class="page choose">
        <headerbar class="shade" @on-click-title="scrollTop">
            <span slot="left" class="icons icon-arrow" @click="back()"></span>
            <div class="departciry">
                <span class="citys" @click="">线路优惠</span>
            </div>
        </headerbar>
        <view-box v-if="!showPagechoose" v-ref:view-box>
            <div class="page-inner-preferential">
                <div class="maincont">
                    <section v-for="item in preferentialData">
                      <div v-if="item.IsPrePlatform">
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
                      </div>
                      <div v-if="!item.IsPrePlatform">
                        <h3>{{item.PreName}}</h3>
                        <div class="type">
                            <p v-html="item.PreDescription|html"></p>
                        </div>
                      </div>
                    </section>
                </div>
            </div>
        </view-box>
    </div>
</template>
<style lang="less">
    @import '../../styles/ayui/base/mixin/setOnepx.less';
    .shade{
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
    .page-inner-preferential{
       background: white;
       padding-top: 1px;
        padding-bottom: 20px;

       .maincont{
           padding: 0 20px 40px;
           section{
               margin-top: 16px;
               h3{
                   font-size: 19px;
                   color: #FF5523;
                   line-height: 27px;
                   font-weight: normal;
               }
               .time{
                   font-size: 16px;
                   color: #999999;
                   margin-top: 16px;
                   p{
                       line-height: 27px;
                   }
               }
               .type{
                   font-size: 16px;
                   color: #333333;
                   margin-top: 15px;
                   p{
                       line-height: 27px;
                   }
               }
           }

           .more{
               margin-top: 16px;
               h6{
                   font-size: 19px;
                   color: #FF5523;
                   line-height: 27px;
                   margin-bottom: 15px;
               }
               p{
                   font-size: 16px;
                   color: #333333;
                   line-height: 27px;
               }
           }
       }
   }


   .ay-header-bar .ay-header-title, .ay-header-bar h1{
       color: #333;
   }
   .ay-header-bar{
       background-color: white;
       .icon-arrow {
           background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAaZJREFUWAnt2LtOhEAUBuDlVphQaQsxNFYmxnBJrO2tjJWJhQ+hvoD21hYWdiY+gdYEqNxKOxJDqe0mclnPIEPYLOxyGZlTOAkMl/DzMSHhMJMJ8iax8jmOs6Np2mYURV+sMkmOyCLMNM3LNE3fkiR5B+gBi0yaMRho2/YVhN3AIpAly7JtGs6iHwQkOABdU4ggCM+GYTzRfRY9eeperQ6nKMqR67qzXoENF/UCjoUj5s7AMXGdgWPjOgF54FoDeeFaAXni1gJ541YCMeAagVhwtUBMuCUgNtwCECOuBFqWdT6fz+/IAdJIVfIXH/7f9G7rvNwC3EnlsikWHDHlQBixjwpwN47j48o+180cKIriBSheC4kII3oP7+QpV1lx87Lcgn+JLfiveIHje8W5DOBnQRA88ISWQILAiFwAYkQuAbEha4GYkI1ALMiVQAzItUDeyFZAnsjWQF7ITkAeyM7AsZG9gGMiewObkLIs73ueNyXnWbRB84O+739KknQIkLJUg4rIYgGjGYPnqGFOeqbr+iMEbkDhG6iqehuG4Te9wX/PewR+ABJJOSZyJumPAAAAAElFTkSuQmCC");
       }
   }


   .ay_tabbar{
       .next{
           width: 100%;
           background: #FF5523;
           height: 44px;
           padding: 0 20px;
           position: fixed;
           z-index: 10;
           bottom: 0;
           p{
               width: 285px;
               line-height:44px;
               font-size: 17px;
               color: #FFFFFF;
               span{
                   font-size:12px;
                   margin-left: 10px;
               }
           }
           i{
               position: absolute;
               right: 58px;
               top: 50%;
               transform: translateY(-50%);
           }
       }
   }

    .choose{
        .ay-header-bar .ay-header-btn{
            padding: 0;

        }

        .ay_tab_bd{
            padding-bottom: 0;
        }
    }


</style>
<script>
import { go } from '../../libs/router'
  import {ViewBox,Headerbar,Search,Tab, TabItem, Group,XNumber, Cell, Scroller, Tabbar, TabbarItem,Actionsheet,Spinner} from '../../components'
import store from '../../vuex/store'/*0228 F*/
const commit = store.commit || store.dispatch /*0228 F*/
export default {
    components: {
      // 可以以key-value的形式注册组�� 此时挂载点的名字就是key
      // 否则挂载点和组件名字一�� 即vhead
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
        showPagechoose:false,
        shownext:true,
        preferentialData:[]
      }
    },
    methods: {
      scrollTop () {
        var el = this.$refs.viewBox.$els.viewBoxBody
        $(el).animate({ scrollTop: 0 }, 200, null)
      },

      back:function(){
            api.pageBack()
      },//返回
      takeData:function(){
         //优惠信息列表
         var tempthis = this
         var productParam={"ProductID":p_selected_data.pid}
          api.post({
                path: api.config.microServiceHost.packageurl,
                controller: 'Common',
                action: 'Select_ProductPreferential_List_ByProductID',
                param: JSON.stringify(productParam),
                useCache: false,
                useProxy: true,
                callback: function(obj) {
                    if(obj.ReturnCode==0){
                        var data = obj.Data                        
                        for(var i in obj.Data){
                            data[i].PreStartDate = changeData(obj.Data[i].PreStartDate)
                            data[i].PreEndDate = changeData(obj.Data[i].PreEndDate)
                        }
                        tempthis.preferentialData = data
                        commit('UPDATE_LOADING',false)/*0228 F*/
                    }
                }
          })
      }

    },
    created() {
        commit('UPDATE_LOADING',true)/*0228 F*/
    },
    route:{
        data:function(transition){
            if(transition.to!=null&&transition.to!=undefined)
            {
                if(p_selected_data.pid>0)
                {
                    this.takeData()
                }
                else
                {
                    api.pageBack()
                }
                
            }
        }
    },
    filters:{
        "html":function(val){
            if(val&&val.length>0)
            {   
                return api.HTMLDecode(val)
            }
        }
    }

  }

  function changeData(data){
    //2016-03-21T00:00:00 To 2016年03月21日 00:00:00
    data = data.substr(0,4) + '年'+data.substr(5,2) + '月'+data.substr(8,2)+'日 ' + data.substr(11)
    return data
}


</script>
