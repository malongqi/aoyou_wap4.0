<template>
    <div class="index-wrap">
        <view-box v-ref:view-box><!--0225F-->
            <div class="page-inner"><!--0225F-->
                <!--头部标题栏 START-->
                <div class="visa-header" slot="header"><!--0225F-->
                    <div class="visa-header-btn left" @click="dialNumber" name="visatel">
                        <span class="icons icon-tel"></span>
                    </div>
                    <h1 class="visa-header-title">签证大厅</h1>
                    <!--<div class="visa-header-btn right" @click="showMessage">
                        <span class="icons icon-message"></span>
                        <i class="bubble" v-show="msgCount>0">{{msgCount}}</i>
                    </div>-->
                </div>
                <!--头部标题栏 END-->
                <!--页面 START-->
                <div class="content">
                    <!--页面顶部 START-->
                    <div class="ay-header-box">
                        <!--轮播banner START-->
                        <swiper loop auto :list="bannerLists" dots-position="center" height="110px">
                            <span class="icon-adver"></span>
                        </swiper>
                        <!--轮播banner END-->
                        <!--搜索框 START-->
                        <div class="visa-search">
                            <div class="search-box">
                                <a class="search-input" @click="showAllVisa">
                                    <i class="icon-search"></i>
                                    <span>输入签证国家或地区</span>
                                </a>
                            </div>
                        </div>
                        <!--搜索框 END-->
                        <!--办签流程 START-->
                        <div class="visa-step">
                            <div class="step-wrap">
                                <ul>
                                    <li>
                                        <i class="icon-shopping"></i>
                                        <p><span>在线下单</span></p>
                                    </li>
                                    <li>
                                        <i class="icon-profile"></i>
                                        <p><span>提交资料</span></p>
                                    </li>
                                    <li>
                                        <i class="icon-dealing"></i>
                                        <p><span>专业受理</span></p>
                                    </li>
                                    <li>
                                        <i class="icon-flag"></i>
                                        <p><span>领使馆办理</span></p>
                                    </li>
                                    <li>
                                        <i class="icon-checked"></i>
                                        <p><span>快速签证</span></p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <!--办签流程 END-->
                    </div>
                    <!--页面顶部 END-->
                    <!--服务保障、签证状态 START-->
                    <group class="visa-banner">
                        <cell title="服务保障" inline-desc="10重实力保障" v-on:click="toVisaService()"><!--0217 F-->
                            <div slot="icon" class="icon icon-service"></div>
                        </cell>
                        <cell title="签证状态"  inline-desc="即时掌握办签进度" v-on:click="toVisaStatus()">
                            <div slot="icon" class="icon icon-state" >
                                <i class="bubble" v-show="OrderCount>0">{{OrderCount}}</i>
                            </div>
                        </cell>
                    </group>
                    <!--服务保障、签证状态 END-->
                    <!--热门签证目的地 START-->
                    <section class="ay-section">
                        <cell v-if="VisaList.VisaListTitle" :title="VisaList.VisaListTitle" :link="VisaList.VisaListLink" :inline-desc=""  class="ay-section-title"></cell>
                        <div>
                            <div  class="visa-group" v-for="hotItem in hotVisaList">
                                <div v-if="hotItem.VisaProducts.length>0" class="visa-group-title">
                                    <p class="group-title">{{hotItem.VisaListTitle}}</p>
                                </div>
                                <div class="visa-item">
                                    <a v-for="VisaProduct in hotItem.VisaProducts" :href="VisaProduct.ProductLink">
                                        <div class="item-img">
                                            <img :src="VisaProduct.ProductImageUrl"  v-lazyload:opt.fadein="VisaProduct.ProductImageUrl+'?imageView2/1/w/105/h/70/q/90'">
                                            <div class="shade">
                                                <h4 class="title">{{VisaProduct.ProductName}}</h4>
                                            </div>
                                        </div>
                                        <div class="price">
                                            <img class="flag" :src="VisaProduct.ProductLogoImg">
                                            <span>¥{{VisaProduct.ProductPrice}}<b>起</b></span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                    <!--热门签证目的地 END-->

                    <!--本周特惠 START-->
                    <section class="ay-section">
                        <cell v-if="weeklySalesList.length>0" :title="weeklySalesTitle" :link="" :inline-desc=""></cell>
                        <group class="visa-sale">
                            <cell v-for="item in weeklySalesList" :title="" :link="item.ProductLink" class="sale-item">
                                <div slot="icon" class="sale-media">
                                    <img :src="item.ProductImageUrl"  v-lazyload:opt.fadein="item.ProductImageUrl+'?imageView2/1/w/80/h/60/q/90'">
                                </div>
                                <div class="sale-inner" slot="child">
                                    <div class="sale-title">{{item.ProductName}}</div>
                                    <div class="sale-price">
                                        ¥{{item.ProductPrice}}<span>起</span>
                                    </div>
                                </div>
                            </cell>
                        </group>
                    </section>
                    <!--本周特惠 END-->
                    <!--底部菜单图片 START-->
                    <section class="ay-section no-padding">
                        <div class="bottom-menu">
                            <ul>
                                <li v-for="item in otherMenuList" >
                                    <a class="menu-content" :href="item.Href">
                                        <img :src="item.BcgroundImg">
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </section>
                    <!--底部菜单图片 END-->

                </div>
                <!--页面 END-->

                <!--底部导航 START-->
                <tabbar class="visa-tabbar" icon-class="ay-center" slot="bottom"><!--0222F-->
                    <tabbar-item name="hometab" v-on:click="clickTab('/wap.html')">
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
                    <tabbar-item name="visetab" class="current-item" v-on:click="clickTab('/visa.html')"><!--0222 F-->
                        <span class="icon-visa" slot="icon"></span>
                        <span slot="label">签证大厅</span>
                    </tabbar-item>
                    <tabbar-item name="mytab" v-on:click="clickTab('http://mmy.aoyou.com/')">
                        <span class="icon-mine" slot="icon"></span>
                        <span slot="label">我的</span>
                    </tabbar-item>
                </tabbar>
                <!--底部导航 END-->
            </div>

            <!--全部签证 国家列表 弹出页 START-->
            <div class="visa-list" v-show="isVisaShow" transition="slideInRight"><!--0225 F-->
                <!--标题栏 START-->
                <div class="visa-header">
                    <div class="visa-header-btn left" @click="goBack">
                        <span class="icons icon-back"></span>
                    </div>
                    <h1 class="visa-header-title">全部签证</h1>
                </div>
                <!--标题栏 END-->
                <!--列表 START-->
                <div class="content">
                    <div class="list-content">
                        <group  v-for="item in alphabet" :title="item.initial" class="list-group" >
                            <cell v-for="cell in item.tempArr" :title="cell.contryName" @click="selectCountry(cell)"></cell>
                        </group>
                    </div>
                </div>
                <!--列表 END-->
            </div>
            <!--全部签证 国家列表 弹出页 END-->

        </view-box>
    </div>
