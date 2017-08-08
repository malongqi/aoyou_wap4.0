<template>
    <div class="page-wrap">
        <sticky>
            <x-header :left-options="{showBack: true}">我的评价
                <!--<a slot="right"><span class="icon-message"></span></a>-->
                </x-header>
        </sticky>
        <!--评论列表-->
        <div class="travel-wrap">
            <!--出游身份-->
            <div class="travel-person" v-if="orders.SF">
                <div class="title"><b>*</b>{{orders.SF.Title}}</div>
                <ul class="radio-list">
                    <li v-for="item in orders.SF.Infos" :class="{'select':orders.SF.CurrentPerson==$index}" @click="radio($index,item.Question_Title)">{{item.Question_Title}}</li>
                </ul>
            </div>
            <!--打分评价-->
            <div class="travel-person" v-if="orders.DynamicQuestion">
                <div class="title"><b>*</b>{{orders.DynamicQuestion.Title}} <em>{{orders.DynamicQuestion.Desc}}</em> </div>
                <section v-if="!orders.State">
                    <div class="travel-cell" v-for="(dqindex,item) in orders.DynamicQuestion.Infos">
                        <div class="cell">
                            <div class="left">{{item.Question_Title}}</div>
                            <div class="right">
                                <rater star="" :value.sync=item.IsSocre></rater>
                            </div>
                        </div>
                        <div class="cell" v-if="item.Question_Description_quick.length>0">
                            <span v-for="li in item.Question_Description_quick[item.IsSocre-1]" :class="[{active:isQuest[(dqindex)*10+$index]}]" 
                            @click="tapQuestion(dqindex,$index,li)">{{li}}</span>
                        </div>
                        <div class="travel-text" v-if="item.Question_Description_quick.length>0">
                            <x-textarea :max="200" name="detail" placeholder="请填写详细信息" :show-counter="false" :value.sync=questTxt[dqindex]></x-textarea>
                        </div>
                    </div>
                </section>
                <div class="travel-cell fix-travel" v-if="orders.State">
                    <div class="cell">
                        <div class="left">　</div>
                        <div class="right">
                            <rater star="" :value.sync=orders.PaperInfo[0].IsSocre></rater>
                        </div>
                    </div>
                    <div class="cell" >
                        <div class="cell-content" v-for="_paperinfo in orders.PaperInfo">
                            <em>{{_paperinfo.Question_Title}}</em>
                            <x-textarea class="fix-textarea" :max="200" name="detail" :placeholder="_paperinfo.placeholder" 
                            :show-counter="false" :value.sync="_paperinfo.Question_Description"></x-textarea>
                        </div>
                          <!--<div class="cell-content">
                            <em>{{orders.State_Description.Satisfied_Title}}</em> 
                            {{orders.State_Description.Satisfied_Title}}
                        </div>
                        <div class="cell-content">
                            <em>{{orders.State_Description.NotSatisfied_Title}}</em> 
                            {{orders.State_Description.NotSatisfied_Description}}
                        </div>-->
                    </div>
                </div>
            </div>
            <!--晒美图-->
            <div class="travel-person" v-if="orders.ST?showphoto:false">
                <div class="title">{{orders.ST.Title}} <em>{{orders.ST.Desc}}</em> </div>
                <section class="show-img" v-if="orders.ST.imgLists">
                    <div class="img-item"  v-for="item in orders.ST.imgLists"><img  class="previewer-demo-img" :src="item.src" @click="$refs.previewer.show($index)"></div>
                    <div class="img-item" v-if="orders.ST.imgLists.length< 8"  ><input type="file" @change="changeImg" accept="image/*" multiple="multiple" name="file" /><div class="img-info">{{orders.ST.imgLists.length}}/8</div></div>
                </section>
                </div>
                <!--关于服务-->
                <div class="travel-person" v-if="orders.AboutService">
                    <div class="title">{{orders.AboutService.Title}} <em class="fix-em">{{orders.AboutService.Desc}}</em> </div>
                    <div class="travel-cell" v-for="item in orders.AboutService.Infos">
                        <div class="cell">
                            <div class="left">{{item.Question_Title}}</div>
                            <div class="right">
                                <rater star="" :value.sync=item.IsSocre></rater>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--提交tabbar-->
            <div class="travel-tabbar">
                <span :class="['left',{select:isComment}]" @click="comment">匿名评论</span>
                <span class="right" @click="submit">提交评价</span>
            </div>

        <!--插件使用-->
        <toast :show.sync="showToastTop" class="tips" :time="3000" type="text" width="100%">{{message}}</toast>
        <alert :show.sync="showToast" title=" " button-text="确认" @on-hide="alerthide">成功提交，请耐心等待审核</alert>
         <alert :show.sync="showToastFail" title=" " class="faildialog" button-text="确认" @on-hide="">提交失败</alert>
        <div v-if="orders.ST"><previewer :list="orders.ST.imgLists" v-ref:previewer :options="options"></previewer></div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'
    import Lrz from 'lrz'

    Vue.use(VueAxios, axios)

    //Add the component
    import {
        XHeader,
        Sticky,
        Tab,
        TabItem,
        Card,
        Rater,
        XTextarea,
        Toast,
        Alert,
        Previewer
    } from '../../components'

    export default {
        components: {
            XHeader,
            Sticky,
            Tab,
            TabItem,
            Card,
            Rater,
            XTextarea,
            Toast,
            Alert,
            Previewer
        },
        data() {
            return {
                orders: [],
                isComment: false,
                isQuest: [],
                questTxt: [],
                showToast: false,
                showToastFail: false,
                showToastTop: false,
                showphoto: false,
                message: "感谢您的评价！审核通过后您将获得游币奖励呦~",
                options: {
                    getThumbBoundsFn(index) {
                        // find thumbnail element
                        let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
                            // get window scroll Y
                        let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
                            // optionally get horizontal scroll
                            // get position of element relative to viewport
                        let rect = thumbnail.getBoundingClientRect()
                            // w = width
                        return {
                            x: rect.left,
                            y: rect.top + pageYScroll,
                            w: rect.width
                        }
                        // Good guide on how to get element coordinates:
                        // http://javascript.info/tutorial/coordinates
                    }
                },
                subpara: {
                    "MainRecordInfoDTO": {

                        "ProductId": 999,
                        "ProductTypeId": 0,
                        "DestId": 0,
                        "IsPhoto": 0,
                        "SubOrderId": 0,
                        "SubOrderno": "",
                        "CustomerId": 0,
                        "MemeberId": 0,
                        "CustomerName": "",
                        "IsAnonymous": 0,
                        "IsRecommend": 0,

                        "StarNum": 0,
                        "IsVerify": 0,

                        "IsVerifyPhoto": 0,
                        "EvaluateSource": 0,
                        "TrueProductTypeId": 0,
                        "CruiseID": 0,
                        "CruiseCompanyID": 0,
                        "CruiseRouteID": 0,
                        "ProductName": ""
                    },
                    "SubInfoOneDTO": {
                        "Id": 0,
                        "ValueId": 0,
                        "Value": ""
                    },
                    "SubInfoTwoListDTO": [

                    ],
                    "SubInfoThreeListDTO": [

                    ],
                    "SubInfoFourListDTO": [

                    ],
                    "SubInfoFiveListDTO": [

                    ]

                },
                inti: {
                    "State": true,
                    "PaperInfo": [{
                        "QuestionId": "2a6800d5-7201-4d96-9cbb-a7e656c9aa77",
                        "Paper_Description": "您的打分及评价，对其他游客很重要！",
                        "Question_Title": "满意=",
                        "Question_Description": "",
                        "IsSocre": 0,
                        "IsReplay": 1,
                        "placeholder": "最令您满意的地方，和大家分享吧~"
                    }, {
                        "QuestionId": "95b85d21-33ce-4127-ac86-74ca4e21f625",
                        "Paper_Description": "您的打分及评价，对其他游客很重要！",
                        "Question_Title": "不满意=",
                        "Question_Description": "",
                        "IsSocre": 0,
                        "IsReplay": 1,
                        "placeholder": "您还有什么不满意的地方？快点吐槽吧~"
                    }],
                    "SF": {
                        "Title": "出游身份",
                        "ProductID": "123456789",
                        "ProductType": "1",
                        "CriuseID": "邮轮ID",
                        "CriuseCompany": "邮轮公司ID",
                        "CurrentPerson": -1,
                        "CurrentTitle": "",
                        "Infos": [{
                            "Question_Title": "独行侠",
                            "no": 1
                        }, {
                            "Question_Title": "年轻夫妇/情侣",
                            "no": 2
                        }, {
                            "Question_Title": "年长的夫妇",
                            "no": 3
                        }, {
                            "Question_Title": "有年纪较小的孩子同行的家庭",
                            "no": 4
                        }, {
                            "Question_Title": "有老人同行",
                            "no": 5
                        }, {
                            "Question_Title": "有年纪较大的孩子同行的家庭",
                            "no": 6
                        }, {
                            "Question_Title": "朋友团体",
                            "no": 7
                        }]
                    },
                    "DynamicQuestion": {
                        "Title": "打分评价",
                        "Desc": "评价可获得更多游币",
                        "Infos": [{
                            "QuestionId": "2a6800d5-7201-4d96-9cbb-a7e656c9aa77",
                            "Question_Description_quick": [
                                ["排合理", "不浪费时间", "承诺的都实现了"]

                            ],
                            "Question_Title": "行程",
                            "IsSocre": 0
                        }, {
                            "QuestionId": "95b85d221-33ce-4127-ac86-74ca4e21f625",
                            "Question_Description_quick": [
                                ["排合理", "不浪费时间", "承诺的都实现了"]
                            ],
                            "Question_Title": "餐饮",
                            "IsSocre": 0
                        }]
                    },
                    "ST": {
                        "Title": "晒美图",
                        "Desc": "可获得更多游币奖励！",
                        "MaxNum": 8,
                        "imgLists": []

                    },
                    "AboutService": {
                        "Title": "关于服务",
                        "Desc": "您对本次预定服务是否满意",
                        "Infos": [{
                            "QuestionId": "2a6800d5-7201-4d96-9cbb-a7e656c9aa77",
                            "Question_Description": "",
                            "Question_Title": "服务态度",
                            "IsSocre": 0
                        }, {
                            "QuestionId": "95b85d221-33ce-4127-ac86-74ca4e21f625",
                            "Question_Description": "",
                            "Question_Title": "反馈速度",
                            "IsSocre": 0
                        }, {
                            "QuestionId": "95b85d221-33ce-4127-ac86-74ca4e21f625",
                            "Question_Description": "",
                            "Question_Title": "回复内容",
                            "IsSocre": 0
                        }]
                    }
                }



            }

        },
        methods: {
            radio(num, Question_Title) {
                this.orders.SF.CurrentPerson = num;
                this.orders.SF.CurrentTitle = Question_Title;
            },
            comment() {
                this.isComment = !this.isComment;
            },
            tapQuestion(qnum, num, txt) {

                var qup = qnum * 10 + num;
                if (this.isQuest[qup] == null) {
                    //初始化数组
                    this.isQuest[qup] = false;
                }

                this.isQuest.splice(qup, 1, !this.isQuest[qup]);

            },

            alerthide() {
                api.pageBack();
            },
            changeImg(e) {
                var imgLists = this.orders.ST.imgLists
                var submitData = {}
                submitData.PicManagerList = []
                var totalCount = this.orders.ST.imgLists.length + e.currentTarget.files.length
                if (totalCount > 8) {
                    this.message = "最多只能上传8张图片";
                    this.showToastTop = true;

                    return false
                }

                for (var i = 0; i <= e.currentTarget.files.length - 1; i++) {
                    lrz(e.currentTarget.files[i], {
                            //  width: 800,
                            quality: 0.5,
                        })
                        .then(function(rst) {
                            var PicName = new Date().getTime() + rst.origin.name;
                            var PicUrl = "orderevaluate/" + PicName
                            var FileStreamStr = rst.base64.split(',')[1]
                                //submitData.PicManagerList.push({"PicName":PicName,"PicType":"OrderEvaluate","PicUrl":PicUrl,FileStreamStr:FileStreamStr})
                            imgLists.push({
                                "src": rst.base64,
                                "w": 600,
                                "h": 400,
                                "PicName": PicName,
                                "PicType": "OrderEvaluate",
                                "PicUrl": PicUrl,
                                FileStreamStr: FileStreamStr
                            });
                            return rst;
                        }).catch(function(err) {
                            // 处理失败会执行
                        })
                        .always(function() {
                            // 不管是成功失败，都会执行
                        });
                }
                this.orders.ST.imgLists = imgLists
                this.submitData = submitData
            },

            submit() {
                //获取参数

                this.subpara.MainRecordInfoDTO.IsPhoto = this.orders.ST.imgLists.length > 0 ? 1 : 0; //是否晒图
                this.subpara.MainRecordInfoDTO.IsAnonymous = this.isComment ? 1 : 0;
                this.subpara.MainRecordInfoDTO.CruiseID = 0;


                if (this.orders.SF.CurrentPerson > -1) {
                    this.subpara.SubInfoOneDTO.ValueId = this.orders.SF.CurrentPerson; //出游身份
                } else {
                    //
                    this.message = "请填选出游身份";
                    this.showToastTop = true;
                    return;
                }
                this.subpara.SubInfoOneDTO.Value = this.orders.SF.CurrentTitle; //
                //打分评价
                if (this.subpara.MainRecordInfoDTO.ProductTypeId == 4 || this.subpara.MainRecordInfoDTO.ProductTypeId == 7) {
                    if (this.orders.PaperInfo[0].IsSocre > 0) {
                        globalThis.orders.PaperInfo[0].QuestionId
                            //签证自由行 
                        this.subpara.SubInfoTwoListDTO[0] = {
                            "Id": 0,
                            "Score": this.orders.PaperInfo[0].IsSocre,
                            "Replay": this.orders.PaperInfo[0].Question_Description,
                            "QuestionId": this.orders.PaperInfo[0].QuestionId,
                            "MainRecordId": "00000000-0000-0000-0000-000000000000"
                        };
                        this.subpara.MainRecordInfoDTO.StarNum=this.orders.PaperInfo[0].IsSocre;
                        this.subpara.SubInfoTwoListDTO[1] = {
                            "Id": 0,
                            "Score": this.orders.PaperInfo[1].IsSocre,
                            "Replay": this.orders.PaperInfo[1].Question_Description,
                            "QuestionId": this.orders.PaperInfo[1].QuestionId,
                            "MainRecordId": "00000000-0000-0000-0000-000000000000"
                        };
                    } else {
                        //必须打星星
                        this.message = "请给我们的服务打分";
                        this.showToastTop = true;
                        return;
                    }

                } else {
                    //参团邮轮
var avgscore=0;
                    for (var i = 0; i < this.orders.DynamicQuestion.Infos.length; i++) {
                        if (this.orders.DynamicQuestion.Infos[i].IsSocre > 0) {
                            this.subpara.SubInfoTwoListDTO[i] = {
                                "Id": 0,
                                "Score": this.orders.DynamicQuestion.Infos[i].IsSocre,
                                "Replay": this.questTxt[i] || "",
                                "QuestionId": this.orders.DynamicQuestion.Infos[i].QuestionId,
                                "MainRecordId": "00000000-0000-0000-0000-000000000000"
                            };
                            avgscore+=this.orders.DynamicQuestion.Infos[i].IsSocre;
                        } else {
                            //必须打星星
                            this.message = "请给" + this.orders.DynamicQuestion.Infos[i].Question_Title + "服务打分";
                            this.showToastTop = true;
                            return;
                        }
                    }
                     this.subpara.MainRecordInfoDTO.StarNum=Math.ceil(avgscore/this.orders.DynamicQuestion.Infos.length);
                }


                for (var i = 0; i < this.orders.AboutService.Infos.length; i++) { //关于服务
                    this.subpara.SubInfoFiveListDTO[i] = {
                        "Id": 0,
                        "Score": this.orders.AboutService.Infos[i].IsSocre,
                        "SequenceNum": 0,
                        "MainRecordId": "00000000-0000-0000-0000-000000000000"
                    }
                }




                //var parastr=JSON.stringify(this.subpara);
                //console.log(parastr);

                PostEvaluation(this.subpara, this);

            }
        },
        ready() {
            globalThis = this


            this.orders = this.inti

            var OrderType_m = this.$route.query.ordertype_m; //产品类型
            var SubOrderno = this.$route.query.SubOrderno; //订单号   
            var ProductId = this.$route.query.ProductId; //产品id

            var CruiseID = this.$route.query.CruiseID; //邮轮编号
            var CruiseCompanyID = this.$route.query.CruiseCompanyID;
            var CruiseRouteID = this.$route.query.CruiseRouteID;

            var suborderid = this.$route.query.suborderid; //订单id

            var memberid = api.getCookie("memberid");

            if (memberid == undefined || memberid == "") {
                memberid = this.$route.query.memberid;
            }
            if (memberid == undefined || memberid == "") {
                api.toLogin(encodeURIComponent(location.href), encodeURIComponent(location.href), "back")
                return false
                //window.location.href = "http://mpass.aoyou.com?from=" + location.href + "&forward=" + location.href
            }
            this.subpara.MainRecordInfoDTO.MemeberId = memberid;
            this.subpara.MainRecordInfoDTO.SubOrderno = SubOrderno;
            this.subpara.MainRecordInfoDTO.ProductId = ProductId;
            this.subpara.MainRecordInfoDTO.CruiseID = CruiseID;
            if (CruiseCompanyID) {
                this.subpara.MainRecordInfoDTO.CruiseCompanyID = CruiseCompanyID;
            }

            //this.subpara.MainRecordInfoDTO.CruiseRouteID = CruiseRouteID;
            this.subpara.MainRecordInfoDTO.SubOrderId = suborderid;
            GetTypeDeatail(OrderType_m);
        }
    }

    function PostEvaluation(para, content) {
        var imgindex = 0;

        PostImg(imgindex, para, content);
    }

    function PostImg(imgindex, para, content) {
        if (content.orders.ST.imgLists.length > 0) {
            var imgserviceurl = "http://7xipiw.com2.z0.glb.qiniucdn.com/";

            var useCache = false;
            var useProxy = true;
            api.post({
                path: api.config.microServiceHost.imageurl,
                controller: 'ImageManager',
                action: 'AddOnlyPic',
                param: JSON.stringify(content.orders.ST.imgLists[imgindex]),
                useCache: useCache,
                useProxy: useProxy,
                callback: function(obj) {

                    //console.log(obj);
                    if (obj.ErrorCode == 0) {
                        //晒图
                        para.SubInfoFourListDTO[imgindex] = {
                            "Id": 0,
                            "PhotePath": JSON.parse(obj.JsonResult).PicUrl,
                            "MainRecordId": ""
                        }

                        if (imgindex < content.orders.ST.imgLists.length - 1) {
                            PostImg(imgindex + 1, para, content);
                        } else {
                            PostContext(para);
                        }
                    }
                }
            });
        } else {
            PostContext(para);
        }
    }

    function PostContext(para) {

        var useCache = false;
        var useProxy = true;

        var actionname = "AddUserOrderEvaluateInfo";

        debugger
        api.post({
            path: api.config.microServiceHost.orderevalurl,
            controller: 'Evaluate',
            action: actionname,
            param: JSON.stringify(para),
            useCache: useCache,
            useProxy: useProxy,
            callback: function(obj) {
                if (obj.ReturnCode == 0) {
                    if (obj.Data != false) {
                        globalThis.showToast = true;

                    } else {
                        globalThis.showToastFail = true;
                    }
                } else {
                    globalThis.showToastFail = true;
                }

            }
        });
    }
    var globalThis;
    //获取评价内容
    function GetTypeDeatail(OrderType_m) {
        var useCache = false;
        var useProxy = true;
        var producttype = 4;
        if (OrderType_m == 1 || OrderType_m == 7) {
            producttype = 4;
        } else if (OrderType_m == 2) {
            producttype = 3
        } else if (OrderType_m == 3) {
            producttype = 5
        }

        globalThis.subpara.MainRecordInfoDTO.ProductTypeId = producttype;

        var para = {
            "producttypeid": producttype
        };

        api.post({
            path: api.config.microServiceHost.orderevalurl,
            controller: 'Evaluate',
            action: 'GetPaperInfoByProductTypeId',
            param: JSON.stringify(para),
            useCache: useCache,
            useProxy: useProxy,
            callback: function(obj) {

                if (obj.ReturnCode == 0) {

                    if (producttype == 4) {

                        globalThis.orders.State = true; //使用自由行模式
                        var data = obj.Data;
                        globalThis.orders.PaperInfo[0].QuestionId = data[0].QuestionId;
                        globalThis.orders.PaperInfo[0].Question_Title = data[0].Question_Title;
                        globalThis.orders.PaperInfo[0].placeholder = data[0].Question_Description;
                        globalThis.orders.PaperInfo[1].QuestionId = data[1].QuestionId;
                        globalThis.orders.PaperInfo[1].Question_Title = data[1].Question_Title;
                        globalThis.orders.PaperInfo[1].placeholder = data[1].Question_Description;
                    } else {

                        globalThis.orders.State = false; //使用非自由行模式
                        var data = obj.Data;
                        //globalThis.orders.DynamicQuestion.Infos=data;
                        var qd = GetQuestion_Description(producttype); //获取类型对应的评价项目


                        for (var i = 0; i < data.length; i++) //填充服务器返回的评价项目
                        {
                            for (var j = 0; j < qd.length; j++) {
                                if (data[i].Question_Title == qd[j].Question_Title) {
                                    qd[j].QuestionId = data[i].QuestionId;
                                    break;
                                }
                            }

                        }
                        debugger
                        globalThis.orders.DynamicQuestion.Infos = qd;
                    }
                }
            }
        });
    }


    var Question_Description_quicks = [{
        "type": 3, //参团
        "descs": [{
                "Question_Title": "行程安排",
                "IsSocre": 0,
                "QuestionId": "",
                "Question_Description_quick": [
                    ["安排不合理", "浪费时间", "购物店多"],
                    ["安排不合理", "浪费时间", "购物店多"],
                    ["安排不合理", "不浪费时间", "承诺的都实现了"],
                    ["安排不合理", "不浪费时间", "承诺的都实现了"],
                    ["安排不合理", "不浪费时间", "承诺的都实现了"]
                ]
            },

            {
                "Question_Title": "餐饮安排",
                "IsSocre": 0,
                "QuestionId": "",
                "Question_Description_quick": [
                    ["食材不新鲜", "不好吃", "种类太少", "服务态度差"],
                    ["食材不新鲜", "不好吃", "种类太少", "服务态度差"],
                    ["味道好", "吃的种类丰富", "服务态度好", "食材新鲜"],
                    ["味道好", "吃的种类丰富", "服务态度好", "食材新鲜"],
                    ["味道好", "吃的种类丰富", "服务态度好", "食材新鲜"]
                ]
            },

            {
                "Question_Title": "酒店住宿",
                "IsSocre": 0,
                "QuestionId": "",
                "Question_Description_quick": [
                    ["房间太小", "卫生条件不好", "交通不便"],
                    ["房间太小", "卫生条件不好", "交通不便"],
                    ["交通便利", "居住舒适", "酒店服务好"],
                    ["交通便利", "居住舒适", "酒店服务好"],
                    ["交通便利", "居住舒适", "酒店服务好"]
                ]
            },

            {
                "Question_Title": "导游领队",
                "IsSocre": 0,
                "QuestionId": "",
                "Question_Description_quick": [
                    ["讲解不全", "服务态度不好", "听不明白"],
                    ["讲解不全", "服务态度不好", "听不明白"],
                    ["导游领队", "耐心", "讲解细致", "引人入胜"],
                    ["导游领队", "耐心", "讲解细致", "引人入胜"],
                    ["导游领队", "耐心", "讲解细致", "引人入胜"]
                ]
            }
        ]
    }, {
        "type": 5, //邮轮
        "descs": [{
                "Question_Title": "船上用餐",
                "IsSocre": 0,
                "QuestionId": "",
                "Question_Description_quick": [
                    ["食材不新鲜", "不好吃", "种类太少", "服务态度差"],
                    ["食材不新鲜", "不好吃", "种类太少", "服务态度差"],
                    ["味道好", "吃的种类丰富", "服务态度好", "食材新鲜"],
                    ["味道好", "吃的种类丰富", "服务态度好", "食材新鲜"],
                    ["味道好", "吃的种类丰富", "服务态度好", "食材新鲜"]
                ]
            },

            {
                "Question_Title": "船上设备",
                "IsSocre": 0,
                "QuestionId": "",
                "Question_Description_quick": [
                    ["设施陈旧", "娱乐种类少", "活动不丰富"],
                    ["设施陈旧", "娱乐种类少", "活动不丰富"],
                    ["设施前卫", "娱乐设施种类多", "活动棒"],
                    ["设施前卫", "娱乐设施种类多", "活动棒"],
                    ["设施前卫", "娱乐设施种类多", "活动棒"]
                ]
            },

            {
                "Question_Title": "房间设施",
                "IsSocre": 0,
                "QuestionId": "",
                "Question_Description_quick": [
                    ["房间太小", "风景不好", "太闷了"],
                    ["房间太小", "风景不好", "太闷了"],
                    ["风景好", "舒适", "房间合适", "设施齐备"],
                    ["风景好", "舒适", "房间合适", "设施齐备"],
                    ["风景好", "舒适", "房间合适", "设施齐备"]
                ]
            },

            {
                "Question_Title": "岸上观光",
                "IsSocre": 0,
                "QuestionId": "",
                "Question_Description_quick": [
                    ["观光时间太短", "景点选择的不好"],
                    ["观光时间太短", "景点选择的不好"],
                    ["时间充足", "感受很棒", "景点选择合理"],
                    ["时间充足", "感受很棒", "景点选择合理"],
                    ["时间充足", "感受很棒", "景点选择合理"]
                ]
            },

            {
                "Question_Title": "领队服务",
                "IsSocre": 0,
                "QuestionId": "",
                "Question_Description_quick": [
                    ["不负责", "态度不好", "服务质量不好"],
                    ["不负责", "态度不好", "服务质量不好"],
                    ["负责任", "颜值棒棒的", "幽默风趣"],
                    ["负责任", "颜值棒棒的", "幽默风趣"],
                    ["负责任", "颜值棒棒的", "幽默风趣"]
                ]
            }
        ]
    }];

    function GetQuestion_Description(type) {
        for (var i = 0; i < Question_Description_quicks.length; i++) {
            if (type == Question_Description_quicks[i].type) {
                return Question_Description_quicks[i].descs;
            }
        }
        return null;
    }
