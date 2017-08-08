<template>
    <div class="page date">
        <headerbar class="headbar">
            <span slot="left" class="icons icon-arrow" @click='back()'></span>
            <div class="departciry">
                <span class="citys" @click="">附加服务</span>
            </div>
        </headerbar>
        <view-box class="page-inner-service">
            <header>
                <h2>{{product.ProductName}}</h2>
                <p>{{product.ProductSubName}}</p>
                <div class="price">
                    <span v-if="aprice>0">¥ </span>
                    <label>{{aprice==0?'免费':aprice}}</label>
                    <span v-if="aprice>0">{{'/'+unit}}</span>
                    <b v-if="false">原价：3699起/人</b>
                </div>
               <!-- <div class="price free">
                    <span>免费</span>
                </div>-->
            </header>
            <section>
                <template v-for="item in product.DescriptionList">
                <h3>{{item.ElementText}}</h3>
                <p v-html="item.Description"></p>
                </template>
            </section>
        </view-box>
    </div>
</template>
<style lang="less">
    .page-inner-service{
        background: white;
        header{
            margin: 0 20px;
            h2{
                font-size: 16px;
                color: #333333;
                letter-spacing: 0.07px;
                line-height: 20px;
                margin-top:20px;
            }
            p{
                font-size: 12px;
                color: #666666;
                letter-spacing: 0.05px;
                line-height: 20px;
            }
            .price{
                height:40px;
                margin-top: 4px;
                border-bottom: 1px solid #DFDFDF;
                span{
                    font-size: 14px;
                    color: #999999;
                    letter-spacing: 0.07px;
                }
                span:first-child{
                    font-size: 17px;
                    color: #FC5A3F;
                    letter-spacing: 0px;
                }
                label{
                    font-size: 24px;
                    color: #FC5A3F;
                    letter-spacing: 0.13px;
                }
                b{
                    font-size: 12px;
                    color: #999999;
                    letter-spacing: 0.05px;
                    font-weight: normal;
                    text-decoration: line-through;
                }

            }
            .price.free{
                span{
                    font-size: 24px;
                    color: #FC5A3F;
                    letter-spacing: 0.13px;
                }
            }
        }
        section{
            margin: 0 20px;
            h3{
                height:50px;
                font-size: 16px;
                color: #FF5523;
                line-height: 50px;
            }
            p{
                font-size: 16px;
                color: #333333;
                line-height: 27px;
                margin-bottom: 15px;
            }
        }
    }

    .date{


        .ay-header-bar .ay-header-btn{
            padding: 0;
        }
    }
</style>
<script>
import { go } from '../../libs/router'
  import {ViewBox,Headerbar} from '../../components'
import store from '../../vuex/store'/*0228 F*/
const commit = store.commit || store.dispatch /*0228 F*/
export default {
    components: {
      // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
      // 否则挂载点和组件名字一致, 即vhead
      ViewBox,
      Headerbar
    },
    data (){
      return {
        apid:0,
        aptid:0,
        aprice:0,
        unit:'',
        product:{}
      }
    },
    methods: {
        initData:function(){
            var vm=this
            var postParam={
                "ProductID":vm.apid,
                "ProductType":vm.aptid
            }
            api.post({
                path: api.config.microServiceHost.packageurl,
                controller: 'Common',
                action: 'Select_AddProductDetail_ByProductIDAndProductType',
                param: JSON.stringify(postParam),
                useCache: false,
                useProxy: true,
                callback: function(obj) {
                    if (obj.ReturnCode == 0) {
                        var data=obj.Data
                        console.log({"title":"AddProductDetail","data":data})
                        vm.product=data
                        commit('UPDATE_LOADING',false)/*0228 F*/
                    }
                }
            })
        },
        back:function(){
            api.pageBack()
        }
    },
    created() {
        commit('UPDATE_LOADING',true)/*0228 F*/
    },
    route:{
        data:function(transition){
            if(transition.to!=null&&transition.to!=undefined)
            {
                if(g_selected_data.pid>0)
                {
                    this.apid=transition.to.query.apid
                    this.aptid=transition.to.query.aptid
                    this.aprice=transition.to.query.aprice
                    this.unit=transition.to.query.unit
                    this.initData()
                }
                else
                {
                    api.pageBack()
                }
                
            }
        }
    }

  }


</script>
