<template>
    <div class="page">
        <headerbar class="headbar">
            <span slot="left" class="icons icon-arrow" @click='back()'></span>
            <div class="departciry">
                <span class="citys" @click="">签证信息</span>
            </div>
        </headerbar>
        <view-box class="page-inner-visa">
            <cell :title="item.VisaName" :link="{path:'materials',query:{'materId':$index}}" v-for="item in visaData"></cell>
        </view-box>
    </div>
</template>
<style lang="less">

    .page-inner-visa{
        background: white;
        padding: 0 20px;
        .ay_cell {
            height: 60px;
            //line-height: 60px;
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
                //border-bottom: 1px solid #DFDFDF;
            }
            .ay_cell_primary{
                flex:2;
                -webkit-box-flex:2;
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
        visaData:[]
      }
    },
    methods: {
        back:function(){
            window.history.back()
        },
        takeData:function(){
           //主信息
           this.$http.get('/static/tour_main.json').then((response) => {
              var data = response.data
              this.visaData = data.visa
                g_visa = this.visaData
            }, (response) => {

            });
      }
    },
    created() {
      this.takeData()


    }

  }


</script>