</script>
<style lang="less">
    .tips{
        .ay_toast{
            margin-top: 0
        }
    }
    .ay-rater-box {
        width: 18px !important;
        height: 18px !important;
        margin-top: 8px;
        margin-right: 18px !important;
        .ay-rater-inner {
            width: 18px !important;
            height: 18px !important;
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAlCAYAAAAuqZsAAAAAAXNSR0IArs4c6QAAA0JJREFUWAnVmN+rTFEUx5351S0eKW9M8/MavFyXiEJKlEl+FA88eLh/gyie+BM8StSlbiSKElJENCLCnTnz49XjLSnNT591O3PvmZl9zj4z5xxl126vvc5a3/U9a+0fZ8ZYE0Arl8v5Xq/3SKAMwyjmcrlFv7ARvwDiD6kbDBnplixqX83w5Y0z2doLmdd2HLK2j6y9sevGlYPI2FVFUJVOYeas8pUx0zR3dzqdtyr4aDS6J5PJvFM986LzlTFIOWam2+1e8ULAyWbijLG2drK23jsBi561tou19sHNxumZn4x5yYgXGyW3iTJWrVZn2u12SYk4pIzFYjvS6fTHIbV2OlHGIOU5E+PY2tmOTYydeAyAoh1EIxctH43Z4GPHUjYajY3NZjMTiUTkNM/S5WSXq2fLIIS3GRvhO5aLjCa9wq41E4mEmUwmf6oQDAhMQeA4AQs4ZDESIkJincohBN0v4lbBNYlbQf4G4YcG2/4FioMhBJwYEnIvZY0VJkYIz7EQgd1Fei+8GOMhCxfhFMlms7dwnWPSHQ8ieGuLw5xwWtmVrLXzhLrJeosGH1KPCKkOVhe4wm6L9QoxmUDuDMTuIMZk/g9bG2LnIHWvH3OAmCgrlcpJzpi7iPG+Uchji7PyLOW7b48zQkweclIX+aRZQEzYjUOQm3y3nea7bfn3gh1fSUwMKOsRhgeUdsruEJRM6f6AdYLyPVVhOhITY8p6iLI+QQy6rFK+o5TvuYqU6FwvcctRShp0W3AjJcFciYmBdbaIGFjzgqklBpswriwtpisx67CdDixVq0DTuoPclVi9Xk+FsSsFU7BXeY5KrsQ4y7aOugSj0WG7EuPNQiOmw/4/ibGttRmztv48V8uMdAo97+U40GE7nvykOsG19JtAbl8aj+Px+OVUKvXVvvJqtdq2Vqt1DZ38onJqba6jtRBsqgwciVngX1RO6F6RnUu6P02sP12uY79fhcNLbR9+qb6d4xrjjtzcN7KNJQgdzufzB3SkxEdsxFZ8mJZsOMsiO3PTsK4/dySGwSfSvCSGjD+4dE8RZJZgz/rOXkfxEV/BECwLcwn5s1eMATtKsYF1Nst6C+xzW7AEk75+INjQ5C+6xDGgY1ddegAAAABJRU5ErkJggg==) !important;
            background-repeat: no-repeat !important;
            background-size: 100% !important;
        }
        &.is-active {
            .ay-rater-inner {
                background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAlCAYAAAAuqZsAAAAAAXNSR0IArs4c6QAAA6hJREFUWAnNWEtrFEEQruoZQ0AFEQRvBmSj8XHwgaJ4yEZBFBJFifhKUA/+BkHUgPgXPHgQyWMVF8W3EDRZL4oSHyA+yApeBUUFEWQz3WXVxAnt7k7PujsbbDJ0zddVX32p7u3uXYQUGh3pXG5KdEuoVAv24KXC+0ZpVaMEEq+n6DwBZOQROw3OhoVRf+cWIMjOiGE7xGaA+oyGhekAzpSnroaV+yS9Y5KDa5z6t27SQfC4mo/n+5tx8OGTamO1YA1VTAe6olpRUq316ciup6+7YtTftYGFPXUl9XxvIw6OPXP5xI3VXTGtTWJFavGJE1ZXxehgdp0GMxFHauMeqPWYG39uY7XYdVVMY3K1ouT/4hvFSP/Pwqivq5v3rR6bxGmzbxjjdKocjJ1KPmYWQ+BlNJkMErUTUoadlxPBikqaZAQR3vLJ8B4Ji4Q46aEqgq+LfHx9qhaNLKBVa9iNBlYCUDtXIwOAfLzQvGoBaWMs+Afn/AAIRc47SQreeB7c8HWJ7nKyLv5vrPb3mzWQuskzMJ9J17C4NVwYPnj5T8OYQkCu1P/VRJNijSd47cxeiRJqIFpEk/JzhUuk8DjPtUmIafqwaBAtookFTrfgcLYfDV3kRe9F2Gz2PH2aRR3zh8cHJe+MMHkJ+jr3o4YhFufL+2w1FhVwOfr8ocKVKOdfwgSkw9m9hsxlnug5kVMze56+KYXqAA6PX7PzVAiTQRbXY4zJ8yJssZ3Ttjl5SSnVy6LC7ws2f1Vh4kCHunYYMNeJqNUOSMtGxF8K1B4cGbtfjTNWmDjTwc5tBule2tMaTh/hTswVHlQTJZjzEP8TmI8LbgDPu0QlCptOzKdo6i2Z01mxUA9R+kdWDZxOYXS11wPEjvQLhh0ht4PYKQzufF3ajE9lyMncDl3uxQ+BWeUKbmgsgdtZMYPQNGFJ3E5hRM2rWBK3UxhvhIkVk6sKPzlPeevkEVuwpGlmHyd37M5PA70tZvLzz4Sbxm0P55zEkQevbSF0aNtqTVPnGOu2cduWG4VqXzQXB/IlG4/s+IoVvy2LFYVYkB9N/NyjnnJRQiyYjIkPbzeFKJndh9ycw8ZsO16YMm2247SNEx562/2RQraWX3LER3wlhuVOVPIFSyqxaST+QmjMS74BfOc9ZwGvh3d8ZzpVfmeKIy3H+QYxytjon7veWb4UdAg3Y6/KfaP32DUmDnR0xyIoldpg18IXuC/PX6wab+GOf/PrWpirP+KFwpc4xt8olFQhPfwHJQAAAABJRU5ErkJggg==) !important;
                background-repeat: no-repeat !important;
                background-size: 100% !important;
            }
        }
    }
    
    .travel-person .ay_textarea {
        height: 50px;
        background: #F3F4F4;
        border: 1px solid #D8D8D8;
        border-radius: 10px;
        font-family: STHeitiSC-Light;
        font-size: 14px;
        color: #333333;
        line-height: 21px;
        padding: 4px 10px;
    }
    
    .page-wrap .ay_toast_text {
        position: fixed;
        top: 44px;
        width: 100%;
        display: block;
        background: rgba(255, 170, 9, 0.95);
        border-radius: 0;
        .ay_toast_content {
            font-family: STHeitiSC-Medium;
            font-size: 14px;
            line-height: 14px;
            padding-top: 13px;
            padding-bottom: 13px;
            color: #FFFFFF;
            letter-spacing: 0.59px;
            border-radius: 0;
        }
    }
    
    .ay_dialog {
        height: 200px;
        background: #FFFFFF;
        border-radius: 6px;
    }
    
    .ay_dialog_hd {
        position: relative;
        height: 54px;
    }
    
    .ay_dialog_hd:after {
        content: '';
        display: inline-block;
        margin: 0 auto;
        width: 54px;
        height: 54px;
        background: url(data:image/png;base64,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) no-repeat;
        background-size: 100%;
    }
    
    .faildialog .ay_dialog_hd:after {
        content: '';
        display: inline-block;
        margin: 0 auto;
        width: 54px;
        height: 54px;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGsAAABrCAYAAABwv3wMAAAAAXNSR0IArs4c6QAAFU1JREFUeAHtXQuUldV13vu/d2YYYAQVTY0xTlqFmIe1SaNRY6u0iqJYbRTDAMMMQ1BRljVLG40xEl1qG+wyWYgPBGYYmMH4SNSqRE1Q05jWpprWNCsFTEGJMb6rAwJ37v13v3P+uXfuvf8+9zH3icxZa+Y//97nvf9zzj77cS7TXhRk1sJJ5O2ZQsRTyMcfy2QimUTCLcTUQoI/kvHoUiP+diHdLqTBk94E7lXy+Hfk03a8/5o48iL3r3oZ8b0mcD23VGZ1fBLtmwpCTMVg/wUIcVB528vvgZgvoOyniaNP04Fjn+Nly/aUt47ylVZXxJIlS6L00tZplKCvgEB/hUE8pHxdLagkMxtX0qSWK+uRaNGCulDhRNLe9Wc0mGinzVvbQKCDbXVS4Ur14psxexfT2wMe0JfqSWoHrRmx5N57I/TwhpmUkK/TYPxP7RDUhkDa6LcDOEosWbiwgXbG5tKDj16NWXSENlI1hwnYkDoMVZtZIsLUNr+DBmLfxlJz2AjHIoZ8W4h5E4lsIs/D09tKnryH4R2gJhmgiRN30IQJCdq27QCShgMpMXgAOMcDwEgciHonId1nkf845D/S2QaW1U5cDRFVIZa0LziaZnfejsE6sci+xsFo/ILY20gebaSI/Jx7enYXWMYfkM78qUG6ug6gPYljQbzj0C4Qjz+DhBEwGOto8uHXqJlqDKwoNyjz57fQLv96DMbiYCAK6m0CBPoJUvbSxHEP8e237ygo1z6QqGLEkjmdJ4B5uAeEKnTJ24wZdDeN4X5evfr3+8DYF93FshPL7k1zOq7E8nIjWlPIMvsi9p6b6MjD7+MlS+pyYy96VCuUoazEsuIgjq3B5j29gPb+EvvDddTf/Qgz1w/TXkDDa5XEHP7KEqxoiPc8n5dQzP8HIl1CUz7x57y+559HCVX48BeyTOUtTeZ2HkcJ/1Gcm8Ae5wgMpiEy5kpee+cbOVKNohwjUPIyKHM6Tidf7gehxjnqwESityDlbue+1RucaUYReUegpGVQ2jq+Akbi4ZyEIv4XijYfM0qovLTIm2DEM0tmzz+D/MTDqCHXUnoznXvmtTxzZiJvS0YT5B2BERFraI/6SY4ZlYCibyH39dSl2CbvqNRpgqKJFXB98rMczITRCV1gOL067fNe26yiiBWcowx7Th9Xe2zYcpazuG/Nsyp+FFjSCBTMYFjJhD3wOghlbB5GCVUSMfJlLphYZERIbskEGAgsfaMzKt94l4QvaBkMhLL+M6hJ5/w87hplJkqiQ0GZ884sq+aw0nMHoYhuHiVUQWNdcqK8xBrSRznUHDjw4hxVcitGCyhoBHIug1bDOzj4AkqCBjUrGBGSkUz03vlqFmb0tUIj4JxZlvsbjN+BesOEMo0xsr5RQlWILHqxOsNg0hrjFpIT1GyQno/K+tSRKRpoxXaSmIGzK86o0btymXSry6A1FxuI/VZVyZuDb2TMlFE1R9F0CWWAIPzrOA79QwrBPECR6HG8duVvUrC0iL4M7tjTrhLKZBS6ZpRQaSM4wigmxFhkXZKRXaSFEvFbM2BpLyFiWUtZoqvS0gxHmV+gKa13DgPKGzPmYdI27/NDHSlv4UWWZvZsIwfF13+k3b+LzJ83eSx2MGbVmFA6kWkyu/NTITgAIWJZk2aXpazQkkoZtUhb5xX0Qfw1zNz/oB173pC2+ZjdtQnS1nU47ByfwzLyGwzoZmrrfMbKRcvZnO7ul6GUfU0t0pe/0+BhYhnbcz28aIxbdFRpUJk1/0sk/lKUYvyqzFI7jiTRg6+6w75X8Z/MWQjPlcRGEOkLw9XKScSx7w6/lx4LbE94hV6SzNE+jgxiQaz0OYxU4CSQXUokcmPFjFs8OTW7OrwzBmwluKVzFVxFQNJ28f7kxx5HvX8cqkDotBCsVMDYKI5GrPmDNRMPXpRdfAaxYJQ5NzvB0PtmOuLj9ztwpYN9ed1RSIR8fz2UnVMd+LKBZe4VsCH5AEY/8lm9UGcb9eQFQHnlytehqejXk/qLrL9aGjJFLItgaUvDDUdhKVupvcpWsv/YXnxh24crTI9JE8X9h7CPHJsOLWccfW+kxJs/wPJ7vLNcZmO0Wv4QbdCXV+NIuGXrX6ZXmCKW9ThMOrKlp8ACbkyaM0HlfbP27NEIDEP5HUfJ44nij7m4JEeegsAglEebtvaBUO5ljvkG7u+BKXj5A/eufBH93qiWLN7Z6fBhYhnXUC3ASaAatue8dtV/U5SnY6faqTUDg3kglsQnpKOjVcWPFLh5613Iep4zO/NyEOpbTnw5EK6lUMRBLOPDqwcsUdUJvLYb7HLkHNRm/LC0cCjF5ElZsOAjGrJYmMzu+A4+ggXOfIwVpa/beMBUNoxteAQ+Y364EmmVOfNTDJ+dWdYIRne2jhu3m3AhlYNw/+ofo3SzdybUWswZcGf8ccywiSq+QCD6fBWMU690J+dHaXLrvIpxwGkVW0aDBB+qEnw/NbuSy+BUJRlA/O+18I/i9WsewHJ4od4mA8XxIkaPjFTSASnJQpRxs7N8pp/SH+1/PpiquDNN2RHsmhQzklUFxDL3TGjB46c0cDVg3L9mFfy13F++wItyIPaAFToX0SAsKzPxEeJ84wy/JN5vBt966y5nikogIlFjMKuFYyy3CkxALHshiJLOuIbWMHB/9y1Yy29yN0FOpx2xtZajcydKYQK7fH8dzlJBv1OYVGQzjfGmcd+y91OQKkUCSTv/IVSdSAO99MpRBu4FYg315paY8eENZa4yAJzYNSCYW3gscgFt2QZ/5dzBGv349AAI1aCnxDmvoelU7u5+U8dXAcr0X2otvn+0gXvBXUhqki1FOFurBZQNOLn1EhDMfc7x5UJwds49yJon+GKkE0YtEQ7GRIHoNO5d8UoYWUUIE85cShC2HCGWA1xYpQVzfUGdBCs9Gd/YDqZjg7NJvlwFDi+0x8mcriNwKcoTIJTOPTKZJe90mHv/j7PsaiFE9JlFMjSzzO1iWjD3TNRR4BUrBml803mYYc+6myXfkVmdqXOTtF90KCUST4Lz089lzLtxj8bZYGaed5dZRQyzPrOIhohlr4FTGmQuBKmzAIJ9QOMbz8Rq4PgC0WCWuyCWOk/aLzmQ4rufAKFaHd2I40A8k9d3P+PAVx88rtHMbuV8KR8BExXFMohbV7TA8r8auNYwEOw9Ghedhhm2RW2L4fR8v4/iO+DpIqrGFfkENwR01puni109CNfqaWH79v08e7GihiSv6uyr2gwFGJz4I0YH9qqCNqBGkOOTDhzYKr6M+7rXOfG1RDCsnLSwSyZ62LRbNBzcTwdUeJ0ArclWtOFUtP/tIpt0Hff1LCsyT/WSC+6h0kKUJ2BmOYhlLq2q82APksxnYEksrK3M34Mo6/r67pZjGfQTIJZrZkn9E8sMOmbJL7Cu/Q2iueV4TPdBgn55fRPKdIj0meXbmSVRtQOtrbk7r2aqFdDetqb3I9kkoaNo9iL9rJVMUx9Ph3pIGs3M0peQza/re1l9dCjVChyEF8Ey6oYUwB3BFXW7HgtsLdyJao5xbUse2btgdWJFE3VPLIiYoPeS2woeYJEvUvytH+LM0lhwnmondG1LCW+HYTB0YjFMees4yJx5Z0J5uAZNVO313U2H2dvmbf1DlsfuZLXCCMHeRAkRO7N4h4Ii8uN6JjVxdYFQdZyEc/59qFXfp5iNtWu3s1UiX6YHHzO2F/UXXDMLRynsWQ6+3ueP1l9PsOiZa8V9eQRta1bbx/QG4KdSX08XWPo+NY0BinRBY7zUia8BwtrUixyiVh1tfs9I3XWxku/rAl61pOoApf2rk3H/OyxmaT+9RnNG4WnQgW2xthOTWzswwwxh9SB0BeSIV+vIGkDnXXgYag1/hNAMcO/ytw036BLYusU1NeiHdHYeRvGYkaAf5KgeanjvLBDqP5N4a0PRyOdjhrmFtb5/ExiVi5J5avr0Y44JEqirDLF0PQ6TI2P1u2O12XsEOinHhSnMg+RFvszrV/8su3VWgcotZ4NgL2TjUu9Cy+0NbylAjSJ51FUgVtQxs6QuiCWzF+8H2/0fYY/RZ3pgb5fzLkNrU9HEp4Ngel8Dm4xe6zJaIzrZalmsrUWoCRyoqzz6k4+9jHV+TyiB0P4y76ufDsGrCIBt4BiSAXOf4efd1fKlWPruceMDjLWtaGJI6h029cY2Q/z7Zfa8E/OVVTG8T3rdQ6ufZ1XmLJCvKWEwfooCrQrIKNtgG3gvZlSGcX5G5czXwALqjgxYjhcQbDtFPEOwN9VkxkbD50fTrWDVdBUADhkuWY1wqPhGes7AwA0imF8k0IL4UzVwpWGWhd20tRuEmuGuy/snzKgcZmp6Tl63ehNFzJJobS+URDIB9/0+btxTFWTlQN7gySg8fMBnesl+ZEAGxPId9oFMJ+MLD9JUrpnhkts6vwfgnDAiCeHVUMdfkXwr9snrusFsRGdgD9ut57U2G09aGw49Qfmhrokhw4a2ASEmjf831A7WNytg34KP0PFZ0Iq+4oteAvZ8sbMS5h/QudMXOvEFIqC8/CmIdT6S69oFkcNpcBcIBluOCofgMAy9nBZ4eCJZYtlfYWN2GHSyyxtSK7okGAh1GZa+65yFMP0YzgKzynXnLlT78N6gDtQnjjqPovjODfayMUeCsoBnLzgJTWhVyxobfSoJT1vi+MEkMOMpMlMWL27KgFXgxXrni9zqLpqfo8hB54Ahcuh73DlzYWCG1ofNwD2TjSP47sRDlR2DuD4hmP41sDcJejBMLGm4B8vCYKhjZil86/2zQvAyAqwhpvgrUGR4gw3q+TWNjUzntbfsLGO1qaJwqeVy9P1bKUB2ROgU/LSgG5+dvoj34Hhil+NwLubedGCKWLx+xVtAPJaOHI5z53C8ArFE4jwsA/rsZdpKzZHTeNWqdypQc6pIcJZQYPJ3U4BQRHIwPKHEhQMG6W/R9wlKhhhJ8/fT4SliWaDI2nTkcFymy9yuzwy/lznmia+XCK8K4yxQrZ9o6u/+Ggi2Rm2LaJ6JasrigD79vZqB+RHuv+PddFwmsSbtZzbcjARDiZni8W+kZyxr3Gu4D8tQphLUtMODs8CaFb8ta105CrOS+nOnG9VKeP9mXpUj64hQkPhje3HcO0KZS6CpIINYwW/zOh3NZlbqoAiTsq2wOTdWts/iY3kbz8chmD2e+3p+NaJRKCGT5TTHN86Exe6NaMsr+NsKocG1dM4ZN5dQrJ5V5BoVgYMw6gupdkIbuhV7cOxlsNBh9xjmHqztld2/1NZ/+IDQdp+KS2KeUHvGtMB6fmYhM2aWwQWMhtyVlS752l7Jy0OSlXzYn1bumXAdUyBoHt/Uq41BiFg20ZjILSCbIok37p3x22sigtJav7fCNm0zxqa6RsOjpYGDQrhzKrEs98W0MpwcEKOu2LStPjSragPrGyizF3wMdi8OKQ3/ng7eXx93dEslVtDd5muxuZqzVzgw3QgRzEfDiFFI3hGQ+DJ88OPUdB5/LdctAU5iWR5fPP0MYFw+d/v1a3unjkTtgbgA82IwbueoLYHcE7LKjENwdjonsWzC/tU9lp3OzmXejVLwwUeXaKhRWHgEcOw5BmPmkn3GKNp4SThXJiQnsewhMRpdhCy6GoH4GxDA/nVmkaNv2SMwJLW/F1+4LlLzvKXce/fm7HzZ7zmJZRLbK9Y8TxdiGkMTwXJYba1qdi/q+N2aae+G26yIrnlmeh4/qH19IV0IHYq1TFY5NrtzAyqcpuHtKd9rOpHXrXhNxe/DQHzIKzFuXeoQGNOChqbPFSpSyzuzTCV2OWwySkiwlloQ+gQl9vwI9yhp0mMtxz4Bk1nzbnISyo4ALyiUUCZ5QcQyCa0pF0dmIZow70o4Gld8PyyLFo1XcPscyF59TnS1s+Me3w7R3X1OvIIomFgmr7VbIM/NtZgLu97d+RRMnV0mzkoTPnygYEbZq8/1zhnzhCNbjRSjqFDQnpVdIhpjGI5vZ8NT7+aOikaoN3p6tqVg+0DEMhPGlci1R5kxMAzFxHEnj+QexxERy9QJY/7lcL0xbL0egl8DmFE3V+3orSwb1LLnAdfntnU0H3ETn2i3lBHUXNQymFH+ka3GyARnB0cw17gK/Rxr96WOFB8asD3w7vbxk8C5jFLBnJnVpoQr8kY8s8xI22n/w8dWIDY/58gzP4A7l7rsVT45E+59yCEREiQTjgOv6VKZtoWSiJUcWruh5uJ8bIOhcSXvYtimP57Mtzc/rfTcCmUdsr5k58we1eSdUcqMGi4qGSvxiaXAGGga2Ve+D+B+8hou576Vvyuxyppkt4pDq48Sw2TlPqYYrm/iuHNHwkxoncs3sFoeJ8z+yIvvd2NJyHc43oET3g108AHLcqkEnBXVCDGkijcf5KfzNgHnKMOel9MotazEMh2QuQsgzYh/H7PsC3k7ZJy1hW+lZm85FJ6Z1k15M1cvgbVCMsYt5h6NfMF6p0AyUeSBN1+xBl92YplCsVQ04q4J/BqBXGbe8wZjdsbeMvxawt31sjxaS1ljgGnt+lzmYlk9M/tTQ9MFxYiQskrI+VoRYiVrtBeLJPg2kK81Ccv5DFxOnwL3tJYmND9QrrU+Z51pSCuwntv5JZwf2zHj4WGSdzlP5o7BdG2pkZ6Xc9lLFp58VpRYphK5/PJmev3db2KWGX+qxmTFeZ/2B2RgP8iyEQzJxuDe87y5ik5gTe+MI5vxjxLjdlPgh5WsyTARUBwWoo9KZhnps+LESjYMrp9TyE/choPyCJWVMKVmehrl/QqE30RROK5PHLslMExN1uJ+2llj7pkw1xcYr3jjbG19eO3NziMYBxxyjc1EHlW8u0XFY0bQyOIrSc8BzfIp+Iq/iS94ajp8RHG7bArUNvw+PoIBEGAgeDI022LY6hZ7ray5Yie4uaV5RPVkZIJdH8zFjBVStTnZqhMr2W/IFr+IAQSHRWclYXX9NCbN4v0jtTSscdn1Vbr9NSNWsmPWOyXudxD7bSDcIUl4nTxjYHZgcw4nAdiel8vjcqR9qzmxkg0P1AsbsJ+BEyM6B7NubBJX9Sc8DkGkXuMfle12U/W2pFVYN8RKaxPcv+EW+/bOE3CP3imAm73tWBCvIT1NWeN2iYNXvHG2hg9vumtoWespsbC6JFZ2n+xVqYl3jodFwafwxU/BcjkFM9A8D0XawvsQSBc2gfCbcAjHH+6twoUgELJuz66zHt8L72gdtt7+Mt1umkSJwfHg0FoowS0gADg/Pwpi7ABrPkC4AdM+cV+fuQauDrtRcJP+H10PIvmZBzmRAAAAAElFTkSuQmCC) no-repeat;
        background-size: 100%;
    }
    
    .ay_dialog_bd {
        font-family: STHeitiSC-Light;
        font-size: 17px;
        color: #333333;
        letter-spacing: 0.72px;
        line-height: 20px;
    }
    
    .ay_dialog_ft:after {
        display: none;
    }
    
    .ay_dialog_ft {
        display: block;
        height: 40px;
        line-height: 40px;
    }
    
    .ay_btn_dialog {
        display: block;
        width: 50%;
        margin: 0 auto;
        background: #FFFFFF;
        border: 1px solid #DFDFDF;
        border-radius: 15px;
        font-family: STHeitiSC-Medium;
        font-size: 14px;
        letter-spacing: 0.59px;
    }
    
    .ay_btn_dialog.primary {
        color: #999999;
    }
    
    .travel-person .fix-textarea {
        position: absolute;
        top: 0;
        left: 70px;
        overflow: hidden;
    }
    
    .travel-person .fix-textarea.ay_cell:before {
        display: none;
    }
    
    .travel-person .fix-textarea .ay_textarea {
        width: 90%;
        border: 0;
        overflow: hidden;
        background: transparent;
    }
    
    .pswp {
        z-index: 9999;
    }
    
    .pswp__counter {
        left: 50%;
        margin-left: -23px;
    }
    
    .pswp__button--close,
    .pswp__button--fs,
    .pswp__button--zoom {
        display: none !important;
    }
