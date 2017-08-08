<template>
  <div class="page">
    <view-box>
      <div class="ay-header-box whitetheme" slot="header">
        <div class="header-cover" :style="{opacity:isOpacity}"></div>
        <headerbar>
          <span slot="left" class="icons icon-arrow" @click="back()"></span>
          <div class="departciry">
            <span class="citys" @click="" :style="{opacity:isOpacity}">活动</span>
          </div>
        </headerbar>
      </div>
      <div class="page-inner" style="margin-top: 44px; ">
        <div class="ay-containner">
          <div class="active-banner">
            <img :src="ActiveInfor.activityaid_url">
          </div>
          <section class="ay-section">
            <h3 class="active-title">{{ActiveInfor.subject}}</h3>
            <p class="sub-infor">
              <span class="sub-type">{{ActiveInfor.zclass}}</span>
              <span class="sub-titme">{{ActiveInfor.activitybegin}}</span>
            </p>
            <ul class="active-detail">
              <li>
                <label>活动地区：</label>{{ActiveInfor.citys}}
              </li>
              <li>
                <label>开始时间：</label>{{ActiveInfor.starttime}}
              </li>
              <li>
                <label>结束时间：</label>{{ActiveInfor.endtime}}
              </li>
              <li>
                <label>参加费用：</label>{{ActiveInfor.use_cost_str}}
              </li>
              <li>
                <label>报名截止：</label>{{ActiveInfor.activityexpiration}}
              </li>
            </ul>
            <div class="summery">
              <div v-for="paraItem in ActiveInfor.content" :class="{'parag':paraItem.type ==0,'imgbox':paraItem.type ==1}">
                <p v-if="paraItem.type ==0" v-html="paraItem.infor | enter"></p>
                <img v-if="paraItem.type ==1" :src="paraItem.infor+'?imageView2/1/w/335/h/230'">
              </div>
            </div>
            <div class="block align-right">
              <span v-if="ActiveInfor.hits<=100000"><i class="icon-see"></i><em>{{ActiveInfor.hits}}</em>
              </span>
              <span v-if="ActiveInfor.hits>100000">
                <i class="icon-see"></i>
                <em>10w+</em>
              </span>
            </div>
            <div class="active-form" v-if="!RequestSucess">
              <form v-if="showForm">
                <cell title="报名信息"></cell>
                <group>
                  <x-input class="form-block req" title="姓名" name="frm_username" placeholder="您的姓名" :show-clear="false" is-type="china-name"></x-input>
                  <x-input class="form-block req" title="手机" name="frm_mobile" placeholder="报名人的手机号" :show-clear="false" keyboard="number"
                    is-type="china-mobile"></x-input>
                    <x-number class="number req" name="frm_number" :min="0" title="人数" :max="10" :readonly="true"></x-number>
                    <x-input class="form-block " title="留言" name="frm_msg" placeholder="" :show-clear="false"></x-input>
                </group>
              </form>
              <div class="submit-btn-box" v-if="!showForm">
                <a class="submit-btn" @click="BaoMingFun">立即报名</a>
              </div>
              <div class="submit-btn-box" v-if="showForm">
                <a class="submit-btn" @click="SubmitFun">立即报名</a>
              </div>
            </div>
          </section>
          <section class="ay-section">
            <div class="message" v-for="messItem in Message">
              <div class="note-writer">
                <div class="rector">
                  <span class="referee-img">
                    <img :src="messItem.icon+'?imageView2/1/w/30/h/30'">
                            </span>
                  <span class="referee-label">
                    <p class="name">{{messItem.reply_name}}</p>
                    <p>
                      {{messItem.Adress}} <span>{{messItem.Time}}</span>
                  </p>
                  </span>
                </div>
              </div>
              <div class="padl40">
                <div v-for="messItem in messItem.reply_content" :class="{'parag':messItem.type ==0,'imgbox':messItem.type ==1}">
                  <p v-if="messItem.type ==0" v-html="messItem.infor"></p>
                  <img v-if="messItem.type ==1" :src="messItem.infor+'?imageView2/1/w/335/h/230'">
                </div>
              </div>
            </div>
          </section>
          <div style="height:50px"></div>
