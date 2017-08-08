<template>
    <div class="page detail">
        <view-box>
            <div class="ay-header-box" slot="header">
                <div class="headshade"></div>
                <div class="header-cover" :style="{opacity:isOpacity}"> <h1 class="hidetitle">{{mainDesMain.Name}}</h1></div>
                <headerbar>
                    <span slot="left" class="icons icon-arrow" v-on:click='back()'></span>
                    <span slot="right"  class="icons icon-share" v-on:click="share()" v-if="showShare"></span>
                </headerbar>

            </div><!--0216 F-->

            <div class="page-inner" @touchMove="touchmovefunc" @scroll="scrolldrfunc">

                <!--banner图-->
                <div class="banner">
                    <img :src="mainDesMain.BannerImg+'?imageView2/1/w/375/h/230/q/90'">
                    <div v-show="isTitleMaskShow" class="ban-title"><!--0216 F-->
                        <h2>{{mainDesMain.Name}}</h2>
                        <p>{{mainDesMain.NameEN}}</p>
                    </div>
                </div>
                <!--国家简介-->
                <section class="ay-section" v-if="mainDesMain.TypeId==1&&mainDesMain.Summary!=null"><p class="summary">{{mainDesMain.Summary}}</p></section>
                <!--城市宝典-->
                <section class="ay-section" v-if="mainDesMain.TypeId==2&&DesSub!=undefined&&DesSub.length>0">
                    <cell title="遨游宝典"></cell>
                    <ul class="hotcity">
                        <li class="hotlist" v-for="item in DesSub">
                            <a  class="checker"  v-link="{path:'book', query:{destId: destId,tid:item.TypeId,destname:destName}}">{{item.TypeName}}</a>
                        </li>
                    </ul>
                </section>
                <!--国家导航链接-->
                <section  class="ay-section" v-if="mainDesMain.TypeId==1">
                    <div class="ay-linkbar">
                        <a class="link" v-for="item in link" v-on:click='pageGoTo(item)'>
                            <span class="btn-icon">
                                <img :width="item.width" :height="item.height" :src="item.imgSrc">
                            </span>
                            <span class="word">{{item.word}}</span>
                        </a>
                    </div>
                </section>
                <!--玩法推荐-->
                <section class="ay-section" v-if="RecommendItinerary!=null&&RecommendItinerary.length>0">
                    <cell title="玩法推荐" v-if="DestPlayMethodCount>2" v-link="{path:'play',query:{'destId':destId,'destname':destName}}" :is-link="DestPlayMethodCount>2"></cell>
                    <cell title="玩法推荐" v-if="DestPlayMethodCount<=2"></cell>
                    <div class="recommend-item bh" v-for="item in RecommendItinerary" v-link="{path:'playdetail',query:{'destId':destId,'itinId':item.Id,'destname':destName}}">
                        <a >
                            <h3  class="title">{{item.Title}}</h3>
                            <div class="sub-infor">
                                <span :class='{"tag-p":$index==0,"text":$index>0}'  v-for="subItem in item.Tags">{{subItem.Value}}</span>
                            </div>
                            <div class="rec-center">
                                <div class="left rec-desc">
                                    <p>{{item.Summary}}</p>
                                </div>
                                <a class="right rec-img"><img src="http://pic1.aoyou.com/wap4.0/index/bg-s.png?imageView2/1/w/135/h/90/q/90"  v-lazyload:opt.fadein="item.BannerImg+'?imageView2/1/w/135/h/90/q/90'"></a>
                            </div>
                            <div class="rec-bot">
                                <div class="rector left">
                                    <span class="referee-img">
                                        <img :src="item.AuthorImg+'?imageView2/1/w/30/h/30/q/90'">
                                    </span>
                                    <span class="referee-label">
                                        <p class="name">{{item.AuthorName}}</p>
                                        <p>{{item.AuthorLabel}}</p>
                                    </span>
                                </div>
                                <div class="right relate">
                                    <span><i class="icon-calender"></i><em>{{item.Duration}}天</em></span>
                                    <span><i class="icon-scenery"></i><em>{{item.SiteCount}}个景点</em></span>
                                </div>
                            </div>
                        </a>
                    </div>
                </section>
                <!--国家导航链接-->
                <section  class="ay-section" v-if="mainDesMain.TypeId==2">
                    <div class="ay-linkbar">
                        <a class="link" v-for="item in link" v-on:click='pageGoTo(item)'>
                            <span class="btn-icon">
                                <img :width="item.width" :height="item.height" :src="item.imgSrc">
                            </span>
                            <span class="word">{{item.word}}</span>
                        </a>
                    </div>
                </section>
                <!--国家热门城市-->
                <section class="ay-section" v-if="mainDesMain.TypeId==1&&hotCities!=null&&hotCities.length>0">
                    <cell title="热门城市"></cell>
                    <ul class="dest-list">
                        <li  v-for="hotCity in hotCities" v-on:click='toOtherDes(hotCity.Id)'>
                            <a :href="hotCity.linkUrl" class="dest-item">
                                <div class="dest-img">
                                    <img src="http://pic1.aoyou.com/wap4.0/index/bg-s.png?imageView2/1/w/105/h/70/q/90" v-lazyload:opt.fadein="hotCity.BannerImg+'?imageView2/1/w/105/h/70/q/90'">
                                </div>
                                <p class="name">{{hotCity.Name}}</p>
                                <p class="site">{{hotCity.SubTitle}}</p>
                            </a>
                        </li>
                    </ul>
                </section>
                <!--城市游记精选-->
                <section class="ay-section" v-if="TravelNotes!=undefined&&TravelNotes.length>0">
                    <cell title="精选游记" :is-link="false" ></cell>
                    <div class="recommend-item" v-for="item in TravelNotes" v-on:click="toTravelNoteDetail(item)">
                        <div class="rec-center">
                            <div class="left rec-desc">
                                <h3 class="title">{{item.title}}</h3>
                                <p v-if="false">{{item.subject}}</p>
                            </div>
                            <a class="right rec-img"><img src="http://pic1.aoyou.com/wap4.0/index/bg-s.png?imageView2/1/w/135/h/90" v-lazyload:opt.fadein="item.pic_path+'?imageView2/1/w/135/h/90'" style="width:128px;height:71px"></a>
                        </div>
                        <div class="rec-bot">
                            <div class="rector left">
                                <span class="referee-img">
                                    <img :src="item.userAvatar">
                                </span>
                                <span class="referee-label">
                                    <p class="name">{{item.user_nick_name}}</p>
                                    <p v-if="false">{{item.customerstatus}}</p>
                                </span>
                            </div>
                            <div class="right relate" style="padding:0 12px; box-sizing: border-box;">
                                <span><i class="icon-see"></i><em>{{item.hits>100000?"10万+":item.hits}}</em></span>
                                <span><i class="icon-zan"></i><em>{{item.recommendAdd>99?"99+":item.recommendAdd}}</em></span>
                            </div>
                        </div>

                    </div>
                </section>
                <section class="ay-section" v-if="recomProduct!=null&&recomProduct.length>0">
                    <cell title="超值热卖"></cell>
                    <ul class="product-list">
                        <li class="list-item" v-for="itemProduct in recomProduct" v-on:click='toProductDetail(itemProduct.ProductId,itemProduct.ProductType)'>
                            <a :href="itemProduct.ProductUrl">
                                <div class="img">
                                    <img src="http://pic1.aoyou.com/wap4.0/index/bg-s.png?imageView2/1/w/80/h/80/q/90" v-lazyload:opt.fadein="itemProduct.ImageUrl+'?imageView2/1/w/80/h/80/q/90'">
                                    <span class="tag" :class="{'tag-type-1':itemProduct.ProductType==4,'tag-type-2':itemProduct.ProductType==1}">{{itemProduct.ProductTypeName}}</span>
                                </div>
                                <div class="title">{{itemProduct.ProductTitle}}</div>
                                <p class="subtitle">{{itemProduct.ProductSubTitle}}</p>
                                <div class="price">
                                    ¥{{itemProduct.Price}}<span>起</span>
                                </div>
                            </a>
                        </li>
                    </ul>
                </section>
                <!--国家热门城市-->
                <section class="ay-section" v-if="mainDesMain.TypeId==2 && hotCities!=null&&hotCities.length>0">
                    <cell title="查了此地的人还看了"></cell>
                    <ul class="dest-list">
                        <li  v-for="hotCity in hotCities" v-on:click='toOtherDes(hotCity.Id)'>
                            <a :href="hotCity.linkUrl" class="dest-item">
                                <div class="dest-img">
                                    <img src="http://pic1.aoyou.com/wap4.0/index/bg-s.png?imageView2/1/w/105/h/70/q/90" v-lazyload:opt.fadein="hotCity.BannerImg+'?imageView2/1/w/105/h/70/q/90'">
                                </div>
                                <p class="name">{{hotCity.Name}}</p>
                                <p class="site">{{hotCity.SubTitle}}</p>
                            </a>
                        </li>
                    </ul>
                </section>
                <div class="ending">
                    <p><span>已到底线</span></p>
                </div>
            </div>
        </view-box>
    </div>
