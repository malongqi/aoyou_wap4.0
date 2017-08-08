<template>
    <div class="page">
        <headerbar class="headbar">
            <span slot="left" class="icons icon-arrow" @click='back()'></span>
            <div class="departciry">
                <span class="citys" @click="">行程详情</span>
            </div>
        </headerbar>
        <view-box class="page-inner-detail">
            <section v-for="item in detailData" class="detail-item"><!--0410 F-->
                <div class="title">
                    <i>D{{item.DayNo}}</i>
                    <h2 :class="{manyline:item.JourneyTitle.length>14}">{{item.JourneyTitle}}</h2>
                </div>
                <div class="tit">
                    <div class="brief" v-if="item.TrafficType==1&&item.TrafficInfo!=''"><i class="i-flight"></i><p>{{item.TrafficInfo}}</p></div>
                    <div class="brief" v-if="item.TrafficType==4&&item.TrafficInfo!=''"><i class="i-bus"></i><p>{{item.TrafficInfo}}</p></div>
                    <div class="brief" v-if="item.TrafficType==3&&item.TrafficInfo!=''"><i class="i-boat"></i><p>{{item.TrafficInfo}}</p></div>
                    <div class="brief" v-if="item.TrafficType==2&&item.TrafficInfo!=''"><i class="i-train"></i><p>{{item.TrafficInfo}}</p></div>
                    <div class="brief" v-if="item.BreakfastInfo.length>0||item.LunchInfo.length>0||item.DinnerInfo.length>0"><i class="i-food"></i><p>{{item.BreakfastInfo.length>0?'早餐 '+item.BreakfastInfo:''}}，{{item.LunchInfo.length>0?'午餐 '+item.LunchInfo:''}}，{{item.DinnerInfo.length>0?'晚餐 '+item.DinnerInfo:''}}</p></div>
                    <div class="brief" v-if="item.HotelInfo&&item.HotelInfo.length>0"><i class="i-hotel"></i><p>{{item.HotelInfo}}</p></div>
                </div>
                <div class="content">
                    <p>{{{item.JourneyDesc}}}</p>
                    <img :src="m+'?imageView2/1/w/335/h/251/q/90'" v-for="m in item.JourneyPictureUrl">
                </div>
            </section>

        </view-box>
    </div>
