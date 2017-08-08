<template>
    <div class="page">
        <headerbar class="shade" @on-click-title="scrollTop">
            <span slot="left" class="icons icon-arrow" @click='back()'></span>
            <span class="citys" @click="">如是户外</span>
            <!-- <span slot="right" class="icons icon-share" ></span> -->
        </headerbar>
        <view-box v-ref:view-box>
            <div class="page-inner-rushitour">
                <div v-for="PageItem in PageData">
                    <div v-if="$index == 0" class="banner">
                        <section class="picandcell">
                            <a v-if="PageItem.elementPicUrl" class="picbox" :href="PageItem.elementSpaceUrl">
                                <div class="imgcover">
                                    <img :src='PageItem.elementPicUrl'>
                                </div>
                            </a>
                        </section>
                        <section class="describe clearfix">
                            <div class="title">
                                <span>{{PageItem.elementTitle}}</span>
                            </div>
                            <a class="detail" :href="PageItem.elementSpaceUrl">
                                <p class="detailbox" :class="{hidden : IsHide}">{{PageItem.elementDescription}}</p>
                                <label @click = 'More'>更多</label>
                            </a>
                        </section>
                    </div>
                    <div v-if="$index != 0">
                        <section class="picanddescribe" v-if="PageItem.elementDescription">
                            <div class="title">
                                <span>{{PageItem.elementTitle}}</span>
                            </div>
                            <a class="imgbox" :href="PageItem.elementSpaceUrl">
                                <img :src="PageItem.elementPicUrl">
                            </a>
                            <a class="content" :href="PageItem.elementSpaceUrl">
                                <h3>{{PageItem.elementSubTitle}}</h3>
                                <p>{{PageItem.elementDescription}}</p>
                            </a>
                        </section>
                        <section class="picbottomtext" v-if="!PageItem.elementDescription">
                            <a class="imgbox"  :href="PageItem.elementSpaceUrl">
                                <img :src="PageItem.elementPicUrl">
                                <div class="mask">
                                    <div class="picbottomtextblank"></div>
                                    <p>{{PageItem.elementSubTitle}}</p>
                                </div>
                            </a>
                        </section>
                    </div>
                </div>
            </div>
        </view-box>
    </div>
</template>
<style lang="less">
.clearfix{
    zoom:1;
}
.clearfix:after{
    content: " ";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}

