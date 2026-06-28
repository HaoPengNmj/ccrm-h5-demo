<!-- 行外视图法律诉讼详情页 -->
<template>
  <van-nav-bar :title="navTitle" fixed left-arrow @click-left="router.back()"></van-nav-bar>
  <!-- 法院公告详情页 -->
  <dadp-card is-body-padding v-if="route.query.courtDeclaredId">
    <div class="my-cell">
      <div class="label">公告类型</div>
      <div class="value">{{ courtDeclaredLists.annType || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">公告人</div>
      <div class="value">{{ courtDeclaredLists.courtName || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">当事人</div>
      <div class="value">原告:{{ courtDeclaredLists.partyPlaintiff || '--' }}</div>
      <div class="value">被告:{{ courtDeclaredLists.partyDefendant || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">原始当事人</div>
      <div class="value">原告:{{ courtDeclaredLists.origPartyPlaintiff || '--' }}</div>
      <div class="value">被告:{{ courtDeclaredLists.origPartyDefendant || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">公告时间</div>
      <div class="value">{{ courtDeclaredLists.publicDate || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">公告内容</div>
      <div class="value">{{ courtDeclaredLists.article || '--' }}</div>
    </div>
  </dadp-card>
  <!-- 立案信息详情页 -->
  <dadp-card is-body-padding v-if="route.query.filingInfoId">
    <div class="my-cell">
      <div class="label">案由</div>
      <div class="value">{{ filingInfoLists.caseCause || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">案号</div>
      <div class="value">{{ filingInfoLists.caseNo || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">立案日期</div>
      <div class="value">{{ filingInfoLists.filingDate || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">承办部门</div>
      <div class="value">{{ filingInfoLists.mainDept || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">标的金额</div>
      <div class="value">{{ fmtThousands(filingInfoLists.executionObject, 2) || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">当事人</div>
      <div class="value">申请执行人:{{ filingInfoLists.applExecutor || '--' }}</div>
      <div class="value">被执行人:{{ filingInfoLists.applExecutor || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">案件状态</div>
      <div class="value">{{ filingInfoLists.caseStast || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">执行法院</div>
      <div class="value">{{ filingInfoLists.courtName || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">书记员</div>
      <div class="value">{{ filingInfoLists.clerk || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">审判长</div>
      <div class="value">{{ filingInfoLists.judge || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">主审法官/承办人/承办法官</div>
      <div class="value">{{ filingInfoLists.preJudge || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">法官助理</div>
      <div class="value">{{ filingInfoLists.judgeAssis || '--' }}</div>
    </div>
  </dadp-card>
  <!-- 开庭公告详情页 -->
  <dadp-card is-body-padding v-if="route.query.courtBulletinId">
    <div class="my-cell">
      <div class="label">案号</div>
      <div class="value">{{ CourtBulletinLists.caseNo || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">案由</div>
      <div class="value">{{ CourtBulletinLists.caseCause || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">当事人</div>
      <div class="value">原告:{{ CourtBulletinLists.partyPlaintiff || '--' }}</div>
      <div class="value">被告:{{ CourtBulletinLists.partyDefendant || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">开庭日期</div>
      <div class="value">{{ CourtBulletinLists.lawfulDate || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">法院</div>
      <div class="value">{{ CourtBulletinLists.court || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">法庭</div>
      <div class="value">{{ CourtBulletinLists.courtroom || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">法官</div>
      <div class="value">{{ CourtBulletinLists.judge || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">正文</div>
      <div class="value">{{ CourtBulletinLists.body || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">原告</div>
      <div class="value">{{ CourtBulletinLists.partyPlaintiff || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">被告</div>
      <div class="value">{{ CourtBulletinLists.partyDefendant || '--' }}</div>
    </div>
  </dadp-card>
  <!-- 裁判文书详情 -->
  <dadp-card is-body-padding v-if="route.query.riskLawsuitId">
    <div class="my-cell">
      <div class="label">案号</div>
      <div class="value">{{ RiskLawsuitLists.caseNo || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">案由</div>
      <div class="value">{{ RiskLawsuitLists.caseCause || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">案件类型</div>
      <div class="value">{{ RiskLawsuitLists.caseType || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">标题</div>
      <div class="value">{{ RiskLawsuitLists.title || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">当事人</div>
      <div class="value">{{ RiskLawsuitLists.partyPerson || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">涉案金额</div>
      <div class="value">{{ fmtThousands(RiskLawsuitLists.caseAum, 2) || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">审判日期</div>
      <div class="value">{{ RiskLawsuitLists.judgeTime || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">审判程序</div>
      <div class="value">{{ RiskLawsuitLists.party || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">判决结果</div>
      <div class="value">{{ RiskLawsuitLists.result || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">法院名称</div>
      <div class="value">{{ RiskLawsuitLists.courtName || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">法院等级</div>
      <div class="value">{{ RiskLawsuitLists.courtLevel || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">法院人员列表</div>
      <div class="value">{{ RiskLawsuitLists.courtPerson || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">文书类型</div>
      <div class="value">{{ RiskLawsuitLists.docType || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">文书内容</div>
      <div class="value">{{ RiskLawsuitLists.docContent || '--' }}</div>
    </div>
  </dadp-card>
  <!-- 被执行企业详情 -->
  <dadp-card is-body-padding v-if="route.query.executionId">
    <div class="my-cell">
      <div class="label">案号</div>
      <div class="value">{{ ExecutionLists.caseNo || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">被执行人</div>
      <div class="value">{{ ExecutionLists.executee || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">组织机构代码</div>
      <div class="value">{{ ExecutionLists.creditCode || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">法定代表人姓名</div>
      <div class="value">{{ ExecutionLists.legalPerson || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">执行法院</div>
      <div class="value">{{ ExecutionLists.courtname || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">被执行人类型</div>
      <div class="value">{{ ExecutionLists.executeeType || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">执行标的</div>
      <div class="value">{{ ExecutionLists.executionObject || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">立案日期</div>
      <div class="value">{{ ExecutionLists.filingDate || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">未履行部分</div>
      <div class="value">{{ ExecutionLists.unfulfilled || '--' }}</div>
    </div>
  </dadp-card>
  <!-- 失信被执行企业详情 -->
  <dadp-card is-body-padding v-if="route.query.execillegalId">
    <div class="my-cell">
      <div class="label">案号</div>
      <div class="value">{{ execillegalLists.caseNo || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">被执行人</div>
      <div class="value">{{ execillegalLists.executee || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">组织机构代码</div>
      <div class="value">{{ execillegalLists.creditCode || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">法定代表人姓名</div>
      <div class="value">{{ execillegalLists.legalPerson || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">执行法院</div>
      <div class="value">{{ execillegalLists.courtname || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">省份</div>
      <div class="value">{{ execillegalLists.provinceCode || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">被执行人类型</div>
      <div class="value">{{ execillegalLists.executeeType || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">执行依据文书编号</div>
      <div class="value">{{ execillegalLists.execNo || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">立案日期</div>
      <div class="value">{{ execillegalLists.filingDate || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">经办机构</div>
      <div class="value">{{ execillegalLists.execOrg || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">生效法律文书确定的义务</div>
      <div class="value">{{ execillegalLists.duty || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">履行情况</div>
      <div class="value">{{ execillegalLists.performance || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">已履行部分</div>
      <div class="value">{{ execillegalLists.alreadyFulfilled || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">未履行部分</div>
      <div class="value">{{ execillegalLists.unfulfilled || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">失信被执行人行为具体情形</div>
      <div class="value">{{ execillegalLists.detail || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">发布时间</div>
      <div class="value">{{ execillegalLists.pubdate || '--' }}</div>
    </div>
  </dadp-card>
  <!-- 限制高消费详情 -->
  <dadp-card is-body-padding v-if="route.query.limitHighConsumId">
    <div class="my-cell">
      <div class="label">曝光类型</div>
      <div class="value">{{ limitHighConsumLists.execType || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">被执行人姓名/名称</div>
      <div class="value">{{ limitHighConsumLists.executee || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">被执行人类型</div>
      <div class="value">{{ limitHighConsumLists.executeeType || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">证件号码/组织机构代码</div>
      <div class="value">{{ limitHighConsumLists.creditCode || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">法定代表人姓名</div>
      <div class="value">{{ limitHighConsumLists.legalPerson || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">被执行人性别</div>
      <div class="value">{{ limitHighConsumLists.executeeSex || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">被执行人年龄</div>
      <div class="value">{{ limitHighConsumLists.executeeAge || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">地址</div>
      <div class="value">{{ limitHighConsumLists.address || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">执行金额</div>
      <div class="value">{{ fmtThousands(limitHighConsumLists.exeAum, 2) || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">未执行金额</div>
      <div class="value">{{ fmtThousands(limitHighConsumLists.unexeAum, 2) || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">限制原因</div>
      <div class="value">{{ limitHighConsumLists.limitReason || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">限制内容</div>
      <div class="value">{{ limitHighConsumLists.limitContent || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">限制开始日期</div>
      <div class="value">{{ limitHighConsumLists.limitDate || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">案号</div>
      <div class="value">{{ limitHighConsumLists.caseNo || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">立案日期</div>
      <div class="value">{{ limitHighConsumLists.filingDate || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">执行法院</div>
      <div class="value">{{ limitHighConsumLists.courtname || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">案件状态</div>
      <div class="value">{{ limitHighConsumLists.caseStast || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">执行依据文书编号</div>
      <div class="value">{{ limitHighConsumLists.execNo || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">经办机构</div>
      <div class="value">{{ limitHighConsumLists.execOrg || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">发布/曝光日期</div>
      <div class="value">{{ limitHighConsumLists.pubdate || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">执行程序</div>
      <div class="value">{{ limitHighConsumLists.party || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">执行案由</div>
      <div class="value">{{ limitHighConsumLists.caseCause || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">法院电话</div>
      <div class="value">{{ limitHighConsumLists.courtnameTel || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">申请执行人</div>
      <div class="value">{{ limitHighConsumLists.applicant || '--' }}</div>
    </div>
  </dadp-card>
  <!-- 终本信息详情 -->
  <dadp-card is-body-padding v-if="route.query.finalInfoId">
    <div class="my-cell">
      <div class="label">案号</div>
      <div class="value">{{ finalInfoLists.caseNo || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">被执行人</div>
      <div class="value">{{ finalInfoLists.executee || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">组织机构代码</div>
      <div class="value">{{ finalInfoLists.creditCode || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">立案日期</div>
      <div class="value">{{ finalInfoLists.filingDate || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">终本日期</div>
      <div class="value">{{ finalInfoLists.endDate || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">执行标的</div>
      <div class="value">{{ finalInfoLists.executionObject || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">未执行金额</div>
      <div class="value">{{ fmtThousands(finalInfoLists.unexeAum, 2) || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">执行依据文书编号</div>
      <div class="value">{{ finalInfoLists.execNo || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">执行法院</div>
      <div class="value">{{ finalInfoLists.courtname || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">法院所在省</div>
      <div class="value">{{ finalInfoLists.cityCode || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">法院所在市</div>
      <div class="value">{{ finalInfoLists.cityCode || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">地址</div>
      <div class="value">{{ finalInfoLists.address || '--' }}</div>
    </div>
  </dadp-card>
  <!-- 司法拍卖详情 -->
  <dadp-card is-body-padding v-if="route.query.judicialAuctionId">
    <div class="my-cell">
      <div class="label">标题</div>
      <div class="value">{{ judicialAuctionLists.title || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">被执行人</div>
      <div class="value">{{ judicialAuctionLists.executee || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">拍卖时间</div>
      <div class="value">{{ judicialAuctionLists.auctionDate || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">标的物名称</div>
      <div class="value">{{ judicialAuctionLists.subjectName || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">标的类型</div>
      <div class="value">{{ judicialAuctionLists.subjectType || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">评估价/评估值</div>
      <div class="value">{{ judicialAuctionLists.evaluatPrice || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">起拍价</div>
      <div class="value">{{ fmtThousands(judicialAuctionLists.startPrice, 2) || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">成交价</div>
      <div class="value">{{ fmtThousands(judicialAuctionLists.endPrice, 2) || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">拍卖状态</div>
      <div class="value">{{ judicialAuctionLists.auctionStast || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">拍卖阶段</div>
      <div class="value">{{ judicialAuctionLists.auctionPhase || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">拍卖公告</div>
      <div class="value">{{ judicialAuctionLists.auctionAnnounc || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">公告日期</div>
      <div class="value">{{ judicialAuctionLists.publicDate || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">执行法院</div>
      <div class="value">{{ judicialAuctionLists.courtname || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">执行裁定书案号</div>
      <div class="value">{{ judicialAuctionLists.execNo || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">拍卖开始时间</div>
      <div class="value">{{ judicialAuctionLists.auctionStartTime || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">拍卖结束时间</div>
      <div class="value">{{ judicialAuctionLists.auctionEndTime || '--' }}</div>
    </div>
  </dadp-card>
  <!-- 财产保全详情 -->
  <dadp-card is-body-padding v-if="route.query.properiyPreservationId">
    <div class="my-cell">
      <div class="label">案由</div>
      <div class="value">{{ properiyPreservationLists.caseCause || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">案号</div>
      <div class="value">{{ properiyPreservationLists.caseNo || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">案件类型</div>
      <div class="value">{{ properiyPreservationLists.caseType || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">立案日期</div>
      <div class="value">{{ properiyPreservationLists.filingDate || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">发布日期</div>
      <div class="value">{{ properiyPreservationLists.publishDate || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">裁判日期</div>
      <div class="value">{{ properiyPreservationLists.judgeTime || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">法院名称</div>
      <div class="value">{{ properiyPreservationLists.courtName || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">法院层级</div>
      <div class="value">{{ properiyPreservationLists.courtLevel || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">法院所在省份</div>
      <div class="value">{{ properiyPreservationLists.provinceCode || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">判决结果</div>
      <div class="value">{{ properiyPreservationLists.result || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">申请内容</div>
      <div class="value">{{ properiyPreservationLists.content || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">申请金额</div>
      <div class="value">{{ fmtThousands(properiyPreservationLists.applAum, 2) || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">判决金额</div>
      <div class="value">{{ fmtThousands(properiyPreservationLists.judgAum, 2) || '--' }}</div>
    </div>
  </dadp-card>
</template>

<script lang="ts" setup>
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import { fmtThousands } from '@/utils/format';
import {
  getCourtDeclaredList,
  getFilingInfoList,
  getCourtBulletin,
  getRiskLawsuitList,
  getExecutionList,
  getExecillegalList,
  getLimitHighConsumList,
  getFinalInfoList,
  getJudicialAuction,
  getProperiyPreservation,
} from '@/apis/cust';
const router = useRouter();
const route = useRoute();
const props = defineProps({
  queryParams: {
    type: Object,
    default: () => {},
  },
  bs: {
    type: Object,
    default: () => {},
  },
});
const dataMap = reactive({
  courtDeclaredLists: {} as any, //法院公告详情页
  filingInfoLists: {} as any, //立案信息详情页
  CourtBulletinLists: {} as any, //开庭公告详情页
  RiskLawsuitLists: {} as any, //裁判文书详情页
  ExecutionLists: {} as any, //被执行企业详情
  execillegalLists: {} as any, //失信被执行企业详情
  limitHighConsumLists: {} as any, //限制高消费详情
  finalInfoLists: {} as any, //终本信息详情
  judicialAuctionLists: {} as any, //司法拍卖详情
  properiyPreservationLists: {} as any, //财产保全详情
  navTitle: '',//导航栏标题
});
const {
  courtDeclaredLists,
  filingInfoLists,
  CourtBulletinLists,
  RiskLawsuitLists,
  ExecutionLists,
  execillegalLists,
  limitHighConsumLists,
  finalInfoLists,
  judicialAuctionLists,
  properiyPreservationLists,
  navTitle,
} = toRefs(dataMap);
// 法院公告详情
const getcourtDeclared = async () => {
  const { data } = await getCourtDeclaredList({ courtDeclaredId: route.query.courtDeclaredId });
  if (data) {
    dataMap.courtDeclaredLists = data;
    dataMap.navTitle = '法院公告详情';
  }
};
// 立案信息详情页
const getFilingInfo = async () => {
  const { data } = await getFilingInfoList({ filingInfoId: route.query.filingInfoId });
  if (data) {
    dataMap.filingInfoLists = data;
    dataMap.navTitle = '立案信息详情';
  }
};
// 开庭公告详情页
const getCourtBullet = async () => {
  const { data } = await getCourtBulletin({ courtBulletinId: route.query.courtBulletinId });
  if (data) {
    dataMap.CourtBulletinLists = data;
    dataMap.navTitle = '开庭公告详情';
  }
};
// 裁判文书详情页
const getRiskLawsuit = async () => {
  const { data } = await getRiskLawsuitList({ riskLawsuitId: route.query.riskLawsuitId });
  if (data) {
    dataMap.RiskLawsuitLists = data;
    dataMap.navTitle = '裁判文书详情';
  }
};
// 被执行企业详情
const getExecution = async () => {
  const { data } = await getExecutionList({ executionId: route.query.executionId });
  if (data) {
    dataMap.ExecutionLists = data;
    dataMap.navTitle = '被执行企业详情';
  }
};
// 失信被执行企业详情
const getExecillegal = async () => {
  const { data } = await getExecillegalList({ execillegalId: route.query.execillegalId });
  if (data) {
    dataMap.execillegalLists = data;
    dataMap.navTitle = '失信被执行企业详情';
  }
};
// 限制高消费详情
const getLimitHighConsum = async () => {
  const { data } = await getLimitHighConsumList({ limitHighConsumId: route.query.limitHighConsumId });
  if (data) {
    dataMap.limitHighConsumLists = data;
    dataMap.navTitle = '限制高消费详情';
  }
};
// 终本信息详情
const getFinalInfo = async () => {
  const { data } = await getFinalInfoList({ finalInfoId: route.query.finalInfoId });
  if (data) {
    dataMap.finalInfoLists = data;
    dataMap.navTitle = '终本信息详情';
  }
};
// 司法拍卖详情
const getJudicial = async () => {
  const { data } = await getJudicialAuction({ judicialAuctionId: route.query.judicialAuctionId });
  if (data) {
    dataMap.judicialAuctionLists = data;
    dataMap.navTitle = '司法拍卖详情';
  }
};
// 财产保全详情
const getProperiyPreserve = async () => {
  const { data } = await getProperiyPreservation({ properiyPreservationId: route.query.properiyPreservationId });
  if (data) {
    dataMap.properiyPreservationLists = data;
    dataMap.navTitle = '财产保全详情';
  }
};
onMounted(() => {
  //法院公告详情
  if (route.query.courtDeclaredId) {
    getcourtDeclared();
  }
  //立案信息详情
  else if (route.query.filingInfoId) {
    getFilingInfo();
  }
  //开庭公告详情
  else if (route.query.courtBulletinId) {
    getCourtBullet();
  }
  //裁判文书详情
  else if (route.query.riskLawsuitId) {
    getRiskLawsuit();
  }
  //被执行企业详情
  else if (route.query.executionId) {
    getExecution();
  }
  //失信被执行企业详情
  else if (route.query.execillegalId) {
    getExecillegal();
  }
  //限制高消费详情
  else if (route.query.limitHighConsumId) {
    getLimitHighConsum();
  }
  //终本信息详情
  else if (route.query.finalInfoId) {
    getFinalInfo();
  }
  //司法拍卖详情
  else if (route.query.judicialAuctionId) {
    getJudicial();
  }
  //财产保全详情
  else if (route.query.properiyPreservationId) {
    getProperiyPreserve();
  }
});
</script>
<style lang="less" scoped>
.my-cell + .my-cell {
  margin-top: 24px;
}
.my-cell {
  display: flex;
}
.label {
  font-family: PingFangSC-Regular;
  font-size: @font-size-28;
  color: @gray;
  letter-spacing: 0;
  line-height: 44px;
  font-weight: 400;
  width: 40%;
  flex: none;
}
.value {
  font-family: PingFangSC-Regular;
  font-size: @font-size-28;
  color: @text;
  letter-spacing: 0;
  line-height: 44px;
  font-weight: 400;
}
</style>
