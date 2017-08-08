<template>
  <div class="page route">
    <loading :show="isLoading" position="absolute"></loading><!--0228 F-->
    <view-box>
      <div class="page-inner">

        <div class="header-box" slot="header"><!--0217 F-->
          <x-header :left-options="{showBack: true}"  :title="Results.channelName" slot="header">
            <!-- <a slot="right"><span slot="right" class="icon-share"></span></a> -->
          </x-header>
        </div>
        <div class="container">
          <swiper loop auto :list="bannerLists" :show-desc-mask="show" dots-position="center" height="110px">
            <span class="icon-adver"></span>
          </swiper>
          <div class="search-center">
            <a class="search-inner" @click="pageGo">
              <span><i class="icon_search"></i>搜索查询</span>
            </a>
          </div>
          <div class="h10"></div>
          <div class="ay-section">
            <cell class="title-name" :title="LuoboProductGroup.spaceName"></cell>
            <!--轮播产品-->
            <scroller lock-y :scrollbar-x=false v-ref:scroller>
              <div class="productbox" :style="{'width':Swidth+'px'}">
                <a class="product-item" v-for="ProductItem in LuoboProductGroup.products" :href="ProductItem.productUrl">
                  <div class="imgbox">
                    <span class="label" :class="ProductItem.productType | class">{{ProductItem.productType | level}}</span>
                    <img :src="ProductItem.picUrl+'?imageView2/1/w/285/h/158'">
                    <span class="product-price">
                      ￥{{ProductItem.productPrice}} <b>起</b>
                    </span>
                  </div>
                  <div class="inforbox">
                    <h3 class="title">{{ProductItem.productName}}</h3>
                    <p class="detail">{{ProductItem.productName}}</p>
                    <div class="tag-wrap">
                      <p>
                        <span><em v-if="ProductItem.starLevel>0" class="icon-span tag-yellow">{{ProductItem.starLevel}}钻</em></span>
                        <span v-for="tag in ProductItem.dataLabelList"><em v-if="$index < 2"  class="icon-span tag-green">{{tag}}</em></span>
                        <span v-for="tag in ProductItem.featuresLabelList"><em v-if="$index < 1"  class="icon-span tag-gray">{{tag}}</em></span>
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </scroller>
          </div>
          <!--关键字-->
          <div v-if="KeyWrodList && KeyWrodList.length > 0">
            <nav class="tab-nav">
              <tab active-color="#F0643C" :animate="false">
                <tab-item :selected="selectItem === $index" v-for="KeyWordItem in KeyWrodList" @click="SelectClick($index)">{{KeyWordItem.keyWordTypeName}}</tab-item>
              </tab>
            </nav>
            <div class="tab-con">
              <ul class="list-items">
                <li v-for="KeyWord in KeyWrodItems"><a class="item" :href="KeyWord.linkUrl"><span>{{KeyWord.keyWordName}}</span></a></li>
              </ul>
            </div>
          </div>
          <div class="h10"></div>
          <!--国家导航链接-->
          <section class="ay-section" v-if="KeyNavList && KeyNavList.length >0">
            <div class="ay-linkbar">
              <a class="link" v-for="item in KeyNavList" :href="item.linkUrl">
                <span class="btn-icon">
                    <i :class="item.keyWordName | iconff"></i>
                </span>
                <span class="word">{{item.keyWordName}}</span>
              </a>
            </div>
          </section>
            <!--v-if="SelectProduct.products.length>0"-->
          <section class="ay-section" v-if="SelectProduct.products && SelectProduct.products.length > 0">
            <cell class="title-name"  :title="SelectProduct.spaceName"></cell>
            <ul class="product-list">
              <li class="list-item" v-for="itemProduct in SelectProduct.products">
                <a :href="itemProduct.productUrl">
                  <div class="img">
                    <img :src="itemProduct.picUrl+'?imageView2/1/w/100/h/100/q/90'">
                    <div class="item-type">{{itemProduct.productType | level}}</div>
                  </div>
                  <div class="inforbox">
                    <div class="title">{{itemProduct.productName}}</div>
                    <div class="subtitle">
                      <div class="tag-wrap">
                        <p>
                          <span class="icon-span tag-yellow" v-if="itemProduct.starLevel>0">{{itemProduct.starLevel}}钻</span>
                          {{itemProduct.productSubName}}
                        </p>
                      </div>
                    </div>
                    <div class="price">
                      ¥{{itemProduct.productPrice}}<span>起</span>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </section>
          <div v-if="ZDYProductGroup && ZDYProductGroup.length>0">
            <nav class="tab-nav">
              <tab active-color="#F0643C" :animate="false">
                <tab-item :selected="seleIndx === $index" v-for="KeyWordItem in ZDYProductGroup" @click="productSelect($index,'tab')" track-by="$index">{{KeyWordItem.spaceName}}</tab-item>
              </tab>
            </nav>
            <div class="tab-con">
              <ul class="list-items" v-if="ZDYProductGroupList.length>1">
                <li v-for="KeyWord in ZDYProductGroupList" :class="{'active':seleIndxInner == $index}"><a class="item"  @click="productSelect($index,'key')"><span>{{KeyWord.spaceName}}</span></a></li>
              </ul>
            </div>
            <section class="pro-cell-box">
                <a class="product-cell" :href="ProductCell.productUrl" v-for="ProductCell in ZDYProductLidt">
                  <div class="imgbox">
                      <span class="label" :class="ProductCell.productType | class">{{ProductCell.productType | level}}</span>
                      <img :src="ProductCell.picUrl+'?imageView2/1/w/162/h/109/q/90'">
                  </div>
                  <div class="inforbox">
                    <div class="price">
                      ￥{{ProductCell.productPrice}}<span>起</span>
                    </div>
                    <p class="title">{{ProductCell.productName}}</p>
                  </div>
                </a>
            </section>
          </div>
          <div class="ending">
            <p><span>已到底线</span></p>
          </div>
        </div>
      </div>
    </view-box>
  </div>
