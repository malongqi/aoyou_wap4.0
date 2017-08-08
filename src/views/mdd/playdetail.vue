<template>
    <section class="page-wrap v-transition">
    <div class="page playdetail">
        <view-box>
            <div class="ay-header-box whitetheme" slot="header">
                <div class="header-cover" :style="{opacity:isOpacity}"></div>
                <headerbar>
                    <span slot="left" class="icons icon-arrow" @click='back()'></span>
                    {{PlayDetail.Title}}
                    <span slot="right"  class="icons icon-share" v-on:click="share()" v-if="showShare"></span>
                </headerbar>
            </div>
            <div class="page-inner playdetail" @touchMove="touchmovefunc" @scroll="scrolldrfunc" :class="{'overflow':overflowState}">
                <div class="banner">
                    <img :src='PlayDetail.BannerImg!=null?PlayDetail.BannerImg+"?imageView2/1/w/375/h/375/q/90":""'>
                    <div class="shade"></div>
                    <div class="avatarbox">
                        <img class="avatar" :src='PlayDetail.AuthorImg!=null?PlayDetail.AuthorImg+"?imageView2/1/w/70/h/70/q/90":""'>
                    </div>
                    <div class="right relate">
                        <span><i class="icon-calender white"></i><em>{{PlayDetail.Duration}}天</em></span>
                        <span><i class="icon-scenery white"></i><em>{{PlayDetail.SiteCount}}个景点</em></span>
                    </div>
                </div>
                <section class="ay-section">
                    <p class="autor">
                        <span class="name">{{PlayDetail.AuthorName}}</span>
                        <em class="diver"></em>
                        <span class="label">{{PlayDetail.AuthorLabel}}</span>
                    </p>
                    <h2 class="detail-title">{{PlayDetail.Title}}</h2>
                    <div class="summery">{{PlayDetail.Summary}}</div>
                </section>
                <section class="ay-section">
                    <cell title="行程概览" class="section-title"></cell>
                    <ul class="overview">
                        <li v-for="dayItem in Itinerary"><i class="day">D{{$index+1}}</i>{{dayItem.SubTitle}}</li>
                    </ul>
                </section>
                <div id="content">
                    <section class="ay-section" id="day{{$index+1}}" v-for="(i,schedule) in Itinerary">
                        <sticky scroll-box="view_box_body" :offset="44">
                            <cell class="schedule-title" :title="schedule.Title" :inline-desc="schedule.SubTitle">
                                <i class="day{{$index+1}}" slot="icon">D{{$index+1}}</i>
                            </cell>
                        </sticky>
                        <p class="summery">{{schedule.Summary}}</p>
                        <ul class="itinerary">
                            <li  v-for="(j,lineItem) in schedule.ItineraryItems">
                                <h5 class="tit tit{{$index+1}}" id="name{{i}}{{j}}">{{lineItem.Title}}</h5>
                                <div v-if="lineItem.ImgUrl" class="imgbox">
                                    <img :src="lineItem.ImgUrl+'?imageView2/1/w/335/h/200/q/90'">
                                </div>
                                <p class="summery" :class="[lineItem.ImgUrl!=null ? 'no-padding' : '']" v-html='lineItem.Description|enter'></p>
                                <div class="item-recom" v-if="lineItem.Product">
                                    <a :href="lineItem.Product.ProductUrl"  class="recom-list">
                                        <span class="stit">推荐Recommend</span>
                                        <div class="img">
                                            <img :src="lineItem.Product.ImgUrl+'?imageView2/1/w/80/h/60/q/90'">
                                        </div>
                                        <div class="title">{{lineItem.Product.ProductName}}</div>
                                        <p class="subtitle">{{lineItem.Product.SubTitle}}</p>
                                        <div class="price">
                                            ¥{{lineItem.Product.Price}}<span>起</span>
                                        </div>
                                    </a>
                                </div>
                                <div class="time" v-if="lineItem.OpenTimes">
                                    <i class="icon-time"></i>营业时间:  <span>{{lineItem.OpenTimes}}</span>
                                </div>
                            </li>
                        </ul>
                        <div>
                                    <div class="summery"><span>{{schedule.EndWords}}</span></div>
                                </div>
                    </section>
                </div>
                <section class="ay-section" v-if="RecommendProducts && RecommendProducts.length>0">
                    <cell class="section-title" v-bind:title="PlayDetail.RecommendProductTitle"></cell>
                    <p class="summery no-padding">{{PlayDetail.RecommendProductContent}}</p>
                    <ul class="product-list">
                        <li class="list-item" v-for="itemProduct in RecommendProducts" v-on:click='toProductDetail(itemProduct.ProductId,itemProduct.ProductType)'>
                            <a :href="itemProduct.ProductUrl">
                                <div class="img">
                                    <img :src="itemProduct.ImgUrl+'?imageView2/1/w/80/h/80/q/90'">
                                    <span class="tag" :class="{'tag-type-1':itemProduct.TypeId==4,'tag-type-2':itemProduct.TypeId==1}">{{itemProduct.TypeName}}</span>
                                </div>
                                <div class="title">{{itemProduct.Title}}</div>
                                <p class="subtitle">{{itemProduct.SubTitle}}</p>
                                <div class="price">
                                    ¥{{itemProduct.Price}}<span>起</span>
                                </div>
                            </a>
                        </li>
                    </ul>
                </section>
                <div class="ending">
                    <p><span>已到底线</span></p>
                </div>
            </div>


        </view-box>
        <loading :show="loading"></loading>
        <div v-if="isSideFixed" class="fixedNavBtn" @click="showSideNav"></div>
        <div class="sidenav">
            <div class="shade" @click="closeSideNav" v-show="isNavShow" @touchmove.prevent></div>
            <nav class="nav-list" :class="{right:isNavShow}" @touchmove="preventscroll($event.currentTarget)">
                <div class="nav-head" @touchmove.prevent>
                    <div class="block">
                        <span class="left-btn" @click="closeSideNav"><i class="icons icon-close-black"></i></span>
                    </div>
                    <h3>目录</h3>
                </div>
                <div class="nav">
                    <!--@touchmove="preventscroll($event.currentTarget)"-->
                    <ul>
                        <li class="navitem" v-for="(i,navItem) in Itinerary">
                            <h4 @click="selectNav(i)">Day{{$index+1}}.{{navItem.Title}}</h4>
                            <ul class="subnav">
                                <li v-for="(j,itemList) in navItem.ItineraryItems" @click="selectNav(i,j)"><a>{{itemList.Title}}</a></li>
                            </ul>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
        </section>