</template>
<style lang="less">
    @import '../../styles/ayui/base/mixin/setOnepx.less';
    .ay-header-bar.headbar{
        background: white;
        position: relative;
        //border-bottom: 1px solid #DFDFDF;
        &:after {
            .setBottomLine(#DFDFDF);
        }
        .ay-header-title, .ay-header-bar h1{
            color:#333;
        }
    }

    .ay-header-bar .is-left span{
        background-repeat: no-repeat;
        background-size: contain;
    }/*0211*/




.page-inner-detail {
    section {
        background: white;
        width: 100%;
        padding-top: 17.5px;
        margin-top: 10px;
        &:first-child {
            margin-top: 0;
        }

        .title {
            margin: 0 20px;
            position: relative;
            z-index:1;
            i {
                height: 40px;
                width: 40px;
                background: #FFAB0A;
                display: inline-block;
                line-height: 40px;
                text-align: center;
                font-style: normal;
                border-radius: 50%;
                color: white;
                font-size: 16px;
                margin-right: 10px;
                float: left;
            }
            h2 {
                font-size: 19px;
                color: #333333;
                line-height: 40px;
                padding-left: 50px;
                word-wrap: break-word;
            }
            .manyline {
                line-height: 1;
            }

        }

        .tit {
            margin: 32.5px 20px 0 20px;
            position: relative;
            z-index:1;
            .brief {
                width: 100%;
                position: relative;
                margin: 4px 0;
                p {
                    font-size: 16px;
                    color: #333333;
                    line-height: 18px;
                    display: inline-block;
                    width: 87%;
                    margin-left: 50px;
                }
                i {
                    background-color: #FFAB0A;
                    position: absolute;
                    top: 8px;
                }
            }

        }

        .content {
            margin: 0 20px;
            padding-bottom: 20px;
            position: relative;
            z-index:2;
            p {
                font-size: 16px;
                color: #333333;
                line-height: 27px;
                margin-top: 15px;
            }
            img {
                width: 100%;
                margin-top: 15px;
            }
        }
    }

    .ay_tab_bd{
        padding-bottom: 45px;
    }

    .detailcolor1(5);
    .detailcolor1(@n, @i: 1) when (@i =< @n) {
        section:nth-child(@{i}) {
            .title {
                i {
                    background-color: #FFAB0A;
                }
            }
            .tit {
                .brief {
                    i {
                        background-color: #FFAB0A;
                    }
                }
            }
        }
        .detailcolor1(@n, (@i + 1));
    }

    .detailcolor2(10);
    .detailcolor2(@n, @i: 6) when (@i =< @n) {
        section:nth-child(@{i}) {
            .title {
                i {
                    background-color: #FF701B;
                }
            }
            .tit {
                .brief {
                    i {
                        background-color: #FF701B;
                    }
                }
            }
        }
        .detailcolor2(@n, (@i + 1));
    }

    .detailcolor3(15);
    .detailcolor3(@n, @i: 11) when (@i =< @n) {
        section:nth-child(@{i}) {
            .title {
                i {
                    background-color: #51AE63;
                }
            }
            .tit {
                .brief {
                    i {
                        background-color: #51AE63;
                    }
                }
            }
        }
        .detailcolor3(@n, (@i + 1));
    }

    .detailcolor4(20);
    .detailcolor4(@n, @i: 16) when (@i =< @n) {
        section:nth-child(@{i}) {
            .title {
                i {
                    background-color: #47B9B1;
                }
            }
            .tit {
                .brief {
                    i {
                        background-color: #47B9B1;
                    }
                }
            }
        }
        .detailcolor4(@n, (@i + 1));
    }

    .detailcolor5(25);
    .detailcolor5(@n, @i: 21) when (@i =< @n) {
        section:nth-child(@{i}) {
            .title {
                i {
                    background-color: #2E97D2;
                }
            }
            .tit {
                .brief {
                    i {
                        background-color: #2E97D2;
                    }
                }
            }
        }
        .detailcolor5(@n, (@i + 1));
    }

    .detailcolor6(30);
    .detailcolor6(@n, @i: 26) when (@i =< @n) {
        i {
            background-color: #9F3691;
        }
        .title {
            i {
                background: #9F3691;
            }
        }
        .tit {
            .brief {
                i {
                    background-color: #9F3691;
                }
            }
        }
        .detailcolor6(@n, (@i + 1));
    }
}



.i-hotel{
    width: 17.5px;
    height:17.5px;
    margin-right: 23px;
    margin-left: 10px;
    display: inline-block;
    background-repeat: no-repeat;
    background-size: contain;
    background-position:center;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAAAXNSR0IArs4c6QAAAgBJREFUWAntlb8vBEEUx60fCa4QCRINEq7RHn8AIRIKrYpG/AFaClEpdEKjPf+B6CREReSiJX7VflQKKuvzxs5mbrOztxe7eyfZl3z3vXkz8953Z97MOC7S0iTS2iQ8FI2cjG038pX5dytzDuMi6Ad7NvZp+h3jnhlzHOdBkuGTWnoCQ9LOSvwC1kQkMfY36lnsLMUnE5I085s5ikwIv3RdjSRT5temwCp4k99sl08D5Iacy9SmlMIZB+YLXY5D5pOBu6ACJsA66AIiH+AWSMHXkhEGDHiDKh4RPedaGXK0RbRXa1zCWGRB+0TTXlRe171A95h9UTZj28CBN/fQHIuvKH4JrsTsFBunkHkJ+r2+d/rmw/qifMzpBSKhZGoVcIGJVVtJu4OE3aAvKrGlL3JOVaKQAJJ0C2wafdvYnWAHYq/oSxCnZkYZtw+sUouMTNwg6SxaCrgEJoHIIDhRVkIf/22iuh0zJgRWaA+bvgRtOU3HOh655IG+sxawHpiFFjJAvc5Z5IuVo9ZpihUkqUHWAmbVZkiib8yk8uk499TMlW74WvZKxHd4Bi659NKS6EuPrMEtC7aDfP/SDsZWbdMpj6ASiBUwxr1mGqpEDvMq+b27jH14xF4Cc+DU8KdlHhF4GqwBeetc/9JL4/frjWluU71zEx+fk7Etab4ytpX5ARwxvTS/PfW7AAAAAElFTkSuQmCC");
}
.i-flight{
    width: 17.5px;
    height:17.5px;
    margin-right: 23px;
    margin-left: 10px;
    display: inline-block;
    background-repeat: no-repeat;
    background-size: contain;
    background-position:center;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAAAXNSR0IArs4c6QAAAqxJREFUWAntmLtrVEEUh3N9xjcqFhJ8gmijnRBEESStpSAomEbBwkqw8E+wt7CxEERRxPhAG4UgQgKigl1AVAiIEkXEYF5i/M7NznLYnXPnhWDhgS8ze+Y35/xyl3tnd6t5oucfiUWFPl6yfx+sgn54DdlRFVyZ33TdXlXVuOtOrS3M38ESl0sZS67Me21EmrZef0gxoLUlZr7pQmo+qeZJ0xIzs0YnefuyosSM1TT77iwxYzW18sGrVWImWDxV8N+MdcVKrsxXo+iEkQ+n5QmcETfZI0dAV0gebmXUnO9J3PQL/fkuB54Eugsg+uhIMTNB1SOevmYK/QB8iXUTa+YFBbeaXRsW2LcNXkEwYsxcpUpvQ7/gEvtXwLWQmyYzs2w+G+yUIKDeOZC63rDMfER9IKFPtJS6h+CTz43PzHOEm6OrZwip3wcjnYY6zVxGsDRUH00v7PbpyO+BZb41nRMNXIF2aDODWtw5Z8caOA63YRIedGrkNfnH8B1uwDFY7dO5HOtnoI62GbeoRxTr4CQMwRToeKq1bo7gkRYxl3134QSsdTo3kpM7rY62GV4tFgHjBhiEhzADVgy7gnpEfM/aQH4a7sMpWC/7GOWK16E/xV8kc5h1Qedljy+sQ3bOJ27lljMebTFHv2Hmo7AQC56y/j5zNfRIpetZ1dhk/Xe6fup8JnWD0/8NM9a3BtfTHHPN/KTiJaPqEPkpY605nfH+fmbP/qaqrPeDfORICn1rx2wcQ7SjyYhbQ7cL3sYUdZoUM3JmbXTNYkb0m2DUNQuNsb9CyE8fB/liP+1MUFjOMDnZB2AvvIEnMIKu/axBt5KcPEtE0xwht631+pnCXE5bOUvkePgBvpBz6Q6chp3SnbHrhCbXFbFXRmqOgfeklsWGkF8r6kd/g6Ze+gOXKw0laK7k0AAAAABJRU5ErkJggg==");
}
.i-bus{
    width: 17.5px;
    height:17.5px;
    margin-right: 23px;
    margin-left: 10px;
    display: inline-block;
    background-repeat: no-repeat;
    background-size: contain;
    background-position:center;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAAAXNSR0IArs4c6QAAArxJREFUWAntlU9IVUEUxn3PIDKNMhWJ1hFKRYWQRSC1jHa1CRdBu9bRoghy2ybcSBBYRNAqaBHRqkhe5CYKoqKwVvWqlZpQaNbt9433XMbx/umP8p7wDnz3nPOdb+aeN/fNTCnCmurEynXSh2uj0UzW12iszKpYmSZtbewG2JTV8XLzvKsNVMEis2bal/uFRfPRxYlFnZCURJQwG0zaQ9xheeCfI/0qDt1O3Mag7ko8nqL75pIo2o1vU+zZY+o/meMh3EDCQyQnMOEe5Tn2QAOpH87RqHQ71h3L0A3G9V7qP0wTbu1uiXLM6uazpFY3H+rO00CZ1XlJYdiKYTPGr7TfzguOxy8ZwlcV16oZvfu0HqzODO6M4lo206oGZDR0C1epZTOuEe/xImzmPcU5TxCGr2NiAj8fFr3cdG/hfnm8H5om4dLOmQ1Uw3PBBlRZUncUsBt0xqy3gud1brk/pDh0OtlbvLqjeXyyuRwRRSNrApG+nw41d7CFNT9HN0Uu5Bq6SQRCoYWfqXDASgpWRzN861ZwAGwDyd31Lyuj8fE8/fh1mXNQTO4miUibwUWQ3BnEr8DezElyCozbD94Bs1kCXQfN/jDyEb08bOaCOOwNuArugO9gEmzxJyiK0e8Cc0D2DFwB94Fu7Ev+ePKFZgjWqoBvAepcg5KdRtwDPoPL/gRFMfonQHbO15IfBDOg13jiUbcyBKdE4veBD8A1Z8K4dhK+4nN5MdouIBtP08EPgbPx3B3EH+3X63OoIe2ucc6G2ZQJHsENo7ubUkujNsfkWFoRTvx15juE7wPt1ox2Sz+QZV0HXdR0Oh+R6C9M49KsE3JrjIU6nYU2D7Fk58DdDIV/mE+j00sTIy+DSjje/jMh/wViEHSDHeAa+B+bYPBR0An6wD2wxNxFmbRc40B/2LqxRjNZn6KuVuY3PHYEUvG135AAAAAASUVORK5CYII=");
}
.i-train{
    width: 17.5px;
    height:17.5px;
    margin-right: 23px;
    margin-left: 10px;
    display: inline-block;
    background-repeat: no-repeat;
    background-size: contain;
    background-position:center;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAAAXNSR0IArs4c6QAAAqVJREFUWAntl79rFUEQx3P6FIK/EExUJGIhiJ1Y2VgZ/wBBgoWINgoBewsLsVaQWNgIooid0U65h/LA1jQKgr8IBoOFWAlBxEQ/38fb49jszl7ubWGRge/b2dmZ787bm9vdK/4iI/+HdDtD5rEciN8YsDUybWjktdrpDaaJoig6PrDvAj2wZmmbzCOS+BqaDfsP7HdDYylb22SmKLWxEDn2bdjPhcZStmKIAl6BfCkwwSi2NnWTLGBNOAOegncgVLCYTVFih8EpcBnEE9XKROQP9kmCswl8J4B4Q1KOhKwD281sWdSI4L4RmbO0Cni2xpFTfRwjszY91Uhf+Cf7UfYNum2aBV75xUFgxbuKKLJkMm+XM+0VsCLDELJMrIpXfFsjPKX1au8g9ucAW0Q0pHxndcaVDDzi9aVr1YycN4MciYhrp34sSSVjxWYfW08mtqSplcl58dLRYoqZDNX/m+i3JkPzwbmUq7XpudjTKNfBhDO0aOeJuZqKSybD6nyA5EyKKMe4+ZhyTLAWjvVkYqvVaGU4T26BBXAfbIqR1e347QElmAeX6mNRHceYuFP7pOdwPkpWGyDmdi1Op/a4hmmjp7a1MrsH3EVtDql+3xuuur6f6zveyrFSatn76gU5YdQ1YwYsgodAJ3lS8NsLXgA93mkXgH4WhMS8A38hQnePbALfKPgYygSbeQfWVfMVTodyZAPPAXhegoMxPuumV4+ZZie+4wwQ67lfA7Gae47/k5r/cfSe4S/XrmoiJT0cqmMDXW/D60TQL8aPaQYn9B8kYsyaUazqpvqmRu+AZ6CJfMOp+qJA1594bwSaySwReNT9M7X07xlkoSGtoL69+4J+BGjVQtL/Oiids9d+pl89d3Rtghc9nyZdcXwCbp+ZQtfL4cvcP3DAtiT3J7gwAAAAAElFTkSuQmCC");
}
.i-boat{
    width: 17.5px;
    height:17.5px;
    margin-right: 23px;
    margin-left: 10px;
    display: inline-block;
    background-repeat: no-repeat;
    background-size: contain;
    background-position:center;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAAAXNSR0IArs4c6QAAA3BJREFUWAnNmFtIFGEUx1vTrKgkV7vglbarZCGEFGRCEvRkRFFBUQ8V0kuBbxVdKCOIIEgCoQv70FM9WA89GBUFBkV0eUiIdLOSIowCjbKb2e8s843fzM7sfuvuyh74+Z3vfOc75+/M7MzOBkawCVliOVmiIyojVTEdVFkIQTgUrZjCn0AKp2mIvnMCgcCg6k+tm/iNap7smMqR6dGFWI2fJSvAkS9HJkn7RP4ZWOIoxIRYIeyH55C0SQET+01SOzRCri6CeRWsA8dRZl4D5+ELGFkiMV1UaYZZLgEFxJrgESjrwzkJIVduPrEtcBviWjwxD9g5URXGl4t9LVyFH+Bn/1i4D7tgqtovI/Mw+Fo8Ma1WgcnsPga94GURgnKNDHssDhK7CEVWrYMeOXbIcZ5lg4cVEzsOlaDsL841qOMTFYIafLnfnIMBUDYdZw/MU4F4o4kYfX8/kxaoRMBW6FSL+BFoZl4C+6BLrZmOpmKeUHAnlNPwCHzwa8Dad2iDpeQ0wA0Y9svX47n6xMunaB/xWq+1RDH23iNHMDP76hl1PuIehdlmFcyzqDkFdsMLiDH90/SS1W2QZ15+7Jn0qYNbYJsuxnGzGnsb852oyIG3So1+Aa80L5O2zAoqzbWrKVWM8gCcaS+Mg0O/Dq3/iH6aJH5pHDREW9Brhy5EfLcYea7UZ1oQPYLQDw5zi5HFV5CfSUHUD0sjt3mJkZwTmRJD7Qa3CDX3E/OLhKp0C6Km3PS6VXP36CdG8h5CIJ2CqHdaCvtZPDGyR56+aTFqLYM/UtTPEokZYGNpqmqokQeP/USoeCIxkvcZzsJiXRTz5dAKnSDf9K6A452JeQnIQ/c1JDQTMarIT5wDMA3ki7ffIb/OWhnIQ/crGJufGGl8GCpA3oU2w3sQ07/ryu28FkSgvJq0g9t6CWwEudGFQP4RefWJMS8xclpW6adEfGLFoH8PkVMU82kjdgqUPcUp9KhVTzzmqLnF9JC0wGouryZyWqRpgRWTo9QmcdUAfwWEYbUW28tc9kUfvIyy7wI0aTmLmEfANreYaqvpJDLk/UiZ/IfyS4PDiK2Bb1bSEON6RwITYkHQj+hl5tEvcIzVYJtbjFx05XDXzhh13uBugBlQBvIOJNeWbnIttMB8KIJN8A7cdodAKWzXF+RUZM0vV/8BdcG7v5drdpwAAAAASUVORK5CYII=");
}
.i-food{
    width: 17.5px;
    height:17.5px;
    margin-right: 23px;
    margin-left: 10px;
    display: inline-block;
    background-repeat: no-repeat;
    background-size: contain;
    background-position:center;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAAAXNSR0IArs4c6QAAAZlJREFUWAntlr1KxEAQxy+Hng+gaGNxdlZ2NhY2omBpqQgWou3VvoBPYCNYBK4Te59BRFR8A8FKLLTzLPS3IRyTvcvs5mMhSAb+yex8/plsNol+kU5DpNsQHgkNF5luhBB5AYZGN4L+BXZSfQ/dljcMB2AJLIMT8AFUmdG8NPN5hHbMJzU3yH0Vta/YDXes78GcsGdU12QywZ6LS4tIkobtBeVaqxGCzJPS8FHxdUKQ+VYajhRfEDJaP9UXYjJqQ83ZksmbjnrOiKQYvSfWx+jmVa1VVDIcVD3OhxF4kF1Z34i1JCnMxVXXntnyKOkT41Gm43y1Y6ZzBObtathWwTn2U9tXdu2azCKFY7A/pYH5eJ4B8+GsRVxkamniW+Tfkxmwl4bAPMJCEmIymzA4BNuFmBAcgkxRDuP4KmTsP7xx0bJKFTJle+bmtWTyRtNOpp1M3gTy7O2eqTqZFVmAj6D5h+lL2xS9n8ZJV6aOdBg9IsHnWP8h9ha8myRkDawnmn4x/87PacgC910wm64nbr5kJhJDGBq1gf8ATwBOqPWfMeEAAAAASUVORK5CYII=");
}
</style>
<script>
	var List = [] /*0410 F*/
import { go } from '../../libs/router'
  import {ViewBox,Headerbar,Search,Tab, TabItem, Group,XNumber, Cell, Scroller, Tabbar, TabbarItem,Actionsheet,Spinner} from '../../components'
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
      XNumber,
      Cell,
      Scroller,
      Tabbar,
      TabbarItem,
      Actionsheet,
      Spinner
    },
    data (){
      return {
        detailData:[]
      }
    },
    methods: {
        back:function(){
            api.pageBack()
	        window.localStorage.removeItem('selectedTourIndex')//清除所选行程 /*0410 F*/
        },
        initData:function(){
           //主信息
           this.detailData = g_product_info.JourneyList
        },

	    //跳转至相应锚点 /*0410 F*/
	    setAnchor:function(){
		    let _idx=window.localStorage.getItem('selectedTourIndex')
		    let num = List[_idx] - 44;
		    $('.ay_tab_bd').animate({scrollTop: num}, 300);
	    }
    },
    route:{
        data:function(transition){
            if(transition.to!=null&&transition.to!=undefined)
            {
                if(g_selected_data.pid>0)
                {
                    this.initData()
                }
                else
                {
                    api.pageBack()
                }
                
            }
        }
    },
    ready() {
        // 获取每日行程距顶高度 /*0410 F*/
        setTimeout(() => {
            $('.detail-item').each(function (i, item) {
                List.push($(item).offset().top);
            });
        }, 300)

        // 执行页面滚动方法 /*0410 F*/
        setTimeout(() => {
            this.setAnchor()
        }, 300)
    }
  }


</script>