</template>
<script>
(function (root) {
    var docEl = document.documentElement
    var timer = null
    var width
    var last
    function changeRem() {
      width = docEl.getBoundingClientRect().width
      if (last === width) {
        return
      }
      last = width
      root.rem = (width / 750) * 40
      if (/ZTE U930_TD/.test(navigator.userAgent)) {
        root.rem = root.rem * 1.13
      }
      docEl.style.fontSize = root.rem + 'px'
    }

    changeRem()
    root.addEventListener('resize', function () {
      clearTimeout(timer)
      timer = setTimeout(changeRem, 300)
    })

    root.addEventListener('orientationchange', function () {
      clearTimeout(timer)
      timer = setTimeout(changeRem, 300)
    })
  })(window, undefined)
  import { go } from '../../libs/router'
  import store from '../../vuex/store'/*0228 F*/
  import {Loading, ViewBox,XHeader,Search,Swiper, SwiperItem, Group, Cell,Actionsheet,Tab,TabItem,Scroller} from '../../components'/*0228 F*/
  export default {
    components: {
      // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
      // 否则挂载点和组件名字一致, 即vhead
      Loading,
      ViewBox,
      XHeader,
      Search,
      Swiper,
      SwiperItem,
      Group,
      Cell,
      Actionsheet,
      Tab,
      TabItem,
      Scroller
    },/*0228 F*/
    store: store,
    vuex: {
        getters: {
            route: (state) => state.route,
            isLoading: (state) => state.isLoading,
            direction: (state) => state.direction
        }
    },/*0228 F*/
    data (){
      return {
        showTabItem:true,
        seleIndx:0,
        seleIndxInner:0,
        show:false,
        selectItem:0,
        Results:[],
        bannerLists:[],
        LuoboProductGroup:[],
        Swidth:500,
        ChannelTemplateProduct:[],
        KeyWrodList:[],
        KeyWrodItems:[],
        KeyNavList:[],
        KeyNavParam:[],
        ZDYKeyWrodList:[],
        ZDYKeyWrodItems:[],
        channelProductList:[],
        SelectProduct:[],
        ZDYProductGroup:[],
        ZDYProDuctList:[],
        ZDYProductGroupList:[],
        ZDYProductLidt:[],
        urlcid:'',
        pdId:''
        }
    },
    methods: {
    pageGo:function(){
        location.href="http://m.aoyou.com/search.html?searchType="+this.pdId;
    },
      toHref:function(pid,tid,flag){
              if (tid == 1) {
                  location.href="http://m.aoyou.com/group.html?pid=" + pid + "i" +flag;
              } else if (tid == 4) {
                   location.href="http://m.aoyou.com/tour.html?pid=" + pid + "i" +flag;
              }else {
                  return ""
              }
      },
      takeData:function(){
        var vm=this
        var citiId
        var lunboParam
        var channelGUID
        var useCache=false
        var useProxy=true
        api.post({
            path: api.config.microServiceHost.elementurl,
            controller: 'Element',
            action: 'GetChannelViewInfos',
            param: JSON.stringify({cid:this.urlcid}),
            useCache: useCache,
            useProxy: useProxy,
            callback: function(obj) {
                if (obj.ReturnCode == 0) {
                    vm.Results = obj.Data;
                    channelGUID = vm.Results.channelGuid
                    citiId = vm.Results.cityID
                    vm.pdId = vm.Results.searchType
                    //轮播banner图
                    var lunboParam={
                      cityId:citiId,
                      channelTypeid:389,
                      type:2,
                      channelGUID:channelGUID,
                      space:'c8c5922d-1189-4557-ba0b-8386b6e6dc5d'
                    }
                    api.post({
                        path: api.config.microServiceHost.elementurl,
                        controller: 'Element',
                        action: 'GetElementSpace',
                        param: JSON.stringify(lunboParam),
                        useCache: useCache,
                        useProxy: useProxy,
                        callback: function(lbobj) {
                            if (lbobj.ReturnCode == 0) {
                               var bannerdata = lbobj.Data.advertises;
                                  //banner图数据转换
                                vm.bannerLists = bannerdata.map((one, index) => ({
                                  url: one.wapUrl,
                                  img: one.picUrl
                                }))
                            }
                        }
                    });


                    //产品推荐
                    var tjProductParam={
                      cityId:citiId,
                      channelTypeid:389,
                      type:1,
                      channelGUID:channelGUID,
                      space:'d8932fb6-5ce2-40e3-afbc-119918de6321'
                    }

                    api.post({
                        path: api.config.microServiceHost.elementurl,
                        controller: 'Element',
                        action: 'GetElementSpace',
                        param: JSON.stringify(tjProductParam),
                        useCache: useCache,
                        useProxy: useProxy,
                        callback: function(lbcpobj) {
                            if (lbcpobj.ReturnCode == 0) {
                               vm.LuoboProductGroup = lbcpobj.Data

                                //计算轮播产品图宽度
                                let n = vm.LuoboProductGroup.products.length;
                                vm.Swidth = n*305-20
                                //计算轮播产品图宽度END

                                vm.$nextTick(() => {
                                  vm.$refs.scroller.reset()
                                })
                            }
                        }
                    });


                    //关键词
                    var KeyWordParam={
                      cityId:citiId,
                      channelTypeid:389,
                      type:3,
                      channelGUID:channelGUID,
                      space:'5d2d5169-f0b3-4809-8b40-c0dbc87cd041'
                    }
                    api.post({
                        path:api.config.microServiceHost.elementurl,
                        controller: 'Element',
                        action: 'GetElementSpace',
                        param: JSON.stringify(KeyWordParam),
                        useCache: useCache,
                        useProxy: useProxy,
                        callback: function(kwobj) {
                            if (kwobj.ReturnCode == 0) {
                               vm.KeyWrodList = kwobj.Data.keyWords
                               vm.KeyWrodItems = vm.KeyWrodList[vm.selectItem].keyWords
                               //console.log(vm.KeyWrodList)

                            }
                        }
                    });

                    //导航关键字数据
                    var KeyNavParam={
                      cityId:citiId,
                      channelTypeid:389,
                      type:3,
                      channelGUID:channelGUID,
                      space:'fb7d3133-8135-4049-b1fb-0a9a1a182939'
                    }
                    api.post({
                        path: api.config.microServiceHost.elementurl,
                        controller: 'Element',
                        action: 'GetElementSpace',
                        param: JSON.stringify(KeyNavParam),
                        useCache: useCache,
                        useProxy: useProxy,
                        callback: function(knobj) {
                            if (knobj.ReturnCode == 0) {
                                 vm.KeyNavList = knobj.Data.keyWords[0].keyWords

                            }
                        }
                    });


                    //精选产品
                    var selectProParam={
                      cityId:citiId,
                      channelTypeid:389,
                      type:1,
                      channelGUID:channelGUID,
                      space:'ca72f8c2-aa6f-42e9-83c7-45d030250ce5'
                    }

                    api.post({
                        path: api.config.microServiceHost.elementurl,
                        controller: 'Element',
                        action: 'GetElementSpace',
                        param: JSON.stringify(selectProParam),
                        useCache: useCache,
                        useProxy: useProxy,
                        callback: function(jxcpobj) {
                            if (jxcpobj.ReturnCode == 0) {
                                 vm.SelectProduct = jxcpobj.Data


                            }
                        }
                    });


                    //自定义产品
                    var zdyProParam={
                      cityId:citiId,
                      channelTypeid:389,
                      type:1,
                      channelGUID:channelGUID,
                      space:'7e7df9ce-e0bb-4c55-ae0d-67b3fb4fccee'
                    }
                    api.post({
                        path: api.config.microServiceHost.elementurl,
                        controller: 'Element',
                        action: 'GetProductBySpaceGuidThree',
                        param: JSON.stringify(zdyProParam),
                        useCache: useCache,
                        useProxy: useProxy,
                        callback: function(zdycpobj) {
                            if (zdycpobj.ReturnCode == 0) {
                            vm.ZDYProductGroup = []
                                 for(let pp=0,qq=zdycpobj.Data.listappElementSpaceProduct.length;pp<qq;pp++){
                                    if(zdycpobj.Data.listappElementSpaceProduct[pp].listappElementSpace.length>0){
                                        vm.ZDYProductGroup.push(zdycpobj.Data.listappElementSpaceProduct[pp])
                                    }
                                 }
                                 vm.ZDYProductGroupList = vm.ZDYProductGroup[vm.seleIndx].listappElementSpace
                                 for(let p=0,q=vm.ZDYProductGroupList.length;p<q;p++){
                                    if(!vm.ZDYProductGroupList[p].products){
                                      vm.ZDYProductGroupList[p].products = []
                                    }
                                 }
                                 if(vm.ZDYProductGroupList && vm.ZDYProductGroupList.length>0 && vm.ZDYProductGroupList[vm.seleIndxInner]){
                                  vm.ZDYProductLidt = vm.ZDYProductGroupList[vm.seleIndxInner].products
                                 }else{
                                   vm.ZDYProductLidt = []
                                 }
                            }
                        }
                    });
                }
            }
        });

      },
      SelectClick:function(i){
          //vm.KeyWrodItems = vm.KeyWrodList[i].keyWords
          this.KeyWrodItems = this.KeyWrodList[i].keyWords
          // this.ZDYKeyWrodList = this.ZidingyiProductGroup[i].ZDYProductListKey
         // this.ZDYProDuctList = this.ZidingyiProductGroup[i].ChannelTemplateProduct

      },
      productSelect:function(idx,type){
          switch(type)
          {
          case 'tab':
            this.seleIndx = idx
            this.seleIndxInner = 0
            break;
          case 'key':
             this.seleIndxInner = idx
            break;
          default:
            this.seleIndx = 0
            this.seleIndxInner = 0
          }
          this.ZDYProductGroupList = this.ZDYProductGroup[this.seleIndx].listappElementSpace
           if(this.ZDYProductGroupList && this.ZDYProductGroupList.length>0 && this.ZDYProductGroupList[this.seleIndxInner]){
            this.ZDYProductLidt = this.ZDYProductGroupList[this.seleIndxInner].products
           }else{
             this.ZDYProductLidt = []
           }
      }
    },
    ready() {
      this.urlcid = this.$route.query.cid
      this.takeData();
    },
     filters:{
        'level'(value){
            switch(value){
                case 1:
                    return "跟团游"
                case 99:
                    return "当地玩乐"
                case 29:
                    return "当地玩乐"
                case 1002:
                    return "当地玩乐"
                case 5:
                    return "邮轮"
                case 4:
                    return "自由行"
                case 96:
                    return "签证"
                default:
                    return ""
            }
        },
        'class'(value){
            switch(value){
                case 1:
                    return "label-green"
                case 99:
                    return "label-light-green"
                case 29:
                    return "label-light-green"
                case 1002:
                    return "label-light-green"
                case 5:
                    return "label-blue"
                case 4:
                    return "label-orange"
                case 96:
                    return "label-brown"
                default:
                    return ""
            }
        },
        'iconff'(value){
          switch(value){
              case '签证':
                  return "nav-visa"
              case '当地玩乐':
                  return "nav-play"
              case '观光度假':
                  return "nav-hiloday"
              case '行程定制':
                  return "nav-dingzhi"
              case '半自助':
                  return "nav-halfzz"
              case '包车游览':
                  return "nav-baoche"
              case '跟团游':
                  return "nav-genty"
              case '门票':
                  return "nav-ticket"
              case '抢游惠':
                  return "nav-qiangyh"
              case '全球购物':
                  return "nav-global"
              case '邮轮':
                  return "nav-cruise"
              case '自由行':
                  return "nav-package"
              case 'WiFi':
                  return "nav-wifi"
              default:
                  return ""
          }
        }
     }
  }

