<template>
    <div class="page-wrap" @touchMove="scrollFunc" @scroll="scrollFunc">
        <view-box v-ref:view-box>
            <!--header slot-->
            <div class="ay-header-box" slot="header">
                <x-header :left-options="{showBack: true}">遨游品牌</x-header>
            </div>
            <!--default slot-->
            <div class="page-content">
                <img class="banner" src="http://pic1.aoyou.com/app40/banner-logo.jpg"/>
                <sticky class="fix-line" scroll-box="view_box_body" :offset="44">
                    <ul class="nav">
                        <li v-for="nav in navLists" :class="{'select':curreSelect==$index}" @click="tap($index)">{{nav}}</li>
                    </ul>
                </sticky>
                <div class="page-section" id="0">
                    <h1>好旅游 上遨游</h1>
                    <div class="page-image">
                        <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                    </div>
                    <div class="page-text">
                        　　遨游网是中青旅控股股份有限公司（A股600138）旗下专业度假网站，向消费者提供全方位值得信赖和高品质的旅游度假预订、资讯及专业服务。<br>
                        　　依托上市公司中青旅30多年的行业领先优势，拥有享誉全国的中青旅联盟逾10年的全国网络和旅游服务资源，遨游网提供北京、上海、广州、南京等多个出发城市、遍及全球100多个国家和地区的旅游产品预订及度假服务，包括出境旅游度假、国内旅游度假、海岛旅游度假、签证服务、机票服务、境外当地玩乐、抢游惠等丰富线路及领先服务，目前已拥有数百万遨游网会员。<br>
                        　　遨游网提供高性价比度假旅游产品，全程品质保障的旅游行程，透明规范的价格说明，省心便捷的预订体系，贴心舒适的旅游服务，完善的安全保障和突发事件应急响应体系，目的地购物无忧的退换货承诺，超值积分回馈和丰富的会员权益服务，是消费者旅游度假的安心选择。
                    </div>
                </div>
                <div class="page-section page-line" id="1">
                    <h1>36年行业积淀，首家旅行社上市公司</h1>
                    <div class="page-text">
                        　　中青旅旅行社是新中国成立后，最早开展境内外旅游业务的旅行社之一，专注旅游服务已经超30年。中青旅控股股份有限公司（简称中青旅）是以共青团中央直属企业中国青旅集团公司为主发起人，通过募集方式设立的股份有限公司，1997年11月26日公司创立，12月3日公司股票在上海证券交易所上市，是我国旅行社行业首家A股上市公司(股票代码：600138)、北京市首批5A级旅行社，现有总股本7.2384亿元。<br>
                        　　作为中国旅游行业的领先品牌和综合运营商，中青旅坚持以创新为发展的根本推动力，不断推进旅游价值链的整合与延伸，在观光旅游、度假旅游、会奖旅游、差旅管理、景区开发、酒店运营等领域具有卓越的竞争优势。中青旅旗下拥有中青旅会展、乌镇、山水酒店、遨游网、百变自由行等一系列国内知名旅游企业和产品品牌，在北京、上海、东京、温哥华、香港、广州、天津、南京、杭州、深圳等海内外三十余个核心城市设有分支机构。<br>
                        　　目前，中青旅已达到年接待游客突破150万人次，营业收入100多亿元的经营规模，正矢志成为一家具有卓越品牌形象、拥有领先市场份额、跨地域、跨产业链运营的国际化现代旅游集团。<br>
                    </div>
                </div>
                <div class="page-section page-line" id="2">
                    <h1>产业链资源直供体系，全球旅游资源保障</h1>
                    <div class="page-text">
                        　　中青旅遨游依托30余年的行业经验，建立起完善的产业链资源直供体系和目的地旅游资源直采平台，为消费者提供高性价比的全球旅游资源保障。<br>
                        　　2002年4月3日，以中青旅控股股份有限公司为要约人，以境内外旅行社，酒店，景区景点，邮轮公司等相关旅游服务商为应约人，本着资源共享、功能互补、平等互惠、诚信合作的原则，共同组建的战略合作联盟中青旅，目前有成员近百家，运营协作10多年。<br>
                        　　中青旅遨游对旅游资源的供应采购有严格完善的流程机制，专业的旅游产品研发人员经常实地性的考察，针对旅游供应商的资源供应能力、服务质量管控体系，行程安排是否合理、舒适等严格把关，确保每条旅游产品给出游者带来最愉悦的旅行体验。
                    </div>
                </div>
                <div class="page-section page-line" id="3">
                    <h1>丰富优质产品，橙钻旅游品质</h1>
                    <div class="page-text">
                        　　遨游“橙钻产品等级体系“是中青旅遨游精心打造的产品体系，致力于让消费者清晰透明的把握旅游产品标准等级体系，挑选心仪的旅游服务产品。凡标明了橙钻等级图示的产品，均符合以下标准：<br><br>
                        <span class="page-level"><em>3钻</em>3钻标准</span><br>
                        <span class="page-type"><em>跟团游</em>跟团游标准</span><br>
                        【住宿】入住当地3星级或外网评级3星标准酒店/客栈<br>
                        【交通】旅游用车每人一正座，且旅游用车空座率不低于5%（景区或当地特种用车除外）<br>
                        【餐饮】抵达之日0赠送一瓶矿泉水<br>
                        <span class="page-type free"><em>自由行</em>自由行标准</span><br>
                        【住宿】入住当地3星级或外网评级3星标准酒店/客栈。<br><br>

                        <span class="page-level"><em>4钻</em>4钻标准</span><br>
                        <span class="page-type"><em>跟团游</em>跟团游标准</span><br>
                        【住宿】入住当地/国际4星级或外网评级4星标准酒店。入住天数至少占产品总入住天数的70%。目的地如无此等级酒店， 则选用无钻级和星级评定的特色体验型住宿场所（例如别墅、庄园、蒙古包等）<br>
                        【交通】旅游用车空座率不低于10%（景区或当地特种用车和接送机用车除外）<br>
                        【餐饮】含至少一次当地特色风味餐<br>
                        <span class="page-type free"><em>自由行</em>自由行标准</span><br>
                        【住宿】入住当地/国际4星级或外网评级4星标准酒店。入住天数至少占产品总入住天数的70%。目的地如无此等级酒店， 则选用无钻级和星级评定的特色体验型住宿场所（例如别墅、庄园、蒙古包等）<br><br>

                        <span class="page-level"><em>5钻</em>5钻标准</span><br>
                        <span class="page-type"><em>跟团游</em>跟团游标准</span><br>
                        【住宿】入住当地/国际5星级或外网评级5星标准酒店。入住天数至少占产品总入住天数的70%。如当地无五星标准酒店，则选择当地最高标准酒店。<br>
                        【交通】旅游用车空座率不低于15%或配备专用行李车（景区或当地特种用车和接送机用车除外）<br>
                        【航班】选择直飞航班或五星航空或转机时间不超过5小时（无其他选择航班除外）。<br>
                        【餐饮】含至少二次当地特色风味餐<br>
                        【领队】安排中青旅3年以上工作经验的优秀领队<br>
                        <span class="page-type free"><em>自由行</em>自由行标准</span><br>
                        【住宿】入住当地/国际5星级或外网评级5星标准酒店。入住天数至少占产品总入住天数的70%。如当地无五星标准酒店，则选择当地最高标准酒店。<br>
                        【航班】选择直飞航班或五星航空或转机时间不超过5小时（无其他选择航班除外）。<br><br>

                        <span class="page-level"><em>6钻</em>6钻标准</span><br>
                        <span class="page-type"><em>跟团游</em>跟团游标准</span><br>
                        【人数】每团最多16人。<br>
                        【住宿】入住国际连锁五星级或网评五星级酒店或精品特色酒店，私家别墅或庄园，皇宫、城堡改建的特色酒店。入住天数至少占产品总入住天数的80%。<br>
                        【交通】旅游用车空座率不低于40%或配备专用行李车（景区或当地特种用车和接送机用车除外）；行程内的火车、轮船安排不低于二等座/舱。<br>
                        【餐饮】根据目的地情况，安排当地2次以上特色餐厅用餐。<br>
                        【航班】国际航线安排商务舱，头等舱可选项，不使用红眼航班；选择直飞航班或五星航空或转机时间不超过4小时（无其他选择航班除外）。<br>
                        【领队】安排中青旅4年以上工作经验的优秀领队<br>
                        <span class="page-type free"><em>自由行</em>自由行标准</span><br>
                        【住宿】住国际连锁五星级或网评五星级酒店或精品特色酒店，私家别墅或庄园，皇宫、城堡改建的特色酒店。入住天数至少占产品总入住天数的80%。<br>
                        【航班】国际航线安排商务舱，头等舱可选项，不使用红眼航班；选择直飞航班或五星航空或转机时间不超过4小时（无其他选择航班除外）。<br><br>
                    </div>
                </div>
                <div class="page-section page-line" id="4">
                    <h1>行程价格阳光透明，五零体系保障权益</h1>
                    <div class="page-text">
                        <ul>
                            <li>
                                <div class="left">
                                    <img src="data:image/png;base64,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">
                                </div>
                                <div class="right">
                                    <h4>零附加</h4>
                                    <h5>零特殊人群附加费</h5>
                                </div>
                            </li>
                            <li>
                                <div class="left">
                                    <img src="data:image/png;base64,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">
                                </div>
                                <div class="right">
                                    <h4>零减少</h4>
                                    <h5>零减少服务项目</h5>
                                </div>
                            </li>
                            <li>
                                <div class="left">
                                    <img src="data:image/png;base64,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">
                                </div>
                                <div class="right">
                                    <h4>零损失</h4>
                                    <h5>零拒签损失</h5>
                                </div>
                            </li>
                            <li>
                                <div class="left">
                                    <img src="data:image/png;base64,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">
                                </div>
                                <div class="right">
                                    <h4>零强制</h4>
                                    <h5>零强制购物安排</h5>
                                </div>
                            </li>
                            <li>
                                <div class="left">
                                    <img src="data:image/png;base64,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">
                                </div>
                                <div class="right">
                                    <h4>零自费</h4>
                                    <h5>零强制自费安排</h5>
                                </div>
                            </li>
                        </ul>
                        1、 若旅游过程中，收取老人儿童等特殊人群附加费，一经发现核实，双倍返还附加费金额。<br>
                        2、因不可抗力造成：<br>
                        1） 若全部或部分行程取消，我们将退还未实际发生费用；<br>
                        2） 若行程更改，费用降低，我们将退还差价部分；<br>
                        注：不可抗力是指不能预见、不能避免并不能克服的客观情况。包括但不限于，恶劣天气、自然灾害、战争、罢工、骚乱、恐怖事件、政府行为、公共卫生事件等客观原因，造成旅游行程安排的交通服务延误、景区临时关闭、宾馆饭店临时被征用、出境管制、边境关闭、目的地入境政策临时变更、我国政府机构发布橙色及以上旅游预警信息等，导致旅游目的无法实现。<br>
                        3、因中青旅遨游原因造成：<br>
                        1） 若未经您签字确认，擅自遗漏旅游景点、减少旅游服务项目的，我们会补偿未完成约定旅游服务项目等合理费用，并支付同额违约金。遗漏无门票景点的，每遗漏一处我们向您支付旅游费用总额5%的违约金。<br>
                        2）若擅自缩短游览时长1小时以上，我们将按缩短时长支付您因此损失的旅行价值（按旅游费用总额除以全部旅行时间来换算每小时旅行价值）。<br>
                        3） 若未经您签字确认，擅自安排合同约定以外的用餐、娱乐、医疗保健、参观等另行付费项目的，我们会承担另行付费项目的费用。<br>
                        4） 若未经您签字确认，擅自增加购物次数、延长停留时间的，我们将每次向您支付旅游费用总额10%的违约金。<br>
                    </div>
                </div>
                <div class="page-section page-line" id="5">
                    <h1>八大服务保障承诺，安心省心放心出游</h1>
                    <div class="page-text">
                        <ul>
                            <li>
                                <div class="left">
                                    <img src="data:image/png;base64,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">
                                </div>
                                <div class="right">
                                    <h4>24小时订单</h4>
                                    <h5>取消无损退款</h5>
                                </div>
                            </li>
                            <li>
                                <div class="left">
                                    <img src="data:image/png;base64,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">
                                </div>
                                <div class="right">
                                    <h4>航班</h4>
                                    <h5>延误补偿</h5>
                                </div>
                            </li>
                            <li>
                                <div class="left">
                                    <img src="data:image/png;base64,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">
                                </div>
                                <div class="right">
                                    <h4>酒店</h4>
                                    <h5>升级保障</h5>
                                </div>
                            </li>
                            <li>
                                <div class="left">
                                    <img src="data:image/png;base64,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">
                                </div>
                                <div class="right">
                                    <h4>突发事件</h4>
                                    <h5>安全承诺</h5>
                                </div>
                            </li>
                            <li>
                                <div class="left">
                                    <img src="data:image/png;base64,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">
                                </div>
                                <div class="right">
                                    <h4>出境旅游购物</h4>
                                    <h5>无忧承诺</h5>
                                </div>
                            </li>
                            <li>
                                <div class="left">
                                    <img src="data:image/png;base64,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">
                                </div>
                                <div class="right">
                                    <h4>特殊原因退订</h4>
                                    <h5>无损保障</h5>
                                </div>
                            </li>
                            <li>
                                <div class="left">
                                    <img src="data:image/png;base64,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">
                                </div>
                                <div class="right">
                                    <h4>导游领队</h4>
                                    <h5>黑红名单制</h5>
                                </div>
                            </li>
                            <li>
                                <div class="left">
                                    <img src="data:image/png;base64,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">
                                </div>
                                <div class="right">
                                    <h4>预警及应急</h4>
                                    <h5>援助体系</h5>
                                </div>
                            </li>
                        </ul>
                        1、	24小时订单取消无损退款<br>
                        通过遨游网线上渠道（pc或移动渠道）预订旅游产品，购买完成后24小时内取消订单，全额退还旅游费用。<br><br>
                        2、	航班延误保障<br>
                        出游期间航班发生延误1小时以上，遨游在航空公司的补偿政策外，额外给予客人补偿，按10元／人／小时的标准，以等额优惠券的形式进行补偿。优惠券自发放之日起一年有效，可与其他任何优惠共享。航班延误1小时以上后，不足半小时按半小时计算，超过半小时，按1小时计算。<br><br>
                        3、	酒店升级保障<br>
                        在遨游预订旅游产品，当订单确认后，因意外状况导致原本预订的房型无法入住，遨游将免费为你在该酒店进行酒店升级，最高不超过双倍原预定价格的房型。对于无法升级的情况，遨游将安排周边同等或更高一级的酒店住宿，并且承担酒店差价和两家酒店的交通费用。<br><br>
                        4、	突发事件安全承诺<br>
                        "旅行中的突发事件，是考验旅游企业社会责任和品牌声誉的最好标杆。"如果有千万分之一的可能，出境旅游目的地发生不可控的自然灾害，社会暴乱，您的安全遭遇风险，或受到威胁，国家相关部门提出“谨慎前往”级警报时，遨游郑重承诺：<br>
                        （1）对于未出发的客人，中青旅将建议客人改期或改变行程，对不愿意改期或改变行程的客人全额退款；<br>
                        （2）对于已经出发的在途客人，未发生的旅游费用予以退还，为保障客人安全发生的合理费用如超出已经收取的旅游费用，由中青旅承担；<br>
                        （3）对于所有参加中青旅出境旅游的客人，由于本人原因被拒签而不能出行的客人，则只收取签证费。<br>
                        注：本承诺适用于遨游自营出境参团产品和自由行产品，外地分子公司不包含在内。<br><br>
                        5、	出境旅游购物承诺<br>
                        如您在中青旅出境参团和国内参团旅游行程中标明、并由领队、导游带领前往购物店购得商品，所购商品发生质量问题或出现与书面的产品说明书不一致的现象，中青旅负责帮您商品维修乃至换货。<br>
                        （1）您在申请退、换货时,请确保商品完好、票据齐全，并在商品保修期内；<br>
                        （2）如您认为在购物商店购买到的是假冒伪劣商品，要求退货时，请提供相关部门出具的鉴定结果。<br>
                        （3）出境行程中的购物商店售出的食品、药品、保健品等一些特殊商品，请您在购买时即确认保质期限，售出后无法给予退换。<br>
                        （4）仅中青旅控股股份有限公司出境、国内参团旅游产品适用于本承诺，外地分子公司不包含在内。<br>
                        注：为保证您可以顺利退、换货，请保持商品完好、票据齐全，并在商品保修期内。本承诺适用于遨游自营出境参团产品和国内参团产品。<br><br>
                        6、	特殊原因退订保障<br>
                        若您签约后，客户因以下自身不能预期和控制的特殊原因无法出行，遨游将协助进行订单修改，并不收取更改手续费。若选择退订，相应材料通过审核后，遨游将用等额优惠券（优惠券自发放之日起一年有效，可与其他任何优惠共享）的形式补偿您的实际损失，并退还剩余未产生的费用。<br>
                        <table  cellspacing=0 cellpadding=0>
                            <tr>
                                <th>身份</th>
                                <th>突发状况</th>
                                <th>材料及说明</th>
                            </tr>
                            <tr>
                                <td rowspan="4">本人</td>
                                <td>身故</td>
                                <td>死亡证明</td>
                            </tr>
                            <tr>
                                <td>住院</td>
                                <td>出具三级甲等医院病历/诊断书、住院证明（住院期间与出行期间重叠）和收费证明<br>
                                    说明：既往病或慢性病住院不参与特殊原因退订保障。</td>
                            </tr>
                            <tr>
                                <td>骨折</td>
                                <td>出具三级甲等医院病历/诊断书、包含“不宜出行”字样的病假单和收费证明</td>
                            </tr>
                            <tr>
                                <td>怀孕</td>
                                <td>出具三级甲等医院病历/诊断书、包含“不宜出行”字样的病假单和收费证明<br>
                                    说明：仅在预订日期后，首次检查出正常妊娠的情况可参与特殊原因退订保障。</td>
                            </tr>
                            <tr>
                                <td rowspan="2">父母、<br>子女或<br>配偶</td>
                                <td>身故</td>
                                <td>死亡证明</td>
                            </tr>
                            <tr>
                                <td>住院</td>
                                <td>出具三级甲等医院病历/诊断书、住院证明（住院期间与出行期间重叠）和收费证明<br>
                                    说明：既往病或慢性病住院不参与特殊原因退订保障。</td>
                            </tr>
                        </table>
                        特别说明：特殊原因退订保障最晚于出行日前联系我们，提出申请后十日内提交材料，逾期未提交申请视为放弃；受理条件以受理当日公示的受理条件为准；遨游保留在适当时候修订受理条件而不另外通知的权力。<br><br>
                        7、	导游领队黑红名单制<br>
                        为加强出行过程中的服务质量管理，中青旅遨游出台了一系列的旅游业务质量管理规章制度并严格执行，其中旅游服务一线人员导游、领队的服务管理更是重中之重。<br>
                        中青旅遨游长期执行旅游行程评议表制度，收集旅游过程中导游领队服务质量、行程安排、吃住标准、交通使用等反馈，更是首创业内导游领队“黑红名单”制度，对于业务熟练、服务质量优秀，认真细致工作的专业服务人员，列入“红名单“，给予团队优先选择、物质奖励、职位晋升等一系列奖励；对于不按照合同、行程履约；服务态度、服务方式方法存在问题；突发情况应对不力；隐瞒问题、逃避责任；违反职业道德、社会公德；违反法律、行业管理管理规定的，一经查实，除进行相应处罚外，列入黑名单管理，终止相关合作，并向行业内进行通报。<br><br>
                        8、	预警及应急援助体系<br>
                        针对旅游过程中的各种突发情况，中青旅遨游提供7*24小时旅行途中紧急联络人服务，为客户及时处理解决旅途问题。在旅途中，如遇突发严重疾病，客人将得到我们及时送医就诊的帮助；如遇到意外事故导致旅行难以为继，客人也将得到我们力所能及的必要援助。<br>
                        为保障游客安排，中青旅遨游建立旅游预警机制，在自然灾害、病疫灾害、政治变动、突发事件等情况下，及时联系即将出行及处于行程中的客人，提醒其注意风险，从而保障客人安全和权益。<br><br>
                    </div>
                </div>
            </div>
            <!--bottom slot-->
        </view-box>
    </div>