</template>


<script>
    //定义初始字体大小 START
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
    //定义初始字体大小 END

    import { go } from '../../libs/router'
    import store from '../../vuex/store'/*0228 F*/
    const commit = store.commit || store.dispatch /*0228 F*/
    import {ViewBox,Headerbar,Search,Tab, TabItem, Group, Cell, Swiper, SwiperItem, Tabbar, TabbarItem, Switch,Actionsheet,IndexList,Confirm} from '../../components'
    export default {
        components: {
            // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
            // 否则挂载点和组件名字一致, 即vhead
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
            Confirm
        },
        props: {
            isResult:Boolean,
        },
        vuex: {
            getters: {
                route: (state) => state.route,
                isLoading: (state) => state.isLoading,
                direction: (state) => state.direction
            }
        },
        data (){
            return {
                msgCount:0,
                OrderCount:0,
                isPageShow:true,//显示页面
                isVisaShow:false,//是否显示全部签证页
                isSelect:true,//底部导航选中
                navList:[],//头部信息
                bannerLists:[],//banner轮播图
                VisaList:{},//热门签证标题链接
                hotVisaList:[],//热门签证列表
                weeklySalesTitle:'123',
                weeklySalesList:[],//本周特惠列表
                otherMenuList:[],//页面底部菜单图片
                screenHeight:'0px',//屏幕高度
                alphabet: [],//字母表
                countryList:[]//签证国家列表
            }
        },
        methods: {

            takeData:function(i){
                this.$http.get('/static/visa_data.json').then((response) => {
                    // success callback
                    var data = response.data
                    //this.navList = data.NavList
                    //this.bannerLists = data.BannerLists
                    //this.VisaList = data.VisaList//签证标题、链接用
                    //this.hotVisaList = data.HotVisaList
                    //this.weeklySalesList = data.WeeklySalesList
                    this.otherMenuList = data.OtherMenuList
                }, (response) => {
                    // error callback
                });
                var departCity=api.getDepCity()
                var channelTypeID=387
                var vm=this
                var useCache=false
                var useProxy=true
                var memebrId=api.getMemberId()
                if(memebrId!='')
                {
                    var statusParam={
                        customerId:memebrId
                    }
                    api.post({
                        path: api.config.microServiceHost.orderurl,
                        controller: 'VisaStatus',
                        action: 'GetVisaOrderCount',
                        param: JSON.stringify(statusParam),
                        useCache: useCache,
                        useProxy: useProxy,
                        callback: function(obj) {
                            if (obj.ReturnCode == 0) {
                                var data = obj.Data;
                                vm.OrderCount=data.OrderCount
                                console.dir({"title":"状态","data":data})
                            }
                        }
                    });
                }
                var bannerParam={
                    cityId:1,
                    channelTypeid:channelTypeID,
                    type:2,
                    SpaceGuid:'16a5e926-3c01-46cf-9902-52f34388376f'
                }
                api.post({
                    path: api.config.microServiceHost.elementurl,
                    controller: 'ElementService',
                    action: 'GetElementSpace',
                    param: JSON.stringify(bannerParam),
                    useCache: useCache,
                    useProxy: useProxy,
                    callback: function(obj) {
                        if (obj.ReturnCode == 0) {
                            var data = obj.Data;
                            vm.bannerLists.splice(0,vm.bannerLists.length)
                            if(data.advertises!=null&&data.advertises.length>0)
                            {
                                for(var i=0;i<data.advertises.length;i++)
                                {
                                    var item={}
                                    item.img=data.advertises[i].picUrl
                                    item.url=data.advertises[i].wapUrl
                                    vm.bannerLists.push(item)
                                }
                            }
                            console.dir({"title":"banner","data":data})
                        }
                    }
                });
                vm.navList={}
                vm.navList.Phone=departCity.Phone
                vm.navList.DepartCity=departCity.CityName
                var visaParam={
                    cityId:1,
                    channelTypeid:channelTypeID,
                    type:3,
                    SpaceGuid:'a438bf76-d6cd-42e1-a6ba-2ee2f51c0459'
                }
                api.post({
                    path: api.config.microServiceHost.elementurl,
                    controller: 'ElementService',
                    action: 'GetVisaListByKeyWord',
                    param: JSON.stringify(visaParam),
                    useCache: useCache,
                    useProxy: useProxy,
                    callback: function(obj) {
                        if (obj.ReturnCode == 0) {
                            if(obj.Data!=null&&obj.Data.length>0)
                            {
                                var data = obj.Data[0];
                                vm.VisaList={}
                                vm.VisaList.VisaListTitle=data.spaceName
                                vm.VisaList.VisaListLink=data.SpaceUrl
                                if(data.keyWords!=null&&data.keyWords.length>0)
                                {
                                    for(var i=0;i<data.keyWords.length;i++)
                                    {
                                        var kwt=data.keyWords[i]
                                        var typeItem={}
                                        typeItem.VisaListTitle=kwt.keyWordTypeName
                                        typeItem.VisaProducts=[]
                                        if(kwt.visaInfoList!=null&&kwt.visaInfoList.length>0)
                                        {
                                            for(var j=0;j<kwt.visaInfoList.length;j++)
                                            {
                                                var kw=kwt.visaInfoList[j]
                                                var item={}
                                                item.ProductId=kw.visaid
                                                item.ProductName=kw.visaName
                                                item.ProductImageUrl=kw.bigpic
                                                item.ProductLogoImg=kw.smallpic
                                                item.ProductLink=kw.visaurl
                                                item.ProductPrice=kw.money
                                                typeItem.VisaProducts.push(item)
                                            }
                                        }
                                        vm.hotVisaList.push(typeItem)
                                    }
                                    

                                }
                                console.dir({"title":"签证","data":data})
                            }
                        }
                    }
                });
                var productParam={
                    cityId:1,
                    channelTypeid:channelTypeID,
                    type:1,
                    SpaceGuid:'ca853e51-c2cd-4421-8ed8-1427e5194a53'
                }
                api.post({
                    path: api.config.microServiceHost.elementurl,
                    controller: 'ElementService',
                    action: 'GetElementSpace',
                    param: JSON.stringify(productParam),
                    useCache: useCache,
                    useProxy: useProxy,
                    callback: function(obj) {
                        if (obj.ReturnCode == 0) {
                            var data = obj.Data;
                            vm.weeklySalesTitle=data.spaceName
                            vm.weeklySalesList.splice(0,vm.weeklySalesList.length)
                            if(data.products!=null&&data.products.length>0)
                            {
                                for(var i=0;i<data.products.length;i++)
                                {
                                    var item={}
                                    item.ProductId=data.products[i].productID
                                    item.ProductName=data.products[i].productName
                                    item.ProductImageUrl=data.products[i].picUrl
                                    item.ProductPrice=data.products[i].productPrice
                                    item.ProductLink=api.GetProductDetailUrl(data.products[i].productID,data.products[i].productType,0)
                                    vm.weeklySalesList.push(item)
                                }
                            }
                            console.dir({"title":"本周特惠","data":data})
                            commit('UPDATE_LOADING',false)/*0228 F*/
                        }
                    }
                });
            },

            //获取签证国家列表数据 START /*0225F*/
            takeCountryData:function(){
                this.alphabet = []
                //this.$http.get('/static/visa_country.json').then((response) => {
                //    // success callback
                //    this.countryList = response.data
                //    this.makeData(this.countryList)
                //}, (response) => {
                //    // error callback
                //});
                var vm=this
                var useCache=false
                var useProxy=true
                var countryParam={}
                api.post({
                    path: api.config.microServiceHost.elementurl,
                    controller: 'ElementService',
                    action: 'GetVisaAll',
                    param: JSON.stringify(countryParam),
                    useCache: useCache,
                    useProxy: useProxy,
                    callback: function(obj) {
                        if (obj.ReturnCode == 0) {
                            var data = obj.Data;
                            vm.countryList.splice(0,vm.countryList.length)
                            for(var i=0,len=data.length;i<len;i++)
                            {
                                vm.countryList.push(data[i])
                            }
                            vm.makeData(vm.countryList)
                            console.dir({"title":"国家列表","data":data})
                        }
                    }
                });
            },
            //获取签证国家列表数据  END  /*0225F*/

            //顶部标题栏 打电话  START
            dialNumber:function () {
                window.location.href= "tel:" + this.navList.Phone;
            },
            //顶部标题栏 打电话 END

            //顶部标栏 显示消息  START
            showMessage:function () {
            },
            //顶部标题栏 显示消息  END
            
            //显示签证国家列表 START /*0225F*/
            showAllVisa:function(){
                //this.isPageShow = false;
                this.isVisaShow = true;
            },
            //显示签证国家列表   END

            //按字母排序列表 START
            makeData:function(dt){
                'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(initial => {
                    let isShow = true
                    let tempArr = []
                    let cells = dt.filter(citycell => (String(citycell['PY']).toUpperCase()[0] === initial));
                    for(let p=0,q = cells.length; p<q; p++){
                        tempArr.push({'contryName':cells[p]['contryName'],'labelId':cells[p]['labelId'],'VisaUrl':cells[p]['visaurl']})
                    }
                    if(tempArr.length>0){
                        this.alphabet.push({initial,tempArr,isShow});
                    }
                });
            },
            //按字母排序列表 END

            //国家列表点击跳转 START
            selectCountry:function(_obj){
                let _countryName = _obj.contryName
                let _labelId = _obj.labelId
                let _VisaUrl = _obj.VisaUrl
                console.log(_obj)
                window.location.href= _VisaUrl //"/visa-detail.html?countryName=" + _countryName + "&labelId=" + _labelId
            },
            //国家列表点击跳转 END

            //返回签证大厅 START
            goBack:function () {
                //this.isPageShow = true;/*0225F*/
                this.isVisaShow = false;
            },
            //返回签证大厅 END
            clickTab:function(url){
                api.pageGoTo(url,'',url)
            },
            toVisaStatus:function(){
                window.location.href='http://m.aoyou.com/visastatus.html'
                //api.pageGoTo("/visastatus.html")
            },
            toVisaService:function(){
                window.location.href='http://m.aoyou.com/book.html#!/service'
                //api.pageGoTo("/book.html#!/service")
            }
            

        },
        //index-list组件传右侧菜单栏信息
        created() {
            commit('UPDATE_LOADING',true)/*0228 F*/
            _ozuid=api.getMemberId();
            this.screenHeight = `${document.body.clientHeight - 44}px`//计算搜索关键词列表高度：屏幕高度-顶部标题栏高度
        },
        ready(){
            this.takeData()
            this.takeCountryData() /*0225F*/
        }
    }

