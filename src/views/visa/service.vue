<template>
    <div class="page">

            <div class="page-inner">
                <div class="visa-head whitetheme">
                    <!--头部标题栏 START-->
                    <div class="visa-header-box" slot="header">
                        <x-header :left-options="{showBack: true}" :right-options="{showMore: false}"  title="签证服务保障">
                        </x-header>
                    </div>
                    <!--头部标题栏 END-->
                    
                </div>
                <div class="content">
                    <section class="ay-section">
                        <ul class="service">
                            <li>
                                <h3 class="icon-hand">专业</h3>
                                <p>中国旅行社行业首家A股上市，30年专注出境游</p>
                                <p>多使馆优秀送签社资质，尊享多个使馆绿色通道</p>
                                <p>旅游、商务、转签等多类型签证服务，出签率高于99%</p>
                            </li>
                            <li>
                                <h3 class="icon-heart">服务</h3>
                                <p>专业签证团队，每年精心服务20万+客户</p>
                                <p>提供加急、拒签全退、免担保、简化材料等升级服务</p>
                                <p>提供VIP签证服务，资深签证专家一对一服务省时省心</p>
                                <p>提供面签辅导、拒签再签等特色服务，个性化服务更舒心</p>
                            </li>
                            <li>
                                <h3 class="icon-shield">保障</h3>
                                <p>中国电子商务诚信示范企业，确保隐私安全</p>
                                <p>价格透明，多种签证套餐，办理进度全程短信提示</p>
                                <p>业内领先签证系统，实时在线查询，方便快捷</p>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
    </div>
</template>
<style scoped>
    .page{
        .ay_tab_bd{
            padding-bottom: 0;
        }
    }
    .page-inner{
        background:#0293DD;
        color: #333333;/*0217 F*/
        overflow: scroll;/*0217 F*/
    }
    .ay-section{
        padding: 160px 20px  0;
        background:#0293DD url("http://pic1.aoyou.com/app40/vs-bg.png") no-repeat center top;
        background-size: 100%;
    }
</style>
<style lang="less">
    @import '../../styles/index.less';
    @import '../../styles/ayui/base/reset.less';

    .service{
        background-color: #fff;
        border-radius:12px;
        padding:15px 20px;

        li{
            position: relative;
            padding-bottom: 15px;
            margin-bottom: 15px;
            width: 100%;
            box-sizing: border-box;

            &:after{
                content: '';
                display: block;
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 1px;
                background: repeat-x 0 0 url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAACCAYAAABllJ3tAAAAAXNSR0IArs4c6QAAABxJREFUCB1jvHLlyn8GNKCtrQ0XYWFkZIRzsDEA9FMEBa7JitgAAAAASUVORK5CYII=") ;
                background-size: 4px;
            }

            &:last-child{
                 border-bottom: 0;
                &:after{
                     display: none;
                 }
            }
        }

        h3{
            display: block;
            position: relative;
            padding-left: 40px;
            width: 100%;
            line-height: 60px;
            font-size:19px;
            box-sizing: border-box;

            &:before{
                 width: 30px;
                 height: 30px;
                 content: "";
                 display: block;
                 position: absolute;
                 background-size: 100%;
                 left: 0;
                 top:15px;
                 background-repeat: no-repeat;
             }
        }
        p{
            margin: 5px 0;
            font-size: 14px;
            font-weight: 300;
            line-height: 21px;
        }
    }

    .icon-hand:before{
        background-image: url("data:image/png;base64,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")
    }
    .icon-heart:before{
        background-image: url("data:image/png;base64,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")
    }
    .icon-shield:before{
        background-image: url("data:image/png;base64,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");
    }
</style>
<script>
    import {ViewBox, XHeader, Loading, Cell, Tabbar, TabbarItem, Headerbar} from '../../components'
    export default{
        components: {
            // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
            // 否则挂载点和组件名字一致, 即vhead
            ViewBox,
            XHeader,
            Loading,
            Cell,
            Tabbar,
            TabbarItem,
            Headerbar
        },
        data(){
            return {
                departCity: {},
                NoteList: [],
                Itinerary: [],
                Message: []
            }
        },
        methods: {},
        created(){

        }
    }
</script>
