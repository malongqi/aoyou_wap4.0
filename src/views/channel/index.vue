<template>
    <div class="page base">
        <headerbar class="shade" @on-click-title="scrollTop">
            <span slot="left" class="icons icon-arrow" @click='back()'></span>
            <span class="citys" @click="">自定义维护</span>
            <span slot="right" class="icons icon-share" @click='back()'></span>
        </headerbar>
        <view-box v-ref:view-box>
            <div class="page-inner-rushitour">
                <section class="picandcell">
                    <div class="picbox">
                        <div class="imgcover">
                            <img src='~assets/wap/banner.png'>
                        </div>
                        <div class="mask">
                            <p>为什么这条并不算便宜的欧洲研学产品，备受家长们的欢迎？</p>
                        </div>
                    </div>
                    <div class="title">
                        <span>自定义维护</span>
                    </div>
                    <div class="cellbox">
                        <div class="cell">
                            <p>展示了各种新功能，如嵌套符号覆盖如嵌套符号覆盖</p>
                            <i class="icon-rightarrow"></i>
                        </div>
                        <div class="cell">
                            <p>他们可以直接通过Zeplin在画板上标注或在画板上标注或</p>
                            <i class="icon-rightarrow"></i>
                        </div>
                    </div>
                </section>
                <section class="describe clearfix">
                    <div class="title">
                        <span>自定义维护自定义维护</span>
                    </div>
                    <div class="detail">
                        <p>人到了一个程度很容易保持舒适的姿势去作画可生活的套路有时就是：给你三天的柠檬、一天的糖在舒适范围里呆的久了会将自己裹在无形的茧子里。与其说我喜欢画画不如说着迷于将自我的精神沉浸到一个色彩的世界里。碰撞出新的世界，作为沉迷于绘画并为之夜以继日的一员。</p>
                        <label>更多</label>
                    </div>
                </section>
                <section class="product">
                    <div class="blank"></div>
                    <div class="pro clearfix">
                        <div class="imgbox">
                            <img src='~assets/wap/banner.png'>
                        </div>
                        <div class="textbox">
                            <p>上海杭州研学5日游【遨游研学/原汁原味迪士尼/别具一格杭州风】</p>
                            <div class="price">￥4900<span>起</span></div>
                        </div>
                    </div>
                </section>
                <section class="picandprice">
                    <div class="title">
                        <span>自定义维护</span>
                    </div>
                    <div class="picbox">
                        <img src='~assets/wap/banner.png'>
                    </div>
                    <div class="content">
                        <div class="pricebox clearfix">
                            <p>美国关岛4晚6天百变自由行【美联航北京包机直飞/广场酒店/自备签优惠】</p>
                            <div class="price">￥4900<span>起</span></div>
                        </div>
                        <div class="pricebox clearfix">
                            <p>美国关岛4晚6天百变自由行</p>
                            <div class="price">￥4900<span>起</span></div>
                        </div>
                        <div class="pricebox clearfix">
                            <p>美国关岛4晚6天百变自由行【美联航北京包机直飞/广场酒店/自备签优惠】</p>
                            <div class="price">￥4900<span>起</span></div>
                        </div>
                    </div>
                </section>
                <section class="product">
                    <div class="title">
                        <span>自定义维护自定义维护</span>
                    </div>
                    <div class="pro clearfix">
                        <div class="imgbox">
                            <img src='~assets/wap/banner.png'>
                        </div>
                        <div class="textbox">
                            <p>马来西亚8日游学【探索沙捞越文明/猫城古晋+吉隆坡/红毛猩猩培...</p>
                            <div class="price">￥4900<span>起</span></div>
                        </div>
                    </div>
                    <div class="pro clearfix">
                        <div class="imgbox">
                            <img src='~assets/wap/banner.png'>
                        </div>
                        <div class="textbox">
                            <p>上海杭州研学5日游【遨游研学/原汁原味迪士尼/别具一格杭州风】</p>
                            <div class="price">￥4900<span>起</span></div>
                        </div>
                    </div>
                </section>
                <section class="product">
                    <div class="cell">
                        <span>自定义维护自定义维护</span>
                        <i class="icon-rightarrow"></i>
                    </div>
                    <div class="pro clearfix">
                        <div class="imgbox">
                            <img src='~assets/wap/banner.png'>
                        </div>
                        <div class="textbox">
                            <p>马来西亚8日游学【探索沙捞越文明/猫城古晋+吉隆坡/红毛猩猩培...</p>
                            <div class="price">￥4900<span>起</span></div>
                        </div>
                    </div>
                    <div class="pro clearfix">
                        <div class="imgbox">
                            <img src='~assets/wap/banner.png'>
                        </div>
                        <div class="textbox">
                            <p>上海杭州研学5日游【遨游研学/原汁原味迪士尼/别具一格杭州风】</p>
                            <div class="price">￥4900<span>起</span></div>
                        </div>
                    </div>
                </section>
                <section class="picanddescribe">
                    <div class="title">
                        <span>自定义维护</span>
                    </div>
                    <div class="imgbox">
                        <img src='~assets/wap/banner.png'>
                    </div>
                    <div class="content">
                        <h3>故宫博物馆现文化国贸商城领你感受年味!</h3>
                        <p>最近几年,越来越多的西方时尚巨头开始对中国文化另眼相待,陆续推出了一系列中国...近日,国贸商城的故宫博物院馆藏书画复制品精粹展拉开帷幕,包括《十二美人图》。</p>
                    </div>
                </section>
                <section class="picbottomtext">
                    <div class="imgbox">
                        <img src='~assets/wap/banner.png'>
                        <div class="mask">
                            <span>自定义字</span>
                            <p>自定义维护自定义维护自定义维护</p>
                        </div>
                    </div>

                </section>
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

    .base{
        .page-inner-rushitour{
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

            section.picandcell{
                margin-top: 10px;
                background: white;
                .picbox{
                    position: relative;
                    .imgcover{
                        width: 100%;
                        height: 0;
                        padding-bottom: 75%;
                        overflow: hidden;
                        img{
                            width: 100%;
                            display: block;
                            height:100%;
                        }
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

            section:first-child{
                margin-top: 0;
            }
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
        showPagechoose:false
      }
    },
    methods: {
      scrollTop () {
        var el = this.$refs.viewBox.$els.viewBoxBody
        $(el).animate({ scrollTop: 0 }, 200, null)
      },
      back:function(){
        window.history.back()
      },
      takeData:function(){


      }
    },
    ready() {
      this.takeData()

    }

  }


</script>