</div>
</div>
<tabbar slot="bottom">
  <div class="commentsbox" :class="{'active':showSendBtn}">

    <div class="formbox">
      <a @click="">
        <i class="icon-write"></i>
        <span class="closebtn" @click="clearInput">
                <i class="icon-close-small" v-if='showCloseBtn' ></i>
              </span> {{key}}
                <textarea rows="1"  placeholder="用评论增添一笔精彩" type="text" v-on:focus="checkLogin()" v-on:blur="outInput()" v-on:keydown="submitComment()"
                    v-model="commentStr" > </textarea>

      </a>
      <div class="rightbar" v-if='!showSendBtn'>
        <span class="btn" :class="{'active':isPulse}" @click="pulseFun">
                <i class="icon-zan animated" :class="{'bounceIn':isPulse}"></i>
                <em>{{ActiveInfor.recommendAdd}}</em>
              </span>
        <span class="btn ml20" @click="share()" v-if="showShare">
                <i class="icon-share"></i>
                <em></em>
              </span>
      </div>
      <div class="btnbox" v-if='showSendBtn'>
        <span class="sendbtn" @click="submitMassage()">发送</span>
      </div>
    </div>
  </div>
</tabbar>
</view-box>
<toast class="tips" :show.sync="showTip" type="text" width="100%">{{massage}}</toast>
<alert class="successdialog" :show.sync="showToast" title=" " @on-hide="alerthide" button-text="确认">成功提交，请耐心等待审核</alert>
</div>
</template>
<style lang="less">
  .ay-section {
  background: #fff;
  padding: 0 20px;
  margin-bottom: 10px;
  }

  .ay-section:last-child {
  margin-bottom: 0;
  }

  .active-banner {
  img {
  width: 100%;
  height: 155px;
  display: block;
  }
  }

  .active-title {
  padding: 20px 0px 0;
  margin-bottom: 10px;
  line-height: 1.2;
  font-size: 19px;
  font-weight: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  }

  .active-detail {
  margin: 30px 0;
  padding: 7px 15px;
  border: 1px solid #DFDFDF;
  li {
  line-height: 27px;
  font-size: 14px;
  }
  }

  .sub-infor {
  line-height: 1.1;
  .sub-type {
  color: #41B3EE;
  font-size: 12px;
  margin-right: 15px;
  }
  .sub-titme {
  color: #999999;
  font-size: 12px;
  }
  }

  .active-form {
  .req:after {
  content: "*";
  display: block;
  position: absolute;
  color: #E63C37;
  width: 10px;
  height: 20px;
  font-size: 17px;
  top: 6px;
  left: 6px;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(1);
  transform: scaleY(1);
  }
  .form-block {
  .ay_cell_ft {
  width: ;
  display: none;
  }
  }
  .number {
  .ay_cell_ft {
  flex: initial;
  width: 50%;
  margin-right: 0;
  }
  }
  .ay-cell__primary {
  margin-left: 20px;
  }
  .ay_cell_primary,
  .ay-cell__hd {
  font-size: 17px;
  font-weight: bold;
  }
  .ay_cell_bd {
  -webkit-box-flex: auto;
  -ms-flex: auto;
  flex: auto;
  }
  .ay_cells:before {
  border: 0;
  }
  .ay_cells {
  margin-top: 0;
  }
  .ay_cell {
  padding: 0 0 0 15px;
  height: 60px;
  }
  .ay_label {
  font-size: 17px;
  font-weight: bold;
  }
  .ay_input {
  font-size: 17px;
  -webkit-font-smoothing: antialiased;
  }
  border-top: 1px solid #DFDFDF;
  .submit-btn-box {
  text-align: center;
  padding: 30px 0;
  .submit-btn {
  width: 200px;
  height: 45px;
  line-height: 45px;
  color: #fff;
  font-size: 17px;
  background-color: #FF5523;
  display: inline-block;
  text-align: center;
  border-radius: 100px;
  -webkit-font-smoothing: antialiased;
  }
  }
  .ay-number-selector {
  position: relative;
  width: auto;
  border-radius: 100px;
  background-color: #E94709;
  text-indent: -9999px;
  padding: 4px 14px;
  }
  .ay-number-input {
  float: none;
  border: 0;
  width: 50px;
  display:block;
  }
  .ay-number-selector-sub {
  &:after {
  position: absolute;
  top: 8px;
  left: 8px;
  content: "";
  display: block;
  width: 12px;
  height: 12px;
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAECAYAAACUY/8YAAAAAXNSR0IArs4c6QAAADdJREFUGBlj+P//vycQPwJiaoPHQAM9GYHEYwYGBhkgpgV4wkQLU5HNBFmQBsRPkAWpxAaFTBoAVRhldGOUPFgAAAAASUVORK5CYII=");
  }
  }
  .ay-number-selector-plus {
  &:after {
  position: absolute;
  top: 8px;
  left: 8px;
  content: "";
  display: block;
  width: 12px;
  height: 12px;
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJxJREFUSA3tVlEOgCAIzc7RhbyIB1fvYbzmB3NT3qbzJ9koDB7ZE1jXRUopxYumqp6E8WE1sdw+iSzSsYFIq2OdiF737LvnWPX8vMBk8lBkUyTljQ6NqPORtJlGsdWHrvdOLknAT5tg0TpvOeQgu82LdqzTgJlAzROgwKtGn1mk2Ziyt1TR1A4t8L++QDejti2WOD8GF+ZWVfq35QUl94u9WCFJEwAAAABJRU5ErkJggg==")
  }
  }
  .ay-x-input:before {
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
  left: 0rem;
  }
  .ay-x-input .ay-input {
  height: 30px;
  line-height: 30px;
  }
  .ay_cell_bd>p {
  color: #333;
  }
  }
  .successdialog .ay_dialog {
  height: 200px;
  background: #FFFFFF;
  border-radius: 6px;
  }
  .successdialog{


  .ay_dialog_hd {
  position: relative;
  height: 54px;
  }

  .ay_dialog_hd :after {
  content: '';
  display: inline-block;
  margin: 0 auto;
  width: 54px;
  height: 54px;
  background: url(data:image/png;base64,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) no-repeat;
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
    Headerbar,
    XInput,
    Group,
    XNumber,
    Switch,
    Toast,
    Alert
  } from '../../components'
  export default {
    components: {
      // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
      // 否则挂载点和组件名字一致, 即vhead
      ViewBox,
      Cell,
      Tabbar,
      TabbarItem,
      Headerbar,
      XInput,
      Group,
      XNumber,
      Switch,
      Toast,
      Alert
    },
    data() {
      return {
        aid: "0",
        tid: "0",
        pageNo: 0,
        pageSize: 10,
        memberId: '',
        frm_username: '',
        frm_mobile: '',
        frm_number: '',
        frm_msg: '',
        commentStr: '',
        ActiveInfor: [],
        Message: [],
        isPulse: false,
        showForm: false,
        showSendBtn: false,
        showCloseBtn: false,
        showTip: false,
        massage: '',
        RequestSucess: false,
        showShare: api.showShare,
        shareTitle: "",
        shareSubTitle: "",
        shareImg: "",
        showToast: false
      }
    },
    methods: {
      tackData: function () {
        var vm = this
        var useCache = false
        var useProxy = true
        var actParam = {
          "tid": vm.tid,
          "aoyouid": vm.memberId
        }
        api.post({
          path: api.config.microServiceHost.findurl,
          controller: 'Precious',
          action: 'GetActivityDetail',
          param: JSON.stringify(actParam),
          useCache: useCache,
          useProxy: useProxy,
          callback: function (obj) {

            if (obj.ReturnCode == 0) {
              var data = obj.Data;
              if (data != null && data.length > 0) {
                var activeInfor = data[0]
                //vm.ActiveInfor = data[0]

                vm.RequestSucess = activeInfor.applystate == 1 ? true : false;
                vm.pageNo++
                var detailParam = {
                  "fid": vm.aid,
                  "topicId": vm.tid,
                  "pageNo": vm.pageNo,
                  "pageSize": vm.pageSize
                }
                api.post({
                  path: api.config.microServiceHost.findurl,
                  controller: 'Precious',
                  action: 'GetPostList',
                  param: JSON.stringify(detailParam),
                  useCache: useCache,
                  useProxy: useProxy,
                  callback: function (obj) {

                    if (obj.ReturnCode == 0) {

                      var postData = obj.Data;
                      activeInfor.content = postData.topic.content
                      activeInfor.topic = postData.topic
                      vm.ActiveInfor = activeInfor
                      vm.Message = postData.list

                      vm.shareTitle = vm.ActiveInfor.subject
                      vm.shareSubTitle = "遨游旅行家，发现精彩旅行"
                      vm.shareImg = vm.ActiveInfor.activityaid_url
                      vm.initShareDialog()

                    }
                  }
                })
              }
              commit('UPDATE_LOADING',false)
            }
          }
        })

        var parammember = JSON.stringify({
          memberid: vm.memberId,
        });


        var SupportParam = {
          "tid": vm.tid,
          "aoyouId": vm.memberId
        }

        api.post({
          path: api.config.microServiceHost.findurl,
          controller: 'Precious',
          action: 'GetSupportStatus',
          param: JSON.stringify(SupportParam),
          useCache: useCache,
          useProxy: useProxy,
          callback: function (obj) {
            if (obj.ReturnCode == 0) {
              var data = obj.Data;
              if (true == data) {
                vm.isPulse = true;
                this.isPulse = vm.isPulse
            
              }

            }
          }
        })

        api.post({
          path: api.config.microServiceHost.memberurl,
          controller: 'CrmMember',
          action: 'GetMemberSimple',
          param: parammember,
          useCache: false,
          useProxy: true,
          callback: function (obj) {

            if (obj.ReturnCode == 0) {
              var data = obj.Data

              document.getElementsByName('frm_username')[0].value = data.Name;
              vm.frm_mobile = document.getElementsByName('frm_mobile')[0].value = data.Mobile;


            }

          }
        })

      },
      pulseFun: function () {
        this.memberId = api.getMemberId()
        if (this.memberId == '') {
          api.toLogin(encodeURIComponent(location.href), encodeURIComponent(location.href), "stay")
          return false
          //var loginUrl = "http://mpass.aoyou.com?from=" + encodeURIComponent(location.href) + "&forward=" + encodeURIComponent(location.href);
          //window.location.href = loginUrl
        } else if (!this.isPulse) {
          var vm = this
          var supportParam = {
            "aoyouid": vm.memberId,
            "tid": vm.tid,
            // "pid":vm.ActiveInfor.topic.reply_posts_id,
            "action": "support"
          }
          api.post({
            path: api.config.microServiceHost.findurl,
            controller: 'Precious',
            action: 'PostSupport',
            param: JSON.stringify(supportParam),
            useCache: false,
            useProxy: true,
            callback: function (obj) {

              if (obj.ReturnCode == 0) {
                var data = obj.Data
                if (false != data) {
                  vm.showTip = true
                  vm.massage = obj.Message
                  vm.isPulse = true;
                  vm.ActiveInfor.recommendAdd += 1;
                } else {

                  vm.massage = '一个用户只能点赞一次！';
                  vm.showTip = true;
                }
                // alert('点赞成功')

              } else {
                vm.massage = '点赞失败'
              }
            }
          })

        }
      },
      shareFun: function () {
        alert('快去分享呀')
      },
      BaoMingFun: function () {
        this.showForm = true
        //先登录后报名
        this.memberId = api.getMemberId()
        if (this.memberId == '') {
          api.toLogin(encodeURIComponent(location.href), encodeURIComponent(location.href), "stay")
          return false
          //var loginUrl = "http://mpass.aoyou.com?from=" + encodeURIComponent(location.href) + "&forward=" + encodeURIComponent(location.href);
          //window.location.href = loginUrl;
        } else {
          this.showForm = true
        }
      },
      SubmitFun: function () {
        var vm = this

        vm.frm_username = document.getElementsByName('frm_username')[0].value
        vm.frm_mobile = document.getElementsByName('frm_mobile')[0].value
        vm.frm_number = document.getElementsByName('frm_number')[0].value
        vm.frm_msg = document.getElementsByName('frm_msg')[0].value
        if (vm.frm_username.length == 0) {
          vm.massage = '请填写姓名'
          vm.showTip = true;
          return false
        } else if (vm.frm_mobile.length == 0) {
          vm.massage = '请填写手机号'
          vm.showTip = true;
          return false
        } else if (vm.frm_number == 0) {
          vm.massage = '请填写人数'
          vm.showTip = true;
          return false
        }
        var frmParam = {
          "aoyouid": api.getMemberId(),
          "tid": vm.tid,
          "mobile": vm.frm_mobile,
          "applynumber": vm.frm_number,
          "realname": vm.frm_username,
          "message": vm.frm_msg
        }
        api.post({
          path: api.config.microServiceHost.findurl,
          controller: 'Precious',
          action: 'ApplyActivity',
          param: JSON.stringify(frmParam),
          useCache: false,
          useProxy: true,
          callback: function (obj) {

            if (obj.ReturnCode == 0) {

              if (obj.Data.rs == 1) {
                //vm.showTip = true
                vm.RequestSucess = true;
                vm.massage = '报名成功'
                vm.showToast = true;

              } else {
                vm.showTip = true
                vm.massage = obj.Message;
              }
            } else {
              vm.showTip = true
              vm.massage = '报名失败'
            }
          }
        })
      },
      submitMassage: function () {
        this.send()

      },
      alerthide() {
        //window.location.reload();
      },
      send: function () {
        this.memberId = api.getMemberId()
        if (this.memberId == '' || this.memberId == null || this.memberId == 0) {
          api.toLogin(encodeURIComponent(location.href), encodeURIComponent(location.href), "stay")
          return false
          //var loginUrl = "http://mpass.aoyou.com?from=" + encodeURIComponent(location.href) + "&forward=" + encodeURIComponent(location.href);
          //window.location.replace(loginUrl)
        } else {

          var vm = this
          if (vm.commentStr.length == 0) {
            vm.showTip = true
            vm.massage = '请填写评论内容'
            //
            return false
          } else if (vm.commentStr.length < 20) {
            vm.showTip = true
            vm.massage = '评论内容请大于20个字'
            return false
          }
          var useCache = false
          var useProxy = true
          var replyParam = {
            "tid": vm.tid,
            "fid": vm.bid,
            "message": vm.commentStr,
            "platType": 0,
            "memberId": vm.memberId
          }
          api.post({
            path: api.config.microServiceHost.findurl,
            controller: 'Precious',
            action: 'ReplyThread',
            param: JSON.stringify(replyParam),
            useCache: useCache,
            useProxy: useProxy,
            callback: function (obj) {

              if (obj.ReturnCode == 0) {
                var data = obj.Data;
                if (data.rs == 1) {
                  vm.commentStr = ''
                  window.location.reload();
                } else {
                  vm.showTip = true
                  vm.massage = data.head.errInfo
                }

              } else {
                vm.showTip = true
                vm.massage = '发送失败... 换根手指再试一次！'
              }
            }
          })
        }
      },
      submitComment: function () {
        if (event && event.keyCode == 13) {
          this.send()
        }
      },
      checkLogin: function () {
        this.showSendBtn = true
        var u = navigator.userAgent,
          app = navigator.appVersion;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isiOS) {
          setTimeout(() => {
            this.scrollBottom()
          }, 100);
        }
        document.querySelector('.page-wrap').style.transform="translate3d(0px, -10px, 0px)"
        this.memberId = api.getMemberId()
        if (this.memberId == '') {
          api.toLogin(encodeURIComponent(location.href), encodeURIComponent(location.href), "stay")
          return false
          //var loginUrl = "http://mpass.aoyou.com?from=" + encodeURIComponent(location.href) + "&forward=" + encodeURIComponent(location.href);
          //window.location.href = loginUrl;
        }
      },
      outInput: function () {
        var vm = this
        if (vm.commentStr == '') {
          vm.showSendBtn = false
        } else {
          vm.showSendBtn = true
        }
        document.querySelector('.page-wrap').style.transform="translate3d(0, 0, 0)"
      },
      clearInput: function () {
        this.commentStr = ''
        this.showSendBtn = false
        this.$els.ayinput.focus()
      },
      scrollBottom: function () {
        window.scrollTo(0, $('body').height());
      },
      back: function () {
        api.pageBack()
      },
      share: function () {
        api.openShareDialog(this.shareTitle, this.shareSubTitle, window.location.href, this.shareImg, {})
      },
      //wap微信分享
      initShareDialog: function () {
        api.initShareDialog(this.shareTitle, this.shareSubTitle, window.location.href, this.shareImg)
      }
    },

    ready: function () {
      this.showSendBtn = false;
      var memberid = api.getCookie("memberid");

      if (!memberid) {
        // api.pageGoTo("http://mpass.aoyou.com?from=" + location.href + "&forward=" + location.href);
        this.showForm = false;
      } else {
        this.memberId = memberid;
        this.showForm = true;
        var useCache = false;
        var useProxy = true;

      }
      this.tackData()

    },
    route: {
      data: function (transition) {
        if (transition.to != null && transition.to != undefined) {
          this.aid = this.$route.query.aid || ''
          this.tid = this.$route.query.tid || ''


        }
      }
    },
    created() {
       commit('UPDATE_LOADING',true)
    },
    watch: {
      'commentStr': function (val, oldVal) {
        this.showCloseBtn = true
        if (val == '') {
          this.showCloseBtn = false
          this.showSendBtn = true
        }
      }
    },
      filters: {
         "enter": function(val) {
             val = val.replace(new RegExp(/\r\n/g), '<br/>')
             return val
         }
    }
  }
</script>