</template>

<script>
    //Add the component
    import { XHeader, Sticky, ViewBox} from '../../components'

    export default {
        components: {
            XHeader,
            Sticky,
            ViewBox
        },
         data (){
            return {
                navLists:['品牌保障','专业保障','资源保障','品质保障','权益保障','服务保障'],
                curreSelect:0,
                navTops:[],
                heights: []
            }
        },
        ready(){
            for(var i=0;i<this.navLists.length;i++){
                    this.heights.push($("#"+i).offset().top-84)
                }
        },
        methods: {
            tap(id) {
                this.curreSelect = id
                $('#view_box_body').animate({scrollTop:this.heights[id]},1000)
                $(".nav").scrollLeft($(".nav li").width()*id);
            },
            scrollFunc() {
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
                }else if(scrollTop < $("#5").offset().top-104){
                    this.curreSelect = 4;
                    $(".nav").scrollLeft($(".nav li").width()*4);
                }else{
                    this.curreSelect = 5;
                    $(".nav").scrollLeft($(".nav li").width()*5);
                }
            }
        }
    }

</script>

<style lang="less">
    @import '../../styles/index.less';
    @import '../../styles/ayui/base/reset.less';

    /*页面样式 20170116*/
    .page ,.page-wrap{
        height: 100%;
    }

    ::-webkit-scrollbar {
        display: none;
        width: 0;
        height: 0;
    }

    .ay-fixed {
        z-index: 100;
    }

    .ay-sticky{
        z-index: 100;
    }

    .fix-line{
        -webkit-overflow-scrolling: touch;
        border-bottom: 1px solid #DFDFDF;
    }

    .ay_tab_bd{
        padding-top: 44px;
    }

    .ay-header-box{
        position: absolute;
        top:0;
        left: 0;
        width: 100%;
        height: 44px;
        line-height: 44px;
        font-size: 19px;
        background-color: #fff;

        &:after{
            .setBottomLine(#e5e5e5);
            z-index: 102;
        }
    }

    .ay-header .ay-header-left .left-arrow:before{
        border: 2px solid #333;
        border-width: 1px 0 0 1px;
    }

    .ay-header .ay-header-title, .ay-header h1{
        color: #333;
    }
</style>

<style lang="less" scoped>
    @import '../../styles/index.less';
    @import '../../styles/ayui/base/reset.less';

    /*最外层包裹*/
    .page{
        position: relative;
        height: 100%;
    }

    .page-wrap{
        box-sizing: border-box;
        background: #f5f5f5;
        -webkit-overflow-scrolling: touch;
    }

    .page-content{
        background: #fff;

        img{
            display: block;
            width: 100%;
            height: 1.75rem;
        }

        .banner{
            display: block;
            width: 100%;
            height: 4.5rem;
        }

        p{
            font-family: STHeitiSC-Light;
            font-size: 16px;
            padding: 0 20px;
            color: #333333;
            line-height: 27px;
        }

        a{
            color: #41B3EE;
            text-decoration: underline;
        }
    }

    .nav{
        margin: 0 5%;
        height: 40px;
        line-height: 40px;
        background: #fff;
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
        font-size: 0;
        transform: translateZ(0);
        -webkit-transform: translateZ(0);
        overflow-y: hidden;
        width: 90%;
        white-space: nowrap;

        li{
            position: relative;
            display: inline-block;
            font-family: STHeitiSC-Medium;
            font-size: 14px;
            color: #333;
            letter-spacing: 0.3px;
            margin: 0 15px;

            &.select{
                color: #FF5523;

                &:before{
                    .setBottomLine(#FF5523);
                    height: 2px;
                    z-index: 9999;
                }
            }
        }
    }

    .page-section{
        padding: 0 20px;

        h1{
            margin-top: 30px;
            font-family: STHeitiSC-Medium;
            font-size: 19px;
            color: #333333;
            letter-spacing: 0.4px;
        }
    }

    .page-image{
        margin: 20px 0 0;
        .clearfix();

        span{
            display: block;
            float: left;
            width: 76px;
            height: 21px;
            margin-right: 10px;
            margin-bottom: 15px;
            background: url(data:image/png;base64,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) no-repeat;
            background-size: 100%;

            @media screen and (min-width: 375px){
                &:nth-child(4n){
                    margin-right: 0;
                }
            }

            &:nth-child(2){
                background: url(data:image/png;base64,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) no-repeat;
                background-size: 100%;
            }

            &:nth-child(3){
                background: url(data:image/png;base64,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) no-repeat;
                background-size: 100%;
            }

            &:nth-child(4){
                background: url(data:image/png;base64,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) no-repeat;
                background-size: 100%;
            }

            &:nth-child(5){
                background: url(data:image/png;base64,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) no-repeat;
                background-size: 100%;
            }

            &:nth-child(6){
                background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJgAAAAqCAYAAABPwJJfAAAAAXNSR0IArs4c6QAADJBJREFUeAHtXQdsFNkZ/nZppveDox9NCFMDHHCUmBa4A2x6hyBBkBA1h2gBJCMBwUcVQQIkEnHAQSCEYIMpoYuScOCjmt57aEfv9ub/3vqtx+Od9QI2O4b9pfG8eW3+9+abv723YwcsyDVuXEG8TewAF8KlSlU48CVcrrwW1YPZn9UMOJ7KcG/KcRJOZzSyINoxffqv3qbAYc50RUaG4Nmz75GIsVKWz1wekOuZPwTktsGbWszAq1fA48fAtevAiXggPv4REhOjkCfXHEdk5EtjqxQAc40ZUwoJWAe46hgrBTwdBFjAH4FPBu7dB2JjgePxcQjJFuGYOvWGru/UCTe4XP+1Hbg0g8GzfWegSGHg9/2Adt/Vwau3B1wTJpTUzCqAKbWoJBc8BbpC8BycAb9nIOy3QNtvS+Llm2iFKWnolmC0ueymFv0eVbCirWaAIKseWkfZ8cKYQ3mLbxIuS9oeBr232QraYN5mxb5598Umi5r5WLzLck4VirAzuOw7jUHOrGagsNhk1UPzEVvOpDiXVdVgfnAG3m8GqoWK1YXwrNK6qt89fNMQ+O5b4OAhYPsO4CnjbUEKzoCXGShViplVCbASXoq9ZxUrBoSEAE0aA/W/BvbuA3buAl688F7/E8x9+PChGpXT6US+fPY1WwM+9e65KSFepCuP38ys3wCcPuOunj070LwZMGE80KolUK4s0Ogbv7tSFXPmBGpUB1q2cLfNlevd2geg9qJFi9CyZUtMnjw5Xe/+/PnzdOsvPft6b6Zy5JCmrjyUYP7T27fA8p+A4UOBL75wt6NEa/0793FDArgHfgZYzxeVLQM0bQqEinbOamChXl1g7jxfLQNeVrBgQcVD7dq1U/EyYMAA3Lt3Dznlxckq4+LxVuaCx1MxJ8aPH49GjRqlakepSNCyfojMJ4/s8gJny5YNWbJkkeU+JxwOhzrrxi6XS5aGXUhISFDHmzdvQGA9e/YMTO/fv1/1oesH6mx4un6y8FKWmv62xA0ys8QpKXHaP40Dtm13A00Gn4JKiDZu1xaoXClFtucij//C1NPmIydyqDfT+035wG/IS0agEBiaXr9+rcBQjCaGFyKAihQpooClgan7IDAvXryIEjJ3rEO6c+cObt++jfLlyyN37tweoDGdN29esVheKEB6udVHz3p3gJFFeUuxbDnwh4ESqvWsNrmZp+7t1BEICwO2bgMOHYK80lxGAOrVk8hbiuVPdxv9d8tWnbLtmQ/eiii5SHPnzkWDBg081cLDw3Hz5k0l2TyZhgRtuc2bNxtykpO7d+/GqFGj0LNnT3WwZOnSpZg3bx5Gjx4tUypzamOynq20mD53HohZD3SI8F6zkKiS7l3FTguDvGaAWdqZW9ErPXjQnGuL623btimJQNV17do1xdPVq1eVGqK0oEpq06aNB0CJiYkp+NbXvqQfGxyU8R89elRJJYKVx7lz51RfFy5cwJ49e1SaEo3Euk+ePMEr2d1A9cg0VXhEhMUzUa0+7p/3Bxj5pBf5ZXHxKOtbc120qHUZS6hG18dKX3t91wtg6eLFi3H+vLxQBlq7di14kEqJS06A0WYiaUCpC8O1UW3qMuOZUm7hwoXGLE963bp14GEkb3Xbt2//CQGMo/3nvwCCSOyBdya6/Mt+Aq5ceeemH7MBjXcSJcqOHTsQExODTp06iZ/SFC/FJqURT0oLYLS1fFGuJCk/YsQIdOwoZobQXnnxJk6ciKFDh6JLly4qb+XKlaA3O2vWLNSp495ZdeLECVUnj83s2A+TYBwu1cGPy4ARw4BChdQE+PXnZ/E2YyTsQafB5tSqVSsPh8uXL1fpMmXKoHHjxp58JjTAzECip0dKS4LRUyRRlWqgaLvOmKdVLQFprme+t+owgH8+HGBkXlxjbNoC9O6Z9lDu3gXWiqhPsi3SbmCfGgwnHD582JIhrRrNjoDOTwtglIYkSqjt28UTF9KB3VWrVmHXrl0qjx4kafbs2Z5gL71NEu0xO1H6AOzrekDHDr7H9eo1RL8Au3a77S7ftW1ZumnTJhVzInM07mfMmCG+Sy4MGTJE8cswBckMMC3B0pIuBEeFChWUKiYYKb0KFCig8njNg1KO4Y5q1aopXqieCUw6IJUqVUpl/ymGAvjnwwBGl50hCQLMiqhC434BNm6CuDlWtWyfT/BQivBB8oFSTZ0+fRrHjx9Hs2bNULVqVZXPgWgVpgflrwTr3LkzatasqaQQY1o8qHZ5EJwElw6usk8CVwdYKcEYAytbVlZUbETvDzB5s9C/H10o6+GcOiV7tQVYSSJdZh6QoKPMknUbm5bEyp7z69evo23btrL9PFY98LFjx6J3796YNm0ali1bpqL1ZN+8RqkBlpYEY1sa7zt37mTynalr164gT3Yia4D9prasL5YDTp1220tJnpJi/quvgH59gbwWkXeJ2Sib7PLl5LGyr549gOlRyXmZJPVYfkHDwCZVUJUqVRTAyHrlypWVoc8QBiP4d2lfCuXPn1+d9R9/VSTrh4aGKilJ450HpaGO6msngIDVEox9U13zqF5d1nVtRtYAa90aKCxeIbfo0H46c4Y/T6L8ByLC6RKlHsqlSwCj8caYEetxMZwL42/Enc9k0osPcty4cXjw4AEGDRqkVJJx4CxjcJPS6YqEWwgGswSjWvNl4NOOorplu3bt2imA6bVIDSrjPc1p9q9VJYH+6NEjBX6zLWhu9zGurQE27y9uKVVB4ls5ZOcEdz3w8EYE1Fbxeii5jET12b2bOxjL/Ff2D0kY2WeaD58B0OLFi6sA5po1a1JU0euLl+TlYl1KOLMqpJTx9bBpP/Xv3z9Fv/qCfen+9JllBJW2x3g2E1cf6CAEmqwBxtDD4r8CQwZ7t7M4qJMnxTMUe+HK1dTj4M6IrhIYlAnyUCaIeXl4TUpQkjDISRDoOJe5Dq/37ZNVDSF6d0bSQDBKMPal41esS/BxTZFGut5JwXzej+00yFavXq0kVZ8+fVIAjMDmQS+UDgiXjHwBmn1/LLIGGDmQNTas/Dvw/R+TVaIMBL9ILEgWYfG/O9Z8PhWAGsHFmpkQYGS7RYsWabr/GzZI0Fiobl15sQzkzcAfOXIkJk2a5PH4CLYFCxZ4WnHLzfDhw1V4YuDAgSjMPe5C0dHRig9G+kkEUmRkpIr6m4O+qoIN/hjEiwU3BNHhI8mFsRuB1f/wDS7WPnsWsgKb3I6p0qVlH1iTlHmZ4Ip2kJZA3HpDosTQtGXLFrVWWVSWzMLCwnS2Omv1pYFG6XXkyBF069bN43UaG9ChGDx4sFrIPnDggCgJ0RIWxLAJd1sQsH379gXr243SBhg5NkavL132bwxcHjl2PGXdy1eA/f9JmZfJrswAu3XrFqZPn65G0b1791SqiaqKapaqa/78+Z7FbHp8RjXJDhip79WrlwJVrVq1VOijSRPrF5LSbc6cOahYsSJOSUiIAd9hw4YpZ8Mu0+pbRWour15zp/j2isHrN1HyNaifXJ1uvOHNTy7IPClKGBIlEQ172mdUVQxw9ughYRgvxPBGvHjgS5Ys8ZTSjjLSlClTPLsluCOCu18JzLi4OBXMpaNA1ck8IxGAVI8rVqxQapZLWUZnwFg3EGkBGD/Fk8a+fNpOEmfBsWPuxW1/OeW+JT4Q9w8AMq0NZhyuXhsk0LhXiw+cUmrq1KnKQDfW1emoqChQjRIgNOIZrde7IHQd2lUM5DJMwUMTwckNhwQ0iSsGZqIKZ8CXQCPoS9MUCTSpNVHHU4dr1BgJcLkqZxg/Ee3lV0hJYv7fEiPj8a5ko192X5bgMeNMDAFQalH1UWo0bCjxwgwi7ke7L7+WrlGjBpo3b55qKSqDbvth3VJbRc08SxVJKzLjAEY1qQFms5X+95nBclyRMBAlUkaCi7eirZXpSKSx0ElZQUVMhjJP+03eeEUvMl+gNUPn5lPu/ISs+gi2nMjqXCfjdFuuGTVg7qZ48Cvk5zEZdYdgv3aaAX78JP7kY2LLqb6t6UTGrkBzq860P7t/jWSniQjykjEzsCFWnMG3UcSWOw6WO/dskWdxGXO3YK+f1QxwQyk/pakwJYs5HLz6cKt8W1OSNz6ryQgONn1ngOCK3XRDvgvWQX8M2BPJVx9uDckuUdGgJEvfWf8MeqPN9eNSYMPGODhdDRw//KBcSI7cYR6++rbm0+eyui2fMXe58pvLA3JtozhYQMZvt5sy3MQA+jXBEfcIHo+Xi4QoqkUtuTTLqQCmC9SnNRMQIcv3VJ0MH5dIM+KvGwfPn/gMGP4RA8Nc4i1a/SOG/wMIXcVk3U7HZgAAAABJRU5ErkJggg==) no-repeat;
                background-size: 100%;
            }

            &:nth-child(7){
                background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJgAAAAqCAYAAABPwJJfAAAAAXNSR0IArs4c6QAAD9xJREFUeAHtnQlwFUUax78XXiABAuEKmHCfAoKBKMtyyKWsIvclq0hRggqoKHigUCIlilKF7CrKISBVXlAsyCGIUAIiiBwiZBcQwhUgIZAgRwhnjrfz62y/nTd5t8RAfF/VZHqmvz6m+9/f1fMmNvFAm0euqnAtL6t3Xp70tIk0cTjkDhFHlAf20O0/0QjYbLYs43FPOUT228SxItIetaL9rO7n3Q2BgR1X2jhpY0R2yumxDpuME4eUc80tmquucwcVTcOhVt2OQM61bLl+4apkHj8n6btTJSMx9WJerkwtGRfzj06TOl0zF3IB2MbhS6vfkOzlhqRKMDMVdToEsKKeAe/tX0m/JElLEgHbLrs9rFeX2QNTdYkwnQBc2bbsbbcauHT/QudbdwRKx0RJ/Kh20rB/84TcvLzt60csjtO9VQBDLSK5HA6HM0MzhM6hEfB3BGr/rbE06Ns8LicnbwWYopwCGDZXSHL5O4whPm8jAMhiWsQl5GPKABjeojLovZUK5YVGIIARaDggXsRuGwe27IQigvEWIyqWNnRuvJSvW0lsYS6+QoGuOHLz5MLhs5K0NFF5HwUYQjeK1QiUrlJWYuKrl8vYndLbTpwr0KcLs4dJwthOYi9ll1PbkiXvRq7XKsJKlpDYNnWkZY1o2TZ5rThyjQhKiIr1CBgAkzO7UnraVRA1wEet0ChGylSNkp3TNsj5g+l+lT6flC4tR3cwJF5luXAow68yIabbdwTK1aogYMtuPEJsoI9hjyypilzNIKDrH13NuKwYwyPD/Stwk7kyMjIkOTlZzpw5IwkJCXLHHcbGRCHS2bNn5ZdffpGyZctKmzZtblpL586dkwoVjMmzeTdLfDV4/fp1KVWqlC+2oPNLRUdSNjbMCE2UDbqW26jg9u3bZeTIkTJp0iQ5cOBAUD03xkqOHj0qq1evLlD+woULcuLECfntt99UHtfjx4+XBQsWOHlTUlLk119/lczMTOc9a2Lv3r3y6quvyrvvvmvNUtdTpkyRhx56SN577z23+f7cvHTpkvTv319WrlzpD3tQPPaIcAFbSLDbnph4pEWZMmWkZMmS6rDb7VKiRAm10lntSK2IiAi5du2aEwh5hgGqj9zcXMnJyRFW9uXLl6VFixYFpATS49FHH1V8rVq1kipVqjjH7scff5Q33nhDXn75ZXnkkUckMlKtYBdJ+d1338mHH34oU6dOlS5dujjLmhM8B3w8xxNPPCExMTHmbElMTJTz58/LXXfd5XI/kAvAmZaWJm+++aZcvXpV9Zfy3377rZw6dUqioqKE8QsLC1MHY8T43LhxQ1g4DzzwgNSrV8+vJosFwLKzs+Xpp5/264FhmjFjhjq8Fdi6dauaZDNPpUqVpGXLlrJjxw51PPzww87s0qVLq3S1atXUGXBDTJImFgBkBqbO0+cBAwbIvHnz5MqVK7Ju3ToZPHiwzhKkG+CCli1bJl9//bVKs8AAAECgXN26dRV4VKblDyBatWqVWjwTJ06UHj16ODm2bNmiQOa84SHRuHHjPxfAmEQkFPYOdgWrnxWopZheiUgy0tp+4czkcDA5SDDAmpWV5QIM8zjffffdClwA0AwwXac3u0bzmEFH3YcOHRIAiuQIDw+XV155RerUqSM1atQQ1CqSA9AADCguLk6QpmbSzwAvz+GO9u/fL5MnT1ZZzzzzjAu4uHnPPfdI5cqVpXz58qofLBL6Cng5kP5IsKpVq7qr3u29YiHBANKcOXOcD8gqBjBIDD2pzkxLAnWITQIwMJ7dEXbX6dOnFQhq1aolr7/+unDetWuXKtuxY0fVHmWZBADKAWnAkibPHVHf4cOH3WWpe0z8W2+9pWw/wLVkyRIFAI8F3GTs27dPxo4dq0yAQYMGydChQwtw9e7du8C933ujWADMOghr166Vt99+W91GmiEV9GrUkkpLK1Y+NGLECBk+fLhKW/+gqlBbnujnn39Wtgz5L730kgsbfeHwRs2bN5cGDRrIsWPHlAOCCmrWrJmSRAAVO+yjjz5SbTz77LNuwYXjsnHjRlWuXbt2Ls3hQSOxqGvgwIGqjydPnlRSEIlcmBQQwKrEx0mcETBl9xxq/uRfJTc7z6/+lTCCslD9Ps0ltm0dSd18VM7uTfOrbKBMqBqIiXvwwQe9Fsee+v7775V69cTIhNWsWVNJRIDKYTZ6KQcoUD84EhrMnLXqgh9phhSrXr26S1N4m9DcuXMVwHAgnnvuOSfP8uXLlQQDDABx9+7dkpqaqjzapKQkQTohhSFU3GeffeZi52Hz4ZVSDk8awg7dtGmTYPONHj26gL2pmG7CH78BFte+rjQd0sqlyej6//eiXDK8XERVjxaOqi1ryL/nbpXTO0544Q4ui4mFsGP69evntRLUKQDTZdwx47F589qQDHhjTZo0cYIQ1azrRGrqAz7ULUDTDoFuE0kLWW00bCeAO2TIEBVe0PycK1asKI0aNVLPimfHoT1YM1/r1q2FA8J+3LBhg0prm/Gbb75Ri4x2tA3LM3CwSDiQ+th4jBmEaeCL/AZYvR7Bu8WeOlGnW5NCARiTCK1YsUIdnto339cSwHzPnCZwihrS6mf+/PlK9RG2QCKhYgMhJMmwYcNcimBLQkg6wghMKpNJuAJ+QArh0IwZM0a1i2MTCLEYiKVBxMKQlIAdjzIQwga9qQCLqJDvhgfSCV+8EfnRXl9sAedHR0erwcMz42DikApaMmi1xYQR92KAfcV1UDGolM2bNytpwo4Axj+OAWqJySpXrpySHkiiZGPXANXWqVMnBQhWv/bEAHPDhg0LPBf9gj7//HN1aIYXXnhBhSsuXryobhEuufPOO1Xsj0DuU089pWwvMgGQJ9DxvK+99pqSoKh0YnYQ44I5gVOkY4lIXw5UMBIUQDVt2tQpwTy1oSo0/fFbgpnKqCTvZN/IvCZRNd17Xlb+zORzAkhLllfvof0v+/dtd1jbwNhGPaB6Hn/8cWUMm8FlFfkMOBPPAciIsjOJBFm16tBtxMfHK1UKcJhcApJMgA6PEH030xdffKEuhxreGhPjDwFA6P7771dqD9sK9a2J/kP6TEzsp59+kscee0zdP3LkiIwaNUpJpe7du6t75j/vv/++4ucegNEqHJX4ySefmFmdaSQ1AOM5ta3ozPQjETTAjq7eL+cOnJG2k7v50YxI4pytvIgmjQa28Is/GKZ33nlHjh8/HkxRZxlWM1F5K9WuXVvdwtMDYHhh2D6sZKTGnj17nDYMEoyIO2eASghCOwXwEhoBRFbSW0jdunWT++67T0lAM8Cs/NqZwS5iBwAPljqIl3U07COzlCF6v3DhQmsVhX4dNMAcxup35Pn/2o3iL+TXdFBRENFvb9Fyd6OK2iIUgQTUxraZT9cHsJhQDHUmEcLmQ425I2JOVmLi3QFMR+n1c1jLWa91wHPx4sWC9CZGNn36dEHammnatGmyaNEipQo7d+6stqLM+YWZDhpghdmpYOvWRjIRdtx51B5ekSfSHhE2W3p6ugKYrsNahug2RGQd2wuJhCqF9BZQhw4dlPHNhKKuZs2aJXhnH3/8sQodIHFwBrQqVIVNfzTAtGQyZblNEunHxgRcOBtsl1lVOwWRiF999ZUKtAJe9jr/KCpWALMOGob5mjVr1KBrWwweJhjjHoARJyNK7ouQOth1gIqtHUhLCu08ADQ8Ss60R5owAoR0YXK5r415lWH6o9W7dYPbxOKSpF2i/MS3CGG4AxcFCJ9gExK2IWj8R1KxBhjSCzBhz8TGur72hpHOxq+WPr4GHYA9//zzig1bD5sMyYdjgMH8ewkJivpFUvorwWiT7Z0ffvhBkJreFgrgKgoq1gDDO4J69eol9957r8v47ty5UwHMk0p0YTZdsNmLxEAC9u3bVxn41veqPEkoUzUFkqg5SDsTpH3Vw9sPLJ6uXbuqZ0GC4c26syGpryioWANMR5w/+OADJRnMA6xjSnh0vojJnz17thCiAGCakH7t27fXl84zYQ8dFCUNebK7dCGkEKSj7aSJu0FaBasL4w/Amzlzpnz55Zdq/xFQ4UUSWOaMnYc96M3+1HUV9jlogPFLIl+/JjJ3XsWgfPz6yMwfTNq64vEI69evr1Y09hYTpScLcLChrI13DQQdYzK3jyQkDAHhufHCHRPI3iD14UyYCWDr3QTCEhDXBGWtfSSP97zWr19PUtULmFHfOBSQVsEHDx5U14CRNtkfZaEQ6GUznOg+anbChAlqU5vXfqzELoE3YiHAAzi1tIbf3bh4q0fnBQ0wfmAZ27q2rsfnudmw1hJRKf+FO5/MQTJYJ/rFF1/0WdPSpUvVW6YENSF3+3i8i8UbqGwMY1RbSYNT3x83bpxSoVzj3fXp00e92kMcih0AHV7Q/IQWAB7RdCL8qDr99gY2Vtu2bRWrBiHPSZ08n5ZS7ER8+umnKjrPtpaO0us29JmF5o3oB4FbwG2WuuweBEN2A5lZRqWBbWgZLUVWLqMOfxuNblDFDav/cTQ3hQvc0mqvQIaXGwwcRjvEKu3Zs+Cv+DDwec3ZE+kAqc4nfKBJb1dRtw50sn1kJl7BQdqw5wghsdgjBFhIYE3E9wiiwuuunzgdhEaIvHuSODoUouu0nrFJ2SM1700SWGYrLBDiCzxgy7buyUUHDYAV3Biz1NZhWi8pVT7/PXNLVtCXWWkXZevENT7L+/t1HV4hRpogbfwNVhIwJVbF9hISxPoqjc/OGQxIBbxSgIi6ckdMLM6AFTSa151k03nmM5IlmD7qOlDHhFlYBO6kMXwEnVHDLD74CLEESpdPZzK3Sba1Ty5aZsjn3r4qqNG5gTT+e4IvtoDy9y7YLqe2HvNZxl+A+awoxPCHjUDa9uPyn/nbltsNG3Wl8fEwnwA7ueGQZGddl7h29aRS46pyxfhNJJvdgVApY6M7snJZObsvTVI2HTG+J5VvxAZSR4j39hiB9D0phgMkK+0RYWWXX8m79E9/vk/By4EZe1Kl84x+cmTlXknblhzQ08a1qyuNBxuR5xmbjc8H5L/bFFAFIebbYgQQPul7UjMjDWzZ6PG64QvHG+Z2/kvsfjwC35rw9T0Kt9UYrYXZjbLZ+a+luOVxczOkIt0Myi18a8/MLWJ8+GRC13l/nxJGP8OrV5tu+FC7/O1zUOCicgPFgYLL3z6F+G6NEUhed0B9SjMfU4ZAoVt8uNVufFvTcCtTb41uhnpxO44A4Dq0NDHV+B1Xb/0xYAUwHoYPt5YoEfaXQCTZ7TgIoT7f/BHA5kItJv0rcVd4XnjrTvP6Ob03ZYOZm1Tfa01NH2P8lmScER/LfwnKzFAE6ZANVgSD7qVJl8+YG06f4TFmSo5jKmpRSy5dvADAdAafP7yac6mXQ2y9DKYmxv3YYCL+ur7QufiMABF642nUP2IgFEEkwtM/YvgvG4j+/ieRy9wAAAAASUVORK5CYII=) no-repeat;
                background-size: 100%;
            }

            &:nth-child(8){
                background: url(data:image/png;base64,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) no-repeat;
                background-size: 100%;
            }

            &:nth-child(9){
                background: url(data:image/png;base64,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) no-repeat;
                background-size: 100%;
            }

            &:nth-child(10){
                background: url(data:image/png;base64,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) no-repeat;
                background-size: 100%;
            }
        }
    }

    .page-text{
        font-family: STHeitiSC-Light;
        font-size: 16px;
        color: #333333;
        line-height: 27px;
        text-align: justify;

        .page-level{
            color: #FDA403;
            font-size: 16px;

            em{
                margin-right: 2px;
                font-size: 12px;
                display: inline-block;
                padding: 2px 4px;
                border: 1px solid #FDA403;
                line-height: 12px;
                transform: scale(0.8);
                border-radius: 4px;
                vertical-align: text-bottom;
            }
        }

        .page-type{
            color: #70C100;
            font-size: 16px;

            &.free{
                color: #ff6602;

                em{
                    border: 1px solid #ff6602;
                    background: #ff6602;
                }
            }

            em{
                margin-right: 2px;
                font-size: 12px;
                display: inline-block;
                padding: 2px 4px;
                border: 1px solid #70C100;
                background: #70C100;
                color: #fff;
                line-height: 12px;
                border-radius: 4px;
                vertical-align: text-bottom;
            }
        }

        ul{
            width: 100%;
            padding: 0 10px;
            .clearfix;

            li{
                float: left;
                width: 50%;
                margin-bottom: 30px;
                .clearfix;

                .left{
                    float: left;
                    width: 35px;
                }

                .right{
                    float: left;
                    width: auto;
                    margin-left: 8px;

                    h4{
                        font-family: STHeitiSC-Medium;
                        font-size: 17px;
                        line-height: 1.2;
                        color: #333;
                    }

                    h5{
                        font-family: STHeitiSC-Light;
                        font-size: 12px;
                        line-height: 1.2;
                        color: #999;
                    }
                }

            }

        }

        table{
            width: 100%;

            th{
                position: relative;
                font-family: STHeitiSC-Medium;
                font-size: 16px;
                color: #333333;
                line-height: 45px;

                &:before{
                    .setBottomLine(#dfdfdf);
                }

                &:nth-child(1){
                    width: 25%;
                }

                &:nth-child(2){
                    width: 25%;
                }

                &:nth-child(3){
                    width: 50%;
                }
            }

            td{
                position: relative;
                font-family: STHeitiSC-Light;
                font-size: 14px;
                line-height: 18px;
                color: #333333;
                padding: 9px 0;

                &:before{
                    .setBottomLine(#dfdfdf);
                }
            }
        }
    }

    .page-line h1{
        position: relative;
        margin-bottom: 30px;

        &:before{
            .setBottomLine(#dfdfdf);
            bottom: -15px;
        }
    }
</style>

