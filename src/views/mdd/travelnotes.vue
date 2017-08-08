<template>
    <div class="page play">
        <view-box>
            <div class="ay-header-box whitetheme">
                <div class="header-cover" :style="{opacity:isOpacity}"></div>
                <headerbar>
                    <span slot="left" class="icons icon-arrow" @click="back()"></span>
                    <div class="departciry">
                        <span class="citys" @click="" :style="{opacity:isOpacity}">精选游记</span>
                    </div>
                </headerbar>
            </div>
            <div class="page-inner">
                <scroller lock-x scrollbar-y use-pullup height="100%" :pullup-status.sync="pullupStatus" @pullup:loading="load">
                    <section class="ay-section">
                        <a class="listitem" v-link="{'path':'playdetail','query':{'destId':destId,'itinId':listItem.Id}}" v-for="listItem in  PlayList">
                            <h3 class="title">{{listItem.Title}}</h3>
                            <div class="imgbox">
                                <img :src="listItem.BannerImg+'?imageView2/1/w/335/h/180/q/90'">
                            </div>
                            <div class="rec-bot">
                                <div class="rector left">
                                    <span class="referee-img">
                                        <img :src="listItem.AuthorImg+'?imageView2/1/w/30/h/30/q/90'">
                                    </span>
                                    <span class="referee-label">
                                        <p class="name">{{listItem.AuthorName}}</p>
                                        <p>{{listItem.AuthorLabel}}</p>
                                    </span>
                                </div>
                                <div class="right relate">
                                    <span><i class="icon-zan"></i><em>{{listItem.SiteCount}}</em></span>
                                    <span><i class="icon-see"></i><em>{{listItem.Duration}}</em></span>
                                </div>
                            </div>
                        </a>
                        <div class="ending" v-if="!HasNextPage">
                            <p><span>已到底线</span></p>
                        </div>
                    </section>
                    <!--pullup slot-->
                    <div v-if="HasNextPage"  slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
                        <span v-show="pullupStatus === 'default'"></span>
                        <span v-show="pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
                    </div>
                </scroller>
            </div>
        </view-box>
    </div>
