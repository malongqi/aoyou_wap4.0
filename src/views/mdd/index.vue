<template>
    <div class="page mdd">
        <view-box>
            <header class="mdd-head" style="background-image: url('http://pic1.aoyou.com/wap4.0/index/bdbg.png');">
                <h2 class="title">目的地</h2>
                <div class="ay-search-box">
                    <div class="ay-search-form">
                        <a class="search-input" @click="goSearch">
                            <i class="icon-search"></i>
                            <span>目的地/主题/关键字</span>
                        </a>
                    </div>
                </div>
            </header>
            <div class="page-inner">

                <div class="container">
                    <nav class="nav-list">
                        <ul>
                            <li name="mdd{{$index}}" v-for="navItem in navlist" :class="{'active':$index==index}" @click="selectNav($index,navItem.listguidAndType)">{{navItem.title}}</li>
                        </ul>
                    </nav>
                    <div class="content">
                        <div class="hot-dest" v-for="listItem in homeAdvs">
                            <h3 class="dest-title">{{listItem.spaceName}}</h3>
                            <ul class="dest-list">
                                <li  v-for="adverItem in listItem.advertises">
                                    <a v-bind:href="adverItem.Url" class="dest-item">
                                        <div class="dest-img">
                                            <span v-if="adverItem.adDec " class="dest-tag">{{adverItem.adDec}}</span>
                                            <img :src="adverItem.picUrl+'?imageView2/1/w/105/h/70/q/90'">
                                        </div>
                                        <p class="dest-nation">{{adverItem.adName}}</p>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="hot-dest" v-for="listItem in homeKeyWords">
                            <h3 class="dest-title">{{listItem.keyWordTypeName}}</h3>
                            <ul class="dest-list">
                                <li  v-for="adverItem in listItem.keyWords">
                                    <a v-bind:href="adverItem.linkUrl" class="dest-cell">
                                        <span>{{adverItem.keyWordName}}</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <tabbar class="ay-demo-tabbar" icon-class="ay-center" slot="bottom">
                <tabbar-item name="hometab" v-on:click="clickTab('/wap.html')">
                    <span class="icon-index" slot="icon" ></span>
                    <span slot="label">首页</span>
                </tabbar-item>
                <tabbar-item  name="mddtab" class="fix-select" v-on:click="clickTab('/mdd.html')">
                    <span class="icon-destination" slot="icon" ></span>
                    <span slot="label">目的地</span>
                </tabbar-item>
                <tabbar-item  name="findtab" v-on:click="clickTab('/find.html')">
                    <span class="icon-find" slot="icon" ></span>
                    <span slot="label">发现</span>
                </tabbar-item>
                <tabbar-item name="visetab" v-on:click="clickTab('/visa.html')">
                    <span class="icon-visa" slot="icon" ></span>
                    <span slot="label">签证大厅</span>
                </tabbar-item>
                <tabbar-item  name="mytab"  v-on:click="clickTab('http://mmy.aoyou.com/')">
                    <span class="icon-mine" slot="icon" ></span>
                    <span slot="label">我的</span>
                </tabbar-item>
            </tabbar>
        </view-box>
    </div>