</script>
<style lang="less">
  @import '../../styles/index.less';
  @import '../../styles/ayui/base/reset.less';
  html, body,.pages,.page{
    height: 100%;
    width: 100%;
    overflow: hidden;
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
  .h10{
    height: 10px;
  }
  .header-box{
    z-index: 99;
    /*position: fixed;*/
    position: absolute;/*0217F*/
    width: 100%;
    left: 0;
    top: 0;
  }
  .container{
    width: 100%;/*0217 F*/
    height: 100%;/*0217 F*/
    box-sizing: border-box;/*0217 F*/
    overflow: scroll;/*0217 F*/
  }
  .route{
    .ay_tab_bd{
      padding-top: 44px;
    }
  }
  .page{
    width: 100%;
    height: 100%;
    background: #f5f5f5;
    overflow: hidden;
    font-family: Helvetica, sans-serif;
    .ay_tab_bd{
      padding-bottom: 0;
    }
    .ay_tabbar_icon {
      span{
        display: block;
      }
    }
  }
  .page-inner{
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow: hidden;/*0217 F*/
    color: #333333;
    &::-webkit-scrollbar{
      display: none;
      width:0;
      height:0;
    }

    .ay-header .ay-header-left .left-arrow{
      width: 80px;
      height: 80px;
      top: -12px;
      left: -9px;
      transform: scale(0.5);
      -webkit-transform: scale(0.5);
      transform-origin: 0 0;
      -webkit-transform-origin: 0 0;
    }
    .ay-header .ay-header-left .left-arrow{
      width: 80px;
      height: 80px;
      top: -12px;
      left: -9px;
      transform: scale(0.5);
      -webkit-transform: scale(0.5);
      transform-origin: 0 0;
      -webkit-transform-origin: 0 0;
    }
    .ay-header .ay-header-right{
      top:3px;
      right: 20px;
    }
    .ay-header .ay-header-left .left-arrow:before{
      width: 26px;
      height: 26px;
      border-width: 3px 0 0 3px;
      border-color: #fff;
      top: 24px;
      left: 28px;
    }
    .ay-slider > .ay-indicator > a > .ay-icon-dot, .ay-slider .ay-indicator-right > a > .ay-icon-dot{
      width: 20px;
      height: 2px;
      background-color: #fff;
      opacity: .5;
      border-radius: 0;
      float: inherit;
    }
    .ay-slider > .ay-indicator > a > .ay-icon-dot.active, .ay-slider .ay-indicator-right > a > .ay-icon-dot.active{
      background-color:#FF4800 ;
    }
    .ay-slider > .ay-indicator, .ay-slider .ay-indicator-right{
      bottom: 6px;
    }
  }
  .search-center{
    padding: 15px 20px;
    background-color:#fff;
    text-align: center;
    .search-inner{
      position: relative;
      display: block;
      height: 30px;
      line-height: 30px;
      span{
        position: relative;
        z-index: 2;
        font-size: 14px;
        -webkit-font-smoothing: antialiased;
        color: #999;
      }
      &:after{
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 200%;
        height: 200%;
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        border-radius: 100px;
        border: 1px solid #E6E6EA;
        box-sizing: border-box;
        background: #FFFFFF;
        z-index: 1;
      }
    }
    .icon_search{
      width: 15px;
      height: 15px;
      display: inline-block;
      vertical-align: -2px;
      margin-right: 5px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100%;
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAtNJREFUSA21Vj1v00AYruOoS+Qha+mA1Fb0T7RF6ohExdQhXVCUjPwEUPkDzIkbdSFDJ5RKjJGATvwDpKoSA7AyOFGX2OF5jnut68X22YacZN357vl43/N92NsoKGEYbmP4ZLlcPkO9g3qLcM/zfqG6Q/0R9aTX6/1gf5XiZYFHo9HWYrE4h/BLmPlZGOkDJgbmstlsvul2uwyoVFkxHg6Hz8F8D7GglIIGIYAIzbN+v39dhtcwQYPB4BUMP1imU4j2kdF+u90O+LDNPnCnwieHXGpIX1GdZsxMSQRYgrmFeA8ZfC4SAO8IvBCYPY1LwHvhylwZ85vGcfwNAmp6QbxptVonnU7nd5GpjI3H4/Z8Pp+Af8A+8CPf9/eLvrnKjgtJTMG7rWJKIwZIDrl8pxY12c4rHrcMgN/xqNWLaJ+6pjdPTE/7J45DJ8bzOG+rMWPuU9ky07qmNNNcteC0JmchszQA4OGgCiK8knbd2tQwtW09ZrwjnVgQX6Rdt7Y0Um1bjxmrY5ADQRD8tAFV300NU9vWUava7vyX9yiK1BZ1aTTwTdLzFaRHLkKJ8XQGTW2bx4zvpBOHyKG069aWRqpt6zFjXm2q4JucSrtubWqY2rYeM54AEOuBYx4CNqjsu+YeE681J3ncBk8WRHkpALRDnr3yXrYmh1zBUzPv1CJGrWpe4oiQ9ynLHg/8KuZySZBLAWjdU5PtvKKM9S1yBlBCIKI9mM1mX8tMOzHEkmOYbCZJYr4bQ3+bD/acvsTfYUgFpNH8EbjiiSSHA7cdVy/MuBjVN9XYtOI3xtPBdGceww+MyUIGdX997kHfRDC+uBeZm5kpPP8ceInj5YJEEcmrNeYCnF1maHIYBJ4xrt6VbbqSsWlQ5/eWJjRzZV5obAZRpV3GfC3GDNJlvjZjl/nK4qoypS4st1LOgnuyVmMGlmF+jp3z1hX0fxvnN8cZ8VoE/wDWLIhj4DsKIQAAAABJRU5ErkJggg==");

    }
  }
  .ay-section{
    .title-name{
      height: 60px;
      font-size: 19px;
      padding:0;
    }
  }
  .imgbox{
    position: relative;
    img{
      width: 100%;
    }
  }
  .sliderbox.ay-slider{
    &.ay-slider > .ay-swiper > .ay-swiper-item {
    }
  }
  .icon-share{
    background-size: contain;
    background-position: center;
  }
  /*轮播产品样式*/
  .productbox {
    position: relative;
    padding-bottom: 30px;
    .product-item{
      width: 285px;
      height: 244px;
      background-color: #fff;
      display:inline-block;
      margin-left: 20px;
      float: left;
      line-height: 100px;
      .inforbox{
        .title{
          height: 40px;
          margin-top: 8px;
          font-size: 16px;
          line-height: 20px;
          overflow: hidden;
          display: -webkit-box;
          margin-bottom: 3px;
          -webkit-line-clamp: 2;
          text-align: justify;
          -webkit-box-orient: vertical;
          white-space: normal;
        }
        .detail{
          font-size: 12px;
          line-height:1.1;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          font-weight: 300;
          color: #999;
          -webkit-box-orient: vertical;
          white-space: normal;
        }
      }

    }
    .product-price{
      position: absolute;
      right:10px;
      bottom: 10px;
      width: 90px;
      padding: 6px 0;
      line-height: 0.8;
      background-color: #FF5647;
      border-radius: 50px;
      color: #fff;
      font-size: 16px;
      text-align: center;
      -webkit-font-smoothing: antialiased;
      b{
        font-weight: normal;
        font-size: .6rem;
      }
      del{
        font-size: (12rem/20);
        vertical-align: 2px;
      }
      span{
        font-size:(16rem/20);
      }
    }
    .product-item:first-child {
      margin-left: 0;
    }
    .imgbox{
      .label{
        position: absolute;
        left: 5px;
        top:0;
      }
      img{
        display: block;
      }
    }
  }
  /*轮播产品样式end*/
  .pro-cell-box{
    padding: 0 10px;
    background-color: #fff;
    &:after{
      content: "";
      display: table;
      clear: both;
    }
  }
  .product-cell{
    box-sizing: border-box;
    float: left;
    width: 50%;
    padding: 0 10px 15px;
    .imgbox{
      .label{
        position: absolute;
        left: 5px;
        top:0;
      }
      img{
        display: block;
        height: 5rem;
        border-radius: 6px;
        overflow: hidden;
      }
    }
    .title{
      height: 40px;
      font-size: 14px;
      line-height: 20px;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      white-space: normal;
      -webkit-font-smoothing: antialiased;
      overflow: hidden;
      display: -webkit-box;
    }
    .price{
      margin: 10px 0 5px;
      color:#FC5A3F;
      -webkit-font-smoothing: antialiased;
      font-size: 19px;
      line-height: 1;
      span{
        font-size: 12px;
      }
    }
  }
  /*关键字列表样式*/
  .tab-nav{
    padding: 0 20px;
    background-color: #fff;
    .ay-tab-item{
      padding: 0 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .tab-con{
    padding: 20px 15px 0;
    background-color: #fff;
    .list-items .active{
      .item{
        color: #FC5A3F;
        border: 1px solid #FC5A3F;
      }
    }
    .list-items{
      &:after{
        content: "";
        display: table;
        clear: both;
      }
      li{
        box-sizing: border-box;
        float: left;
        width: 33.33%;
        padding:0 1%;
        overflow: hidden;
        line-height: 0;
        margin-bottom: 20px;
      }
      .item{
          width: 100%;
          box-sizing: border-box;
          display: inline-block;
          height: 30px;
          line-height: 28px;
          text-align: center;
          padding: 0 15px;
          font-size: 14px;
          display: block;
          border: 1px solid #999999;
          border-radius: 100px;
          span{
              overflow: hidden;
          }
      }
    }
  }
  /*关键字列表样式EDN*/
  .ay-linkbar{
    height: 100px;
    overflow: hidden;
    &:after{
      content: "";
      display: table;
      clear: both;
    }
    .link{
      display: inline-block;
      width: 25%;
      text-align: center;
      padding:20px 0;
      float: left;
    }
    .btn-icon{
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
      img{
        vertical-align: middle;
      }
    }
    .word{
      display: block;
      font-size: 14px;
      line-height: 14px;
      color: #333;
      text-align: center;
      margin-top: 6px;
    }
  }


  .product-list{
    .tag-wrap{
      float: left;
      p{
        line-height: 30px;
      }
    }
    .inforbox:last-child{
      &:after{
        border-bottom: 0
      }
    }
    .inforbox{
      margin-left: 110px;

      &:after{
        width: 100%;
        content: "";
        display: table;
        clear: both;
        border-bottom: 1px solid #DFDFDF;
        margin: 15px 0;
      }

    }
    .list-item{
      &:after{
        width: 100%;
        content: "";
        display: table;
        clear: both;
      }
    }
    .item-type{
      position: absolute;
      bottom:0px;
      width: 100%;
      background-color: rgba(0,0,0,.5);
      color: #fff;
      text-align: center;
      font-size:12px;
      border-bottom-left-radius:5px;
    }
    .img{
      position: relative;
      overflow: hidden;
      margin-right: 10px;
      border-radius:5px;
      float: left;
      width: 100px;
      height: 100px;
      img{
        border-top-left-radius:5px;
        border-top-right-radius:5px;
      }
    }
    .title{
      overflow: hidden;
      display: -webkit-box;
      height: 40px;
      margin-bottom: 1px;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      white-space: normal;
      font-size: 16px;
      line-height: 20px;
      padding-top: 1px;
      color: #333;
    }
    .subtitle{
      position: relative;
      height: 32px;
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
      p{
        font-size: 24px;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        white-space: normal;
      }
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
  .ending{
    padding: 0 20px;
    height: 60px;
    line-height: 60px;
    color: #999999;
    font-size: 12px;
    text-align: center;
    p{
      position: relative;
      &:before{
        position: absolute;
        top:30px;
        width: 100%;
        content: "";
        display: block;
        border-bottom:1px solid #DFDFDF;
      }
    }
    span{
      background-color: #f5f5f5;
      display: inline-block;
      text-align: center;
      position: absolute;
      top:0;
      left: 50%;
      margin-left: -30px;
      width:60px;
    }
  }
  /*各种标签样式*/
  .label{
      display: inline-block;
      width: 55px;
      height:20px;
      color: #fff;
      font-size:12px;
      line-height: 20px;
      text-align: center;
      border-bottom-left-radius:5px;
      border-bottom-right-radius:5px;
  }
  .label-orange{
    background-color:#FF6602;
  }
  .label-green{
    background-color:#70C100;
  }
  .label-blue{
    background-color: #35A3EC;
  }
  .label-pink{
    background-color: #FF7375;
  }
  .label-brown{
    background-color: #BF956A;
  }
  .label-purple{
    background-color: #B964A7;
  }
  .label-light-green{
    background-color: #64D58E;
  }
  .tag-wrap{
    height: 16px;
    p{
      display: -webkit-box;
      line-height: 16px;
      width: 200%;
      transform: scale(0.5);
      -webkit-transform: scale(0.5);
      transform-origin: 0 0;
      -webkit-transform-origin: 0 0;
    }
    .icon-span{
      display: inline-block;
      margin:4px 10px 0 0;
      padding: 0 9px;
      height: 26px;
      background-color: #F5F4EF;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
      font-size: 20px;
      color:#666;
      line-height: 26px;
      text-align: center;
      text-wrap: none;

      &.tag-red{
        background-color: #F50000;
        border: 1px solid #F50000;
        color: #fff;
      }
      &.tag-yellow{
        background-color: #fff;
        border: 1px solid #FDA403;
        color: #FDA403;
      }
      &.tag-green{
        background-color: #fff;
        border: 1px solid #5FC579;
        color: #5FC579;
      }
      &.tag-gray{
        background-color: #fff;
        border: 1px solid #E0E0E0;
      }
      &.tag-orange{
        background-color: #fff;
        border: 1px solid #FF6602;
        color: #FF6602;
      }
      &.tag-sorange{
        background-color: #fff;
        border: 1px solid #FEA833;
        color: #FEA833;
      }
      &.tag-blue{
        background-color: #fff;
        border: 1px solid #35A3EC;
        color: #35A3EC;
      }
    }
  }
  /*各种标签样式END*/
  /*导航元素icon*/
  .nav-visa{
    display: inline-block;
    width: 34px;
    height: 34px;
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
    background-image: url('data:image/png;base64,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');
  }
  .nav-play{
    display: inline-block;
    width: 34px;
    height: 34px;
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
    background-image: url('data:image/png;base64,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')
  }
  .nav-hiloday{
    display: inline-block;
    width: 34px;
    height: 34px;
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
    background-image: url('data:image/png;base64,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')
  }
  .nav-dingzhi{
    display: inline-block;
    width: 34px;
    height: 34px;
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
    background-image: url('data:image/png;base64,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')
  }
  .nav-halfzz{
    display: inline-block;
    width: 34px;
    height: 34px;
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
    background-image: url('data:image/png;base64,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')
  }
  .nav-baoche{
    display: inline-block;
    width: 34px;
    height: 34px;
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
    background-image: url('data:image/png;base64,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')
  }
  .nav-genty{
    display: inline-block;
    width: 34px;
    height: 34px;
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAYAAAA4E5OyAAAAAXNSR0IArs4c6QAAA6VJREFUeAHtm9tLVEEcx7/rJUNIqIeCgi6KGN2UyktFBBGYqRWBJJYg9CJRvfTSSw8+9AdEFBUUCRpdpKCwC5Z00S4i9BaFWA/10AUD77SiNb8dx2M/znHPnt3VPdtvcPbM7zczOzOf/Z6ZM3Mw8EcFSJgikDKVkkSIgABhQhAgAoQRYKYoRIAwAswUhTAgacy2N8fHgdt3gJedOn/7NqDqAJCaal/ex153QAjGvVZrmCZdXWX5kiTl7pYxyrh0DrioIgXj01bSfLoDYob7Hzzku7tlaM6g26T+uEEDkC8JgzuF0AS6t9waPqXJl4QhENFut6Zu9hFkZQFbioCag0B6etzbd6eQuHdjhgYGBoDHT4DmmzMUil2WuzmEt3f9GvfEz/7YAzScAd68BeoOx6+dyW9OfIXk5equDgzGHQY1kPhAZgWD1YgAsViEUgKEAfE2qbIvmTWz9ohuavq5OKWNnaJ+32VLgRNH9dVDx/ylENp1U5yYsKKBQYMn/5evakXq8oBCV/GXQpqu6l4HAtaATbrvF3DyFBAMAgX5Vn6EKX8BoVvCKTTf0DC2lgA5q5xKhfXP0ELYuolT4P0HfZvMz9CP+FH0zP9AaA5pbNII9lUCixZGgSMZHszanuqJdMlioHx3VDCosr8VMjgEtNzVEGprgLTop0R/A7nVAgwNA/kbgI0FUavD3wr5rZbX5x0awv6KmMDwN5CMeUDhJg2i+50ACREwx5rtz4CRkZhA8fccsmI5sH4dMDoKtLULEK2SPRrEozZgbCxqKImvEDpCpJC1QF/559o1QPZKoL8feDH5qpWXicD2tnDPxel7SbHzsCrVa5Gz54HWh8DOHYDZ8DnXcMxJfIXQa4jSXcAh9RrCKRRtBuhJ9dt3oKvbqZQrvzeFxOrU/cJloOMVQDvUY/WuOmxbiBRRUQZcaQTuPwCKC22LuXF6A+Lmm8OV+fFTw6AtfVmpXjZpozahIlSktInGR1fj49dsteWn3e6nz0BPL5CbE64HtvlzB6SvT3eITrlON9h2zrNzWO1xPIa5A7I6T80L1UDna71CBNWSSdJXfwgo1YTSZKuYEnL+e52eb9KZmfrp1ZcnZjQI2q7HYMvuUQy21RJ/lbHtdvycAoSxFSAChBFgpihEgDACzBSFCBBGgJmiEAHCCDBTFCJAGAFmikIECCPATFGIAGEEmCkKESCMADNFIQxIZP8vwyonoykKYb+qABEgjAAzRSEChBFg5l+jgcpaboMrYQAAAABJRU5ErkJggg==')
  }
  .nav-ticket{
    display: inline-block;
    width: 34px;
    height: 34px;
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
    background-image: url('data:image/png;base64,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')
  }
  .nav-qiangyh{
    display: inline-block;
    width: 34px;
    height: 34px;
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
    background-image: url('data:image/png;base64,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')
  }
  .nav-global{
    display: inline-block;
    width: 34px;
    height: 34px;
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAYAAAA4E5OyAAAAAXNSR0IArs4c6QAABOZJREFUeAHtm1uIlVUUgL+jY6nTOE6jkZYR2cUL0kWCqExEkoJKzS5iSmL0UmA9CPmQPehLTz0EEWVGQlJg2GWql0ik0QrKSxdosjREmKlmxrEZLzleaq9Z/z/I6vxnzn/O3icH9oLz/2f9e5+19/7O2nuvvc8+hX+cEGWQwIjBd/HNAIEIxDhCBBKBGAJGjR5igNQZvbZqewccOAh/9cLJkzBmNDSMg2uuhilX1rYuSWm1B3L8BHz2uXtth56e7EaPa4B5c+Geu6GxMTuf55RCTeOQ736AVzdCr/MIkaYmmH4DNF/qvGOM85K/FVLbz9DVrXlGO69ZuRzuulP1wNfaAdm+AzZtBokDBcKSxTBjWnbzpCt90AK792qeexfAimXZ+T2l1AbInn3w0stw7hw8sgQW3V9+9Vt3wRtvwenTDuIifZX/6dw5w88yx47DxjcrgyHNmXMHPPM0jBwJ2z6En1x3Cijhgbz3vs4iM2fk84zzG33LTfDgQu1ur2+Cs2fPT/X6PiyQvmOw4wutsAyM1cjC++CKyfDHnyDdKJCEBdK6E/r74dqp2phqGjHCVXXBfLXQ8mk1lkp+NiyQb/Zo4b6mTBlPZBru+B0O/layYZUmVh+YnTlTvGyJPPf/AnWuiFtnQ1a+4p8u/lRs3X4byBS+62u4akrxfPJU8lYglU27XV3w9rtuxG8DGScuRGm4xMU702D5Upgwoewa5gfSfQSeex5OuBBcZNQovdurxBwyGxRcr6xzU6ZPkZhEJKtsSUvz1NfDixs0GpbnQ0h+v9riPENgzL4ZnlwFsuYoJu9shZZP4GEXkeYJxIrZss/WrddF4do1GvXadNF7+zT+kUhX6rz6qWK5/vMs/6Datl+NrHo8G4bkaG/XfJMn6d3nNbXZ4VbLWSJflNRRJK2zaiWv+YEcPaoGm8aXNDzYpRrdct63TEzGhE43lpWStI5pnUvlTdLyAynD6EAWt4YbkEIheePx1tysxmR17FkCAkmIhABSP1Yx9J/yjAPCAOlzA5qE2CIyuH6bBGj6pLqr2G79Um18/6Nf286qfyAyuq9dB2m/lc0eWfr7CLdT27sTwEd6/NlOvib/QGSJ3uMGXtn8We/APOFGelmHbN1WfRCX2pYNpjXPwtKH/NkOBuTXA2p62aO6qJs/D2ZO19D90KGk2Apvqe3HXPQpWwIPuBWwL9vBgKRTXVp5WdPI7rrI+CGmas2VfQ1pOyk1f6SaXV1NkZ1yiQ43b4GdX0Fnp24QXX9d9VsAIW0n7fI/hogrr1yh6wzxEvnNRcYTCZ2rnYJD2g7mIWJYNnLmzoHDh103acy12kzqlX0LaduV6r/LpE25+CIdVFPd5z2gbf9dxmfD/wdbEYiBHoFEIIaAUaOHRCCGgFGjh0QghoBRo4dEIIaAUaOHRCCGgFGjh0QghoBRo4dEIIaAUaOHRCCGgFGjh0QghoBR83vIZRPVRPrjkzF4QalpHdM6l1G5/LvuN87Sv3a88poeaEvPapRRWE2zdHfrwUApVOpcpuQ/dCfny+SMl5wVHQ4y6XLY8AKMTc6UDFHn/EDE4Cl3Ovmjj/Ugfqk/AQ1ReNDk9L848oO4/I5TplQGpEzjwzFb/kF1OLYyR50jEAMrAolADAGjRg+JQAwBo0YPiUAMAaNGD4lADAGj/gtLSVnzzTqjxQAAAABJRU5ErkJggg==')
  }
  .nav-cruise{
    display: inline-block;
    width: 34px;
    height: 34px;
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
    background-image: url('data:image/png;base64,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')
  }
  .nav-package{
    display: inline-block;
    width: 34px;
    height: 34px;
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
    background-image: url('data:image/png;base64,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')
  }
  .nav-wifi{
    display: inline-block;
    width: 34px;
    height: 34px;
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
    background-image: url('data:image/png;base64,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')
  }
</style>