</template>
<style lang="less">
    @import '../../styles/index.less';
    @import '../../styles/ayui/base/reset.less';
    .play{
        .ay_tab_bd{
            padding-bottom: 0;
        }
        .ay-header-bar{
            background-color: #fff;
        }
        .listitem:last-child{
            margin-bottom: 0;
        }
        .listitem{
            display: block;
            background-color: #fff;
            margin-bottom: 10px;
            padding: 15px 20px 30px;
            .title{
                line-height: 24px;
                font-size: 19px;
                color: #333;
                margin: 10px 0;
                -webkit-font-smoothing: antialiased;
                overflow: hidden;
                font-size: 17px;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
            }
            .imgbox{
                img{
                    width: 100%;
                    border-radius: 10px;
                }
            }
            .left{
                width: 60%;
                float: left;
                box-sizing: border-box;
                padding-right: 15px;
            }
            .right{
                float: left;
            }
            .rec-desc{
                color: #666666;
                font-size: 14px;
                line-height: 23px;
                text-align: justify;
                p{
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    overflow: hidden;
                    -webkit-box-orient: vertical;
                }

            }
            .rector{
                display: flex;
                align-items: center;
            }
            .rec-img{
                img{
                    width: 100%;
                    border-radius:6px;
                    display: block;
                }
            }
            .rec-center{
                .title{
                    padding-top: 0;
                }
            }
            .rec-center,.rec-bot{
                &:after{
                    content: "";
                    display: table;
                    clear: both;
                }
            }
            .rec-bot{
                height: 30px;
                margin-top: 10px;
                display: -webkit-flex;
                display: flex;
                align-items: center;
                color: #999999;
                font-size: 12px;
                overflow: hidden;
            }
            .referee-img{
                float: left;
                display: block;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                overflow: hidden;

                img{
                    width: 30px;
                    height: 30px;
                    vertical-align: middle;
                }
            }
            .referee-label{
                margin-top: 2px;
                color: #999999;
                font-size: 12px;
                line-height: 1;
                margin-left: 10px;
                float: left;
                p{
                    line-height: 1.2;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    overflow: hidden;
                    -webkit-box-orient: vertical;
                }
                .name{
                    color: #333333;

                }
            }
            .relate{
                span:nth-child(1){

                }
                span{

                }
                em{
                    font-style: normal;
                    margin-left: 4px;
                }
            }
        }
        .icon-calender{
            display: inline-block;
            width: 14px;
            height: 14px;
            vertical-align: -2px;
            background-size: contain;
            background-repeat: no-repeat;
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAAU9JREFUSA3tVkGKwkAQdMKw3r0pu2/wCXr1A3lAIMkP9hH+IBvIVcgHvOoTfMMuejNnJRCrw/QwG4kEHfrkQGdmejpVU50OtBr1jLIsP6qquiilrkmSjHvCrHtofGDfEFqIEyoSluf5Z9M0a9gS2yn5PI4TPssO9h3H8Z8yZAeQTTyS3EGB8Ayba6Nsgs0WltAtKHpoETByX7wR9AOeFWLXgUnjyCVjEB8zCdBapwZrQUXTfjNW5oOkixFF0S/5IG6mu4e8D8PwinVbVOx7NA+NF/8txAlVlmXNo1T5PhNXaIsmTdPBBfKMas6kuEJxQptSN00sn31uup89Yyxxhfa3cFXwbXzOnBlxheKE76LxVjdu0ZwItSiKL2/oHSDGRldxDPDY0Xld1xn1H53Yl7eESdgGaC/etQVtr4j2DUo3uEWb3pdl/QegvnQDmxPXDUn3rjqj5JwoAAAAAElFTkSuQmCC");
        }
        .icon-scenery{
            display: inline-block;
            width: 15px;
            height: 13px;
            vertical-align: -2px;
            background-size: contain;
            background-repeat: no-repeat;
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAaCAYAAABPY4eKAAAAAXNSR0IArs4c6QAAA7tJREFUSA3tlVtI03EUx3dzaQpNAi+0lwoD7QIRKVHRgwVdsBBDqMFqzakkJJRdMKIiH6IsXyJ1GpqYlBSS0AxCRuizQQ9liZHli1FsqNPS3PqctY2/lzmXXV76wfmf8/ud8z3f3+/8Ln+16je02tra1Wq1+jipNvh8vjXYSdhD2K/R7QkJCfdNJpNrJpV65kA0/bq6OqPX662E7CBE2nBY/G78FYWFhTexfcG4BZPX19dnTk1NDRcVFfUKmP46iDtIaiThV4YakUf03+r1+k/EJmNvR8zILnwq4h7HxsaazGazx9+XT6TW2tqqd7vdPSQZTUxM3Do8PJxO8m5wy5BOjUZjstlsQ+HyMNHdxDfjXy4TIDZXKqAJB1COu1yucojXMpbFJMpIZMcW4gfInvmI8asKCgqeUo0tmF/Ic8But5+U8YhlJ1BIe5AYgBI/KTbyIS4uLiNYQvoRW6ACHazaHR8fv2relUOmQe4geqSG7LLiGMD9iDUaYpmZVADcM3IZPB7PoXnJmekJMFkABnU63VmkDHsAsFytTEkYbQPXJBhy5IQl5xqtJKAiEFhstVpHRDhcVhLg8l2UE/8L5F2CIUd6WHKS25F44lq4Xk+CJJSuE7sWn56r1uh0OnVB30zNednMIvYqx7Varf9WgE+ZkxyABedOQJ+RUiVYbIPBcBr1nphNfX1952b6pc+rl4q/jQk2NDU1yYvnbxMTEysC5tgs8oaGhhQANwIBpaxaJjCt5efnjzJwTMqPvgDRemWAw+FYQr8NEaKk8fHxeoXfHwt2YBb55OTkLQITcTogblGAppn4nAxUszo9+q6y/IODg3Ir5KAOoF1IDltgQ8teZ4umOaeRE5BLsjwCRjjZxT9jwn95Ks/gfYdspPzlEkkVTpHDTA4Psh+RH460qpqammx8RdJBN4ceGcptYD9eMZ4KoISfwG0JitSY8A5inCT7zk04z5ZdBS9588ghpZcJ3UMdRuSwJeN24NsXWjnlrsSRinTzXFajF9RI8pxA2aoYiK+hJeelIDG2iqe1BPUREeKXiH/1fnLuq5TDivMb5S7AGfrtMRaxgZUT3y+BYB8y+StKkMVicdM/InlpGYgsUqWhJEsDPwoBXuYheaMELsTm8I1RcguxLzgHR+eafOCAVhGjg7wR0fhXTrA8Ij1paWnXF0I2Vwyr7WJ823zvvdFoLIernYemEO0N5ZF/dqjzl4zQaaf8Ue3zIubXyxakCz502heR7D806gqE9lyJ/BP7zz7P4vqne/4DfLe721LMvjIAAAAASUVORK5CYII=");
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
    }
</style>
<script>
    import {ViewBox,Loading,Cell,Tabbar, TabbarItem,Headerbar,Scroller,Spinner} from '../../components'
    export default{
        components: {
            // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
            // 否则挂载点和组件名字一致, 即vhead
            ViewBox,
            Loading,
            Cell,
            Tabbar,
            TabbarItem,
            Headerbar,
            Scroller,
            Spinner
        },
        data(){
        return {
            backUrl:'',
            dataResult:[],
            departCity:{},
            destId:0,
            PlayList:[],
            pageNo: 1,
            pageSize: 5,
            HasNextPage:true,
            pullupStatus: 'default'
        }
    },
    methods:{
        tackData:function (uuid) {

            var vm = this
            var destParam = {
                DestinationId:vm.destId,
                PageIndex:vm.pageNo,
                PageSize:vm.pageSize
            }
            api.post({
                path: api.config.microServiceHost.destinationurl,
                controller: 'Destination',
                action: 'GetDestPlayMethodList',
                param: JSON.stringify(destParam),
                useCache: false,
                useProxy: true,
                callback: function(obj) {
                    if (obj.ReturnCode == 0) {
                        if (uuid) {
                            setTimeout(() => {
                                vm.$broadcast('pullup:reset', uuid)
                            }, 10)
                        } else {
                            setTimeout(() => {
                                vm.$broadcast('pullup:reset', 'lee111')
                                vm.$broadcast('pullup:enable', 'lee111')
                            }, 10)
                        }
                        var data= obj.Data.DestPlayMethodList;
                        vm.HasNextPage = obj.Data.HasNextPage
                        if(data!=null&&data.length>0)
                        {
                            for(var i=0,len=data.length;i<len;i++)
                            {
                                if(data[i].AuthorName!=null)
                                {
                                    var tmp=data[i].AuthorName.split('|')
                                    if(tmp.length>1){
                                        data[i].AuthorName=tmp[0]
                                        data[i].AuthorLabel=tmp[1]
                                    }
                                }
                            }
                        }
                        vm.PlayList=vm.PlayList.concat(data)

                        console.dir(vm.PlayList)
                    }
                }
            });
            if(vm.HasNextPage){
                vm.pageNo++
            }
        },
        load:function(uuid){
            this.tackData(uuid)
        },
        back:function(){

            api.pageBack(this.backUrl)
        }
    },
    created(){
        this.departCity=api.getDepCity()
    },
    route:{
        data:function(transition){
            if(transition.to!=null&&transition.to!=undefined)
            {
                this.destId=this.$route.query.destId||0
                this.backUrl='http://m.aoyou.com/mdd.html#!/detail?destId='+this.destId
                this.tackData()
            }
        }
    }
    }
</script>
