<template>
    <div class="page" v-cloak>
        <loading :show="isLoading" position="absolute"></loading><!--0228 F-->
        <view-box v-ref:view-box v-if="showPage">
            <!--浮动导航条-->
            <div class="ay-fixed-bar">
                <div class="header" v-show="isFixed">
                    <label class="headend"><a class="icons icon-tel"  href="tel:{{this.NavList.Phone}}" name="hometel"></a><a @click="toDestList" class="icon-search"></a></label>
                    <div class="aoyoulogo">
                        <a href="http://www.aoyou.com" title="遨游网">遨游网</a>
                    </div>
                    <div class="cfcity">
                        <span @click="showDepart"><em id="mycity" cid="1">{{NavList.DepartCity}}</em><i></i></span>
                    </div>
                </div>
                <div class="tablist-fixed" v-if="isTablist">
                    <tab :animate="false" active-color="#F0643C">
                        <tab-item v-for="tuijianitem in TuiJianChanPin" :selected="select === tuijianitem.TabId "
                                  @click="tabClick(tuijianitem.TabId)">{{tuijianitem.TabName}}
                        </tab-item>
                    </tab>
                </div>
            </div>
            <div class="page-inner" :class="{'pad50':!isAppShow}" @touchMove="scrolldrfunc" @scroll="scrolldrfunc">
                <div v-if="isAppShow" class="banner-app">
                    <div class="banner-content column">
                        <div class="banner-left"><img src="http://images1.aoyou.com/upload/201609/24bdr406173857.png">
                        </div>
                        <div class="banner-middle">
                            <h2>遨游旅行APP</h2>
                            <p>移动下单折上折</p>
                        </div>
                        <div class="banner-right"><a name="homeapp" href="http://mact.aoyou.com/app">立即下载</a></div>
                    </div>
                    <i @click="closeBanner" class="banner-close"></i>
                </div>
                <!--head-->
                <div class="header"  v-if="isAppShow">
                    <label class="headend"><a name="hometel" class="icons icon-tel" href="tel:{{this.NavList.Phone}}"></a><a
                            @click="toDestList" class="icon-search"></a></label>
                    <div class="aoyoulogo">
                        <a href="http://www.aoyou.com" title="遨游网">遨游网</a>
                    </div>
                    <div class="cfcity">
                        <span @click="showDepart"><em id="mycity" cid="1">{{NavList.DepartCity}}</em><i></i></span>
                    </div>
                </div>
                <!--轮播 banner-->
                <section class="slider-box">
                    <swiper loop auto :list="bannerLists" :duration="500" auto dots-position="center" height="115px">
                        <span class="icon-adver"></span>
                    </swiper>
                </section>

                <!--menu bar-->
                <section class="ay-section no-padding">
                    <div class="menu-bar">
                        <ul class="row">
                            <li v-for="ChannelList in ChannelLists">
                                <a class="celly" :href="ChannelList.Href"
                                   :style="{'background':ChannelList.BcgroundImg}"><em>{{ChannelList.Name}}</em></a>
                            </li>
                        </ul>
                    </div>
                    <div class="text-slider">
                        <span class="newslogo"></span>
                        <div class="news-box">
                            <swiper loop auto height="30px" direction="vertical" :interval=2000 class="text-scroll"
                                    :show-dots="false">
                                <swiper-item v-for="item in NewsList"><a :href="item.Href"><p>{{item.ListText}}</p></a>
                                </swiper-item>
                            </swiper>
                            <a v-for="item in NewsList"></a>
                        </div>
                    </div>
                </section>
                <!--王牌签证-->
                <section class="ay-section" v-if="VisaList.VisaProducts && VisaList.VisaProducts.length>0">
                    <cell class="setion-title" :title="VisaList.VisaListTitle" :link="VisaList.VisaListLink"
                          :inline-desc="VisaList.VisaListInfor"></cell>
                    <div class="visa-item">
                        <a v-for="VisaProduct in VisaList.VisaProducts" :href="VisaProduct.ProductLink">
                            <div class="item-img">
                                <img src="http://pic1.aoyou.com/wap4.0/index/bg-s.png?imageView2/1/w/105/h/70/q/90"
                                     v-lazyload:opt.fadein="VisaProduct.ProductImageUrl+'?imageView2/1/w/105/h/70/q/90'">
                                <div class="shade">
                                    <h4 class="title">{{VisaProduct.ProductName}}</h4>
                                </div>
                            </div>
                            <div class="price">
                                <img class="flag" :src="VisaProduct.ProductLogoImg">
                                <span>￥{{VisaProduct.ProductPrice}}<b>起</b></span>
                            </div>
                        </a>
                    </div>
                </section>
                <!--周周爆款-->
                <section class="ay-section no-padding"
                         v-if="HotProductList.HotProducts && HotProductList.HotProducts.length>0">
                    <cell class="setion-title" :title="HotProductList.HotProductTitle" :link="HotProductList.HotProducLink"
                          :inline-desc="HotProductList.HotProducInfor"></cell>
                    <div class="product-item">
                        <a v-for="miaoshaitem in HotProductList.MiaoShaChanPin" :href="miaoshaitem.ProductLink">
                            <div class="item-img">
                                <img src="http://pic1.aoyou.com/wap4.0/index/bg-b.png?imageView2/1/w/335/h/155/q/90"
                                     v-lazyload:opt.fadein="miaoshaitem.ProductImageUrl+'?imageView2/1/w/335/h/155/q/90'">
                                <div class="shade">
                                    <div class="miaoshaotime">距离秒杀<span>{{maoshaoTime[0]}}</span>天<span>{{maoshaoTime[1]}}</span>:<span>{{maoshaoTime[2]}}</span>:<span
                                            class="red">{{maoshaoTime[3]}}</span></div>
                                </div>
                                <div class="product-price">
                                    <del>原价¥{{miaoshaitem.ProductOriginalPrice}}</del>
                                    <span>¥{{miaoshaitem.ProductPrice}}<b>起</b></span>
                                </div>
                            </div>
                            <div class="item-infor">
                                <h3 class="item-tit">{{miaoshaitem.ProductName}}</h3>
                                <p class="item-des">{{miaoshaitem.ProductSubName}}</p>
                                <div class="tag-wrap">
                                    <p>
                                        <span v-for="tag in miaoshaitem.ClasstTag"
                                              :class="{'tag-yellow':tag.TypeID==1,'tag-green':tag.TypeID==2,'tag-gray':tag.TypeID==3}">{{tag.Value}}</span>
                                    </p>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="item">
                        <a v-for="HotProduct in HotProductList.HotProducts" :href="HotProduct.ProductLink">
                            <div class="item-img">
                                <img src="http://pic1.aoyou.com/wap4.0/index/bg-m.png?imageView2/1/w/162/h/109/q/90"
                                     v-lazyload:opt.fadein="HotProduct.ProductImageUrl+'?imageView2/1/w/162/h/109/q/90'">
                                <div class="product-tag">
                                    <span class="tag tag-orange">立省{{HotProduct.ProductOriginalPrice-HotProduct.ProductPrice}}</span>
                                </div>
                            </div>
                            <div class="item-infor">
                                <div class="product-price">
                                    <span>¥{{HotProduct.ProductPrice}}</span>
                                    <del>¥{{HotProduct.ProductOriginalPrice}}<b>起</b></del>
                                </div>
                                <h3 class="item-tit">{{HotProduct.ProductName}}</h3>
                            </div>
                        </a>
                    </div>
                </section>
                <!--热门目的地-->
                <section class="ay-section" v-if="HotDestination.HotList && HotDestination.HotList.length>0">
                    <cell class="setion-title" :title="HotDestination.HotDestinationTitle" :link="HotDestination.HotDestinationLink"
                          :inline-desc="HotDestination.HotDestinationInfor"></cell>
                    <div class="hotdestination">
                        <a v-for="HotListitem in HotDestination.HotList" :href="HotListitem.HotListLink">
                            <span><em>{{HotListitem.HotListName}}</em></span>
                        </a>
                    </div>
                </section>
                <!--特色主题模块-->
                <section class="ay-theme" v-if="Theme.Traveler && Theme.Traveler.length>0">
                    <div class="pad20">
                        <cell class="setion-title" :title="Theme.TravelAreaTitle" :link="Theme.ThemeLink"
                              :inline-desc="Theme.TravelAreaInfor"></cell>
                    </div>
                    <div class="theme-product" v-for="themeItem in Theme.Traveler">
                        <a :href="themeItem.TravelerUrl">
                            <div class="theme-box">
                                <img src="http://pic1.aoyou.com/wap4.0/index/bg-b.png?imageView2/1/w/375/h/180/q/90"
                                     v-lazyload:opt.fadein="themeItem.TravelerAvatar+'?imageView2/1/w/375/h/180/q/90'">
                                <div class="theme-title">
                                    <span v-if="themeItem.TravelerTag">{{themeItem.TravelerName}}</span>
                                    <h3>{{themeItem.TravelerTag}}</h3>
                                </div>
                            </div>
                        </a>
                        <ul class="productlist">
                            <li class="list-item" v-for="proItem in themeItem.TravelerRecommend">
                                <a v-on:click='toProductDetail(proItem.ProductLink)'>
                                    <div class="img">
                                        <img :src="proItem.ProductImageUrl+'?imageView2/1/w/105/h/70/q/90'">
                                    </div>
                                    <div class="title">{{proItem.ProductName}}</div>
                                    <div class="price">
                                        ¥{{proItem.ProductPrice}}<span>起</span>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </section>
                <!--旅友圈-->
                <section class="ay-section" v-if="TravelArea.Traveler && TravelArea.Traveler.length>0">
                    <cell class="setion-title" :title="TravelArea.TravelAreaTitle" :inline-desc="TravelArea.TravelAreaInfor"></cell>
                    <ul class="list-collum">
                        <li class="list" v-for="Traveleritem in TravelArea.Traveler">
                            <a class="traveler-img">
                                <div>
                                    <img :src="Traveleritem.TravelerAvatar">
                                </div>
                            </a>
                            <div class="content">
                                <div class="ay_cell_bd ay_cell_primary">
                                    <div class="traveler-infor">
                                        <p>{{Traveleritem.TravelerName}}</p>
                                        <div class="ay-label-desc "><span class="travel-tag">{{Traveleritem.TravelerTag}}</span>
                                        </div>
                                    </div>
                                    <div class="product-item">
                                        <div v-for="Recommend in Traveleritem.TravelerRecommend">
                                            <p class="recommend">{{Recommend.LvYouDeYiJuHua}}</p>
                                            <a :href="Recommend.ProductLink">
                                                <div class="item-img">
                                                    <img src="http://pic1.aoyou.com/wap4.0/index/bg-b.png?imageView2/1/w/285/h/158/q/90"
                                                         v-lazyload:opt.fadein="Recommend.ProductImageUrl+'?imageView2/1/w/285/h/158/q/90'">
                                                    <div class="shade jian">
                                                        <div class="product-tag">
                                                            <span v-for="tag in Recommend.ProductTags">{{tag}}</span>
                                                        </div>
                                                    </div>
                                                    <div class="product-price">
                                                        <span>¥{{Recommend.ProductPrice}}<b>起</b></span>
                                                    </div>
                                                </div>
                                                <div class="item-infor">
                                                    <h3 class="item-tit">{{Recommend.ProductName}}</h3>
                                                    <p class="item-des">{{Recommend.ProductSubName}}</p>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </section>
                <!--推荐产品-->
                <section class="ay-section" v-if="TuiJianChanPin.length > 2">
                    <div>
                        <tab :animate="false" active-color="#F0643C" id="tablistbar">
                            <tab-item v-for="tuijianitem in TuiJianChanPin"
                                      :selected="select === tuijianitem.TabId "
                                      @click="tabClick(tuijianitem.TabId)">{{tuijianitem.TabName}}
                            </tab-item>
                        </tab>
                        <div class="product-item" id="tuijian">
                            <a class="item" v-for="Productlistitem in TempTuiJianChanPin.ProductList"
                               :href="Productlistitem.ProductLink">
                                <div class="item-img">
                                    <img src="http://pic1.aoyou.com/wap4.0/index/bg-b.png?imageView2/1/w/335/h/180/q/90"
                                         v-lazyload:opt.fadein="Productlistitem.ProductImageUrl+'?imageView2/1/w/335/h/180/q/90'">
                                    <div class="shade jian">
                                        <div class="product-tag">
                                            <span v-if="Productlistitem.ProductTag" class="tag"
                                                  :class="{'tag-red':Productlistitem.ProductTag=='自由行','tag-green':Productlistitem.ProductTag=='跟团游','tag-blue':Productlistitem.ProductTag=='邮轮','tag-pink':Productlistitem.ProductTag=='门票','tag-lgreen':Productlistitem.ProductTag=='当地玩乐','tag-brown':Productlistitem.ProductTag=='签证','tag-purple':Productlistitem.ProductTag=='耀悦'}">{{Productlistitem.ProductTag}}</span>
                                        </div>
                                    </div>
                                    <div class="product-price">
                                        <span>¥{{Productlistitem.ProductPrice}}<b>起</b></span>
                                    </div>
                                </div>
                                <div class="item-infor">
                                    <h3 class="item-tit">{{Productlistitem.ProductName}}</h3>
                                    <p class="item-des">{{Productlistitem.ProductSubName}}</p>
                                    <div class="tag-wrap">
                                        <p>
                                            <span v-if="Productlistitem.StarLevel" class="tag-yellow" >{{Productlistitem.StarLevel}}</span>
                                            <span v-for="dataLabelList in Productlistitem.dataLabelList" class="tag-green">{{dataLabelList}}</span>
                                            <span v-for="featuresLabelList in Productlistitem.featuresLabelList" class="tag-gray">{{featuresLabelList}}</span>
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </section>
                <div class="ay-footer">
                    <a href="http://m.aoyou.com/about.html#!/brand">
                        <div class="ay-ward">
                            <div class="tit">
                                <span>遨游6大旅游保障</span>
                            </div>
                            <ul class="listinfor">
                                <li class="list-star" v-for="listItem in listInfor">{{listItem}}</li>
                            </ul>
                        </div>
                    </a>
                    <ul class="footlink">
                        <li v-for="item in footlinks">
                            <a :href="item.url">{{item.title}}</a>
                        </li>
                    </ul>
                    <div class="ay-ward relat-link">
                        <p>
                            <a class="alink" href="http://m.aoyou.com/about.html#!/">关于我们</a>|<a class="alink"
                                                                                                 href="http://www.aoyou.com/?m">电脑版</a>
                        </p>
                        <p>版权所有中青旅控股股份有限公司 | 京ICP证：010423号</p>
                    </div>
                </div>
            </div>
            <tabbar class="ay-demo-tabbar" icon-class="ay-center" slot="bottom">
               <tabbar-item name="hometab" class="fix-select" v-on:click="clickTab('/wap.html')">
                    <span class="icon-index" slot="icon"></span>
                    <span slot="label">首页</span>
                </tabbar-item>
                <tabbar-item name="mddtab" v-on:click="clickTab('/mdd.html')">
                    <span class="icon-destination" slot="icon"></span>
                    <span slot="label">目的地</span>
                </tabbar-item>
                <tabbar-item name="findtab" v-on:click="clickTab('/find.html')">
                    <span class="icon-find" slot="icon"></span>
                    <span slot="label">发现</span>
                </tabbar-item>
                <tabbar-item name="visetab" v-on:click="clickTab('/visa.html')">
                    <span class="icon-visa" slot="icon"></span>
                    <span slot="label">签证大厅</span>
                </tabbar-item>
                <tabbar-item name="mytab" v-on:click="clickTab('http://mmy.aoyou.com/')">
                    <span class="icon-mine" slot="icon"></span>
                    <span slot="label">我的</span>
                </tabbar-item>
            </tabbar>
        </view-box>
        <div class="back_to_top" v-show="isReturnTop" @click="returnTop"></div>
        <div class="search-container" v-if="!showPage">
            <div class="search-tab">
                <div class="block align-center">
                    <span class="left-btn" @click="closeDepart"><i class="icons icon-close-black"></i></span>
                    <h3>选择城市</h3>
                </div>
                <!--搜索组件-->
                <search :results="results" placeholder="输入出发城市/地理位置" @result-click="resultClick"
                        :list-height="screenHeight" @on-change="getResult" :auto-fixed="false"
                        cancel-text="清除"></search>
            </div>
            <!--index-list部分-->
            <div class="page-indexlist-wrapper" v-if="!isResult">
                <index-list hottitle="热门城市" historytitle="搜索历史" locationtitle="定位城市" :sections="indexwords" :city="NavList.DepartCity" :history="HistoryCites"
                            :hotcity="HotCities" @select-item="selectHotFun">
                    <group v-for="item in alphabet" :title="item.initial">
                        <cell v-for="cell in item.tempArr" track-by="$index" :title="cell"
                              :activename="NavList.DepartCity" @click="selectCity(cell)"></cell>
                    </group>
                </index-list>
            </div>
        </div>
        <confirm :show.sync="show" title="" @on-cancel="onCancel" @on-confirm="onConfirm">
            <p style="text-align:center;" class=changecity>您当前定位城市已改变，是否切换出发地为 <span>{{currentcity}}</span> ？</p>
        </confirm>
        <router-view :transition="shopdir"></router-view>
    </div>
