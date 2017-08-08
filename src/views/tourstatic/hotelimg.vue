<template>
    <div>
        <div class="page choose">
            <div class="page-inner-hotelimg">
                <div class="mask" @click="back"></div>
                <div class="cont">
                    <swiper loop :aspect-ratio="281/375" dots-position="center"  v-ref:picWall :list="imgList">
                    </swiper>
                    <p>酒店外观</p>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less">


    .page-inner-hotelimg{
        .mask{
            position: fixed;
            background: #000;
            height:100%;
            width: 100%;
        }
        .cont{
            position: absolute;
            top:50%;
            transform: translateY(-47%);
            width: 100%;

            img{
                width: 100%;
            }
            p{
                font-size: 17px;
                color: #FFFFFF;
                letter-spacing: 0px;
                text-align: center;
                 margin-top: 30px;

            }

            .ay-slider{
                .ay-indicator{
                    display: none;
                }
            }
        }

    }

</style>
<script>
import { go } from '../../libs/router'
  import {Swiper} from '../../components'
  export default {
    components: {
      // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
      // 否则挂载点和组件名字一致, 即vhead
        Swiper
    },
    data (){
      return {
        imgList:[]
      }
    },
    methods: {
        back:function(){
            api.pageBack();
        },
        takeData:function(){
            if (g_hotel_list && g_hotel_list.length > 0) {
                for (var i = 0, len = g_hotel_list.length; i < len; i++) {
                    if (g_hotel_list[i].HotelId == this.hid) {
                        if(g_hotel_list[i].HotelPicList && g_hotel_list[i].HotelPicList.length>0)
                        {
                            for(var j=0,lenb=g_hotel_list[i].HotelPicList.length;j<lenb;j++)
                            {
                                var item={'img':g_hotel_list[i].HotelPicList[j] || "http://pic1.aoyou.com/wap4.0/index/bg-s.png?imageView2/1/w/80/h/60"}
                                this.imgList.push(item)

                            }                            
                        }
                    }
                }
            }
        }
           
    },
    route:{
        data: function (transition) {
            if (transition.to != null && transition.to != undefined) {
                if(p_selected_data.pid>0)
                {                  
                    this.hid = transition.to.query.hid
                    this.takeData()
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