</template>
<style lang="less">

    @import '../../styles/index.less';
    @import '../../styles/ayui/base/reset.less';
    .playdetail .page-inner.overflow{
        height: 100%;
        overflow: hidden;
    }
    .page-wrap{
        box-sizing: border-box;
        background: #fff;
        -webkit-overflow-scrolling: touch;
        height: 100%;
    }
    .page.playdetail{
        width: 100%;
        height: 100%;
        font-family: Helvetica, sans-serif;
    }
    .playdetail{
        .ay-sticky{
            background-color: #fff;
            z-index: 8;
            top:0;
        }
        html, body {
            height: 100%;
            width: 100%;
            &::-webkit-scrollbar{
                display: none;
                width:0;
                height:0;
            }
        }
        li{
            list-style: none;
        }
        a{
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }
        em{
            font-style: normal;
        }
        input:focus{
            outline: none;
        }
        .ay_tab_bd{
            overflow:scroll;
            padding: 44px 0 0 !important;
        }
        .ay-fixed{
            background-color: #fff;
            padding: 0 20px;
            box-sizing: border-box;
            left: 0;
            z-index: 8;
            -webkit-overflow-scrolling: touch;
        }
        .page-inner{
            box-sizing: border-box;
            width: 100%;
            height: auto;
            overflow:initial;
            color: #333;
            -webkit-overflow-scrolling: touch;
            &::-webkit-scrollbar{
                display: none;
                width:0;
                height:0;
            }
        }
        .ay-section{
            padding: 0 20px 30px;
            margin-bottom:10px;
            background-color: #ffffff;
        }
        .section-title{
            padding: 0px !important;
            height: 60px;
            .ay_cell_bd > p {
                color: #333;
            }
            .ay_cell_primary{
                font-size: 19px;
                font-weight: bold;
                -webkit-font-smoothing: antialiased;
            }

        }
        .ay-header-box{
            position:absolute;
            top:-1px;
            height: 44px;
            width: 100%;
            z-index: 9;
        }
        .banner {
            position: relative;
            img{
                display: block;
                width: 100%;
                height: 18.75rem;
            }
            .avatarbox{
                position: absolute;
                border-radius: 50%;
                bottom: -35px;
                right: 20px;
                overflow: hidden;
                z-index: 1;
                width: 70px;
                height: 70px;
                display: block;
                box-sizing: border-box;
                .avatar{
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                    box-sizing: border-box;
                }
                &:after{
                    content: "";
                    display: block;
                    border: 4px solid #fff;
                    width: 200%;
                    height: 200%;
                    box-sizing: border-box;
                    left: 0;
                    margin-left: -35px;
                    margin-top: -35px;
                    top: 0;
                    position: absolute;
                    -webkit-transform: scale(0.5);
                    transform: scale(0.5);
                    border-radius: 50%;
                }
            }
            .shade{
                position: absolute;
                bottom: 0;
                width: 100%;
                left: 0;
                height: 70px;
                background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0),  rgba(0, 0, 0, .5));
            }
            .relate{
                color: #fff;
                position: absolute;
                bottom: 0;
                left: 0;
                font-size: 12px;
                padding: 0 20px;
                margin-bottom: 10px;
                -webkit-font-smoothing: antialiased;
                i{
                    margin-right: 7px;
                }
                span{
                    margin-right: 15px;
                }
                em{
                    font-weight: normal;
                }
            }
        }
        .autor{
            padding: 12px 0 0;
            margin-bottom: 12px;
            margin-right: 80px;
            font-size: 12px;
            height: 20px;
            overflow: hidden;
            span{
                position:relative;
            }

            .name{
                color: #333333;
            }
            .label{
                color: #999999;
            }
        }
        .diver{
            position: relative;
            margin: 0 12px;
            &:after{
                content: "";
                height: 14px;
                width: 1px;
                display: block;
                position: absolute;
                top: 1px;
                right: 0;
                clear: both;
                border-right: 1px solid #CCCCCC;
            }
        }
        .detail-title{
            margin: 10px 0 20px;
            font-size: 19px;
            -webkit-font-smoothing: antialiased;
            isplay: -webkit-box;
            display: -moz-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            word-break: break-all;
        }
        .summery{
            padding-top: 10px;
            font-size: 16px;
            text-align: justify;
            line-height: 27px;
            word-break: break-all;
            -webkit-font-smoothing: antialiased;
            p{
                margin-bottom: 26px;
            }
        }
        .no-padding{
            padding-top: 0;
        }
        .overview{
            li {
                font-size: 16px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                word-break: break-all;
                -webkit-font-smoothing: antialiased;
                margin-bottom: 5px;
                .ay_cell_bd > p {
                    color: #333;
                }
                .ay_cell_primary {
                    font-size: 19px;
                    font-weight: bold;
                    -webkit-font-smoothing: antialiased;
                }
                i {
                    width: 40px;
                    height: 40px;
                    display: inline-block;
                    margin-right: 10px;
                    border-radius: 50%;
                    line-height: 40px;
                    text-align: center;
                    color: #fff;
                    font-style: normal;
                    -webkit-font-smoothing: antialiased;
                }
            }
        }
        .schedule-title{
            height: 40px;
            padding: 17px 0 !important;
            font-size: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-flex;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            -webkit-font-smoothing: antialiased;
            margin-bottom: 5px;
            .ay_cell_bd > p {
                color: #333;
                line-height: 1.2;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                word-break: break-all;
            }
            .ay_cell_primary{
                font-size: 19px;
                font-weight: bold;
                -webkit-font-smoothing: antialiased;
            }
            .ay_cell_ft{
                flex: 0;
            }
            .ay-label-desc{
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                font-size: 12px;
                color: #999999;
                font-weight: 300;
                -webkit-font-smoothing: antialiased;
            }
            i{
                width: 40px;
                height: 40px;
                display: inline-block;
                margin-right:10px;
                border-radius: 50%;
                line-height: 40px;
                text-align: center;
                color: #fff;
                font-style: normal;
                -webkit-font-smoothing: antialiased;
            }
        }
        .imgbox{
            margin-bottom: 5px;
            img{
                width: 100%;
                display: block;
                height: 10rem;
            }
        }
        .itinerary{
            padding-top:15px;
            li{
                &:after{
                    content: "";
                    display: block;
                    width: 100%;
                    border-bottom: 1px solid #DFDFDF;
                    margin: 17px 0;
                }
            }
            li:last-child{
                &:after{
                    display: none;
                }
            }
            .tit{
                margin: 10px 0;
                line-height: 24px;
                font-size: 17px;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                word-break: break-all;
                -webkit-box-orient: vertical;
            }
            .time{
                position: relative;
                padding: 13px;
                padding-left: 24px;
                color: #999999;
                font-size: 14px;
                line-height: 1.4;
                -webkit-font-smoothing: antialiased;
            }
            .icon-time{
                position: absolute;
                left: 0;
                top:13px;
            }
        }
        .item-recom{
            margin: 30px 0 15px;
            .recom-list{
                position: relative;
                padding:20px 10px ;
                display: block;
                color:#333333;
                border: 1px solid #DFDFDF;
                &:after{
                    content: "";
                    display: table;
                    clear: both;
                }
                .stit{
                    position: absolute;
                    background-color: #fff;
                    top:-15px;
                    left: 10px;
                    padding: 0 5px;
                }
                .img{
                    position: relative;
                    overflow: hidden;
                    margin-right: 10px;
                    float: left;
                    width: 80px;
                    height: 60px;
                }
                .title{
                    min-height: 40px;
                    margin-bottom: 4px;
                    font-size: 16px;
                    line-height: 20px;
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    white-space: normal;

                }
                .price{
                    color:#FC5A3F;
                    -webkit-font-smoothing: antialiased;
                    font-size: 19px;
                    line-height: 1;
                    span{
                        font-size: 12px;
                    }
                }
            }
        }
        .product-list{
            margin-top: 15px;
            .list-item:last-child{
                &:after{
                    border-bottom: 0;
                }
            }
            .list-item{
                &:after{
                    width: 100%;
                    content: "";
                    display: table;
                    clear: both;
                    border-bottom: 1px solid #DFDFDF;
                    margin: 12px 0;
                }
                a{
                    display: block;
                }
            }
            .img{
                position: relative;
                overflow: hidden;
                margin-right: 10px;
                border-radius:5px;
                float: left;
                width: 80px;
                height: 100px;
                img{
                    border-top-left-radius:5px;
                    border-top-right-radius:5px;
                }
            }
            .title{
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
            .subtitle{
                overflow: hidden;
                min-height: 31px;
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
            .tag{
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
                border-bottom-left-radius:5px;
                border-bottom-right-radius:5px;
            }
            .price{
                color:#FC5A3F;
                -webkit-font-smoothing: antialiased;
                font-size: 19px;
                line-height: 1;
                span{
                    font-size: 12px;
                }
            }
            .tag-type-1{
                background-color: #FF6602;
            }
            .tag-type-2{
                background-color: #70C100;
            }
        }
        .overview,itinerary,.playdetail #content{
            .changecolor1(5);
            .changecolor1(@n, @i: 1) when (@i =< @n) {
                li:nth-child(@{i}) {
                    .day {
                        background: #FFAB0A;
                    }

                }
                section:nth-child(@{i}){
                    .schedule-title i{
                        background-color: #FFAB0A;
                    }
                    h5{
                        color:#FFAB0A;
                    }
                }
                .changecolor1(@n, (@i + 1));
            }

            .changecolor2(10);
            .changecolor2(@n, @i: 6) when (@i =< @n) {
                li:nth-child(@{i}) {
                    .day {
                        background: #FF701B;
                    }

                }
                section:nth-child(@{i}){
                    .schedule-title i{
                        background-color: #FF701B;
                    }
                    h5{
                        color:#FF701B;
                    }
                }
                .changecolor2(@n, (@i + 1));
            }

            .changecolor3(15);
            .changecolor3(@n, @i: 11) when (@i =< @n) {
                li:nth-child(@{i}) {
                    .day {
                        background: #51AE63;
                    }

                }
                section:nth-child(@{i}){
                    .schedule-title i{
                        background-color: #51AE63;
                    }
                    h5{
                        color:#51AE63;
                    }
                }
                .changecolor3(@n, (@i + 1));
            }

            .changecolor4(20);
            .changecolor4(@n, @i: 16) when (@i =< @n) {
                li:nth-child(@{i}) {
                    .day {
                        background: #47B9B1;
                    }

                }
                section:nth-child(@{i}){
                    .schedule-title i{
                        background-color: #47B9B1;
                    }
                    h5{
                        color:#47B9B1;
                    }
                }
                .changecolor4(@n, (@i + 1));
            }

            .changecolor5(25);
            .changecolor5(@n, @i: 21) when (@i =< @n) {
                li:nth-child(@{i}) {
                    .day {
                        background: #2E97D2;
                    }

                }
                section:nth-child(@{i}){
                    .schedule-title i{
                        background-color: #2E97D2;
                    }
                    h5{
                        color:#2E97D2;
                    }
                }
                .changecolor5(@n, (@i + 1));
            }

            .changecolor6(30);
            .changecolor6(@n, @i: 26) when (@i =< @n) {
                li:nth-child(@{i}) {
                    .day {
                        background: #9F3691;
                    }

                }
                section:nth-child(@{i}){
                    .schedule-title i{
                        background-color: #9F3691;
                    }
                    h5{
                        color:#9F3691;
                    }
                }
                .changecolor6(@n, (@i + 1));
            }
        }
        .fixedNavBtn{
            position: absolute;
            right: 0;
            bottom: 45px;
            width: 60px;
            height: 50px;
            border-top-left-radius: 100px;
            border-bottom-left-radius: 100px;
            background-color: #FF5523;
            z-index: 10;
            -webkit-transform: translate3d(0,0,0);
            transform: translate3d(0,0,0);
            -webkit-backface-visibility:hidden;
            -webkit-perspective:1000;/**/
            &:after{
                content: "";
                display: block;
                width: 20px;
                height: 20px;
                background-size: 100%;
                background-repeat: no-repeat;
                background-position: center;
                background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAdCAYAAADYSS5zAAAAAXNSR0IArs4c6QAAAJZJREFUWAntllEKwCAIhnPn2A7URXbxvEfTIJBIFuSe9geysj+Vbw+aaq1ZrIiNS305maVnsZl2fBtxbvlJE0oNp6nDbpmIru540XZZ5JePyGhfxNICbzGeBFef3tnlaa0maj/LHxUbcUAABEAABMIISH/1BgAMCwuUMSwsQHIlGBZcNLgAARD4FQH04r3fjV68w6/14gdO9d2jR1dFXQAAAABJRU5ErkJggg==");
                line-height: 1;
                position: absolute;
                top: 50%;
                left: 50%;
                -webkit-transform: translateX(-50%) translateY(-50%);
                transform: translateX(-50%) translateY(-50%);
                color: #333;
                font-size: 2rem;
            }
        }
        .sidenav{
            .shade{
                position: fixed;
                height: 100%;
                top: 0;
                width: 100%;
                height: 100%;
                width: 100%;
                background-color: #000;
                opacity:.3;
                z-index: 9;
            }
            .subnav{
                &:after{
                    content: "";
                    display: table;
                    clear: both;
                }
                li:nth-child(2n){
                    padding-left: 10px;
                }
                li:nth-child(2n-1){
                    padding-right: 10px;
                }
                li{
                    width: 50%;
                    margin-bottom: 15px;
                    box-sizing: border-box;
                    float: left;
                }
                a{
                    display: block;
                    height: 30px;
                    line-height: 30px;
                    border: 1px solid #999999;
                    text-align: center;
                    border-radius: 100px;
                    color: #333333;
                    font-size: 14px;
                    padding: 0 8px;
                    overflow: hidden;
                    font-weight: 300;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    white-space: normal;
                }
            }
            .nav-head{
                position: fixed;
                box-sizing:border-box;
                width: 100%;
                top:0;
                z-index:9;
                background: #fff;
                padding:0 20px;
            }
            .nav-list{
                box-sizing: border-box;
                top:0;
                right: 0;
                position: fixed;
                height: 100%;
                width:80%;
                background-color: #fff;
                padding:100px 0 0;
                transform:translate(100%,0);
                -webkit-transform:translate(100%,0);
                -moz-transform:translate(100%,0);
                -o-transform:translate(100%,0);
                -ms-transform:translate(100,0);
                transition:All .4s ease;
                -webkit-transition:All .4s ease;
                -moz-transition:All .4s ease;
                -o-transition:All .4s ease;
                z-index: 10;
                h3{
                    line-height: 60px;
                    color: #333;
                    font-size: 19px;
                    border-bottom: 1px solid #DFDFDF;
                }
            }
            .right{
                transition:All .4s ease;
                -webkit-transition:All .4s ease;
                -moz-transition:All .4s ease;
                -o-transition:All .4s ease;
                transform:translate(0,0);
                -webkit-transform:translate(0,0);
                -moz-transform:translate(-0,0);
                -o-transform:translate(0,0);
                -ms-transform:translate(0,0);
            }
            .nav{
                height: 100%;
                overflow-y: scroll;
                padding: 0 20px;
                .navitem{
                    position: relative;
                    font-size: 17px;
                    h4{
                        line-height: 60px;
                    }
                    &:after{
                        content: "";
                        border-bottom: 1px solid #DFDFDF;
                        display: block;
                        width: 100%;
                        margin: 15px 0;
                    }
                }
                .active{
                    color: #FF5523;
                }
            }

        }
        .block{
            box-sizing: border-box;
            height: 44px;
            line-height: 1;
        }
        .left-btn{
            display: inline-block;
            height: 40px;
            width: 40px;
            float: left;
        }
        .icon-close-black{
            display: inline-block;
            width:15px;
            height: 15px;
            margin-top: 13px;
            background-repeat: no-repeat;
            background-size: contain;
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAA6FJREFUaAXV2zuIE0EYB/DsRkEkwUaLPAqrBO8QiySVjciVvgoPH4iVr0KxsjixSClYaaVXKb4KBUUiWEn6JNfYWAZEg6dokdgkmvj/Qibs7WWzMzuP7AwMM7s7uzO/28dNvk2cUqm0x3GcB6PR6EQikegg3261Wm9RWp/K5fJJuO4CkoHxHeo3krlcbh2Vi1i5C3kf8pl8Pv8NaQN1a1OlUrkM1zMAyES2Q0DnkplM5vFkBYpxctDwmM1owg6Hw0fQOBMTK/a7qNFl7E8O7UA7+jfEfRm36KUALA29Q+A15BEt+ZJ1aMLCsI7sP7NEI+NastPpfM5ms1+xcBzZ39CayzsM67rutWaz+TwJZALoDZvRPNhGo0FnPjEG24wWwW4BMzQ9nekpjeXYX96i2G1gWkH/f21AR8HOBNuAjooNBMcZLYOdC44jWhYbCo4TWgWWCxwHtCosN3iRaJVYIfAi0KqxwmCTaB3YSGATaF3YyGCdaJ1YKbAOtG6sNFgl2gRWCVgF2hRWGVgGbRKrFBwFbRpLY/R/yKd10mlOmJSOPUJ86SoiixRUCwy4UQyKhWWkB+Q5gBYwHT8MPRnDrP7pD6IFS31OY1qTASgrwiIn6Mg4lnDawHTwEDQ18SatZ5Z1pBVMnRAaIeDvqFJgMDDhMr6Oe/ZhYANFG+jNg9ZUrVZdvMQ6HNYJHmJHkHaEtZPdrvUME7ZWqz1B2PcCx0CX+/3+gWKx+Kbdbg852kdqog0siGWD147WAubA/obwD/JuJvWUy4PBYKlQKGg508rvYU7sCoBHkX96oNMqboHT3W73hY57etb/wmnHohVeLL5SMf52AaaWB9HHR+S9AX29SqfT5+v1+t+A7cKrlYFFsWykptFKwFGxi0BLg2WxptFSYFVYk+jIYNVYU+hIYF1YE2hhsG6sbrQQ2BRWJ5p7pmUaS2hMUD6hCJyRYdtqr9d7KTIj4zrDi8ASmKWwyQk+fr5OpVLneGZkoeBFY1Wj54LjglWJDgTHDasKPRMcV6wK9DZw3LGy6C1gW7Ay6CnYNmxU9BhsKzYK2rEdK4pOIlh2BzvdZDv6SoourrAYlG9brBbxJfdNvOH4gEGtIs+Khi4h7r2T3gpcCRi5NVg2/rC5N1ldhET/sR08pXVYNvZ5aFiHdIbvs8ZUYvkXCisuY++4vXUP+od3PVnHT2n8ZO0sNpxC3sTKe3iL98Xb0NY6PmXRT/BuYfxZ5Pf4VcvT/9VxHDK/F3xQAAAAAElFTkSuQmCC");
        }
        .icon-calender{
            display: inline-block;
            width: 14px;
            height: 14px;
            vertical-align: -2px;
            background-size: contain;
            background-repeat: no-repeat;
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAAU9JREFUSA3tVkGKwkAQdMKw3r0pu2/wCXr1A3lAIMkP9hH+IBvIVcgHvOoTfMMuejNnJRCrw/QwG4kEHfrkQGdmejpVU50OtBr1jLIsP6qquiilrkmSjHvCrHtofGDfEFqIEyoSluf5Z9M0a9gS2yn5PI4TPssO9h3H8Z8yZAeQTTyS3EGB8Ayba6Nsgs0WltAtKHpoETByX7wR9AOeFWLXgUnjyCVjEB8zCdBapwZrQUXTfjNW5oOkixFF0S/5IG6mu4e8D8PwinVbVOx7NA+NF/8txAlVlmXNo1T5PhNXaIsmTdPBBfKMas6kuEJxQptSN00sn31uup89Yyxxhfa3cFXwbXzOnBlxheKE76LxVjdu0ZwItSiKL2/oHSDGRldxDPDY0Xld1xn1H53Yl7eESdgGaC/etQVtr4j2DUo3uEWb3pdl/QegvnQDmxPXDUn3rjqj5JwoAAAAAElFTkSuQmCC");
            &.white{
                background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAAQ9JREFUSA3tVsENgzAMBFQxQN8wA/OyAN2g73YEdmjpr/++0rvIRgEVqQLjF5ZcJ05yF18diSxbsBBCCad9FrZM0tj31/5icsph4k4Ya4IcFbyDD3BrIyaxK5LlMugxPkf2/X7egG4yYUcIVyGPlBiXTMI2NQ3OUz1i0zoSqoyxZC0QeRNC4gGrhtOenERTIo1ImhEKaeThfxiYyGFKtkdUHvdn4U44SrqHjL8w3Ss86S2OplEltsZR0hRI34zmUrnXrimWe9OMzyKtQm9jGVUZ9wrdCY+mMeubtGleREWiNkOfASXYA5vmJustFiafGbNzq6aC2crhu/tXW4EH/wB7A7/Ao7xyG6tATGI35PoCLaFX2lR9gxIAAAAASUVORK5CYII=");
            }
        }
        .icon-scenery{
            display: inline-block;
            width: 15px;
            height: 13px;
            vertical-align: -2px;
            background-size: contain;
            background-repeat: no-repeat;
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAaCAYAAABPY4eKAAAAAXNSR0IArs4c6QAAA7tJREFUSA3tlVtI03EUx3dzaQpNAi+0lwoD7QIRKVHRgwVdsBBDqMFqzakkJJRdMKIiH6IsXyJ1GpqYlBSS0AxCRuizQQ9liZHli1FsqNPS3PqctY2/lzmXXV76wfmf8/ud8z3f3+/8Ln+16je02tra1Wq1+jipNvh8vjXYSdhD2K/R7QkJCfdNJpNrJpV65kA0/bq6OqPX662E7CBE2nBY/G78FYWFhTexfcG4BZPX19dnTk1NDRcVFfUKmP46iDtIaiThV4YakUf03+r1+k/EJmNvR8zILnwq4h7HxsaazGazx9+XT6TW2tqqd7vdPSQZTUxM3Do8PJxO8m5wy5BOjUZjstlsQ+HyMNHdxDfjXy4TIDZXKqAJB1COu1yucojXMpbFJMpIZMcW4gfInvmI8asKCgqeUo0tmF/Ic8But5+U8YhlJ1BIe5AYgBI/KTbyIS4uLiNYQvoRW6ACHazaHR8fv2relUOmQe4geqSG7LLiGMD9iDUaYpmZVADcM3IZPB7PoXnJmekJMFkABnU63VmkDHsAsFytTEkYbQPXJBhy5IQl5xqtJKAiEFhstVpHRDhcVhLg8l2UE/8L5F2CIUd6WHKS25F44lq4Xk+CJJSuE7sWn56r1uh0OnVB30zNednMIvYqx7Varf9WgE+ZkxyABedOQJ+RUiVYbIPBcBr1nphNfX1952b6pc+rl4q/jQk2NDU1yYvnbxMTEysC5tgs8oaGhhQANwIBpaxaJjCt5efnjzJwTMqPvgDRemWAw+FYQr8NEaKk8fHxeoXfHwt2YBb55OTkLQITcTogblGAppn4nAxUszo9+q6y/IODg3Ir5KAOoF1IDltgQ8teZ4umOaeRE5BLsjwCRjjZxT9jwn95Ks/gfYdspPzlEkkVTpHDTA4Psh+RH460qpqammx8RdJBN4ceGcptYD9eMZ4KoISfwG0JitSY8A5inCT7zk04z5ZdBS9588ghpZcJ3UMdRuSwJeN24NsXWjnlrsSRinTzXFajF9RI8pxA2aoYiK+hJeelIDG2iqe1BPUREeKXiH/1fnLuq5TDivMb5S7AGfrtMRaxgZUT3y+BYB8y+StKkMVicdM/InlpGYgsUqWhJEsDPwoBXuYheaMELsTm8I1RcguxLzgHR+eafOCAVhGjg7wR0fhXTrA8Ij1paWnXF0I2Vwyr7WJ823zvvdFoLIernYemEO0N5ZF/dqjzl4zQaaf8Ue3zIubXyxakCz502heR7D806gqE9lyJ/BP7zz7P4vqne/4DfLe721LMvjIAAAAASUVORK5CYII=");
            &.white{
                background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAaCAYAAABPY4eKAAAAAXNSR0IArs4c6QAAAqZJREFUSA3tlrtrFUEUh7NXTYJRMCBRIRok+MKYIpA0IiKmEG1MJ2JjYWMlBBFFxH9AC0VFsLEIBJIiCiKonSAWPhAULRTjAzEoRkQwPsfvN3fOcO9ed10lXpv84Ms5cx4zd2dmlyQN0yDnXCfT7IVuWAltMAEP4SIMJ0kyiZ0+sWg7DMM3yNMkyUFI/mp1GvtgtTXjd8ELkD7BGeiHZdAMHbALroBpDKfF5ihkaWiE+3ATZoEWfg/SNViUNxH5LfAWJP2A4jtA8VF1BR3A3gi+tnxO3sKWo24F2A8YtHiupWEtfIYfIH0pG/cM+0dbSL12QNIdaP3dwiWKtNXSaTjrPeceY/tzmzOS9Nkd0NuRLQr3hcV0seYHxkPsUHZndoZeXULpcmYVyeXwUVVomxXibwYdgY6iy+JFLT0dII1n9pC86kucG0oXEddrJd2C2em8jcn1wlYbyzJuBmmqMh59Ert92rk32IUxERxi8+ApSIfTeY2JL4GXMAH64nnhd4L0zmLRElyshLJoZ0ykHHKbwLZ/XWWaeBPYRcV1+sR64W9XAN21WLQER33KuUsxmOFQdyrU3sHG7cc/H+K6nPYgezQN45Mhd7xqWoIDIfEBu7Qq+YsBNS3wJPQcUQm+vuGSLms37NAAaazLat+JnjglwQXwCqT8dzB2+cU2Uq/t16T74XsYD1gZ4yGQXpdNalcJnguJ69ji397y054IvWb8LlQsrgd7HpL3sO2W01ZpO6QpWBUTBR165oK+etII1Px4YnZBv+L3+qlx1GjndrDgejVlzLEBdPEyv/fkjoH0AEp6ai2ubbsN8cbWzF4goLnyysjrFbwA66vqCDRWBeowiGfD4q4O62mJR/w/t0ZOSX9mVO8diGdeufC/OH/OuWat/3rmPwEnpXoXSEk8vAAAAABJRU5ErkJggg==")
            }
        }
        .icon-see{
            display: inline-block;
            width: 18px;
            height: 13px;
            vertical-align: -2px;
            background-size: contain;
            background-repeat: no-repeat;
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAaCAYAAADfcP5FAAAAAXNSR0IArs4c6QAAA8xJREFUSA3Nl11IFFEUx91xlQqJXIlI7CGwILKCHjJ9sk3q2SCJKHBx/SLIIhD6gAzKQIgwDD92xaCoMKhnI80nzR6CUAmiCEqMCNcIiRB1+/3HmXVdd3a3MvLCmXPmnv8553/v3Llzx5X2Gy0QCGyan58vCofDxYTtRW90uVw5aI/SYIewJ9FfuX2FHjQMY6iqquqL/Kk0VzJQT09P1tTU1DEK+ZHCZPh4fogNI8Hs7OyH5eXl0/Ewdp8joY6OjnXMxkWAp5EsK+A7egh5kZ6ePgzBcTChnJyckPyTk5MeZsRD8by5uTmR348UIesRtWn8LeimmpqaH2ZPzCUuoba2tjJwCtxCcuqG+0jUnZmZ+djn8/2MyZHwlhleywyXQdxHroPkQrk+os/U1dU9iQ1eRoiZuWrNjNaEprqe0QzHBv7JPbkLIdKCmI+eQV4j96XoXBFCgIz29vY7OE8is8jZ2tra2xAKY69Yo46LOqdIeBNxI3epU0GdeRWJEOIxNXJ/Gcc3mB+trq5+JsC/ap2dnaU8iUcQ3ECNKzy+RtUyCcFYz/apNRuHYdwnZ6JmjdRPTCX2TmGxx7C7iA9auRKlSFNdAL3KRTukuiYhZmcERwGdF+i8njALTtbCZkZ3D9PrgO1nlk+wPj47+CPdkDoPoSZqj1B7t0HyA3gLkAmPx3MjgnQwNBqbDEnGkeMUz5XIVh+hXmGEdUgT6bZqToDdJS5ujAp5SdTKpjUTQToYjMiPy6vCbrd7j9/vN/cgC/4gGAz2zs7Oviav18IGHFKZ3aoJrhV8k7gYXHbIw0b3PFGg7YNIpWU3xJAxu62+Bt1EYa2Q+MquLS4GkHzBCH4bH760lyB7AQ8s9Szekcv02dhFT3wrqna+CP33lpGRYa41iIVF6J0YMZrtqTAjaMzClzjhyWX6bKwTzu6fmZnZJpu49wZBb3TDx1BvW9JGUJcFamYBm8eO6CCrr1l9UdhoyDLbri0uLr1qvKL9oCb4am9N9qZRRFu/dnHzTUM3kGgALQIlqGZ0HrqffaUUX8JPDx/fTE4JH8Br6/AabF56u0bVEQqFzqETNhXQpgeoX4WR+wxoQiLbJiNMMjIqZNXMxRwVF3MxMeLV9ekQ01X1cRUhpnp1HT9ESo1FvjoOaAt0Fq4reYTt7u5ewz5zhEXvY5GbR1iqfELqUzrC2sSYqbiHfJIO8niHUznkg9WRVb9MkUM+9i3eQB1dUz/k26Sko36Dqki+L9qXqg2xl0jgr36D4hXTjyJHi2KS69cm6Y8iAxjiiDL4Oz+KvwDV3lceSNIxewAAAABJRU5ErkJggg==");
        }
        .icon-zan{
            display: inline-block;
            width: 15px;
            height: 15px;
            vertical-align: -2px;
            background-size: contain;
            background-repeat: no-repeat;
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAeCAYAAADZ7LXbAAAAAXNSR0IArs4c6QAAA2dJREFUSA2tlkloE1EYxztjFpuk1VCLB60iPbSo9FD0IKJIEZXSnrQVI1S7JEV6FNSDIHhQ9CxiV5DWYnMQwYMLLqBgQTxIwaUqiAhVIti0MY3aLP6+6byQ1KTGOA+++db5/983772Z0UqWGP39/T3JZPIkJS7kLXKpu7t7dIlbcqb0nFEzmEqljmNWIRXINuRab2/vZfQ/jb+RVAqazWZbo2naIczvyLG+vr79Ei905CUJBoMOQDyAhzs7O6cCgcB1/BMCTIc9ogsdeUkikcgGAQHwiwKz2+13TXuTihWi85LE4/EGAaCTjwoIe8qMlatYITovCTfvNgFvKSC3220Tm+7iKlaIzknCepQya+mEHZy8oYBmZ2dll8n4tqAKuxozW1waDocDzHYlRE9Y8M8qD+FO036lYoXoPzoZGhqqguCM3Iy+sgjkqPiQp7tblM/pZpFw0Faw4EEqvcjjzNPN6V8L6S7iMZfLNYYueKQfFwS1zHAMoDru/sQBlMOXOQ7g6NRo0Wh0nANJaSqFm0TJRghhy078hcwQmwDjDmcsYpBA4CNxlYSNwvfoZjmAxNKD2EFx0MtRG9FGTmkzZ8TUhafyhk1Ub5DA+IGA2KMcuJ729vawKlQa8g7qNOVTr+m6rkEi3VWiq9kYErNhVyBHqK2dnp5uMkgSicQ+ChOAnMpFIMB+v/+1IsijH2TGeTo/8C+A26DTzjJYTyOax+PJekSZNxVhP5V7wN2is4hl2LLLZlpbWxOSsGIw4ZeCQyc16S2Mk37eVpD4fL4ZwaETt8776KfpOK0Az4Wht7S0GCQkLSUZHh4uNQnnZfslceYRnR1hNxP/rdjiq02QiFoToxuv12tZN6yFQUITX7NIYrGYZSQczGrpBLJJgwQ2tS7yyrBkQNIkQGA/M0hgk9NZwsm3pBP5CQG8UTAZt7M6YbHUjlhIF3nlo9fBxMsgmuCj9yJrTUg8ZIdd5DW+FbuowynfHeZ2VuYHyTlDywXgPajzSL345gihH1H4nDfrJI8yhA45nc5QW1tbVBWJHhkZKZ+bm9uM2cDk/Oh1yD0+envRJVmzHRgY2A7YYYCbKZYZFTvGHQ5Ho3qjZ5FkIg4ODtawRjsgrIOwhtx6ZBV+Gb4jsxZbfl/fkRtHbnZ1dd1HL3zVSPwGFfNu/QdyENIAAAAASUVORK5CYII=");
        }
        .icon-time{
            display: inline-block;
            width: 17px;
            height: 17px;
            vertical-align: -2px;
            background-size: contain;
            background-repeat: no-repeat;
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAA6dJREFUWAnNmEtIG0EYx83GBxpa0lsaau8t9FgotkI9eGlLwUsuEUHwcSqFFrwIHgQvhRbEkw8QxFxyKUjrJQUF21DosaB3W9RbQ0MUtTH9/zaz6Zr62LwdmJ3Hznz/387szM63vqYSQywWu7G/v/80l8v1quttxbDyYcz4fL4dJcRt5RMdHR0fo9HoL+55DT6vDefm5vok/ELtuxWbPfb7o3YbgpsZGRl576XPpUALCwsPT05O3gimC4MyfqRkTXFF+U3V7wSDQUalKZVKhVXHiN1V8blij/Kt3FN90rKssaGhoS+UzwvnAsXjcb8E3srgS9N5T+lkIBCI9ff3/z7PoLt+eXn5eiaTiapuQjHEPYFN6wFeRyKRLOXicCbQ4uJi8Pj4OC4Y3pNDxan29vZ3AwMDmWIDXspLS0uBg4ODV2o7rtgmqERLS0tkcHAwVdz/PyADkxTMHTXe0zD3DQ8Pfy3uWE55fn7+gaafdykkqC1BdRVDWW7DTJMZGWC+C+Z+tWDQwRY2sc0Do4Um95xwCsi8M0wTI/NEBn46DauVYhPbaPBKoOm2XZgyVlM2m/2sm4fq8LiaI+MWdPJm+tZVbvP7/Y+c1VcYIZa2aTxVCszs7GyO6Ah5TY3GFO1d2k02kNn02Gf2WE1ejVbazmgxdV0wYM8GUgU7MGGy3KWd717a1WhN0sthsPg2qdytZXjEpleaycpbo4k2DLBY2kmfqcC3ac3rDlw5xj8LRpNPUTMsTBnLnLCSTxpydbR7AeoEQcO22RCU09qdAIUB0Utlf7HJ1zu4tMOWCjaQc4SoNwx6jjYslqbK3tTS6XRh1643lKMNC6trV/GaPhs3labLhblotx4dHb3wYY020ru8Q/a7Izp76soFqqSfS3uHEdrGmOaPY+c6+VLCZU/vxZbRpuk2I/TJdOIM3Khga2ukEpa27g+iwDvo4QxcbyKj2QMDbpNl/KYNDVurOZDXlQlNtCW6AQtTxi49YygmOJCbfM0To4VHUmCwgXDiBJVUfch4BzWHQcBoceBPOo6kDcRNHVvHSBXGOV7ms7W7Gg3cIrd2/oBGJWdakU4r24arog63qK9FwLZxh/DRpp3zNFqFEaKAR6kGCWVD6rBaCygDs4oGWmii7YRTQLi3eJRquKUG9wT1TQaqNn3Ywia20UCr2KU+8xtzpVxpZ+iu1M8GB4r0yvyOcUORN75b439YFYPhqhhPBeeA8/hZv/R+qD7Bd7LUX3p/AZdi9B6qi3WSAAAAAElFTkSuQmCC");
        }
    }