</template>


<script>
  //定义初始字体大小
  (function (root) {
    var docEl = document.documentElement
    var timer = null
    var width
    var last
    function changeRem() {
    //docEl.getBoundingClientRect().width
      width = 375
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

  var lastMoveTime = 0;
  var lastMoveStart = 0;
  var stopInertiaMove = false; // 是否停止缓动

  //本地存储选择历史
  var intervaltime, mstime

  import { go } from '../../libs/router'
  import store from '../../vuex/store'/*0228 F*/
  import {Loading,ViewBox,Headerbar,Search,Tab, TabItem, Group, Cell, Swiper, SwiperItem, Tabbar, TabbarItem, Switch,Actionsheet,IndexList,Confirm,Sticky} from '../../components'/*0228 F*/
  export default {
    components: {
      // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
      // 否则挂载点和组件名字一致, 即vhead
      Loading,
      ViewBox,
      Headerbar,
      Search,
      Tab,
      TabItem,
      Group,
      Cell,
      Swiper,
      SwiperItem,
      Tabbar,
      TabbarItem,
      Switch,
      Actionsheet,
      IndexList,
      Confirm,
      Sticky
    },/*0228 F*/
    store: store,/*0228 F*/
    vuex: {
        getters: {
            route: (state) => state.route,
            isLoading: (state) => state.isLoading,
            direction: (state) => state.direction
        }
    },/*0228 F*/
    props: {
      isResult:Boolean,
    },
    data (){
      return {
        isAppShow:true,
        currentcity:"北京",
        _oldcity:"北京",
        //search组件不可定位变量
        isFixed:false,
        //头部信息
        NavList:{DepartCity:""},
        //banner轮播图
        bannerLists:[],
        ChannelLists:[],
        NewsList:[],
        VisaList:[],
        HotProductList:[],
        HotDestination:[],
        Theme:[],
        select:"1",
        TravelArea:[],
        TuiJianChanPin:[],
        TempTuiJianChanPin:[],
        screenHeight:'0px',
        isTablist:false,
        isSearch:false,
        maoshaoTime:[],
        isTime:true,
        isSelect:true,
        listInfor:["首家上市旅行社","36年旅游积淀","透明价格权益保护","首批5A级旅行社","六钻品质标准","出游服务保障承诺"],
        showPage:true,
        alphabet: [],
        HotCities:[],
        HistoryCites:[],
        DepCityList:[],
        isFocus:false,
        autoFixed:true,
        isCancel:true,
        screenHeight:"0px",
        results: [],
        show:false,
        cityJson:[],
        indexwords:[],
        footlinks:[{"url":"http://m1.aoyou.com/yijianfangui.php","title":"用户反馈"},{"url":"http://wz.aoyou.com/m/","title":"论坛"},{"url":"http://m.aoyou.com/salestel/","title":"连锁店"},{"url":"http://mact.aoyou.com/app","title":"App下载"}],
        isReturnTop:false,
        bannerImgSize:'',//'?imageView2/1/w/414/h/115/q/90',
        productImgSize:'?imageView2/1/w/325/h/258/q/90',
        browserType:'',
        isAppInstalled:0,
        showState:"1",
        ipadHref:'https://itunes.apple.com/app/ao-you-tian-xiahd/id583752749',
        iphoneHref:'https://itunes.apple.com/app/ao-you-tian-xia/id583742532',
        androidHref:'http://a.app.qq.com/o/simple.jsp?pkgname=com.aoyou.android',
        weixinHref:'http://a.app.qq.com/o/simple.jsp?pkgname=com.aoyou.android',
        isLoading:true
      }
    },
    watch:{
        "NavList.DepartCity":{
            handler:function(oldval,newval)
            {
                if(oldval) {
                    var city = "#" + newval
                    __ozfac2('', city)
                }
            }
        },
        deep:true
    },
    methods: {
      takeData:function(i){
        var departCity=api.getDepCity()
        var channelTypeID=385
        var vm=this
        var useCache=false
        var useProxy=true
        // if(!api.getLocalStorage("depcity"))
        // {
        //   departCity={ "CityID": "1", "ChannelID": "1", "Phone": "400-600-6666", "OrderNum": "1", "CityName": "北京", "CityNamePY": "beijing", "GroupWord": "B" }
        //   api.setLocalStorage("depcity",JSON.stringify(departCity))
        // }
        // else
        // {
        //   departCity=JSON.parse(api.getLocalStorage("depcity"))
        // }
          this.NavList.Phone=departCity.Phone
          this.NavList.DepartCity=departCity.CityName

          api.post({
              path: api.config.microServiceHost.elementurl,
              controller: 'ElementService',
              action: 'GetCityInfos',
              param: JSON.stringify({}),
              useCache: useCache,
              useProxy: useProxy,
              callback: function(obj) {
                  if (obj.ReturnCode == 0) {
                      var data = obj.Data;
                      vm.HotCities = data.HotCities
                      vm.cityJson = data.Cities
                      vm.makeData(vm.cityJson)
                  }
              }
          });
          var bannerParam={
            cityId:departCity.ChannelID,
            channelTypeid:channelTypeID,
            type:2,
            SpaceGuid:'52ECF4D4-4B57-47A4-BE91-EE6779619E5B'
          }
          api.post({
              path: api.config.microServiceHost.elementurl,
              controller: 'ElementService',
              action: 'GetBannerList',
              param: JSON.stringify(bannerParam),
              useCache: useCache,
              useProxy: useProxy,
              callback: function(obj) {
                 if (obj.ReturnCode == 0) {
                    vm.bannerLists= []
                      var data = JSON.parse(obj.Data);
                      vm.bannerLists.splice(0,vm.bannerLists.length)
                      for(var i=0,len=data.length;i<len;i++)
                      {
                        data[i].img+=vm.bannerImgSize
                        vm.bannerLists.push(data[i])
                      }
                  }
                  /*if (obj.ReturnCode == 0) {
                      var data = JSON.parse(obj.Data);
                      vm.bannerLists = data.map((one, index) => ({
                          url: one.url,
                          img: one.img
                    }))
                  }*/
              }
          });
          var channelParam={
            cityId:departCity.ChannelID,
            channelTypeid:channelTypeID,
            type:2,
            SpaceGuid:'e2581cb3-feda-495e-b3b4-081fb04b3e92'
          }
          api.post({
              path: api.config.microServiceHost.elementurl,
              controller: 'ElementService',
              action: 'GetChannelInfos',
              param: JSON.stringify(channelParam),
              useCache: useCache,
              useProxy: useProxy,
              callback: function(obj) {
                  if (obj.ReturnCode == 0) {
                      var data = JSON.parse(obj.Data);
                      vm.ChannelLists.splice(0,vm.ChannelLists.length)
                      for(var i=0,len=data.length;i<len;i++)
                      {
                        data[i].BcgroundImg = "url("+data[i].BcgroundImg+"?imageView2/0/w/124/q/90)"
                        vm.ChannelLists.push(data[i])
                      }
                  }
              }
          });
          var msgParam={
            pagesize:3,
            pagenum:1,
            messageType:151
          }
          api.post({
              path: api.config.microServiceHost.elementurl,
              controller: 'Message',
              action: 'GetMessageList',
              param: JSON.stringify(msgParam),
              useCache: useCache,
              useProxy: useProxy,
              callback: function(obj) {
                  if (obj.ReturnCode == 0) {
                      if (obj.Data != "") {
                          var data = obj.Data;
                          //data.ListText=data.title
                          //data.Href=data.goUrl
                          vm.NewsList.splice(0,vm.NewsList.length)
                          for (var i = 0, len = data.length; i < len; i++)
                          {
                              data[i].ListText = data[i].title
                              data[i].Href = data[i].goUrl
                              vm.NewsList.push(data[i])
                          }
                          // console.dir({"title":"头条","data":data})
                      }
                      else{
                          vm.NewsList.splice(0,1)
                          vm.NewsList.push({ListText:"遨游世界，发现精彩",Href:"#"})
                          // console.log(vm.NewsList)
                      }
                  }
              }
          });
          var visaParam={
            cityId:departCity.ChannelID,
            channelTypeid:channelTypeID,
            type:3,
            SpaceGuid:'37ddce4a-5493-4043-ab21-9b0087e261a6'
          }
          api.post({
              path: api.config.microServiceHost.elementurl,
              controller: 'ElementService',
              action: 'GetVisaList',
              param: JSON.stringify(visaParam),
              useCache: useCache,
              useProxy: useProxy,
              callback: function(obj) {
                  if (obj.ReturnCode == 0) {
                      var data = obj.Data;
                      vm.VisaList=data
                      // console.dir(data)
                  }
              }
          });
          var qiangParam={
            cityId:departCity.ChannelID,
            channelTypeid:channelTypeID,
            type:3,
            SpaceGuid:'7a17cc9d-14b8-4083-9a02-de980b38bb2b'
          }
          api.post({
              path: api.config.microServiceHost.elementurl,
              controller: 'ElementService',
              action: 'GetQiangProduct',
              param: JSON.stringify(qiangParam),
              useCache: useCache,
              useProxy: useProxy,
              callback: function(obj) {
                  if (obj.ReturnCode == 0) {
                      var data = obj.Data;
                      vm.HotProductList=data
                      let _mst = vm.HotProductList.MiaoShaChanPin[0]
                      if(_mst && _mst.hasOwnProperty('MiaoShaJieShuShiJian')){
                        mstime = _mst.MiaoShaJieShuShiJian
                      }

                      intervaltime = setInterval(()=>{vm.getinterTime()},1000)
                      // console.dir({"title":"周周爆款","data":data})
                  }
              }
          });
          var hotDesParam={
            cityId:departCity.ChannelID,
            channelTypeid:channelTypeID,
            type:3,
            SpaceGuid:'46065e6f-8d7c-41fc-a662-3193ce00fff8'
          }
          api.post({
              path: api.config.microServiceHost.elementurl,
              controller: 'ElementService',
              action: 'GetHotDestination',
              param: JSON.stringify(hotDesParam),
              useCache: useCache,
              useProxy: useProxy,
              callback: function(obj) {
                  if (obj.ReturnCode == 0) {
                      var data = JSON.parse(obj.Data);
                      vm.HotDestination=data
                      // console.dir(data)
                  }
              }
          });
          var themeProductParam={
            cityId:departCity.ChannelID,
            channelTypeid:channelTypeID,
            type:1,
            SpaceGuid:'5E411997-4F82-49CF-82CF-C87EA1A90EA0'
          }
          api.post({
              path: api.config.microServiceHost.elementurl,
              controller: 'ElementService',
              action: 'GetTravelAreaProducts',
              param: JSON.stringify(themeProductParam),
              useCache: useCache,
              useProxy: useProxy,
              callback: function(obj) {
                  if (obj.ReturnCode == 0) {
                      var data = JSON.parse(obj.Data);
                      vm.Theme=data
                      // console.dir({"title":"主题产品","data":data})
                  }
              }
          });
          var travelAreaParam={
            cityId:departCity.ChannelID,
            channelTypeid:channelTypeID,
            type:1,
            SpaceGuid:'8FCE44A3-7B55-4F8A-BF66-17432979AA8D'
          }
          api.post({
              path: api.config.microServiceHost.elementurl,
              controller: 'ElementService',
              action: 'GetTravelAreaProducts',
              param: JSON.stringify(travelAreaParam),
              useCache: useCache,
              useProxy: useProxy,
              callback: function(obj) {
                  if (obj.ReturnCode == 0) {
                      var data = JSON.parse(obj.Data);
                      vm.TravelArea=data
                      // console.dir(data)
                  }
              }
          });
          var tuiJianChanPinParam={
            cityId:departCity.ChannelID,
            channelTypeid:channelTypeID,
            type:1,
            SpaceGuid:'AA0DC65F-0F6C-4913-97FB-889AF294CAB8'
          }
          api.post({
              path: api.config.microServiceHost.elementurl,
              controller: 'ElementService',
              action: 'GetTuiJianProducts',
              param: JSON.stringify(tuiJianChanPinParam),
              useCache: useCache,
              useProxy: useProxy,
              callback: function(obj) {
                  if (obj.ReturnCode == 0) {
                      var data = JSON.parse(obj.Data);
                      // console.log('推荐')
                       // console.log(data)
                      vm.TuiJianChanPin.splice(0,vm.TuiJianChanPin.length)
                      for(var i=0,len=data.length;i<len;i++)
                      {
                        vm.TuiJianChanPin.push(data[i])
                      }
                      vm.TempTuiJianChanPin = vm.TuiJianChanPin[0]
                      // console.dir(data)
                      vm.isLoading = false
                  }
              }
          });
          var appAdv=api.getLocalStorage('appAdv')
          if(appAdv!=null)
          {
              var days=(new Date().getTime()-appAdv)/(24 * 60 * 60 *1000)
              if(days<14)
              {
                vm.isAppShow=false
                if(!vm.isAppShow){
                    this.isFixed = true
                }
              }
          }
          
      },
      toProductDetail:function(url){
        location.href=url
      },
      //index-list 内的城市列表以及右侧导航
      makeData:function(dt){
      this.indexwords = []
      this.alphabet = []
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(initial => {
          let isShow = true
          let tempArr = []
          let cells = dt.filter(citycell => (String(citycell['CityNamePY']).toUpperCase()[0] === initial));
          for(let p=0,q=cells.length;p<q;p++){
            tempArr.push(cells[p]['CityName'])
          }
          if(tempArr.length>0){
            this.alphabet.push({initial,tempArr,isShow});
          }
        });
        this.indexwords.push({'initial':'定位'},{'initial':'历史'},{'initial':'热门'})
        this.indexwords = this.indexwords.concat(this.alphabet)
      },
      clickTab:function(url){
          
        api.pageGoTo(url)
      },
      //显示选择出发地页面
       showDepart:function(){
        this.showPage = false
        this.results = []
      },
      //跳转目的地选择页面
      toDestList:function(){
        var deCity=api.getDepCity()
        api.setLocalStorage("departure",'{"id":'+deCity.CityID+',"n":"'+deCity.CityName+'"}')
        api.pageGoTo("http://m.aoyou.com/destlist/1")
      },
      //关闭app下载
      closeBanner:function(){
        var dateNow=new Date().getTime()
        api.setLocalStorage('appAdv',dateNow)
        this.isAppShow= false
        this.isFixed =true

      },
      //关闭出发地选择
      closeDepart:function(){
        this.showPage = true
        this.isFixed = false

      },
      focusFunc () {
        this.$els.input.focus()
      },
      goSearch:function(){

      },
      PhoneCall:function(){
          api.telClick(this.NavList.Phone)
      },
      resultClick (item) {

        this.selectCity(item.title);
      },
      //获取搜索列表关键词数据 原始数据 模糊匹配 START
      takeSearchList:function(val){
        let rs = []
        if(val != undefined && val != ''){
          let upperVal = String(val).toUpperCase();
          for (let i = 0,j= this.cityJson.length; i < j; i++) {
             if(String(this.cityJson[i]['CityNamePY']).toUpperCase().indexOf(upperVal) == 0 || this.cityJson[i]['CityName'].indexOf(upperVal) == 0){
              rs.push({
                title: this.cityJson[i]['CityName'],other: i
              })
            }
          }
        }
        return rs
      },
      getResult:function(val){
        setTimeout(() => {
          this.results = this.takeSearchList(val)
        }, 500);
      },
      selectHotFun:function(item){
        this._oldcity = this.currentcity
        this.currentcity = item.CityName
        //this.show=true
        var cityItem=this.cityJson.filter(function(element, index, array){
          return element.CityName==item.CityName
        })
        if(cityItem.length>0)
        {
          // console.log({"title":"当前触发城市","data":cityItem[0]})
          api.setLocalStorage("depcity",JSON.stringify(cityItem[0]))
        }
        if(this.HistoryCites!=null&&this.HistoryCites.length>0){

          if(inarray(this.HistoryCites,item)){
              this.HistoryCites.splice(0,0,item)
          }
        }else{
            this.HistoryCites=[]
            this.HistoryCites.push(item)
        }
        if(this.HistoryCites.length>3)
        {
            this.HistoryCites.splice(2,this.HistoryCites.length-3)
        }

        api.setLocalStorage("historycity",JSON.stringify(this.HistoryCites))
        this.isTablist = false
        this.isFixed =false
        this.showPage = true

        this.takeData()
      },
      //判断数组中是否存在某对象
      ArrayMake:function(arr,item){
        for(var i in arr){
          if(item.CityID == arr.CityID){
              return true;
          }
          return false;
          }
      },
      selectCity:function(_str){
        //修改当前城市
        var cityItem=this.cityJson.filter(function(element, index, array){
          return element.CityName==_str
        })
        if(cityItem.length>0)
        {
          // console.log({"title":"当前触发城市","data":cityItem[0]})
          api.setLocalStorage("depcity",JSON.stringify(cityItem[0]))
        }
        this._oldcity = this.currentcity
        this.currentcity = _str
        //this.show=true
        if(this.HistoryCites!=null&&this.HistoryCites.length>0){

          if(inarray(this.HistoryCites,cityItem[0])){
              this.HistoryCites.splice(0,0,cityItem[0])
          }
        }else{
            this.HistoryCites=[]
            this.HistoryCites.push(cityItem[0])
        }
        if(this.HistoryCites.length>3)
        {
            this.HistoryCites.splice(2,this.HistoryCites.length-3)
        }
        this.isTablist = false
        this.isFixed = false

        this.showPage = true
        this.takeData()
      },
      onCancel:function(){
        this.currentcity = this._oldcity
      },
      onConfirm:function(){
        // this._oldcity = this.currentcity
        // this.NavList.DepartCity = this.currentcity
        this.showPage = true
        this.takeData()
      },
      returnTop:function(){
        document.querySelector('.page-inner').scrollTop = 0

      },
      //页面touchmove移动时 推荐主题标签置顶、显示回到顶部 START
      touchmovefunc:function (type) {
        let e = event
        if(type=='start'){
            this.showState = "0"
            //缓动代码
            lastMoveStart = e.currentTarget.scrollTop;
            lastMoveTime = e.timeStamp || Date.now();
            stopInertiaMove = true;
          }else if(type=='move'){
            //缓动代码
            var nowY = e.currentTarget.scrollTop;
            var nowTime = e.timeStamp || Date.now();
            stopInertiaMove = true;
            if(nowTime - lastMoveTime > 300) {
                lastMoveTime = nowTime;
                lastMoveStart = nowY;
            }
          }else{
           //this.showState = "1"
            //缓动代码
            var nowY = e.currentTarget.scrollTop;
            if(lastMoveStart == nowY){
              this.showState = "1"
              return;
            }
            var nowTime = e.timeStamp || Date.now();
            var v = (nowY - lastMoveStart) / (nowTime - lastMoveTime); //最后一段时间手指划动速度
            stopInertiaMove = false;
            var _this = this;
            (function(v, startTime) {
                var dir = v > 0 ? -1 : 1; //加速度方向
                var deceleration = dir*0.0006;
                var duration = v / deceleration; // 速度消减至0所需时间
                if(Math.abs(duration)>3000){
                  duration = 1000
                }
                setTimeout(function(){
                  _this.showState = "1";
                  return;
                }, Math.abs(duration)-500);
            })(v, nowTime);
          }

      },
      //页面touchmove移动 END
      //页面scroll滚动时 推荐主题标签置顶、显示回到顶部 START
      scrolldrfunc(e){
       //header
        if(this.isAppShow){
          if(document.querySelector('.page-inner').scrollTop > 64){
            this.isFixed = true
          }else {
            this.isFixed = false
          }
        }else{
          this.isFixed = true
        }
        //show top 移动大于400px时 显示回到顶部按钮
        var mTop = document.getElementById('tablistbar').offsetTop-48;
        if(document.querySelector('.page-inner').scrollTop > mTop){

          this.isTablist = true
        }else {
          this.isTablist = false
        }
        //show top 移动大于600px时 显示回到顶部按钮
        if(document.querySelector('.page-inner').scrollTop > 400){
          this.isReturnTop = true
        }else {
          this.isReturnTop = false
        }
      },
      //页面scroll滚动 END
      //推荐主题标签切换 START
      tabClick:function(i) {
        this.select = i
        this.TempTuiJianChanPin=this.TuiJianChanPin[i-1]
        var mTop = document.getElementById('tablistbar').offsetTop;
        document.querySelector('.page-inner').scrollTop=mTop-50;
      },
      //秒杀时间倒计时
      getinterTime:function(){
        var day,hour,minute,second,cha,cha1,cha2,cha3,string
        var cha = mstime
        mstime--
        if(cha<=0){
          clearInterval(intervaltime)
          this.maoshaoTime = ["00","00","00","00"]
          return
        }else{
          day = Math.floor(cha/86400)
          if(parseInt(day)<10){
            day =  '0'+day;
          }
          cha1 = cha - day * 86400
          hour = Math.floor(cha1/3600)
          if(parseInt(hour)<10){
            hour =  '0'+hour;
          }
          cha2 = cha1 - hour * 3600
          minute = Math.floor(cha2/60)
          if(parseInt(minute)<10){
            minute =  '0'+minute;
          }
          cha3 = cha2 - minute * 60
          second = Math.floor(cha3)
          if(parseInt(second)<10){
            second = '0'+second;
          }
          this.maoshaoTime = [day,hour,minute,second]
        }
      },
    },
    //index-list组件传右侧菜单栏信息
    created() {
        _ozuid=api.getMemberId();
        this.bannerLists = []
        this.takeData()
        this.HistoryCites = JSON.parse(api.getLocalStorage("historycity"))
        this.screenHeight = `${document.body.clientHeight - 44}px`//计算搜索关键词列表高度：屏幕高度-顶部标题栏高度
    },
    ready(){
     /*if(!this.isAppShow){
        document.querySelector('#nomalhead').style.display = 'none'
        document.querySelector('.page-inner').style.paddingTop = '51px'
        this.isFixed = true
     }*/
    }
  }

  function getResult (val) {
    let rs = []
    for (let i = 0; i < 8; i++) {
      rs.push({
        title: `${val} result: ${i + 1} `,
      other: i
    })
    }
    return rs
  }
  //搜索关键词模糊匹配 START？？
  function getdataFormReg(datas,_txt,ky1,ky2,ky3,ky4){//从数据中获取正则匹配
    let _temfuzzydata = [];
    if(_txt == ""){
      _temfuzzydata = []
    }else{
      let reguse = new RegExp('^' + _txt + '.*$', 'im');
      for (let i = 0,j=datas.length; i < j; i++) {//匹配
        if(datas[i][ky1]){
          if (((datas[i][ky4]).indexOf(_txt) != -1) || ((datas[i][ky1]).indexOf(_txt) != -1) || reguse.test(datas[i][ky2]) || reguse.test(datas[i][ky3])) {
            _temfuzzydata.push({
              title: `${datas[i][ky1]} `,
            other: i
          })
          }
        }
      }
    }
    return _temfuzzydata;
  }
  //搜索关键词模糊匹配 END

  //判断是否存在
  function inarray(needle, haystack) {
    for (var i = 0, n = needle.length;i < n;i++)
      if (needle[i].CityID === haystack.CityID)
        return false;

    return true;
  }



</script>

<style lang="less">
    @import '../../styles/index.less';
    @import '../../styles/ayui/base/reset.less';

    html, body {
        height: 100%;
        width: 100%;
        overflow: hidden;
        &::-webkit-scrollbar {
            display: none;
            width: 0;
            height: 0;
        }
    }

    li {
        list-style: none;
    }

    a {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    em {
        font-style: normal;
    }

    input:focus {
        outline: none;
    }

    .align-center {
        text-align: center;
    }

    [v-cloak] {
        display: none
    }
    .page-inner.pad50{
        padding-top: 50px;
    }
    .page-inner {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        overflow: scroll;
        &::-webkit-scrollbar {
            display: none;
            width: 0;
            height: 0;
        }
    }

    .page {
        width: 100%;
        height: 100%;
        min-width: 300px;
        max-width: 640px;
        margin:0  auto;
        background: #f5f5f5;
        overflow: hidden;
        font-family: Helvetica, sans-serif;
        .ay-header-bar {
            background-color: transparent;
            position: absolute;
            z-index: 9;
            top: 0;
            &.shade {
                background-image: -webkit-linear-gradient(top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
                background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
            }
        }
        .ay-slider>.ay-swiper>.ay-swiper-item{
            a>img{
                height:115px;
                width: 100%;
            }
        }
        .ay-slider > .ay-indicator > a > .ay-icon-dot, .ay-slider .ay-indicator-right > a > .ay-icon-dot {
            width: 20px;
            height: 2px;
            background-color: #fff;
            opacity: .5;
            border-radius: 0;
            float: inherit;
        }
        .ay-slider > .ay-indicator > a > .ay-icon-dot.active, .ay-slider .ay-indicator-right > a > .ay-icon-dot.active {
            background-color: #FF4800;
        }
        .ay_cell_bd > p {
            line-height: 1.4;
            color: #333;
            overflow: hidden;
            display: -webkit-box;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
        }
        .ay_cell_bd > .active {
            color: #FF5523;
        }
        .ay-label-desc {
            font-size: (12rem/20);
            display: block;
            color: #999999;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
        }
        .ay_cell {
            padding: (17rem/20) 0;
        }
        .ay_cell_ft.with_arrow:after {
            height: (20rem/20);
            width: (20rem/20);
            border-color: #777;
            right: 0;
            top: 30px;
            border-width: 3px 3px 0 0;
            -webkit-transform:scale(0.5) rotate(45deg);
            transform: scale(0.5) rotate(45deg);
        }
        .ay-slider > .ay-indicator, .ay-slider .ay-indicator-right {
            bottom: -6px;
            width: 100%;
            text-align: center;
        }
        .ay-slider > .ay-indicator > a, .ay-slider .ay-indicator-right > a {
            float: none;
            margin-left: 0;
        }
        .ay-tab {
            padding: 17px 0;
            height: 40px;
        }
        .ay_tabbar_item.fix-select.ay_bar_item_on .ay_tabbar_label {
            color: #FF5523;
        }
        .ay_tabbar_item.ay_bar_item_on .ay_tabbar_label {
            color: #333;
            font-size: 12px;
        }
        .ay-tab .ay-tab-item {
            background: none;
            overflow: hidden;
        }
        .ay-tap-active:active {
            background-color: transparent;
        }
        .ay_tabbar_icon {
            span {
                display: block;
            }
        }
        .ay_tabbar_icon + .ay_tabbar_label {
            margin-top: 0;
            line-height: 1.2;
        }
        .ay_tabbar_item {
            padding: 7px 0 5px;
        }
        .ay_search_bar {
            padding: 6px 15px;
            background-color: #f5f5f5;
        }
        .ay_search_bar:before {
            border: 0;
        }
        .ay_search_bar:after {
            border-color: #333333;
            border-bottom: 0;
        }
        .ay_search_outer {
            padding: 0;
            background-color: transparent;
        }
        .ay_search_outer:after {
            border: 1px solid #dfdfdf;
            border-radius: 100px;
        }
        .ay_search_inner .ay_search_input {
            font-size: 17px;
            color: #333;
            -webkit-font-smoothing: antialiased
        }
        .ay_icon_search:before {
            color: #999999;
            font-size: 16px;
        }

        .ay_dialog {
            border-radius: 6px;
            height: 185px;
            width: 72%;
            .ay_dialog_ft {
                padding: 0 25px;
                a {
                    margin: 0 5px;
                }
            }
        }
        .ay_dialog_ft:after, .ay_dialog_confirm .ay_dialog_ft a:after {
            border-top: 0;
            border-left: 0;
            display: none;
        }
        .ay_dialog_confirm .ay_dialog_ft a {
            border-radius: 100px;
            border: 1px solid #dfdfdf;
            height: 38px;
            line-height: 38px;
            border-radius: 100px;
        }
        .ay_dialog_ft a:after {
            content: "";
            width: 100px;
            height: 40px;
            border-radius: 100px;
            border: 1px solid #DFDFDF;
        }
        .ay_tab_bd {
            padding-bottom: 0;
        }
    }

    /*app banner*/
    .banner-app {
        position: relative;
        display: block;
        width: 100%;
        height: (64rem/20);
        z-index: 9999;
        background-color: rgba(0, 0, 0, 0.8);

        .banner-content {
            display: -webkit-flex;
            display: flex;
            padding: (7rem/20) (15rem/20) (7rem/20) (38rem/20);
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            -webkit-font-smoothing: antialiased;
        }

        .banner-left {
            width: (64rem/20);
            height: 100%;

            img {
                height: 100%;
            }
        }

        .banner-middle {
            width: auto;

            h2 {
                margin: 0;
                padding: 0;
                font-size: (20rem/20);
                color: #E8470B;
                font-weight: normal;
                line-height: (28rem/20);
            }

            p {
                margin: 0;
                padding: 0;
                font-size: (15rem/20);
                color: #fff;
                line-height: (22rem/20);
            }
        }

        .banner-right {
            position: relative;
            -webkit-flex: 1;
            flex: 1;
            -webkit-box-flex: 1;
            -moz-box-flex: 1;
            -ms-flex: 1;
            width: auto;
            height: 100%;

            a {
                display: block;
                position: absolute;
                right: 0;
                top: (10rem/20);
                width: 88%;
                max-width: (88rem/20);
                height: (30rem/20);
                background: #fff;
                border-radius: 4px;
                font-size: (12rem/20);
                color: #666;
                line-height: (30rem/20);
                text-align: center;
            }
        }

        .banner-close {
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            margin: 0;
            width: (32rem/20);
            height: (32rem/20);
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAA79JREFUeAHtmr+LE0EUx+eMkCOFhYVNGsmli6UoQTF/gl0StNHC/AMGISBErIKtgqSyiZVVmoCFJJ3YWAWxsFBJ5a87JXgq0fW9cC9ONju/9sdk192Bx+7OzL55n+++mczu3Q5jzAFLazk8llbyI+79TICUZ8BBlgEpz4BsDcimQDYF0q1AtgZka0C6ZwDLpsAOZECa3wYLaRbgJzz83TQvgvu4/mUCoAopLanPgAN88JFMgUKhwIbDIZtOp6xcLgdKsEajwWazGet0OoH8eNy8zACsx5/B0AzgnfF47FCB4B0QwZf/ZrPpLBYLcuV0u11ffgR89xEeS5hOHXjyq4DpxI8Ibnjy1Wq1wor3LsKHPgX29vbQ71opFotsMploTweAZ4PBgOVyuTU/eFEqlTbqfFZEMwUw3fGJexWdTIA5v5b2vJ/RaOTk8/mwMuAaCReWw5UfvyJYhMdYL0cmADheLnwmmWAZHgW4FKkAJiJsAR4FOBO5ADoitNttW3N+NUUxLrCTVgRQicAvcvx5yAueG35O8Hh0N0ZyLVsYeXA8jxge+V5ZFwCF1hHBAjwK8GQrAqAIOOdFBbe9lUolkgzEsTm7uRUBZKs9iaKzWeJAeCiT84vWBdCBtyQCLoC7VgWQwfNveyQAHiPMhLX5j0KYpI5xXxk8Lng45012jCHEe4V/+pEKoIKnFxvZr0PImYDpf8KKALrwEMwyqyyJ8NANj9fGaa26xxSe/FkQYbX/R3AqoQpQr9cD7e1VIsAHF7/xPiVg99GvQ8/7RAuayQ5PJkK/3/ccF6BU9Wfd4HStutGoHb7e8r9my3MTeALxEmE+nzvVatUoniN/Gz99BI9HPw6l9+DXWyp+4CkmXgSEr9Vq0nHpPtfxO1xLv837caq8B7/e9nq9wN/wcM5j2vt88hjnLTBh+d//OvwSyM+B/RYpEPpncdFAW6j/DGPWwYTwFJMynaFj0vr8gphXHz0JVHRMGpxOvNdFsF71Og6T1OeeF6SsLklwqliHAGq8rqmcJqX9McDnZU9a1JYUQFmcd0RwOvUyx3Fv+wGAV3UgZX3iDimK7yNAXZCB6baJBohz/TOAO60LqOoXZ1B3bF8B5oYKyLTdPUgcr3Fn9wDslCmcTv84AlNMuMg9Atv8vxsdMs0+NFicju8h9ttgkTxxty5xAX8NgeE29jwYvqZbKcetjPJvkD9w+gHsLdg7sDdgL8Ceg30Cs16CCPANov0Chu/ddBSdUzv+axpmXGwKCnAIRgGqAPj2RWwoAgTyF5IbZiDlMkWSAAAAAElFTkSuQmCC) no-repeat;
            background-size: 100%;
            background-position: center;

        }

    }

    /*aoyou-header*/
    .header {
        width: 100%;
        box-sizing: border-box;
        position: relative;
        background-color: #fff;
        padding: 13.5px 15px;
        .headend {
            position: relative;
            z-index: 1;
            float: right;
            line-height: 1;
            margin-top: -3px;
            a {
                margin-left: 10px;
            }
        }

        .aoyoulogo {
            background: url(http://pic1.aoyou.com/webapp/msite/root/log.png) 0 0 no-repeat;
            background-size: 100%;
            width: 130px;
            height: 23px;
            text-indent: -9999px;
            margin-right: 10px;
        }
        .cfcity {
            position: absolute;
            left: 0;
            top: 10px;
            width: 100%;
            height: 29px;
            line-height: 29px;
            span {
                min-width: 42px;
                margin-left: 154px;
                margin-top: 0;
                position: relative;
                display: inline-block;
                text-align: center;
                em {
                    min-width: 40px;
                    font-size: 14px;
                }
            }
            i {
                position: absolute;
                right: -10px;
                top: 12px;
                content: "";
                width: 8px;
                height: 8px;
                background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAOdJREFUOBFjYBgFjLAgmDlzZg6Q/TI9PX01TAwbvWrVKp73799PYmJiqkxNTX0JNmDWrFm5////nwTU8AeIo3AZAtL84cOHHUC11kB114CGODFt27aNHchJB2IQYAHiZUDXhIJ5SASaZpCMFtAgNyYvL6+fjIyMzkCBa1D1GIZg0cwA1JOXlpa2GB4Gs2fPFv/3798+kMlQg8DeERQU3I7kbLAUVPNkEAduAIiDzRCg4ptAp2qD5EEAWTOYDxZFIrAYApdF14zVAJAgNkOwacZpALohuDSD1OEFwOgUmT9/vgJeRQMuCQD2MXwuzUE36gAAAABJRU5ErkJggg==") 0 0 no-repeat;
                background-size: 100%;
            }
        }
    }

    .fixed {
        position: fixed !important;
    }

    .slider-box {
        padding-bottom: 20px;
        background-color: #fff;
    }

    .list-star {
        &:before {
            content: "";
            width: 7px;
            height: 7px;
            display: inline-block;
            margin-right: 2px;
            background-position: center;
            background-size: contain;
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAANCAYAAACZ3F9/AAAAAXNSR0IArs4c6QAAARpJREFUKBV1kb9KA0EQxr+5XCAkEcTGSgiIabS08i+SziaCSN5GH8LniH8eQNKojY2NhRErKxsbMQRMdpyZeHu3x+3B7sx83292j1kg8vFV+1BXxEYaMzDn83+vV8VQlcjDpV24+b15SW2PTr8fylxSFqx27sLrxdyLAPH1cgdutg3wBhhdiV2JOwVGKDzKNpY4lvgGpE/ENytrmE1HAq8HcKwgvCNtHCV08vWBevNATnqNsbkujLDa44fDt61V/OIOzJs5WMiIXlBHj/o/n6r64ZhAdFlAw1S8rCloNMq56tvULHn+Rmsk2rK42PQdF2+pdejlv2osQxrpWfJjOpvs69LcNPOMCjcedRo8bA+Y2Q8sI1QzT5hM+wMEQ1c/sCEkDAAAAABJRU5ErkJggg==");

        }
    }

    .slide-tab {
        position: relative;
        width: 100%;
        height: 40px;
        background-color: #fff;
        -webkit-transform: translateZ(0);
        -moz-transform: translateZ(0);
        -ms-transform: translateZ(0);
        -o-transform: translateZ(0);
        transform: translateZ(0);
    }

    .recommend-tab {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 40px;
        overflow: hidden;

        .tab-box {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 40px;
            overflow: hidden;
        }

        ul {
            position: relative;
            display: flex;
            display: -webkit-flex;
            display: -webkit-box;
            overflow-x: auto;
            overflow-y: hidden;
            -webkit-overflow-scrolling: touch;
            height: 50px;
            list-style: none;

            &::-webkit-scrollbar {
                display: none;
                width: 0;
            }

            li {
                position: relative;
                display: block;
                width: 4.7rem;
                height: 40px;
                border-bottom: 2px solid #fff;
                box-sizing: border-box;
                font-size: .7rem;
                color: #666;

                &:before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 10px;
                    display: block;
                    width: 1px;
                    height: 40px;
                    background-color: #EEE;
                    z-index: 5;
                    -webkit-transform-origin: 50% 0%;
                    transform-origin: 50% 0;
                    @media only screen and (-webkit-min-device-pixel-ratio: 2) {
                        transform: scaleY(0.5);
                    }
                    @media only screen and (-webkit-min-device-pixel-ratio: 3) {
                        transform: scaleY(0.5);
                    }
                }

                &:first-child {
                    &:before {
                        width: 0;
                    }
                }

                span {
                    display: block;
                    width: 100%;
                    height: 40px;
                    /*border-bottom: 2px solid #FF552E;*/
                    box-sizing: border-box;
                    text-align: center;
                }

                &.active {
                    color: #FF552E;
                    border-bottom: 2px solid #FF552E;
                }
            }
        }
    }

    .ay-header-bar .ay-header-title, .ay-header-bar h1 {
        .departciry {
            font-weight: normal;
            color: #FFFFFF;
            letter-spacing: 0.72px;
        }
    }

    .ay-swiper-desc {
        display: none;
    }

    .section {
        padding: 20px;
    }

    .ay-header-box {
        position: relative;
    }

    .departciry {
        .citys {
            display: inline-block;
            width: 60px;
            position: relative;
            font-size: 17px;
            font-weight: normal;
            -webkit-font-smoothing: antialiased;
            &:after {
                content: "\20";
                position: absolute;
                right: 0;
                top: 50%;
                margin-top: -5px;
                border: 1px solid #5F646E;
                border-color: #fff #fff transparent transparent;
                -webkit-transform: rotate(135deg);
                transform: rotate(135deg);
                width: 6px;
                height: 6px;
                font-weight: bold;
                color: #fff;

            }
        }
    }

    .ay-fixed-bar {
        box-sizing: border-box;
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 99;
        .header {
            border-bottom: 1px solid #D9D9D9;
        }
        .tablist-fixed {
            display: block;
            background-color: #fff;
            padding: 0 1rem;
            .ay-tab {
                padding: 6px 0;
            }
        }
    }

    .ay-theme {
        background-color: #fff;
        margin-bottom: 3px;
        .pad20 {
            padding: 0 20px;
        }
    }

    .ay-section {
        padding: 0 1rem 15px;
        background-color: #fff;
        margin-bottom: 3px;

        .ay_cell_bd > p {
            font-size: 19px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
        }
    }
    .setion-title{
        .ay_cell_primary{
            flex: initial;
            width: 90%;
        }
    }
    .theme-product {
        .theme-box {
            position: relative;
            overflow-x: hidden;
            img {
                display: block;
                width:100%;
            }
        }
        .theme-title {
            background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, .5));
            width: 100%;
            position: absolute;
            bottom: 0;
            box-sizing: border-box;
            padding: 15px 20px 20px;
            span {
                display: block;
                background-color: #fff;
                width: 70px;
                height: 20px;
                line-height: 20px;
                border-radius: 5px;
                text-align: center;
                overflow: hidden;
                padding: 0 3px;
                font-size: 14px;
                box-sizing: border-box;
                color: #333;
            }
            h3 {
                font-size: 19px;
                color: #fff;
                font-weight: normal;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                -webkit-font-smoothing: antialiased;
            }
        }
    }

    .productlist {
        padding: 0 20px 15px;
        &:after {
            content: "";
            display: table;
            clear: both;
        }
        margin-top: 15px;
        .list-item:last-child {
            &:after {
                border-bottom: 0;
            }
        }
        .list-item {
            display: block;
            &:after {
                content: "";
                display: table;
                clear: both;
                margin: 15px 0 0;
            }
            a {
                display: block;
            }
        }
        .img {
            position: relative;
            overflow: hidden;
            margin-right: 10px;
            float: left;
            width: 105px;
            height: 70px;
            img {
                border-radius: 5px;
            }
        }
        .title {
            height: 40px;
            overflow: hidden;
            display: -webkit-box;
            margin-bottom: 10px;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            white-space: normal;
            font-size: 14px;
            line-height: 20px;
            padding-top: 1px;
            color: #333;
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
    }

    .ay-footer {
        text-align: center;
        -webkit-font-smoothing: antialiased;
        margin-bottom: 50px;
        .tit {
            margin-bottom: 6px;
            color: #fff;
            font-size: .7rem;
            background-position: center;
            background-image: url("http://pic1.aoyou.com/wap4.0/index/ward.png");
            background-size: contain;
            background-repeat: no-repeat;
        }
        .ay-ward {
            background: #F5F5F5;
            padding: 8px 20px;
        }
        .footlink {
            background-color: #fff;
            padding: 0 20px;
            &:after {
                content: "";
                display: table;
                clear: both;
            }
            li {
                float: left;
                width: 25%;
                height: 50px;
                line-height: 50px;
                &:last-child {
                    a:after {
                        display: none;
                    }
                }
                a {
                    display: block;
                    color: #333;
                    font-size: 12px;
                    position: relative;
                    &:after {
                        content: "";
                        height: 14px;
                        width: 1px;
                        display: block;
                        position: absolute;
                        top: 18px;
                        right: 0;
                        clear: both;
                        border-right: 1px solid #CCCCCC;
                    }
                }
            }
        }
        .relat-link {
            background: #F5F5F5;
            padding: 16px 20px;
            font-size: 12px;
            color: #999999;
            .alink {
                padding: 0 10px 10px;
                display: inline-block;
                color: #999999;
            }
        }
    }

    .back_to_top {
        position: fixed;
        right: 15px;
        bottom: 85px;
        z-index: 10;
        display: block;
        width: 35px;
        height: 35px;
        background: rgba(255, 85, 35, 0.5);
        border-radius: 50%;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.4);
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-transition: opacity 0.6s;
        transition: opacity 0.6s;
        &:after {
            content: "";
            display: block;
            width: 15px;
            height: 12px;
            background-size: 100%;
            background-repeat: no-repeat;
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAXCAYAAAAcP/9qAAAAAXNSR0IArs4c6QAAAQBJREFUSA3t1kEOwUAUxvHWQiJxAzu2LmDrCE5CuuIAVlYcRNhaOYatA9gQCwn1f9FX06aStjMmkXjJl2mHvt+ojgjjOJ4HQRCRJvFRN5BFCHzmoO1DNIxLg5MVkVX4KrGWvrC/82N3gJ0wInsy8bZ0sCG5Eq3Z13GkPKr49Gt4AXpXNRnd4wXokbk+2SWoDu5wOuZvr6A9ubWMLeIe/4B2ze/TOV4G1QU4w6ugzvA6qDVug9bGXaCVcdABMX8GZctknl5tWnbk+qKtNs5cz5u2RMsa1eY0zOMn5uRfz6s4iciDHIjVJ9WeOtJP8A2RWut8OjLZIe/VpK+4OZD+Zqcn48dB44oMUXYAAAAASUVORK5CYII=");
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

    .no-padding {
        padding-bottom: 0;
    }

    .menu-bar {
        em {
            font-style: normal;
        }
        .row {
            columns: auto 3;
            -webkit-columns: auto 3;
            -moz-columns: auto 3;
            column-gap: 1px;
            &:after {
                content: "";
                display: table;
                clear: both;
            }
            li {
                list-style: none;
                box-sizing: border-box;
                text-align: center;
                vertical-align: middle;
                font-size: 17px;
                .celly {
                    display: block;
                    box-sizing: border-box;
                    height: 44px;
                    line-height: 44px;
                    border-bottom: 1px solid #fff;
                    overflow: hidden;
                    text-shadow: 0 2px 1px rgba(0, 0, 0, .2);
                    color: #fff;
                    background-repeat: no-repeat !important;
                    background-position: center bottom !important;
                    background-size: cover !important;
                }
            }
            li:nth-child(1){
                .celly {
                    height: 88px;
                    border-bottom: 2px solid #fff;
                }
            }
            li:nth-child(3){
                .celly {
                    height: 88px;
                }
            }
            li:nth-child(9) {
                .celly {

                }
            }
            li:nth-child(12), li:nth-child(13) {
                .celly {

                }
            }
            li:nth-child(1), li:nth-child(2), li:nth-child(5), li:nth-child(6),li:nth-child(10),li:nth-child(11){
                .celly {
                    border-bottom: 2px solid #fff;
                }
            }
            li:nth-child(1){
                .celly {
                    border-top-left-radius: 6px;
                }
            }
            li:nth-child(3){
                .celly {
                    border-bottom-left-radius: 6px;
                }
            }
            li:nth-child(9){
                .celly {
                    border-top-right-radius: 6px;
                }
            }
            li:nth-child(13){
                .celly {
                    border-bottom-right-radius: 6px;
                }
            }

        }
    }

    .text-slider {
        padding: 8px 0;
        .newslogo {
            display: block;
            float: left;
            width: 23%;
            height: 30px;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            background-image: url("http://pic1.aoyou.com/wap4.0/index/toutiao.png");

        }
        .news-box {
            margin-left: 24%;
            overflow: hidden;
            height: 30px;
            line-height: 30px;
            a {
                display: block;
                font-size: (14rem/20);
                color: #666666;
            }
            p {
                margin-left: 10px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
            }
        }

    }

    .item {
        &:after {
            content: "";
            display: table;
            clear: both;
        }
        a {
            float: left;
            display: block;
            width: 48.4%;
            padding-bottom: 15px;
            &:nth-child(2n) {
                margin-left: 3.2%;
            }
        }
        .item-img {
            position: relative;
            overflow: hidden;
            border-radius: 6px;
            img {
                width: 100%;
                vertical-align: middle;
                border-radius: 6px;
            }
        }
        .item-infor {
            .product-price {
                -webkit-font-smoothing: antialiased;
                b {
                    font-weight: normal;
                    font-size: .6rem;
                }
                span {
                    color: #FC5A3F;
                    font-size: (16rem/20);
                    vertical-align: 2px;
                }
                del {
                    font-size: (14rem/20);
                    color: #999999;
                    vertical-align: 2px;
                }
            }
        }
        .item-tit {
            height: 38px;
            font-size: (14rem/20);
            color: #333333;
            line-height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2; /*控制溢出文本的行数*/
            -webkit-font-smoothing: antialiased;
            font-weight: normal;
        }
        .item-des {
            font-size: (12rem/20);
            color: #999999;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1; /*控制溢出文本的行数*/
        }
    }

    .visa-item {
        &:after {
            content: "";
            display: table;
            clear: both;
        }
        a {
            display: block;
            float: left;
            width: 31.4%;
            margin: 0 2.9% 15px 0;
            &:nth-child(3n) {
                margin: 0 0 15px 0;
            }
        }
        .item-img {
            position: relative;
            overflow: hidden;
            border-radius: 6px;
            img {
                width: 100%;
                vertical-align: middle;
                border-radius: 6px;
            }

        }
        .shade {
            display: flex;
            position: absolute;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            -webkit-transform: translateX(-50%) translateY(-50%);
            transform: translateX(-50%) translateY(-50%);
            background-color: rgba(0, 0, 0, .4);
            color: #fff;
            text-align: center;
            justify-content: center;
            border-radius: 6px;
        }
        .flag {
            display: inline-block;
            width: 15px;
            height: 10px;
            img {
                width: 100%;
                vertical-align: middle;
            }
        }
        .price {
            text-align: center;
            font-size: (14rem/20);
            color: #FC5A3F;
            -webkit-font-smoothing: antialiased;
            b {
                font-weight: normal;
            }
        }
        .title {
            font-weight: normal;
            font-size: .725rem;
            -webkit-font-smoothing: antialiased;
            font-size: .725rem;
            font-style: normal;
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            white-space: nowrap;
            width: 100%;
            -webkit-transition: all 1s;
            transition: all 1s;
            -webkit-font-smoothing: antialiased;
        }
    }

    .product-item {
        a {
            display: block;
            &:after {
                content: "";
                display: block;
                width: 100%;
                border-bottom: 1px solid #D9D9D9;
                margin: (17.5rem/20) 0;
            }
            &:last-child {
                &:after {
                    border: 0;
                }
            }
        }
        .recommend {
            margin-bottom: 15px;
            font-size: .7rem;
            color: #333333;
            line-height: 19px;
            -webkit-font-smoothing: antialiased;
        }
        .item-img {
            position: relative;
            overflow: hidden;
            border-radius: 12px;
            overflow: hidden;
            img {
                width: 100%;
                vertical-align: middle;
                border-radius: 12px;
            }
        }
        .item-tit {
            margin-top: 10px;
            font-size: (16rem/20);
            color: #333333;
            line-height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2; /*控制溢出文本的行数*/
            -webkit-font-smoothing: antialiased;
            font-weight: normal;
        }
        .item-des {
            margin: 4px 0 0;
            font-size: (12rem/20);
            color: #999999;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2; /*控制溢出文本的行数*/
        }
        .shade {
            position: absolute;
            top: 0;
            left: 0;
            height: 50px;
            width: 100%;
        }
        .jian {
            background-image: linear-gradient(to bottom, rgba(0, 0, 0, .3), rgba(0, 0, 0, 0));
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
        }
        .product-price {
            position: absolute;
            right: 10px;
            bottom: 10px;
            width: 90px;
            padding: 4px 0;
            line-height: 0.8;
            background-color: #FF5647;
            border-radius: 50px;
            color: #fff;
            text-align: center;
            -webkit-font-smoothing: antialiased;
            b {
                font-weight: normal;
                font-size: .6rem;
            }
            del {
                font-size: (12rem/20);
                vertical-align: 2px;
            }
            span {
                font-size: (16rem/20);
            }
        }
    }

    .miaoshaotime {
        padding: 3px 10px;
        position: absolute;
        top: 10px;
        left: 0;
        background: #fff;
        opacity: .92;
        font-size: .7rem;
        color: #FF5523;
        border-top-right-radius: 50px;
        border-bottom-right-radius: 50px;
        span {
            font-size: .6rem;
            color: #666666;
            /*border: 1px solid #999999;*/
            border-radius: 7px;
            width: 18px;
            height: 20px;
            line-height: 22px;
            margin: 0 4px;
            vertical-align: 1px;
            font-size: .6rem;
            color: #666666;
            border-radius: 7px;
            width: 18px;
            position: relative;
            height: 20px;
            display: inline-block;
            margin: 0 4px;
            vertical-align: 1px;
            text-align: center;

            &:after {
                content: "";
                width: 200%;
                height: 200%;
                display: inline-block;
                transform: scale(.5);
                left: 0;
                box-sizing: border-box;
                top: 0;
                margin-left: -9px;
                border-radius: 12px;
                margin-top: -10px;
                position: absolute;
                border: 1px solid #999999;
            }
        }
        .red {
            color: #FF5523;
        }
    }

    .product-tag {
        position: absolute;
        top: 0;
        left: 10px;
        width: 60px;
        span {
            font-size: .625rem;
            text-align: center;
            padding: 4px 0;
            line-height: 1;
            display: block;
            background-color: #1CB677;
            color: #fff;
            -webkit-font-smoothing: antialiased;
            &:nth-child(2) {
                display: block;
                background-color: #ffffff;
                color: #1CB677;
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
            }
        }
        .tag {
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
        }
        .tag-orange {
            background-color: #FF812F;
        }
        .tag-red {
            background-color: #FF6602;
        }
        .tag-green {
            background-color: #70C100;
        }
        .tag-blue {
            background-color: #35A3EC;
        }
        .tag-pink {
            background-color: #FF7375;
        }
        .tag-purple {
            background-color: #B964A7;
        }
        .tag-brown {
            background-color: #BF956A;
        }
        .tag-lgreen {
            background-color: #64D58E;
        }
    }

    .tag-wrap {
        height: 16px;
        overflow: hidden;
        p {
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            align-items: flex-start;
            -webkit-align-items: flex-start;
            -webkit-box-align: start;
            width: 200%;
            overflow: hidden;
            transform: scale(0.5);
            -webkit-transform: scale(0.5);
            transform-origin: 0 0;
            -webkit-transform-origin: 0 0;
        }
        span {
            display: block;
            margin: 4px (10rem/20) 0 0;
            padding: 0 (5rem/20);
            height: 1.4rem;
            background-color: #F5F4EF;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
            font-size: 1rem;
            color: #666;
            line-height: 1.4rem;
            text-align: center;
            text-wrap: none;

            &.tag-red {
                background-color: #F50000;
                border: 1px solid #F50000;
                color: #fff;
            }
            &.tag-yellow {
                background-color: #fff;
                border: 1px solid #FDA403;
                color: #FDA403;
            }
            &.tag-green {
                background-color: #fff;
                border: 1px solid #5FC579;
                color: #5FC579;
            }
            &.tag-gray {
                background-color: #fff;
                border: 1px solid #E0E0E0;
            }
        }
    }

    .travel-tag {
        width: auto !important;
        background-color: #FF9B35;
        color: #fff !important;
        padding: 1px 10px;
        text-align: center;
        border-radius: 100px;
        font-size: 0.625rem;
        height: 14px;
        line-height: 1.2;
        -webkit-font-smoothing: antialiased;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
    }

    .hotdestination {
        padding-bottom: 15px;
        &:after {
            content: "";
            display: table;
            clear: both;
        }
        a {
            float: left;
            display: block;
            width: 25%;
            font-size: (14rem/20);
            color: #333333;
            padding: 15px 0;
            line-height: 1.2;
            text-align: center;
            line-height: 0;
            em {
                height: 16px;
                line-height: 16px;
                font-size: 14px;
                display: inline-block;
                overflow: hidden;
                vertical-align: middle;
            }
            span {
                height: 20px;
                line-height: 20px;
                position: relative;
                -webkit-line-clamp: 1;
            }
            &:nth-child(1) span:after {
                position: absolute;
                top: -2px;
                left: -20px;
                display: block;
                content: "";
                width: 18px;
                height: 18px;
                background-repeat: no-repeat;
                background-size: contain;
                background-position: center;
                background-image: url("http://pic1.aoyou.com/wap4.0/index/hotred.png");
            }
            &:nth-child(2) span:after {
                position: absolute;
                top: -2px;
                left: -20px;
                display: block;
                content: "";
                width: 18px;
                height: 18px;
                background-repeat: no-repeat;
                background-size: contain;
                background-position: center;
                background-image: url("http://pic1.aoyou.com/wap4.0/index/hotyellow.png");
            }
            &:nth-child(3) span:after {
                position: absolute;
                top: -2px;
                left: -20px;
                display: block;
                content: "";
                width: 18px;
                height: 18px;
                background-repeat: no-repeat;
                background-size: contain;
                background-position: center;
                background-image: url("http://pic1.aoyou.com/wap4.0/index/hotblue.png");
            }
        }
    }

    .travelarea {
        .avatar {
            float: left;
        }
    }

    .traveler-infor {
        p {
            font-size: (17rem/20);
            line-height: 1.2;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
        }
        margin-bottom: 15px;
    }

    .list-collum {
        .list {
            &:after {
                content: "";
                display: table;
                clear: both;
            }
            &:last-child {
                .content {
                    &:after {
                        border-bottom: 0;
                    }
                }
            }
        }
        .traveler-img {
            position: relative;
            margin-right: 12px;
            float: left;
            img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }
        }
        .content {
            padding-left: 50px;
            margin-bottom: 10px;
            &:after {
                content: "";
                display: block;
                border-bottom: 1px solid #D9D9D9;
            }
        }
    }

    .listinfor {
        &:after {
            content: "";
            display: table;
            clear: both;
        }
        li {
            float: left;
            width: 33.33%;
            color: #999999;
            font-size: .6rem;
            line-height: 1.8;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
        }
    }

    .icons {
        width: 30px;
        height: 30px;
        display: inline-block;
        background-repeat: no-repeat;
        background-size: 60%;
        background-position: center;
    }

    .icon-tel {
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABnVJREFUWAm1mH1M1WUUx7kXQomoeUtFYI6bVs7XVF5iQlEZCRqaG25pNWu55R9NW1purcLa+qOmy9mWQ1xUa62wXMW0KAuD4u2y3hZqWEgDqYGI8iov3j7nx/P89ruXy+UC9z7bc895zjnPOd/nPK+/awvzU7Kzs6e1t7enut3u+TabzXHt2rXTMTExJ8vKyvr9dAuqyubLW3JyciygXkS3GerwsvkHsE+7XK4TXvKQNEcBTEpKygVUIdFm+ok4YLfb19bW1n7rxyYoKg+AgFsPuM/wbNfeydaf8D8i74DmUeeKDvlZp9O5qLi4eFjaoSomQKb1TtZYBYGiVbDzZGmbNUsrV64UcL9RbxIbQOaEeqrNTJGht4mpwZ2JiopaYQUngOrq6mT9FQgvhT4bR7jQ/RoAmdocgq2SMADoj4yMfKiiouKSr7Bk9ZhFnpufn28O0iIPGms4B9xWi8d3Kisrz1naHmx1dXUVglYlnHX8+HFjYB5GQWzY8/LyIsnaGu2TDB3SvC+KrZv6udaxbh/WfCiovampaSkZjFHOz9XU1Miu9Vuwt07zBr/GU1Tah4eHndoHmZEdGkj5HqNOMQSsk929JJBOk7GRNWica6pzUyBO2M2DDMZ6SK8IpN9kbFhydvMsJOjABJx0aVv63aD5YFM7i/yqdgo/XfP+KFN6Pfpsi83fFj6orGTQPO/IRMJ43gF3HXYfsPZixRb+IlfeyfH6TVZvJ8DvujNBl2neF83MzIxA/jF25g1C/13cxxNZGr5cjymTXVyPVgeYR4ZuGcu6q6trGzrz3APcm1yHRWPZB0NuVztSbgcpNqZ80wg7+hdAT2op/BEeCs/rdqiocdUR7EMdgI3yuOZ90AYtY5rT5MWt26GiBsCIiIijBNDTnMrTy7z6rIEBtYfB6ONlYVtb2z6rPhR8uDhtbm7ui4+Pl12ZIm2ALElPTz9cX1/vlrYura2tl+fMmSO7fp2SpdCv/cKFC7XaJtjUAChOExMTXWyY7bCR1NjOzs4IAn8nOmsBpAtQC5AtVvI1CQkJZ7D9w2oXLN68RcQh78LdZO8N5dwdHh6ey+OhxDtYWlpa1MDAgIC/S3RM+xB1Czv6E29b3cb3YnwvxS4Cv66qqqrT8B4zpG2t1AMgDmysvxJojjLqZVfnEPiUtZPwKSkpN5PxH2AXSptg8m2yk50tL3OzcGwtQHcIn/eYwhGmAfkBh8NRVFpa2uOlM5seAEVKdhyDg4MuHDqVVTcjziKTlWYvxaSmps4G5ElsF2kdQY8QdIcEJWuZ6L5E5++uvkSfw8Q4yGO4WfvRdBRAUZDFWzluJDvxyvAyDlYD0qXaJsnIyJjZ29v7BQJjupXiLzJ/BHAvUaNEBog+ePliHKLmUmdQzYJe5MXE2QfQOq3wCVCUjP4OyCmczlbGlziOctSTX4lGCFfg9O7u7gJsH/NQqAbBJTOrmf6zIsrKyoru6OjYiv0OmreJzFLkxX7A6XS+IFfomAClg1rY8jjV118PmdnAmrS+BU3frLfNOD9IYIcpDAs7T1buI/uNFpnBYmdjLa9jtp5FcK9Vj5/9DOg5vwClAw6Wsc5KYWcpB1cJ+AgBj6m2B1FreA/CVQD4lazvJev/eRj5aKjv8tdQ6TNWTpF54wIUX4C8HZDfwM6VNqMbpspH/bvSDlaRT9iSkpKvGNgDyuc286D2F6SlpeUih/Gn2MjxI9Ntx8n6uLi4YQ5u2UxBKfxr5sanfMYmKYcnAsqgji47tq+v72vALdcyaCF/yW3HuezCKRWu1xn9/f1N+I8RR0zx3cZjIVCv5eXlbXTKZHplunV5indiCWfijVowWQq4lzU4YvzCOi+fEEAJzIK/gpO1sO9ZgDzIGv2JDTLfIpsQyyZ5FL87dSf414Wf0BTrzppyDOXj6BXdhnZzDO2Njo5+K9AplzO0p6dH/OyiGnuC7B1lA26CuqcEUIAx8i04LqSaX4Q4loP5fZZDERlvEDvvIp8WDOZ++u2lyqVgFJla2qt46feKYMoAxQmZXI5TOXJGfXQRUG4POaTPUzuwm4EsDSq2HvGRV1I3kr1/0RnFw0ALJ0P5Eyq8sbHxGQLvpn/cRHwAqg/7/U6n81XvL8SgAdSAFNAsgD6BTB4F07TOB5Xp/4j/Iwv4y6/Fh94zxb4MpiKThy1AE4eGhhKFkil5wVxh7cn9/PNYoKwx/wdVT6UoBT5srQAAAABJRU5ErkJggg==");
    }

    .icon-search {
        display: inline-block;
        width: 30px;
        height: 30px;
        background-size: 60%;
        background-position: center;
        background-repeat: no-repeat;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABXtJREFUWAnNmF1MXFUQx9mFpCDQJqCJQGIiTRq1Rql8BWETIkprCBofSEwTa2Iqxhcbq6a1NkqsKW1o7YO+aKLGNCYa1ABqaOBBArzw1b5UfKEJDyx9sAViIcjXrr+53Lk5u3v37gK74knOzpk5c2b+Z87HnbO+jC2UqqqqA6FQ6EWGBMLhcDFUaiH1js/nm4XOIh+Edk1MTNyC7rj4ElloaWnJnJ6efg1gb6P7aCJ97QfwTeqnTU1N37a1tYVUvlXqCbCysrIZYBcxmjSwaAA20PfGxsauRfclw/vdlJixv7y8/BLgeug3wS3Cd/r9/leysrIqaBeXlpbuyc7OLsnMzKwEzKvUn5EvUa3Ckj+OnV7snaftGRAdY9KYAbW1tfkrKys/YOx5Q3Eex+15eXmfDQwM/GPIXZuAuY9JnADYKRT2qRI2egoKCo729fU5E9C+eDQCoETuV0oUuM6cnJw3hoeH5+MZiSfnUBUC8ivsycGyCiC7We6XoGGVedEIgBUVFZcxdtIeECYKbaOjo+eSNebmCHs+9vIn0DPaj73z4+PjHyjvRR2A9oGQPWcVwH3ETD9WfqdU9iA23lc7gGwEZL/y8ah1SOQqYSnktGrplMgpkwra3Nx8FlBOAIhoh2ypRLatCBK91wH4pa08z57bv509l8hZIBB4YHl5+Rbg8kUXwMeI4lWvcdYMACeXsFUY1J4OcGJ8aGjoL4ncpifr1/FryCKafvl8IbHuOsDdk6skQiPFTH5+/hX8WFcVYA+xNx/ycuEnes4VwIBrydxzXgYT9WFfLnvzcDj+3cbKEge0g5PrbGKVpYMSCNOP49/Nlx9lyUisAsA/tZ1Oip9Jtc9yl2jbjUoEHYDr6+uSMqW9AOq24aTIaMc0BaDkc1bhw39X2+mkADT9OP7dfArAO9oxOzt7v7bTSTmYph/Hv5tPP7NxlnVtbc1ZbjflVMnY9+aymssd40Ii6ABkZo/FaKRBQFAOqlnABrXtRuUUDxodnneSobejJj4dP4A1/cfYlQh2qZSBhyXZVD4dtLq6ei9+GtQ2mXi3tt2oX15fzOIPuzOXO+qEm2KqZFxl72Brj21vYmRkZMbLtkRQsorLqsQ+PCWZsPKppGRND2JPAFrF9KuyaGoBlKchyjftzn2AlDTdSWajB22Hl9wPm18zNtcef52E+PtEthwQzO4IwHp1AICTTst1jBeNfk6g28D2+t1rjPRZEZSG/W5tl7YUZntG0vSdRlIiFwUug33elgw4weFE0AYlD5wuQL0gvBQi2UOGfVySzU1J8r+y57D1DfWIMSqMzTfJpL8wZHGbEQBFq7GxMXdubu47jJp31T34Dkk27XwurkHpkKvEPq1yIHTPmWME5FuA/NwUurVjAIoSYGKeiiLHqGTC/fT3SMoEf5t6F17ev8W0D0Il+s9S9SqhmSFP2AvoNVCrRCAF/ZOAvLLJuf+6AlRV9s5zGOyAf1Jl26DXGfOu7DmJ7MbGRi82nzbsnKbPfFEaXcYhiZDaDLPr57n4FDM9Rr3hpuMhm2DMUWxU6IHgUv6bN89h5IPGuAscxrMGH9H0jGCEJoz9wJG9GcCJZMKSlcilLvmd/DcYFOfy+fL6Qtif018Y8wxVyzkm8qEySrcEUAelgtbU1OSsrq5KHtCo9tinF7nuTisvNNNk/sv2zMzMellZWefS0tIh/B4Q36xAXUlJyV4S5z7FsmsABcDU1NRGXV3djwsLC0/APmKDqgFkISCtr9quAhRAk5OTG0VFRT+xd+XPA02YqwFZFAwGf9u1PWhHyyH19fVZi4uLV1nmlx1hRkb7rkdQwfBHfYh/d7tY7oeR6b27/38DUICy3OHW1tZu9mY2kSxl2S/9C5o0MZ7cly9FAAAAAElFTkSuQmCC");
    }

    .icon-adver {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 9;
        width: 20px;
        height: 10px;
        display: inline-block;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAYAAAD/Rn+7AAAAAXNSR0IArs4c6QAAAx1JREFUSA1jNDIySmMYRICZmfkb0DnPubm5Tx44cOALs6SkpPEgch/D////WYFY6NevX2rq6up3mYh13JQpU/ymTZsWQKx6mDp+fn6W7OxsPRkZGU6QGIg/f/78CDs7O3GYGmw00JHsX79+NSfagadPn76lqqqqCUwSQtgMxCWWnp5u5Onp6fr58+ffIDXAKGQCOlZJWFgY7GBc+qDikizoClpbWx2UlZWV0MWhfMba2tqonz9/gtIJBoiKipr/79+//zAJYDpitra2tnjy5Mk9bW1tQZA4FxcX2E5paWkBKysrUZhaGH3u3Ll3P378+Avi//37F6IYJgmigT4TZAKCM2fOXEIWh7KvYBGDCyE7DiRYX1/vBHQQD9DDmo2NjZpwhUCGv7+/FxAjC4HZlZWVM4B2v4NJYIQgSOLDhw/vurq6TsEUkUM3NDTY6unpGc2bN2/VwYMHn8LMEBAQYJ04cWLOokWL1u7du/cRTBxGv3jx4geMDaKxOhBZATlsTU1NXnNzc8slS5asX758+R1kM2DR9+XLl5/Pnj37jiyHjU0TB16/fv1zWVnZrKtXr34EphZGZItZWVnBfGBmYUSXg6lDTipYHYisAKaJFBoYfbHA8lUWnx5g7o4EYqxKTpw4cRSYGQ+CJDEcyMLCwvbt27cvWHUSKQgs53YLCgoSU4xgNfHu3bvvYRIYDmQDgjdv3vyCKSCH3r9//wty9GHTg+FATk5OLmAIYi3nsBmATywjI0PX2dnZCp8aZLnFixfv2LRp00NkMQwH8vLyCjx9+hQexMiKSWUDzWIHeph7165d+/HpBWUYLy8vD6B6NnR1KA7U19cXACpmvnPnDrygRNdAKv/379+/Jk2adB6fPlBuBjkQmxqUuhhY9cj9+fPn9/Hjx19hUzwQYughqAwsyR8Dmzr/qOUYYLnHlpeXZ4DPPFzlIUgP3IGg5pCCgoLatm3bduIzjFQ5ULFlY2NjSkAfSmGOrBbuQFDRcuPGjcvA6ukasgJK2G/fvv366NGjO2lpaWvwmQMKQWAOjv/48SNG1cc42Jr86B4BAI2ICay9qencAAAAAElFTkSuQmCC");
    }

    .icon-find {
        width: 21px;
        height: 21px;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: url("data:image/png;base64,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");
    }

    .icon-visa {
        width: 24px;
        height: 21px;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: url("data:image/png;base64,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");
    }

    .icon-mine {
        width: 21px;
        height: 21px;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: url("data:image/png;base64,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");
    }

    .icon-destination {
        width: 21px;
        height: 21px;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: url("data:image/png;base64,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");
    }

    .icon-index {
        width: 21px;
        height: 21px;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: url("data:image/png;base64,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");
    }

    .icon-close-black {
        display: inline-block;
        width: 15px;
        height: 15px;
        margin-top: 13px;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAA6FJREFUaAXV2zuIE0EYB/DsRkEkwUaLPAqrBO8QiySVjciVvgoPH4iVr0KxsjixSClYaaVXKb4KBUUiWEn6JNfYWAZEg6dokdgkmvj/Qibs7WWzMzuP7AwMM7s7uzO/28dNvk2cUqm0x3GcB6PR6EQikegg3261Wm9RWp/K5fJJuO4CkoHxHeo3krlcbh2Vi1i5C3kf8pl8Pv8NaQN1a1OlUrkM1zMAyES2Q0DnkplM5vFkBYpxctDwmM1owg6Hw0fQOBMTK/a7qNFl7E8O7UA7+jfEfRm36KUALA29Q+A15BEt+ZJ1aMLCsI7sP7NEI+NastPpfM5ms1+xcBzZ39CayzsM67rutWaz+TwJZALoDZvRPNhGo0FnPjEG24wWwW4BMzQ9nekpjeXYX96i2G1gWkH/f21AR8HOBNuAjooNBMcZLYOdC44jWhYbCo4TWgWWCxwHtCosN3iRaJVYIfAi0KqxwmCTaB3YSGATaF3YyGCdaJ1YKbAOtG6sNFgl2gRWCVgF2hRWGVgGbRKrFBwFbRpLY/R/yKd10mlOmJSOPUJ86SoiixRUCwy4UQyKhWWkB+Q5gBYwHT8MPRnDrP7pD6IFS31OY1qTASgrwiIn6Mg4lnDawHTwEDQ18SatZ5Z1pBVMnRAaIeDvqFJgMDDhMr6Oe/ZhYANFG+jNg9ZUrVZdvMQ6HNYJHmJHkHaEtZPdrvUME7ZWqz1B2PcCx0CX+/3+gWKx+Kbdbg852kdqog0siGWD147WAubA/obwD/JuJvWUy4PBYKlQKGg508rvYU7sCoBHkX96oNMqboHT3W73hY57etb/wmnHohVeLL5SMf52AaaWB9HHR+S9AX29SqfT5+v1+t+A7cKrlYFFsWykptFKwFGxi0BLg2WxptFSYFVYk+jIYNVYU+hIYF1YE2hhsG6sbrQQ2BRWJ5p7pmUaS2hMUD6hCJyRYdtqr9d7KTIj4zrDi8ASmKWwyQk+fr5OpVLneGZkoeBFY1Wj54LjglWJDgTHDasKPRMcV6wK9DZw3LGy6C1gW7Ay6CnYNmxU9BhsKzYK2rEdK4pOIlh2BzvdZDv6SoourrAYlG9brBbxJfdNvOH4gEGtIs+Khi4h7r2T3gpcCRi5NVg2/rC5N1ldhET/sR08pXVYNvZ5aFiHdIbvs8ZUYvkXCisuY++4vXUP+od3PVnHT2n8ZO0sNpxC3sTKe3iL98Xb0NY6PmXRT/BuYfxZ5Pf4VcvT/9VxHDK/F3xQAAAAAElFTkSuQmCC");
    }

    .active, .fix-select.ay_bar_item_on {
        .icon-visa {
            background-image: url("data:image/png;base64,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");
        }
        .icon-destination {
            background-image: url("data:image/png;base64,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");
        }
        .icon-find {
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAAAXNSR0IArs4c6QAABQNJREFUWAnVmWtsVEUUx/+ze2kXfCWIEZsIlDS0ohIFDI9WTECDSKxKLAmGqMHEKAlqol/8IEYxBg0am/jBT0QMCQk1RCoGSNAP0lZtSXxQW2oIWIgL0UBAK267peP/zOzdx927273bxy4n2b1z53Hmt+fcOTP3rMIYRDfV3Q3EGwE1n2qqoHQVtKoyKpWOshxlmR/dA0xpVS0njhc7nQo60MCp4U3QeIwA1cHGq9NQ2A/t7AwKXTCobrpzFtTgNsJtJGQoGKCnt8IIvbAbuvIN1fLrGU+r7+2ooASsIODbhHuFkJW+WoqtVIgRuJlqtxJ4KJ+avKC6qeYWwu2jgoZ8SsahrY3A61TLyb9y6crpQr2hdgEhuyYBUthoCN1l5/RH9bWoGTB8tZ2Dr/cfNlG1agBOuF7t6fvFO0MWaMLdYsnZ3s6TdN/Px+A+72OQ4XqzcOwzWSpIsQXn1vssS8o0GaBQMYafCV84qdlzlxpMpElrT7rexslYH8NQJK29dEUJXTpS68bZlEUlmJcLpJhHWMwGY21lLGq3xfhPbEyBl86WqZllB9NT7pHt1oLZvXviIOfwzPLUa8COr4BPfwTWc5MrRMRwwkZJWLTmFG1dXcjYgvvMrgOWPQIs52fmnMxhA5eBTYsy63LeqdMMVXMdG9yHxweyciqweiOwsomHvrmpqS9xZ/z+EDBwCXhyC/Dn2VTbqCVdLYwOro7wPDkOctcy4OWPgJtutsouXwB+OAx00N29nXSYBl7cbtuOfR1sQjI6VHBHsFE+vVc8Dmx+HwjxMT9xDPj8Y6C7Axjhac4VpwJYstretX/p1hZ2JaPDnvZEXtiQ7F51i62lBFKsuGMz8PfF7H4LHwCm3QCc6gbO/Z7dnr+miquKrw/FisC98C4Q5u8VOHH71t3AjdOzNdY/auvaD2S3jVZDxlDyHWe0zn7ty9faRRNl0Hh1DXD2N2DWPOBND2xkGrBopX1OiwHlexhNMgZZ8YQdfGCndftbXPECe7sHdil/RAV35l4eyi6eL2pCcX20qJHi3gX1wHCcoeegVSHu98JOvxVYx+dW5Mgeew36TUZxfXGgEsxDYeDno4yPDOCueGE/YPycyZPbmT6gGLeLXjKK64sDdRdHW6uLmLoK7PbngSv/ANdxpceHgA+32Gc01StIKepAqV4TjIMMm8FAUbsQiF0BvMF7xm3A/Yyra5+14WhokNDP0RxccEWL7mHAD+9nZN4WSEcDQ43iMUEgB/8DpvLVaunDgAT++Utsmyjs6QQ+eR043x9IfXZnZlmkku9J/LkBDiXvtADz7gUO7rKxc/GDdlWLsiG+qncdAb7ZCxzvkJoxSuJQYrSYNIskGAoU98Cx5hk7QPbx7u+Ab7+wh4/YvwUqKqCbsFG4pVCYC4KKv1TwwVms9dAG4A86ovMwcJQL6sI5o2pcv8zBmWwU43op6PU1u7ionpZy2YhSn6m9J43bUjsTE1bk5hItEzEvd8JkJQlq3vaUbnYbSn9Vze4bqLAkQQ2YjsgvaDPl0n61SYYvHSH5jLqV10RKR2BNzsdxGlkacOEn7ypJMqfRm3eS+TNdnyAy2TRm1Xjbn6iajEt/rkyeTJ7l+nSiayKRa36FyQBHVnFff29CQpeEIKM7ssrP3elGy2vR9I42iVbGfzakw0q57P++8QIbaMnzSwLD5gZy/yEmZ95wqNUv5e2n16/uf96Gt/TQHIVBAAAAAElFTkSuQmCC");
        }
        .icon-index {
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAAAXNSR0IArs4c6QAABBhJREFUWAntmGlIVFEUx/9nxsolcSQJKqFtTFOCoIWiaKNvRZExky1ECkkLBBEtRJQRFARBtEES1YcWtaiIiiDCpYgIzKi0HG35EEUfIiszzZlO587zOYvOe44z6UBeeNy595x7zm/O3S8wkKIbAYqWOXZmzgI8W8TeAjC3SH4X1rj9VFL/MRo+IgbloiILai/sAXivAFkDoAifYbE6qMT1IKC+F4WIQDkvcyQ8nosCOS+0b3KDaBuVNRwLrWMu6TUoOzIWgfi8dHOauRulQZeQmrKeiqvVsAg7hQ3KjpzBQNshieJW8RZu++ewUC6VNr4JlzQsR7zCPh5/uEScTA3XkZ9+E8i6mspcd/zqTH9aTDU6FNiZsRJ/UCPFSCCVNRvYc4ud9n3M3ONAmSpy4ZRENH07LmOxoIM5mtltJCWvofPPmsyMGoKyI2sSyF0qkBPNDPVeTo1AXC5def3CyEbIrpeu3gBqf/JvIRUa24H2x96hZUDaJaK8brINLc1nBHC5Qbt/IyI6iuz07VRU4Q52EADKDvtM+YeXRWl0sGKflYmqYI130uWXn/19dna9QO4SQZV8/QepyJjnwN1aLUvhDFXUUyeoaKhFPE4X9G/Oo2QprJTgbdQ5/ED1qljJWXZAPqXTxDCojqjlA6CB8Yi8NBDRyGMYaCE2IpqeEUjVTckcNG1EN82iWLUwDzgiR9N1cu0ySMYL/JqdwKJ8oFiMlF81MBOG6EQFkGzTGpDEySoIJDu5Sx11QyfjiL5/pRnKlwvmmCid9BKSgISh2hefCAySdf2eHC8e3Q5NKRJj0Ic3gfulgDK44zSQMszQWI+Em+cChbKNv6vT1OurgXMHTJsag6rmZ/YBdU+AtJHA7rNA6nBTo4YK7b+BTYeBsdnAp/fA4Q2AW+pMkjmoR46GRzYDH9+J8Rzg0DUge7qJWQPx6Cyt/bcvwMEC4MdXA2WfqPM8yo7x7Kvu5tfQFGDbSSCn4/RVdR24UQx8aOhGOajKJlf/2UuAzCnan544DWhtke6vDVLsWqQrb7yMPQdVNtQMXVoI5G4CBsdrVl1PgZePgbdy5fku0Wn7pc1qmwyRcdIDWXJpVRPR0vHac2At8OJRV6IQNb0D1Y0NTwcWS7fNWQYkJuu1ofP2NqC6XI7lN4CaCnlLk+HUwxQZqO5kSII23lTU0u1AkgwPtUI0y+1XjcEPjYCa1Y3Pgd+tequwch3UeME3M6m6uaZS+8x0I5T7Zj3RzwhtRb+5H5MPlFm2oRhLfkw+UJCs5jGWLHROJ/ItT+rBypkhU5Pn6sL+zakSZQ3ziYgVR2dEvRVW6yo5ylT0L6DyLpCwrNYhvTXBUN6nwLwJhfIOWiAy2ZBZjjp9kahZvNTJQ+9ZlLiK/SH7wvv/5+Mvm+MdLm2dOmgAAAAASUVORK5CYII=");
        }
        .icon-mine {
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAAAXNSR0IArs4c6QAABQlJREFUWAnNmWtsVEUUx/+zu22XQJBUDLgJ1kVMCy0EIYi0hNQQYwSsEdOiCUHE6AcNPmI0+KF+kJrY6AdNDCS+UGliYiOGVWLqI2kETbRa8QVWG5siwQciAUS3dNvxf+7sg727e/dO1+KeZLN775xz5jfvOWcVShDdWrcQGG0B1AK6iUDpCLSKOC6VPsbfx/ibH30IqIip7u+/mWh1ytbQgVOJLdC4iQBRO3s1BIW90KGXbaF9g+rW+sugRrYTbiMhA3aALm2FcY5CF3RVu+r+7oirNO9jUVACVhLwccI9QMiqvF4m+lIhTuBn6fYxAp/zcuMJqlvnXUK4PXSw0svJf1B2gMDrVffg8UK+Cg6hvq12ESH7LgCksLEjdJ+pMz9q3h51DBJjH9N4Wn6zyXqr/kIo2KReH/jaXUMOaHK4pSdr3MoX6HmY02CZexpkgToLB/EPCWQ/JxVdTa8Gpl5k2nP2FHD6Tw6Knkj7OGfDq89fYKEsLyq+navbDrJuKbBmM7B4FX1PzXKH+Fng4EfAvl3AQH92mffTSmenAbal1NI9avbJ+ABBw6lCz++KSuCuDqB5vadaurD3TeD5diDhuQul1XkwxKHDtal9NrPqZTP3CxkIsq0v+oeU6ptvoc0LgNj6EWFxDhij7ICaM5snjl+59UFgYaNf7YzeoiZgA88N36I3Gja2z7ExZ3emd70cVc8G1t7hpeFdtm4LID78iBzVwkYxcM4Fw48ldZrW8SJUwkkqto1rfVZGtSRbIHkCRX1bLrjat2pBxfrlBYtyC3RUGAMYG2/JLfR4Uz3Lo9Bnka0PMga4Ic/36d6oVfrbvTx92vogo8xRcyP39Py/F0a4qhg+lLuQkUOfjHHKGZaMZnsqZ8gkmwy9RIr+RW5FpYqtDzLK0NuB/vZzqZiArQ8yytDbgX7ZWzqovQ+CKnXYquZPe4A/7NqW5V9sxYeV6EMc+uBeK5tR3id3SXg/gZu72Iit+LCSiljAZCzUkJVd3/vA7iftYAWyqxMQWytRQ8JotidJs9jKOy8BT9/jbxrIcIvu27xs20qSzQlFTD5p9CCvVPb7qoQky68HrmoGZs3JDu5kdcvCkTlpPdxskaR+dMVi6dFMzNQ271XOu022DZ5UfaVeU28M3i51ZHqQCSs2YWRSK7Zx7gR3wmQk3aPyqNuu6OTwP5Iss/uaNgOYcyVwMcMMCeAkzj91grs01+nxo3YLT2pWqpO9mQ6Xs+N6HWYL4o1UKx7bB2nasMLMzyXXMg7yuFCfiwNf7edcfQ/4/APg7zPFOuGAZPjOV8rqUSkomtKpmgKs3gDceCd779KML6n86CDwO3tvPGF6UIK4SDRbb+QfoKcLiDF0lkxKrgyzO71TOimbgkmyVTcDmx41qRtRFrBP9gGf9QBHfkiZ537PmAksuw5YsQaov8ZMCwEW2D07gDE2zBGLJFmqFgObiPG5BjMjwN0dJm0jCgNfAG/tBPp75clOLp8PtN5nwMXyp2+B5x5mo38cRijUki+TJ2o5Qy8vU+JMg2jdu2jfvRSyWM6cBF4h8H778yHlM/1duwS49ylgdg1w4tc4OjbPVc/0/JIud/3wBBVdvfWGKmx9oh+nT9Zi57ZggXnlcuvzMTwljod2HMbchvvV9GqutsJSFFRMtdYhtDXw75ky/rPB3cay//vGDez0tOT5JYFhcgOF/xCTO28wECu0UPL5dr/7FzerskDVgIphAAAAAElFTkSuQmCC");
        }
    }

    /*搜索目的地模块*/
    .search-container {
        position: relative;
        height: 100%;
        background: #fff;
        .search-tab {
            .ay_search_cancel {
                margin-top: 4px;
                margin-right: 15px;
            }
            .left-btn {
                position: absolute;
                left: 0;
            }
            .block {
                h3 {
                    line-height: 40px;
                    font-size: 19px;
                }
                &:after {
                    content: "";
                    display: table;
                    clear: both;
                }
            }
        }
        .ay-search-box {
            .ay_cells {
                padding: 0 15px;
                z-index: 1;
            }
        }
        .page-indexlist-wrapper {
            position: static;
        }
        .ay-indexlist {
            .ay-indexlist-nav {
                top: 107px;
            }
            .ay-indexlist-navitem {
                padding: 0;
                width: 30px;
            }
        }
        .ay_cells_access .ay_cell:not(.no_access):active {
            background-color: #fff;
        }
    }

    .title-block {
        padding: .7rem 0;
        font-size: (17rem/20);
        color: #999999;
    }

    .currentcity {
        span {
            color: #FF5523;
            display: block;
            width: 33.33%;
            border: 1px solid #FF5523;
            text-align: center;
            border-radius: 100px;
            font-size: 14px;
            margin-top: 20px;
            line-height: 1.2;
            padding: .3rem 0;
        }
    }

    .search-content {
        padding-left: 1rem;
    }

    .hotcity {
        &:after {
            content: "";
            display: table;
            clear: both;
        }
        .hotlist {
            display: block;
            float: left;
            margin-bottom: (15rem/20);
            box-sizing: border-box;
            font-size: (14rem/20);
            border-radius: 100px;
            width: 32%;
            margin-right: 2%;
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
            padding: .3rem 0;
            border: 1px solid #999999;
            display: block;
            border-radius: 100px;
            color: #333333;
        }
        .active {
            border: 1px solid #FF5523;
            color: #FF5523;
        }
    }

    .left-btn {
        display: inline-block;
        height: 40px;
        width: 40px;
        float: left;
    }

    .right-btn {
        display: inline-block;
        height: 40px;
        width: 40px;
        float: right;
    }

    .clear {
        display: block;
        margin-top: 13px;

    }

    .ay_search_focusing {
        .ay_icon_clear {
            display: none;
        }
    }

    .ay_search_cancel {
        position: absolute;
        right: 0;
        top: -1.9rem;
        color: #333333 !important;
        font-size: (17rem/20) !important;;
        position: absolute;
    }

    /*index-list样式重置*/
    .page-indexlist-wrapper .ay-indexlist {
        .ay_cell {
            padding: 0.85rem 1rem;
        }
    }

    .changecity {
        span {
            color: #41B3EE;
        }
    }

    @media screen and (max-width: 340px) {
        .hotdestination a {
            width: 33.33%;
        }

    }
</style>
