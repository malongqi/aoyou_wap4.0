<template>
    <div>
        <div class="page choose">
            <div class="page-inner-hotelimg">
                <div class="mask" @click="back"></div>
                <div class="cont">
                    <!-- <img v-bind:src="imgUrl"> -->
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
            if(g_hotel_list&&g_hotel_list.length>0)
            {
                var stayPlace=g_hotel_list[this.stayIndex]
                if(stayPlace&&stayPlace.HotelList&&stayPlace.HotelList.length>0)
                {
                    for(var i=0,len=stayPlace.HotelList.length;i<len;i++)
                    {
                        if(stayPlace.HotelList[i].HotelProductID==this.hid)
                        {
                            var hotelData=stayPlace.HotelList[i]
                            if(hotelData.HotelPicList&&hotelData.HotelPicList.length>0)
                            {
                                 for(var j=0,lenb=hotelData.HotelPicList.length;j<lenb;j++)
                                {
                                    var item={'img':hotelData.HotelPicList[j] || "http://pic1.aoyou.com/wap4.0/index/bg-s.png?imageView2/1/w/80/h/60"}
                                    this.imgList.push(item)
                                    // this.imgUrl=hotelData.HotelPicList[0]
                                }
                            }
                            break
                        }
                    }
                }
                else if(stayPlace&&stayPlace.HotelPlanList&&stayPlace.HotelPlanList.length>0)
                {
                    for(var i=0;i<stayPlace.HotelPlanList.length;i++)
                    {
                        if(stayPlace.HotelPlanList[i].HotelPlanID==this.hpid)
                        {
                            var hotelPlan=stayPlace.HotelPlanList[i]
                            for(var j=0;j<hotelPlan.HotelList.length;j++)
                            {
                                if(hotelPlan.HotelList[j].HotelProductID==this.hid)
                                {
                                    var hotelData=hotelPlan.HotelList[j]
                                    if(hotelData.HotelPicList&&hotelData.HotelPicList.length>0)
                                    {
                                        for(var j=0,lenb=hotelData.HotelPicList.length;j<lenb;j++)
                                        {
                                            var item={'img':hotelData.HotelPicList[j] || "http://pic1.aoyou.com/wap4.0/index/bg-s.png?imageView2/1/w/80/h/60"}
                                            this.imgList.push(item)
                                            // this.imgUrl=hotelData.HotelPicList[0]
                                        }
                                        // this.imgUrl=hotelData.HotelPicList[0]
                                    }
                                    break
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    route:{
        data:function(transition){
            if(transition.to!=null&&transition.to!=undefined)
            {
                if(g_selected_data.pid>0)
                {
                    this.stayIndex=transition.to.query.index
                    this.hid=transition.to.query.hid
                    this.rpid=transition.to.query.rpid
                    this.hpid=transition.to.query.hpid
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
