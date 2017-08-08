<template>
    <div class="detail-page-wrap" @touchMove="scrollFunc" @scroll="scrollFunc"><!--0225 F-->
        <view-box v-ref:view-box>
            <!--header START-->
            <div class="visa-header-box" slot="header">
                <x-header :left-options="{showBack: true}" :right-options="{showMore: false}"  :title="detailData.VisaCountryName+'签证'"  @on-click-title="scrollTop">
                    <div slot="right" class="right-box">
                        <a v-if="showShare" v-on:click="share()"><i class="icon-share"></i></a>
                        <!--<a href=""><i class="icon-track"></i></a>-->
                    </div>
                </x-header>
            </div>
            <!--header END-->

            <div class="page-content">
                <!--顶部产品标题 START-->
                <div class="ay-header-box">
                    <div class="detail-header-item">
                        <div class="detail-header-media">
                            <img v-bind:src="VisaCountryFlag" >
                        </div>
                        <div class="detail-header-inner">
                            <div class="detail-header-title">{{detailData.VisaName}}</div>
                            <div class="detail-header-price">
                                ￥{{salePrice}}<span>起</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!--顶部产品标题 END-->

                <!--信息摘要 START-->
                <div class="ay-section">
                    <group class="detail-info">
                        <cell class="info-item" title="办理时间" :inline-desc="detailData.ApplyDataTxt"  @click="showAlert(1)"><i slot="after-title" class="icon-info"></i></cell>
                        <cell class="info-item" title="常用送签地" :inline-desc="detailData.DeliveryCityName"></cell>
                        <cell class="info-item" title="是否面试" :inline-desc="detailData.NeedInterview==true?'需要面试':'不需要面试'"></cell>
                        <cell class="info-item" title="签证有效期" :inline-desc="detailData.VisaValidDateTxt"></cell>
                        <cell class="info-item" title="入境次数" :inline-desc="detailData.EntryCountTxt"></cell>
                        <cell class="info-item" title="停留天数" :inline-desc="detailData.StayDayTxt" @click="showAlert(2)"><i slot="after-title" class="icon-info"></i></cell>
                        <cell class="info-item" title="受理范围" :inline-desc="detailData.VisaArea" @click="showAlert(3)"><i slot="after-title" class="icon-info"></i></cell>
                    </group>
                </div>
                <!--信息摘要 END-->

                <!--各种签证套餐 START-->
                <div class="ay-section">
                    <group class="visa-package">
                        <cell v-for="packageItem in visaPackageList" class="package-item">
                            <div slot="child" class="package-content">
                                <div class="package-head">
                                    <div class="package-title" :class="{'active':packageItem.SelectType}" @click="showDesc(packageItem)">{{packageItem.VisaPackageName}}</div>
                                    <div class="package-price">¥{{packageItem.SellingPrice}}</div>
                                </div>
                                <div class="package-desc" v-show="packageItem.SelectType">{{packageItem.Instruction}}</div>
                            </div>
                        </cell>
                    </group>
                </div>
                <!--各种签证套餐 END-->
                <!--切换标签 START-->
                <sticky class="detail-tab" scroll-box="view_box_body" :offset="44">
                    <div class="tab-box">
                        <ul class="nav">
                            <li @click="tap(0)" :class="{'active': curreSelect == 0}"><span>所需材料</span></li>
                            <li @click="tap(1)" :class="{'active': curreSelect == 1}"><span>产品说明</span></li>
                            <li @click="tap(2)" :class="{'active': curreSelect == 2}"><span>购买须知</span></li>
                            <li @click="tap(3)" :class="{'active': curreSelect == 3}"><span v-if="detailData.OtherRemark">产品详情</span></li><!--0225 F-->
                            <li @click="tap(4)" :class="{'active': curreSelect == 4}"><span>客户点评</span></li>
                        </ul>
                    </div>
                </sticky>
                <!--切换标签 END-->

                <!--所需材料人员列表 START-->
                <div class="ay-section tab-list" id="0">
                    <group class="detail-person">
                        <cell v-for="item in personTypeList" :title="item.PersonTypeName" class="person-item" link="/need">
                            <div slot="value" class="person-note">共需{{item.MaterialList.length}}项材料</div>
                        </cell>
                    </group>
                </div>
                <!--所需材料人员列表 END-->
                <!--产品说明 START-->
                <div class="ay-section tab-list" id="1">
                    <cell title="产品说明" class="section-title"></cell>
                    <group class="detail-instruction">
                        <cell class="instruction-item" title="地址">
                            <div slot="child" class="instruction-content">{{detailData.ReceiveAddress}}</div>
                        </cell>
                        <cell class="instruction-item" title="邮编">
                            <div slot="child" class="instruction-content">{{detailData.ReceivePostcode}}</div>
                        </cell>
                        <cell class="instruction-item" title="联系人">
                            <div slot="child" class="instruction-content">{{detailData.ReceiveContacts}}</div>
                        </cell>
                        <cell class="instruction-item" title="手机">
                            <div slot="child" class="instruction-content">{{detailData.ReceiveMobile}}</div>
                        </cell>
                        <cell class="instruction-item" title="邮箱">
                            <div slot="child" class="instruction-content">{{detailData.ReceiveEmail}}</div>
                        </cell>
                        <cell class="instruction-item" title="工作时间">
                            <div slot="child" class="instruction-content">{{detailData.ReceiveWorkTime}}</div>
                        </cell>
                        <cell class="instruction-item" title="备注">
                            <div slot="child" class="instruction-content" v-html="detailData.ReceiveRemark"></div>
                        </cell>
                        <cell class="instruction-item" title="自取地址">
                            <div slot="child" class="instruction-content" v-html="detailData.PickupAddressAbout"></div>
                        </cell>

                    </group>
                </div>
                <!--产品说明 END-->

                <!--购买须知 START-->
                <div class="ay-section tab-list" id="2">
                    <group class="detail-terms">
                        <cell title="购买须知" class="section-title"></cell>
                        <div class="text-content" v-html="detailData.ApplyPrecautions"></div>
                    </group>
                </div>
                <!--购买须知 END-->

                <!--产品详情 START-->
                <div class="ay-section no-padding-lr tab-list" id="3">
                    <group v-if="detailData.OtherRemark" class="detail-product">
                        <cell title="产品详情" class="section-title"></cell>
                        <div class="picture-content" v-html="detailData.OtherRemark">
                        </div>
                    </group>
                </div>
                <!--产品详情 END-->

                <!--客户点评 START-->
                <div class="ay-section tab-list" id="4"><!--0224 F tab-->
                    <group class="detail-comment">
                        <cell title="客户点评" class="section-title" v-link="{path:'/comment',query:{'pid':pid}}" :is-link="true">
                            <span slot="after-title" class="detail-after-title">({{EvaluateTotal}})</span>
                            <div v-if="EvaluateTotal>0" slot="value" class="cell-value"><em>{{statics.RecommendValue}}%</em>整体满意度</div>
                            <div v-if="EvaluateTotal==0" slot="value" class="cell-value">暂无评价</div>
                        </cell>

                    </group>

                </div>
                <!--客户点评 END-->

        </div>

        <!--底部预订 START-->
        <tabbar class="detail-tabbar" icon-class="ay-center" slot="bottom">
            <tabbar-item @click="showConsultList">
                <span class="icon-consult" slot="icon"></span>
                <span slot="label">咨询</span>
            </tabbar-item>

            <!--<tabbar-item :class="{'detail-tabber-item-on': isCollected}" @click="collect">
                <span class="icon-collect" slot="icon"></span>
                <span slot="label">收藏</span>
            </tabbar-item>-->
            <div class="tabbar-right">
                <a class="book-btn" @click="showBookList">开始预订</a><!--0224F-->
            </div>
        </tabbar>
        <!--底部预订 END-->

    </view-box>


    <!--咨询列表 START-->
        <div class="consult-list" v-if="isConsultShow" transition="slideInUp">
            <group class="consult">
                <cell class="section-title" title="客服热线" @click="tel"><!--0218 F-->
                    <div slot="icon" class="item-media"><i class="icon-tel-red"></i></div>
                    <div slot="value" class="cell-value">400 - 600 - 6666</div>
                </cell>
               <!-- 
                  <cell class="section-title" title="在线客服" v-on:click="onLineService()" is-link>
                    <div slot="icon" class="item-media"><i class="icon-consult"></i></div>
                    <div slot="value" class="cell-value">服务时间：9:00 - 21:00</div>
                  </cell>
                -->
                <cell class="section-title" title="遨游门店"  v-on:click="toSaleStores()" is-link><!--0216 F-->
                    <div slot="icon" class="item-media"><i class="icon-shop"></i></div>
                    <div slot="value" class="cell-value">免费预约 上门服务</div>
                </cell>
            </group>

        </div>
        <!--咨询列表 END-->

        <!--立即预订 弹出页 START-->
        <div class="book-list" v-if="isBookShow" transition="slideInUp">
            <!--标题栏 START-->
            <div class="visa-header-box" slot="header">
                <x-header :left-options="{showBack: false}" :right-options="{showMore: false}" title="立即预订"  @on-click-title="scrollTop">
                    <a slot="left" class="btn-close icon-close" @click="closeBookList"></a>
                </x-header>
            </div>
            <!--标题栏 END-->
            <!--列表 START-->
            <div class="content">
                <!--各种签证套餐 START-->
                <section class="ay-section">
                    <group class="visa-package">
                        <cell v-for="packageItem in visaPackageList" class="package-item">
                            <div slot="child" class="package-content">
                                <div class="package-head">
                                    <div class="package-title" :class="{'active':packageItem.SelectType}" @click="showDesc(packageItem)">{{packageItem.VisaPackageName}}</div>
                                    <div class="package-price">¥{{packageItem.SellingPrice}}</div>
                                    <div class="package-book">
                                        <a class="package-book-btn" v-on:click="toBook(packageItem)">预订</a>
                                    </div>
                                </div>
                                <div class="package-desc" v-show="packageItem.SelectType">{{packageItem.Instruction}}</div>
                            </div>
                        </cell>
                    </group>
                </section>
                <!--各种签证套餐 END-->
            </div>
            <!--列表 END-->
        </div>
        <!--立即预订 弹出页 END-->

        <div class="mask" v-if="isMaskShow" @click="closeConsultList" transition="ay-fade" @touchmove.prevent></div><!--0222F-->

        <!--弹出框 START-->
        <alert :show.sync="isAlertShow" @touchmove.prevent @on-show="onShow" @on-hide="onHide" :title="alertTitle" button-text="" class="detail-alert">{{alertContent}}</alert><!--0302 F-->
        <!--弹出框 END-->
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

    var tabList = []
    var scrollingTop = 0
    var heightTag = true

    import { go } from '../../libs/router'
    import store from '../../vuex/store'/*0228 F*/
    const commit = store.commit || store.dispatch /*0228 F*/
    import {ViewBox,XHeader,Sticky, Group, Cell,Tabbar,TabbarItem,Alert} from '../../components'
    export default {
        components: {
            // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
            // 否则挂载点和组件名字一致, 即vhead
            ViewBox,
            XHeader,
            Sticky,
            Group,
            Cell,
            Tabbar,
            TabbarItem,
            Alert
        },
        props: {
            isResult:Boolean,
        },
        data (){
            return {
                tabLength:"",/*0224 F tab*/
                heights: [],/*0224 F tab*/
                curreSelect:0,/*0224 F tab*/

                pid:0,
                isPageShow:true,//显示页面
                isSelect:true,//底部导航选中
                screenHeight:'0px',//屏幕高度
                isPackageDescShow:-1,//套餐注释是否显示
                isTabActive:0,//标签切换选中状态
                isAlertShow:false,//弹出框是否显示
                alertTitle:'',//弹框标题
                alertContent:'',//弹框内容
                isFixedTabShow:false,//置顶标签是否显示
                tabList:[],//切换标签对应的内容
                isLast:false,
                isClick:false,
                VisaCountryFlag:'http://pic1.aoyou.com/wap4.0/index/visa-product-bg.png',
                isBookShow:false,//是否显示立即预订列表
                isConsultShow:false,//是否显示咨询
                isMaskShow:false,//是否显示遮罩
                isCollected:false,//是否已收藏

                //数据用
                EvaluateTotal:0,
                salePrice:0,
                statics:{},
                detailData:{VisaCountryName:''},
                visaPackageList:[],
                personTypeList:[],
                showShare:api.showShare


            }
        },
        methods: {
            //获取数据
            takeData:function(){
                // this.$http.get('/static/visa_detail.json').then((response) => {
                //    //success callback
                //    var data = response.data
                //    this.detailData =  data
                //    console.log(data)
                //    this.visaCountryName = data.VisaCountryName,
                //    this.visaCountryFlag = data.VisaCountryFlag
                //    this.visaName = data.VisaName
                //    this.packageMinPrice = data.PackageMinPrice
                //    this.applyDataTxt = data.ApplyDataTxt
                //    this.deliveryCityName  = data.DeliveryCityName
                //    this.needInterview = data.NeedInterview
                //    this.visaValidDateTxt = data.VisaValidDateTxt
                //    this.entryCountTxt = data.EntryCountTxt
                //    this.stayDayTxt = data.StayDayTxt
                //    this.visaArea = data.VisaArea
                //    this.visaPackageList = data.VisaPackageList
                //    this.personTypeList = data.PersonTypeList
                //    window.setTimeout(function () {
                //         $('.tab-list').each(function (i, item) {
                //             tabList.push($(item).offset().top);
                //         });
                //     }, 500);
                // }, (response) => {
                //     //error callback
                // });
                var vm = this
                var useCache = false
                var useProxy = true
                var productParam={
                    "ProductID":vm.pid,
                }
                api.post({
                    path: api.config.microServiceHost.visaurl,
                    controller: 'VisaData',
                    action: 'GetVisaProduct',
                    param: JSON.stringify(productParam),
                    useCache: useCache,
                    useProxy: useProxy,
                    callback: function(obj) {
                        if (obj.ReturnCode == 0) {
                            var data = obj.Data;
                            data.VisaArea='适用于长期工作地为'+data.VisaApplyAreaNameList.join(',')+'的申请人'
                            data.PackageMinPrice=data.SuccessRate
                            vm.VisaCountryFlag=data.VisaCountryFlag
                            vm.detailData = data
                            if(vm.detailData.VisaCountryName=="中国台湾"){
                                vm.detailData.VisaCountryName="入台证/";    
                            }
                            this.detailData=data
                            if(data.lstVisaPersonDTO!=null&&data.lstVisaPersonDTO.length>0)
                            {
                                 vm.personTypeList=[]
                                for(var i=0;i<data.lstVisaPersonDTO.length;i++)
                                {
                                    var item={}
                                    item.PersonTypeID=data.lstVisaPersonDTO[i].PersonTypeID
                                    item.PersonTypeName=data.lstVisaPersonDTO[i].PersonTypeName
                                    item.MaterialList=[]
                                   
                                    if(data.lstVisaPersonDTO[i].lstDownLoadMaterialDTO!=null&&data.lstVisaPersonDTO[i].lstDownLoadMaterialDTO.length>0)
                                    {
                                        for(var j=0;j<data.lstVisaPersonDTO[i].lstDownLoadMaterialDTO.length;j++)
                                        {
                                            var subItem={}
                                            subItem.MaterialName=data.lstVisaPersonDTO[i].lstDownLoadMaterialDTO[j].MaterialName
                                            subItem.MaterialRemark=data.lstVisaPersonDTO[i].lstDownLoadMaterialDTO[j].MaterialRemark
                                            subItem.FilePath=data.lstVisaPersonDTO[i].lstDownLoadMaterialDTO[j].FilePath
                                            item.MaterialList.push(subItem)
                                        }
                                    }
                                    vm.personTypeList.push(item)
                                }
                                /*window.setTimeout(function () {
                                    tabList = []/!*0215*!/
                                    $('.tab-list').each(function (i, item) {
                                        tabList.push($(item).offset().top);
                                    });
                                }, 500);*//*0225 F*/

                                /*0225 F*/
                                vm.heights = []
                                window.setTimeout(function () {
                                    var navLength = $(".nav > li").length
                                    for(var n=0; n< navLength; n++){
                                        vm.heights.push($("#"+n).offset().top - 104)
                                    }
                                }, 500)
                                /*0225 F*/
                                commit('UPDATE_LOADING',false)/*0228 F*/

                                window.sessionStorage.setItem("personTypeList", JSON.stringify(vm.personTypeList))
                            }
                            api.initShareDialog(vm.detailData.VisaName,"我在遨游网发现好品质旅游，好旅游上遨游",window.location.href,vm.VisaCountryFlag)
                            //console.log({"title":"result","data":data})
                            // document.querySelectorAll('.tab-list').forEach(function (item) {
                            //     console.log(item.offsetTop)
                            //     tabList.push(item.offsetTop);
                            // });

                        }
                        commit('UPDATE_LOADING',false)/*0228 F*/
                    }
                })

                api.post({
                    path: api.config.microServiceHost.visaurl,
                    controller: 'VisaData',
                    action: 'GetVisaProductPrice',
                    param: JSON.stringify(productParam),
                    useCache: useCache,
                    useProxy: useProxy,
                    callback: function(obj) {
                        if (obj.ReturnCode == 0) {
                            var data = obj.Data;
                            vm.salePrice=data.SalePrice
                            this.salePrice=data.SalePrice
                            if(data.VisaPackages!=null&&data.VisaPackages.length>0)
                            {
                                vm.visaPackageList=[]
                                for(var i=0;i<data.VisaPackages.length;i++)
                                {
                                    data.VisaPackages[i].SelectType=false
                                    vm.visaPackageList.push(data.VisaPackages[i])
                                }
                            }
                            //console.log({"title":"vm","data":vm.visaPackageList})
                            //console.log({"title":"price","data":data})
                        }
                        commit('UPDATE_LOADING',false)/*0228 F*/
                    }
                })
                var staticsParam={
                    "ProductId":vm.pid,
                    "ProductTypeId":"0"
                }
                api.post({
                    path: api.config.microServiceHost.orderevalurl,
                    controller: 'Evaluate',
                    action: 'GetStatisticsEvaluateInfo',
                    param: JSON.stringify(staticsParam),
                    useCache: useCache,
                    useProxy: useProxy,
                    callback: function(obj) {
                        if (obj.ReturnCode == 0) {
                            var data = obj.Data;
                            
                            if(data==null){
                                 vm.statics.EvaluateTotal=0   
                                 vm.EvaluateTotal=0 
                            }else
                            {
                                vm.statics = data
                                vm.EvaluateTotal=vm.statics.EvaluateTotal
                            }
                            // if(data.EvaluateTotal==0){
                            //      vm.statics.EvaluateTotal=0
                               
                            // }
                            //console.log({"title":"EvaluateTotal","data":vm.statics.EvaluateTotal})
                            //console.log({"title":"statics","data":data})
                        }
                        commit('UPDATE_LOADING',false)/*0228 F*/
                    }
                })
            },
            share:function(){
                api.openShareDialog(this.detailData.VisaName,"我在遨游网发现好品质旅游，好旅游上遨游",window.location.href,this.VisaCountryFlag,{})
            },


            //切换标签 0302
            tap(id) {
                this.curreSelect = id
                $('#view_box_body').animate({scrollTop:this.heights[id]},1000)
                $(".nav").scrollLeft($(".nav li").width()*id);
            },/*0225 F*/

            //页面滚动 0302
            scrollFunc() {
                var vm = this
                $('.detail-page-wrap').unbind()
                $('.detail-page-wrap').bind('scroll', function () {
                    if(heightTag){
                        vm.heights = []
                        let navLength = $(".nav > li").length
                        for(let nn=0; nn< navLength; nn++){
                            vm.heights.push($("#"+nn).offset().top - 104)
                        }
                        heightTag = false
                    }
                })

                var scrollTop = $(window).scrollTop();

                if(scrollTop < $("#1").offset().top-104){
                    this.curreSelect = 0;
                    $(".nav").scrollLeft($(".nav li").width()*0);
                }else if(scrollTop < $("#2").offset().top-104){
                    this.curreSelect = 1;
                    $(".nav").scrollLeft($(".nav li").width()*1);
                }else if(scrollTop < $("#3").offset().top-104){
                    this.curreSelect = 2;
                    $(".nav").scrollLeft($(".nav li").width()*2);
                }else if(scrollTop < $("#4").offset().top-104){
                    this.curreSelect = 3;
                    $(".nav").scrollLeft($(".nav li").width()*3);
                }else{
                    this.curreSelect = 4;
                    $(".nav").scrollLeft($(".nav li").width()*3);
                }
            },/*0225 F*/


            //显示弹框信息
            showAlert(i){
                this.isAlertShow = true

                switch(i){
                    case 1:
                        this.alertTitle = "办理时间";
                        this.alertContent = this.detailData.ApplyDataTxt
                        break;
                    case 2:
                        this.alertTitle = "停留天数";
                        this.alertContent = this.detailData.StayDayTxt
                        break;
                    case 3:
                        this.alertTitle = "受理范围";
                        this.alertContent = this.detailData.VisaArea
                        break;
                    default:
                }
            },

            //3月2日新增弹出显示
            onHide () {
                this.isAlertShow = false
            },
            //3月2日新增弹出隐藏
            onShow () {
                //
            },

            //显示套餐隐藏信息
            showDesc(item){
                item.SelectType = !item.SelectType
            },

            //标签切换 START
            tabSelect:function (i) {
                if(i == tabList.length-1){
                    this.isLast = true
                }else{
                    this.isLast = false
                }
                this.isClick = true;
                this.isTabActive = i;
                var num = tabList[i] - 94;
                let _self = this /*0216 F*/
                $('.content').animate({scrollTop: num}, 100,null,function(){
                    _self.isClick = false;/*0216 F*/
                });

            },
             onLineService:function(){
                var title=this.detailData.VisaName
                var pid=this.pid
                var picurl=this.VisaCountryFlag
                var price=this.salePrice
                var url=window.location.href
               //api.onlineService(title,pid,picurl,url,price)
               api.onlineService(title,pid,picurl,url,price)
            },
            toSaleStores:function()
           {
              api.toSaleStores()
           },//去门店

            //打电话 /*0218 F*/
            tel(){
                api.telClick('4006006666')
                //window.location.href='tel:'+ 4006006666 /*0218 F*/
            },

            //展示立即预订页 点击开始预订按钮
            showBookList(){
                this.isBookShow = true
                for(var i=0;i<this.visaPackageList.length;i++){
                    this.visaPackageList[i].SelectType = false
                }
            },

            //关闭立即预订页 点击立即预订头部关闭按钮
            closeBookList(){
                this.isBookShow = false
                for(var i=0;i<this.visaPackageList.length;i++){
                    this.visaPackageList[i].SelectType = false
                }
            },


            //展示咨询弹出页
            showConsultList(){
                this.isConsultShow = true
                this.isMaskShow = true
            },

            //关闭咨询弹出页
            closeConsultList(){
                this.isConsultShow = false
                this.isMaskShow = false
            },


            //返回顶部 START
            scrollTop () {
                this.$refs.viewBox.$els.viewBoxBody.scrollTop = 0
            },
            toBook:function(item){
               var bookUrl='http://mbook.aoyou.com/book.html/select?visaID='+this.detailData.VisaID+'&visaPackageID='+item.VisaPackageId
               var memberid=api.getMemberId()
               if(memberid!='')
               {
                   bookUrl+='&memberid='+encodeURIComponent(memberid)
               }
               window.location.href=bookUrl

             }

        },
        watch:{
            "detailData":{
                handler:function(newval,oldval)
                {    
                    document.title = newval.VisaName+" - 中青旅遨游网";
                    document.getElementById("keywords").content=newval.VisaCountryName+"旅游签证,"+newval.VisaCountryName+"签证,"+newval.VisaCountryName+"签证办理,中青旅"+newval.VisaCountryName+"签证";
                },
                deep:true
            }
        },
        computed: {
            leftOptions () {
                return {
                    showBack: true
                }
            },
            rightOptions: {
                type: Object,
                default () {
                    return {
                        showMore: false
                    }
                }
            }

        },
        route:{//这里
        	data:function(transition){
	            if(transition.to!=null&&transition.to!=undefined)
	            {
	                this.pid=this.$route.query.pid||''
	                this.takeData()
                    // var arr=document.querySelectorAll(".ay-section")
                    // console.log(arr)

	            }
        	}
    	},
        created() {
            commit('UPDATE_LOADING',true)/*0228 F*/
        },
        ready(){//这里
            // this.takeData()
            // window.setTimeout(function () {
            //     $('.tab-list').each(function (i, item) {
            //         tabList.push($(item).offset().top);
            //     });
            // }, 500);
        }
    }

