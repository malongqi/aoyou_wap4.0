<template>
    <div class="page-inner">
        <!--页面主体 START-->
        <div class="content coins-warp">
            <div class="coins-kv">
                <div class="kv-title"><em>{{currentCoins}}</em>游币</div>
                <div class="kv-tag" @click="goCoinIntros">
                    <span>游币说明</span>
                </div>
            </div>
            <div class="coins-details">
                <group v-if="currentCoins > 0"  class="details-list" title="游币收入明细">
                    <cell class="item" v-for="item in detailLists" :title="item.YouBiTypeText" :inline-desc="item.YouBiDate">
                        <p slot="value">
                            <span v-if="item.YouBiType == 1">+</span><span v-if="item.YouBiType == 2">-</span>{{item.YouBi}}
                        </p>
                    </cell>
                </group>
                <div  v-if="currentCoins == 0" class="null-info">
                    <div class="null-media"><i class="icon-no-coin"></i></div>
                    <div class="null-inner">非常抱歉，您还没有获得游币</div>
                </div>
            </div>
        </div>
        <!--页面主体 END-->

    </div>
</template>

<script>
    import { go } from '../../libs/router'
    import {Tab, TabItem, Group, Cell} from '../../components'
    import store from '../../vuex/store'/*0228 F*/
    const commit = store.commit || store.dispatch /*0228 F*/
    export default{
        components: {
            // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
            // 否则挂载点和组件名字一致, 即vhead
            Tab,
            TabItem,
            Group,
            Cell
        },
        data(){
            return{
                currentCoins:"",//游币数
                detailLists:[]//游币收入明细
            }
        },
        methods: {
            //获取数据
            takeData:function(i){
                // this.$http.get('/static/member_mycoins.json').then((response) => {
                //     // success callback
                //     var data = response.data
                //     this.currentCoins = data.YouBi//游币数
                //     this.detailLists = data.YouBiViewList//游币收入明细
                // }, (response) => {
                //     // error callback
                // });
                var vm=this
                var useCache = true
                var useProxy = true                
                var memberid = api.getMemberId()||api.getQueryString("memberid")
                var param=JSON.stringify({memberID:memberid})
                api.post({
                        path: api.config.microServiceHost.memberurl,
                        controller: 'CrmMember',
                        action: 'GetYouBiInfo',
                        param: param,
                        useCache: useCache,
                        useProxy: useProxy,
                        callback: function(obj) {
                            if (obj.ReturnCode == 0) {
                                var data = obj.Data
                                vm.currentCoins = data.YouBi//游币数
                                vm.detailLists = data.YouBiViewList//游币收入明细
                                commit('UPDATE_LOADING',false)/*0228 F*/
                            }
                        }
                    })
            },

            //跳转游币说明页
            goCoinIntros(){
                this.$router.go({path:'/coin-intros'});
            }
        },
        created() {
            commit('UPDATE_LOADING',true)/*0228 F*/
        },

        ready(){
            this.takeData()
        }
    }
</script>

