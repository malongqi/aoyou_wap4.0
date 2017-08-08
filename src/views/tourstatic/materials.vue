<template>
    <div class="page">
        <headerbar class="headbar">
            <span slot="left" class="icons icon-arrow" @click='back()'></span>
            <div class="departciry">
                <span class="citys" @click="">所需材料</span>
            </div>
        </headerbar>
        <view-box class="page-inner-materials">
            <cell :title="item.VisaPersonTypeName" link="materials" :inline-desc="item.length" v-for="item in metertailData"></cell>
        </view-box>
    </div>
</template>
<style lang="less">
    .page-inner-materials{
        background: white;
        padding: 0 20px;
        .ay_cell {
            height: 60px;
            font-size: 17px;
            padding: 0;
            position: relative;
            &:after {
                content: "";
                display: block;
                width: 100%;
                left: 0;
                position: absolute;
                bottom: 0;
            }
            .ay_cell_primary{
                flex:2;
                -webkit-box-flex:2;
            }
            .ay-label-desc {
                position: absolute;
                right: 27px;
                top: 19px;
            }
        }

        .ay_cell:last-child{
            border-bottom: 1px solid #DFDFDF;
        }
    }


</style>
<script>
import { go } from '../../libs/router'
  import {ViewBox,Headerbar,Cell} from '../../components'
  export default {
    components: {
      // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
      // 否则挂载点和组件名字一致, 即vhead
      ViewBox,
      Headerbar,
      Cell
    },
    data (){
      return {
        metertailData:[],
        current:0,
        materialcount:'123'
      }
    },
    methods: {
        back:function(){
            window.history.back()
        },
        takeData:function(){
           //主信息
           this.metertailData = g_visa[this.current].VisaDetailInfoList
           for(var i in this.metertailData){
            this.metertailData[i].length = "共需"+this.metertailData[i].VisaDescList.length+"项材料"
           }
      }
    },
    ready() {
      this.takeData()
    },
    route:{
        data:function(){
            this.current = this.$route.query.materId||0
        }
    }

  }


</script>