</script>

<style lang="less">
    @import '../../styles/index.less';
    @import '../../styles/ayui/base/reset.less';

    .icon-info{
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAA5tJREFUSA21V0tPU0EUnnNpTJQivQUldGVMXLk1GGM3PBailB2aoAtdaPQPGDfG58L4C4wudOErsjDaKi4QEsVEiFtXJsZViUB7iy2aGLjH841MMynTcrHYpL2nM+ecbx7n8V1Sm/gMT3Pbr/JSz0oYdhF7KZgyhfmY533f3tY++zJN5ajuaCPFkc+8rfA1OMekhhSrw6RoVhHPM1MetkScEvTdrLhHkfpArHIde/27Y/vpdyPfdYFZPPe/Lp1WIV8V7zPE9CwZb38z1ksVl8ORKY4XK0tHmPi4Yj6oPLr69mjiAcnKXPpO4Mwn3rE8V3oqB9npxdTFicHktMu43tjAeDEdrqjbch6LHfHEqGux64Cx8sVKUJYjzU5m/OF6zqOM9+aKd2S/6bjvH6q9f892ANBCJfgooDcbgepryBZP9ssXsu3DlqeGkudl18/LQfADp2jPVYHhoFApPZHJ9wJ62VaqlQdywWio1EN8IdfO2//hC6eHq7MXWQXue1U6I4HhT2aSF2xDl8yK9plxWzZjtc+/p8edOljXJjUwUoaYr7S0qEu1Rlv1H0GKDAEWfGrg4rfgLFImavSS4i9mQbZsxlxP7VswUBMwr4FDVhnkqcvANTYx5D8Ww1P4QnbpuMaAoQuRTBLKoERdvjPud7vyzeXgX8fWUnWuzfdTHmovyuD/BsVigQEsYMZWQ9TZcGEzu0BamDTCUdcri06fUudXQu6KEYcpCSxd8J2KjkGTx5gSGY9H+InykTXnZdcpHVxRDGwdO3dt2dbZSPaYvLwcne6tGylvxTzaKHq41+LxvGx911Y4jeRDejeIgwfmgCaOUI9k2IQSMIAFTE+3K1LTheWlwSZ8RjIFUQBLAaYOLo9UTpr+SCTrJpTATkCN4EIDJ/f490BXwBya8NvQVPsWDPCxKjCIGRNdW11VtxpaNzGpqZDwMEMCq3k8eSxxX4p40JcLXjTh32kKCgT+BfJnFKrAKHut3YkTktPD/bngulFwPe1WaMsu3b5scAO8C6TPLq3r+BJCvrAczAiHflePjUSt1Tg9bES60c5asrcOGKvW4MK/QIXASqISBLNjBBLiBVeHU8weoJ9mzjydwJjErsDDQInATuSOxjpa28frtU8s1ib0CFYdN5sh9GZVeIIjgRoJS8ErTBr9VKrPgtyX7miywBRKrnmFkZqQRXqa6LV92XLdHdtKRjYvbejhup3KBJoM6v1mX9r+AF/kxpPSY2SjAAAAAElFTkSuQmCC);
    }

    .icon-down{
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAOCAYAAAA1+Nx+AAAAAXNSR0IArs4c6QAAAhlJREFUOBGlk09oE1EQxnc30SZWECEl0EOh9ORFPWsSC216KGIvhSKIJ8Wbf6Ahf0glLQlJmvZe9epBEK3YQxUPjUoEEQ/ipQd70EMFJeJFQgmb9Tfre2Ft07SlDzYz38w338yb3ZjJZPKWaZoJwzAelEqlWeyhTyqVmnEc5xpCC75oNLoM6AcMRyKR47Va7dVhOiA+j14WjRMMftbCWfYITkOY8+ADuel0ehZx2YZ78J9ZgUDgDmhVxQyCM6wtpfF+LYMlW63WXc1n+hfBYPC2r1qt2vF4/Ilt2+dIDirCKOv6zbre64JulslvMtiih7MWDocniG+ZOlipVHrr9fpLiOd1jClu8OLva9zJInKdye+R01rvQqHQWCKR+CN8eQfukQDrGkf0g47RbIl1XdV4uyV3RTjEXXFqP+KPa3Hh667iu4ddnsRZo/CMCtkUXuYmjxV2DZNPMvkjgE/FP7Pz4Vwu98vL29FAkhT3Ufwa95QiNy3LmiwWi89V/iL5p/hHBDPAOre/gPgPwd7TsYEQIPc3Go03uEOqYAuhSzRy+CBWiPWo+AaTx+BvKvyf2bWBsNjxAOYtj1g5DZqwPefYP2h88/v9sUKh8FXhHaZrA2Fns9mhZrMpN5F/e/vQ6Dsgxrv50g52cNpfUYecG8rn8xusZQTQ3i/iP5l8ZC9xEdjzBm4XfjKZzGl2/xD3KM9UuVz+pHPd7F9hRsR8B8fgewAAAABJRU5ErkJggg==);
    }


    .icon-consult,.icon-collect{
        display: block;/*0215 F*/
        width: 20px;
        height: 20px;
        background-repeat: no-repeat;
        background-size: contain;
    }
    .icon-consult{
        background-image: url(data:image/png;base64,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);
    }
    .icon-collect{
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABhpJREFUWAnFmHlsVFUUxpnpQsHaTuMfztTGrYSgprZNo3ELia0agUYShVaDBNTYzdZaLHVBZcREYOJWuxeDoWokjTYSNUHtogYSgpQWEFA0lcZ0UQO2hUr38Xee75Hpm77H9M0gN7lz7z333O9899zl3De2OSFKubm5L3m93mIV7u36+vrXQwEdFgqQnJycp8B5gzxfzRlpaWl/tre3HwgW3xYsQFFRUczo6Gg3OA6bzfYApR1Pfkb979jY2Gs8Hs+ZYGzYgxksY8fGxvIphNy3dXV1n5N3Uf8eknGDg4O5weIHRdDtdkdB4BkhAaHNPmSUOrJ1eHiuj3zW1aAI9vX1rYWEE6sHORRfa9bx4m682EHbhYfXaHIrpWWCjY2NcsDWi1HI+HpP4YFsi1SYQJmqq8hn+2OZYHNzczbGr8fgCZfL1aQ37HQ6P4HkL8gTW1tbV+r7A21bJoiB58UIJDzsxSm9QZExAY/IKRVdvU4gbUsEufeWAZ4EuR6894GRofj4+Ab6eiGYzEW+1EjPTG6JIMReEFDKN/HUmJEB6RMd6YekMsZI10gebtShlxcXF1/JhZyCfPHU1NSdGD4VHR1dr9fTt8PCwuonJiY2IL8LL0r428PYQ7W1tT163ZnafpGEmdoKCgquo0yFSCpgqVJnsEsH4OZqeVUnm7GZl5fnBmujb6dMkHYn+ZBku93eOTk5eRzM8Wl60uAyTcA7Ek9vJ4uXYsnTEoBDCASwA8IdDoejKdAwVlZWdvnAwMCDjE0GJ1lKMK6g1CfZEsfp20f5LvfpMRuzu5XZ7UEzwke7DwWFCGWnEEK5i7rXRyeoquqUZDyXgn2FNPgLsKWdCy996TZO5F4s3UHegcLOqKiojvLy8j+Csm5xcGlp6WXDw8NJLPUjQDwNnwNC8HcaCWQH6z9oETukw/Lz8+MgeRqCPeJOue0lvfxfcWl/WWIbS75VZXGEZbbLLS8n51m8+dalpMe9aedMbIPkk3jvHNyes3Mf7achsVIu3BLuqkqZxf9NVMj19vZux/YT2P4HTpk1NTWHzxNh3Zew7hL05Y33HmEql0F+MfZiEJfXTktLyw7IrYLYWTwn5L4TW+cJSgOS90ByF9X5KDZkZGQ8npWVNSl9FyvhhHDelR9CLhsbZyC3hFWVm0VJ0wiKhCVeTPElA6Ipd+LJ1YBMSF+oE3te7t6PyQ+RBwmL9+O5fb52/AhKJyQlouyGZAyebKJ8WB+CfEGs1Jl0JJ5rBHs54wfCw8Pvq66u/kGPNSNBUSIe38JyfwVAHCS/iIyMXFFRUTGqB7DSlu8UQuunjJVn22nyvTjg4ExYWljx65PZ4PJ0AYBkJt8Wj/opWRSMj4+vYugyJn6KnG5ETuANCUonJOVxcFLqAP0kZSgSF/EJFeckMV5eM4bJlKCcMIjdxGhvTEzMYUOU2XccUYfceKEPKlOC/f39i1he+a7tCvRpFQhXNeZ3gz2vra1tgdkYU4IMlGeQLK/pMpgZMOoDU1kRDuLNRjoiNyXIDOXxKt8TshdDmsBUCELUOkEYKR7kNIfcg0QMhSBEgycIWEAEueDl81KZ1IXczUkOyINmF7WTr7E+DA2wqePMDHKp38BecuMN5R8Elq2RSW0kbP1sNE5OL/9OnKV/LslBEBiaSddwD2JQ2X8MMvQesTSR3IDuj5DLQlcizSj1bGRH8eb7vO+uReaX1EfIMTpsXNxJfgqqwJAg/dpS+RGE1NXkbXhKLu/VEJqgXk04TMRzcm3UkeWvj7VyKaNbXVhYGI9sWmKMsszoGO5Dsw/3RSqadqnOwZAL2YvkHHIkWV452yMiIjZVVVV1U9dSHoS24hlZdglr+YTKx/CoTGILy/mXqnhUSoguVNt+hSFBgM+p2sks01XMsgSgAuTzKOUh+xGn2004/NUPFUFlZeVvFGuY1GbKTeQVjF0H0RyIvsPXY+XIyIi2tJot1KYnw0MCsAzeT5YXtpbku7gJgq/IR7UmDKTkIKWwL1+DZKavPlhDbItUDlSXr1yrGxIUBWa6FMANVBMA2ovHPOoDQhs/65JX+22sxnoG3g12L7glTPYbI6B/ASXMrW2oBk7gAAAAAElFTkSuQmCC);
    }

    .icon-close{
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAArVJREFUWAnd2LuLE0EcB/Bk84CDWNkmhAhaSDyRvEx7EUsRLRUE/wq1V3v/A8VOsbCLqJUQ8kJMETwESZGk8uqLeWz8/sb9hb3c7t3M7OweupDMY2fn98mS2fklsdi/ctRqtYvVavXSWXopPjncBosaOFFfLpf7q9Xqe7lcfuIeEFW9VCo9ovjkIA/HFUDbtvPoiNNrvV4/jRpZqVQeI/ZzNjgeNGMxASwUCu/i8fhH0YO3KJGEA+gZxyYHebidoMpwOFzl8/m3GFhD84JzspHNZufT6fSL0zZeeOFSqdStZrP5m4MJIDXG4/FyG4k7GRrSD9dqtQ4ZR+UGSI2okLK4Y8AokCo4T2CYSFWcLzAMpA7uRKBJpC7uVKAJZBCcFDAIMihOGqiDNIFTAqogTeGUgTJIkziKRxmM1lGv13cWi8V7bIc3XBN8QP0mt2njp711e/vi8zKlNpAm90GKuCZwNFEgIE1AyPl83kL1KrWdY5BOp68HuXM8kcgHuaFTIgO+g+uubF1bRP/drT6t5pFsRnUGLIh7yCFf4Tr+oDbqnJnfRj75E/nkQHVe93ie2N0nVffADfC9u4yLGWQB/xLj7ktN6DNIC+iFw/yNXq+3n0gk9kwilReJH67f7//im4BfZefxC+0z2rtOn21Z1oNut/uax8iWSkAZHAc2hZQGquBMIqWAOjhTyFMXSRAcITudzoGzcL45aKXVfeIdDIrju0il8538hCrvOFILxxdoEsdQHaQnMAycLvIYMEycDvIIMAqcKnIDjBKnghRA/Ku5i/ToKy7kxw5t+A339sWTmi69Fk4ymbzWbrdF0iFAyDpKZ4GjD+s8Jxuobp6T2MfLdI4OkQ8Wi8Ufs9nsHNKlDh6qD5GVHPw9Hc37ZDI5zOVybxBtB4ZuJpN5MRqN5tFE/9+j/AGtGaLnHN8cXgAAAABJRU5ErkJggg==);
    }

    .icon-tel-red{
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAAXNSR0IArs4c6QAABXNJREFUWAm1V2tsVEUUPmeW3VrbQEUjiIqVbl9SsbFRAjGAmlIfaYmSLaVSAj/EB5ogv4RE0xBLjC+INZoYIFUstl0Qq6kJNTwkRozhJQmttBWLVTGITUuRbh+7x2/m7jbbuw+hu05y986cc+Y73z1nZs4sk62JZ/ZMYt/TRFxKQllE0kustpEUbmav128zT9pwUjiSeLJeIB56HQTSQCCkSicJbCI6fiME60LCZL9VCFDK3S+hX0siacRcjygsJMrIQL8M0RnFs1Y8ObeG7JP9NhERT3YxvvptgPvhuJKbuprCHH0Jks0guJSU/0nIa8N0SesqEWGk4Q0gMki8YiNhORL+zHSEn0iaZxuQovLsBSBSCBI9NI3esemDw8kt0I8gKgtkZZ5eK0lvCnEoNahC9VzbNRTNA3uP9UN+AI+DBv2WfTTDBGQKm2Oemc/SGheHea+ll/8lPToimcaBkzvjEgm4mqHHnpZiWbXouri2E1DqiFg5H065EG8+e0//CdLnYJNKQ39kxrOdiE6fI8PBia54ALIi/xbop+MRGnXGJR0PJ5ZOp2YgqJway0g8RVNoaORzUEBKuAXR6Y1lO1G5Ts1pM1kNz4kGgtqTTtz3NQJxP0j8QinONdHsEpUhNXLSgEhgblQw9tWA7H0gcZYcspA/aT8f1S5BoSKHY18QozwqltASSy7l3PBzT1SbJAgV5VUeBM55fHWOVGTNj8Bk7rNkfFeELokCxdXVASzY7QYzwK9FYAuFZFulIndGhD5JAusa4OQ3sQb+Ri15UJZl6wo71tjbtRt1Zg/W0lTy+71YvHG3+djEa+wYIlzfdYkUvWrmBgLbxZN75zgcoedMUSRB6oa2WRV7nEXCAysigOHGrvfx0uUel6HRL/DlY+cKovIXiGLR8mVEpgoV+62EPdsAxogYuYtXw1kbFm4Bka/VHGTBCdzQdQJklprrAMl6XCu32rAihuLxOKQyZ5a86E6JUNoEbBsTIjEdl+dv9C6C0+8p3bGYd5wJnb7Qu8swx4vIYK3wTkq7bQ3XHfKF40h1taK2+o249W2A/HpDXqgZ59AWHAHfhduG+hFEtMK6mwYOozcLw2/JxY+bdRSchWg8AhKaTDpER8npquRd7aZ6S/WiSdTWsxMfUqGhQOIs3jOxEZzWdP6BlNpC+TN2c/Uh3IWD0lDH/pbK/DtoZBhkAMJ8nByqhD/tuBiyk+W5c8g/irssZUJ2Bc9mEGqikRHsQFmCOZdAtpSbOg+bgjk0upZYngGhmwyGvhESv0fp6gMd8agRMYb4kYq8TDjTdcaNST+Ri4oRmd/G9LoYUn8t9FUhmfXmXpzYJdxw5mi4XDzzUokuVIHkOhDKD+p+JeUsjktEG8rygmk0OtiKri6K5/DVxaE0aL1uou+9EngZDnIQIaRKbeRdHTolUZvZ/uXuEhykm2Cv61jrfxLRSLKqMIP+udyC3nw4u4jJZdjSR6J6uQah2RjkQxHlgfHbNwYI153soxumFOMLvrJyLPvtJ3CMqfHFyrfYMpCOqyKijfnDY1dI7i1DRLZhmIpU4Lh3r7eArv1XnnJPJmHrNFf07lWlxu4G//w2IDI1kOv5dUQ3P8/eI4N2u1hjU6/Ytxcpfgw2p2j27UUTIqIdyDK3hwLyEbqpoNNNpHCAufbgGjms9bGaVGTPJb/sAAKuFdhdih/gxs72CRPRjqyzxP8xonOP5RgVnKUe/8P2IXXdWFfdRt4/kI3xQ7B7GKQfRST0kjhFyrGSGzt+1DYJEdEAup6QOrEa0XkWwyIti9v0X1d9+GVMqcG6033TEiYSAtJv8eTdTTyyAt0CLMRMSPCY9jt+D2Kh78cJfSD8hA7q6V+4ctAEn0iWtAAAAABJRU5ErkJggg==);
    }

    .icon-shop{
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAAXNSR0IArs4c6QAAA8BJREFUWAntl19IU3EUx3ev0xyVQWIhLPLJKKwseumleonILKOiImmCTpcWROlTJZl/KmqED6HoVHRJFEFghdRDRPbQixRF9RhBphRWEOScc1ufM++9XK8OQSf0sB8czr/vOb/zO/d379lstuSa3gFlujqlRaNRxefzHUMrhnLRl8+Gs9oURYlii4AXHpPFJgv+B/bBbre3lJWVvZ4RazW0tbWlEvSQoEKrLxE6ucOQp7y8vNOcb0ZHKMQLoBrwX4qpRX4JjZiD4smcVolEImpKSooSCoWUtLQ0dXJyUhEduxPaT2w1eSdSU1O3lpaWftJz2XVBeFdXVxaBpwFGKGRvRUXFK7N/gfJn4gc46FJ4Jfs0wg/pOVVdEI6zkiLSKeIJrUtkEcY2qqpeQQlABzs7OzfrDqOQ/v7+JRirNMctHZBozgG/c9BWDqxw8Do9v1HI0NBQMc7VON7ySOReLNqikBskH4MXtbe358tGRiEUcS5mUNVF64bklyVdgcW6Aq+Dpgrhm7EbOY8Kh7nZ98Wx2MvhcMS6QgOKOjo6tsQ6wubntY1vezye0GIXIfldLtcPDt4iMvtftvPKbuDS7KGyMW50mzisi1fuGrbjBH4FtwY+wD0qseJ0HXwtmCNgf2Jbi/wCvFv36zw9Pf1mIBCokq6ofHg8CGCVbrfb/UsH6ZzLtBP5DJQD+SAn+BM8TuMbgM1YvJLbUWrAbILfhXKQXRS3zwBpgrkrKgXs0uzPzECe20qCm0gi9mXg/JzqDrI8WzvtfECRzRQkb5oN7ArpBN19jpoB/h6PuQPejC5jow+/1+/3rxK8vrA/ElkhWR+bHdAcoziG0SfQN0LybZHVCp2V+4NPBmI9/AI2uWMhYj6ir0N2QDb0bqfTeaqgoCCIXWWP69ikS4qGf48sX/VsKFaY0tPTkzk+Pn4Vw2EoE4otAsOAH6M0UMAbzWwwillPVy5hOApJUhkLT5krjbNNVzqcFw6HBS/7CF5fv4nrkwqNReuyubBZbPBOjBQwzW8ATUJvb29GMBjM5ZF8AT9qcs0qsof8PLAxIPOh0ZKSkm+zAsUoYD0gLmiejni5jS/rPPMmLCxZiLWVyY4kO2LtgFX/7+/IiFTMx0dmQcKWKV8svzlxvI4MaqCTZvBCZWaKS8uh5zdSmoePYWRweZk3hRgamJzyn9HPHJlxCiNgDkE6oRVRD48yz7zWkLhDjeCLBDVoo9saNy9dimDVcqgma4K4hQiQ0b2D0V2DuA1ayH2Rbg5Kp/kVOICcXHN24B/Lx6gTazZKkAAAAABJRU5ErkJggg==);
    }

    .ay-section{
        &.no-padding-tp{}

        &.no-padding-lr{
            padding-left: 0;
            padding-right: 0;

            .section-title{
                padding-left: 20px;
            }
         }
    }

    .section-title{
        .ay_cell_bd > p{
            font-size: 19px;
            color: #333;
            line-height: 44px;
        }

        .ay_cell_ft{
            -webkit-flex: none;/*0217 F*/
            flex: none;/*0217 F*/
            -webkit-box-flex: none;/*0217 F*/
            -moz-box-flex: none;/*0217 F*/
            -ms-flex: none;/*0217 F*/
            width: auto;/*0217 F*/
            margin-right: 20px;

            &.with_arrow:after{
                 right: -12px;
                 margin-top: -7px;
                 width: 16px;
                 height: 16px;
                 border-color: #777;
                 border-width: 3px 3px 0 0;
                 transform: rotate(45deg) scale(0.5);
                 -webkit-transform: rotate(45deg) scale(0.5);
                 transform-origin: 0 0;
                 -webkit-transform-origin: 0 0;
             }
        }

        .detail-after-title{
            font-size: 17px;
            color: #666;
            font-weight: 300;
        }

        .cell-value{
            font-size: 12px;
            color: #999;
            font-weight: 300;

            em{
                color: #EE5446;
            }
        }

    }


    .detail-page-wrap{
        height: 100%;
        box-sizing: border-box;
        -webkit-overflow-scrolling: touch;


        .ay_tab_bd{
            padding-top: 44px;
            padding-bottom: 60px;
        }

        .ay-fixed {
            z-index: 100;
        }

        .ay-sticky{
            z-index: 100;
        }

        .ay-section{
            .clearfix();
        }
    }/*0225 F*/



    .detail-wrap{
        position: absolute;
        top:0;
        left: 0;
        padding:0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        overflow: hidden;
        font-family:sans-serif;

        .content{
            padding-bottom: 60px;
        }
    }

    /*头部标题栏*/
    .visa-header-box{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        z-index: 9;

        &:after{
            .setBottomLine(#dfdfdf);
         }

        .ay-header{
            background-color: #fff;

            .ay-header-left{/*头部左侧*/
                top:0;
                left: 0;
                width:44px;
                height:44px;

                .ay-header-back{
                    display: none;
                }

                .left-arrow{
                    top: 0;
                    left: 0;
                    width: 88px;
                    height: 88px;
                    transform: scale(0.5);
                    -webkit-transform: scale(0.5);
                    transform-origin: 0 0;
                    -webkit-transform-origin: 0 0;

                    &:before{/*头部左侧箭头*/
                         top:28px;
                         /*left:40px;*//*0223F*/
                         left:46px;/*0223F*/
                         width: 26px;
                         height:26px;
                         border-width: 3px 0 0 3px;
                         border-color:#333;
                     }
                }
            }

            .ay-header-title, .ay-header h1{/*头部中间标题*/
                margin: 0 70px;
                box-sizing: border-box;
                font-size: 19px;
                color: #333;

                span{
                    width: 100%;
                    height: 40px;
                    overflow: hidden;
                    -o-text-overflow: ellipsis;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    word-wrap: normal;
                    font-size: 19px;
                }

            }

            .ay-header-right{/*头部右侧*/
                top:0;
                right: 0;
                width:auto;
                height:44px;

                .right-box{
                    padding-right: 10px;
                    width: auto;
                    height: 100%;

                    a{
                        display: block;
                        float: right;
                        margin: 0;
                        width: 40px;
                        height: 44px;

                        i{
                            display: block;
                            margin: 0 auto;
                            width: 40px;
                            height: 44px;
                            background-repeat: no-repeat;
                            background-size: 20px;
                            background-position: center;
                        }
                    }
                }

            }

            .btn-close{
                float: none;
                position: absolute;
                top: 0;
                left: 0;
                margin: 0;
                width: 120px;
                height: 88px;
                background-position: center;
                background-repeat: no-repeat;
                background-size: 40px;
                transform: scale(0.5);
                -webkit-transform: scale(0.5);
                transform-origin: 0 0;
                -webkit-transform-origin: 0 0;
            }
        }
    }

    /*页面顶部产品标题*/
    .detail-header-item{
        padding: 15px 20px 10px 20px;
        width: 100%;
        min-height: 133px;/*0225 F*/
        height: auto;
        box-sizing: border-box;

        .detail-header-media{
            margin: 0 auto;
            width: 60px;
            height: 45px;
            border-radius: 6px;
            background-color: #f0f0f0;
            overflow: hidden;

            img{
                display: block;
                width: 100%;
                border: none;
            }
        }

        .detail-header-inner{
            width: 100%;

            .detail-header-title{
                margin: 10px 0 0 0;
                width: 100%;
                font-size: 16px;
                color: #333;
                line-height: 20px;
                text-align: center;
            }

            .detail-header-price{
                font-size: 19px;
                color: #FC5A3F;
                font-weight: 300;
                line-height: 30px;
                text-align: center;

                span{
                    padding-left: 4px;
                    font-size: 12px;
                }
            }
        }
    }

    /*摘要信息*/
    .detail-info{
        .ay_cells{
            margin-top: 0;

            &:before, &:after{
                display: none;
             }
        }

        .ay_cell{
            float: left;
            padding-top: 10px;
            padding-bottom: 10px;
            width: 50%;
            box-sizing: border-box;

            &:nth-child(1),&:nth-child(2){
                &:before{
                    display: none;
                 }
            }

            &:last-child{
                width: 100%;
                clear: both;
            }

            &:nth-child(2n){
                padding-left: 18px;
             }

             &:nth-child(2n+1){
                padding-right: 18px;
              }

             .ay_cell_ft{
                 display: none;
             }

             .ay_cell_bd{
                 width: 100%;

                 & > p{
                    font-size: 14px;
                    line-height: 20px;
                 }
             }

            .ay-label-desc{
                display: block;
                padding-top: 4px;
                width: 100%;
                font-size: 12px;
                color: #333;
                line-height: 16px;
                font-weight: 300;
                .ellipsis(100%)
            }
        }

        .info-item{
            min-height:60px;/*0225 F*/

            i.icon-info{
                position: relative;
                top: 2px;
                display: inline-block;
                width: 14px;
                height: 14px;
                background-size: 14px;
                background-repeat: no-repeat;
                background-position: center;
            }
        }
    }

    /*各种套餐*/
    .visa-package{
        .ay_cells{
            margin-top: 0;

            &:before, &:after{
                display: none;
            }
        }

        .package-item{
            display: block;
            padding: 22px 0;
        }

        .package-content{
            position: relative;
            width: 100%;
        }

        .package-head{
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            align-items: center;
            -webkit-align-items: center;
            -webkit-box-align: center;
            width: 100%;
            height: auto;
            line-height: 20px;
        }

        .package-title{
            position: relative;
            -webkit-flex: 1;
            flex: 1;
            -webkit-box-flex: 1;
            -moz-box-flex: 1;
            -ms-flex: 1;
            padding-right: 22px;
            width: 100%;
            font-size: 16px;
            color: #333;
            /*line-height: 20px;*/
            box-sizing: border-box;



            &:before{/*箭头向下*/
                 display: block;
                 content: '';
                 position: absolute;
                 right: 0;
                 top:50%;
                 margin-top: -3px;
                 width: 12px;
                 height: 7px;
                 background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAOCAYAAAA1+Nx+AAAAAXNSR0IArs4c6QAAAhlJREFUOBGlk09oE1EQxnc30SZWECEl0EOh9ORFPWsSC216KGIvhSKIJ8Wbf6Ahf0glLQlJmvZe9epBEK3YQxUPjUoEEQ/ipQd70EMFJeJFQgmb9Tfre2Ft07SlDzYz38w338yb3ZjJZPKWaZoJwzAelEqlWeyhTyqVmnEc5xpCC75oNLoM6AcMRyKR47Va7dVhOiA+j14WjRMMftbCWfYITkOY8+ADuel0ehZx2YZ78J9ZgUDgDmhVxQyCM6wtpfF+LYMlW63WXc1n+hfBYPC2r1qt2vF4/Ilt2+dIDirCKOv6zbre64JulslvMtiih7MWDocniG+ZOlipVHrr9fpLiOd1jClu8OLva9zJInKdye+R01rvQqHQWCKR+CN8eQfukQDrGkf0g47RbIl1XdV4uyV3RTjEXXFqP+KPa3Hh667iu4ddnsRZo/CMCtkUXuYmjxV2DZNPMvkjgE/FP7Pz4Vwu98vL29FAkhT3Ufwa95QiNy3LmiwWi89V/iL5p/hHBDPAOre/gPgPwd7TsYEQIPc3Go03uEOqYAuhSzRy+CBWiPWo+AaTx+BvKvyf2bWBsNjxAOYtj1g5DZqwPefYP2h88/v9sUKh8FXhHaZrA2Fns9mhZrMpN5F/e/vQ6Dsgxrv50g52cNpfUYecG8rn8xusZQTQ3i/iP5l8ZC9xEdjzBm4XfjKZzGl2/xD3KM9UuVz+pHPd7F9hRsR8B8fgewAAAABJRU5ErkJggg==);
                 background-repeat: no-repeat;
                 background-size: 12px;
                 background-position: center;
             }

            &.active{
                &:before{/*箭头向上*/
                   transform:rotate(180deg);
                   -webkit-transform:rotate(180deg);
                }
            }
        }

        .package-price{
            position: relative;
            width: 60px;
            padding-left: 5px;
            font-size: 14px;
            color: #FC5A3F;
            text-align: right;
            font-weight: 300;
            white-space: nowrap;
            box-sizing: border-box;
        }

        .package-book{
            margin-left: 5px;
            width: 60px;
            height:30px;

            .package-book-btn{
                display: block;
                width: 60px;
                height: 30px;
                border-radius: 30px;
                background-color: #FC5A3F;
                font-size: 14px;
                color: #fff;
                line-height: 30px;
                font-weight: 300;
                text-align: center;
            }
        }


        .package-desc{
            padding-top: 18px;
            width: 100%;
            font-size: 14px;
            color: #333;
            line-height: 20px;
            font-weight: 300;
            box-sizing: border-box;
        }
    }

    /*切换标签*/
    .detail-tab{
        width: 100%;
        -webkit-transform: translate3d(0,0,0);/*0225F*/
        transform: translate3d(0,0,0);/*0225F*/
        -webkit-backface-visibility:hidden;/*0225F*/
        -webkit-perspective:1000;/*0225F*/
    }

    .tab-box{
        padding: 0 20px;
        width: 100%;
        height: 50px;
        background-color: #fff;
        box-sizing: border-box;
        overflow: hidden;


        &:after{
             z-index:101;
         .setBottomLine(#DFDFDF);
         }


        ul{
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            align-items: flex-start;
            -webkit-align-items: flex-start;
            -webkit-box-align: start;
            width: auto;
            height: 60px;
            line-height: 0;
            overflow-x: auto;
            overflow-y: hidden;
            -webkit-overflow-scrolling: touch;

            li{

                display: block;
                -webkit-box-flex: 0 0 auto;
                -moz-box-flex: 0 0 auto;
                -webkit-flex-shrink: 0;
                -ms-flex: 0 0 auto;
                flex: 0 0 auto;
                /*width: 92px;*/
                text-align: left;
                line-height: 0;
                box-sizing: border-box;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);/*0227 F*/

                span{
                    position: relative;
                    display: inline-block;
                    margin-right: 36px;
                    box-sizing: border-box;
                    font-size: 14px;
                    color: #333;
                    line-height: 47px;
                    white-space: nowrap;
                }


                &:last-child{
                     padding-right: 0;

                    span{
                        margin-right: 0;
                    }
                }

                &.active{
                    span{
                        color: #FF5523;
                        border-bottom: 2px solid #FF5523;
                    }
                 }

            }
        }
    }

    /*所需材料人员列表*/
    .detail-person{
        .ay_cells{
            margin-top: 0;

            &:before, &:after{
                display: none;
            }
        }

        .person-item{
            padding: 8px 0;

            .ay_cell_bd > p{
                font-size: 17px;
                color: #333;
            }

            .ay_cell_ft{
                margin-right: 20px;

                &.with_arrow:after{
                     right: -12px;
                     margin-top: -7px;
                     width: 16px;
                     height: 16px;
                     border-color: #777;
                     border-width: 3px 3px 0 0;
                     transform: rotate(45deg) scale(0.5);
                     -webkit-transform: rotate(45deg) scale(0.5);
                     transform-origin: 0 0;
                     -webkit-transform-origin: 0 0;
                 }
            }

            .person-note{
                font-size: 12px;
                color: #777;
                font-weight: 300;
            }

        }
    }

    /*产品说明*/
    .detail-instruction{
        padding-bottom: 10px;

        .ay_cells{
            margin-top: 0;

            &:before, &:after{
                display: none;
            }
        }

        .ay_cell{
            align-items: flex-start;
            -webkit-align-items: flex-start;
            -webkit-box-align: start;
            padding:0 0 20px 0;

            &:before{
                 display: none;
            }
        }
    }

    .instruction-item{

        .ay_cell_primary {
            -webkit-box-flex: 0 0 auto;
            -moz-box-flex: 0 0 auto;
            -webkit-flex-shrink: 0;
            -ms-flex: 0 0 auto;
            flex: 0 0 auto;
        }

        .ay_cell_bd > p{
            padding-right: 10px;
            width: 70px;
            font-size: 14px;
            color: #333;
            font-weight: 300;
        }

        .ay_cell_ft{
            display: none;
        }

        .instruction-content{
            -webkit-flex: 1;
            flex: 1;
            -webkit-box-flex: 1;
            -moz-box-flex: 1;
            -ms-flex: 1;
            width: 100%;
            font-size: 14px;
            color: #333;
            font-weight: 300;
            line-height: 20px;
        }


    }

    /*购买须知*/
    .detail-terms{
        .ay_cells{
            margin-top: 0;

            &:before, &:after{
               display: none;
            }
        }

        .ay_cell{
            padding: 8px 0;
        }

    }

    /*产品详情*/
    .detail-product{
        .ay_cells{
            margin-top: 0;

            &:before, &:after{
                display: none;
            }
        }

        .ay_cell{
            padding: 8px 0;
        }

    }



    /*客户点评*/
    .detail-comment{
        .ay_cells{
            margin-top: 0;

            &:before, &:after{
                display: none;
            }
        }

        .ay_cell{
            padding: 8px 0;
        }

    }


    /*文本*/
    .text-content{
        padding-bottom: 30px;
        font-size: 14px;
        color: #333;
        font-weight: 300;
        line-height: 21px;

        p{
            margin-bottom: 21px;
        }
    }

    /*图片*/
    .picture-content{
        padding-bottom: 30px;/*0217 F*/
        width: 100%;
        word-break: break-all;/*0301 F*/

        img{
            display: block;
            width: 100%;
            border: 0;
        }

        p,li{
            padding: 0 20px;
            font-size: 14px;
            color: #333;
            font-weight: 300;
            line-height: 21px;
        }/*0217 F*/

    }


    /*底部*/

    .detail-tabbar{
        background-color: #fff;

        .ay_tabbar_item{
            -webkit-box-flex: 0 0 auto;
            -moz-box-flex: 0 0 auto;
            -webkit-flex-shrink: 0;
            -ms-flex: 0 0 auto;
            flex: 0 0 auto;
            padding: 8px 0;
            width: 75px;
            height: 60px;
            box-sizing: border-box;

            &.ay_bar_item_on .ay_tabbar_label{
                 color: #333;
            }

        
            &.detail-tabber-item-on{

                .icon-collect{
                    background-image: url(data:image/png;base64,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);
                }

                .ay_tabbar_label{
                    color:#FF5523;
                }

             }



        }

        .ay_tabbar_label{
            font-size: 12px;
            color: #333;
            line-height: 20px;
        }

        .tabbar-right{
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            align-items: center;
            -webkit-align-items: center;
            -webkit-box-align: center;
            position: absolute;
            top:0;
            right:20px;
            width: 150px;
            height: 60px;

            .book-btn{
                display: block;
                width: 150px;
                height: 45px;
                border-radius: 50px;
                background-color: #FF5647;
                font-size: 16px;
                color: #fff;
                text-align: center;
                line-height: 45px;
            }

        }
    }

    .mask{
        position: absolute;
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.5);
        z-index: 119;
    }

    /*咨询列表弹出层*/
    .consult-list {
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 0 20px;
        width: 100%;
        background-color: #fff;
        overflow: hidden;
        box-sizing: border-box;
        z-index: 120;

        .consult{

            .ay_cells {
                margin-top: 0;
            }

            .section-title {
                .ay_cell_bd > p{
                    font-size: 17px;
                }
            }

            .ay_cell{
                padding: 8px 0;

                &:first-child{
                    .ay_cell_bd > p{
                        color:#FF5523;
                    }
                }
            }


           .ay_cell_primary{
               -webkit-box-flex: 0 0 auto;
               -moz-box-flex: 0 0 auto;
               -webkit-flex-shrink: 0;
               -ms-flex: 0 0 auto;
               flex: 0 0 auto;
           }

            .ay_cell_ft{
                -webkit-flex: 1;
                flex: 1;
                /* for uc */
                -webkit-box-flex: 1;
                -moz-box-flex: 1;
                -ms-flex: 1;

                &.with_arrow:after{
                    top:50%;
                 }
            }

            .item-media{
                padding-right: 8px;
                width: 17px;
                height: 17px;

                i{
                    display: block;
                    width: 17px;
                    height: 17px;
                    background-size: 17px;
                    background-repeat: no-repeat;
                    background-position: center;
                }
            }
        }
    }


    /*立即预订弹出层*/
    .book-list {
        position: fixed;/*0227 F*/
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #fff;
        overflow: hidden;
        z-index: 120;

        .content{
            padding-bottom: 0;
        }


        .visa-package{

            .ay_cells:after{
                display: block;
            }
            .package-title{
                font-size: 14px;
            }
        }
    }



    /*弹出框*/
    .detail-alert{
        .ay_dialog_title{
            font-size: 19px;
            color: #333;
        }

        .ay_dialog{
            padding-bottom: 32px;
        }

        .ay_dialog_bd{
            display: inline-block;
            padding:0 35px;
            font-size: 14px;
            color: #333;
            font-weight: 300;
            line-height: 24px;
            text-align: left;
        }

        .ay_dialog_ft{
            position: absolute;
            top:0;
            right: 0;
            margin: 0;
            width: 52px;
            height: 52px;

            &:after{
                display: none;
            }

            a{
                background: no-repeat center url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAW1JREFUSA2dlN1OwyAYhgvxEnZ/Zsa0JzvQqMmixyYe2OjJDmgXTe9vt2Dr+zJYOgb0GyT8FD6epwWKMsZsq6p6Qv6t63qrlBrRLk7TNOmu6z4AWCO3Nyg2yCvkFwysEHBfKnHwPViEM200CmObx2INyZ6Bsz5RMwLnPKNsacwX6ge2XeJyib8kAf9umubRCgjFXhRJcnByT4ISyRL8QnCNRAKPCiQSKTwpyEk4xpOGyh9FdtkNZSNMZ3sQDsY23sWI4IzNChgQkbDbp+Sb+4BFAQMTkkU450r/2D8GBynWF4TIlugTs3gZxlKLv/U5NuD7skuEpQnhg5t46wGos5KkIAbH/XRHMI7pDyqRJCpIwf017n40keRCsATnFzBJJWcCKfyokElOgmvhUokVlMIlEtX3/es4ju8+GPXA0+I3dNafbcb2RGv9pgFvZjOL4JzPF3LHePA8SGteFTvkA3Jb8uYexnomafF4wPPuHxWECWUSKpFnAAAAAElFTkSuQmCC);
                background-size: 12px;
            }
        }

    }

    /*客服对话框 0222 F*/
    #jiaxin-mcs-fixed-dialog{
        position: fixed !important;
        left: 0 !important;
        right: 0 !important;
        top: 0 !important;
        bottom: 0 !important;
        padding: 0 !important;
        margin: 0 !important;
        width: 100% !important;
        height: 100% !important;

        & > div{
            padding: 0;
            margin: 0;
            width: 100%;
            height: 100%;

        }
    }

    #jiaxin-mcs-fixed-btn{
        z-index: -1 !important;
        right: 0 !important;
        bottom: 0 !important;
    }

</style>
