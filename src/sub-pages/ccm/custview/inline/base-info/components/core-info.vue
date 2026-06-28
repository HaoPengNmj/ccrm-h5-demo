<template>
  <div class="title">核心信息</div>
  <dadp-card is-body-padding>
    <div class="my-cell">
      <div class="label">客户号</div>
      <div class="value">{{ custInfo.custId || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">客户名称</div>
      <div class="value">{{ custInfo.custName || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">法定代表人姓名</div>
      <div class="value">{{ custInfo.legalUserDeputy || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">公司联系电话</div>
      <div class="value">{{ custInfo.corePhone || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">统一社会信用代码</div>
      <div class="value">{{ custInfo.uniformCreditCode || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">组织机构代码</div>
      <div class="value">{{ custInfo.organizeOrgNo || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">注册资本币种</div>
      <div class="value">{{ codeTranslate('currency', custInfo.registerGsCurrency) || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">注册资本</div>
      <div class="value">{{ fmtThousands(custInfo.regCapitalAm, 2) || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">注册登记日期</div>
      <div class="value">{{ custInfo.registerDate || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">所属行业</div>
      <div class="value textarea">{{ custInfo.industry || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">企业规模</div>
      <div class="value">{{ codeTranslate('entScaleBQType', custInfo.enterpriseScale) || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">联系地址</div>
      <div class="value">{{ custInfo.currentOfficeAddress || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">是否商户</div>
      <div class="value">{{ codeTranslate('yesOrNo', custInfo.isTenantCust) || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">开户日期</div>
      <div class="value">{{ custInfo.approvalDate || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">主营范围</div>
      <div class="value textarea">{{ custInfo.businessScope || '--' }}</div>
    </div>
  </dadp-card>
</template>

<script lang="ts" setup>
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import { codeTranslate } from '@/hook/code-hook';
import { fmtThousands } from '@/utils/format';

const props = defineProps({
  custInfo: {
    type: Object,
    default: () => {},
  },
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
  white-space: nowrap;
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
// .textarea {
//   padding: 16px 24px;
//   background: @gray-1;
//   border-radius: 20px;
// }
</style>