</script>

<style lang="less">
    @import '../../styles/index.less';
    @import '../../styles/ayui/base/reset.less';

    .ay_tabbar_icon{
        & > span{
            display: block;
        }
    }/*0215 F*/

    .index-wrap{
        position: absolute;
        top:0;
        left: 0;
        padding:0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        overflow: hidden;
        font-family:sans-serif;
    }
    .visa-header{
        &:after{
            .setBottomLine(#dfdfdf);
        }
    }/*0222F*/

    /*页面头部开始部分*/
    .ay-header-box{
        margin-bottom: 10px;
        width: 100%;
        background-color: #fff;
    }

    /*搜索框*/
    .visa-search{
        padding: 15px 20px;
        width: 100%;
        height: 60px;
        box-sizing: border-box;

        .search-box{
            width: 100%;
            height: 100%;
            border: 1px solid #BF956A;
            border-radius: 20px;
            box-sizing: border-box;
        }

        .search-input{
            display: block;
            width: 100%;
            height: 100%;
            line-height: 0;
            text-align: center;

            i{
                line-height: 30px;
                vertical-align: middle;
            }

            span{
                display: inline-block;
                font-size: 14px;
                color: #DBC0A4;
                line-height: 28px;
                vertical-align: middle;
            }
        }

    }

    /*办签流程*/
    .visa-step{
        padding: (5rem/20) (20rem/20);
        width: 100%;
        height: (53rem/20);
        overflow: hidden;
        box-sizing: border-box;

        .step-wrap{
            width: 100%;
            overflow: hidden;
        }

        ul{
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            align-items: center;
            -webkit-align-items: center;
            -webkit-box-align: center;
            width: 200%;

            li{
                position: relative;
                display: block;
                padding-right: (15rem/20);
                width: (69rem/20);
                text-align: center;
                line-height: 0;
                box-sizing: border-box;

                &:nth-child(4){
                    width: (81rem/20);
                 }

                i,p{
                    display: block;
                    margin: 0 auto;
                    padding: 0;
                }
                p{
                    position: relative;
                    margin-top: (2rem/20);
                    box-sizing: border-box;
                    width: 100%;
                    height: (24rem/20);
                    overflow: visible;

                    &:after{
                         content: '';
                         position: absolute;
                         right: -(9rem/20);
                         bottom: (8rem/20);
                         display: block;
                         width: (8rem/20);
                         height: (8rem/20);
                         background: no-repeat center url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAQCAYAAAAvf+5AAAAAAXNSR0IArs4c6QAAAOdJREFUKBVjYICC27dvs8PY2GgmkODZs2c9Pn78eOfMmTO62BSBxJiAityB9AYglgHifbgUMwHBO6CC70AMAiJAjFUxI0j2/Pnzpv/+/dv1//9/ARAfCN4AsZOJicllMA9IgBWCOIQUwxUSUoyiEJdiFhYWB3DwgBTAgIGBwVkg+zCMD6RF/v79q4iiEOgZpnPnzi0A0r4whYyMjDONjIy2wq1GUhSLpigTqPg/WCEhRSCNjMQoAikEuSkfqBirdSAFMMAkJCQ0HeiGnSABqMPBboIpQKHv37/PAUwc2UCT4Z5DUQDkAAARz5BAT1lohwAAAABJRU5ErkJggg==);
                         background-size: contain;
                     }
                }
                span{
                    display: block;
                    font-size: (24rem/20);
                    color: #999;
                    text-align: center;
                    white-space: nowrap;
                    line-height:(48rem/20);
                    transform: scale(0.5);
                    -webkit-transform: scale(0.5);
                    transform-origin: 0 0;
                    -webkit-transform-origin: 0 0;
                }
            }
        }
    }

    /*中间两个标签：服务保障、签证状态*/
    .visa-banner{
        padding: 0 10px;
        background-color: #fff;
        margin-bottom: 10px;

        .ay_cells{
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            align-items: center;
            -webkit-align-items: center;
            -webkit-box-align: center;
            margin-top: 0;

            &:before,&:after{
                 display: none;
            }

            .ay_cell{
                align-items: flex-start;
                -webkit-align-items: flex-start;
                -webkit-box-align: start;
                -webkit-flex: 1;
                flex: 1;
                -webkit-box-flex: 1;
                -moz-box-flex: 1;
                -ms-flex: 1;
                padding: 20px (10rem/20);
                width: 50%;
                box-sizing: border-box;

                &:before{
                    top: 12px;
                    width: 1px;
                    height: 70%;
                    border-left: 1px solid #D9D9D9;
                    -webkit-transform: scaleX(0.5);
                    transform: scaleX(0.5);

                }
            }

            .ay_cell_hd{
                padding:3px 10px 0 0;
                overflow: visible;

                .icon{
                    position: relative;
                    overflow: visible;

                    .bubble{
                        display: block;
                        position: absolute;
                        top:-5px;
                        right: -7px;
                        padding: 0 4px;
                        min-width: 36px;
                        height: 36px;
                        box-sizing: border-box;
                        background-color: #fff;
                        border: 3px solid #FF5523;
                        border-radius: 36px;
                        font-style: normal;
                        font-size: 24px;
                        color: #FF5523;
                        line-height: 30px;
                        text-align: center;
                        transform: scale(0.5);
                        -webkit-transform: scale(0.5);
                        transform-origin: 100% 0;
                        -webkit-transform-origin: 100% 0;
                    }
                }
            }

            .ay_cell_bd{

                p{
                    font-size: 17px;
                    color: #333;
                    line-height: 25px;
                }

                .ay-label-desc{
                    display: block;
                    height: 16px;
                    font-size: 12px;
                    color: #999;
                    line-height: 16px;
                    /*font-size: (12rem/20);*/
                    /**/
                    /*color: #999999;*/
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                }
            }

            .ay_cell_ft{
                display: none;
            }
        }
    }

    /*热门签证目的地*/
    .ay-section-title{

        .ay_cell_bd > p{
            height: 44px;
            line-height: 44px;
            overflow: hidden;
        }
        .ay_cell_ft{
            -webkit-flex: none;
            flex: none;
            -webkit-box-flex: none;
            -moz-box-flex: none;
            -ms-flex: none;
            width: 15px;
        }
    }


    .visa-group{
        position: relative;
        padding: 18px 0;
        width: 100%;

        &:before{
             content: " ";
             position: absolute;
             left: 0;
             top: 0;
             width: 100%;
             height: 1px;
             border-top: 1px solid #D9D9D9;
             color: #D9D9D9;
             -webkit-transform-origin: 0 0;
             transform-origin: 0 0;
             -webkit-transform: scaleY(0.5);
             transform: scaleY(0.5);
        }

        &:first-child{
            padding-top: 0;

            &:before{
                display: none;
             }
        }
    }

    .visa-group-title{
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        align-items: center;
        -webkit-align-items: center;
        -webkit-box-align: center;
        width: 100%;
        height: 35px;
        line-height: 0;

        .group-title{
            display: inline-block;
            padding: 0 8px;
            width: auto;
            height: 16px;
            background-color: #BF956A;
            border-radius: 16px;
            font-size: 12px;
            color: #fff;
            font-weight: 300;
            line-height: 16px;
            vertical-align: middle;
            overflow: hidden;
        }
    }

    .visa-item{
        &:after{
             content: "";
             display: block;
             height: 0;
             line-height: 0;
             clear: both;
        }

        a{
            display: block;
            float: left;
            margin: 0 2.9% 0 0;
            padding: 0;
            width: 31.4%;

            &:nth-child(3n){
                 margin-right: 0;
            }
        }

        .item-img{
            position: relative;
            height: (70rem/20);
            overflow: hidden;
            border-radius:6px;

            img{
                width: 100%;
                vertical-align: middle;
            }
        }

        .shade{
            display: flex;
            position: absolute;
            width: 100%;
            height: 100%;
            top: 50%;
            left: 50%;
            -webkit-transform: translateX(-50%) translateY(-50%);
            transform: translateX(-50%) translateY(-50%);
            background-color:rgba(0, 0, 0, .4);
            color: #fff;
            text-align: center;
            justify-content: center;
            border-radius:6px;
        }

        .flag{
            display: inline-block;
            width:15px;
            height: 10px;

            img{
                width: 100%;
                vertical-align: middle;
            }
        }

        .price{
            text-align: center;
            font-size: (14rem/20);
            color:#FC5A3F ;
            -webkit-font-smoothing: antialiased;
            b{
                font-weight: normal;
            }
        }

        .title{
            font-weight: normal;
            font-size: .725rem;
            -webkit-font-smoothing: antialiased;
            font-style: normal;
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%,-50%);
            transform: translate(-50%,-50%);
            white-space: nowrap;
            width: 100%;
            -webkit-transition: all 1s;
            transition: all 1s;
        }
    }

    /*本周特惠*/
    .visa-sale{
        width: 100%;

        .ay_cells{
            margin-top: 0;

            &:before,&:after{
                display: none;
            }

        }

        .sale-item{
            align-items: flex-start;
            -webkit-align-items: flex-start;
            -webkit-box-align: start;
            padding: (17rem/20) 0;
            box-sizing: border-box;

            &:first-child{
                padding-top: 0;
            }

            .sale-media{
                width: (80rem/20);
                height: (60rem/20);
                border-radius: 6px;
                overflow: hidden;

                img{
                    display: block;
                    width: 100%;
                    border: none;
                }/*0224 F*/
            }

            .ay_cell_bd,.ay_cell_ft{
                display: none;
            }

            .sale-inner{
                -webkit-flex: 1;
                flex: 1;
                -webkit-box-flex: 1;
                -moz-box-flex: 1;
                -ms-flex: 1;
                padding-left: 10px;
                width: 100%;

                .sale-title{
                    width: 100%;
                    height: (40rem/20);
                    font-size: 16px;
                    color: #333;
                    line-height: (20rem/20);
                    .ellipsisLn(2)
                }
            }

            .sale-price{
                padding-top: (1rem/20);
                height: (20rem/20);
                font-size: 19px;
                color: #FC5A3F;
                font-style: normal;
                font-weight: 300;
                line-height: (20rem/20);

                span{
                    padding-left: 2px;
                    font-size: 12px;
                }
            }
        }
    }

    /*页面底部图片菜单*/
    .bottom-menu{
        width: 100%;
        height: 100%;

        ul{
            width: 100%;

            &:after{
                content: '';
                display: block;
                width: 100%;
                height: 0;
                line-height: 0;
                clear: both;
             }

            li{
                position: relative;
                display: block;
                float: left;
                /*box-sizing: border-box;*//*0214*/
                /*width: 50%;*//*0214*/
                height: (75rem/20);

                &:first-child{
                    height: (150rem/20);

                }

                &:before{
                     content: " ";
                     position: absolute;
                     left: 0;
                     top: 0;
                     width: 1px;
                     height: 100%;
                     border-left: 1px solid #F5F5F5;
                     color: #F5F5F5;
                     -webkit-transform-origin: 0 0;
                     transform-origin: 0 0;
                     -webkit-transform: scaleX(0.5);
                     transform: scaleX(0.5);
                     z-index: 9;
                }

                &:after{
                     content: " ";
                     position: absolute;
                     left: 0;
                     bottom: 0;
                     width: 100%;
                     height: 1px;
                     border-bottom: 1px solid #F5F5F5;
                     color: #F5F5F5;
                     -webkit-transform-origin: 0 100%;
                     transform-origin: 0 100%;
                     -webkit-transform: scaleY(0.5);
                     transform: scaleY(0.5);
                }

             &:nth-child(1), &:nth-child(4) {
                     padding-left: (21rem/20);
                     width: (174rem/20);

                    &:before{
                         display: none;
                    }
                }/*0214*/

                &:nth-child(2),&:nth-child(3),&:nth-child(5){
                   padding-right: (20rem/20);
                   width: (160rem/20);
                }/*0214*/

            }
        }

        .menu-content{
            display: block;
            width: 100%;
            height: 100%;
            overflow: hidden;

            img{
                display: block;
                width: 100%;
                border: none;
            }
        }
    }

    /*全部签证页*/
    .visa-list{
        position: absolute;
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #fff;
        overflow: hidden;
        z-index: 999;/*0225 F*/
        -webkit-backface-visibility:hidden;/*0225 F*/
        -webkit-perspective:1000px;/*0225 F*/

        .content{
            padding-bottom: 0;
        }

        .list-content{
            width: 100%;
        }

        .list-group{
            width: 100%;

            .ay_cells_title{
                padding-left: 20px;
                font-size: 14px;
                color: #999;
            }

            .ay_cells{
                padding: 0 20px;

                &:before, &:after{
                    display: none;
                }
            }

            .ay_cell{
                padding: 18px 0;
            }

            .ay_cell_bd > p{
                font-size: 17px;
                line-height: 24px;
            }

            .ay_cell_ft.with_arrow:after{
                display: none;
            }
        }
    }


    /*底部tabbar 0222F*/
    .visa-tabbar{
        height: 50px;/*0227 F*/
        box-sizing: border-box;/*0227 F*/

        .current-item{
            .icon-visa{/*选中 签证*/
                background-image: url("data:image/png;base64,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");
            }

            &.ay_tabbar_item.ay_bar_item_on .ay_tabbar_label{
                color: #FF5523;
            }
        }

        .ay_tabbar_item.ay_bar_item_on .ay_tabbar_label{
            font-size: 12px;
            color: #565960;
        }

        .ay_tabbar_icon + .ay_tabbar_label{
            margin-top: 0;
            line-height: 1.2;
        }/*0227 F*/
    }

    /*初始页左滑出*/
    .slideInLeft-transition {
        transition:transform .3s;
        -webkit-transition: transform .3s;
    }
    .slideInLeft-enter, .slideInLeft-leave {
        -webkit-transform: translate3d(-20%, 0, 0);
        transform: translate3d(-20%, 0, 0);
    }

    /*右滑入*/
    .slideInRight-transition {
        transition:transform .3s;
        -webkit-transition: transform .3s;
    }
    .slideInRight-enter, .slideInRight-leave {
        -webkit-transform: translate3d(100%, 0, 0);
        transform: translate3d(100%, 0, 0);
    }

    /*底部向上滑入*/
    .slideInUp-transition {
        transition:transform .3s;
        -webkit-transition: transform .3s;
    }
    .slideInUp-enter, .slideInUp-leave {
        -webkit-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0);
    }


</style>
