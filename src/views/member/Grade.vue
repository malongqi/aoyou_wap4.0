<template>
    <div class="page-inner">
        <!--页面主体 START-->
        <div class="content grade-wrap">
            <div class="grade-banner"><span>游币越多，等级越高，可享特权越多！</span></div>
            <!--等级图 START-->
            <div class="ay-section">
                <div class="grade-map">
                    <ul>
                        <li v-for="gradeItem in gradeSteps" :class="{'before':$index+1 < currentGrade, 'current':$index+1 == currentGrade}" class="map-item">
                            <div class="item-title">{{gradeItem.gradeTitle}}</div>
                            <div class="item-media"><div class="zoom-wrap">v{{$index}}</div></div>
                            <div class="item-column"></div>
                            <div class="item-value">{{gradeItem.gradeValue}}</div>
                            <div v-if="$index+1 == currentGrade" class="item-avatar"><div class="img-wrap"></div></div>
                        </li>
                    </ul>
                </div>
            </div>
            <!--等级图 END-->
            <!--等级说明 START-->
            <div class="ay-section">
                <cell class="section-title" title="等级说明"></cell>
                <group class="grade-list">
                    <cell v-for="item in gradeIntros" :title="item.introsTitle" :inline-desc="item.introsDesc">
                        <div slot="icon" class="item-media"><img v-bind:src="$index+1 | level"></div>
                    </cell>
                </group>
            </div>
            <!--等级说明 END-->
            <!--特别说明 START-->
            <group class="bottom-info">
                <cell title="特别说明" inline-desc="会员等级有效期一年。到期后，若不满足升级或顺延条件，依次下调一个等级。"></cell>
            </group>
            <!--特别说明 END-->
        </div>
        <!--页面主体 END-->

    </div>
</template>

<script>
    import { go } from '../../libs/router'
    import {Group, Cell, Step, StepItem} from '../../components'
    export default{
        components: {
            // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
            // 否则挂载点和组件名字一致, 即vhead
            Group,
            Cell,
            Step,
            StepItem
        },
        data(){
            return{
                tabIndex:0,
                currentGrade:"",//当前等级
                gradeList:[
                    {
                        gradeTitle:"普通",
                        gradeValue:"0游币",
                        gradeValueRange:"0 ~ 2000游币",
                        gradeDesc:""
                    },
                    {
                        gradeTitle:"白银",
                        gradeValue:"2000",
                        gradeValueRange:"2001 ~ 18000游币",
                        gradeDesc:"有效期内消费大于100元，且消费次数大于等于1次，即可顺延一年"
                    },
                    {
                        gradeTitle:"黄金",
                        gradeValue:"1.8万",
                        gradeValueRange:"18001 ~ 30000游币",
                        gradeDesc:"有效期内消费大于1000元，且消费次数大于等于1次，即可顺延一年"
                    },
                    {
                        gradeTitle:"铂金",
                        gradeValue:"3万",
                        gradeValueRange:"30001 ~ 70000游币",
                        gradeDesc:"有效期内消费大于3000元，且消费次数大于等于2次，即可顺延一年"
                    },
                    {
                        gradeTitle:"钻石",
                        gradeValue:"7万",
                        gradeValueRange:"70001 ~ 150000游币",
                        gradeDesc:"有效期内消费大于5000元，且消费次数大于等于2次，即可顺延一年"
                    },
                    {
                        gradeTitle:"翡翠",
                        gradeValue:"15万",
                        gradeValueRange:"150001以上游币",
                        gradeDesc:"有效期内消费大于7000元，且消费次数大于等于3次，即可顺延一年"
                    }

                ],
                gradeSteps:[
                    {
                        gradeTitle:"普通",
                        gradeValue:"0游币"
                    },
                    {
                        gradeTitle:"白银",
                        gradeValue:"2000"
                    },
                    {
                        gradeTitle:"黄金",
                        gradeValue:"1.8万"
                    },
                    {
                        gradeTitle:"铂金",
                        gradeValue:"3万"
                    },
                    {
                        gradeTitle:"钻石",
                        gradeValue:"7万"
                    },
                    {
                        gradeTitle:"翡翠",
                        gradeValue:"15万"
                    }
                ],
                gradeIntros:[
                    {
                        introsImg:"",
                        introsTitle:"0 ~ 2000游币",
                        introsDesc:""
                    },
                    {
                        introsImg:"",
                        introsTitle:"2001 ~ 18000游币",
                        introsDesc:"有效期内消费大于100元，且消费次数大于等于1次，即可顺延一年"
                    },
                    {
                        introsImg:"",
                        introsTitle:"18001 ~ 30000游币",
                        introsDesc:"有效期内消费大于1000元，且消费次数大于等于1次，即可顺延一年"
                    },
                    {
                        introsImg:"",
                        introsTitle:"30001 ~ 70000游币",
                        introsDesc:"有效期内消费大于3000元，且消费次数大于等于2次，即可顺延一年"
                    },
                    {
                        introsImg:"",
                        introsTitle:"70001 ~ 150000游币",
                        introsDesc:"有效期内消费大于5000元，且消费次数大于等于2次，即可顺延一年"
                    },
                    {
                        introsImg:"",
                        introsTitle:"150001以上游币",
                        introsDesc:"有效期内消费大于7000元，且消费次数大于等于3次，即可顺延一年"
                    }
                ]
            }
        },
        methods: {

        },

        ready(){
            this.currentGrade = window.localStorage.getItem('currentLevel')//获取会员等级
        },

        filters:{
            'level'(value){
                switch(value){
                    case 1:
                        return "http://pic1.aoyou.com/app40/badge-01.png"
                    case 2:
                        return "http://pic1.aoyou.com/app40/badge-02.png"
                    case 3:
                        return "http://pic1.aoyou.com/app40/badge-03.png"
                    case 4:
                        return "http://pic1.aoyou.com/app40/badge-04.png"
                    case 5:
                        return "http://pic1.aoyou.com/app40/badge-05.png"
                    case 6:
                        return "http://pic1.aoyou.com/app40/badge-06.png"
                    default:
                        return "http://pic1.aoyou.com/app40/badge-01.png"
                }
            }
        }


    }