</template>
<style lang="less">
    @import '../../styles/index.less';
    @import '../../styles/ayui/base/reset.less';
    .detail {
        .ay_tabbar_item.ay_bar_item_on .ay_tabbar_label {
            color: #FF5523;
        }
        .ay-tab .ay-tab-item {
            background: none;
        }
        .ay-tap-active:active {
            background-color: transparent;
        }
        .ay_tabbar_icon+.ay_tabbar_label {
            margin-top: 0;
        }
        .ay_tabbar_item {
            padding: 7px 0 5px;
        }
        .ay_tab_bd {
            padding-bottom: 0;
        }
        .ay_cell_ft.with_arrow:after {
            top: 24px;
            right: 22px/*0216 F*/
        }
        .ay-header-box {
            /*position:fixed;*/
            /*0216 F*/
            position: absolute;
            /*0216 F*/
            top: -1px;
            /*0216 F*/
            left: 0;
            /*0216 F*/
            height: 44px;
            width: 100%;
            z-index: 9;
            -webkit-transform: translate3d(0, 0, 0);
            /*0216 F*/
            transform: translate3d(0, 0, 0);
            /*0216 F*/
            -webkit-backface-visibility: hidden;
            /*0216 F*/
            -webkit-perspective: 1000;
            /*0216 F*/
            .header-cover {
                width: 100%;
                height: 44px;
                top: 0;
                position: absolute;
                margin: 0 auto;
                background-color: @x-header-background-color;
                opacity: 0;
                z-index: 2;
            }
            .tran-opacity {
                opacity: 1;
                transition: opacity 2s;
                -moz-transition: opacity 2s;
                -webkit-transition: opacity 2s;
                -o-transition: opacity 2s;
            }
            .ay-header-bar {
                background-color: transparent;
            }
        }
        .hidetitle{
            margin: 0 50px;
            text-align: center;
            height: 44px;
            line-height: 44px;
            text-align: center;
            font-size: 18px;
            font-weight: 400;
            width: auto;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: @x-header-title-color;
            -webkit-font-smoothing: antialiased;
        }
        .banner {
            position: relative;
            img {
                display: block;
                width: 100%;
                height: 230px;
            }
        }
        .ay-section:last-child {
            margin-bottom: 0;
        }
        .ay-section {
            position: relative;
            background-color: #ffffff;
            margin-bottom: 10px;
            &:after {
                content: "";
                display: table;
                clear: both;
            }
            .ay_cell {
                height: 60px;
                line-height: 60px;
                font-size: 19px;
                padding: 0 20px;
            }
        }
        .summary {
            padding: 15px 20px 30px;
            line-height: 27px;
            text-align: justify;
            color: #333333;
            font-size: 16px;
        }
        .ban-title {
            padding: 0 20px;
            position: absolute;
            box-sizing: border-box;
            height: 75px;
            bottom: 0;
            width: 100%;
            color: #fff;
            background-color: rgba(0, 0, 0, .2);
            font-family: "Heiti SC";
            h2 {
                padding: 10px 0 5px;
                line-height: 1;
                position: relative;
                z-index: 2;
                font-size: 28px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            p {
                line-height: 1.2;
                position: relative;
                z-index: 2;
                font-size: 18px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
        .ay-linkbar {
            height: 100px;
            overflow: hidden;
            .link {
                display: inline-block;
                width: 25%;
                text-align: center;
                padding: 20px 0;
                float: left;
            }
            .btn-icon {
                display: inline-block;
                width: 40px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                vertical-align: middle;
                color: #fff;
                background-repeat: no-repeat;
                background-size: 40px;
                -webkit-transition: -webkit-transform 0.3s;
                transition: -webkit-transform 0.3s;
                transition: transform 0.3s;
                transition: transform 0.3s, -webkit-transform 0.3s;
                img {
                    vertical-align: middle;
                }
            }
            .word {
                display: block;
                font-size: 12px;
                line-height: 14px;
                color: #333;
                text-align: center;
                margin-top: 6px;
            }
        }
        .hotcity {
            padding: 0 20px;
            &:after {
                content: "";
                display: table;
                clear: both;
            }
            .hotlist {
                display: block;
                float: left;
                margin-bottom: 15px;
                box-sizing: border-box;
                width: 30%;
                margin-right: 5%;
                text-align: center;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                line-height: 1.2;
                &:nth-child(3n) {
                    margin-right: 0;
                }
            }
            .checker {
                padding: 6px 0;
                border: 1px solid #999999;
                display: block;
                border-radius: 100px;
                color: #333333;
                font-size: 14px;
            }
            .active {
                border: 1px solid #FF5523;
                color: #FF5523;
            }
        }
        .dest-list {
            padding: 0 15px 15px;
            /*0216 F 向上挪了几行*/
            &:after {
                content: "";
                display: table;
                clear: both;
            }
            .dest-img {
                img {
                    border-radius: 6px;
                    height: 3.5rem;
                }
            }
            li {
                box-sizing: border-box;
                float: left;
                padding: 0 5px 15px;
                width: 33.33%;
                p {
                    line-height: 1;
                }
                .name {
                    font-size: 16px;
                    color: #333333;
                    margin-top: 9px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .site {
                    font-size: 12px;
                    height: 15px;
                    color: #666666;
                    margin-top: 3px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
            .dest-img {
                img {
                    width: 100%;
                    display: block;
                }
            }
        }
        .recommend-item:last-child {
            &:after {
                border-bottom: 0;
            }
        }
        .recommend-item {
            &:after {
                content: "";
                margin: 17px 0;
                display: block;
                border-bottom: 1px solid #DFDFDF;
            }
            padding: 0 20px;
            .title {
                font-size: 19px;
                padding: 10px 0 0;
                margin-bottom: 10px;
                overflow: hidden;
                color: #333333;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                line-height: 1.2;
                font-weight: normal;
            }
            .left {
                width: 60%;
                float: left;
                box-sizing: border-box;
                padding-right: 15px;
            }
            .right {
                width: 40%;
                float: left;
            }
            .rec-desc {
                color: #666666;
                font-size: 14px;
                line-height: 23px;
                text-align: left;
                /*0216 F*/
                p {
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 4;
                    overflow: hidden;
                    -webkit-box-orient: vertical;
                }
            }
            .rector {
                display: flex;
                align-items: center;
            }
            .rec-img {
                img {
                    width: 100%;
                    border-radius: 6px;
                    display: block;
                }
            }
            .rec-center {
                .title {
                    padding-top: 0;
                }
            }
            .rec-center,
            .rec-bot {
                &:after {
                    content: "";
                    display: table;
                    clear: both;
                }
            }
            .rec-bot {
                height: (30rem/20);/*0228 F*/
                margin-top: 10px;
                display: -webkit-flex;
                display: flex;
                align-items: center;
                color: #999999;
                font-size: 12px;
                overflow: hidden;
            }
            .referee-img {
                float: left;
                display: block;
                width: (30rem/20);/*0228 F*/
                height: (30rem/20);/*0228 F*/
                border-radius: 50%;
                overflow: hidden;
                img {
                    width: (30rem/20);/*0228 F*/
                    height: (30rem/20);/*0228 F*/
                    vertical-align: middle;
                }
            }
            .referee-label {
                color: #999999;
                font-size: 12px;
                line-height: 1;
                margin-left: (10rem/20);/*0228 F*/
                float: left;
                p {
                    line-height: 1.2;
                    width: 7rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    font-size: 12px;
                }
                .name {
                    color: #333333;
                }
            }
            .relate {
                em {
                    font-style: normal;
                    margin-left: 2px;
                }
            }
        }
        .sub-infor {
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            font-size: 12px;
            color: #FF595F;
            margin-bottom: 10px;
            .text {
                padding-left: 4px;
                -webkit-flex: 1;
                flex: 1;
                height: 15px;
                -webkit-box-flex: 1;
                -moz-box-flex: 1;
                -ms-flex: 1;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
        .tag-p {
            padding: 2px 8px;
            line-height: 1;
            background-color: #FF595F;
            color: #fff;
            border-radius: 100px;
            -webkit-font-smoothing: antialiased;
        }
        .product-list {
            padding: 0 20px;
            .list-item:last-child {
                &:after {
                    border-bottom: 0;
                }
            }
            .list-item {
                &:after {
                    width: 100%;
                    content: "";
                    display: table;
                    clear: both;
                    border-bottom: 1px solid #DFDFDF;
                    margin: 12px 0;
                }
            }
            .img {
                position: relative;
                overflow: hidden;
                margin-right: 10px;
                border-radius: 5px;
                float: left;
                width: 80px;
                height: 100px;
                img {
                    border-top-left-radius: 5px;
                    border-top-right-radius: 5px;
                }
            }
            .title {
                overflow: hidden;
                display: -webkit-box;
                margin-bottom: 6px;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                white-space: normal;
                font-size: 16px;
                line-height: 20px;
                padding-top: 1px;
                color: #333;
            }
            .subtitle {
                overflow: hidden;
                display: -webkit-box;
                margin-bottom: 4px;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                white-space: normal;
                font-size: 12px;
                line-height: 15px;
                padding-top: 1px;
                color: #999999;
            }
            .tag {
                text-align: center;
                color: #fff;
                font-size: 12px;
                padding: 2px 0;
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                background-color: #394a59;
                height: 16px;
                line-height: 16px;
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
            }
            .price {
                color: #FC5A3F;
                -webkit-font-smoothing: antialiased;
                font-size: 19px;
                line-height: 1;
                span {
                    font-size: 12px;
                }
            }
            .tag-type-1 {
                background-color: #FF6602;
            }
            .tag-type-2 {
                background-color: #70C100;
            }
        }
        .icon-arrow {
            display: block;
            width: 20px;
            height: 37px;
            background-size: contain;
            background-repeat: no-repeat;
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAlCAYAAABCr8kFAAAAAXNSR0IArs4c6QAAAK1JREFUSA1jYKAC+P//vxoQq1LBKAYGoEEVQPwPii0pMhRoSCUQI4MIsg0EmoJu2G6gGBtZBuIwjHPUMNwhMBpmuMMGl8xomOEKGdzi1A6zZKCByABUapCX0UFuBmreiWTaRYoMA5rHBMSPQQZDgQ6QDoFxyKKBLhIG4gtIrvwLZMeQZRhM06iho2E6mqQQWWo0R9GmQNGDFThk0VhKqSSyDELWBDV0EpCeDMQ8AENl84CRONqNAAAAAElFTkSuQmCC");
        }
        .icon-share {
            display: block;
            width: 20px;
            height: 37px;
            background-size: contain;
            background-repeat: no-repeat;
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAmCAYAAABDClKtAAAAAXNSR0IArs4c6QAAAt1JREFUWAnNmDtoFGEQx3OnJoKKoIIi2GphESXaWAiClYiFWKcQBG3iAwULH6i1rZ1KrNTaFwhWCkIsIlhZuFgqKAhpNOL5m3NmnX3c3vft3iMDw8x+38x/fvfdZW9zExMjsk6nc2hEo8LGAHQLF7se1qFVNOzBH+Of8Bg7UTUIIQMyzWtV9eke1WfwX9YVGU+lQrkEnTyQSVeDUTWN1wWSIaVQrPcCkh6x3mBsyltm9ppkZ+4FR1+icdMENf7OXdtlORi7iVUQhwH0BN0/OkPic80tFMFsR2L0keQakMifkADtEG21r8QpPA92NSNl1RIzG5EXtJcBTbK+V7TVFkWWXMBe2KLG/2B+I5IjLUfjhtchlxOaVICjbu+ZNbG2Fi8Hcw21Tor+416DXICm3PCLbv+OrStwGdglOcrUfENoTnMbf6AiT4kpkA6e1z0Jp/O6rHmw71zPNIbSwQJ2Ds8A6d4i62YH8lBaI2AP8ZnuvlVLLGtosobkZtxuB8vk60P02iFFDWrkyaCl/W9brdZSiNawoY45iJcur0450tSqK+N2EV2HL6XiPIUEK7imgX6m0D3ptN8HA0mhaxwYFJqr8I9O+/xKgJp1QN/IN4wVCoBN+BcHdSUEiPrd6tsH/vYhLDdBs88kQfcma5A4UCj0Lntx8iMhpyQ1vi97EapQUofoBdzu3jIj8+Vb0pJZkgazxlAIrcZvm6DGV7Kemdrnwvc3gkLoIP7BC5IL0MY+DIVtr1ELCoF9+BsvpPkjYvfhrjC1z4LXqgt12IuQ/8DP4vbl2wehuO316kJtUZGfxPv4tuKYuBXV64ZaUDKO7ll8a9zo3tUeqiUXVsrzTu3jN4260XMM+3mqFuOKhUrs5XCEjf9tN62YyNxdrj6Rk3rnFu6NGkzn3XUMC/JBn2ZhAV/jNsaVLjN4f5s/OHlUncNlYZwm8+eU5x8HJ2Y/Lybko7SEYfIbmbxjXfsLTJkSG5HZr6UAAAAASUVORK5CYII=");
        }
        .icon-calender {
            display: inline-block;
            width: 14px;
            height: 14px;
            vertical-align: -2px;
            background-size: contain;
            background-repeat: no-repeat;
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAAU9JREFUSA3tVkGKwkAQdMKw3r0pu2/wCXr1A3lAIMkP9hH+IBvIVcgHvOoTfMMuejNnJRCrw/QwG4kEHfrkQGdmejpVU50OtBr1jLIsP6qquiilrkmSjHvCrHtofGDfEFqIEyoSluf5Z9M0a9gS2yn5PI4TPssO9h3H8Z8yZAeQTTyS3EGB8Ayba6Nsgs0WltAtKHpoETByX7wR9AOeFWLXgUnjyCVjEB8zCdBapwZrQUXTfjNW5oOkixFF0S/5IG6mu4e8D8PwinVbVOx7NA+NF/8txAlVlmXNo1T5PhNXaIsmTdPBBfKMas6kuEJxQptSN00sn31uup89Yyxxhfa3cFXwbXzOnBlxheKE76LxVjdu0ZwItSiKL2/oHSDGRldxDPDY0Xld1xn1H53Yl7eESdgGaC/etQVtr4j2DUo3uEWb3pdl/QegvnQDmxPXDUn3rjqj5JwoAAAAAElFTkSuQmCC");
        }
        .icon-scenery {
            display: inline-block;
            width: 15px;
            height: 13px;
            vertical-align: -2px;
            background-size: contain;
            background-repeat: no-repeat;
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAaCAYAAABPY4eKAAAAAXNSR0IArs4c6QAAA7tJREFUSA3tlVtI03EUx3dzaQpNAi+0lwoD7QIRKVHRgwVdsBBDqMFqzakkJJRdMKIiH6IsXyJ1GpqYlBSS0AxCRuizQQ9liZHli1FsqNPS3PqctY2/lzmXXV76wfmf8/ud8z3f3+/8Ln+16je02tra1Wq1+jipNvh8vjXYSdhD2K/R7QkJCfdNJpNrJpV65kA0/bq6OqPX662E7CBE2nBY/G78FYWFhTexfcG4BZPX19dnTk1NDRcVFfUKmP46iDtIaiThV4YakUf03+r1+k/EJmNvR8zILnwq4h7HxsaazGazx9+XT6TW2tqqd7vdPSQZTUxM3Do8PJxO8m5wy5BOjUZjstlsQ+HyMNHdxDfjXy4TIDZXKqAJB1COu1yucojXMpbFJMpIZMcW4gfInvmI8asKCgqeUo0tmF/Ic8But5+U8YhlJ1BIe5AYgBI/KTbyIS4uLiNYQvoRW6ACHazaHR8fv2relUOmQe4geqSG7LLiGMD9iDUaYpmZVADcM3IZPB7PoXnJmekJMFkABnU63VmkDHsAsFytTEkYbQPXJBhy5IQl5xqtJKAiEFhstVpHRDhcVhLg8l2UE/8L5F2CIUd6WHKS25F44lq4Xk+CJJSuE7sWn56r1uh0OnVB30zNednMIvYqx7Varf9WgE+ZkxyABedOQJ+RUiVYbIPBcBr1nphNfX1952b6pc+rl4q/jQk2NDU1yYvnbxMTEysC5tgs8oaGhhQANwIBpaxaJjCt5efnjzJwTMqPvgDRemWAw+FYQr8NEaKk8fHxeoXfHwt2YBb55OTkLQITcTogblGAppn4nAxUszo9+q6y/IODg3Ir5KAOoF1IDltgQ8teZ4umOaeRE5BLsjwCRjjZxT9jwn95Ks/gfYdspPzlEkkVTpHDTA4Psh+RH460qpqammx8RdJBN4ceGcptYD9eMZ4KoISfwG0JitSY8A5inCT7zk04z5ZdBS9588ghpZcJ3UMdRuSwJeN24NsXWjnlrsSRinTzXFajF9RI8pxA2aoYiK+hJeelIDG2iqe1BPUREeKXiH/1fnLuq5TDivMb5S7AGfrtMRaxgZUT3y+BYB8y+StKkMVicdM/InlpGYgsUqWhJEsDPwoBXuYheaMELsTm8I1RcguxLzgHR+eafOCAVhGjg7wR0fhXTrA8Ij1paWnXF0I2Vwyr7WJ823zvvdFoLIernYemEO0N5ZF/dqjzl4zQaaf8Ue3zIubXyxakCz502heR7D806gqE9lyJ/BP7zz7P4vqne/4DfLe721LMvjIAAAAASUVORK5CYII=");
        }
        .icon-see {
            display: inline-block;
            width: 18px;
            height: 13px;
            vertical-align: -2px;
            background-size: contain;
            background-repeat: no-repeat;
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAaCAYAAADfcP5FAAAAAXNSR0IArs4c6QAAA8xJREFUSA3Nl11IFFEUx91xlQqJXIlI7CGwILKCHjJ9sk3q2SCJKHBx/SLIIhD6gAzKQIgwDD92xaCoMKhnI80nzR6CUAmiCEqMCNcIiRB1+/3HmXVdd3a3MvLCmXPmnv8553/v3Llzx5X2Gy0QCGyan58vCofDxYTtRW90uVw5aI/SYIewJ9FfuX2FHjQMY6iqquqL/Kk0VzJQT09P1tTU1DEK+ZHCZPh4fogNI8Hs7OyH5eXl0/Ewdp8joY6OjnXMxkWAp5EsK+A7egh5kZ6ePgzBcTChnJyckPyTk5MeZsRD8by5uTmR348UIesRtWn8LeimmpqaH2ZPzCUuoba2tjJwCtxCcuqG+0jUnZmZ+djn8/2MyZHwlhleywyXQdxHroPkQrk+os/U1dU9iQ1eRoiZuWrNjNaEprqe0QzHBv7JPbkLIdKCmI+eQV4j96XoXBFCgIz29vY7OE8is8jZ2tra2xAKY69Yo46LOqdIeBNxI3epU0GdeRWJEOIxNXJ/Gcc3mB+trq5+JsC/ap2dnaU8iUcQ3ECNKzy+RtUyCcFYz/apNRuHYdwnZ6JmjdRPTCX2TmGxx7C7iA9auRKlSFNdAL3KRTukuiYhZmcERwGdF+i8njALTtbCZkZ3D9PrgO1nlk+wPj47+CPdkDoPoSZqj1B7t0HyA3gLkAmPx3MjgnQwNBqbDEnGkeMUz5XIVh+hXmGEdUgT6bZqToDdJS5ujAp5SdTKpjUTQToYjMiPy6vCbrd7j9/vN/cgC/4gGAz2zs7Oviav18IGHFKZ3aoJrhV8k7gYXHbIw0b3PFGg7YNIpWU3xJAxu62+Bt1EYa2Q+MquLS4GkHzBCH4bH760lyB7AQ8s9Szekcv02dhFT3wrqna+CP33lpGRYa41iIVF6J0YMZrtqTAjaMzClzjhyWX6bKwTzu6fmZnZJpu49wZBb3TDx1BvW9JGUJcFamYBm8eO6CCrr1l9UdhoyDLbri0uLr1qvKL9oCb4am9N9qZRRFu/dnHzTUM3kGgALQIlqGZ0HrqffaUUX8JPDx/fTE4JH8Br6/AabF56u0bVEQqFzqETNhXQpgeoX4WR+wxoQiLbJiNMMjIqZNXMxRwVF3MxMeLV9ekQ01X1cRUhpnp1HT9ESo1FvjoOaAt0Fq4reYTt7u5ewz5zhEXvY5GbR1iqfELqUzrC2sSYqbiHfJIO8niHUznkg9WRVb9MkUM+9i3eQB1dUz/k26Sko36Dqki+L9qXqg2xl0jgr36D4hXTjyJHi2KS69cm6Y8iAxjiiDL4Oz+KvwDV3lceSNIxewAAAABJRU5ErkJggg==");
        }
        .icon-zan {
            display: inline-block;
            width: 15px;
            height: 15px;
            vertical-align: -2px;
            background-size: contain;
            background-repeat: no-repeat;
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAeCAYAAADZ7LXbAAAAAXNSR0IArs4c6QAAA2dJREFUSA2tlkloE1EYxztjFpuk1VCLB60iPbSo9FD0IKJIEZXSnrQVI1S7JEV6FNSDIHhQ9CxiV5DWYnMQwYMLLqBgQTxIwaUqiAhVIti0MY3aLP6+6byQ1KTGOA+++db5/983772Z0UqWGP39/T3JZPIkJS7kLXKpu7t7dIlbcqb0nFEzmEqljmNWIRXINuRab2/vZfQ/jb+RVAqazWZbo2naIczvyLG+vr79Ei905CUJBoMOQDyAhzs7O6cCgcB1/BMCTIc9ogsdeUkikcgGAQHwiwKz2+13TXuTihWi85LE4/EGAaCTjwoIe8qMlatYITovCTfvNgFvKSC3220Tm+7iKlaIzknCepQya+mEHZy8oYBmZ2dll8n4tqAKuxozW1waDocDzHYlRE9Y8M8qD+FO036lYoXoPzoZGhqqguCM3Iy+sgjkqPiQp7tblM/pZpFw0Faw4EEqvcjjzNPN6V8L6S7iMZfLNYYueKQfFwS1zHAMoDru/sQBlMOXOQ7g6NRo0Wh0nANJaSqFm0TJRghhy078hcwQmwDjDmcsYpBA4CNxlYSNwvfoZjmAxNKD2EFx0MtRG9FGTmkzZ8TUhafyhk1Ub5DA+IGA2KMcuJ729vawKlQa8g7qNOVTr+m6rkEi3VWiq9kYErNhVyBHqK2dnp5uMkgSicQ+ChOAnMpFIMB+v/+1IsijH2TGeTo/8C+A26DTzjJYTyOax+PJekSZNxVhP5V7wN2is4hl2LLLZlpbWxOSsGIw4ZeCQyc16S2Mk37eVpD4fL4ZwaETt8776KfpOK0Az4Wht7S0GCQkLSUZHh4uNQnnZfslceYRnR1hNxP/rdjiq02QiFoToxuv12tZN6yFQUITX7NIYrGYZSQczGrpBLJJgwQ2tS7yyrBkQNIkQGA/M0hgk9NZwsm3pBP5CQG8UTAZt7M6YbHUjlhIF3nlo9fBxMsgmuCj9yJrTUg8ZIdd5DW+FbuowynfHeZ2VuYHyTlDywXgPajzSL345gihH1H4nDfrJI8yhA45nc5QW1tbVBWJHhkZKZ+bm9uM2cDk/Oh1yD0+envRJVmzHRgY2A7YYYCbKZYZFTvGHQ5Ho3qjZ5FkIg4ODtawRjsgrIOwhtx6ZBV+Gb4jsxZbfl/fkRtHbnZ1dd1HL3zVSPwGFfNu/QdyENIAAAAASUVORK5CYII=");
        }
    }
</style>
<script>
    import store from '../../vuex/store'
    const commit = store.commit || store.dispatch
    import {
        ViewBox,
        Cell,
        Tabbar,
        TabbarItem,
        Headerbar
    } from '../../components'
    export default {
        components: {
            // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
            // 否则挂载点和组件名字一致, 即vhead
            ViewBox,
            Cell,
            Tabbar,
            TabbarItem,
            Headerbar
        },
        data() {
            return {
                isShade:1,
                isTitleMaskShow: false,
                /*0216 F*/
                backUrl: '/',
                showMoreIti: 0,
                departCity: {},
                channelTypeID: 386,
                destId: 0,
                show1: false,
                isOpacity: 0,
                DesSub: [],
                mainDesMain: [],
                TravelNotes: [],
                hotCities: [],
                recomProduct: [],
                RecommendItinerary: [],
                DestPlayMethodCount: 0,
                showShare:false,
                shareTitle:"",
                shareSubTitle:"实用目的地指南，特色玩法推荐，超值品质旅行，遨游旅行带你玩！",
                shareImg:"",
                destName:"",
                link: [{
                    "linkUrl": "",
                    "imgSrc": 'data:image/png;base64,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',
                    "word": "签证",
                    "width": "29",
                    "height": "29"
                }, {
                    "linkUrl": "",
                    "imgSrc": 'data:image/png;base64,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',
                    "word": "当地玩乐",
                    "width": "25",
                    "height": "25"
                }, {
                    "linkUrl": "",
                    "imgSrc": 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAAA7CAYAAAAkTufiAAAAAXNSR0IArs4c6QAAC4BJREFUaAXtW2lwVMcR7n67ukACgsHGhAiBQaRskwNwQg5CfKUAx0B8o1srAfFBAsY/EjAEY8A4VUAwwVy6QQKTcgUMCGwHYkIqp5NwucoWDgKKEMpgAhYg0O6+zjfzdhetdle7byWBkmKqtO+a+bqnp6d7pqfFdAOLZBV9h8Szl5h+xzWVo28UK8aNItyZ6N4UAkbjphBuCsGalDc1IR5NEBG25NcOv6mOA8TO0eRMmNYOaAEImTfP1uDaqizZ+TMpu3AriCQGKLbhhteuvUCJ3r/QwH6H2wAT1FSy8odT3bFDkuMaEvShlYeYR1Xynr2FPBc/JKFeRLyDeqU9yitWXG0FO+iTzJiRQmcuPEim9yF8GAiMvrj2JZEeuHrxdxp//8bfKWJ+n5zOrVxVchDPMRfJdY0gr/muxmRezTUVT8fSOGYhKDDJK/4Sedy7tSCYa+mWtEdaE4SeOlkFj6BTOWj+PTDXJYQp5it4l4hvoVrJVI9vW8hwvs4bSj8OadvshWQX3AO+3vEJ4E3KzHiK583zNKsS8daWEBQKiA0lk3bjrjdGcxcl0Q+4okJ1JKhIluteEu/P8XKE74NAGH/G/RZ45r8RyylKkFNoe142b3bQ9j19SJpux0imYwWpBDYenbpdt2V2g94aSjLmc3n5GR9e4CK5hV8nj7yNOt1B41cQQFasAlAgtoWgGkn+5LvI3bQHTN5KDscE3lD2lnqvirhcfemKuQ6dGKdfMJ0ElcWUwG+iw0rlYypai/JcX4NQikGnEI0c6GADWJ5P1WVLmFn8QLAD21Dn+3jeTEMGZNsRgMKISwiqoWQX3gmN+CZvLC9Rz6polTTVSAvmO1/Aq8XU53PLedmyRl0hzh+ZVPBFLUiRCT6IzZSWVAjDelk9yzPPpNL5xuk0cewr/MQTyr7YKnELoSUVCCALo1EKDUjGiMFuJD7FG9eebVmvLc+S7RpLYtb45v3f4V4ncHXJybZgqrahxigORMz/PDKl2ieAlZiTY9pbAIotri7bSYYxErd1oDUMO9DfS2EhbFPbSps1ARowEtPiPShlEjRgOtzS8raxFL21FBT0oCapheZ9A6LZR0MyHoAdaIreMnyNNmmCZBf3gwB+7RPA8ushANUN5VHIkTIRduIEaI+iuvqV4bsX29s2CYHEXQUm+oCtd2niuJmxkWyfWrx+9SegOwHadxkaUQxD/WS8yHELQbIKxoH4vWDkDHHKk/FY5XiZ9reD5u0n4R/rZ5FFMmVKgv+bnWtcQvBtUBZrQiwLuGbVf+wQbde6Q/qXAe8wDOVAutT0w3iw4xIC1Z3IAdGhUMWjlDlgdTyE26sNDKKJZdRPNJ5JcyT3ha52seMTAnkLNCHm+W2xynaZjVSfN1TuwID8CfapN8k5tUGzVWwLQYqKesIWjAIVuKRUeIZOUzZpTrzeiXY5si0EatRbYSck/1uuXvGZXYIdVj+RtlrYPM6ugbQvBKKHfcR8RDusW7aAsXY4Bk91AFOiOzW6labGXOwLQShToxv8h5ipXK+KTH/UpLwUc1RJ1bcvBBUNUgWxAH3tXD8+nsSKQ8TIm9Nfzxc+s4yL/2Xg6pjKNWVH9VxruNoL9sBNZWVnqbw8UKNz3AQGxhooMIW9jQvufFIIf8KHeWPFDPU+IARyNiaRmx4IqaxeOChNv3e7sUTGil3odPOghv7WGX7YcQrRLHCi4hm+Ysog3IX2iynFX+WaENLTz2IR9KD/Q9C1W/I/9bM3ySRS8ZEw8cCgBjfqQRw+ykoSVklMKiW3Z4//MXB10Hn/fUAIvkXPb/wfwl6TzU+gLSpWeKsKf3U+bfDZAmEVtdaFK9eqAbQG0feu5cWWYUQ4y43JcA5zLIHyn+vZEuyGPwup6aom7Gk7vNgSggYWfTZAOIPIsEPoutQVukPTYZxd2Cj2hcBkrQ+Ew9sPG8Q7oKrFkzNhnx3sOITg2KUJMI2xQ6ij6yK+8RXtFRBt4sp1H9ihZ18I1HU3CHhgHgcjrhAwrHaIdlBdtbU38bezg/CDYSWnYJTdTUowQsc8Sd6UdGjE4I5Bv4n6/y+BkHMHxPSTycN3wtkinI6EDEMukNH1EFet/DRecXQ4ptc0sLQ/Hy+fASHIJBcOMszZWGjcj8VQcpgOf0BsVBAll8YaWNWYbL4IrPvaDdM67HmxVT6JKxEBL4mVT5b8KXfghHkZmPQFS1T3VRhdEKDgS/ACvXH/ZVytACbTWVjgWTQ4o1QHOVX1FgU7t6Gov9AWJtFsBG1LWsU0ZQFIjb9GTvFJKpHjYhg+lebOahXT5UrjsrIG1md5V80DiN93AeASSjZK8SFoxaVd4ZHjYzA9sPWU+zQTzPtxv4o4oZY2rPsXvfRSAn10Yjix1wXhqe0r3C9Opu1g6sgQr6JkqsVW/SRNneqkBs8IjRk4nqfP0OEllOIoCeFT5Tm8tQN88gzQv98nLAjJeD2A6eeTzEIM7mOUyMP0dJDcoruRK3KKS0vP+RpGvOCk5zEIYykE8IVAJRVfUPuJawVBWGMFdTEWxYQ5Kf9RCGspOpcegAiHyfxLdH5hTJgqQ4YUpvSPiKloMD0bsAmBijHcQDMSkRylkiJywfhICERtXJowTY7ifjvSa9ZES69pSUZjHjnxEHKacqFBsE8BzHpo6XZyGKvbAfM20EXH2cJkWYNTrCMteYnruSMWTtcTM0QTJKdoEBIhhsNT9EPshDFv4CL5IPVI3d9aklZr0utwTJMNREtVkOQQ9Uz7h10+LZugkh/rjmVj/ih3lhm2QwyDxLwRbnIZcpQ+Clun2Uuod2yYRJvIcCyNGfPI8SwyzTmR+URekwAT9gAxxA+bsRTxlnVanttdgxp3+WpdxJw8aLlIgotkZIIINIPu1t8tY/ILZJK9rNyLr03QRbIKJ0CbFuKlPUxKWxDpQAfJmePJ610UhMkYeeusAS4yDJ8ky4m7vRwRM29yJletq2PMvS50semv0AJ1qvQzpNpsDuerreQp5SIZ2WRwf0zID6AqRGFrYbSOwaClgBGk65nKPY7WUmFWRmduREyVdSom3BlNDmCKsR7h31rg1ofHpI+RsjOXBvV/IyyfCtM0pwNvMmgj5oi1BHFVCKYoF0nfwlQfaU2H4uLbqF+/TwHq0cy38iM5hcNAZDkY/3bkaprwHBrSXy2oomPmFX2VPJ7XomIaEOjgDLWgio6p4gtCr0GLR7XOpzwdYhgjNwj+oleFykWaykUS1gxyKeAiudumSCoYjBL8pNcrHhMuUuAi/Zg6q3UbpSa9oXOhg5tEfYqIKcZ2SkvYFA9mVKL/ixWCNEEnOJjn8M9ZMIQscJHYRbJKyoShFGMf15Qet9tJjek9q2wEMOnz0BzYE7hdNrBUbwOm5tPEkroZpuIzkfZZh7Oxc2rZhOxp3UgaXkCnYfgoNUJznDfQe8SOxcgnfCdCncBrGNzudPEqMGl6VEwyXuWa8rcDjSPcSKx8Eu+FSXyVN1TsigAV9Joxt+/B6KCy9LS+qONt2g8NwNW0dpHWKCLp2r+T5C3YG8xU55NBaHiwltTHfwSB/tQm5lZKSJzpOywJgrWW1PXTsDGa1b6YJ76rBpR1hvmWHeqY6gqStWfz+rL3gzjwPSBxO42uyFQIZg6E0Q2v1V5hJ9wiskwZa3HB2R7UU1Rav2ToZozU+2iYV71TgDc3gElqQIzaIEwiLORogMUK0gWdxqxW+Ww0lXucCz5U1rva3CH4GhYzgxw8zpoO2BDB7WDnF70gStQH2aSL0NksEEkK3wJa5OTneX25Em7UIspFX3a/AtszCQyHC+gojIOwJs9zdeXuqICooDEveRZhCiPnOgImMxZbjue0EGIBbVlHp9a66fGAi2SsLomOQuLbKTN9L4RqtmwT7VnbkQb34+iC5SI1ptSD0W3tjukAnw+P3avyL/8LM+31PA6M8j4AAAAASUVORK5CYII=',
                    "word": "观光度假",
                    "width": "32",
                    "height": "29"
                }, {
                    "linkUrl": "",
                    "imgSrc": 'data:image/png;base64,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',
                    "word": "行程定制",
                    "width": "22",
                    "height": "26"
                }]
            }
        },
        methods: {
            //数据请求
            tackData: function() {
                var vm = this
                var useCache = false
                var useProxy = true


                var destParam = {
                    DestinationId: vm.destId
                }
                api.post({
                    path: api.config.microServiceHost.destinationurl,
                    controller: 'Destination',
                    action: 'GetDestnationInfo',
                    param: JSON.stringify(destParam),
                    useCache: useCache,
                    useProxy: useProxy,
                    callback: function(obj) {
                        if (obj.ReturnCode == 0) {
                            var data = obj.Data;
                            vm.DestPlayMethodCount = data.DestPlayMethodCount
                            vm.mainDesMain = data
                            vm.destName=encodeURIComponent(data.Name)
                            vm.isTitleMaskShow = true /*0216 F*/
                            vm.link[0].linkUrl = 'http://m.aoyou.com/Certificate/VisaList?DestinationLabelID=' + data.LabelId
                            vm.link[0].appParam = {LabelIDList:[data.LabelId], SearchCategoryID:7,  cityName:vm.mainDesMain.Name}
                            vm.link[1].linkUrl = 'http://m.aoyou.com/Search/b' + vm.departCity.CityID + '-t6-l' + data.LabelId
                            vm.link[1].appParam = {LabelIDList:[data.LabelId], SearchCategoryID:6,  cityName:vm.mainDesMain.Name}
                            vm.link[2].linkUrl = 'http://m.aoyou.com/Search/b' + vm.departCity.CityID + '-l' + data.LabelId
                            vm.link[2].appParam = {LabelIDList:[data.LabelId], SearchCategoryID:1,  cityName:vm.mainDesMain.Name}
                            // vm.link[3].linkUrl = 'http://m.aoyou.com/s/CustomChannel/Index.html?DeptCityName=' + vm.departCity.CityName + '&DestCityName=' + data.Name + '&forward=' + location.href
                           // vm.link[3].linkUrl="http://m.aoyou.com/tailor.html?desname="+vm.destName+"&wapfrom="+encodeURIComponent(location.href)
                            vm.link[3].linkUrl="http://m.aoyou.com/tailor.html?desname="+vm.destName
                            vm.DesSub = data.DestValuableInfos
                            for (var i = 0, len = data.DestPlayMethodInfos.length; i < len; i++) {
                                var tmp = data.DestPlayMethodInfos[i].AuthorName
                                if (tmp != null) {
                                    tmp = tmp.split('|')
                                    if (tmp.length > 1) {
                                        data.DestPlayMethodInfos[i].AuthorName = tmp[0]
                                        data.DestPlayMethodInfos[i].AuthorLabel = tmp[1]
                                    }
                                }
                                if (data.DestPlayMethodInfos[i].DesTagsJSON != null && data.DestPlayMethodInfos[i].DesTagsJSON.length > 0) {
                                    data.DestPlayMethodInfos[i].Tags = JSON.parse(data.DestPlayMethodInfos[i].DesTagsJSON).filter(function(element, index, array) {
                                        return element.TypeId == '0'
                                    })
                                }
                            }
                            //console.log(data.DestPlayMethodInfos)
                            vm.RecommendItinerary = data.DestPlayMethodInfos
                                //vm.TravelNotes = data.TravelNotes
                            vm.hotCities = data.UnionDestInfos
                            vm.recomProduct = data.DestProductInfos
                            console.dir(data)
                            //初始化微信分享
                            vm.shareTitle="想去"+vm.mainDesMain.Name+"玩？小编已经帮你整理好了！"
                            vm.shareImg=vm.mainDesMain.ShareImg
                            vm.initShareDialog()
                            var searchParam = {
                                "keyword": vm.mainDesMain.Name,
                                "pageNo": 1,
                                "pageSize": 2
                            }
                            api.post({
                                path: api.config.microServiceHost.findurl,
                                controller: 'Precious',
                                action: 'GetSearchList',
                                param: JSON.stringify(searchParam),
                                useCache: true,
                                useProxy: true,
                                callback: function(obj) {
                                    if (obj.ReturnCode == 0) {
                                        var data = obj.Data;
                                        if (data.list != null && data.list.length > 0) {
                                            vm.TravelNotes.splice(0, vm.TravelNotes.length)
                                            for (var i = 0; i < data.list.length; i++) {
                                                vm.TravelNotes.push(data.list[i])
                                            }
                                            console.dir(vm.TravelNotes)
                                        }
                                    }
                                }
                            })
                            commit('UPDATE_LOADING',false)
                        }
                    }
                })

            },
            toPlayList: function() {
                this.$router.go('play?destId=' + this.destId)
            },
            toProductDetail: function(id, tid) {
                window.location.href = api.GetProductDetailUrl(id, tid)
            },
            toOtherDes: function(id) {
                this.$router.go('detail?destId=' + id)
                document.querySelector('.page-inner').scrollTop = 0; /*0216 F*/
            },
            toTravelNotes: function() {
                var url = 'http://m.aoyou.com/find.html#result?key=' + encodeURIComponent(this.mainDesMain.Name)
                location.href = url
            },
            toTravelNoteDetail: function(item) {
                var url = 'http://m.aoyou.com/find.html#detail?t=1&bid=' + item.board_id + '&tid=' + item.topic_id
                location.href = url
            },
            back: function() {
                api.pageBack()
            },
            pageGoTo: function(item) {
                if(item.appParam!=undefined)
                {
                    api.pageGoTo(item.linkUrl, item.appParam,'search')
                }
                else
                {
                    var memberid=api.getMemberId()
                    if(memberid=="")
                    {
                        window.location.href=item.linkUrl+"&memberid=-1"                
                    }
                    else
                    {
                        window.location.href=item.linkUrl
                    }
                   
                }
                api.setCookie("wapfrom", window.location.href,0)
            },
            //app分享
            share: function() {
                api.openShareDialog(this.shareTitle,this.shareSubTitle,window.location.href, this.shareImg, {})   
            },
            //页面touchmove移动时 推荐主题标签置顶、显示回到顶部 START
            touchmovefunc: function() {
                //fix tab 移动大于254px时 置顶推荐主题标签
                if (document.querySelector('.page-inner').scrollTop > 44) {
                    //this.isShade = 0

                    this.isShade = (1-document.querySelector('.page-inner').scrollTop / 250)<0?0:1-document.querySelector('.page-inner').scrollTop / 250
                    console.log(this.isShade)
                } else {
                    this.isShade =1
                }
                if (document.querySelector('.page-inner').scrollTop > 230) {
                    this.isOpacity = 1

                } else {
                    this.isOpacity = document.querySelector('.page-inner').scrollTop / 230
                }
            },
            //wap微信分享
            initShareDialog:function(){
                api.initShareDialog(this.shareTitle,this.shareSubTitle, window.location.href, this.shareImg)
            },
            //页面touchmove移动 END
            //页面scroll滚动时 推荐主题标签置顶、显示回到顶部 START
            scrolldrfunc() {
                //fix tab 移动大于254px时 置顶推荐主题标签
                if (document.querySelector('.detail .page-inner').scrollTop > 230) {
                    this.isOpacity = 1
                } else {
                    this.isOpacity = document.querySelector('.page-inner').scrollTop / 230
                }
            },
            //页面scroll滚动 END

        },
        created() {
            commit('UPDATE_LOADING',true)
            this.departCity = api.getDepCity()
            this.showShare=api.showShare
        },
        route: {
            data: function(transition) {
                if (transition.to != null && transition.to != undefined) {
                    this.destId = this.$route.query.destId || 0
                    this.tackData()
                }
            }
        }
    }
</script>