<style lang="less">
    @import '../../styles/index.less';
    @import '../../styles/ayui/base/reset.less';

    .icon-no-coin{
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF8AAABeCAYAAABFEMhQAAAAAXNSR0IArs4c6QAAEOBJREFUeAHtnQmQVMUZx9mDBeVSWbGioq6KLCDCAhpNNKKoCYpXAK9YJaVENBFLE89EJcSqHJRa8SCJQVdRKVGIeFHBxEXIpSDnciwrIiJe4VjklF1gye8/vjf75s07Z97MzrLTVU13f6/7+77+f/2+Pl7PUtAmB8P+/fuLqquru+7bt68U9Q4nKu3S2NjYrqCgoB35Euoo30i+gXw9+XrySuuIm8hvLCoq2tS3b9+vKO+nnHOhoDk1Wrp0aYe9e/eWo0MvMwJkb/InEIuJUYRdMKkl1mCElUoVkfPhoEGD9pBvtpA18A2gzwSAs+l4hUAm3500azrYUN5L+UMZhDift2rOwIEDF5IXPSshox1fsmRJBSP7cjp0PiAPokdRjeaMgIOeO2D8b3SdVVhY+OqAAQPWZUSQwTRy8BcsWPBtOnE1/C+jE8dmUvks8F6EEWYwd0zp16/f2qjlRQI+gJcC+LWAPRoF+0StZHPzo2+asGeTPtWpU6cZPXr00OSedkgLfFYkxzc0NNyJFqOI7dPWxsKAjn6FMbVy2UG6nXQ76Q4jVVn0ItKOpJ1IO5F2NFKVRddK6WAL27Sz8N0Ak0fhPZEJe2s6DFMCf+HChScifDyCryQWpaoAHWmg7Rp4aTVSyyv+AbRalpi1dEzLxbQCfAuWL19+9J49e3qSj0UY9kTGSaTHQCtMQ8A22v6R+LtUjRAKfNxLF4Tdj/JjUbwkrOK020mbf9G2qri4uAo/Wg1tX1g+UdRfv379QRs2bDgDXkOI56LTqaSpDKRNDJr7KyoqJoXtS2DwAX4kzCeipF7loEHAvku7KtIq2r7X3GtrN8VXr17dedu2bWfzXMbQ6kz7jcCBPlZjhOswwpKgjXzB12iH8RMoc21gpgUFC6g7pX379lP79OnzZdB2uVSPZXIf1v4/ot/XEAOt2sBJu+1x7BcmkNfu2zN4gr9o0aLeKPAmHMo8uXzzcDcCX8T6j4WxfgC+zVoFMAswxFBwuBVFLlDZTyFweJt6I/zmAldGAH8eAqcjSH7eNSBoJ4KeoMJDCEt7knQVlAMPWGjoGOQB4pV+RgCXlcxrw7z2B47gI2QYzGcgxGtHug8Bf0LAgwjQ8qvVBFxxX/o+AYx+4NPpL0pKSs485ZRTPnKqlwQ+wJ8F07eofJBTA9EQ/D51bmKkL3Kr0xroeIcR4KA1/5Ee/RXwZ4LVF/Y6CeAvXrz4ONbYmq0dXQ2ga6f3G848xpFvliWivQPNXV6xYsVhu3fvfhYDXOymC1gt5PkZGCDhFDW+yeBhIT7+ORi4Aa9DpwuZye/LA98EM6u5OjC5BMovmqiJObAdCOXBRCoexCTgbm6n0iNm2ZZu5nBpKKuY9230fNGCAG7oBgbwk5CSNmsM2EZWgqdbMYyNfCYQnX/cY+Fjze6mcJG1kfVhPt+EAO74aUC+rYnSlDM8y/gmSps2MfBpMIaH3awPLHlNrPMs5XzWAwFc0BPgWelUBYyH4mHkgmIhBj7Eq0yCNYVJFcBPttLyeX8EcC8/B7uNLjXjWBfyea8bFXWolBTw866TSFLlPCGOAC5ax+ET4gRLBvows1jIZ77TIMQnXvMBaW3//v3nW8r5bDgEpjCoGx2alOsQT3S5nW85VBAp7+ddgAlCNjZVnzjV3bVrVwzzQka9I/jQ3SZgJ355mjMCnzuRWY6Wis7cUFjvVIFX5ntO9DwtFAKO3z7A9itxKSTzPyd20L0O1Zya5GkWBDiqOQTvcZyFFM+2bds2ds4jn78iTrVkaFjC5ku3yfIhBQRwLSNp1tah6Sc6khBdPv8zhwoxEqN/nNuzPN0dAVYz7cDV7cRgptkytskyC/YUBlfx+pxvp+fL3ghs3br1Pmoc71SLAa0PVLHgCb5qcMQ8FfdzwjfV8//6IQBWlwHwL13qzeP4Ybb5zBd8Kh4Gs1mc2AX6iGwybo2pPr2C1Qt4DKdNqz5C/cqKSxDw28BMl6T+w1HEydbG+XwTAoz4kWA0k9ihiZqQe45RP8tKCQS+GsD0KG5+zeNUbpSVQWvPA3pbMNF3kJfByPEiGSP+4y5duoy1YxUYfKPhwQh4BmEvIdRxZ2wXcCCXdTwMsO+Cye0e/azjgHIYl2t1vTAhhAU/1hhhV5CpwQC38g3T0doJUg6wQk1NTVf6/hjdmg8W8fN5ezcxzE5oF3JA6biXKmCSOJINQdJan4Y6Fu1IY8+dLvXWER/kGHUyadZ+1WHvaDbK2rWy+vsZsvS1qpOXTLDQdZpL8fPvudXzAv9zGFyHYbQudfyobmP6KWXd2p3Eid4m27MWXWSh0ZOj91voxChjQHr2B9xWcmamT68fe1X0BB+rHcXrdQLMnkPod7wYWZ7tJq8LV1OIf8cQCdclLPVyOmtcnB2Okrqjeg79d1w+2jsBVpUdOnS4rby8fLv9mb3sC74aILgI93Q32XHkw/j4TSiju566uzjbOOMWy5wMDLRy9B2CrtrVf5/YPqiitNvAaL+R0f5a4DYePv9zjXwrI2b3Eyk/jHKXWOlB8yi4krZVzP66Mj5Xn9uCts1EvWXLlnWvr68/V4DDX6B73TxzU0Fv9uP0SfNeqP4EGvl2qRhMiv6WeKr9WYiybrzpp5i1pLXwiv0qhbuftVHe/YRvARPlMcxdPRmZPSn3RJ6Zdg+hb0JV9NbtvVfgeS+gr054GLCQEvgmb8MI99IhjZzIAh3TCFKHdPSqm3L6PdZ2OroDEGO/zxKdekWUO0LX77G0+tDqLJbnmX6TdQTlHsTA7oO6fmEPvKfA+/e40VV+lb2eey4jvRrqGZeE5D6q9HtblmCjyeuHBIfoWTrB4JH0VgF0jC3PE1KTbpVp1rHS0skD+MfwrOTNrGTdnrQ0T4V3WuCbAlFmMfmf8junO/id03CUvBpl5ZramXVaYkofttCHN3iznse1VFH+xuoRdQZDFnfl55xO7Lo6Eb1o3bt3/5rnLyiuWrWq086dO4eSv5woQxxO2hLCGkD+G/FVAJ9LmrGNo3x+P17bJXZUELqf9WqXIOtVe1t7GeAL+M1uHzYqZ5MfzPMK+JeRT+l4w84/1TI61KPDB7SfT34OA3EOk/2nqfIL205ux/FaG0oVcL/kHJ6/Hpapvb4MCW25ESfq+dq1a9tv2bJFK49eigyAWErdk5AdZi8hdn5Bk/Qq+GrnWUNl/QWSGtzlR6RadTVL8PT5KDsKrdIG36lnZWVl2gkvNWK8CjK1oSsDJK1USimXYhi5LP0qUnOI+bd22vGsEZquvuhXgPpbO7tJt9B2I3lt8HTM8VlUEyS8Ig2uS01Dyh46chSrGse3I1JNWiEzP5/blpF0RyvEJStd9gNfStzGOv6krGjTyoT4gs/IL2GV8jhpoFO9VoZfWt31nHAtnC/gUO1RyrdaaC0ma5zHn8oEvIb5691sK85p6cHIHkJsR5gdv7EWQpGxMHkgRP2cqMqguZM3V6epz7Nq+i/l6VrmZks548ZHNfJfR/40fjZaw0Ff7OjE1+3YlBzPMjDpK7ytTs4U6WQPOq3T13g/yQ+vq6t7IxsGEPAYXpek4pfOkN+Nc7C/CKS4UkERw3qPMXqe1qsUtE1z1UPXAcgusssHgPNkAP3NHfuzqMom8MhKOlbB/fTTxQMv8F13fjC8HiWX8RaMiErZTPBBT9dzdhmAQ8DXM2EAL+CNfq7D7ze4gs/majMW2uIByvHyYbwB8zCCTjJdeXnwyOgjztsX0Yfn3YRkwgB+wKOPjlp0A8Ld7aDYXiqeQ/Tb3Z6GEabjij7AED9BuNt1OTcMMkrnDy6Npg9vuAmJ0gABgb+Zz7O6YOAOvh6yLFvKSd9ZKL9SZZ+gSWUiVwq/wBBP8jYM8qmflcd6vTHAiEwbIATwT5od93UVHLHq+6rWyJVmI59Un/Fu5G14nzdhGfEBdsh9fNpk9LHFAK6HhOm8AfSxr1Y18EiaXNUxsJOruYkRHwc+RmeEut1YS7q9wNLtQkB9CCE6/g0b9KH8LeI7/AGgufwBIK/5JCzvQPW1wmCdPQ39XW9fAFRVt27dLjY+DPnyFfBqEwD42PLSytD1VBOGSeCrIUKKcSs/JnsP8RjRwgZ4N8JHHzFkkFWUFWtxcasybZQoDSDg0V/r+FJiUqBP5ohPAl6VQ4NvSjCMoAuzOvWsMOnppiisCX4d/LeQrzPSr0kboOvmwGZe3z+kIwfQ2sJnOjxTfgPSBV76pwy+tfO8CfqjoDfRoUtJo/4KZRWl/HqWkCm9cVZGMgDlacRLrXRrnv44uqCAwI9hkEyy8rPnfSdcewOnMkJ0FfAKlD2a53oTVjjVyyUa+u5Bn5HE19z0YiANYSOWsBOOCnjJjGTkOynP29ALY2jzpT8C18+pToq0SEa+KTvgGzCbSXgYhtBZke4qefl43xFvytatgr5cHak2CWYKcPWM6EhO/1gDH81hkm76ngv/waTHmXJSSCMFX/IDGmAeemsvEwnwkquRn/GrIxJkDXS2C+Vyh6jOyRd7hcjBl7AgBnBTioGKXfbfiCt7yq2OE72YdftqGm+mccIlKcqRXR2xC0bJrdDmGTH+GJlaxh4LoRSdDqV8GPlDyOvWglYomsx3ESMPmgMwgOaAl4mXBRWATqgZHnjxj30aROgU8tfYBcJ4Bq7nh3b6gVw23oBABkgHeGEYW+3AxHHGx6LDcEuOW+YD1QDGKkj7F22eXIOAZx67JayrsTKMgd+5c2eBr+vY9tAqr45wnN4bIDxXaAzMAuqN4E1J+aNSDHzjP2CR63EKrerqiLEA0XIyYQ50AgaarlO+maoBYuCLMVbUH+TUWURCwMKt5upISOBNnFI2QBx8nd3D7QWToy01r47YyAdO0Q94p4Fp6b0MMDPsGxAHX4z46HAXyXblHUKLvDri0I8kUkDgx2CAGUmNmwiDyYYyQAL4fHT4Ega/buKXlBuPoi3m6kiS9g6EIMAD+mgdkuGCr4zSALF1vlUnY537DrTvWunWPApUoshYllkZ2fBYZWUyz8eh/iwX30aG4+RKP/cLeFxypamH8IE2lf577X/mUP8iP3ySwJcQfp96BL9PXUBWp5Ru4SMm6btRbLpbhVympwK82Z+oDOAIvoTw3VW/MNTnsUNNoS7pfIwwgd8vzWBENLrUySmyAbyWkzq+SApGP+Rqnkl6aBDApRiX9ZLXGwCfuXydu4jv4Dud+LiCr8ryhzD/BzHILncNTR7hb0ZOdhPmpEC2aVEAb+qcrgE8wZcQjoP1FzdeQZB2fUGCfv/0InESLkmuK2dClMCbnTIMoDlguEmzp25vgC/4YqT1Kwx0R/96O2Of8nKeT+PV+yu/i1rhUzejj+VGGUSaXFN2NW4KpmqAQOCbQhk5LfLqSEDgb8DHP2v2NWyaigFCgS+FJKQlXR0J6GrSAt40VEAD/JN6Q7UMDQ2+VRBG0NGrPphXmPR0U9xbZFdHmK86cH1xGTqVOemFLK3OIgHe5B/EANT9M+DfnDL4pjClGCEnr47ITbJcnmnV1cxnAniTt+EdXqQ8wqTZ0l24uM4Jxwu2CoGLMMrJqyN8InXsn4AHoOvT8fFe4MB/L7yvpo7bBjQ26B2V82Ls9Yyl5UZep4eJJ6NAbzZf95PqtLRZAgeFcxD8iVW4CTw6TrbSo877GED/n8q+SNyOn+LNeXUEl9iLUT4RHU8n6i9b3cWonOWnc1TPjTngPtIx8CxB/lSW3ndpI5oV8O0dYd+Qc1dH7Dpmo9ws4Lt1TKOEkep7dQT39ogbj5ZE/z8SHP3N6ilqiQAAAABJRU5ErkJggg==);
    }

    .coins-warp{
        background-color: #fff;
    }

    /*kv部分*/
    .coins-kv{
        position: relative;
        width: 100%;
        height: (150rem/20);
        background: #FF5523 no-repeat bottom url('../../assets/wap/coins-kv-bg.png');
        background-size: 100%;

        .kv-title{
            padding: 30px 0 0 20px;
            font-size: 14px;
            color: #fff;
            font-weight: 300;
            text-align: left;

            em{
                padding-right: 5px;
                font-size: 40px;
                font-weight: normal;
            }
        }

        .kv-tag{
            position: absolute;
            top: 15px;
            right: 0;
            padding-left: 11px;
            width: 70px;
            height: 25px;
            background-color: #E8B451;
            border-radius: 25px 0 0 25px;
            box-sizing: border-box;
            line-height: 0;
            overflow: hidden;

            span{
                font-size: 12px;
                color: #fff;
                font-weight: 300;
                line-height: 25px;
            }
        }
    }

    /*收入明细*/
    .coins-details{
        padding: 0 20px;
        background-color: #fff;

        .details-list{
            background-color: #fff;

            .ay_cells_title{
                padding: 0;
                background-color: #fff;
                font-size: 19px;
                color: #333;
                line-height: 60px;

            }

            .ay_cells{

                &:before{
                    display: none;
                }

                 &:after{
                      border-color:#DFDFDF;
                      color: #DFDFDF;
                  }
            }

            .ay_cell{

                &:before{
                     border-color: #DFDFDF;
                     color: #DFDFDF;
                 }
            }

            .item{
                padding: 8px 0;

                .ay_cell_bd{

                    & >p{
                           display: block;
                           font-size: 17px;
                           color: #333;
                           line-height: 24px;
                    }
                }

                .ay-label-desc{
                    display: block;
                    font-size: 12px;
                    color: #999;
                    line-height: 20px;
                }

                .ay_cell_ft{
                    p{
                        font-size: 19px;
                        color: #FF1616;
                        text-align: right;
                        line-height: 44px;

                        /*span{*/
                            /*display: inline-block;*/
                            /*padding: 0;*/
                        /*}*/
                    }
                }
            }
        }
    }

    /*无信息说明*/
    .null-info{
        padding-top: 80px;
        width: 100%;
        height: auto;

        .null-media{
            margin: 0 auto;
            width: 50px;
            height: 50px;

            i{
                display: block;
                width: 50px;
                height: 50px;
                background-position: center;
                background-repeat: no-repeat;
                background-size: contain;
            }
        }

        .null-inner{
            margin-top: 30px;
            font-size: 14px;
            color: #999;
            font-weight: 300;
            text-align: center;
        }
    }

</style>