</style>
<script>
    import store from '../../vuex/store'
    const commit = store.commit || store.dispatch
    import {ViewBox,Cell,Tabbar, TabbarItem,Headerbar,Sticky} from '../../components'
    export default{
        components: {
            // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
            // 否则挂载点和组件名字一致, 即vhead
            ViewBox,
            Cell,
            Tabbar,
            TabbarItem,
            Headerbar,
            Sticky

        },
        data(){
        return {
            showShare:api.showShare,
            backUrl:'',
            departCity:{},
            destId:0,
            itinId:0,
            from:'',
            PlayDetail:[],
            Itinerary:[],
            RecommendProducts:[],
            isNavShow:false,
            isSideFixed:false,
            shareTitle:"",
            shareSubTitle:"",
            shareImg:"",
            destName:"",
            overflowState:false
        }
    },
    computed: {
        desValue1: function () {
            return this.PlayDetail['DesTagsJSON']?this.PlayDetail['DesTagsJSON'][0]['Value']:''
        },
        desValue2: function () {
            return this.PlayDetail['DesTagsJSON']?this.PlayDetail['DesTagsJSON'][1]['Value']:''
        }
    },
    methods:{
    preventscroll:function(ee,ev){
        let _cname = ee.className
        if(_cname.indexOf('shade') != -1){
            event.stopPropagation()
        }
    },
        tackData:function () {
            var vm = this
            var useCache = false
            var useProxy = true
            var destParam = {
                DestPlayMethodId:vm.itinId
            }
            api.post({
                path: api.config.microServiceHost.destinationurl,
                controller: 'Destination',
                action: 'GetDestPlayMethodInfo',
                param: JSON.stringify(destParam),
                useCache: useCache,
                useProxy: useProxy,
                callback: function(obj) {
                    if (obj.ReturnCode == 0) {
                        var data = obj.Data;
                        var tmp=data.AuthorName.split('|')
                        if(tmp.length>1){
                            data.AuthorName=tmp[0]
                            data.AuthorLabel=tmp[1]
                        }
                        data.Itinerary=data.DestItineraryDayInfos
                        for(var i=0,len=data.Itinerary.length;i<len;i++)
                        {
                            data.Itinerary[i].ItineraryItems=[]
                            if(data.Itinerary[i].DestElements!=null)
                            {
                                for(var j=0,lenj=data.Itinerary[i].DestElements.length;j<lenj;j++)
                                {
                                    data.Itinerary[i].DestElements[j].OpenTimes=data.Itinerary[i].DestElements[j].OpenTime
                                    data.Itinerary[i].DestElements[j].TimeCost=data.Itinerary[i].DestElements[j].PlayTime
                                    if(data.Itinerary[i].DestElements[j].ProductInfos!=null&&data.Itinerary[i].DestElements[j].ProductInfos.length>0)
                                    {
                                        data.Itinerary[i].DestElements[j].Product={
                                            "ProductId": data.Itinerary[i].DestElements[j].ProductInfos[0].ProductId, 
                                            "ProductName": data.Itinerary[i].DestElements[j].ProductInfos[0].ProductTitle, 
                                            "ImgUrl": data.Itinerary[i].DestElements[j].ProductInfos[0].ImageUrl, 
                                            "Price": data.Itinerary[i].DestElements[j].ProductInfos[0].Price,
                                            "ProductUrl": data.Itinerary[i].DestElements[j].ProductInfos[0].ProductUrl
                                        }
                                    }
                                    data.Itinerary[i].ItineraryItems.push(data.Itinerary[i].DestElements[j])
                                }
                            }
                            
                        }
                        data.RecommendProducts=data.ProductInfos
                        if(data.RecommendProducts!=null&&data.RecommendProducts.length>0)
                        {
                            for(var i=0,len=data.RecommendProducts.length;i<len;i++)
                            {
                                data.RecommendProducts[i].TypeId=data.RecommendProducts[i].ProductType
                                data.RecommendProducts[i].TypeName=data.RecommendProducts[i].ProductTypeName
                                data.RecommendProducts[i].Title=data.RecommendProducts[i].ProductTitle
                                data.RecommendProducts[i].SubTitle=data.RecommendProducts[i].ProductSubTitle
                                data.RecommendProducts[i].ImgUrl=data.RecommendProducts[i].ImageUrl
                            }
                        }
                        vm.PlayDetail = data
                        vm.Itinerary = vm.PlayDetail.Itinerary
                        vm.RecommendProducts=data.RecommendProducts
                        //微信分享
                        vm.shareTitle=vm.destName+"玩法推荐："+data.Title
                        vm.shareSubTitle=data.Summary
                        vm.shareImg=data.ShareImg
                        vm.initShareDialog()
                        commit('UPDATE_LOADING',false)
                    }
                }
            });
        },
        toProductDetail:function(id,tid){
            location.href=api.GetProductDetailUrl(id,tid)
        },
        showSideNav:function(){
            this.isNavShow = true
            this.isRight = "0"
        },
        closeSideNav:function(){
            this.isNavShow = false
            this.isRight = "300px"
             this.overflowState = false
        },
        selectNav:function(n,m){
            this.isNavShow = false
            this.overflowState = false
            if(m == undefined){
                console.log(n)
                document.getElementById('day'+(n+1)).scrollIntoView()

            }else{
                document.getElementById('name'+n+m).scrollIntoView()
                var h = document.getElementById('name'+n+m).offsetTop
                document.querySelector('#view_box_body').scrollTop = h-120
            }
        },
        scrollFunction:function(){

            //show top 移动大于400px时 显示回到顶部按钮
            var mTop = document.getElementById('content').offsetTop-44;
            if(document.querySelector('#view_box_body').scrollTop > 500){
                this.isSideFixed = true
            }else {
                this.isSideFixed = false
            }
        },
        //页面touchmove移动时 推荐主题标签置顶、显示回到顶部 START
        touchmovefunc:function () {
            this.scrollFunction()
        },
        //页面touchmove移动 END
        //页面scroll滚动时 推荐主题标签置顶、显示回到顶部 START
        scrolldrfunc(){
            this.scrollFunction()
        },
        back:function(){
            api.pageBack('http://m.aoyou.com/mdd.html#!/play?destId='+this.destId)
        },
        share:function(){
            api.openShareDialog(this.shareTitle, this.shareSubTitle, window.location.href, this.shareImg, {})
        },
        //wap微信分享
        initShareDialog:function(){
            api.initShareDialog(this.shareTitle,this.shareSubTitle, window.location.href, this.shareImg)
        }
    },
    filters:{
        'enter':function(val){
            if(val)
            {
                val=val.replace(/\r\n/g, "<br/>")
                return val
            }
        }
    },
    created(){
        commit('UPDATE_LOADING',true)
        this.departCity=api.getDepCity()
    },
    route:{
        data:function(transition){
                if(transition.to!=null&&transition.to!=undefined)
                {
                    this.destId=this.$route.query.destId||0
                    this.destName=decodeURIComponent(this.$route.query.destname)||""
                    this.itinId=this.$route.query.itinId||0
                    this.backUrl='play?destId='+this.destId
                    this.tackData()
                }
            }
        }
    }
</script>