</script>

<style lang="less">
    @import '../../styles/index.less';
    @import '../../styles/ayui/base/reset.less';

    .icon-grade-info{
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAAfFJREFUSA29lj1rAkEQhr3V1BZ2sQoIqRMQ0khASC+Yylr9FZb5FWqdKgH7gBBshEBSC0IqTWVhLXp5383tsvehtyfZOzh2dnZmntu5/RivYPGMx+Obw+HQ8n2/4XleFe0l3SCvIa/QzoQQk263+5UWzjtlMBqNHgF6gs31KTtjbAHwoNfrvRi6kJgIBOgKX/6M9y5kbdnBjOd4OwB/R11iwOFweA/QKwwrUeOM/Q2g7X6//276hYAB7A0GF6ZRVK7ValK1XC6jQ9H+DtAHE6qBTCP+1wc8Ts6MsGazKQNPp9OCBXSD/1pX6RXqk/jP0mC0LZfLyiUka2VcqASx5YgEcjVCedYCicePaxibDI5IYLD045YJmu12q7WmrJVHBMXwuKn3+/3nEbtEdYZFE/IvFou3JZBbIa1Fx2KhJEYhSyC/jcRRB0qyBPZJNWtsplSlNYsvWSVQ5UFs62juQ/pkSS9Zeh/aAs/Yhzo0ZugzpWutcS/8cNGs3HP+CGRxhrO8gGThXBWTvIBkiaAsWOQAXZAlVynIA9dAxZBA1iDI79wVlLFVnaP3IZQdADcOoCw1GFs+GsgbGQNtaHfBWGJjXkmmnGiMWIypbnva6BJDOdgUUeocTTnW0osoBc21TFRQtiwLgpvabSFsQin/Z6n/CzrD7c/oJCPJAAAAAElFTkSuQmCC);
    }

    .grade-wrap{
        /*padding-top: 84px;*/
        background-color: #efeff4;

        .ay-section{
            margin-bottom: 10px;
        }

        .grade-banner{
            padding: 20px;
            width: 100%;
            height: 60px;
            background-color: #FF5523;
            box-sizing: border-box;

            span{
                display: block;
                /*padding: 20px;*/
                -webkit-font-smoothing:antialiased;
                font-family: "Heiti SC";
                font-size: 14px;
                color: #fff;
                font-weight: 300;
                line-height: 20px;
            }
        }
    }


    .section-title{
        .ay_cell{
            padding: 8px 0;
        }

        .ay_cell_bd > p{
            font-size: 19px;
            color: #333;
        }
    }


    .grade-map{
        padding-bottom: 30px;
        width: 100%;
        height: 325px;
        box-sizing: border-box;

        ul{
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            align-items: center;
            -webkit-align-items: center;
            -webkit-box-align: center;
            width: 100%;
            height: 100%;
        }

        .map-item{
            -webkit-flex: 1;
            flex: 1;
            -webkit-box-flex: 1;
            -moz-box-flex: 1;
            -ms-flex: 1;
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            align-items: center;
            -webkit-align-items: center;
            -webkit-box-align: center;
            flex-direction: column-reverse;
            -webkit-flex-direction: column-reverse;
            -webkit-box-direction: reverse;
            -moz-box-direction: reverse;/*0210*/
            box-direction:reverse;/*0210*/
            -webkit-box-orient: vertical;
            -moz-box-orient: vertical;
            box-orient: vertical;
            position: relative;
            width: auto;
            height: 100%;
            box-sizing: border-box;


            .item-avatar{
                position: absolute;
                left: 50%;
                margin-left: -20px;
                padding: 3px;
                width: 40px;
                height: 50px;
                background: no-repeat center url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABjCAYAAAAM/4euAAAAAXNSR0IArs4c6QAACN9JREFUeAHtnWmMFEUUx9/r2YVduYxBMAYjgRUQokZNNBqjkWjgg4sB2QU8ECQaj6yJEaMfSCTqB+MRg0QlJAbEKMsOnghBLtEoBpGAGpE9uLyirppVBNxdd8v/657e7WHOvmZ6Z6qSma6u89WvX3VVv+qpYSqiU/MmjKT/1KVEvROJGB/CR51DTMNI8TCcy0fccWJ1nBSOxL/gvBnp8DGaqYL38dqW381URfjiQtap6q6qJm6/AXVOJaWm4ngRPn5lUCjjG2LegeMOUmdv4/jnp+AviPMrfE4hlVJM9RdcC0zzkXg2wA3PmclPAua/kX09tHUNNbV+wswCODQXGkDVUDOYfuWFAPYIutu40FqQtWA+DM18lkarVby8rTNrUo+RgQNMdNN7Ic9iwDvXo1zBZmP+GQU+h+69IujuHShAVV9TC217Ed1nbLAEAiqN6ShuuQ9yU9uGgEr0fQM35VC3Xng+dXe/CHgzghIs3HL4faLBDRz/9nu/9fjWQDXnglnU2/sqBDnTrzAFzt9BhrGI17W+7adezwBV3ZRBxF24r/Q2+BGg6HnZWE5q0GJoY5cXWTwBBLyziDpxH1FXe6k0enl4F7p0LSD+6VY21wDVbTVjqIs+BLzJbiuLdno+QINoGr/R9qMbOV0BVHUTJxL3bMX05Dw3lQyYtMw/kIrdyPFmPCbm5/IGaGpeN+0qWXg2L4FYSVfnq4mGnS/b0bznSbctVc1zNl7aiLZa93lnRHp/ToDmaGsNGCV2z0sPxAqV+3vnBqvt2dLBHpQ9GrEyVSmZ0TZnax0JMMMw2+4ISuPNeg9MTJLfSpOvfIIM45Zsk+2MAK3Hs679IDXQnjCCvrgdRFWXZHrsy9yFzWfbsocnFwMK1Lk801VJCzBhVRkghoFMTQsyXM2wmKSWmdKFLXvebwcia5JKbUNhQsQUpkZNPt2emEYD2+/T8NJcE7FxcrsYipNckgZaZng6HBlLcpKoETgRy/ZoGudcHkjWQGsNIxpm+AjwShFBliiEkcP1ATRXz8wFIEes9qYSACOTVSKmD6C59Fi01bNUOaMbghVGWaZNAWit29rh+piNgIOVOYgkliJ/weAxPFs+HZcgIIv36uxzZEpjdWF53ULDy18/hJX1ikqfNWZq/rl1ygQBk5mlgdaLPpqMGwIJZmy9YtbzG/ImTardlFWmaRVVxEYZ1vt5Gp4HJWBhZ5DRO8lDZp3FJNA70cCboPJmqHZeCDBPwiCiNEAv8Mw8SjQQ9gXtvBEAOwPDxzBvuXUuYSf3QA3Qqy6AnUykNUCvAMFOurCeQHsFCHbowuqE1/xln0+pk+jCrAF61QTmE9KF5Ycp2nkj8JcMIt97y6tzYQ59TCbShzUKjwRYHZV74BGP2XU2Mo7AGqO+0iQ8ElC0z6DqoV8ge6i/aPQoXtSzKRoyZI/Bq/d34BeNB6MubeTkY2oVdjIKw6lPrKP+zp8Ab5O0FkCOvZd/Rp3SJMDGB3K0AI7qxc/lGfsRaJcngZNUfe5HktYEaL6uxWpjnpl1MuZGXr3z3z6ACSIrNZk8CbCB30ZbLsmUperHN2NCM8GO1Md0BHgnx9uut2Ose6B9poyXba8+ZiDAapkzJhkgjVwJ68yvzgTa7ySAx97Jd2C7gH6XBNB8A5356f5o7UsiwLScly7tdYYlATQjqseswPGYM5H2gwDzd6QGv3Q6ixSA5vAciy1CQv183E8LLGJ3p9tXIQWg5OHGlu34Fk3UziTAK7ip+bN0MNICNBNWnfEIIB5Jl6m8wvgn7KXwWKY2ZwTIr38ti00L8SnvrmzQA/j5f8Z1o4wAhTgmjB/jO+XGKXHl4XgLr2vLamjJCtCEVF2xFCOQbN5VZg7GlcrKe3I1OidAXnPwD9gc7kRBZdaV1WJ+87uc07mcAOUKcFPLNmjhM7muRunE82aOH8rLuJIXQBPM5DFLgHJ36UDK1BL+k6x5cKYESeGcdJbjRM2dNJZ6uvchWenuo2BwPQaOeA4UfdH5ayCycOPBo5iR39WXu/Q8q93Ak+a7AigZON7yDu6HL4i/xFwrdudocNsm1wDNCs4c8ShQfu62ssimZ+6mWMWteNb9x62MngDyyr3deLyphyYWbQNstw3Nnp6XcGPzl9nTpI91NYicXgS2ApmG6eEmzBA9XYjTyyvOOW/BftPTve437avh2A0XGzEajxen4UHUCkMB0e1e4YkEvjRQCkjsVP4ufANsox7+Dxf/egyKn0o7vDpfGiiVWldvxHx4MYoNIMe0xC88aa1vDbSRqXk1U6iHdkMlh9hhET5upKa2Wj9d126bbw20C+K1bd9iMFmA84gbHbC/PlXNDwKetD0wgFIY7Ifr8f2k+CPqTuJH0jO9bHecqT2BdWG7AmtQqXkL5zPtsMgcjdg8XtfSGKQ8gWqgCGZ1jSoZVL4JUlDfZTE/HzQ8kSlwgFKo9UhUcTN8MMZGwm0ndSkeP4N3gXdhp4iqruY6nG/BuDLIGV5YPx+hCuOKsP53KRQNtAGZi1Js5FxXsNOHcPwLZd4UFjyRN1SAUgGWA17DbPMp8RfW4UlDjKPxtgNh1htqF7YFN0fmOTVvYoY41w4L/8j3A94rYdcTugZKA8yReTQvgG9X2A1KlL+sEPCkroIAlIrM97ArjJtB85Cch+g2El32cIjlJxVdkC7srFHVja/BubyoM8oZHpAfRtEqWFjcW5a91l9wgCIoIF4OndwJ31CvgqfkY2rBBhrXoOu2p8SFGFCwLuxsAxat9wLgLHy6nOGe/fLqiVE5rdDwRN6iAJSKOd66FffDBfD6td50kKqYbi25SsmFdUUDKM3kpta1uIYP+WjyKaxT48+kDhbtubuoAE2I8dZlQPmEe4iYKDPPCcKq7L7u/hxFGUT6q+/34Uc++C9OerY/JIsPu2VAc+vxlLMpS6qCRBVdA+1WctOh5/BPg7U4P2aHpT9iQT9GV0YBnsgXGQ20Yal7Lj+DOv6ej39MnA3xLoaEeJFJYfmR92CfoFXU2Lw5KHO8Xaef4/9rX1W90hM0IAAAAABJRU5ErkJggg==);
                background-size: contain;
                box-sizing: border-box;

                .img-wrap{
                    width: 34px;
                    height: 34px;
                    border-radius: 34px;
                    overflow: hidden;
                    background: #fff no-repeat center url(data:image/png;base64,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);
                    background-size: contain;

                    img{
                        display: block;
                        width: 100%;
                        border: 0;
                        border-radius: 34px;
                        overflow: hidden;
                    }
                }
            }

            .item-value{/*0211*/
                position: absolute;
                left: 0;
                width: 100%;
                font-size: 12px;
                color: #333;
                font-weight: 300;
                text-align: center;
                line-height: 24px;
            }

            .item-column{
                position: absolute;
                left: 50%;
                bottom: 54px;
                margin-left: -5px;
                width: 10px;
                height: 30px;
                border-radius: 10px;
                background-color: #CCCCCC;
            }/*0211*/

            .item-media{
                position: absolute;
                left: 50%;
                bottom:24px;
                margin-left: -10px;
                width: 20px;
                height: 20px;
                /*0211*/

                .zoom-wrap{
                    width: 40px;
                    height: 40px;
                    background: no-repeat center url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAAXNSR0IArs4c6QAAAsdJREFUWAndmLFqFUEUhrPGIjGkCBaKEIKgpZDOdIJaWJhCCYLYWQi+RF5AERux8SnMC+QFjEIEUbvYCCrmkkIwavz+m50wu5nZ3Xv3TIbkwM/Ozsz+58tmZ+7MFHvExDGKU8eIdYhqDbyG6110EZ1FN9FTtItsQp+EQQzweBAjom0RvTfIszdhYLKNx9UYrKunzxx60zdfX+BOsJbQhf5iZ9hwfUfbS7SBtr1+g6Iovnn3rUXSnaHTBa/jNOXL6D5a8erDxZZ/0S7tq+h0+GnbWvIso68oGm2fxKotUrsbpEvoT4y4CfgtDx3Jm63/GeR9Mg7wo7rRUd0DOx8Dbvrh0ADLEgzkLyT+EUreBOzPBqFnU9f9DCVoAg71z153YoAHvEopZ2wFkwdG40g/t0FTg0q4gmuP+jysVVfrQsaAp5NFCb3hv9Q6cHSJ2ClDgk7ALqAdB+0Dv06Qz8QS2Mch4Dsm7glMgJ1BfwXtv+GFBLnMLGH9IGB/Ht4xc09jtM8n6jJupMnT3xW+SfRLnP4bvtXfOpnDNZynhu6iLuM318VkKcc0hmkafSwZK4NOdZtobkxv88dg0Z7zFToIf5ZwldqKZ4eGQbAvHJS7hoDVJmjtbrMF+Z8LpB4xYPW7lI2WxOT/XIfVvT9L5OTrnPtEAetEJmcEx1DTG9bxUZbgU50l8blQ8iZgnXXlinskngwmD41Er245+FDCSnKfR989hkqxaVpTRx3MLSXkq1iTS7DrKBptwHpQB3M665qvuBve4D2LHqLom6VtGF3Phx2ejo/8E5kt7lc4WvLrXN9DVzIWVD5Dt71GzQYaYOFv1us4LJbgfS6d1h6CRYfWBqMm7vJJdPHUVjy6xaJNS8TKqquLaaiPFbC8tRXX7nbG/Rcpa6dwHR2sZyn3ilG/YcfSdP1H4yekPdgVtL9ToGARKYAtuKIe/wHIZBZ+J4O+pQAAAABJRU5ErkJggg==);
                    background-size: 100%;
                    background-color: #CCCCCC;
                    font-size: 22px;
                    color: #fff;
                    text-align: center;
                    line-height: 40px;
                    font-weight: 300;
                    transform: scale(0.5);
                    -webkit-transform: scale(0.5);
                    transform-origin: 0 0;
                    -webkit-transform-origin: 0 0;
                }
            }

            .item-title{
                position: absolute;
                left: 0;
                bottom:0;
                width: 100%;
                font-size: 14px;
                color: #999;
                font-weight: 300;
                text-align: center;
                line-height: 24px;
            }


            &:nth-child(1){
                 .item-column{
                     height: 10px;
                 }

                 .item-value{
                     bottom: 65px;
                 }/*0211*/

                 .item-avatar{
                     bottom: 97px;
                 }/*0211*/
             }
            &:nth-child(2){
                 .item-column{
                     height: 30px;
                 }

                 .item-value{
                     bottom: 85px;
                 }/*0211*/

                 .item-avatar{
                     bottom: 117px;
                 }/*0211*/
             }
            &:nth-child(3){
                 .item-column{
                     height: 55px;
                 }

                .item-value{
                    bottom: 110px;
                }/*0211*/

                .item-avatar{
                    bottom: 142px;
                }/*0211*/
             }
            &:nth-child(4){
                 .item-column{
                     height: 85px;
                 }

                .item-value{
                    bottom: 140px;
                }/*0211*/

                .item-avatar{
                    bottom: 172px;
                }/*0211*/
             }
            &:nth-child(5){
                 .item-column{
                     height: 110px;
                 }

                .item-value{
                    bottom: 165px;
                }/*0211*/

                .item-avatar{
                    bottom: 197px;
                }/*0211*/
             }
            &:nth-child(6){
                 .item-column{
                     height: 140px;
                 }

                .item-value{
                    bottom: 195px;
                }/*0211*/

                .item-avatar{
                    bottom: 227px;
                }/*0211*/
             }


            &.before{ /*已取得等级*/
                .item-column,.zoom-wrap{
                    background-color: #E9B551;
                }

            }

            &.current{ /*当前等级*/
                .item-column,.zoom-wrap{
                    background-color: #FF5523;
                }

            }


        }
    }


    /*等级说明*/
    .grade-list{
        .ay_cells{
            &:before, &:after{
                display: none;
            }
        }

        .ay_cell{
            align-items: flex-start;
            -webkit-align-items: flex-start;
            -webkit-box-align: start;
            padding: 15px 0 0 0;

            &:before, &:after{
                display: none;
            }

            &:last-child{

                .ay_cell_bd:after{
                     display: none;
                }

            }
        }

        .item-media{
            padding-top: 2px;
            width: 83px;
            height: 21px;

            img{
                display: block;
                width: 100%;
                border: 0;
            }
        }

        .ay_cell_bd{
            position: relative;
            margin-left: 16px;
            padding-bottom: 15px;

            &:after{
             .setBottomLine(#DFDFDF);
             }

            & > p{
                font-size: 17px;
                color: #333;
                font-weight: 300;
                line-height: 25px;
            }

        }




        .ay-label-desc{
            display: block;
            font-size: 12px;
            color: #999;
            line-height: 18px;
        }

        .ay_cell_ft{
            display: none;
        }
    }

    /*特别说明*/
    .bottom-info{
        padding: 0 20px;
        width: 100%;
        height: auto;
        box-sizing: border-box;

        .ay_cells{
            margin-top: 0;
            background: none;

            &:before, &:after{
                   display: none;
            }
        }

        .ay_cell{
            padding:5px 0 30px 0;

            &:before, &:after{
                   display: none;
            }
        }

        .ay_cell_bd{

            & > p{
                padding-left: 20px;
                background: no-repeat left center url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAAfFJREFUSA29lj1rAkEQhr3V1BZ2sQoIqRMQ0khASC+Yylr9FZb5FWqdKgH7gBBshEBSC0IqTWVhLXp5383tsvehtyfZOzh2dnZmntu5/RivYPGMx+Obw+HQ8n2/4XleFe0l3SCvIa/QzoQQk263+5UWzjtlMBqNHgF6gs31KTtjbAHwoNfrvRi6kJgIBOgKX/6M9y5kbdnBjOd4OwB/R11iwOFweA/QKwwrUeOM/Q2g7X6//276hYAB7A0GF6ZRVK7ValK1XC6jQ9H+DtAHE6qBTCP+1wc8Ts6MsGazKQNPp9OCBXSD/1pX6RXqk/jP0mC0LZfLyiUka2VcqASx5YgEcjVCedYCicePaxibDI5IYLD045YJmu12q7WmrJVHBMXwuKn3+/3nEbtEdYZFE/IvFou3JZBbIa1Fx2KhJEYhSyC/jcRRB0qyBPZJNWtsplSlNYsvWSVQ5UFs62juQ/pkSS9Zeh/aAs/Yhzo0ZugzpWutcS/8cNGs3HP+CGRxhrO8gGThXBWTvIBkiaAsWOQAXZAlVynIA9dAxZBA1iDI79wVlLFVnaP3IZQdADcOoCw1GFs+GsgbGQNtaHfBWGJjXkmmnGiMWIypbnva6BJDOdgUUeocTTnW0osoBc21TFRQtiwLgpvabSFsQin/Z6n/CzrD7c/oJCPJAAAAAElFTkSuQmCC);
                background-size: 14px;
                font-size: 14px;
                color: #333;
                line-height: 20px;
                font-weight: 300;
            }
        }

        .ay-label-desc{
            display: block;
            font-size: 12px;
            color: #333;
            line-height: 16px;
            font-weight: 300;
        }

        .ay_cell_ft{
            display: none;
        }
    }


</style>