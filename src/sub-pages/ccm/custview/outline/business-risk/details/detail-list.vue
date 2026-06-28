<!-- 经营风险详情页 -->
<template>
  <van-nav-bar :title="navTitle" fixed left-arrow @click-left="router.back()"></van-nav-bar>
  <!-- 行政处罚详情页 -->
  <dadp-card is-body-padding v-if="route.query.riskAdminPunishId">
    <div class="my-cell">
      <div class="label">违法行为类型</div>
      <div class="value">{{ riskAdminPunishLists.illegalType || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">处罚内容</div>
      <div class="value">{{ riskAdminPunishLists.content || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">处罚决定日期</div>
      <div class="value">{{ riskAdminPunishLists.decisionDate || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">决定机关</div>
      <div class="value">{{ riskAdminPunishLists.departmentName || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">公示日期</div>
      <div class="value">{{ riskAdminPunishLists.publishDate || '--' }}</div>
    </div>
  </dadp-card>
  <!-- 欠税信息详情页 -->
  <dadp-card is-body-padding v-if="route.query.riskOwnTaxId">
    <div class="my-cell">
      <div class="label">省份</div>
      <div class="value">{{ riskOwnTaxLists.province || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">地市</div>
      <div class="value">{{ riskOwnTaxLists.city || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">区县</div>
      <div class="value">{{ riskOwnTaxLists.district || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">区号</div>
      <div class="value">{{ riskOwnTaxLists.areaCode || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">税务局名称</div>
      <div class="value">{{ riskOwnTaxLists.department || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">法定代表人姓名</div>
      <div class="value">{{ riskOwnTaxLists.legalPersonName || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">欠税类别</div>
      <div class="value">{{ riskOwnTaxLists.taxCategory || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">欠税金额</div>
      <div class="value">{{ fmtThousands(riskOwnTaxLists.ownTaxAmount, 2) || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">纳税人名称</div>
      <div class="value">{{ riskOwnTaxLists.companyName || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">纳税人识别号</div>
      <div class="value">{{ riskOwnTaxLists.taxIdNumber || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">发布日期</div>
      <div class="value">{{ riskOwnTaxLists.publishDate || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">公开类型</div>
      <div class="value">{{ riskOwnTaxLists.publicType || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">生产经营地址</div>
      <div class="value">{{ riskOwnTaxLists.location || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">税款所属期止</div>
      <div class="value">{{ riskOwnTaxLists.endPeriod || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">税款所属期起</div>
      <div class="value">{{ riskOwnTaxLists.startPeriod || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">当期发生的欠税金额</div>
      <div class="value">{{ fmtThousands(riskOwnTaxLists.newOwnTaxBalance, 2) || '--' }}</div>
    </div>
  </dadp-card>
  <!-- 税收违法详情页 -->
  <dadp-card is-body-padding v-if="route.query.taxPunishId">
    <div class="my-cell">
      <div class="label">纳税人名称</div>
      <div class="value">{{ TaxPunishLists.companyName || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">纳税人识别号</div>
      <div class="value">{{ TaxPunishLists.taxIdNumber || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">组织机构代码</div>
      <div class="value">{{ TaxPunishLists.creditCode || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">注册地址</div>
      <div class="value">{{ TaxPunishLists.companyAddress || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">法定代表人或者负责人姓名</div>
      <div class="value">{{ TaxPunishLists.legalPerson || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">法定代表人或者负责人性别</div>
      <div class="value">{{ TaxPunishLists.legalPersonSex || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">法定代表人或者负责人证件类型</div>
      <div class="value">{{ TaxPunishLists.legalPersonCard || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">法定代表人或者负责人证件号码</div>
      <div class="value">{{ TaxPunishLists.legalPersonCode || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">负有直接责任的财务负责人姓名</div>
      <div class="value">{{ TaxPunishLists.financialOfficerName || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">负有直接责任的财务负责人性别</div>
      <div class="value">{{ TaxPunishLists.financialOfficerSerx || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">负有直接责任的财务负责人证件类型</div>
      <div class="value">{{ TaxPunishLists.financialOfficerCard || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">负有直接责任的财务负责人证件号码</div>
      <div class="value">{{ TaxPunishLists.financialOfficerCode || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">负有直接责任的中介机构信息及其从业人员信息</div>
      <div class="value">{{ TaxPunishLists.interInto || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">案件性质</div>
      <div class="value">{{ TaxPunishLists.caseNature || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">主要违法事实</div>
      <div class="value">{{ TaxPunishLists.illegalFacts || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">相关法律依据及税务处理处罚情况</div>
      <div class="value">{{ TaxPunishLists.punishInfo || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">公布日期</div>
      <div class="value">{{ TaxPunishLists.publishDate || '--' }}</div>
    </div>
  </dadp-card>
  <!-- 环保处罚详情信息 -->
  <dadp-card is-body-padding v-if="route.query.environPunishId">
    <div class="my-cell">
      <div class="label">决定书文号</div>
      <div class="value">{{ EnvironPunishLists.punishNumber || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">法人</div>
      <div class="value">{{ EnvironPunishLists.legalPerson || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">处罚名称</div>
      <div class="value">{{ EnvironPunishLists.punishName || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">处罚依据</div>
      <div class="value">{{ EnvironPunishLists.punishBasis || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">处罚事由</div>
      <div class="value">{{ EnvironPunishLists.punishReason || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">处罚结果</div>
      <div class="value">{{ EnvironPunishLists.punishResult || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">处罚机关</div>
      <div class="value">{{ EnvironPunishLists.departmentName || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">处罚方式</div>
      <div class="value">{{ EnvironPunishLists.punishMethod || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">处罚金额</div>
      <div class="value">{{ fmtThousands(EnvironPunishLists.punishAum, 2) || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">处罚决定日期</div>
      <div class="value">{{ EnvironPunishLists.decisionDate || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">发布日期</div>
      <div class="value">{{ EnvironPunishLists.publishDate || '--' }}</div>
    </div>
  </dadp-card>
</template>

<script lang="ts" setup>
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import { fmtThousands } from '@/utils/format';
import { getAbnormalOutList, getRiskOwnTaxList, getTaxPunishList, getEnvironPunishList } from '@/apis/cust';
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
  riskAdminPunishLists: {} as any, //行政处罚详情页
  riskOwnTaxLists: {} as any, //欠税信息详情页
  TaxPunishLists: {} as any, //税收违法详情页
  EnvironPunishLists: {} as any, //环保处罚详情页
  navTitle: '', //导航栏名称
});
const { riskAdminPunishLists, riskOwnTaxLists, TaxPunishLists, EnvironPunishLists, navTitle } = toRefs(dataMap);
// 行政处罚详情信息
const AbnormalOutList = async () => {
  const { data } = await getAbnormalOutList({ riskAdminPunishId: route.query.riskAdminPunishId });
  if (data) {
    dataMap.riskAdminPunishLists = data;
    dataMap.navTitle = '行政处罚详情';
  }
};
// 欠税信息详情信息
const RiskOwnTaxList = async () => {
  const { data } = await getRiskOwnTaxList({ riskOwnTaxId: route.query.riskOwnTaxId });
  if (data) {
    dataMap.riskOwnTaxLists = data;
    dataMap.navTitle = '欠税信息详情';
  }
};
// 税收违法详情信息
const TaxPunishList = async () => {
  const { data } = await getTaxPunishList({ taxPunishId: route.query.taxPunishId });
  if (data) {
    dataMap.TaxPunishLists = data;
    dataMap.navTitle = '税收违法详情';
  }
};
// 环保处罚详情信息
const EnvironPunishList = async () => {
  const { data } = await getEnvironPunishList({ environPunishId: route.query.environPunishId });
  if (data) {
    dataMap.EnvironPunishLists = data;
    dataMap.navTitle = '环保处罚详情';
  }
};
onMounted(() => {
  if (route.query.riskAdminPunishId) {
    AbnormalOutList();
  }
  //欠税信息详情页
  else if (route.query.riskOwnTaxId) {
    RiskOwnTaxList();
  }
  //税收违法详情页
  else if (route.query.taxPunishId) {
    TaxPunishList();
  }
  //环保处罚详情页
  else if (route.query.environPunishId) {
    EnvironPunishList();
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
