<template>
  <div class="hedtitle">基本信息</div>
  <dadp-card is-body-padding>
    <div class="my-cell">
      <div class="label">企业名称</div>
      <div class="value">{{ custInfo.companyName || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">法定代表人</div>
      <div class="value">{{ custInfo.legalPerson || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">统一社会信用代码</div>
      <div class="value">{{ custInfo.uniformCreditCode || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">登记状态</div>
      <div class="value">{{ codeTranslate('regStatus', custInfo.regStatus) || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">成立日期</div>
      <div class="value">{{ custInfo.estiblishDate || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">核准日期</div>
      <div class="value">{{ custInfo.approvalDate || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">注册资本</div>
      <div class="value">{{ fmtThousands(custInfo.regCapital, 2) || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">实缴资本</div>
      <div class="value">{{ fmtThousands(custInfo.paidCapital, 2) || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">企业类型</div>
      <div class="value">{{ codeTranslate('companyType', custInfo.companyType) || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">营业期限</div>
      <div class="value">{{ custInfo.fromTime || '--' }}</div>-
      <div class="value">{{ custInfo.toTime || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">企业注册地址</div>
      <div class="value">{{ custInfo.regLocation || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">联系电话</div>
      <div class="value textarea">{{ custInfo.phoneNumber || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">工商注册号</div>
      <div class="value">{{ codeTranslate('entScaleBQType', custInfo.regNumber) || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">历史名称信息</div>
      <div class="value">{{ custInfo.companyNameHis || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">经营范围</div>
      <div class="value">{{custInfo.businessScope || '--' }}</div>
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
  contacts: {
    type: Array,
    default: () => [],
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