</template>
<style lang="less">
    @import '../../styles/index.less';
    @import '../../styles/ayui/base/reset.less';
    .page{
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
    }
    .mdd {
        .page-inner{
            position: relative;
        }
        .container{
            position: absolute;
            height: 100%;
            width: 100%;
            background-color: #fff;
        }

        .ay_tab_bd {
            padding-top: 110px;
            padding-bottom: 50px;
        }
        .ay-tab .ay-tab-item {
            background: none;
        }
        .ay-tap-active:active {
            background-color: transparent;
        }


        .mdd-head {
            position: absolute;
            width: 100%;
            top: 0;
            padding-top: 15px;
            height: 95px;
            background-size: cover;
            .title {
                color: #fff;
                font-size: 19px;
                text-align: center;
            }
        }
        .ay-search-box {
            padding: 15px 1rem;
            box-sizing: border-box;
            -webkit-font-smoothing: antialiased;
            .ay-search-form {
                width: 100%;
            }
            .search-input {
                display: block;
                border-radius: 50%;
                display: block;
                border: 0;
                border-radius: 30px;
                font-size: 14px;
                color: #444444;
                text-align: center;
                padding: 4px;
                background-color: #ffffff;
                opacity: .8;
            }
        }
        .nav-list {
            box-sizing: border-box;
            padding-left: 20px;
            width: 30.66%;
            background-color: #F5F5F5;
            position: absolute;
            overflow-y: auto;
            top: 0;
            bottom: 0;
            li{
                position: relative;
                height: 80px;
                line-height: 80px;
                color: #333333;
                font-size: 17px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                &:after {
                    content: "";
                    display: block;
                    position: absolute;
                    width: 40px;
                    height: 1px;
                    left: 0;
                    bottom: 0;
                    background-color: #DFDFDF;
                }
            }
            li:last-child{
                &:after {
                    display: none;
                }
            }
            .active {
                color: #FF5523;
                &:after {
                    height: 2px;
                    background-color: #FF5523;
                }
            }

        }
        .containner{
            position: relative;
            top:0;
            bottom: 50px;
            width: 100%;
            overflow: hidden;
            &:after {
                content: "";
                display: table;
                clear: both;
            }
        }
        .content {
            width: 69.33%;
            height: 100%;
            float: right;
            padding: 0 20px 0 10px;
            box-sizing: border-box;
            overflow-y: scroll;
        }
        .hot-dest:last-child {
            &:after {
                border-bottom: 0;
            }
        }
        .hot-dest {
            &:after {
                content: "";
                display: block;
                border-bottom: 1px solid #dfdfdf;
                margin: 17px 0 17px 10px;
            }
        }
        .dest-title {
            padding-left: 10px;
            font-size: 19px;
            color: #333333;
            height: 60px;
            line-height: 60px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .dest-list {
            li {
                position: relative;
                float: left;
                width: 50%;
                box-sizing: border-box;
                padding-left: 10px;
                margin-bottom: 20px;
            }
            &:after {
                content: "";
                display: table;
                clear: both;
            }
        }
        .dest-item {
            display: block;
            height:;
            &:nth-child(2n) {
                margin-left: 10px;
            }
            .dest-img {
                img {
                    display: block;
                    width: 100%;
                    border-radius: 6px;
                }
            }
            .dest-nation {
                font-size: 16px;
                color: #333333;
                margin-top: 9px;
                height: 20px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
        .dest-cell {
            display: block;
            height: 30px;
            padding:0 12px;
            line-height: 28px;
            border: 1px solid #999999;
            text-align: center;
            border-radius: 100px;
            color: #333333;
            box-sizing: border-box;
            overflow: hidden;
            font-size: 14px;
            span{
                overflow: hidden;
            }
        }
        .dest-tag {
            border-radius: 2px;
            background-color: #BF956A;
            color: #ffffff;
            font-size: 12px;
            position: absolute;
            right: 5px;
            height: 18px;
            top: 5px;
            padding: 0 6px;
            line-height: 18px;
        }
        .icon-search {
            display: inline-block;
            width: 15px;
            height: 15px;
            vertical-align: -2px;
            background-size: contain;
            background-repeat: no-repeat;
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAu1JREFUSA21VrtuE0EUZWetdWGloA0USAE5PxFAovNTdpOCNBRQ8gkgfwEfkEhpoEjjyK/SEo8qNUICR5EogJYiRWTLa3POau5qMt438kirmZ05j3tn57HOnYTS7XbvLxaL9mq1qgO25zjOLuHr9foPqiul1MTzvEG/3//F/jzFiQK3Wq3d5XLZg9ELmLhRGOkDxgfmtFQqvR0OhwwoU9kwrtfrLTDfQ2wnk4IGIYBrNI8mk8kwC0+ZoFqt9hrv56YpBKeY0lfIaL9SqezwYZt9HBO+5pxrDemOrcOMdaY0DYKB6CXEX45Go0+xbAw0m80nWAPH4D0iDrwVqk5a5oExv6nv+98lU5C/gNwG+S/F0gqCvgvMAPwDYsG/dl13P+mbB9lxIRmml+BmNqWRDrDNWeI7tajJdlxxuGXm8/lPgIPVi0ifpk1vnBinHTP3keMIwi+Xyw/itpriPhVTgKdFTWlGLjXYpia12Y4qSh8OwRhIZ1GgPH2mhqlta/Ab70knVvFnaRetLY1Q29ZTiDA4BjmAb/LbBuR9NzVMbVsnWNV25/+8Y6GGZ0OSjsIiCM9XkO4lgTOOhTNoattcZnwlnVgMj6VdtLY0Qm1bD2tBTaQTER5Ku2htapjatp7ifYpF4HMApGc8BGxQ1ndyqUE8Nakdx1U8WQA+FQCm6lifvdKVqSaHXAFTM+7UIiZY1bzEESHvU2bNW2aQx9y4JOSGuqEm9eJKYKxvkSOY80qj+QGqiyzTrjEXmiM+HrKnRmy5ted4icP8HUTC/Y33KZ4znkhyOHDbcfUCd4gn+Ka2Azg+nufj8TjyGL5lTDKmreivzw3oHgJxJYgk8zAzAfPPgZc43k9IlP64WmNOwHnIDE0Og8DzodFobGzTjYxNgyK/tzShWVrmicZmEHnaWczD75FHOA07m82+VavVH8B18MjnZN1hP8e3krEElpT5VjIW44TMv27VmAHY5jgPetg5PQlu6zWnHWfEGzH6BybCi/k5ipQCAAAAAElFTkSuQmCC");
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
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAAAXNSR0IArs4c6QAACHpJREFUWAntWWtsXEcVPnPvvhx782ghDg1N2hBaHEFRVdpSWiihifKAOGlMvd6XWa8tq3kJhGihPFQDrVoBwoSU4Jh4d2PvwzZxmwTFqasCDSkoSkuQgCbUjSgJNIkb23UTP3a9e+/wzV1f+2brR3bXPwAx0t2ZOWfmzDfnzJw5M0v0X5JYvjj9fr99JME3KiptJEYfg7wbiBNjxM8je01i7JDNMvdAKPSTgXzGyhloe3u7/OyBI9tUTt8m4u+fDgRQv0Nceqrk1iU76+rqRqdrOxUvJ6Au15YFKR5vA8DVQjCA/B6/EZLllwrN6r9sNhu/fDm+OMXpM5xzJ76VGgDGXi600uZgMHhpKkBT0bMGunXr1qLegZE/EOfCzBclWa5pDTcdnmoAQS93+VcRqU1YEksYY2/IZLs7Gv35O9P1yeRJmYSZ6n0DI2ENJGOnbGbbJ2YCKeS1RwMvWmXbnQB5Etr9sELxdiyBrMbOqnG5s3oTBhKbps9EbENzc8NbM01M57e0NLxtNVlL0fcCZKz6W/c/3TrvWvKsTF/uqnoN2lwhSdKW1kigwTiA01n7Pk7Jr6pEdwOMzBg/YWaW+nC48YKxncPld3OuhqHdsyW3LF0GzaLLzOmagHq9XytMqP0Pk6r+iBE7X3Lr0qUYIKWLd7hrPsl56iDW4EKdls5ZP9ZwWWt470s6HdpkDre/GxNeLpP06Vgs8LLOE3llZe2ShJLazFV+Dya7mDg7fv2CgropgdbW1s67MpTcAP+4Gbt7LWQUaAIZNbRHQ1u0Mn7EJEaVvj8DwDJUD8sm9mNKkaIQbUe/L4L21hzr/I8a/ajD7fsBV+kRJtHTbZHQYx5P9fKUqpTB75ZBzp267ImcHTJNVNKDJpX+Ck68bODK6APgWcb4HO6nBwMXS4xeMfYZVXrXc07LYO4TK265qdRgyqMOV9VvMPDKeHIAk6XAeD8+JkOlDQ6nb/2ootyW5mEYYoP46ZRlOkAKnceEX0R9zTjQCpe/NpHqewJgdOetYB39Fl8HWek5Hud7AWgdHPzFtND0L+PsdkxMONMDBpB6k2dRWAlr364TRA5NXuRAwBl9BF1lTHIApv0VOB0FlqVdoVBdXG+PfTGCZWLXgMLPPaly9ZuaEGLHAG4f46aDsWhjr97B4fKJmUImEyaeSIwuCZz4Fk0Qx0oMtDTvKgePyUEGGJydlmXpEfsc+deNjY3J9/Q3EEyaM9ZAsoQk0ZdaI0GcOO9NnLFXMbOHwLkP3zN6Cy7RUZgIE+DVDk/VvrZw8KTgud1VK5KcbxNl+MCjIteTovJ7RRmaPRgLNz2v06fLseR4WpOMf30qkEKAVZJ/iUyB+TdVVFXdqAsVwJjE9oBeSCodx7p8Hl9nivM/QmnzYZ1oLBYcB1pZue16LJMK0d9EfFKl6LKNuYQBtF1mYvagkZFZbmnZ+ybO9FbYy6rG+XeM/IXXFX1Z7GBsHMjja/Ctg1wrQO68oXh+jbFtIjn8qFhz4HVGIqG/GHnTlWEVXiQaRCK7Lk/XUOPJ8tMYAA6aVQnT6u137dqVEG7GZi4shrbWMklabzXZFrVFg1+pr68f0dsJS2ADbRd1ibOndPq15AB67amtpemv0MZPMTkT1l8zdvm41xBSmpt/1tceDXa1RQJHxJFplAwtM56Ai+J8DiYaznT0xraTlbMCKgTMs1u+Ba3+HevvjlPd5747mdDJaBWe6u0Auwq77oqJ2R6frM10tKyBwo0MM4n7oJUUcfWxCo+/dLoBBM/p9N/Dcfxq7TjZFTlpnalPJj9roEJAazh0jBgXkToDgBaHt6YkU7Be93hqP6CQKjyGOOX6dHq2eU5AxSA4SRIix+6eSymly+2u+aCoG5OIF5JK8ghoi7HJjuKwuGrdGtvOVM4ZqC4YLusVHKE3Iqh4QfORY4wdO3ZYBwaTB8H7OECekblZBCg5p7yBkmJxYnO9AUAl8dRQp4im4A2knt7BGNR9P3i9FklaF4tNHMe5oL3KveQiQJblfllW1yRSqWPwBHchsHnudHfvOch6EJq8gpjz8+Fw05lcZBv75K9RSBOnlkWWHsAaFKHgaqzbapBHZE4botGmE8YBcy3PClAxeDgceN0k0edQFGHgCCKOUuMZL9rkk2YNqAARiQRPMbP5fgSY68TNMx9gmX3zXqOZAtuaf9ENmvhmNc2qRmcVWYaw/wPNUEje1f9tjYrjEb7SBjUpxcW28Rtj3mrLEODz1dkQU4hxRnPSaE/f4BPoXIBv+ELPu163e8fcjDFmpRpPnvMhhjXjIPlTVu7J63144agS34nOFZgprvhkxzV7j0qD9bjQ7Zc4BaLRwO9wvoOVX3J6/OWqqtYLKUyWvj8jUGHmt/sHV+Mcfwggy9MmZ+9KslqtqjLMwqsB/LNAVolbcyXelc5UuHxBi8m2L5vXPgHIWVNTzEfUB/Hu5FUU9VMaSIl+KJ42JwWKOHLO5aHkehXvTjDzFxAF2bVO2sWO9ltN8qMtLcE3BQ0p4vXW3IyHrSo8LAhTLcft78l4Mv49aLkLV6XAfLvp0FQPDNqFL8E34zGiTB1W7kV/bTmm4wZ6vC0S3CMGYXgB6YeWFqBcypi0AA03QUtrURdrUEsw5Unc/zvMsikmAhCdnpmL8O5U99nV4jECMjeCP/Z2xS4h0g5juZRC/ofwOuLAzeBmTAgA6S5dDmLbOCb2AsbrmFdk2i+uPeM8AA1CqE8njOXif43j+Doks6WjNdTwjwz+jFURRCdSQx4A8WNZ3CY64Ko8jNWLW+hEArgh1DoFuOvmFRzevXu39nQ00SJdYtCC5fTrZ78BYfeB1CNJAIhHsdZA4Hxm41zrLlfNHQop1TDqEFPw0EtUhED7VSK5c/GiuV3Gu3+uY/zH9Ps3Uj959PPcozMAAAAASUVORK5CYII=");
        }
        .icon-index {
            width: 21px;
            height: 21px;
            background-repeat: no-repeat;
            background-size: contain;
            background-image: url("data:image/png;base64,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");
        }
        .active,
        .fix-select.ay_bar_item_on {
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
    }
</style>
<script>
    import {
        go
    } from '../../libs/router'
    import {
        ViewBox,
        Tabbar,
        TabbarItem
    } from '../../components'
    let param
    export default {
        components: {
            // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
            // 否则挂载点和组件名字一致, 即vhead
            ViewBox,
            Tabbar,
            TabbarItem,
        },
        data() {
            return {
                departCity: {},
                channelTypeID: 386,
                isSelect: true,
                bannerImg: '',
                index: 0,
                navlist: [],
                homeAdvs: [],
                homeKeyWords: [],
                contentHeight: ""
            }

        },
        methods: {
            takeData: function() {
                //     this.$http.get('/static/mddindex.json').then((response) => {
                //         // success callback
                //         var data = response.data
                //         this.navlist = data.MenuList
                //     this.homeAdvs = data.HomeAdvs
                //     this.homeKeyWords = data.HomeKeyWords

                // }, (response) => {
                //         // error callback
                //     });
                var vm = this
                var useCache = false
                var useProxy = true
                // var menuParam = {
                //     cityId: vm.departCity.ChannelID,
                //     channelTypeid: vm.channelTypeID
                // }
                 var menuParam = {
                    cityId: 1,
                    channelTypeid: vm.channelTypeID
                }

                api.post({
                    path: api.config.microServiceHost.elementurl,
                    controller: 'element_Destination',
                    action: 'GetParentSpace',
                    param: JSON.stringify(menuParam),
                    useCache: useCache,
                    useProxy: useProxy,
                    callback: function(obj) {
                        if (obj.ReturnCode == 0) {
                            var data = obj.Data;
                            vm.navlist.splice(0, vm.navlist.length)
                            if(data && data.length>0){
                                for (var i = 0, len = data.length; i < len; i++) {
                                    vm.navlist.push(data[i])
                                    if (i == 0) {
                                        vm.selectNav(i, data[i].listguidAndType)
                                    }
                                }
                            }
                        }
                    }
                });
                // var advParam = {
                //     cityId:vm.departCity.CityID,
                //     channelTypeid:vm.channelTypeID,
                //     type:2,
                //     space:'ea10e6eb-2ecb-41e4-84ab-8f3d485c9dbf'
                // }
                // api.post({
                //     path: api.config.microServiceHost.elementurl,
                //     controller: 'element_Destination',
                //     action: 'GetAdSpaceByParentGuid',
                //     param: JSON.stringify(advParam),
                //     useCache: useCache,
                //     useProxy: useProxy,
                //     callback: function(obj) {
                //         if (obj.ReturnCode == 0) {
                //             var data = obj.Data;
                //             if(data.listappElementSpace!=null&&data.listappElementSpace.length>0&&data.listappElementSpace[0].advertises!=null&&data.listappElementSpace[0].advertises.length>0)
                //             {
                //                 vm.bannerImg=data.listappElementSpace[0].advertises[0].picUrl
                //             }
                //             console.dir(vm.bannerImg)
                //         }
                //     }
                // });
            },
            goSearch: function() {
                window.location.href='http://m.aoyou.com/search.html'
                //api.pageGoTo("/search.html");
            },
            selectNav: function(i, param) {
                var vm = this
                var useCache = false
                var useProxy = true
                vm.index = i
                vm.homeAdvs.splice(0, vm.homeAdvs.length)
                vm.homeKeyWords.splice(0, vm.homeKeyWords.length)
                for (var i = 0, len = param.length; i < len; i++) {
                    if (param[i].spaceType == 2) {
                        var advParam = {
                            cityId: 1,
                            channelTypeid: vm.channelTypeID,
                            type: 2,
                            space: param[i].spaceGuid
                        }
                        api.post({
                            path: api.config.microServiceHost.elementurl,
                            controller: 'element_Destination',
                            action: 'GetAdSpaceByParentGuid',
                            param: JSON.stringify(advParam),
                            useCache: useCache,
                            useProxy: useProxy,
                            callback: function(obj) {
                                if (obj.ReturnCode == 0) {
                                    var data = obj.Data.listappElementSpace;
                                    if (data != null && data.length > 0) {
                                        vm.homeAdvs.splice(0, vm.homeAdvs.length)
                                        for (var i = 0, len = data.length; i < len; i++) {
                                            vm.homeAdvs.push(data[i])
                                        }
                                    }
                                    console.dir(data)
                                }
                            }
                        });
                    } else if (param[i].spaceType == 3) {
                        var keywordParam = {
                            cityId: 1,
                            channelTypeid: vm.channelTypeID,
                            type: 3,
                            space: param[i].spaceGuid
                        }
                        api.post({
                            path: api.config.microServiceHost.elementurl,
                            controller: 'element_Destination',
                            action: 'GetElementSpaceKeyWord',
                            param: JSON.stringify(keywordParam),
                            useCache: useCache,
                            useProxy: useProxy,
                            callback: function(obj) {
                                if (obj.ReturnCode == 0) {
                                    var data = obj.Data.keyWords;
                                    if (data != null && data.length > 0) {
                                        vm.homeKeyWords.splice(0, vm.homeKeyWords.length)
                                        for (var i = 0, len = data.length; i < len; i++) {
                                            vm.homeKeyWords.push(data[i])
                                        }
                                    }
                                    console.dir(data)
                                }
                            }
                        });
                    }
                }
            },
            clickTab: function(url) {
                api.pageGoTo(url)
            }
        },
        created() {
            _ozuid=api.getMemberId();
            this.contentHeight = `${document.body.clientHeight-160}px` //计算搜索关键词列表高度：屏幕高度-顶部标题栏高度
            this.departCity = api.getDepCity()
            this.takeData()
        },
        ready() {

        }
    }
</script>