</style>

<style lang="less" scoped>
    @import '../../styles/index.less';
    @import '../../styles/ayui/base/reset.less';
    @import '../../styles/ayui/base/fn.less';
    /*最外层包裹*/
    
    .travel-person {
        background: #fff;
        padding: 0 20px;
        margin-bottom: 10px;
        .title {
            position: relative;
            font-family: STHeitiSC-Medium;
            font-size: 17px;
            color: #333333;
            letter-spacing: 0px;
            height: 60px;
            line-height: 60px;
            b {
                color: #FF1717;
            }
            em {
                font-family: STHeitiSC-Light;
                font-size: 12px;
                margin-left: 10px;
                color: #999999;
                letter-spacing: 0px;
                &.fix-em {
                    display: block;
                    position: absolute;
                    top: 2px;
                    left: 83px;
                    width: 73% !important;
                    height: 60px;
                    overflow: hidden;
                    margin-left: 0px;
                    .ellipsis();
                }
            }
        }
        .radio-list {
            .clearfix;
            li {
                position: relative;
                float: left;
                height: 40px;
                line-height: 40px;
                font-family: STHeitiSC-Light;
                font-size: 14px;
                color: #333333;
                text-indent: 22px;
                margin-right: 20px;
                &:after {
                    content: "";
                    position: absolute;
                    top: 11px;
                    left: 0;
                    width: 16px;
                    height: 16px;
                    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAAXNSR0IArs4c6QAAAwpJREFUWAnNmGFqGkEUx2dWiaKIIVQQRSp4gtJDtA29QHqNlnwpzYeGfintNZILFNMeouQEgZSgBFIkEgwaErf/32THrqYmNnW3eTA6u755//+892bmjdb8hRwfHxeHw+EzDVlXa4VhWLPW1jChflf9rroHau18Pv+tWq0O+G0RsYsoHR4ePpHeO7UXAswvMkakhtLbU9tuNpv7d425lUi32318cXHxQUZeiYBs2zCXy9lCoWBWVlZMNps1mUzGYVxdXZnLy0sjfXN+fm5Go5GGXI+Rwo7039ZqtR/zCM0lIi8w+10NLAdBEJZKJVsul43682xNvR+Px6bf75uzs7NQfXD6msiGvIOXbsgfiYjEa2l+FJGgWCyatbW1ycxvWLjjBZ7q9XpmMBgYERlLfVNkPs8Ou0EEEiLwiTCsrq46L8wOus8z3jk9PZVpF643s2SmiBAOgXxRs5VKxeXCfUDnjSF3Tk5OQv1OexkP0yTgJKbY7qoFeIKEXLZgE9tggAWmx5gQiVZHmZwgKZMSbIMhKUeYDsqFRiFhn/iuvDD1et36Jek0EvgggTudjpxChMxThWjfe2RLLy1LNGkSIIMBFph6ZKM0Ntq2f6qfazQadtF9gsH/IuwzR0dHuGSk4+BRwNkhZnl2zLRIMAGwwAQbDoSGA8wksUqwe5vEMNch0kKZsyNtiWG2WM/uGOcAS1s8JhwCLVlHJI3VMjtRjwkHv3xndVJ/JjRUVYZNJm3xmHAgNI4IRU3a4jHhQGioMV1llTYRqrlIDiDS5oEjOm2JYbYDqm25ZkiNybabloAFJthwCKKS/6sSxlJFpSVggSm8PTj45ftezEIKXZ/JSRICAywwhbMNliNCPaD+DtU2hW7SAgZYYEbY10QA5t6hrz7VdpIhwjYYYEWY9H8T4fIjV22ojam2YxntFJfxgU1sgwFW/MLlc8ThyE1cfjZJIqrtZXoGW9iMEpS7zdRFy9Wss7N9EBcsT4o7jtj/3yunJ/MgLuGeDN/RdWNL3efyUvp/S8TJ0E/yj5pfehrdBCBjUlsAAAAASUVORK5CYII=) no-repeat;
                    background-size: 100%;
                }
                &.select:after {
                    content: "";
                    position: absolute;
                    top: 11px;
                    left: 0;
                    width: 16px;
                    height: 16px;
                    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAA5tJREFUWAnFV1uITWEU/ta/57g3Mi4JD66JNAlTEnJ5cWmUotySPCDhQZISBgmJlDy4ldvUlJBbXjCeNKU8mCgZ86ShQTK5z5x/Weufs09nz76c4ziTXef8e6/1rfWt/a//X//ahAIvrlneA28+zrXWLmHQRGIeBpD89OIWJmoh8EtjzG2MGVRPNdd+d+qS/ylZLa7XzRlqf9NekF3NjPJ8eNUToQ1sak0PPkAXH79PsokNgLcu7Gk//dwN4u3M3DfJSZyOiL6B6YQZ2OsQnbr/KwoXGYC+dbodN8E8Pcror2VEDV4KS6NmIxQAr51fadPpe/LWI/6aKMFAZuOtQdkiqn3QmAsLBODy3Y6npSb3CV0QKVTlzoTxlZpznfbuIlce9e04hMvnzQbgFlypcu57jxqFw3FldC4AnXpd7VH4YmW0YiPMyTqgfEDYhe4s5ZTLBaD7XKanqK0W9i51YPo8mOqVQP8IcjFQLldb5J60wtnXrR8KLTJRhAHZkGEwh86B+vSFvXAc/OhOQO0/aLEy44YMNlpeS0bulcFs29dJ3lAfS65BOE7hNlrb/aj+daRVm0CjxoNbW8Dnj+V1p9xGD5a8yEIAU2bALFgG7uiAPbUf+PE9r5Vym85TLS82GVAxGGbjLofhujNA86tkfEar3LIL/CO1IJswiAzMlj2gfuXgZ0/A96+FMbES0gASruEjgRGjEgAS/vL1oPGV4E+tsGeOJGJDSpkCCYBbQoqMwOw65rYUps2MhkyaCqpeBbZp2NMHga9t0bg4KeOd0U4mVl9/F1QmW2trDUJBSIUzm6VdMAZ8/RLwKnDIxbkMyJXbaBsVkOY88I1LsLdrw0FIFXHk/SvAL56Bb13JsSr8Vrm9/ZNHp6U0rok1EwKkUjATJoOqZoPfNoOmzYKZVw3+8hn28A7g549Y8ySF55k9BZdiWrFB6rvku6NdThDdPAb26E6g8WkSR6wuW4pd9yoNZCwyo+C6s7C3rko6UsLtgSU1xZI7l8Kp3K4jynRCTQWdiGOlcHpeUYvOf0ltVk0KY7UzcnXAtUjSvfqAxLFJ1mwRKz7gU7j8tixbiLR1loa+IQDsjgfhcFwZ3y4FPs9/bUo1CJcTz1us3asfVKnGbFve5UspmwKfiC4/fC4LpKqk6dBp13a8yzeBcoYCUKHOhFfRe47Uu4O6YlVWzKW26sP56vLmvr/AGvCFuaNbF//j4zQ3CL3vrs/zPwyViQDyyheMAAAAAElFTkSuQmCC) no-repeat;
                    background-size: 100%;
                }
            }
        }
        .travel-cell {
            .cell {
                min-height: 40px;
                line-height: 38px;
                .left {
                    float: left;
                    width: 25%;
                    font-family: STHeitiSC-Medium;
                    font-size: 14px;
                    color: #333333;
                }
                .right {
                    float: left;
                    width: 75%;
                }
                span {
                    display: inline-block;
                    padding: 7px 15px;
                    border: 1px solid #d8d8d8;
                    border-radius: 20px;
                    font-family: STHeitiSC-Light;
                    font-size: 14px;
                    line-height: 14px;
                    color: #999999;
                    margin: 0 4px 0 0;
                }
                span.active {
                    background: #FFF5F2;
                    border: 1px solid #FC9153;
                    color: #FC9153;
                }
            }
            .divhillden {
                display: none;
            }
        }
        .travel-text {
            padding: 10px 20px 10px 0;
        }
    }
    
    .show-img {
        padding-bottom: 15px;
        .clearfix();
        .img-item {
            float: left;
            display: block;
            width: 75px;
            height: 75px;
            margin-bottom: 12px;
            margin-right: 6px;
            .img-info {
                top: 0;
                left: 0;
                font-family: STHeitiSC-Light;
                font-size: 12px;
                color: #999999;
                letter-spacing: 0.5px;
                text-align: center;
            }
            input {
                display: block;
                width: 75px;
                height: 75px;
                color: transparent;
                opacity: 0;
                filter: alpha(opacity=0);
            }
            img {
                width: 100%;
                height: 98%;
                border-radius: 10px;
            }
            &:nth-child(4n) {
                margin-right: 0;
            }
            &:last-child {
                background: url(data:image/png;base64,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 M /qmlrjhAtmV4LUcdjjYYhz6Eaejx9fHVOTlj0S0HQIxfIMLbqCvgcCORuxIzmxqfbVt5gayxaNGPDGS1uYjYbxTt5medtOs13i88rLy4+jEnotyhgfSoA+1N1eepUswrAvpZd8O6vvhQG2FEprApUY1KixnKVUVlY2LSkpOeKVdIZJFbzCSWsxz8mZ0aFDh6vd8WhB3R/1J3c8FTf0CCVT8mHX/HFAc7u7XxgGz+FF3lX25qc7PVo4vEEaLdEdFw1UoqFCDdh91Z0LxdgixRnjOwns4M9uvQzsrjlTn3fccTWF/x8QAiKXUfwIxAAAAABJRU5ErkJggg==) no-repeat;
                background-size: 100%;
            }
        }
    }
    
    .travel-wrap {
        position: absolute;
        top: 44px;
        left: 0;
        width: 100%;
        bottom: 60px;
        overflow: auto;
    }
    
    .travel-tabbar {
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 60px;
        line-height: 60px;
        background: #fff;
        padding: 0 20px;
        .clearfix;
        .left {
            font-family: STHeitiSC-Light;
            font-size: 14px;
            color: #333333;
            letter-spacing: 0px;
            float: left;
            width: 30%;
            text-indent: 22px;
            position: relative;
            &:after {
                content: "";
                position: absolute;
                top: 21px;
                left: 0;
                width: 16px;
                height: 16px;
                background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAAXNSR0IArs4c6QAAAwpJREFUWAnNmGFqGkEUx2dWiaKIIVQQRSp4gtJDtA29QHqNlnwpzYeGfintNZILFNMeouQEgZSgBFIkEgwaErf/32THrqYmNnW3eTA6u755//+892bmjdb8hRwfHxeHw+EzDVlXa4VhWLPW1jChflf9rroHau18Pv+tWq0O+G0RsYsoHR4ePpHeO7UXAswvMkakhtLbU9tuNpv7d425lUi32318cXHxQUZeiYBs2zCXy9lCoWBWVlZMNps1mUzGYVxdXZnLy0sjfXN+fm5Go5GGXI+Rwo7039ZqtR/zCM0lIi8w+10NLAdBEJZKJVsul43682xNvR+Px6bf75uzs7NQfXD6msiGvIOXbsgfiYjEa2l+FJGgWCyatbW1ycxvWLjjBZ7q9XpmMBgYERlLfVNkPs8Ou0EEEiLwiTCsrq46L8wOus8z3jk9PZVpF643s2SmiBAOgXxRs5VKxeXCfUDnjSF3Tk5OQv1OexkP0yTgJKbY7qoFeIKEXLZgE9tggAWmx5gQiVZHmZwgKZMSbIMhKUeYDsqFRiFhn/iuvDD1et36Jek0EvgggTudjpxChMxThWjfe2RLLy1LNGkSIIMBFph6ZKM0Ntq2f6qfazQadtF9gsH/IuwzR0dHuGSk4+BRwNkhZnl2zLRIMAGwwAQbDoSGA8wksUqwe5vEMNch0kKZsyNtiWG2WM/uGOcAS1s8JhwCLVlHJI3VMjtRjwkHv3xndVJ/JjRUVYZNJm3xmHAgNI4IRU3a4jHhQGioMV1llTYRqrlIDiDS5oEjOm2JYbYDqm25ZkiNybabloAFJthwCKKS/6sSxlJFpSVggSm8PTj45ftezEIKXZ/JSRICAywwhbMNliNCPaD+DtU2hW7SAgZYYEbY10QA5t6hrz7VdpIhwjYYYEWY9H8T4fIjV22ojam2YxntFJfxgU1sgwFW/MLlc8ThyE1cfjZJIqrtZXoGW9iMEpS7zdRFy9Wss7N9EBcsT4o7jtj/3yunJ/MgLuGeDN/RdWNL3efyUvp/S8TJ0E/yj5pfehrdBCBjUlsAAAAASUVORK5CYII=) no-repeat;
                background-size: 100%;
            }
            &.select:after {
                content: "";
                position: absolute;
                top: 21px;
                left: 0;
                width: 16px;
                height: 16px;
                background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAA5tJREFUWAnFV1uITWEU/ta/57g3Mi4JD66JNAlTEnJ5cWmUotySPCDhQZISBgmJlDy4ldvUlJBbXjCeNKU8mCgZ86ShQTK5z5x/Weufs09nz76c4ziTXef8e6/1rfWt/a//X//ahAIvrlneA28+zrXWLmHQRGIeBpD89OIWJmoh8EtjzG2MGVRPNdd+d+qS/ylZLa7XzRlqf9NekF3NjPJ8eNUToQ1sak0PPkAXH79PsokNgLcu7Gk//dwN4u3M3DfJSZyOiL6B6YQZ2OsQnbr/KwoXGYC+dbodN8E8Pcror2VEDV4KS6NmIxQAr51fadPpe/LWI/6aKMFAZuOtQdkiqn3QmAsLBODy3Y6npSb3CV0QKVTlzoTxlZpznfbuIlce9e04hMvnzQbgFlypcu57jxqFw3FldC4AnXpd7VH4YmW0YiPMyTqgfEDYhe4s5ZTLBaD7XKanqK0W9i51YPo8mOqVQP8IcjFQLldb5J60wtnXrR8KLTJRhAHZkGEwh86B+vSFvXAc/OhOQO0/aLEy44YMNlpeS0bulcFs29dJ3lAfS65BOE7hNlrb/aj+daRVm0CjxoNbW8Dnj+V1p9xGD5a8yEIAU2bALFgG7uiAPbUf+PE9r5Vym85TLS82GVAxGGbjLofhujNA86tkfEar3LIL/CO1IJswiAzMlj2gfuXgZ0/A96+FMbES0gASruEjgRGjEgAS/vL1oPGV4E+tsGeOJGJDSpkCCYBbQoqMwOw65rYUps2MhkyaCqpeBbZp2NMHga9t0bg4KeOd0U4mVl9/F1QmW2trDUJBSIUzm6VdMAZ8/RLwKnDIxbkMyJXbaBsVkOY88I1LsLdrw0FIFXHk/SvAL56Bb13JsSr8Vrm9/ZNHp6U0rok1EwKkUjATJoOqZoPfNoOmzYKZVw3+8hn28A7g549Y8ySF55k9BZdiWrFB6rvku6NdThDdPAb26E6g8WkSR6wuW4pd9yoNZCwyo+C6s7C3rko6UsLtgSU1xZI7l8Kp3K4jynRCTQWdiGOlcHpeUYvOf0ltVk0KY7UzcnXAtUjSvfqAxLFJ1mwRKz7gU7j8tixbiLR1loa+IQDsjgfhcFwZ3y4FPs9/bUo1CJcTz1us3asfVKnGbFve5UspmwKfiC4/fC4LpKqk6dBp13a8yzeBcoYCUKHOhFfRe47Uu4O6YlVWzKW26sP56vLmvr/AGvCFuaNbF//j4zQ3CL3vrs/zPwyViQDyyheMAAAAAElFTkSuQmCC) no-repeat;
                background-size: 100%;
            }
        }
        .right {
            font-family: STHeitiSC-Medium;
            font-size: 16px;
            height: 45px;
            text-align: center;
            line-height: 45px;
            color: #FFFFFF;
            letter-spacing: 0.67px;
            float: right;
            width: 150px;
            background: #FF5647;
            border-radius: 20px;
            margin-top: 7.5px;
        }
        &:after {
            .setTopLine(#e5e5e5);
        }
    }
    
    .cell-content {
        position: relative;
        height: 38px;
        font-family: STHeitiSC-Light;
        font-size: 14px;
        color: #333333;
        line-height: 21px;
        background: #F3F4F4;
        border-radius: 10px;
        padding: 11px 8px 11px 80px;
        margin-bottom: 15px;
        em {
            position: absolute;
            top: 0;
            left: 0;
            width: 70px;
            height: 60px;
            font-family: STHeitiSC-Light;
            font-size: 14px;
            color: #0BA633;
            line-height: 60px;
            background: #E1F9E5;
            border-radius: 10px 0 0 10px;
            text-align: center;
        }
        &:last-child em {
            background: #FFF1F1;
            font-family: STHeitiSC-Light;
            color: #FC5A3F;
        }
    }
    
    .travel-cell.fix-travel {
        padding-bottom: 5px;
    }
</style>