.page-inner-rushitour{
    //padding-bottom: 44px;
    .title{
        height: 60px;
        line-height: 60px;
        margin: 0 20px;
        span{
            display: inline-block;
            background: #FF5523;
            border-radius: 5px;
            font-size: 14px;
            color: #FFFFFF;
            height:19px;
            line-height: 19px;
            padding: 1px 8px;
        }
    }
    .banner  section.picandcell{
        margin-top: 0;
    }
    section.picandcell{
        margin-top: 10px;
        background: white;
        .picbox{
            position: relative;
            img{
                width: 100%;
                display: block;
            }
            .mask{
                height:100%;
                width: 100%;
                position: absolute;
                top:0;
                left: 0;
                background: rgba(0,0,0,0.50);
                p{
                    font-size: 19px;
                    color: #FFFFFF;
                    line-height: 27px;
                    text-align: center;
                    width: 90%;
                    margin-left: 5%;
                    top: 50%;
                    position: absolute;
                    transform: translateY(-50%);
                }
            }
        }

        .cellbox{
            margin: 0 20px;
            .cell{
                height:50px;
                line-height: 50px;
                position: relative;
                border-top: 0.5px solid #DFDFDF;
                p{
                    font-size: 16px;
                    color: #333333;
                    width: 90%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
            .cell:first-child{
                border: none;
            }
        }
    }
    section.describe{
        margin-top: 10px;
        background: white;
        padding-bottom: 16px;
        .detail{
            margin: 0 20px;
            p{
                font-size: 14px;
                color: #333333;
                line-height: 22px;
            }
            label{
                display: block;
                float: right;
                font-size: 14px;
                color: #41B3EE;
                cursor: pointer;
            }
            .detailbox{
                text-overflow:ellipsis;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 6;
            }
            .hidden{
                overflow: hidden;
                display: -webkit-box;
            }
        }

    }
    section.product{
        margin-top: 10px;
        background: white;
        padding-bottom: 15px;
        .blank{
            width: 100%;
            height:30px;
        }
        .cell{
            height: 60px;
            line-height: 60px;
            margin: 0 20px;
            position: relative;
            span{
                display: inline-block;
                background: #FF5523;
                border-radius: 5px;
                font-size: 14px;
                color: #FFFFFF;
                height:19px;
                line-height: 19px;
                padding: 1px 8px;
            }
            i{
                top:23px;
            }
        }
        .pro{
            margin: 0 20px 15px;
            .imgbox{
                width: 31%;
                float: left;
                img{
                    width: 100%;
                    display: block;
                    border-radius: 7px;
                }
            }
            .textbox{
                width: 68%;
                float: left;
                padding-left: 10px;
                box-sizing: border-box;
                p{
                    font-size: 14px;
                    color: #333333;
                    line-height: 19px;
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    white-space: normal;
                }
                .price{
                    font-size: 17px;
                    color: #FC5A3F;
                    letter-spacing: 0;
                    margin-top: 4px;
                    span{
                        font-size: 12px;
                        color: #FC5A3F;
                        letter-spacing: 0.5px;
                    }
                }
            }

        }
    }
    section.picandprice{
        margin-top: 10px;
        background: white;
        .picbox{
            img{
                width: 100%;
                display: block;
            }
        }
        .pricebox{
            border-top: 0.5px solid #DFDFDF;
            min-height:60px;
            margin: 0 20px;
            padding:11px 0;
            box-sizing: border-box;
            p{
                font-size: 14px;
                color: #333333;
                line-height: 19px;
                width: 74%;
                float: left;
            }
            .price{
                width: 26%;
                float: left;
                text-align: right;
                font-size: 17px;
                color: #FC5A3F;
                letter-spacing: 0;
                span{
                    font-size: 12px;
                    color: #FC5A3F;
                    letter-spacing: 0.5px;
                }
            }
        }
        .pricebox:first-child{
            border: none;
        }
    }
    section.picanddescribe{
        margin-top:10px;
        background: white;
        .imgbox{
            img{
                width: 100%;
                display: block;
            }
        }
        .content{
            margin: 0 20px;
            padding-bottom: 30px;
            h3{
                height:50px;
                line-height: 50px;
                font-size: 17px;
                color: #333333;
            }
            p{
                font-size: 14px;
                color: #333333;
                line-height: 22.5px;

            }
        }
    }
    section.picbottomtext{
        margin-top:10px;
        background: white;
        .imgbox{
            height:100%;
            position: relative;
            img{
                width: 100%;
                display: block;
            }
            .mask{
                height:75px;
                padding:0 20px;
                position: absolute;
                bottom:0;
                left: 0;
                box-sizing: border-box;
                width: 100%;
                background-image: linear-gradient(-180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.50) 100%);
                span{
                    background: #FFFFFF;
                    border-radius: 5px;
                    font-size: 14px;
                    color: #333333;
                    padding: 1px 7px;
                }
                p{
                    font-size: 19px;
                    color: #FFFFFF;
                }
            }

        }

    }
    .icon-rightarrow{
        height: 13px;
        width: 13px;
        position: absolute;
        right: 0;
        top: 16px;
        display: inline-block;
        background-repeat: no-repeat;
        background-size: contain;
        background-position-x: right;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAaCAYAAABozQZiAAAAAXNSR0IArs4c6QAAAP1JREFUOBGd1L0OgjAQB3B7HcDVwUkXfRNdNXF19C0IYWAiPAuJkzOGRzHszpJgU+8IIRJa+nEJoQn9/VvS5hYLrKIoOD00dimWJMm+bduKMSYB4JZlWWkbAEKIA07eSCm3OH7EcXy0xkEQ3HFy3YOlSwAjFEXRDl8Vrd6HfDjnZ9MvdNg3YMA+ASPsGjDBLgFKbBugxTYBs9gUYMSqALzK7zAM10AfXQsvk0ADRqy6fbjyNU3T7+y2NfCU5/mTdqvFJqjFNlCJbeEEu8ARdoUD9oGEAc9rhe9RF8FzHI6DJukKmqa5/LcfW0iBgL2qRPDCce0CCXeFWwefpv8D2gjWTj2lkbMAAAAASUVORK5CYII=);
    }

}

    .page{
        .ay_tab_bd{
            padding-bottom: 44px;
            &::-webkit-scrollbar{
                display: none;
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
      Headerbar,
    },
    data (){
      return {
        IsHide:true,
        PageData:"",
        IsHide:true
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
          this.$http.get('/static/rushidata.json').then((response) => {
              this.PageData = response.data.Data
                   }, (response) => {

                   });

      },
      More:function(){
        this.IsHide = !this.IsHide
      }
    },
    ready() {
      this.takeData()

    }

  }


</script>
